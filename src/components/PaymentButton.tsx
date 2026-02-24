'use client'

import { useState } from 'react'

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id?: string
  handler: (response: RazorpayResponse) => void
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  theme?: {
    color?: string
  }
}

interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void
      close: () => void
    }
  }
}

interface PaymentButtonProps {
  amount: number
  currency?: string
  courseId: string
  courseName: string
  onSuccess: (paymentId: string) => void
  onError: (error: string) => void
}

export function PaymentButton({
  amount,
  currency = 'INR',
  courseId,
  courseName,
  onSuccess,
  onError,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)

    try {
      // Create order on server
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency,
          courseId,
          courseName,
        }),
      })

      const order = await response.json()

      if (!response.ok) {
        throw new Error(order.error || 'Failed to create order')
      }

      // Initialize Razorpay
      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: 'Aviation Academy',
        description: `Payment for ${courseName}`,
        order_id: order.id,
        handler: async (response: RazorpayResponse) => {
          // Verify payment on server
          const verifyResponse = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              courseId,
            }),
          })

          const verifyResult = await verifyResponse.json()

          if (verifyResponse.ok) {
            onSuccess(response.razorpay_payment_id)
          } else {
            onError(verifyResult.error || 'Payment verification failed')
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#0f172a',
        },
      })

      razorpay.open()
    } catch (error: any) {
      onError(error.message || 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50"
    >
      {loading ? 'Processing...' : `Pay ₹${amount}`}
    </button>
  )
}
