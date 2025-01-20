"use client"

import { useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser()

  // Redirect to landing if not authenticated
  if (isLoaded && !user) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">{children}</main>
    </div>
  )
}
