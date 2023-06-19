alter table "public"."resource_edit_access" add column "created_at" timestamptz
 not null default now();
