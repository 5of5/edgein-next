alter table "public"."vc_firms" alter column "latitude" drop not null;
alter table "public"."vc_firms" add column "latitude" text;
