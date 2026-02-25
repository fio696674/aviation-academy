import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCourseBySlug, type Course } from '@/lib/sanity/queries'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Shield, 
  GraduationCap,
  FileText,
  PlayCircle,
  Award
} from 'lucide-react'

// Demo course for fallback
const demoCourse: Course = {
  _id: 'demo-1',
  title: 'DGCA Aircraft Maintenance Engineering',
  slug: { current: 'dgca-aircraft-maintenance' },
  description: 'Comprehensive preparation for DGCA AME license examination.',
  thumbnail: null,
  price: 45000,
  region: 'DGCA',
  modules: []
}

export async function generateStaticParams() {
  return [
    { slug: 'dgca-aircraft-maintenance' },
    { slug: 'faa-private-pilot' },
    { slug: 'easa-commercial-pilot' },
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
    title: `Enroll: ${course.title} | Aviation Academy`,
    description: `Enroll in ${course.title} and start learning today.`,
  }
}

export default async function EnrollPage({ params }: { params: Promise<{ slug: string }> }) {
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
  
  // Check if already enrolled (demo - would check database)
  const isEnrolled = false
  
  if (isEnrolled) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">You're Enrolled!</h2>
            <p className="text-slate-600 mb-6">
              You have access to {course.title}. Start learning now!
            </p>
            <Button asChild className="w-full">
              <Link href={`/courses/${slug}`}>Start Learning</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4">
          <Link href={`/courses/${slug}`} className="inline-flex items-center text-sm hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Course
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Course Details */}
          <div>
            <Badge variant="outline" className="mb-2">{course.region}</Badge>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{course.title}</h1>
            <p className="text-slate-600 mb-6">{course.description}</p>
            
            {/* What's Included */}
            <div className="space-y-3 mb-6">
              <h2 className="font-semibold text-slate-900">This course includes:</h2>
              <div className="flex items-center gap-3 text-slate-600">
                <PlayCircle className="w-5 h-5 text-green-600" />
                <span>Video lessons with expert instructors</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <FileText className="w-5 h-5 text-green-600" />
                <span>Downloadable study materials</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Award className="w-5 h-5 text-green-600" />
                <span>Certificate of completion</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Clock className="w-5 h-5 text-green-600" />
                <span>Lifetime access</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>

          {/* Enrollment Card */}
          <div>
            <Card className="sticky top-8 shadow-lg">
              <CardHeader>
                <CardTitle>Enroll Now</CardTitle>
                <CardDescription>Start your aviation career today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-900">
                      ₹{course.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-slate-500">INR</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">One-time payment</p>
                </div>

                <div className="space-y-3 mb-6">
                  <Button className="w-full" size="lg">
                    Pay with Razorpay
                  </Button>
                  <Button variant="outline" className="w-full" disabled>
                    Pay with UPI
                  </Button>
                  <Button variant="outline" className="w-full" disabled>
                    Pay with Net Banking
                  </Button>
                </div>

                <div className="text-center text-sm text-slate-500">
                  <p className="flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4" />
                    Secure payment powered by Razorpay
                  </p>
                  <p className="mt-2">
                    100% money-back guarantee within 30 days
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
