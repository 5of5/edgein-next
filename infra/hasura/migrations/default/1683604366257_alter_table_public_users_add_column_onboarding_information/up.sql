alter table "public"."users" add column "onboarding_information" jsonb
 null default jsonb_build_array();
