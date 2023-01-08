-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
alter table "public"."list_members" drop column "user_group_id" integer
  null;
