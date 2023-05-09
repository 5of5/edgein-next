alter table "public"."list_members"
  add constraint "list_members_member_type_fkey"
  foreign key ("member_type")
  references "public"."member_type_enum"
  ("value") on update restrict on delete restrict;
