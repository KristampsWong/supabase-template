import { getCurrentUser } from "@/lib/supabase/auth"

export default async function DashboardPage() {
  const user = await getCurrentUser()
  const name = user?.user_metadata?.full_name

  return <div className="">Welcome,{name}</div>
}
