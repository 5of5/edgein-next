CREATE  INDEX "idx_user_notifications" on
  "public"."notifications" using btree ("created_at", "event_type", "target_user_id");
