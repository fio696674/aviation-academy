import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="bg-slate-900 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:underline">
          Aviation Academy
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/courses" className="hover:underline">
            Courses
          </Link>
          
          {user ? (
            // Logged in - show user menu
            <>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/student" className="hover:underline">
                My Learning
              </Link>
              <Link 
                href="/profile"
                className="bg-slate-700 px-4 py-2 rounded hover:bg-slate-600"
              >
                Profile
              </Link>
            </>
          ) : (
            // Not logged in - show login/register
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-white text-slate-900 px-4 py-2 rounded hover:bg-slate-100"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
