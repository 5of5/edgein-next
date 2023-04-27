alter table "public"."events" add column "attachments" jsonb
 not null default jsonb_build_array();
