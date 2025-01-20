import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  numeric
} from "drizzle-orm/pg-core"
import { subscriptionsTable } from "./subscriptions-schema"

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "successful",
  "failed",
  "refunded"
])

export const paymentMethodEnum = pgEnum("payment_method", [
  "credit_card",
  "debit_card",
  "bank_transfer",
  "paypal",
  "other"
])

export const paymentsTable = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  subscriptionId: uuid("subscription_id").references(
    () => subscriptionsTable.id,
    { onDelete: "set null" }
  ),
  amount: numeric("amount").notNull(),
  currency: text("currency").notNull(),
  status: paymentStatusEnum("status").notNull(),
  method: paymentMethodEnum("method").notNull(),
  transactionId: text("transaction_id"),
  provider: text("provider"),
  description: text("description"),
  billingPeriodStart: timestamp("billing_period_start"),
  billingPeriodEnd: timestamp("billing_period_end"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertPayment = typeof paymentsTable.$inferInsert
export type SelectPayment = typeof paymentsTable.$inferSelect
