// Exam types and interfaces

export interface Exam {
  id: string
  course_id: string
  title: string
  description: string | null
  duration_minutes: number
  passing_percentage: number
  negative_marking: number
  randomize_questions: boolean
  region: 'DGCA' | 'FAA' | 'EASA'
  is_active: boolean
  created_at: string
  course?: Course
  _count?: {
    questions: number
  }
}

export interface Question {
  id: string
  exam_id: string
  question_text: string
  question_type: string
  options: QuestionOption[]
  correct_answer: string
  explanation: string | null
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
}

export interface QuestionOption {
  label: string
  value: string
}

export interface ExamAttempt {
  id: string
  user_id: string
  exam_id: string
  started_at: string
  completed_at: string | null
  score: number | null
  percentage: number | null
  passed: boolean | null
  answers: ExamAnswer[]
  time_spent_seconds: number | null
}

export interface ExamAnswer {
  question_id: string
  selected_answer: string
  is_correct: boolean | null
  time_taken_seconds: number
}

export interface ExamConfig {
  // Timing
  duration_minutes: number
  allow_pause: boolean
  auto_submit: boolean
  
  // Scoring
  passing_percentage: number
  negative_marking: boolean
  negative_marking_value: number
  
  // Question Selection
  randomize_questions: boolean
  randomize_options: boolean
  questions_per_exam: number
  
  // Behavior
  show_results_immediately: boolean
  allow_review: boolean
  show_explanations: boolean
}

export interface ExamStatus {
  exam: Exam
  attempt: ExamAttempt | null
  bestScore: number | null
  canAttempt: boolean
  timeRemaining: number | null
}

// Default exam configurations by region
export const defaultExamConfigs: Record<string, ExamConfig> = {
  DGCA: {
    duration_minutes: 90,
    allow_pause: false,
    auto_submit: true,
    passing_percentage: 70,
    negative_marking: true,
    negative_marking_value: 0.25,
    randomize_questions: true,
    randomize_options: true,
    questions_per_exam: 100,
    show_results_immediately: true,
    allow_review: true,
    show_explanations: true,
  },
  FAA: {
    duration_minutes: 120,
    allow_pause: false,
    auto_submit: true,
    passing_percentage: 70,
    negative_marking: false,
    negative_marking_value: 0,
    randomize_questions: true,
    randomize_options: true,
    questions_per_exam: 60,
    show_results_immediately: true,
    allow_review: true,
    show_explanations: true,
  },
  EASA: {
    duration_minutes: 135,
    allow_pause: false,
    auto_submit: true,
    passing_percentage: 75,
    negative_marking: true,
    negative_marking_value: 0.2,
    randomize_questions: true,
    randomize_options: true,
    questions_per_exam: 90,
    show_results_immediately: true,
    allow_review: true,
    show_explanations: true,
  },
}

export interface Course {
  id: string
  title: string
  slug: string
}
