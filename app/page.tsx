import { getCurrentUser } from "@/lib/supabase/auth"
import { redirect } from "next/navigation"
import { NameSetupForm } from "@/components/auth/name-setup-form"

export default async function Home() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in")
  }

  const name = user.user_metadata?.full_name

  if (!name) {
    return <NameSetupForm />
  }
  return redirect("/dashboard")
}
