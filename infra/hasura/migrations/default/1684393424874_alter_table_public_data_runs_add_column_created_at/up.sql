alter table "public"."data_runs" add column "created_at" timestamptz
 not null default now();
