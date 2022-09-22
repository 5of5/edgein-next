alter table "public"."team_members" add constraint "team_members_company_id_person_id_key" unique ("company_id", "person_id");
