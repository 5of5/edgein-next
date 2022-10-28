alter table "public"."companies" drop constraint "companies_slug_key";
alter table "public"."companies" alter column "slug" drop not null;
