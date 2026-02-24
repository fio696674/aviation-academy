import crypto from 'crypto'

// Lazy load Razorpay only when needed
function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  
  if (!keyId || !keySecret || keyId === 'placeholder' || keySecret === 'placeholder') {
    throw new Error('Razorpay credentials not configured')
  }
  
  const Razorpay = require('razorpay')
  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  })
}

// Create order
export async function createOrder(amount: number, currency: string = 'INR', receipt?: string) {
  const razorpay = getRazorpay()
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
  const razorpay = getRazorpay()
  const options: Record<string, unknown> = {
    payment_id: paymentId,
  }
  
  if (amount) {
    options.amount = Math.round(amount * 100)
  }

  return await razorpay.payments.refund(paymentId, options)
}

// Get payment details
export async function getPayment(paymentId: string) {
  const razorpay = getRazorpay()
  return await razorpay.payments.fetch(paymentId)
}

// Create subscription
export async function createSubscription(
  planId: string,
  customerId?: string,
  totalCount?: number
) {
  const razorpay = getRazorpay()
  const options: Record<string, unknown> = {
    plan_id: planId,
    total_count: totalCount || 12,
  }

  if (customerId) {
    options.customer_id = customerId
  }

  return await razorpay.subscriptions.create(options)
}
