# Getting Started Guide

Welcome to Aviation Academy! This guide will help you set up the project locally.

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or pnpm
- A code editor (VS Code recommended)
- Git

## Quick Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/aviation-academy.git
cd aviation-academy
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

Follow the [Supabase Setup Guide](./SUPABASE_SETUP.md) to:
1. Create a Supabase project
2. Get your API credentials
3. Run the database schema

### 4. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env.local

# Edit with your credentials
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
aviation-academy/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (auth)/      # Login, Register pages
│   │   ├── (dashboard)/ # Protected dashboard pages
│   │   └── api/         # API routes
│   ├── components/      # React components
│   │   └── ui/          # Shadcn UI components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility libraries
│       ├── supabase/    # Supabase clients
│       ├── sanity/      # Sanity CMS client
│       └── razorpay/    # Razorpay integration
├── supabase/
│   └── schema.sql       # Database schema
├── docs/                # Setup guides
└── public/              # Static assets
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## First Steps After Setup

1. **Create a user**: Go to `/register` and create an account
2. **Check database**: In Supabase Table Editor, verify the `profiles` table has your user
3. **Test auth**: Log out and log back in

---

## Next Steps

### For Development

- [ ] Set up Sanity CMS: See [SANITY_SETUP.md](./SANITY_SETUP.md)
- [ ] Configure Razorpay: See [RAZORPAY_SETUP.md](./RAZORPAY_SETUP.md)

### For Production

- [ ] Deploy to Vercel: See [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)
- [ ] Set up custom domain
- [ ] Configure production environment variables

---

## Common Issues

### "Module not found" errors
```bash
npm install
```

### Build errors
```bash
npm run build
```

### TypeScript errors
```bash
npx tsc --noEmit
```

---

## Need Help?

- Check the documentation in the `docs/` folder
- Open an issue on GitHub
- Contact the development team

---

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS, Shadcn UI
- **Backend**: Supabase (Auth, Database, Storage)
- **CMS**: Sanity.io
- **Payments**: Razorpay
- **Mobile**: React Native (Expo)

---

Last updated: February 2026
