alter table "public"."investment_rounds"
  add constraint "investment_rounds_status_fkey"
  foreign key ("status")
  references "public"."status_type_enum_group_2"
  ("value") on update restrict on delete restrict;
