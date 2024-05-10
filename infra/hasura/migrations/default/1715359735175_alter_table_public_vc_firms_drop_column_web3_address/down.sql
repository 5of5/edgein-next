alter table "public"."vc_firms" alter column "web3_address" drop not null;
alter table "public"."vc_firms" add column "web3_address" text;
