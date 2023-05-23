alter table "public"."disabled_emails" add column "created_at" timestamptz
 not null default now();
