import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  TrendingUp,
  Calendar,
  FileText,
  Settings,
  Plus,
  Search,
  MoreHorizontal
} from 'lucide-react'

// Demo data
const stats = {
  totalStudents: 156,
  activeCourses: 8,
  examsThisWeek: 12,
  passRate: 78,
}

const recentEnrollments = [
  { id: '1', student: 'Rahul Sharma', course: 'DGCA AME', date: '2 hours ago' },
  { id: '2', student: 'Priya Patel', course: 'FAA PPL', date: '5 hours ago' },
  { id: '3', student: 'Amit Kumar', course: 'EASA ATPL', date: '1 day ago' },
]

const upcomingExams = [
  { id: '1', title: 'DGCA AME Mock Test', date: 'Tomorrow, 9:00 AM', students: 45 },
  { id: '2', title: 'FAA PPL Written', date: 'Mar 1, 2:00 PM', students: 23 },
  { id: '3', title: 'EASA ATPL Theory', date: 'Mar 3, 10:00 AM', students: 18 },
]

const recentResults = [
  { id: '1', exam: 'Aviation Meteorology', avgScore: 82, passRate: 89, students: 45 },
  { id: '2', exam: 'Navigation DGCA', avgScore: 76, passRate: 78, students: 42 },
  { id: '3', exam: 'Radio Telephony', avgScore: 71, passRate: 65, students: 38 },
]

export const metadata = {
  title: 'Staff Dashboard | Aviation Academy',
  description: 'Staff management dashboard',
}

export default function StaffDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold hover:underline">
            Aviation Academy
          </Link>
          <div className="flex gap-4">
            <Link href="/staff/students" className="hover:underline">Students</Link>
            <Link href="/staff/exams" className="hover:underline">Exams</Link>
            <Link href="/staff/courses" className="hover:underline">Courses</Link>
            <Link href="/staff/attendance" className="hover:underline">Attendance</Link>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Staff Dashboard</h1>
            <p className="text-slate-600">Manage students, courses, and exams</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.totalStudents}</div>
                  <div className="text-sm text-slate-500">Total Students</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.activeCourses}</div>
                  <div className="text-sm text-slate-500">Active Courses</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.examsThisWeek}</div>
                  <div className="text-sm text-slate-500">Exams This Week</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.passRate}%</div>
                  <div className="text-sm text-slate-500">Pass Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Enrollments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Enrollments</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/staff/students">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEnrollments.map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {enrollment.student.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{enrollment.student}</p>
                        <p className="text-sm text-slate-500">{enrollment.course}</p>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500">{enrollment.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Exams */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Exams</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/staff/exams">Manage</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{exam.title}</p>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {exam.date}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{exam.students} students</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Results */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Exam Results</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/staff/results">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Exam</th>
                      <th className="text-center py-3 px-4 font-medium text-slate-500">Students</th>
                      <th className="text-center py-3 px-4 font-medium text-slate-500">Avg Score</th>
                      <th className="text-center py-3 px-4 font-medium text-slate-500">Pass Rate</th>
                      <th className="text-center py-3 px-4 font-medium text-slate-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentResults.map((result) => (
                      <tr key={result.id} className="border-b">
                        <td className="py-3 px-4 font-medium">{result.exam}</td>
                        <td className="text-center py-3 px-4">{result.students}</td>
                        <td className="text-center py-3 px-4">
                          <span className={result.avgScore >= 70 ? 'text-green-600' : 'text-amber-600'}>
                            {result.avgScore}%
                          </span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <Badge variant={result.passRate >= 70 ? 'default' : 'secondary'}>
                            {result.passRate}%
                          </Badge>
                        </td>
                        <td className="text-center py-3 px-4">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex-col gap-2" asChild>
            <Link href="/staff/students">
              <Users className="w-6 h-6" />
              <span>Manage Students</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2" asChild>
            <Link href="/staff/exams">
              <FileText className="w-6 h-6" />
              <span>Create Exam</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2" asChild>
            <Link href="/staff/attendance">
              <Calendar className="w-6 h-6" />
              <span>Take Attendance</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2" asChild>
            <Link href="/staff/courses">
              <BookOpen className="w-6 h-6" />
              <span>Manage Courses</span>
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
