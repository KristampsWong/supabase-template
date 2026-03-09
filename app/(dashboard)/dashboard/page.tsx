import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { SignOutButton } from "@/components/auth/sign-out-button"
import { NameSetupForm } from "@/components/auth/name-setup-form"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/sign-in")
  }

  const name = user.user_metadata?.full_name
  const email = user.email

  if (!name) {
    return <NameSetupForm />
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 border rounded-lg shadow-sm text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome, {name}!</h1>
        <p className="text-gray-600 mb-6">{email}</p>
        <SignOutButton />
      </div>
    </div>
  )
}
