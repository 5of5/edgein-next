alter table "public"."notification_actions"
  add constraint "notification_actions_notification_id_fkey"
  foreign key ("notification_id")
  references "public"."notifications"
  ("id") on update restrict on delete restrict;
