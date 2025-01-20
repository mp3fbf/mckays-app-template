"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const items = [
  {
    title: "Dashboard",
    href: "/dashboard"
  },
  {
    title: "Subscriptions",
    href: "/subscriptions"
  },
  {
    title: "Analytics",
    href: "/analytics"
  },
  {
    title: "Alerts",
    href: "/alerts"
  }
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-6">
      <Link href="/" className="hidden items-center space-x-2 lg:flex">
        <span className="hidden font-bold lg:inline-block">Substrack</span>
      </Link>
      {items.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "hover:text-primary text-sm font-medium transition-colors",
            pathname === item.href
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
