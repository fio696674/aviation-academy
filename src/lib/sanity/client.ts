import { createClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

// GROQ Queries
export const queries = {
  // Get all courses
  courses: `*[_type == "course" && isActive == true] | order(orderIndex asc) {
    _id,
    title,
    slug,
    description,
    thumbnail,
    price,
    region,
    "modules": *[_type == "module" && references(^._id)] | order(orderIndex asc) {
      _id,
      title,
      "lessons": *[_type == "lesson" && references(^._id)] | order(orderIndex asc) {
        _id,
        title,
        type,
        content,
        videoUrl,
        duration
      }
    }
  }`,

  // Get single course by slug
  courseBySlug: `*[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    thumbnail,
    price,
    region,
    "modules": *[_type == "module" && references(^._id)] | order(orderIndex asc) {
      _id,
      title,
      description,
      orderIndex,
      "lessons": *[_type == "lesson" && references(^._id)] | order(orderIndex asc) {
        _id,
        title,
        type,
        content,
        videoUrl,
        duration,
        orderIndex
      }
    }
  }`,

  // Get announcements
  announcements: `*[_type == "announcement" && isPublished == true] | order(publishedAt desc)[0...10] {
    _id,
    title,
    content,
    publishedAt
  }`,

  // Get instructors
  instructors: `*[_type == "instructor"] | order(name asc) {
    _id,
    name,
    bio,
    photo,
    specialties
  }`,

  // Get FAQs
  faqs: `*[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }`,
}
