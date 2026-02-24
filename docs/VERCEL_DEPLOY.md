# Vercel Deployment Guide

This guide walks you through deploying the Aviation Academy platform to Vercel.

## Prerequisites

- A Vercel account (https://vercel.com)
- GitHub, GitLab, or Bitbucket repository
- Supabase project set up (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))

---

## Step 1: Prepare Your Repository

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to a remote repository:
   ```bash
   git remote add origin https://github.com/yourusername/aviation-academy.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **Project**
3. Import your GitHub repository:
   - Find `aviation-academy` in the list
   - Click **"Import"**
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build` (or leave empty)
   - **Output Directory**: `.next` (or leave empty)
5. Click **"Deploy"**

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? **Your name**
- Link to existing project? **No**
- Project name: **aviation-academy**
- Directory? **./**
- Want to modify settings? **No**

---

## Step 3: Configure Environment Variables

1. In Vercel dashboard, go to your project
2. Click **"Settings"** → **"Environment Variables"**
3. Add each variable:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL | Production, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Production, Development |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | Production, Development |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Production, Development |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Your Razorpay key ID | Production, Development |
| `RAZORPAY_KEY_ID` | Your Razorpay key ID | Production, Development |
| `RAZORPAY_KEY_SECRET` | Your Razorpay secret | Production |

4. Click **"Add"** for each variable
5. **Important**: Go to **"General"** settings and click **"Redeploy"** to apply the new environment variables

---

## Step 4: Configure Supabase for Production

1. Go to [Supabase Dashboard](https://supabase.com)
2. Navigate to your project
3. Go to **Authentication** → **URL Configuration**
4. Add your Vercel production URL:
   ```
   https://your-project.vercel.app
   ```
5. Click **"Save URL"**

---

## Step 5: Configure Razorpay for Production

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Go to **Settings** → **API Keys**
3. Generate production keys (if not already done)
4. Update the environment variables in Vercel with production values:
   - `RAZORPAY_KEY_ID` → Production Key ID
   - `RAZORPAY_KEY_SECRET` → Production Key Secret

---

## Step 6: Verify Deployment

1. Once deployed, Vercel will give you a URL
2. Visit the URL and verify:
   - [ ] Homepage loads
   - [ ] Login page works
   - [ ] Registration works
   - [ ] After login, redirected to dashboard

---

## Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your domain
3. Follow the instructions to configure DNS records
4. Wait for propagation (can take up to 24 hours)

---

## Continuous Deployment

Every time you push to main:
1. Vercel automatically detects the push
2. Runs the build
3. Deploys to production

To preview changes:
1. Create a pull request
2. Vercel creates a preview URL
3. Review your changes
4. Merge to deploy

---

## Troubleshooting

### Build failed
- Check the build log in Vercel dashboard
- Common issues:
  - Missing environment variables
  - TypeScript errors
  - Dependencies not installed

### Page not found (404)
- Check that your routes are correct
- Next.js App Router uses `/app` directory

### Authentication not working in production
- Verify Supabase URL Configuration includes your Vercel URL
- Check environment variables are set correctly

### Payment not working
- Verify Razorpay keys are production keys (not test keys)
- Check Razorpay dashboard for webhook events

---

## Monitoring

1. **Vercel Dashboard**:
   - Go to **"Dashboard"** → **"Analytics"**
   - View traffic, performance, and usage

2. **Function Logs**:
   - Go to **"Dashboard"** → **"Function Logs"**
   - See real-time API logs

---

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Discord: https://discord.gg/vercel
- Next.js Docs: https://nextjs.org/docs
