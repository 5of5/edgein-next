alter table "public"."follows" add constraint "follows_resource_type_resource_id_list_id_key" unique ("resource_type", "resource_id", "list_id");
