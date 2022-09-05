alter table "public"."lists" add constraint "lists_created_by_id_name_key" unique ("created_by_id", "name");
