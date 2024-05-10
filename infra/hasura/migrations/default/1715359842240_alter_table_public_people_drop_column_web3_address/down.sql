alter table "public"."people" alter column "web3_address" drop not null;
alter table "public"."people" add column "web3_address" text;
