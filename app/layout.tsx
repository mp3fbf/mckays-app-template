import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/toaster"
import { AuthCheck } from "@/components/auth/auth-check"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Substrack - Smart Subscription Management",
  description:
    "Manage all your subscriptions in one place with automated detection and smart insights.",
  keywords: [
    "subscription management",
    "subscription tracker",
    "recurring payments",
    "AI subscription detection",
    "multi-currency"
  ]
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthCheck />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
