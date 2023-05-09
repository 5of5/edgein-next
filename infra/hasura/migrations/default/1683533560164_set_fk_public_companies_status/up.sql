alter table "public"."companies"
  add constraint "companies_status_fkey"
  foreign key ("status")
  references "public"."status_type_enum_group_2"
  ("value") on update restrict on delete restrict;
