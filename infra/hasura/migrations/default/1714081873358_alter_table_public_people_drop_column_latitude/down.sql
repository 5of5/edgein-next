alter table "public"."people" alter column "latitude" drop not null;
alter table "public"."people" add column "latitude" text;
