alter table "public"."team_members" add column "created_at" timestamptz
 not null default now();
