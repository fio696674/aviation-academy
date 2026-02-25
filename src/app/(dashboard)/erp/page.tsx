import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  GraduationCap,
  Users,
  DollarSign,
  FileText,
  Download,
  Search,
  Plus,
  Calendar,
  CreditCard,
  Receipt,
  TrendingUp,
  AlertCircle
} from 'lucide-react'

// Demo data
const stats = {
  totalStudents: 1247,
  thisMonthEnrollments: 89,
  pendingFees: 456000,
  collectedThisMonth: 2850000,
}

const recentPayments = [
  { id: '1', student: 'Rahul Sharma', amount: 45000, date: '2026-02-25', mode: 'Razorpay', status: 'Success' },
  { id: '2', student: 'Priya Patel', amount: 25000, date: '2026-02-24', mode: 'UPI', status: 'Success' },
  { id: '3', student: 'Amit Kumar', amount: 75000, date: '2026-02-23', mode: 'Net Banking', status: 'Pending' },
  { id: '4', student: 'Sneha Reddy', amount: 35000, date: '2026-02-22', mode: 'Razorpay', status: 'Success' },
]

const pendingInvoices = [
  { id: 'INV-001', student: 'Vikram Singh', amount: 25000, dueDate: '2026-02-20', status: 'Overdue' },
  { id: 'INV-002', student: 'Anita Desai', amount: 15000, dueDate: '2026-02-28', status: 'Due Soon' },
  { id: 'INV-003', student: 'Rajesh Gupta', amount: 45000, dueDate: '2026-03-05', status: 'Pending' },
]

const feeStructure = [
  { course: 'DGCA AME', totalFee: 45000, installments: 3, registration: 5000 },
  { course: 'FAA PPL', totalFee: 25000, installments: 2, registration: 3000 },
  { course: 'EASA ATPL', totalFee: 120000, installments: 4, registration: 10000 },
  { course: 'DGCA Navigator', totalFee: 35000, installments: 2, registration: 5000 },
]

export const metadata = {
  title: 'ERP Dashboard | Aviation Academy',
  description: 'Student Information System & Fee Management',
}

export default function ERPDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold hover:underline">
            Aviation Academy
          </Link>
          <div className="flex gap-4">
            <Link href="/erp" className="hover:underline">Dashboard</Link>
            <Link href="/erp/students" className="hover:underline">Students</Link>
            <Link href="/erp/fees" className="hover:underline">Fees</Link>
            <Link href="/erp/reports" className="hover:underline">Reports</Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">ERP Dashboard</h1>
            <p className="text-slate-600">Student Information System & Fee Management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Admission
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
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">+{stats.thisMonthEnrollments}</div>
                  <div className="text-sm text-slate-500">New Enrollments</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">₹{(stats.pendingFees / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-slate-500">Pending Fees</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">₹{(stats.collectedThisMonth / 100000).toFixed(1)}L</div>
                  <div className="text-sm text-slate-500">Collected This Month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Payments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Payments</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/erp/fees">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{payment.student}</p>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {payment.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{payment.amount.toLocaleString()}</p>
                      <Badge variant={payment.status === 'Success' ? 'default' : 'secondary'}>
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Invoices */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pending Invoices</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/erp/fees">Manage</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <Receipt className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{invoice.student}</p>
                        <p className="text-sm text-slate-500">Due: {invoice.dueDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{invoice.amount.toLocaleString()}</p>
                      <Badge variant={invoice.status === 'Overdue' ? 'destructive' : 'secondary'}>
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fee Structure */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Fee Structure</CardTitle>
              <CardDescription>Current course fee configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-slate-500">Course</th>
                      <th className="text-right py-3 px-4 font-medium text-slate-500">Total Fee</th>
                      <th className="text-center py-3 px-4 font-medium text-slate-500">Installments</th>
                      <th className="text-right py-3 px-4 font-medium text-slate-500">Registration</th>
                      <th className="text-center py-3 px-4 font-medium text-slate-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeStructure.map((fee, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-3 px-4 font-medium">{fee.course}</td>
                        <td className="text-right py-3 px-4">₹{fee.totalFee.toLocaleString()}</td>
                        <td className="text-center py-3 px-4">{fee.installments}</td>
                        <td className="text-right py-3 px-4">₹{fee.registration.toLocaleString()}</td>
                        <td className="text-center py-3 px-4">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
