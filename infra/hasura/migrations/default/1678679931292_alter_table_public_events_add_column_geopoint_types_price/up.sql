alter table "public"."events" add column "geopoint" geography
 null;
alter table "public"."events" add column "types" jsonb
 null;
alter table "public"."events" add column "price" numeric
 null;
alter table "public"."events" add column "banner" jsonb
 null;
alter table "public"."events" add column "slug" text
 null unique;


