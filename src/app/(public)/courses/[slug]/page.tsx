import Link from 'next/link'
import Image from 'next/image'
import { getCourseBySlug, type Course } from '@/lib/sanity/queries'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Clock, PlayCircle, FileText, HelpCircle } from 'lucide-react'

// Demo course for fallback
const demoCourse: Course = {
  _id: 'demo-1',
  title: 'DGCA Aircraft Maintenance Engineering',
  slug: { current: 'dgca-aircraft-maintenance' },
  description: 'Comprehensive preparation for DGCA AME license examination. This course covers all required subjects including Airframe, Engine, and Avionics systems. Designed by industry experts with years of experience in aviation maintenance training.',
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
        { _id: 'les-3', title: 'Hydraulic Systems', type: 'text', content: 'Comprehensive notes on hydraulic systems...', videoUrl: '', duration: 30, orderIndex: 3 },
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
    },
    {
      _id: 'mod-3',
      title: 'Avionics',
      description: 'Electronic systems in aircraft',
      orderIndex: 3,
      lessons: [
        { _id: 'les-7', title: 'Navigation Systems', type: 'video', content: '', videoUrl: '', duration: 50, orderIndex: 1 },
        { _id: 'les-8', title: 'Communication Systems', type: 'text', content: 'Notes on radio communications...', videoUrl: '', duration: 25, orderIndex: 2 },
      ]
    }
  ]
}

const regionColors: Record<string, string> = {
  DGCA: 'bg-blue-100 text-blue-800 border-blue-200',
  FAA: 'bg-red-100 text-red-800 border-red-200',
  EASA: 'bg-emerald-100 text-emerald-800 border-emerald-200',
}

const lessonTypeIcons = {
  video: PlayCircle,
  text: FileText,
  quiz: HelpCircle,
}

export async function generateStaticParams() {
  // Return static params for known courses
  return [
    { slug: 'dgca-aircraft-maintenance' },
    { slug: 'faa-private-pilot' },
    { slug: 'easa-commercial-pilot' },
    { slug: 'dgca-navigator' },
    { slug: 'faa-instrument-rating' },
    { slug: 'easa-atpl-theory' },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let course: Course | null = null
  
  try {
    course = await getCourseBySlug(slug)
  } catch (error) {
    console.error('Error fetching course:', error)
  }
  
  if (!course) {
    course = demoCourse
  }
  
  return {
    title: `${course.title} | Aviation Academy`,
    description: course.description,
  }
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
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
  
  const totalLessons = course.modules.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0)
  const totalDuration = course.modules.reduce((acc, mod) => 
    acc + (mod.lessons?.reduce((a, l) => a + (l.duration || 0), 0) || 0), 0
  )
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold hover:underline">
            Aviation Academy
          </Link>
          <div className="flex gap-4">
            <Link href="/courses" className="hover:underline">
              Courses
            </Link>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-white text-slate-900 px-4 py-2 rounded hover:bg-slate-100"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link 
            href="/courses" 
            className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Courses
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              {/* Hero */}
              <div className="relative h-64 md:h-80 bg-slate-200 rounded-xl overflow-hidden mb-8">
                {course.thumbnail ? (
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl font-bold text-slate-500">
                          {course.region.charAt(0)}
                        </span>
                      </div>
                      <p className="text-slate-500">{course.region} Course</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="outline" className={regionColors[course.region] || ''}>
                    {course.region}
                  </Badge>
                  <span className="text-slate-500">
                    {totalLessons} lessons • {Math.round(totalDuration / 60)} hours
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  {course.title}
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Curriculum */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Curriculum</h2>
                <div className="space-y-4">
                  {course.modules.map((module, moduleIndex) => (
                    <Card key={module._id}>
                      <CardHeader className="bg-slate-50">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <span className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm">
                            {moduleIndex + 1}
                          </span>
                          {module.title}
                        </CardTitle>
                        {module.description && (
                          <p className="text-sm text-slate-500 mt-1">{module.description}</p>
                        )}
                      </CardHeader>
                      <CardContent className="pt-4">
                        <ul className="space-y-3">
                          {module.lessons?.map((lesson, lessonIndex) => {
                            const LessonIcon = lessonTypeIcons[lesson.type as keyof typeof lessonTypeIcons] || FileText
                            return (
                              <li key={lesson._id} className="flex items-center gap-3 text-slate-600">
                                <LessonIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                <span className="flex-1">{lesson.title}</span>
                                <span className="text-sm text-slate-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {lesson.duration} min
                                </span>
                              </li>
                            )
                          })}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Enrollment */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-slate-900 mb-2">
                      ₹{course.price.toLocaleString('en-IN')}
                    </div>
                    <p className="text-sm text-slate-500 mb-6">One-time payment</p>
                    
                    <Button asChild className="w-full mb-4" size="lg">
                      <Link href={`/enroll?course=${course.slug.current}`}>
                        Enroll Now
                      </Link>
                    </Button>
                    
                    <p className="text-xs text-slate-500 text-center mb-4">
                      30-day money-back guarantee
                    </p>
                    
                    <div className="border-t pt-4 space-y-3">
                      <h4 className="font-medium text-slate-900">This course includes:</h4>
                      <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-center gap-2">
                          <PlayCircle className="w-4 h-4 text-green-500" />
                          {totalLessons} video lessons
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-green-500" />
                          Downloadable study materials
                        </li>
                        <li className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-green-500" />
                          Practice quizzes
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Certificate of completion
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Lifetime access
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-4 text-center">
        <p>© 2026 Aviation Academy. All rights reserved.</p>
      </footer>
    </div>
  )
}
