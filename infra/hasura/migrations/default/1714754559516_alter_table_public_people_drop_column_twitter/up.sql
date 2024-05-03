DELETE FROM "public"."data_fields" WHERE "path" = 'people.twitter';
alter table "public"."people" drop column "twitter" cascade;
