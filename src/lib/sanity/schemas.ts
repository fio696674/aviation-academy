// Sanity Studio Schema Definitions
// Copy these to your Sanity Studio project

export const course = {
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'thumbnail', title: 'Thumbnail', type: 'image' },
    { name: 'price', title: 'Price', type: 'number' },
    { 
      name: 'region', 
      title: 'Region', 
      type: 'string',
      options: { list: ['DGCA', 'FAA', 'EASA'] }
    },
    { name: 'isActive', title: 'Is Active', type: 'boolean', initialValue: true },
    { name: 'orderIndex', title: 'Order Index', type: 'number', initialValue: 0 },
  ],
}

export const module = {
  name: 'module',
  title: 'Module',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'description', title: 'Description', type: 'text' },
    { 
      name: 'course', 
      title: 'Course', 
      type: 'reference', 
      to: [{ type: 'course' }] 
    },
    { name: 'orderIndex', title: 'Order Index', type: 'number', initialValue: 0 },
    { name: 'isPublished', title: 'Is Published', type: 'boolean', initialValue: false },
  ],
}

export const lesson = {
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { 
      name: 'module', 
      title: 'Module', 
      type: 'reference', 
      to: [{ type: 'module' }] 
    },
    { 
      name: 'type', 
      title: 'Type', 
      type: 'string',
      options: { list: ['video', 'text', 'quiz'] },
      initialValue: 'video'
    },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
    { name: 'videoUrl', title: 'Video URL', type: 'url' },
    { name: 'duration', title: 'Duration (minutes)', type: 'number' },
    { name: 'orderIndex', title: 'Order Index', type: 'number', initialValue: 0 },
  ],
}

export const announcement = {
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'content', title: 'Content', type: 'text' },
    { name: 'isPublished', title: 'Is Published', type: 'boolean', initialValue: false },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
  ],
}

export const instructor = {
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'bio', title: 'Bio', type: 'text' },
    { name: 'photo', title: 'Photo', type: 'image' },
    { name: 'specialties', title: 'Specialties', type: 'array', of: [{ type: 'string' }] },
  ],
}

export const faq = {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'answer', title: 'Answer', type: 'text' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'order', title: 'Order', type: 'number', initialValue: 0 },
  ],
}
