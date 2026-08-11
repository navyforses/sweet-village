import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Booking enquiries submitted from the public site. Stored so the owner never
 * loses a lead if an email or notification fails to deliver.
 */
export const bookings = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  /** Free-form ISO date strings; guests often give approximate dates. */
  checkIn: varchar("checkIn", { length: 32 }),
  checkOut: varchar("checkOut", { length: 32 }),
  /** What the guest is interested in: cottage | event | pool | restaurant | whole */
  interest: varchar("interest", { length: 32 }).notNull(),
  /** Exact accommodation unit the guest picked, when they picked one. */
  unit: varchar("unit", { length: 32 }),
  guests: int("guests"),
  notes: text("notes"),
  /** UI language the visitor was browsing in — tells the owner how to reply. */
  lang: varchar("lang", { length: 8 }).notNull(),
  /** Whether the owner notification was dispatched successfully. */
  notified: int("notified").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;
