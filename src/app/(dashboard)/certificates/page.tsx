import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Award, 
  Download, 
  ExternalLink, 
  Calendar,
  CheckCircle,
  FileText,
  QrCode
} from 'lucide-react'

// Demo certificates
const certificates = [
  {
    id: 'cert-1',
    courseName: 'Aviation Meteorology DGCA',
    issueDate: '2026-02-15',
    certificateNumber: 'DGCA-MET-2026-001234',
    verificationCode: 'AVMET-ABC123',
    status: 'issued' as const,
  },
  {
    id: 'cert-2',
    courseName: 'FAA Private Pilot Ground School',
    issueDate: '2026-02-10',
    certificateNumber: 'FAA-PPL-2026-005678',
    verificationCode: 'FAAPPL-DEF456',
    status: 'issued' as const,
  },
  {
    id: 'cert-3',
    courseName: 'DGCA Aircraft Maintenance Engineering',
    issueDate: null,
    certificateNumber: null,
    verificationCode: null,
    status: 'pending' as const,
    progress: 65,
    requiredProgress: 100,
  },
]

export const metadata = {
  title: 'My Certificates | Aviation Academy',
  description: 'View and download your certificates',
}

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold hover:underline">
            Aviation Academy
          </Link>
          <div className="flex gap-4">
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/courses" className="hover:underline">Courses</Link>
            <Link href="/exams" className="hover:underline">Tests</Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Certificates</h1>
          <p className="text-slate-600">
            View and download your earned certificates. Each certificate has a unique verification code.
          </p>
        </div>

        {/* Issued Certificates */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Earned Certificates</h2>
          <div className="space-y-4">
            {certificates.filter(c => c.status === 'issued').map((cert) => (
              <Card key={cert.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Award className="w-7 h-7 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg">{cert.courseName}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Issued: {cert.issueDate}
                          </span>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        </div>
                        <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                          <div className="text-xs text-slate-500 mb-1">Certificate Number</div>
                          <div className="font-mono text-sm">{cert.certificateNumber}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download PDF
                      </Button>
                      <Button size="sm" variant="outline">
                        <QrCode className="w-4 h-4 mr-1" />
                        View QR
                      </Button>
                    </div>
                  </div>

                  {/* Verification Section */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-500">Verification Code</div>
                        <div className="font-mono text-sm bg-slate-100 px-2 py-1 rounded inline-block">
                          {cert.verificationCode}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <ExternalLink className="w-4 h-4" />
                        <span>Verify at aviationacademy.com/verify</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">In Progress</h2>
          <div className="space-y-4">
            {certificates.filter(c => c.status === 'pending').map((cert) => (
              <Card key={cert.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <FileText className="w-7 h-7 text-slate-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg">{cert.courseName}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                          <Badge variant="outline">In Progress</Badge>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-500">Course Progress</span>
                            <span className="font-medium">{cert.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-slate-900 h-2 rounded-full" 
                              style={{ width: `${cert.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button asChild>
                      <Link href={`/courses/dgca-aircraft-maintenance`}>
                        Continue Learning
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">About Your Certificates</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Certificates are issued upon completing 100% of course lessons</li>
            <li>• Each certificate has a unique verification code for authenticity</li>
            <li>• QR codes can be scanned to verify certificates instantly</li>
            <li>• Certificates are downloadable as PDF files</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
