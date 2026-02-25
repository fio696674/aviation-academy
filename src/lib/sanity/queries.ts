import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

// Course type definitions
export interface Course {
  _id: string
  title: string
  slug: { current: string }
  description: string
  thumbnail: any
  price: number
  region: 'DGCA' | 'FAA' | 'EASA'
  modules: Module[]
}

export interface Module {
  _id: string
  title: string
  description: string
  orderIndex?: number
  lessons: Lesson[]
}

export interface Lesson {
  _id: string
  title: string
  type: 'video' | 'text' | 'quiz'
  content: string
  videoUrl: string
  duration: number
  orderIndex?: number
}

// GROQ Queries
const courseFields = `
  _id,
  title,
  slug,
  description,
  thumbnail,
  price,
  region,
  modules[]{
    _id,
    title,
    description,
    orderIndex,
    lessons[]{
      _id,
      title,
      type,
      content,
      "videoUrl": videoUrl,
      duration,
      orderIndex
    }
  }
`

// Fetch all courses
export async function getAllCourses(): Promise<Course[]> {
  try {
    const query = groq`*[_type == "course"] | order(title asc) {
      ${courseFields}
    }`
    const courses = await client.fetch(query)
    return courses
  } catch (error) {
    console.error('Error fetching courses:', error)
    return []
  }
}

// Fetch single course by slug
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    const query = groq`*[_type == "course" && slug.current == $slug][0] {
      ${courseFields}
    }`
    const course = await client.fetch(query, { slug })
    return course || null
  } catch (error) {
    console.error('Error fetching course:', error)
    return null
  }
}

// Fetch courses by region
export async function getCoursesByRegion(region: 'DGCA' | 'FAA' | 'EASA'): Promise<Course[]> {
  try {
    const query = groq`*[_type == "course" && region == $region] | order(title asc) {
      ${courseFields}
    }`
    const courses = await client.fetch(query, { region })
    return courses
  } catch (error) {
    console.error('Error fetching courses by region:', error)
    return []
  }
}
