alter table "public"."investors" alter column "start_date" type date USING ("start_date"::text::date);
