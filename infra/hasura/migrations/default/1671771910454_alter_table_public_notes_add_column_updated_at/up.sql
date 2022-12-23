alter table "public"."notes" add column "updated_at" timestamptz
 null default now();
