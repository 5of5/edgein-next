alter table "public"."event_organization"
  add constraint "event_organization_type_fkey"
  foreign key ("type")
  references "public"."event_organization_type_enum"
  ("value") on update restrict on delete restrict;
