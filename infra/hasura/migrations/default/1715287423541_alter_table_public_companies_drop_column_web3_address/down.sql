alter table "public"."companies" alter column "web3_address" drop not null;
alter table "public"."companies" add column "web3_address" text;
