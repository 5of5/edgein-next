alter table "public"."resource_links" add column "created_at" timestamptz
 not null default now();
