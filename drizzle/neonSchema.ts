import { bigserial, boolean, index, integer, jsonb, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * PostgreSQL schema used by the Vercel + Neon deployment.
 * The public website does not need Manus user authentication; only booking
 * enquiries and the owner-editable site content are persisted in the
 * independent database. The admin panel authenticates with a single owner
 * password (see api/_lib/adminAuth.ts), so there is no users table.
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

/**
 * One row per owner-editable content section (units, home, contact, ...).
 * The value is validated against shared/contentSchema.ts before it is written.
 */
export const siteContent = pgTable("site_content", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  updatedBy: text("updated_by").default("owner").notNull(),
});

/** Every successful save is copied here so the owner can restore a previous version. */
export const siteContentRevisions = pgTable(
  "site_content_revisions",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    key: text("key").notNull(),
    value: jsonb("value").notNull(),
    savedAt: timestamp("saved_at", { withTimezone: true }).defaultNow().notNull(),
    savedBy: text("saved_by").default("owner").notNull(),
    note: text("note"),
  },
  table => [index("site_content_revisions_key_saved_at_idx").on(table.key, table.savedAt)],
);

/** Login attempts, used to throttle password guessing across function instances. */
export const adminLoginAttempts = pgTable(
  "admin_login_attempts",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    ip: text("ip").notNull(),
    success: boolean("success").notNull(),
    attemptedAt: timestamp("attempted_at", { withTimezone: true }).defaultNow().notNull(),
  },
  table => [index("admin_login_attempts_ip_attempted_at_idx").on(table.ip, table.attemptedAt)],
);
