alter table "public"."data_partners" add column "created_at" timestamptz
 not null default now();
