alter table "public"."news_organizations"
  add constraint "news_organizations_type_fkey"
  foreign key ("type")
  references "public"."news_organizations_type_enum"
  ("value") on update restrict on delete restrict;
