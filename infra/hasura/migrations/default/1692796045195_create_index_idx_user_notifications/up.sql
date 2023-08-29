CREATE  INDEX "idx_user_notifications" on
  "public"."notifications" using btree ("created_at", "target_user_id", "event_type");
