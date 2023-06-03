alter table "public"."blockchains" add column "created_at" timestamptz
 not null default now();
