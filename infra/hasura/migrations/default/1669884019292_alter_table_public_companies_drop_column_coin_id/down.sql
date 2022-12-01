alter table "public"."companies" alter column "coin_id" drop not null;
alter table "public"."companies" add column "coin_id" int4;
