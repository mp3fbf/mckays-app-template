import {
  pgTable,
  text,
  timestamp,
  uuid,
  numeric,
  boolean
} from "drizzle-orm/pg-core"

export const currenciesTable = pgTable("currencies", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  symbol: text("symbol").notNull(),
  exchangeRate: numeric("exchange_rate").notNull(),
  isBaseCurrency: boolean("is_base_currency").default(false).notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date())
})

export type InsertCurrency = typeof currenciesTable.$inferInsert
export type SelectCurrency = typeof currenciesTable.$inferSelect
