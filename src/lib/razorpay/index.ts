import crypto from 'crypto'
import Razorpay from 'razorpay'

// Initialize Razorpay client
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// Create order
export async function createOrder(amount: number, currency: string = 'INR', receipt?: string) {
  const options = {
    amount: Math.round(amount * 100), // Razorpay expects amount in paise
    currency,
    receipt: receipt || `receipt_${Date.now()}`,
    notes: {
      platform: 'aviation-academy',
    },
  }

  return await razorpay.orders.create(options)
}

// Verify payment signature
export function verifySignature(
  orderId: string,
  paymentId: string,
  signature: string
) {
  const secret = process.env.RAZORPAY_KEY_SECRET!
  
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  return generatedSignature === signature
}

// Create refund
export async function createRefund(paymentId: string, amount?: number) {
  const options: any = {
    payment_id: paymentId,
  }
  
  if (amount) {
    options.amount = Math.round(amount * 100)
  }

  return await razorpay.payments.refund(paymentId, options)
}

// Get payment details
export async function getPayment(paymentId: string) {
  return await razorpay.payments.fetch(paymentId)
}

// Create subscription
export async function createSubscription(
  planId: string,
  customerId?: string,
  totalCount?: number
) {
  const options: any = {
    plan_id: planId,
    total_count: totalCount || 12,
  }

  if (customerId) {
    options.customer_id = customerId
  }

  return await razorpay.subscriptions.create(options)
}
