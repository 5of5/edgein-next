alter table "public"."user_transactions"
  add constraint "user_transactions_created_by_fkey"
  foreign key ("created_by")
  references "public"."users"
  ("id") on update restrict on delete restrict;
