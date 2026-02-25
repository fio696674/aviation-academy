import { type SchemaTypeDefinition } from 'sanity'

// Course Schema
export const course: SchemaTypeDefinition = {
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

// Module Schema
export const module: SchemaTypeDefinition = {
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

// Lesson Schema
export const lesson: SchemaTypeDefinition = {
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

// Announcement Schema
export const announcement: SchemaTypeDefinition = {
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

// Instructor Schema
export const instructor: SchemaTypeDefinition = {
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

// FAQ Schema
export const faq: SchemaTypeDefinition = {
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

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [course, module, lesson, announcement, instructor, faq],
}
