alter table "public"."companies" drop column "country" cascade;
DELETE FROM "public"."data_fields" WHERE "path" = 'company.country';
