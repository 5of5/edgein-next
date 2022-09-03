alter table "public"."companies" add column "created_at" timestamptz
 not null default now();
