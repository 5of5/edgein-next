CREATE  INDEX "notifications_actions_action_id" on
  "public"."notification_actions" using hash ("action_id");
