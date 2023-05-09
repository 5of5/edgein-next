alter table "public"."allowed_emails"
  add constraint "allowed_emails_match_type_fkey"
  foreign key ("match_type")
  references "public"."match_type_enum"
  ("value") on update restrict on delete restrict;
