alter table "public"."data_partners" alter column "api_key" set default md5((random())::text);
