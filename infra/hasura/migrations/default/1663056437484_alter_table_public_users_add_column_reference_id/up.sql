alter table "public"."users" add column "reference_id" text
 not null default gen_random_uuid();
