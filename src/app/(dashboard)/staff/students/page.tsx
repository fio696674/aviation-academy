import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Plus, 
  MoreHorizontal,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Calendar,
  Filter
} from 'lucide-react'

// Demo students
const students = [
  { 
    id: '1', 
    name: 'Rahul Sharma', 
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    enrolled: 'DGCA AME',
    progress: 65,
    status: 'active',
    joinDate: 'Jan 2026'
  },
  { 
    id: '2', 
    name: 'Priya Patel', 
    email: 'priya.patel@email.com',
    phone: '+91 98765 43211',
    enrolled: 'FAA PPL',
    progress: 30,
    status: 'active',
    joinDate: 'Dec 2025'
  },
  { 
    id: '3', 
    name: 'Amit Kumar', 
    email: 'amit.kumar@email.com',
    phone: '+91 98765 43212',
    enrolled: 'EASA ATPL',
    progress: 0,
    status: 'pending',
    joinDate: 'Feb 2026'
  },
  { 
    id: '4', 
    name: 'Sneha Reddy', 
    email: 'sneha.reddy@email.com',
    phone: '+91 98765 43213',
    enrolled: 'DGCA Navigator',
    progress: 88,
    status: 'active',
    joinDate: 'Oct 2025'
  },
  { 
    id: '5', 
    name: 'Vikram Singh', 
    email: 'vikram.singh@email.com',
    phone: '+91 98765 43214',
    enrolled: 'DGCA AME',
    progress: 45,
    status: 'inactive',
    joinDate: 'Nov 2025'
  },
]

const statusColors = {
  active: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  inactive: 'bg-slate-100 text-slate-700',
}

export const metadata = {
  title: 'Student Management | Aviation Academy',
  description: 'Manage enrolled students',
}

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold hover:underline">
            Aviation Academy
          </Link>
          <div className="flex gap-4">
            <Link href="/staff" className="hover:underline">Dashboard</Link>
            <Link href="/staff/students" className="hover:underline">Students</Link>
            <Link href="/staff/exams" className="hover:underline">Exams</Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Student Management</h1>
            <p className="text-slate-600">View and manage all enrolled students</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <Input placeholder="Search by name, email, or phone..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <select className="px-3 py-2 border rounded-md text-sm">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Inactive</option>
                </select>
                <select className="px-3 py-2 border rounded-md text-sm">
                  <option>All Courses</option>
                  <option>DGCA AME</option>
                  <option>FAA PPL</option>
                  <option>EASA ATPL</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Students ({students.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Student</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-500">Course</th>
                    <th className="text-center py-3 px-4 font-medium text-slate-500">Progress</th>
                    <th className="text-center py-3 px-4 font-medium text-slate-500">Status</th>
                    <th className="text-center py-3 px-4 font-medium text-slate-500">Joined</th>
                    <th className="text-center py-3 px-4 font-medium text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{student.name}</p>
                            <p className="text-sm text-slate-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col text-sm">
                          <span className="flex items-center gap-1 text-slate-600">
                            <Mail className="w-3 h-3" />
                            {student.email}
                          </span>
                          <span className="flex items-center gap-1 text-slate-500">
                            <Phone className="w-3 h-3" />
                            {student.phone}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{student.enrolled}</Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-slate-900 h-2 rounded-full" 
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-sm">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge className={statusColors[student.status as keyof typeof statusColors]}>
                          {student.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-center text-sm text-slate-500">
                        {student.joinDate}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button variant="ghost" size="sm">
                            <BookOpen className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <GraduationCap className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Calendar className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
