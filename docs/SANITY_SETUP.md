# Sanity CMS Setup Guide

This guide walks you through setting up Sanity CMS for the Aviation Ground School Academy platform.

---

## Prerequisites

- A Sanity account (free tier works)
- Node.js 18+ installed

---

## Step 1: Create Sanity Project

1. **Install Sanity CLI globally:**
   ```bash
   npm install -g sanity
   ```

2. **Login to Sanity:**
   ```bash
   sanity login
   ```

3. **Create a new project:**
   ```bash
   sanity project create
   ```

   Follow the prompts:
   - **Project name:** `aviation-academy`
   - **Dataset:** `production`
   - **Template:** `Clean project with no predefined schemas`

4. **Note down your credentials:**
   - **Project ID** - You'll find it in the Sanity dashboard
   - **Dataset** - Use `production`

---

## Step 2: Configure Sanity in Vercel

Add these environment variables in **Vercel Dashboard → Settings → Environment Variables**:

| Variable | Value | Type |
|----------|-------|------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | Public |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Public |

---

## Step 3: Define Content Schemas

Navigate to your Sanity Studio (usually at `httpsanity.st://your-project.sudio`) and create these content types:

### 3.1 Course Schema

```javascript
// schemas/course.js
export default {
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'thumbnail', title: 'Thumbnail', type: 'image' },
    { name: 'price', title: 'Price (INR)', type: 'number' },
    { 
      name: 'region', 
      title: 'Region', 
      type: 'string',
      options: {
        list: [
          { title: 'DGCA (India)', value: 'DGCA' },
          { title: 'FAA (USA)', value: 'FAA' },
          { title: 'EASA (Europe)', value: 'EASA' }
        ]
      }
    },
    { name: 'isActive', title: 'Is Active', type: 'boolean', initialValue: true },
    { name: 'orderIndex', title: 'Order Index', type: 'number', initialValue: 0 }
  ]
}
```

### 3.2 Module Schema

```javascript
// schemas/module.js
export default {
  name: 'module',
  title: 'Module',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'course', title: 'Course', type: 'reference', to: [{ type: 'course' }] },
    { name: 'orderIndex', title: 'Order Index', type: 'number', initialValue: 0 }
  ]
}
```

### 3.3 Lesson Schema

```javascript
// schemas/lesson.js
export default {
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'type', title: 'Type', type: 'string', options: {
      list: [
        { title: 'Video', value: 'video' },
        { title: 'Text', value: 'text' },
        { title: 'Quiz', value: 'quiz' }
      ]
    }},
    { name: 'content', title: 'Content', type: 'text' },
    { name: 'videoUrl', title: 'Video URL', type: 'url' },
    { name: 'duration', title: 'Duration (minutes)', type: 'number' },
    { name: 'module', title: 'Module', type: 'reference', to: [{ type: 'module' }] },
    { name: 'orderIndex', title: 'Order Index', type: 'number', initialValue: 0 }
  ]
}
```

### 3.4 Announcement Schema

```javascript
// schemas/announcement.js
export default {
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'content', title: 'Content', type: 'text' },
    { name: 'isPublished', title: 'Is Published', type: 'boolean', initialValue: false },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' }
  ]
}
```

### 3.5 Instructor Schema

```javascript
// schemas/instructor.js
export default {
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'bio', title: 'Bio', type: 'text' },
    { name: 'photo', title: 'Photo', type: 'image' },
    { name: 'specialties', title: 'Specialties', type: 'array', of: [{ type: 'string' }] }
  ]
}
```

### 3.6 FAQ Schema

```javascript
// schemas/faq.js
export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string' },
    { name: 'answer', title: 'Answer', type: 'text' },
    { name: 'category', title: 'Category', type: 'string', options: {
      list: [
        { title: 'General', value: 'general' },
        { title: 'Payments', value: 'payments' },
        { title: 'Exams', value: 'exams' },
        { title: 'Certificates', value: 'certificates' }
      ]
    }},
    { name: 'order', title: 'Order', type: 'number', initialValue: 0 }
  ]
}
```

---

## Step 4: Register Schemas

Update your `sanity.config.js` or `sanity/schemaTypes/index.js`:

```javascript
import course from './course'
import module from './module'
import lesson from './lesson'
import announcement from './announcement'
import instructor from './instructor'
import faq from './faq'

export const schemaTypes = [
  course,
  module,
  lesson,
  announcement,
  instructor,
  faq
]
```

---

## Step 5: Add Sample Content

In your Sanity Studio, add sample data:

### 5.1 Add a Course
- Title: `DGCA Private Pilot License (PPL)`
- Region: `DGCA`
- Price: `25000`
- Description: `Complete ground school preparation for DGCA PPL examination`

### 5.2 Add Modules
- `Introduction to Aviation`
- `Air Regulations`
- `Meteorology`
- `Navigation`
- `Technical General`
- `Radio Telephony`

### 5.3 Add Lessons
Add 2-3 lessons per module with:
- Title: e.g., `Introduction to Aircraft`
- Type: `video` or `text`
- Content: Brief description
- Video URL: YouTube/Vimeo link (or leave empty for text lessons)
- Duration: e.g., `30` minutes

---

## Step 6: Test the Integration

After deployment, verify Sanity is connected:

1. Visit your deployed site
2. Check the console for any Sanity errors
3. If configured correctly, courses should load from Sanity

---

## Environment Variables Summary

| Variable | Where to Find | Example |
|----------|--------------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity Dashboard → Project Settings | `abcd1234` |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production` | `production` |

---

## Troubleshooting

### Content not showing?
- Check browser console for errors
- Verify environment variables are set in Vercel
- Ensure content is published in Sanity Studio

### Build errors?
- Make sure `NEXT_PUBLIC_SANITY_PROJECT_ID` doesn't have special characters
- Dataset name should be lowercase

### Need write access for content management?
Create a Sanity API token with write permissions and add as `SANITY_API_TOKEN` in Vercel (mark as secret).

---

## Next Steps

Once Sanity is set up, you can:
1. Manage courses, modules, and lessons from Sanity Studio
2. Add announcements and FAQs
3. Update instructor profiles
4. Content updates don't require code changes

---

**Need help?** Contact: support@aviationacademy.com
