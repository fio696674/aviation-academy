import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Target, HelpCircle, TrendingUp } from 'lucide-react'

// Demo exams data
const demoExams = [
  {
    id: 'exam-1',
    title: 'DGCA AME Mock Test',
    description: 'Complete mock test for Aircraft Maintenance Engineering license. Covers all 5 subjects with negative marking.',
    duration_minutes: 90,
    passing_percentage: 70,
    negative_marking: 0.25,
    region: 'DGCA' as const,
    _count: { questions: 100 },
    bestScore: null,
  },
  {
    id: 'exam-2',
    title: 'FAA Private Pilot Written',
    description: 'Practice test for FAA Private Pilot certificate. Covers aerodynamics, meteorology, navigation, and regulations.',
    duration_minutes: 120,
    passing_percentage: 70,
    negative_marking: 0,
    region: 'FAA' as const,
    _count: { questions: 60 },
    bestScore: 82,
  },
  {
    id: 'exam-3',
    title: 'EASA ATPL Theory Test',
    description: 'Comprehensive ATPL theoretical knowledge test following EASA standards. 14 subjects covered.',
    duration_minutes: 135,
    passing_percentage: 75,
    negative_marking: 0.2,
    region: 'EASA' as const,
    _count: { questions: 90 },
    bestScore: null,
  },
  {
    id: 'exam-4',
    title: 'DGCA Navigator Entrance',
    description: 'Mock test for DGCA Navigator certification. Radio navigation, inertial navigation, and PBN.',
    duration_minutes: 60,
    passing_percentage: 70,
    negative_marking: 0.25,
    region: 'DGCA' as const,
    _count: { questions: 50 },
    bestScore: 68,
  },
  {
    id: 'exam-5',
    title: 'FAA Instrument Rating',
    description: 'Practice test for FAA Instrument Rating. IFR procedures, instrument approaches, and airway navigation.',
    duration_minutes: 90,
    passing_percentage: 70,
    negative_marking: 0,
    region: 'FAA' as const,
    _count: { questions: 75 },
    bestScore: null,
  },
  {
    id: 'exam-6',
    title: 'Aviation Meteorology DGCA',
    description: 'Focused meteorology test for DGCA exams. Covers all meteorological concepts required for pilot license.',
    duration_minutes: 45,
    passing_percentage: 70,
    negative_marking: 0.25,
    region: 'DGCA' as const,
    _count: { questions: 40 },
    bestScore: 85,
  },
]

const regionColors: Record<string, string> = {
  DGCA: 'bg-blue-100 text-blue-800 border-blue-200',
  FAA: 'bg-red-100 text-red-800 border-red-200',
  EASA: 'bg-emerald-100 text-emerald-800 border-emerald-200',
}

export const metadata = {
  title: 'MCP Tests | Aviation Academy',
  description: 'Practice tests for DGCA, FAA, and EASA aviation certifications.',
}

export default function ExamsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold hover:underline">
            Aviation Academy
          </Link>
          <div className="flex gap-4">
            <Link href="/courses" className="hover:underline">Courses</Link>
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/login" className="hover:underline">Login</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              MCP Practice Tests
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Prepare for your aviation certification with our comprehensive MCP test system.
              Practice with real exam patterns from DGCA, FAA, and EASA.
            </p>
          </div>

          {/* Region Filter Info */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                DGCA
              </span>
              <span className="text-sm text-slate-600">India - 0.25 negative marking</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium border border-red-200">
                FAA
              </span>
              <span className="text-sm text-slate-600">USA - No negative marking</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium border border-emerald-200">
                EASA
              </span>
              <span className="text-sm text-slate-600">Europe - 0.2 negative marking</span>
            </div>
          </div>

          {/* Exams Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {demoExams.map((exam) => (
              <Card key={exam.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <Badge variant="outline" className={regionColors[exam.region]}>
                      {exam.region}
                    </Badge>
                    {exam.bestScore !== null && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Best: {exam.bestScore}%
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{exam.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {exam.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>{exam.duration_minutes} min</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <HelpCircle className="w-4 h-4" />
                      <span>{exam._count.questions} Q</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Target className="w-4 h-4" />
                      <span>{exam.passing_percentage}% to pass</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      {exam.negative_marking > 0 ? (
                        <span className="text-amber-600">-{exam.negative_marking} per wrong</span>
                      ) : (
                        <span className="text-green-600">No negative</span>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  {exam.bestScore !== null ? (
                    <div className="flex gap-2 w-full">
                      <Button asChild className="flex-1">
                        <Link href={`/exams/${exam.id}`}>Retake Test</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href={`/exams/${exam.id}/results`}>View Results</Link>
                      </Button>
                    </div>
                  ) : (
                    <Button asChild className="w-full">
                      <Link href={`/exams/${exam.id}`}>Start Practice</Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">About MCP Testing</h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Multiple Choice Pattern</h3>
                <p>Our MCP system uses the exact question patterns from DGCA, FAA, and EASA examinations to give you realistic practice.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Negative Marking</h3>
                <p>DGCA and EASA exams use negative marking. For every wrong answer, a fraction of marks is deducted. No penalty for unattempted questions.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Detailed Analytics</h3>
                <p>After each test, get detailed results showing your score, time per question, and explanations for each answer.</p>
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
