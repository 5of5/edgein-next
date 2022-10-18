alter table "public"."coins"
  add constraint "coins_blockchain_id_fkey"
  foreign key ("blockchain_id")
  references "public"."blockchains"
  ("id") on update restrict on delete restrict;
