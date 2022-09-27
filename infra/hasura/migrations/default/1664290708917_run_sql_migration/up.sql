alter table "public"."investors" alter column "end_date" type date USING ("end_date"::text::date);
