alter table "public"."news"
  add constraint "news_kind_fkey"
  foreign key ("kind")
  references "public"."kind_type_enum"
  ("value") on update restrict on delete restrict;
