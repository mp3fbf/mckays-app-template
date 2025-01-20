"use server"

import { db } from "@/db/db"
import { alertsTable } from "@/db/schema"
import { InsertAlert, SelectAlert } from "@/db/schema"
import { ActionState } from "@/types"
import { eq, and, lte } from "drizzle-orm"

export async function createAlertAction(
  alert: InsertAlert
): Promise<ActionState<SelectAlert>> {
  try {
    const [newAlert] = await db.insert(alertsTable).values(alert).returning()

    return {
      isSuccess: true,
      message: "Alert created successfully",
      data: newAlert
    }
  } catch (error) {
    console.error("Error creating alert:", error)
    return { isSuccess: false, message: "Failed to create alert" }
  }
}

export async function getAlertsByUserIdAction(
  userId: string
): Promise<ActionState<SelectAlert[]>> {
  try {
    const alerts = await db
      .select()
      .from(alertsTable)
      .where(eq(alertsTable.userId, userId))

    return {
      isSuccess: true,
      message: "Alerts retrieved successfully",
      data: alerts
    }
  } catch (error) {
    console.error("Error getting alerts:", error)
    return { isSuccess: false, message: "Failed to get alerts" }
  }
}

export async function getUnreadAlertsByUserIdAction(
  userId: string
): Promise<ActionState<SelectAlert[]>> {
  try {
    const alerts = await db
      .select()
      .from(alertsTable)
      .where(
        and(eq(alertsTable.userId, userId), eq(alertsTable.isRead, false))
      )

    return {
      isSuccess: true,
      message: "Unread alerts retrieved successfully",
      data: alerts
    }
  } catch (error) {
    console.error("Error getting unread alerts:", error)
    return { isSuccess: false, message: "Failed to get unread alerts" }
  }
}

export async function getPendingAlertsAction(): Promise<
  ActionState<SelectAlert[]>
> {
  try {
    const now = new Date()
    const alerts = await db
      .select()
      .from(alertsTable)
      .where(
        and(
          eq(alertsTable.status, "pending"),
          lte(alertsTable.scheduledFor, now)
        )
      )

    return {
      isSuccess: true,
      message: "Pending alerts retrieved successfully",
      data: alerts
    }
  } catch (error) {
    console.error("Error getting pending alerts:", error)
    return { isSuccess: false, message: "Failed to get pending alerts" }
  }
}

export async function markAlertAsReadAction(
  id: string
): Promise<ActionState<SelectAlert>> {
  try {
    const [updatedAlert] = await db
      .update(alertsTable)
      .set({ isRead: true, updatedAt: new Date() })
      .where(eq(alertsTable.id, id))
      .returning()

    if (!updatedAlert) {
      return { isSuccess: false, message: "Alert not found" }
    }

    return {
      isSuccess: true,
      message: "Alert marked as read successfully",
      data: updatedAlert
    }
  } catch (error) {
    console.error("Error marking alert as read:", error)
    return { isSuccess: false, message: "Failed to mark alert as read" }
  }
}

export async function updateAlertStatusAction(
  id: string,
  status: "sent" | "failed" | "dismissed"
): Promise<ActionState<SelectAlert>> {
  try {
    const [updatedAlert] = await db
      .update(alertsTable)
      .set({
        status,
        sentAt: status === "sent" ? new Date() : undefined,
        updatedAt: new Date()
      })
      .where(eq(alertsTable.id, id))
      .returning()

    if (!updatedAlert) {
      return { isSuccess: false, message: "Alert not found" }
    }

    return {
      isSuccess: true,
      message: "Alert status updated successfully",
      data: updatedAlert
    }
  } catch (error) {
    console.error("Error updating alert status:", error)
    return { isSuccess: false, message: "Failed to update alert status" }
  }
}

export async function deleteAlertAction(id: string): Promise<ActionState<void>> {
  try {
    await db.delete(alertsTable).where(eq(alertsTable.id, id))

    return {
      isSuccess: true,
      message: "Alert deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting alert:", error)
    return { isSuccess: false, message: "Failed to delete alert" }
  }
} 