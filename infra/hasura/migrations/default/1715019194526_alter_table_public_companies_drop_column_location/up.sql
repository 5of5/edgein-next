DELETE FROM "public"."data_fields" WHERE "path" = 'company.location';
alter table "public"."companies" drop column "location" cascade;
