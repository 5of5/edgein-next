
alter table "public"."people" alter column "location_json" drop not null;
alter table "public"."people" add column "location_json" jsonb;

alter table "public"."people" alter column "geopoint" drop not null;
alter table "public"."people" add column "geopoint" geography;

alter table "public"."people" alter column "tags" drop not null;
alter table "public"."people" add column "tags" jsonb;

alter table "public"."people" alter column "title" drop not null;
alter table "public"."people" add column "title" text;

DROP TABLE "public"."people_computed_data";
