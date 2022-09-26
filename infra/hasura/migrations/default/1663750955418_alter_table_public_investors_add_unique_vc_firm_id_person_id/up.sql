alter table "public"."investors" add constraint "investors_vc_firm_id_person_id_key" unique ("vc_firm_id", "person_id");
