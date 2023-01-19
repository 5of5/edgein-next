
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

alter table "public"."companies" add column "geopoint" GEOGRAPHY(Point) null;
