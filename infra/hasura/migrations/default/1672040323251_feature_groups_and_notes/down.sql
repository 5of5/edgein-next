DROP TABLE "public"."user_groups";
DROP TABLE "public"."user_group_members";
DROP TABLE "public"."notes";
DROP TABLE "public"."user_group_invites";
alter table "public"."notes" rename column "resource_type" to "resource";
alter table "public"."user_groups" rename column "created_by_user_id" to "created_by";
