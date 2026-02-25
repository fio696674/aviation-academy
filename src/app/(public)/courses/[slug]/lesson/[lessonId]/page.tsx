import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCourseBySlug, type Course, type Lesson } from '@/lib/sanity/queries'
import { LessonPlayer } from '@/components/LessonPlayer'

// Demo course with lessons (fallback)
const demoCourse: Course = {
  _id: 'demo-1',
  title: 'DGCA Aircraft Maintenance Engineering',
  slug: { current: 'dgca-aircraft-maintenance' },
  description: 'Comprehensive preparation for DGCA AME license examination.',
  thumbnail: null,
  price: 45000,
  region: 'DGCA',
  modules: [
    {
      _id: 'mod-1',
      title: 'Airframe Systems',
      description: 'Complete coverage of aircraft structure and systems',
      orderIndex: 1,
      lessons: [
        { _id: 'les-1', title: 'Introduction to Aircraft Structures', type: 'video', content: '', videoUrl: '', duration: 45, orderIndex: 1 },
        { _id: 'les-2', title: 'Flight Control Systems', type: 'video', content: '', videoUrl: '', duration: 60, orderIndex: 2 },
        { _id: 'les-3', title: 'Hydraulic Systems', type: 'text', content: '<h2>Hydraulic Systems Overview</h2><p>Aircraft hydraulic systems use fluid pressure to operate landing gear, flaps, brakes, and other mechanisms.</p><h3>Key Components</h3><ul><li>Reservoir</li><li>Pump</li><li>Selector Valves</li><li>Actuators</li></ul><h3>Hydraulic Fluids</h3><p>Most aircraft use Skydrol or similar phosphate ester-based fluids.</p>', videoUrl: '', duration: 30, orderIndex: 3 },
      ]
    },
    {
      _id: 'mod-2',
      title: 'Powerplant',
      description: 'Aircraft engine systems and maintenance',
      orderIndex: 2,
      lessons: [
        { _id: 'les-4', title: 'Piston Engines', type: 'video', content: '', videoUrl: '', duration: 55, orderIndex: 1 },
        { _id: 'les-5', title: 'Jet Engines', type: 'video', content: '', videoUrl: '', duration: 70, orderIndex: 2 },
        { _id: 'les-6', title: 'Engine Inspection', type: 'quiz', content: '', videoUrl: '', duration: 30, orderIndex: 3 },
      ]
    }
  ]
}

export async function generateStaticParams() {
  // Return static params for demo lessons
  return [
    { slug: 'dgca-aircraft-maintenance', lessonId: 'les-1' },
    { slug: 'dgca-aircraft-maintenance', lessonId: 'les-2' },
    { slug: 'dgca-aircraft-maintenance', lessonId: 'les-3' },
    { slug: 'dgca-aircraft-maintenance', lessonId: 'les-4' },
    { slug: 'dgca-aircraft-maintenance', lessonId: 'les-5' },
    { slug: 'dgca-aircraft-maintenance', lessonId: 'les-6' },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lessonId: string }> }) {
  const { slug, lessonId } = await params
  let course: Course | null = null
  
  try {
    course = await getCourseBySlug(slug)
  } catch (error) {
    console.error('Error fetching course:', error)
  }
  
  if (!course) {
    course = demoCourse
  }
  
  // Find the lesson
  const allLessons = course.modules.flatMap(m => m.lessons || [])
  const lesson = allLessons.find(l => l._id === lessonId)
  
  return {
    title: `${lesson?.title || 'Lesson'} | ${course.title} | Aviation Academy`,
    description: lesson ? `Watch or read: ${lesson.title}` : 'Aviation Academy Lesson',
  }
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string; lessonId: string }> }) {
  const { slug, lessonId } = await params
  let course: Course | null = null
  
  try {
    course = await getCourseBySlug(slug)
  } catch (error) {
    console.error('Error fetching course:', error)
  }
  
  // Use demo course if not found
  if (!course) {
    course = demoCourse
  }
  
  // Verify lesson exists
  const allLessons = course.modules.flatMap(m => m.lessons || [])
  const lessonExists = allLessons.some(l => l._id === lessonId)
  
  if (!lessonExists) {
    // Default to first lesson if not found
    return notFound()
  }
  
  return (
    <div className="min-h-screen">
      {/* Simple Header */}
      <header className="bg-slate-900 text-white py-3 px-4 flex items-center justify-between">
        <Link href={`/courses/${slug}`} className="text-sm hover:underline">
          ← Back to Course
        </Link>
        <span className="text-sm font-medium">{course.title}</span>
        <div className="w-20" /> {/* Spacer for balance */}
      </header>
      
      {/* Lesson Player */}
      <LessonPlayer 
        courseSlug={slug}
        modules={course.modules}
        currentLessonId={lessonId}
      />
    </div>
  )
}
