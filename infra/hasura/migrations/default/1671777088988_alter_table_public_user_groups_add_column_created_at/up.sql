alter table "public"."user_groups" add column "created_at" timestamptz
 not null default now();
