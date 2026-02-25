'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  PlayCircle, 
  FileText, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  Clock,
  Menu,
  X
} from 'lucide-react'
import type { Lesson, Module } from '@/lib/sanity/queries'

interface LessonPlayerProps {
  courseSlug: string
  modules: Module[]
  currentLessonId: string
}

export function LessonPlayer({ courseSlug, modules, currentLessonId }: LessonPlayerProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())
  
  // Flatten all lessons to find prev/next
  const allLessons = modules.flatMap(m => m.lessons || [])
  const currentIndex = allLessons.findIndex(l => l._id === currentLessonId)
  const currentLesson = allLessons[currentIndex]
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null
  
  // Calculate progress
  const completedCount = completedLessons.size
  const totalCount = allLessons.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0
  
  const markComplete = () => {
    setCompletedLessons(prev => new Set([...prev, currentLessonId]))
  }
  
  const isCompleted = completedLessons.has(currentLessonId)
  
  if (!currentLesson) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-500">Lesson not found</p>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      {/* Sidebar Toggle (Mobile) */}
      <div className="lg:hidden p-4 bg-white border-b flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span className="ml-2">Course Content</span>
        </Button>
        <div className="text-sm text-slate-500">
          {completedCount}/{totalCount} completed
        </div>
      </div>
      
      {/* Sidebar */}
      <aside className={cn(
        "w-full lg:w-80 bg-white border-r overflow-y-auto transition-all",
        sidebarOpen ? "block" : "hidden lg:block"
      )}>
        {/* Progress */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Course Progress</span>
            <span className="text-sm text-slate-500">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        {/* Modules & Lessons */}
        <div className="p-4">
          {modules.map((module, moduleIndex) => (
            <div key={module._id} className="mb-6 last:mb-0">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs">
                  {moduleIndex + 1}
                </span>
                {module.title}
              </h3>
              <ul className="space-y-1 ml-8">
                {module.lessons?.map((lesson) => {
                  const isActive = lesson._id === currentLessonId
                  const isLessonCompleted = completedLessons.has(lesson._id)
                  
                  return (
                    <li key={lesson._id}>
                      <Link
                        href={`/courses/${courseSlug}/lesson/${lesson._id}`}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                          isActive 
                            ? "bg-slate-900 text-white" 
                            : "text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        {lesson.type === 'video' && <PlayCircle className="w-4 h-4 flex-shrink-0" />}
                        {lesson.type === 'text' && <FileText className="w-4 h-4 flex-shrink-0" />}
                        {lesson.type === 'quiz' && <HelpCircle className="w-4 h-4 flex-shrink-0" />}
                        <span className="flex-1 truncate">{lesson.title}</span>
                        {isLessonCompleted && (
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 lg:p-8">
          {/* Lesson Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <span className="capitalize">{currentLesson.type}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {currentLesson.duration} min
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              {currentLesson.title}
            </h1>
          </div>
          
          {/* Lesson Content */}
          <Card className="mb-6">
            <CardContent className="p-0">
              {currentLesson.type === 'video' && (
                <div className="aspect-video bg-slate-900 flex items-center justify-center">
                  {currentLesson.videoUrl ? (
                    <video 
                      src={currentLesson.videoUrl} 
                      controls 
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="text-center p-8">
                      <PlayCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Video content will be loaded from Sanity</p>
                    </div>
                  )}
                </div>
              )}
              
              {currentLesson.type === 'text' && (
                <div className="p-6 lg:p-8 prose prose-slate max-w-none">
                  {currentLesson.content ? (
                    <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                  ) : (
                    <div className="text-center p-8">
                      <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-500">Text content will be loaded from Sanity</p>
                      <p className="text-sm text-slate-400 mt-2">
                        Add content in Sanity Studio → Lessons → Content field
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {currentLesson.type === 'quiz' && (
                <div className="p-6 lg:p-8 text-center">
                  <HelpCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500 mb-4">Quiz functionality coming soon!</p>
                  <p className="text-sm text-slate-400">
                    MCP exam system (Task 17-20) will include comprehensive quiz features
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Actions */}
          <div className="flex items-center justify-between">
            <div>
              {prevLesson ? (
                <Button variant="outline" asChild>
                  <Link href={`/courses/${courseSlug}/lesson/${prevLesson._id}`}>
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              {!isCompleted && (
                <Button variant="secondary" onClick={markComplete}>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Mark Complete
                </Button>
              )}
              {isCompleted && (
                <Button variant="secondary" disabled>
                  <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  Completed
                </Button>
              )}
              
              {nextLesson ? (
                <Button asChild>
                  <Link href={`/courses/${courseSlug}/lesson/${nextLesson._id}`}>
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              ) : (
                <Button asChild>
                  <Link href={`/courses/${courseSlug}`}>
                    Finish
                    <CheckCircle className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
