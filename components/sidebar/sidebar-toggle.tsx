"use client"
import type { ComponentProps } from "react"

import { type SidebarTrigger, useSidebar } from "@/components/ui/sidebar"

import { cn } from "@/lib/utils"
import { Columns } from "lucide-react"

export function SidebarToggle({
  className,
}: ComponentProps<typeof SidebarTrigger>) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      className={cn(
        "rounded-md p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&>svg]:size-4",
        className
      )}
      data-testid="sidebar-toggle-button"
      onClick={toggleSidebar}
      aria-label="Toggle Sidebar"
    >
      <Columns className="size-4" />
    </button>
  )
}
