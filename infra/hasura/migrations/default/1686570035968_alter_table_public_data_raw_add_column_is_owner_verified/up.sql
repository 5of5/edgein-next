alter table "public"."data_raw" add column "is_owner_verified" bool
 not null default 'false';
