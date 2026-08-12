import { boolean, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * PostgreSQL schema used by the Vercel + Neon deployment.
 * The public website does not need Manus user authentication; only booking
 * enquiries are persisted in the independent database.
 */
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  checkIn: varchar("check_in", { length: 32 }),
  checkOut: varchar("check_out", { length: 32 }),
  interest: varchar("interest", { length: 32 }).notNull(),
  unit: varchar("unit", { length: 32 }),
  guests: integer("guests"),
  notes: text("notes"),
  lang: varchar("lang", { length: 8 }).notNull(),
  notified: boolean("notified").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type InsertBooking = typeof bookings.$inferInsert;
