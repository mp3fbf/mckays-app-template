import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  numeric,
  boolean
} from "drizzle-orm/pg-core"

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "cancelled",
  "expired",
  "pending"
])

export const subscriptionFrequencyEnum = pgEnum("subscription_frequency", [
  "monthly",
  "quarterly",
  "yearly",
  "custom"
])

export const subscriptionsTable = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  amount: numeric("amount").notNull(),
  currency: text("currency").notNull(),
  frequency: subscriptionFrequencyEnum("frequency").notNull(),
  status: subscriptionStatusEnum("status").notNull().default("active"),
  nextBillingDate: timestamp("next_billing_date").notNull(),
  lastBillingDate: timestamp("last_billing_date"),
  provider: text("provider"),
  providerSubscriptionId: text("provider_subscription_id"),
  autoRenew: boolean("auto_renew").default(true).notNull(),
  isAutomaticallyDetected: boolean("is_automatically_detected")
    .default(false)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertSubscription = typeof subscriptionsTable.$inferInsert
export type SelectSubscription = typeof subscriptionsTable.$inferSelect
