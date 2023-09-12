CREATE  INDEX "notification_actions_notification_id" on
  "public"."notification_actions" using hash ("notification_id");
