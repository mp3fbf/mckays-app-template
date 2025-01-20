/*
<ai_context>
Initializes the database connection and schema for the app.
</ai_context>
*/

import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import {
  alertsTable,
  currenciesTable,
  paymentsTable,
  profilesTable,
  subscriptionsTable
} from "@/db/schema"

const connectionString = process.env.DATABASE_URL!

const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client, {
  schema: {
    profiles: profilesTable,
    subscriptions: subscriptionsTable,
    currencies: currenciesTable,
    alerts: alertsTable,
    payments: paymentsTable
  }
})
