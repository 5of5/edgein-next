
alter table "public"."people" add column "location_json" jsonb
 null;

alter table "public"."people" add column "geopoint" geography
 null;

alter table "public"."people" add column "tags" jsonb
 null;

alter table "public"."people" add column "title" text
 null;
