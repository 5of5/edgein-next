alter table "public"."data_runs"
  add constraint "data_runs_classification_fkey"
  foreign key ("classification")
  references "public"."classification_type_enum"
  ("value") on update restrict on delete restrict;
