alter table "public"."list_user_groups" add column "created_at" timestamptz
 not null default now();
