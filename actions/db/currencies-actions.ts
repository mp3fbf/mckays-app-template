"use server"

import { db } from "@/db/db"
import { currenciesTable } from "@/db/schema"
import { InsertCurrency, SelectCurrency } from "@/db/schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

export async function createCurrencyAction(
  currency: InsertCurrency
): Promise<ActionState<SelectCurrency>> {
  try {
    const [newCurrency] = await db
      .insert(currenciesTable)
      .values(currency)
      .returning()

    return {
      isSuccess: true,
      message: "Currency created successfully",
      data: newCurrency
    }
  } catch (error) {
    console.error("Error creating currency:", error)
    return { isSuccess: false, message: "Failed to create currency" }
  }
}

export async function getAllCurrenciesAction(): Promise<
  ActionState<SelectCurrency[]>
> {
  try {
    const currencies = await db.select().from(currenciesTable)

    return {
      isSuccess: true,
      message: "Currencies retrieved successfully",
      data: currencies
    }
  } catch (error) {
    console.error("Error getting currencies:", error)
    return { isSuccess: false, message: "Failed to get currencies" }
  }
}

export async function getBaseCurrencyAction(): Promise<
  ActionState<SelectCurrency>
> {
  try {
    const [baseCurrency] = await db
      .select()
      .from(currenciesTable)
      .where(eq(currenciesTable.isBaseCurrency, true))

    if (!baseCurrency) {
      return { isSuccess: false, message: "Base currency not found" }
    }

    return {
      isSuccess: true,
      message: "Base currency retrieved successfully",
      data: baseCurrency
    }
  } catch (error) {
    console.error("Error getting base currency:", error)
    return { isSuccess: false, message: "Failed to get base currency" }
  }
}

export async function updateCurrencyAction(
  code: string,
  data: Partial<InsertCurrency>
): Promise<ActionState<SelectCurrency>> {
  try {
    const [updatedCurrency] = await db
      .update(currenciesTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(currenciesTable.code, code))
      .returning()

    if (!updatedCurrency) {
      return { isSuccess: false, message: "Currency not found" }
    }

    return {
      isSuccess: true,
      message: "Currency updated successfully",
      data: updatedCurrency
    }
  } catch (error) {
    console.error("Error updating currency:", error)
    return { isSuccess: false, message: "Failed to update currency" }
  }
}

export async function updateExchangeRatesAction(
  rates: { code: string; rate: string }[]
): Promise<ActionState<SelectCurrency[]>> {
  try {
    const updatedCurrencies = await Promise.all(
      rates.map(async ({ code, rate }) => {
        const [currency] = await db
          .update(currenciesTable)
          .set({
            exchangeRate: rate,
            lastUpdated: new Date(),
            updatedAt: new Date()
          })
          .where(eq(currenciesTable.code, code))
          .returning()
        return currency
      })
    )

    return {
      isSuccess: true,
      message: "Exchange rates updated successfully",
      data: updatedCurrencies.filter(Boolean)
    }
  } catch (error) {
    console.error("Error updating exchange rates:", error)
    return { isSuccess: false, message: "Failed to update exchange rates" }
  }
}

export async function deleteCurrencyAction(
  code: string
): Promise<ActionState<void>> {
  try {
    const [currency] = await db
      .select()
      .from(currenciesTable)
      .where(eq(currenciesTable.code, code))

    if (currency?.isBaseCurrency) {
      return {
        isSuccess: false,
        message: "Cannot delete base currency"
      }
    }

    await db.delete(currenciesTable).where(eq(currenciesTable.code, code))

    return {
      isSuccess: true,
      message: "Currency deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting currency:", error)
    return { isSuccess: false, message: "Failed to delete currency" }
  }
} 