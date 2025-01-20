"use server"

import { db } from "@/db/db"
import { paymentsTable } from "@/db/schema"
import { InsertPayment, SelectPayment } from "@/db/schema"
import { ActionState } from "@/types"
import { eq, and, desc, gte, lte } from "drizzle-orm"

export async function createPaymentAction(
  payment: InsertPayment
): Promise<ActionState<SelectPayment>> {
  try {
    const [newPayment] = await db.insert(paymentsTable).values(payment).returning()

    return {
      isSuccess: true,
      message: "Payment created successfully",
      data: newPayment
    }
  } catch (error) {
    console.error("Error creating payment:", error)
    return { isSuccess: false, message: "Failed to create payment" }
  }
}

export async function getPaymentsByUserIdAction(
  userId: string
): Promise<ActionState<SelectPayment[]>> {
  try {
    const payments = await db
      .select()
      .from(paymentsTable)
      .where(eq(paymentsTable.userId, userId))
      .orderBy(desc(paymentsTable.createdAt))

    return {
      isSuccess: true,
      message: "Payments retrieved successfully",
      data: payments
    }
  } catch (error) {
    console.error("Error getting payments:", error)
    return { isSuccess: false, message: "Failed to get payments" }
  }
}

export async function getPaymentsBySubscriptionIdAction(
  subscriptionId: string
): Promise<ActionState<SelectPayment[]>> {
  try {
    const payments = await db
      .select()
      .from(paymentsTable)
      .where(eq(paymentsTable.subscriptionId, subscriptionId))
      .orderBy(desc(paymentsTable.createdAt))

    return {
      isSuccess: true,
      message: "Payments retrieved successfully",
      data: payments
    }
  } catch (error) {
    console.error("Error getting payments:", error)
    return { isSuccess: false, message: "Failed to get payments" }
  }
}

export async function getPaymentsByDateRangeAction(
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<ActionState<SelectPayment[]>> {
  try {
    const payments = await db
      .select()
      .from(paymentsTable)
      .where(
        and(
          eq(paymentsTable.userId, userId),
          and(
            eq(paymentsTable.status, "successful"),
            and(
              gte(paymentsTable.createdAt, startDate),
              lte(paymentsTable.createdAt, endDate)
            )
          )
        )
      )
      .orderBy(desc(paymentsTable.createdAt))

    return {
      isSuccess: true,
      message: "Payments retrieved successfully",
      data: payments
    }
  } catch (error) {
    console.error("Error getting payments:", error)
    return { isSuccess: false, message: "Failed to get payments" }
  }
}

export async function updatePaymentStatusAction(
  id: string,
  status: "successful" | "failed" | "refunded"
): Promise<ActionState<SelectPayment>> {
  try {
    const [updatedPayment] = await db
      .update(paymentsTable)
      .set({ status, updatedAt: new Date() })
      .where(eq(paymentsTable.id, id))
      .returning()

    if (!updatedPayment) {
      return { isSuccess: false, message: "Payment not found" }
    }

    return {
      isSuccess: true,
      message: "Payment status updated successfully",
      data: updatedPayment
    }
  } catch (error) {
    console.error("Error updating payment status:", error)
    return { isSuccess: false, message: "Failed to update payment status" }
  }
}

export async function deletePaymentAction(id: string): Promise<ActionState<void>> {
  try {
    await db.delete(paymentsTable).where(eq(paymentsTable.id, id))

    return {
      isSuccess: true,
      message: "Payment deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting payment:", error)
    return { isSuccess: false, message: "Failed to delete payment" }
  }
} 