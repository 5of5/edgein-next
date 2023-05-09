alter table "public"."billing_org"
  add constraint "billing_org_status_fkey"
  foreign key ("status")
  references "public"."status_type_enum_group_1"
  ("value") on update restrict on delete restrict;
