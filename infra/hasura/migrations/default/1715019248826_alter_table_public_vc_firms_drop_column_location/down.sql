alter table "public"."vc_firms" alter column "location" drop not null;
alter table "public"."vc_firms" add column "location" text;
