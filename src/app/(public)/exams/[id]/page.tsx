'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Flag
} from 'lucide-react'

// Demo questions
const demoQuestions = [
  {
    id: 'q1',
    question_text: 'What is the minimum visibility required for VFR flight in Class G airspace below 10,000 ft MSL during daylight hours?',
    options: [
      { label: 'A', value: 'a', text: '1 statute mile' },
      { label: 'B', value: 'b', text: '2 statute miles' },
      { label: 'C', value: 'c', text: '3 statute miles' },
      { label: 'D', value: 'd', text: '5 statute miles' },
    ],
    correct_answer: 'c',
    explanation: 'In Class G airspace below 10,000 ft MSL during daylight hours, the minimum visibility required for VFR flight is 1 statute mile. However, when above 10,000 ft MSL or at night, the requirement increases to 3 statute miles in certain conditions.',
    difficulty: 'medium' as const,
  },
  {
    id: 'q2',
    question_text: 'Which instrument provides information about the aircraft\'s altitude above sea level?',
    options: [
      { label: 'A', value: 'a', text: 'Altimeter' },
      { label: 'B', value: 'b', text: 'Airspeed Indicator' },
      { label: 'C', value: 'c', text: 'Vertical Speed Indicator' },
      { label: 'D', value: 'd', text: 'Heading Indicator' },
    ],
    correct_answer: 'a',
    explanation: 'The altimeter is a pressure-sensitive instrument that displays the aircraft\'s altitude above sea level. It works by measuring atmospheric pressure and converting it to altitude reading.',
    difficulty: 'easy' as const,
  },
  {
    id: 'q3',
    question_text: 'What is the standard temperature and pressure (STP) at sea level?',
    options: [
      { label: 'A', value: 'a', text: '15°C and 29.92 inches of Hg' },
      { label: 'B', value: 'b', text: '0°C and 30.00 inches of Hg' },
      { label: 'C', value: 'c', text: '20°C and 31.00 inches of Hg' },
      { label: 'D', value: 'd', text: '10°C and 29.92 inches of Hg' },
    ],
    correct_answer: 'a',
    explanation: 'Standard temperature at sea level is 15°C (59°F) and standard pressure is 29.92 inches of Mercury (inHg) or 1013.25 hPa. These are the ISA (International Standard Atmosphere) conditions.',
    difficulty: 'medium' as const,
  },
  {
    id: 'q4',
    question_text: 'Which of the following is NOT a required document to be carried on an aircraft during an international flight?',
    options: [
      { label: 'A', value: 'a', text: 'Certificate of Registration' },
      { label: 'B', value: 'b', text: 'Certificate of Airworthiness' },
      { label: 'C', value: 'c', text: 'Pilot\'s Medical Certificate' },
      { label: 'D', value: 'd', text: 'Aircraft Maintenance Log' },
    ],
    correct_answer: 'c',
    explanation: 'While a Pilot\'s Medical Certificate is required for flying, it does not need to be physically carried on the aircraft. Required aircraft documents include Certificate of Registration, Certificate of Airworthiness, Radio Station License (if equipped with radio), and Maintenance Records.',
    difficulty: 'hard' as const,
  },
  {
    id: 'q5',
    question_text: 'What is the purpose of the pitot tube in an aircraft?',
    options: [
      { label: 'A', value: 'a', text: 'To measure static pressure' },
      { label: 'B', value: 'b', text: 'To measure total pressure (pitot pressure)' },
      { label: 'C', value: 'c', text: 'To measure temperature' },
      { label: 'D', value: 'd', text: 'To measure humidity' },
    ],
    correct_answer: 'b',
    explanation: 'The pitot tube is a device that measures the total pressure (also called pitot pressure) of the fluid flowing into it. This measurement is used along with static pressure to calculate airspeed.',
    difficulty: 'easy' as const,
  },
]

const examInfo = {
  id: 'exam-1',
  title: 'DGCA AME Mock Test',
  duration_minutes: 90,
  passing_percentage: 70,
  negative_marking: 0.25,
  region: 'DGCA' as const,
}

export default function ExamPage({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [flagged, setFlagged] = useState<Set<string>>(new Set())
  const [timeRemaining, setTimeRemaining] = useState(examInfo.duration_minutes * 60)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Timer
  useEffect(() => {
    if (isSubmitted || timeRemaining <= 0) return
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isSubmitted, timeRemaining])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const toggleFlag = (questionId: string) => {
    setFlagged(prev => {
      const newSet = new Set(prev)
      if (newSet.has(questionId)) {
        newSet.delete(questionId)
      } else {
        newSet.add(questionId)
      }
      return newSet
    })
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    let wrong = 0
    let unanswered = 0
    
    demoQuestions.forEach(q => {
      if (!answers[q.id]) {
        unanswered++
      } else if (answers[q.id] === q.correct_answer) {
        correct++
      } else {
        wrong++
      }
    })
    
    const score = correct - (wrong * examInfo.negative_marking)
    const maxScore = demoQuestions.length
    const percentage = (score / maxScore) * 100
    
    return {
      correct,
      wrong,
      unanswered,
      score,
      maxScore,
      percentage,
      passed: percentage >= examInfo.passing_percentage
    }
  }

  const results = isSubmitted ? calculateScore() : null
  const question = demoQuestions[currentQuestion]
  const answeredCount = Object.keys(answers).length
  const progress = (answeredCount / demoQuestions.length) * 100

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                results.passed ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {results.passed ? (
                  <CheckCircle className="w-10 h-10 text-green-600" />
                ) : (
                  <XCircle className="w-10 h-10 text-red-600" />
                )}
              </div>
              <CardTitle className="text-2xl">
                {results.passed ? 'Congratulations! You Passed!' : 'Keep Practicing'}
              </CardTitle>
              <CardDescription className="text-lg">
                {examInfo.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-100 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-slate-900">{Math.round(results.percentage)}%</div>
                  <div className="text-sm text-slate-500">Your Score</div>
                </div>
                <div className="bg-slate-100 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-slate-900">{examInfo.passing_percentage}%</div>
                  <div className="text-sm text-slate-500">Passing Score</div>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Correct Answers</span>
                  <span className="font-semibold text-green-600">{results.correct}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Wrong Answers</span>
                  <span className="font-semibold text-red-600">{results.wrong}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Unanswered</span>
                  <span className="font-semibold text-slate-400">{results.unanswered}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Score (after negative marking)</span>
                  <span className="font-semibold">{results.score}/{results.maxScore}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button asChild className="flex-1">
                  <Link href="/exams">Back to Exams</Link>
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => window.location.reload()}>
                  Retake Exam
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 text-white py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/exams" className="hover:underline text-sm">
            ← Exit
          </Link>
          <span className="font-medium">{examInfo.title}</span>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={timeRemaining < 300 ? "destructive" : "secondary"} className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {formatTime(timeRemaining)}
          </Badge>
          <Button size="sm" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            Submit
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b px-4 py-2">
        <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
          <span>Question {currentQuestion + 1} of {demoQuestions.length}</span>
          <span>{answeredCount} answered</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 max-w-3xl">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline">
                {question.difficulty}
              </Badge>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toggleFlag(question.id)}
                className={flagged.has(question.id) ? 'text-amber-500' : ''}
              >
                <Flag className="w-4 h-4" />
              </Button>
            </div>
            <CardTitle className="text-lg font-normal mt-2">
              {question.question_text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[question.id] || ''}
              onValueChange={(value) => handleAnswer(question.id, value)}
              className="space-y-3"
            >
              {question.options.map((option) => (
                <div 
                  key={option.value}
                  className={`flex items-center space-x-2 p-4 rounded-lg border transition-colors cursor-pointer ${
                    answers[question.id] === option.value 
                      ? 'border-slate-900 bg-slate-50' 
                      : 'hover:border-slate-300'
                  }`}
                  onClick={() => handleAnswer(question.id, option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer flex items-center gap-3">
                    <span className="font-medium">{option.label}.</span>
                    <span>{option.text}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            {demoQuestions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  idx === currentQuestion 
                    ? 'bg-slate-900 text-white'
                    : answers[demoQuestions[idx].id]
                      ? 'bg-green-100 text-green-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <Button 
            onClick={() => setCurrentQuestion(prev => Math.min(demoQuestions.length - 1, prev + 1))}
            disabled={currentQuestion === demoQuestions.length - 1}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </main>
    </div>
  )
}
