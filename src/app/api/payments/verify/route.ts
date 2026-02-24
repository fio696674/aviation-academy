import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { verifySignature } from '@/lib/razorpay'

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentId, signature, courseId } = await request.json()

    if (!orderId || !paymentId || !signature || !courseId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify signature
    const isValid = verifySignature(orderId, paymentId, signature)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Get Supabase client
    const supabase = await createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Record payment in database
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        course_id: courseId,
        amount: 0, // Would get from order
        status: 'completed',
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
        completed_at: new Date().toISOString(),
      })

    if (paymentError) {
      console.error('Payment record error:', paymentError)
      // Continue even if recording fails
    }

    // Create enrollment
    const { error: enrollmentError } = await supabase
      .from('enrollments')
      .insert({
        user_id: user.id,
        course_id: courseId,
      })

    if (enrollmentError) {
      console.error('Enrollment error:', enrollmentError)
      // Check if already enrolled
      const { data: existing } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single()

      if (!existing) {
        return NextResponse.json(
          { error: 'Failed to create enrollment' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 }
    )
  }
}
