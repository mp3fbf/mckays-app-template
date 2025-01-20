"use client"

import { SignedIn, SignedOut } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"

export default function LandingPage() {
  const { user, isLoaded } = useUser()

  // Redirect to dashboard if user is already signed in
  if (isLoaded && user) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Smart Subscription Management
      </h1>
      <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-8">
        Manage all your subscriptions in one place with automated detection,
        multi-currency support, and AI-driven insights.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <SignedOut>
          <Link
            href="/sign-up"
            className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Get Started
          </Link>
          <Link
            href="/sign-in"
            className="rounded-md px-6 py-3 text-sm font-semibold text-gray-900 hover:text-gray-700"
          >
            Sign In
          </Link>
        </SignedOut>
        <SignedIn>
          <Link
            href="/dashboard"
            className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Go to Dashboard
          </Link>
        </SignedIn>
      </div>
    </div>
  )
}
