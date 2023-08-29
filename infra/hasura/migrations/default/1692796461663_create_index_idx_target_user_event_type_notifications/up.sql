CREATE  INDEX "idx_target_user_event_type_notifications" on
  "public"."notifications" using btree ("target_user_id", "event_type");
