alter table "public"."companies" alter column "latitude" drop not null;
alter table "public"."companies" add column "latitude" text;
