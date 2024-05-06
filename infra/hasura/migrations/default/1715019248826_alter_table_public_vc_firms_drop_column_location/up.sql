DELETE FROM "public"."data_fields" WHERE "path" = 'vc_firm.location';
alter table "public"."vc_firms" drop column "location" cascade;
