alter table "public"."users" add column "feature_flags" jsonb
 null default jsonb_build_object();
