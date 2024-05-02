alter table "public"."companies" alter column "country" drop not null;
alter table "public"."companies" add column "country" text;
