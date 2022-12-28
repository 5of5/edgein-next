DROP TABLE "public"."user_groups";
DROP TABLE "public"."user_group_members";
DROP TABLE "public"."notes";
DROP TABLE "public"."user_group_invites";
alter table "public"."notes" rename column "resource_type" to "resource";