alter table "public"."users" alter column "reference_id" set default "substring"(md5((random())::text), 0, 9);
