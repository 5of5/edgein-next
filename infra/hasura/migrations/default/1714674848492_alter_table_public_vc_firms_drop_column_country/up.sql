alter table "public"."vc_firms" drop column "country" cascade;
DELETE FROM "public"."data_fields" WHERE "path" = 'vc_firm.country';
