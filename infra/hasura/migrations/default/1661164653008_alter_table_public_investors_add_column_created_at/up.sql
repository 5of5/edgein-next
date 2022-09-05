alter table "public"."investors" add column "created_at" timestamptz
 not null default now();
