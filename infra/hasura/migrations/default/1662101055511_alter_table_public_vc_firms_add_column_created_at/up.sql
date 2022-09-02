alter table "public"."vc_firms" add column "created_at" timestamptz
 null default now();
