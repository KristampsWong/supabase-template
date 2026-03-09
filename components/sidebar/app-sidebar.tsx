import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import Link from "next/link"
import { SidebarToggle } from "./sidebar-toggle"
import { getCurrentUser } from "@/lib/supabase/auth"
import SidebarUserNav from "./sidebar-user-nav"
export async function AppSidebar() {
  const user = await getCurrentUser()
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu className="space-y-4">
          <SidebarMenuItem className="flex items-center justify-between">
            <Link href="/" className="px-2 group-data-[state=collapsed]:hidden">
              <span className="text-lg font-medium">Acme</span>
            </Link>
            <SidebarToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarUserNav user={user!} />
      </SidebarFooter>
    </Sidebar>
  )
}
