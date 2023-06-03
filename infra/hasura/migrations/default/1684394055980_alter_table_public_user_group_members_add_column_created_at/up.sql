alter table "public"."user_group_members" add column "created_at" timestamptz
 not null default now();
