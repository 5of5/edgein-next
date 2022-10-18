alter table "public"."users"
  add constraint "users_person_id_fkey"
  foreign key ("person_id")
  references "public"."people"
  ("id") on update restrict on delete no action;
