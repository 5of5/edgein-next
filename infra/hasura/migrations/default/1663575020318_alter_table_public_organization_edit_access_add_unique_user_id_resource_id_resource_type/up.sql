alter table "public"."organization_edit_access" drop constraint "organization_edit_access_resource_id_user_id_key";
alter table "public"."organization_edit_access" add constraint "organization_edit_access_user_id_resource_id_resource_type_key" unique ("user_id", "resource_id", "resource_type");
