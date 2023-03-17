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
alter table "public"."events" add column "twitter" text
 null;
alter table "public"."events" add column "facebook" text
 null;
alter table "public"."events" add column "instagram" text
 null;
alter table "public"."events" add column "discord" text
 null;
alter table "public"."events" add column "telegram" text
 null;
alter table "public"."event_organization" add column "type" text
 null;
alter table "public"."events" add column "venue_name" text
 null;
alter table "public"."events" add column "start_time" time
 null;
alter table "public"."events" add column "end_time" time
 null;
alter table "public"."events" add column "timezone" text
 null;
alter table "public"."events" add column "overview" text
 null;


