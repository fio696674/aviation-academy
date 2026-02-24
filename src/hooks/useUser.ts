import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type UserRole = 'student' | 'staff' | 'admin' | 'erp'

export interface User {
  id: string
  email: string
  full_name?: string
  role: UserRole
  avatar_url?: string
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (authUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single()

        if (profile) {
          setUser({
            id: authUser.id,
            email: authUser.email || '',
            full_name: profile.full_name,
            role: profile.role as UserRole,
            avatar_url: profile.avatar_url,
          })
        }
      }
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        getUser()
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}

export function useRole() {
  const { user, loading } = useUser()
  return { role: user?.role, loading }
}

// Role checking utilities
export const hasRole = (userRole: UserRole | undefined, requiredRole: UserRole): boolean => {
  if (!userRole) return false
  
  const roleHierarchy: Record<UserRole, number> = {
    student: 1,
    staff: 2,
    erp: 3,
    admin: 4,
  }
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export const isAdmin = (role: UserRole | undefined): boolean => role === 'admin'
export const isStaff = (role: UserRole | undefined): boolean => ['staff', 'admin'].includes(role || '')
export const isStudent = (role: UserRole | undefined): boolean => ['student', 'staff', 'admin'].includes(role || '')
export const isERP = (role: UserRole | undefined): boolean => ['erp', 'admin'].includes(role || '')
