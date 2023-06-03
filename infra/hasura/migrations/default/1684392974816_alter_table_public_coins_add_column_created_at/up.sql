alter table "public"."coins" add column "created_at" timestamptz
 not null default now();
