alter table "public"."companies" alter column "longitude" drop not null;
alter table "public"."companies" add column "longitude" text;
