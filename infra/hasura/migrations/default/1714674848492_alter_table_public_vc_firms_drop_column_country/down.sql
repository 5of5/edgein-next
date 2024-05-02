alter table "public"."vc_firms" alter column "country" drop not null;
alter table "public"."vc_firms" add column "country" text;
