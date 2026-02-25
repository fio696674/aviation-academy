import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  TrendingUp, 
  Calendar,
  Award,
  ArrowRight,
  PlayCircle,
  FileText
} from 'lucide-react'

// Demo enrolled courses with progress
const enrolledCourses = [
  {
    id: 'course-1',
    title: 'DGCA Aircraft Maintenance Engineering',
    slug: 'dgca-aircraft-maintenance',
    thumbnail: null,
    progress: 65,
    completedLessons: 12,
    totalLessons: 18,
    lastAccessed: '2 hours ago',
    nextLesson: 'Jet Engines',
  },
  {
    id: 'course-2',
    title: 'FAA Private Pilot Ground School',
    slug: 'faa-private-pilot',
    thumbnail: null,
    progress: 30,
    completedLessons: 18,
    totalLessons: 60,
    lastAccessed: '1 day ago',
    nextLesson: 'Navigation Basics',
  },
]

// Upcoming exams
const upcomingExams = [
  {
    id: 'exam-1',
    title: 'DGCA AME Mock Test',
    date: '2026-03-15',
    daysUntil: 5,
    registered: true,
  },
  {
    id: 'exam-3',
    title: 'EASA ATPL Theory Test',
    date: '2026-03-20',
    daysUntil: 10,
    registered: false,
  },
]

// Recent exam results
const recentResults = [
  {
    id: 'result-1',
    examTitle: 'Aviation Meteorology DGCA',
    score: 85,
    passed: true,
    date: '2026-02-20',
  },
  {
    id: 'result-2',
    examTitle: 'FAA Private Pilot Written',
    score: 82,
    passed: true,
    date: '2026-02-18',
  },
  {
    id: 'result-3',
    examTitle: 'DGCA Navigator Entrance',
    score: 68,
    passed: false,
    date: '2026-02-15',
  },
]

export const metadata = {
  title: 'Student Dashboard | Aviation Academy',
  description: 'Your learning dashboard',
}

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold hover:underline">
            Aviation Academy
          </Link>
          <div className="flex gap-4">
            <Link href="/courses" className="hover:underline">Courses</Link>
            <Link href="/exams" className="hover:underline">Tests</Link>
            <Link href="/profile" className="hover:underline">Profile</Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back!</h1>
          <p className="text-slate-600">Continue your aviation journey. You're making great progress!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                  <div className="text-sm text-slate-500">Enrolled Courses</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-slate-500">Certificates</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{upcomingExams.filter(e => e.registered).length}</div>
                  <div className="text-sm text-slate-500">Upcoming Exams</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2/3</div>
                  <div className="text-sm text-slate-500">Exams Passed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Continue Learning</h2>
                <Link href="/courses" className="text-sm text-slate-600 hover:underline flex items-center gap-1">
                  Browse all courses <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <div className="w-32 h-24 bg-slate-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-slate-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1">{course.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {course.lastAccessed}
                            </span>
                            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                          </div>
                          <div className="mb-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-slate-500">Progress</span>
                              <span className="font-medium">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">
                              Next: {course.nextLesson}
                            </span>
                            <Button size="sm" asChild>
                              <Link href={`/courses/${course.slug}`}>
                                <PlayCircle className="w-4 h-4 mr-1" />
                                Continue
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Upcoming Exams */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Upcoming Exams</h2>
                <Link href="/exams" className="text-sm text-slate-600 hover:underline flex items-center gap-1">
                  View all tests <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="space-y-3">
                {upcomingExams.map((exam) => (
                  <Card key={exam.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                            <FileText className="w-5 h-5 text-slate-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-900">{exam.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <Calendar className="w-4 h-4" />
                              {exam.date} • {exam.daysUntil} days left
                            </div>
                          </div>
                        </div>
                        {exam.registered ? (
                          <Badge variant="secondary">Registered</Badge>
                        ) : (
                          <Button size="sm" variant="outline">
                            Register
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Results */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Exam Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentResults.map((result) => (
                    <div key={result.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{result.examTitle}</p>
                        <p className="text-xs text-slate-500">{result.date}</p>
                      </div>
                      <div className="text-right">
                        <span className={`font-bold ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                          {result.score}%
                        </span>
                        <Badge variant={result.passed ? 'default' : 'destructive'} className="ml-2 text-xs">
                          {result.passed ? 'Pass' : 'Fail'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certificates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Certificates</CardTitle>
                <CardDescription>Download your earned certificates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-3">
                      <Award className="w-8 h-8 text-amber-600" />
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Aviation Meteorology</p>
                        <p className="text-xs text-slate-500">Issued: Feb 2026</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-3">
                      <Award className="w-8 h-8 text-amber-600" />
                      <div>
                        <p className="font-medium text-slate-900 text-sm">FAA PPL Ground School</p>
                        <p className="text-xs text-slate-500">Issued: Feb 2026</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/courses">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse Courses
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/exams">
                    <FileText className="w-4 h-4 mr-2" />
                    Take Practice Test
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/profile">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    View Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
