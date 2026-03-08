'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/sign-in')
  }

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
    >
      Sign Out
    </button>
  )
}
