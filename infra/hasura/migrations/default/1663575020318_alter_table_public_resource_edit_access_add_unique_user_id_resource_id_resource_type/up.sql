alter table "public"."resource_edit_access" add constraint "resource_edit_access_user_id_resource_id_resource_type_key" unique ("user_id", "resource_id", "resource_type");
