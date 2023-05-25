alter table "public"."investments" add column "created_at" timestamptz
 not null default now();
