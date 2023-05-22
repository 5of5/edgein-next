alter table "public"."follows" add column "created_at" timestamptz
 not null default now();
