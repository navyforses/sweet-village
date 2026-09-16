CREATE TABLE "admin_login_attempts" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"ip" text NOT NULL,
	"success" boolean NOT NULL,
	"attempted_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(160) NOT NULL,
	"phone" varchar(40) NOT NULL,
	"check_in" varchar(32),
	"check_out" varchar(32),
	"interest" varchar(32) NOT NULL,
	"unit" varchar(32),
	"guests" integer,
	"notes" text,
	"lang" varchar(8) NOT NULL,
	"notified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_content" (
	"key" text PRIMARY KEY NOT NULL,
	"value" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" text DEFAULT 'owner' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_content_revisions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"value" jsonb NOT NULL,
	"saved_at" timestamp with time zone DEFAULT now() NOT NULL,
	"saved_by" text DEFAULT 'owner' NOT NULL,
	"note" text
);
--> statement-breakpoint
CREATE INDEX "admin_login_attempts_ip_attempted_at_idx" ON "admin_login_attempts" USING btree ("ip","attempted_at");--> statement-breakpoint
CREATE INDEX "site_content_revisions_key_saved_at_idx" ON "site_content_revisions" USING btree ("key","saved_at");