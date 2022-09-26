alter table "public"."allowed_emails" add column "match_type" text
 not null default 'EMAIL';
