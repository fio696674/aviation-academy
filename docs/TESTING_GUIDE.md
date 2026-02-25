# Aviation Academy Testing Guide

This guide covers comprehensive testing procedures for both the web application and mobile app.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Web App Testing](#web-app-testing)
3. [Mobile App Testing](#mobile-app-testing)
4. [API Testing](#api-testing)
5. [Production Deployment Testing](#production-deployment-testing)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts
- [ ] GitHub account
- [ ] Vercel account
- [ ] Expo account (for mobile)
- [ ] Supabase account
- [ ] Sanity account (optional)
- [ ] Razorpay account (optional)

### Required Tools
```bash
# Install Node.js (v18+)
# https://nodejs.org/

# Install Git
# https://git-scm.com/

# Install Expo CLI (for mobile testing)
npm install -g expo

# Install Vercel CLI (optional)
npm install -g vercel
```

---

## Web App Testing

### 1. Local Development Testing

#### 1.1 Clone and Setup
```bash
# Clone the repository
git clone https://github.com/fio696674/aviation-academy.git
cd aviation-academy

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your credentials:
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
# NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
# NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
# RAZORPAY_KEY_SECRET=your_razorpay_secret
```

#### 1.2 Run Development Server
```bash
# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

#### 1.3 Test Checklist - Landing Page
| # | Test | Expected Result | Status |
|---|------|------------------|--------|
| 1 | Page loads | Homepage displays without errors | [ ] |
| 2 | Header displays | "Aviation Academy" title visible | [ ] |
| 3 | Navigation works | "Courses", "Login", "Register" links present | [ ] |
| 4 | Hero section | Main heading and CTA buttons visible | [ ] |
| 5 | Footer displays | Copyright text visible | [ ] |
| 6 | Responsive design | Works on mobile viewport | [ ] |
| 7 | No console errors | Browser console clean | [ ] |

#### 1.4 Test Checklist - Authentication
| # | Test | Expected Result | Status |
|---|------|------------------|--------|
| 1 | Navigate to /login | Login page loads | [ ] |
| 2 | Email input works | Can enter email | [ ] |
| 3 | Password input works | Can enter password | [ ] |
| 4 | Login button click | Submits form | [ ] |
| 5 | Invalid credentials | Shows error message | [ ] |
| 6 | Navigate to /register | Registration page loads | [ ] |
| 7 | Registration form | All fields present | [ ] |
| 8 | Register new user | Creates account (check Supabase) | [ ] |

#### 1.5 Test Checklist - Courses Page
| # | Test | Expected Result | Status |
|---|------|------------------|--------|
| 1 | Navigate to /courses | Courses page loads | [ ] |
| 2 | Course cards display | Shows course cards with details | [ ] |
| 3 | Region badges | DGCA/FAA/EASA badges visible | [ ] |
| 4 | Price display | Shows correct pricing | [ ] |
| 5 | Click course | Navigates to course detail | [ ] |

#### 1.6 Test Checklist - Course Detail
| # | Test | Expected Result | Status |
|---|------|------------------|--------|
| 1 | Course title | Displays course name | [ ] |
| 2 | Description | Shows course description | [ ] |
| 3 | Price | Shows correct price | [ ] |
| 4 | Region badge | Shows DGCA/FAA/EASA | [ ] |
| 5 | Enroll button | "Enroll Now" button present | [ ] |
| 6 | Curriculum | Modules and lessons listed | [ ] |
| 7 | Back to courses | "Back to Courses" link works | [ ] |

#### 1.7 Test Checklist - MCP Exams
| # | Test | Expected Result | Status |
|---|------|------------------|--------|
| 1 | Navigate to /exams | Exams page loads | [ ] |
| 2 | Exam cards display | Shows available exams | [ ] |
| 3 | Exam details | Duration, questions, passing % shown | [ ] |
| 4 | Start exam | Click "Start Practice" | [ ] |
| 5 | Timer works | Countdown timer visible | [ ] |
| 6 | Answer questions | Can select answers | [ ] |
| 7 | Navigate questions | Next/Previous buttons work | [ ] |
| 8 | Flag question | Can flag questions for review | [ ] |
| 9 | Submit exam | Submit button works | [ ] |
| 10 | Results display | Score and pass/fail shown | [ ] |
| 11 | Negative marking | Calculated correctly | [ ] |

#### 1.8 Test Checklist - Dashboard (After Login)
| # | Test | Expected Result | Status |
|---|------|------------------|--------|
| 1 | Navigate to /dashboard | Dashboard loads | [ ] |
| 2 | Enrolled courses | Shows enrolled courses | [ ] |
| 3 | Progress tracking | Progress bars display | [ ] |
| 4 | Upcoming exams | Shows scheduled exams | [ ] |
| 5 | Recent results | Shows exam history | [ ] |
| 6 | Quick actions | All buttons functional | [ ] |

#### 1.9 Test Checklist - Enrollment
| # | Test | Expected Result | Status |
|---|------|------------------|--------|
| 1 | Click Enroll | Enroll page loads | [ ] |
| 2 | Course details | Shows selected course | [ ] |
| 3 | Price display | Correct amount shown | [ ] |
| 4 | Payment options | Razorpay button present | [ ] |
| 5 | Security badges | Payment security info shown | [ ] |

#### 1.10 Test Checklist - Sanity Studio
| # | Test | Expected Result | Status |
|---|------|------------------|--------|
| 1 | Navigate to /studio | Sanity Studio loads | [ ] |
| 2 | Login | Can log in to Sanity | [ ] |
| 3 | Create course | Can add new course | [ ] |
| 4 | Add modules | Can add course modules | [ ] |
| 5 | Add lessons | Can add lessons | [ ] |
| 6 | Publish content | Content publishes successfully | [ ] |

---

### 2. Build Testing

```bash
# Run production build
npm run build

# Expected output:
# - No errors
# - All pages generated
# - Static pages prerendered
```

#### Build Success Criteria
| # | Check | Expected | Status |
|---|-------|----------|--------|
| 1 | No TypeScript errors | Clean build | [ ] |
| 2 | No ESLint errors | Clean lint | [ ] |
| 3 | All routes generated | Pages list shows all routes | [ ] |
| 4 | Static pages | ○ indicator for static | [ ] |
| 5 | Dynamic routes | ƒ indicator for dynamic | [ ] |

---

### 3. TypeScript Testing

```bash
# Run TypeScript check
npx tsc --noEmit

# Expected: No errors
```

---

## Mobile App Testing

### 1. Setup

```bash
# Navigate to mobile folder
cd ../aviation-academy-mobile

# Install dependencies
npm install
```

### 2. Run on Development

#### Option A: Expo Go (Recommended)
```bash
# Start Expo
npm start

# In browser:
# - Scan QR code with Expo Go app (Android/iOS)
# Or press:
# - 'a' for Android emulator
# - 'i' for iOS simulator (Mac only)
```

#### Option B: Android Emulator
```bash
# Install Android Studio
# https://developer.android.com/studio

# Start emulator
# Then run:
npm run android
```

#### Option C: iOS Simulator (Mac Only)
```bash
# Install Xcode
# https://developer.apple.com/xcode/

# Start simulator
# Then run:
npm run ios
```

### 3. Test Checklist - Mobile App

| # | Test | Expected Result | Status |
|---|------|------------------|--------|
| 1 | App launches | Splash screen shows, then home | [ ] |
| 2 | Home tab | Dashboard displays | [ ] |
| 3 | Course cards | Enrolled courses shown | [ ] |
| 4 | Exam cards | Practice tests listed | [ ] |
| 5 | Tab navigation | All 4 tabs work | [ ] |
| 6 | Courses tab | Course listing displays | [ ] |
| 7 | Tests tab | MCP tests listing | [ ] |
| 8 | Profile tab | Student profile shows | [ ] |
| 9 | Stats display | Courses, certificates, tests counts | [ ] |
| 10 | Menu items | All menu items present | [ ] |
| 11 | Responsive | Looks good on different sizes | [ ] |
| 12 | No crashes | App runs without crashing | [ ] |

---

### 4. Build APK (Android)

```bash
# Generate Android project
npx expo prebuild

# Build debug APK
cd android
./gradlew assembleDebug

# APK location: android/app/build/outputs/apk/debug/app-debug.apk
```

---

## API Testing

### 1. Supabase Testing

#### Test User Authentication
```bash
# Using Supabase Dashboard or CLI
# Test login with:
# - Valid credentials → Should succeed
# - Invalid credentials → Should show error
# - New registration → Should create user in auth.users
```

#### Test Database
```bash
# In Supabase SQL Editor:
# Test profiles table
SELECT * FROM profiles;

# Test RLS policies
# - Users can read own data
# - Admins can read all data
```

#### Test Checklist - Supabase
| # | Test | Expected Result | Status |
|---|------|------------------|--------|
| 1 | User registration | Creates auth.users record | [ ] |
| 2 | User login | Returns session | [ ] |
| 3 | Profile creation | Auto-creates profile | [ ] |
| 4 | RLS policies | Data isolation works | [ ] |
| 5 | Real-time | Changes sync automatically | [ ] |

### 2. Razorpay Testing (Optional)

#### Test Payments
```bash
# Use Razorpay Test Mode
# Test card: 4111 1111 1111 1111
# Any future expiry
# Any CVV
```

#### Test Checklist - Payments
| # | Test | Expected Result | Status |
|---|------|------------------|--------|
| 1 | Payment page load | Razorpay modal opens | [ ] |
| 2 | Test card payment | Payment succeeds | [ ] |
| 3 | Payment webhook | Order confirmed | [ ] |
| 4 | Failed payment | Shows error | [ ] |

---

## Production Deployment Testing

### 1. Vercel Deployment

#### Deploy to Vercel
```bash
# Option 1: GitHub Integration (Recommended)
# Push to GitHub → Vercel auto-deploys

# Option 2: Vercel CLI
cd aviation-academy
vercel --prod
```

#### Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| NEXT_PUBLIC_SUPABASE_URL | Your Supabase URL | Production |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Your anon key | Production |
| NEXT_PUBLIC_SANITY_PROJECT_ID | Your Sanity ID | Production |
| NEXT_PUBLIC_SANITY_DATASET | production | Production |
| NEXT_PUBLIC_RAZORPAY_KEY_ID | Your Key ID | Production |
| RAZORPAY_KEY_SECRET | Your Secret | Production |

### 2. Production Test Checklist

| # | Test | Expected Result | Status |
|---|------|------------------|--------|
| 1 | Production URL | Site loads | [ ] |
| 2 | HTTPS | Secure connection | [ ] |
| 3 | All pages load | No 404 errors | [ ] |
| 4 | Forms work | Login/Register functional | [ ] |
| 5 | Database | Supabase connected | [ ] |
| 6 | Sanity content | CMS content loads | [ ] |
| 7 | Payments | Razorpay works | [ ] |
| 8 | Performance | Page load < 3s | [ ] |
| 9 | Mobile responsive | Works on mobile | [ ] |
| 10 | No console errors | Clean console | [ ] |

### 3. Post-Deployment Verification

```bash
# Test all routes:
# https://your-domain.com/                  → Landing page
# https://your-domain.com/courses           → Courses
# https://your-domain.com/exams              → Exams
# https://your-domain.com/login              → Login
# https://your-domain.com/register          → Register
# https://your-domain.com/dashboard         → Dashboard
# https://your-domain.com/studio             → Sanity CMS
```

---

## Troubleshooting

### Common Issues

#### Web App
| Issue | Solution |
|-------|----------|
| Build fails | Run `npm install` again |
| Environment variables error | Check .env.local |
| Supabase connection error | Verify URL and keys |
| Sanity content not loading | Check project ID |
| Payment not working | Verify Razorpay keys |

#### Mobile App
| Issue | Solution |
|-------|----------|
| Expo not starting | Run `npm install` |
| QR code not scanning | Use same network |
| Emulator not starting | Install Android Studio |
| App crashes | Check console logs |

---

## Test Sign-Off

Before marking as complete, verify:

- [ ] All web app tests passed
- [ ] All mobile app tests passed  
- [ ] Production deployment successful
- [ ] No critical issues remaining

### Sign-Off
| Role | Name | Date | Signature |
|------|------|------|------------|
| QA | | | |
| Developer | | | |
| Product Owner | | | |

---

## Contact Support

For issues:
- GitHub Issues: https://github.com/fio696674/aviation-academy/issues
- Email: support@aviationacademy.com

---

**Last Updated:** February 2026
**Version:** 1.0.0
