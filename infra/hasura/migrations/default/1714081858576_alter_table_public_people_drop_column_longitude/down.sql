alter table "public"."people" alter column "longitude" drop not null;
alter table "public"."people" add column "longitude" text;
