# Razorpay Setup Guide

This guide walks you through setting up Razorpay for payments in the Aviation Academy platform.

## Prerequisites

- A Razorpay account (https://razorpay.com)
- An Indian bank account (for payouts)

---

## Step 1: Create a Razorpay Account

1. Go to [razorpay.com](https://razorpay.com)
2. Click **"Sign Up"**
3. Fill in your details:
   - Business name
   - Business type (Education/Training)
   - Contact details
4. Complete KYC verification
5. Once verified, access your dashboard

---

## Step 2: Get Your API Keys

1. In Razorpay dashboard, go to **Settings** → **API Keys**
2. If keys don't exist, click **"Generate Keys"**
3. Copy:
   - **Key ID** (starts with `rzp_`)
   - **Key Secret**

---

## Step 3: Configure for Development

### Test Mode Keys

By default, Razorpay provides test mode keys:
- These work without real money
- Use test card numbers for payments:
  - Card: `4111 1111 1111 1111`
  - Expiry: Any future date
  - CVV: Any 3 digits
  - OTP: Any 6 digits

### Update Environment Variables

```bash
# In .env.local
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_test_key_id
RAZORPAY_KEY_ID=your_test_key_id
RAZORPAY_KEY_SECRET=your_test_key_secret
```

---

## Step 4: Configure for Production

### Switch to Live Mode

1. In Razorpay dashboard, toggle from **"Test Mode"** to **"Live Mode"**
2. Generate new live API keys:
   - Go to **Settings** → **API Keys**
   - Click **"Generate Keys"** (if in live mode)

### Update Environment Variables

```bash
# In Vercel Production Environment Variables
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_live_key_id
RAZORPAY_KEY_ID=your_live_key_id
RAZORPAY_KEY_SECRET=your_live_key_secret
```

---

## Step 5: Configure Webhooks

1. Go to **Settings** → **Webhooks**
2. Click **"Add New Webhook"**
3. Configure:
   - **URL**: `https://your-domain.com/api/webhooks/razorpay`
   - **Secret**: Generate a secret (save this!)
   - **Events**: Select:
     - `payment.authorized`
     - `payment.failed`
     - `refund.created`
4. Click **"Save Webhook"**

5. Add the webhook secret to environment:
   ```
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   ```

---

## Step 6: Test the Integration

### Test Payment Flow

1. Start your development server
2. Go to a course page
3. Click **"Buy Now"**
4. Enter test card details:
   - Card Number: `4111 1111 1111 1111`
   - Expiry: `12/28`
   - CVV: `123`
   - OTP: `123456`
5. Complete the payment
6. Verify:
   - Payment shows in Razorpay dashboard
   - Enrollment created in Supabase

---

## Razorpay Integration Code

The platform already includes:

### Payment API Routes

- `/api/payments/create-order` - Creates a Razorpay order
- `/api/payments/verify` - Verifies payment signature

### Payment Component

```tsx
import { PaymentButton } from '@/components/PaymentButton'

<PaymentButton
  amount={5000}
  courseId="course-123"
  courseName="Air Navigation"
  onSuccess={(paymentId) => console.log('Paid!', paymentId)}
  onError={(error) => console.error('Error!', error)}
/>
```

---

## Supported Payment Methods

Razorpay supports:
- Credit/Debit Cards (Visa, Mastercard, RuPay)
- UPI (Google Pay, PhonePe, Paytm)
- Net Banking
- Wallets
- EMI

---

## Refund Processing

To issue a refund:

1. Go to Razorpay Dashboard → **Transactions**
2. Find the payment
3. Click **"Refund"**
4. Enter refund amount (full or partial)
5. Confirm

The refund will be processed to the original payment method.

---

## Troubleshooting

### Payment not getting verified
- Check the signature verification code
- Ensure Key Secret is correct

### Webhook not received
- Verify webhook URL is publicly accessible
- Check webhook logs in Razorpay dashboard
- Ensure secret matches

### "Key ID not found" error
- Verify the Key ID is correct
- Check you're using live keys for production

### Payment shows as "failed"
- Check bank response
- Verify amount matches order

---

## Razorpay Fees

| Transaction Type | Fee |
|-----------------|-----|
| Domestic Cards | 2% |
| UPI | 0% |
| Wallets | 1.5% |
| Net Banking | 1.5% |

Note: Fees may vary. Check Razorpay dashboard for exact rates.

---

## Support

- Razorpay Docs: https://razorpay.com/docs
- Razorpay Support: support@razorpay.com
- Integration Support: technical support via dashboard

---

## Security Best Practices

1. **Never expose** `RAZORPAY_KEY_SECRET` on the client side
2. **Always verify** payment signatures on the server
3. **Use webhooks** for reliable payment confirmation
4. **Store payment IDs** for refund and reconciliation
5. **Enable 2FA** on your Razorpay account
