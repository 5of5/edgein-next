alter table "public"."companies" alter column "location" drop not null;
alter table "public"."companies" add column "location" text;
