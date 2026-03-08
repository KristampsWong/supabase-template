import Link from "next/link"
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        <Link href="/dashboard">Go to Dashboard</Link>
      </button>
    </div>
  )
}
