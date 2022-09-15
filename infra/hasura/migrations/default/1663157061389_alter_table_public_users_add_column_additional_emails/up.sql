alter table "public"."users" add column "additional_emails" jsonb
 not null default jsonb_build_array();
