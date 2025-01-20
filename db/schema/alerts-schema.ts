import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  boolean
} from "drizzle-orm/pg-core"
import { subscriptionsTable } from "./subscriptions-schema"

export const alertTypeEnum = pgEnum("alert_type", [
  "price_increase",
  "renewal_reminder",
  "payment_failed",
  "subscription_cancelled",
  "subscription_expired",
  "custom"
])

export const alertStatusEnum = pgEnum("alert_status", [
  "pending",
  "sent",
  "failed",
  "dismissed"
])

export const alertsTable = pgTable("alerts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  subscriptionId: uuid("subscription_id").references(
    () => subscriptionsTable.id,
    { onDelete: "cascade" }
  ),
  type: alertTypeEnum("type").notNull(),
  status: alertStatusEnum("status").notNull().default("pending"),
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  scheduledFor: timestamp("scheduled_for"),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertAlert = typeof alertsTable.$inferInsert
export type SelectAlert = typeof alertsTable.$inferSelect
