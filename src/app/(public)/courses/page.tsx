import Link from 'next/link'
import Image from 'next/image'
import { getAllCourses, type Course } from '@/lib/sanity/queries'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Region badge color mapping
const regionColors: Record<string, string> = {
  DGCA: 'bg-blue-100 text-blue-800 border-blue-200',
  FAA: 'bg-red-100 text-red-800 border-red-200',
  EASA: 'bg-emerald-100 text-emerald-800 border-emerald-200',
}

// Demo courses for fallback when Sanity is not configured
const demoCourses: Course[] = [
  {
    _id: 'demo-1',
    title: 'DGCA Aircraft Maintenance Engineering',
    slug: { current: 'dgca-aircraft-maintenance' },
    description: 'Comprehensive preparation for DGCA AME license examination. Covers all required subjects including Airframe, Engine, and Avionics.',
    thumbnail: null,
    price: 45000,
    region: 'DGCA',
    modules: [],
  },
  {
    _id: 'demo-2',
    title: 'FAA Private Pilot Ground School',
    slug: { current: 'faa-private-pilot' },
    description: 'Complete ground school preparation for FAA Private Pilot certificate. Includes aerodynamics, meteorology, navigation, and regulations.',
    thumbnail: null,
    price: 25000,
    region: 'FAA',
    modules: [],
  },
  {
    _id: 'demo-3',
    title: 'EASA Commercial Pilot License',
    slug: { current: 'easa-commercial-pilot' },
    description: 'Advanced CPL preparation following EASA standards. Comprehensive coverage of all JAR-FCL requirements.',
    thumbnail: null,
    price: 75000,
    region: 'EASA',
    modules: [],
  },
  {
    _id: 'demo-4',
    title: 'DGCA Navigator Certification',
    slug: { current: 'dgca-navigator' },
    description: 'Specialized course for DGCA Navigator examination. Radio navigation, inertial navigation, and performance-based navigation.',
    thumbnail: null,
    price: 35000,
    region: 'DGCA',
    modules: [],
  },
  {
    _id: 'demo-5',
    title: 'FAA Instrument Rating',
    slug: { current: 'faa-instrument-rating' },
    description: 'Prepare for FAA Instrument Rating practical test. Covers IFR procedures, instrument approaches, and airway navigation.',
    thumbnail: null,
    price: 30000,
    region: 'FAA',
    modules: [],
  },
  {
    _id: 'demo-6',
    title: 'EASA ATPL Theory',
    slug: { current: 'easa-atpl-theory' },
    description: 'Complete ATPL theoretical knowledge course following EASA standards. 14 subjects covering all required knowledge areas.',
    thumbnail: null,
    price: 120000,
    region: 'EASA',
    modules: [],
  },
]

export const metadata = {
  title: 'Courses | Aviation Academy',
  description: 'Browse our comprehensive aviation ground school courses for DGCA, FAA, and EASA certifications.',
}

export default async function CoursesPage() {
  let courses: Course[] = []

  try {
    courses = await getAllCourses()
  } catch (error) {
    console.error('Error fetching courses:', error)
  }

  // Use demo courses if no courses from Sanity
  if (courses.length === 0) {
    courses = demoCourses
  }

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
      <main className="flex-1 bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Our Courses
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive aviation ground school programs for DGCA, FAA, and EASA certifications.
              Choose your path to becoming a licensed aviation professional.
            </p>
          </div>

          {/* Region Filter Info */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                DGCA
              </span>
              <span className="text-sm text-slate-600">India</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium border border-red-200">
                FAA
              </span>
              <span className="text-sm text-slate-600">United States</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium border border-emerald-200">
                EASA
              </span>
              <span className="text-sm text-slate-600">Europe</span>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course._id} className="flex flex-col hover:shadow-lg transition-shadow">
                {/* Thumbnail */}
                <div className="relative h-48 bg-slate-200 rounded-t-lg overflow-hidden">
                  {course.thumbnail ? (
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <svg
                        className="w-16 h-16 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <Badge variant="outline" className={regionColors[course.region] || ''}>
                      {course.region}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="text-2xl font-bold text-slate-900">
                    ₹{course.price.toLocaleString('en-IN')}
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    One-time payment
                  </p>
                </CardContent>

                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/courses/${course.slug.current}`}>
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {courses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600">No courses available at the moment.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-4 text-center">
        <p>© 2026 Aviation Academy. All rights reserved.</p>
      </footer>
    </div>
  )
}
