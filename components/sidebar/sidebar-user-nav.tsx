"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/client"
import { SettingsIcon, LogOut, Ellipsis } from "lucide-react"
import type { User } from "@supabase/supabase-js"

export default function SidebarUserNav({ user }: { user: User }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className={cn(
                "data-[state=open]:bg-sidebar-accent bg-sidebar data-[state=open]:text-sidebar-accent-foreground py-6 focus-visible:ring-0",
              )}
            >
              <Image
                alt={user.email ?? "User Avatar"}
                className="rounded-full"
                height={24}
                src={`https://avatar.vercel.sh/${user.email}`}
                width={24}
              />
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-sm text-card-foreground line-clamp-1 font-medium",
                  )}
                >
                  {user.user_metadata?.full_name}
                </span>
                <span className="text-xs text-muted-foreground line-clamp-1">
                  {user.email}
                </span>
              </div>
              <Ellipsis className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-52 bg-primary-foreground shadow rounded-lg ml-7"
          >
            <DropdownMenuItem asChild data-testid="user-nav-item-profile">
              <Link href="#" className="w-full capitalize">
                <SettingsIcon />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild data-testid="user-nav-item-auth">
              <button
                className="w-full cursor-pointer capitalize"
                onClick={async () => {
                  const supabase = createClient()
                  await supabase.auth.signOut()
                  window.location.href = "/"
                }}
                type="button"
              >
                <LogOut className="inline-block" />
                Sign out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
