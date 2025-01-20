"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import {
  createProfileAction,
  getProfileByUserIdAction
} from "@/actions/db/profiles-actions"

export function AuthCheck() {
  const { user, isLoaded } = useUser()

  useEffect(() => {
    async function checkAndCreateProfile() {
      if (!user) return

      // Check if profile exists
      const { data: profile } = await getProfileByUserIdAction(user.id)

      // If no profile exists, create one
      if (!profile) {
        await createProfileAction({
          userId: user.id,
          membership: "free"
        })
      }
    }

    if (isLoaded && user) {
      checkAndCreateProfile()
    }
  }, [isLoaded, user])

  return null
}
