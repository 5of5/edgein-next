alter table "public"."list_members" add column "created_at" timestamptz
 not null default now();
