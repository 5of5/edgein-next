alter table "public"."people" add column "created_at" timestamptz
 not null default now();
