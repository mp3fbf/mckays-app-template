"use server"

import { db } from "@/db/db"
import { subscriptionsTable } from "@/db/schema"
import { InsertSubscription, SelectSubscription } from "@/db/schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

export async function createSubscriptionAction(
  subscription: InsertSubscription
): Promise<ActionState<SelectSubscription>> {
  try {
    const [newSubscription] = await db
      .insert(subscriptionsTable)
      .values(subscription)
      .returning()

    return {
      isSuccess: true,
      message: "Subscription created successfully",
      data: newSubscription
    }
  } catch (error) {
    console.error("Error creating subscription:", error)
    return { isSuccess: false, message: "Failed to create subscription" }
  }
}

export async function getSubscriptionByIdAction(
  id: string
): Promise<ActionState<SelectSubscription>> {
  try {
    const [subscription] = await db
      .select()
      .from(subscriptionsTable)
      .where(eq(subscriptionsTable.id, id))

    if (!subscription) {
      return { isSuccess: false, message: "Subscription not found" }
    }

    return {
      isSuccess: true,
      message: "Subscription retrieved successfully",
      data: subscription
    }
  } catch (error) {
    console.error("Error getting subscription:", error)
    return { isSuccess: false, message: "Failed to get subscription" }
  }
}

export async function getSubscriptionsByUserIdAction(
  userId: string
): Promise<ActionState<SelectSubscription[]>> {
  try {
    const subscriptions = await db
      .select()
      .from(subscriptionsTable)
      .where(eq(subscriptionsTable.userId, userId))

    return {
      isSuccess: true,
      message: "Subscriptions retrieved successfully",
      data: subscriptions
    }
  } catch (error) {
    console.error("Error getting subscriptions:", error)
    return { isSuccess: false, message: "Failed to get subscriptions" }
  }
}

export async function updateSubscriptionAction(
  id: string,
  data: Partial<InsertSubscription>
): Promise<ActionState<SelectSubscription>> {
  try {
    const [updatedSubscription] = await db
      .update(subscriptionsTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(subscriptionsTable.id, id))
      .returning()

    if (!updatedSubscription) {
      return { isSuccess: false, message: "Subscription not found" }
    }

    return {
      isSuccess: true,
      message: "Subscription updated successfully",
      data: updatedSubscription
    }
  } catch (error) {
    console.error("Error updating subscription:", error)
    return { isSuccess: false, message: "Failed to update subscription" }
  }
}

export async function deleteSubscriptionAction(
  id: string
): Promise<ActionState<void>> {
  try {
    await db.delete(subscriptionsTable).where(eq(subscriptionsTable.id, id))

    return {
      isSuccess: true,
      message: "Subscription deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting subscription:", error)
    return { isSuccess: false, message: "Failed to delete subscription" }
  }
} 