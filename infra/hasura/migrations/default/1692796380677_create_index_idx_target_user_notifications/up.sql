CREATE  INDEX "idx_target_user_notifications" on
  "public"."notifications" using hash ("target_user_id");
