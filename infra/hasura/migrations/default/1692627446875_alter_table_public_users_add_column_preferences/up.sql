alter table "public"."users" add column "preferences" JSONB
 not null default jsonb_build_object('daily_emails', true);
