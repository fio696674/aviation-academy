import { NextRequest, NextResponse } from 'next/server'
import { createOrder, verifySignature } from '@/lib/razorpay'

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, courseId, courseName } = await request.json()

    if (!amount || !courseId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const order = await createOrder(amount, currency, `course_${courseId}_${Date.now()}`)

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error: any) {
    console.error('Razorpay order creation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    )
  }
}
