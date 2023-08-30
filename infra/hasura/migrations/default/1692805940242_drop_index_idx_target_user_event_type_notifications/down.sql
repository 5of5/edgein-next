CREATE  INDEX "idx_target_user_event_type_notifications" on
  "public"."notifications" using btree ("event_type", "target_user_id");
