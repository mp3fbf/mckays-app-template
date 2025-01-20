"use client"

import {
  createProfileAction,
  getProfileByUserIdAction
} from "@/actions/db/profiles-actions"
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"

export function AuthCheck() {
  const { user } = useUser()

  useEffect(() => {
    async function checkAndCreateProfile() {
      if (user?.id) {
        const profileRes = await getProfileByUserIdAction(user.id)
        if (!profileRes.isSuccess) {
          await createProfileAction({ userId: user.id })
        }
      }
    }

    checkAndCreateProfile()
  }, [user?.id])

  return null
}
