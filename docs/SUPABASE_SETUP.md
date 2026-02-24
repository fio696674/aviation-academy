# Supabase Setup Guide

This guide walks you through setting up Supabase for the Aviation Academy platform.

## Prerequisites

- A Supabase account (https://supabase.com)
- Node.js 18+ installed

---

## Step 1: Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in the details:
   - **Name**: `aviation-academy`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest to your users
4. Click **"Create new project"**
5. Wait for the project to be provisioned (1-2 minutes)

---

## Step 2: Get Your API Credentials

1. In your Supabase dashboard, go to **Project Settings** (gear icon)
2. Click **API**
3. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

---

## Step 3: Configure Environment Variables

Update your `.env.local` file with the real values:

```bash
# Replace placeholder values with your actual Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://vgnmogywhmaftydiztkv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnbm1vZ3l3aG1hZnR5ZGl6dGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5Mzk0NjQsImV4cCI6MjA4NzUxNTQ2NH0._L1qlMrWlyEY6ZAqYNMzsusARzk6lTTgMT1R3QV5q0c
```

---

## Step 4: Run the Database Schema

### Option A: Using Supabase SQL Editor (Recommended)

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Open the file `supabase/schema.sql` in your project
4. Copy all the SQL content
5. Paste it into the SQL Editor
6. Click **"Run"** to execute

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Push the schema
supabase db push
```

---

## Step 5: Verify Setup

1. Go to **Table Editor** in Supabase dashboard
2. You should see these tables:
   - `profiles`
   - `academies`
   - `courses`
   - `modules`
   - `enrollments`
   - `exams`
   - `questions`
   - `exam_attempts`
   - `payments`
   - `certificates`
   - `attendance`
   - `announcements`

3. Go to **Authentication** → **Users**
4. You should see a section for managing users

---

## Step 6: Test Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/register`
3. Create a test account
4. You should be redirected to the dashboard

---

## Troubleshooting

### "Invalid API key" error
- Make sure your `NEXT_PUBLIC_SUPABASE_ANON_KEY` matches exactly
- Check there are no extra spaces or quotes

### Authentication not working
- Check Supabase dashboard → Authentication → Settings
- Make sure "Enable Email Confirmations" is configured
- Check the "Site URL" is set to `http://localhost:3000`

### Database tables not created
- Go to SQL Editor and run the schema again
- Check for any error messages in the output

### Row Level Security (RLS) issues
- RLS is enabled by default on all tables
- The schema includes RLS policies for:
  - Users can only see their own profile
  - Users can only see their own enrollments
  - Admins can see all profiles

---

## Next Steps

- Configure [Razorpay](./RAZORPAY_SETUP.md) for payments
- Set up [Sanity CMS](./SANITY_SETUP.md) for content
- Deploy to [Vercel](./VERCEL_DEPLOY.md)

---

## Support

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
