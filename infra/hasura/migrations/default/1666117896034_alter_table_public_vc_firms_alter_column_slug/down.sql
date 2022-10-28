alter table "public"."vc_firms" alter column "slug" drop not null;
alter table "public"."vc_firms" drop constraint "vc_firms_slug_key";
