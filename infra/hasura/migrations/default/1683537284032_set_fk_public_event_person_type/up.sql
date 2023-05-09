alter table "public"."event_person"
  add constraint "event_person_type_fkey"
  foreign key ("type")
  references "public"."event_person_type_enum"
  ("value") on update restrict on delete restrict;
