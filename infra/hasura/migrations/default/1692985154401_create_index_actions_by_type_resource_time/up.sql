CREATE  INDEX "actions_by_type_resource_time" on
  "public"."actions" using btree ("action", "created_at", "resource", "resource_id");
