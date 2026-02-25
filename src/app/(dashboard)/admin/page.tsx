import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp,
  BookOpen,
  GraduationCap,
  Settings,
  Plus,
  ArrowUpRight,
  Globe,
  BarChart3
} from 'lucide-react'

// Demo data
const stats = {
  totalAcademies: 5,
  totalStudents: 1247,
  monthlyRevenue: 4580000,
  avgPassRate: 82,
}

const academies = [
  { id: '1', name: 'Delhi Aviation Academy', region: 'DGCA', students: 450, revenue: 1800000, passRate: 85 },
  { id: '2', name: 'Mumbai Flight Academy', region: 'DGCA', students: 320, revenue: 1200000, passRate: 78 },
  { id: '3', name: 'USA Aviation Center', region: 'FAA', students: 280, revenue: 950000, passRate: 88 },
  { id: '4', name: 'Europe Pilot Academy', region: 'EASA', students: 197, revenue: 630000, passRate: 79 },
]

const revenueData = [
  { month: 'Jan', revenue: 3200000 },
  { month: 'Feb', revenue: 3800000 },
  { month: 'Mar', revenue: 4100000 },
  { month: 'Apr', revenue: 3900000 },
  { month: 'May', revenue: 4200000 },
  { month: 'Jun', revenue: 4580000 },
]

export const metadata = {
  title: 'Super Admin Dashboard | Aviation Academy',
  description: 'Multi-academy management',
}

export default function SuperAdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold hover:underline">
            Aviation Academy
          </Link>
          <div className="flex gap-4">
            <Link href="/admin" className="hover:underline">Dashboard</Link>
            <Link href="/admin/academies" className="hover:underline">Academies</Link>
            <Link href="/admin/users" className="hover:underline">Users</Link>
            <Link href="/admin/settings" className="hover:underline">Settings</Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Super Admin Dashboard</h1>
            <p className="text-slate-600">Manage all academies and system-wide analytics</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Academy
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.totalAcademies}</div>
                  <div className="text-sm text-slate-500">Active Academies</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
                  <div className="text-sm text-slate-500">Total Students</div>
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
                  <div className="text-2xl font-bold">₹{(stats.monthlyRevenue / 100000).toFixed(1)}L</div>
                  <div className="text-sm text-slate-500">Monthly Revenue</div>
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
                  <div className="text-2xl font-bold">{stats.avgPassRate}%</div>
                  <div className="text-sm text-slate-500">Avg Pass Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Academies List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Academy Overview</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/academies">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {academies.map((academy) => (
                    <div key={academy.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <Globe className="w-6 h-6 text-slate-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{academy.name}</h3>
                          <div className="flex items-center gap-3 text-sm text-slate-500">
                            <Badge variant="outline">{academy.region}</Badge>
                            <span>{academy.students} students</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">₹{(academy.revenue / 100000).toFixed(1)}L</p>
                        <p className="text-sm text-slate-500">₹{(academy.revenue / academy.students).toFixed(0)}/student</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart Placeholder */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {revenueData.map((item, idx) => (
                    <div key={item.month} className="flex items-center gap-3">
                      <span className="w-10 text-sm text-slate-500">{item.month}</span>
                      <div className="flex-1 h-6 bg-slate-100 rounded overflow-hidden">
                        <div 
                          className="h-full bg-slate-900 rounded" 
                          style={{ width: `${(item.revenue / 5000000) * 100}%` }}
                        />
                      </div>
                      <span className="w-16 text-sm text-right font-medium">
                        ₹{(item.revenue / 100000).toFixed(0)}L
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Growth</span>
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +43%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/admin/academies">
                    <Building2 className="w-4 h-4 mr-2" />
                    Manage Academies
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/admin/users">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/admin/reports">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Reports
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/admin/settings">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
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
