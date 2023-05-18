alter table "public"."data_actions" add column "created_at" timestamptz
 not null default now();
