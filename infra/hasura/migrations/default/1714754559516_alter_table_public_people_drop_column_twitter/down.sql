alter table "public"."people" alter column "twitter" drop not null;
alter table "public"."people" add column "twitter" text;
