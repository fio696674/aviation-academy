import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Aviation Academy</h1>
          <div className="flex gap-4">
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/register" className="bg-white text-slate-900 px-4 py-2 rounded hover:bg-slate-100">Register</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">
            Master Aviation Ground School
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Comprehensive MCP exam preparation for DGCA, FAA, and EASA
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register" className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800">
              Get Started
            </Link>
            <Link href="/login" className="border border-slate-300 px-6 py-3 rounded-lg hover:bg-slate-100">
              Sign In
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-4 text-center">
        <p>© 2026 Aviation Academy. All rights reserved.</p>
      </footer>
    </div>
  );
}
