DELETE FROM "public"."data_fields" WHERE "path" = 'company.smart_contract';
INSERT INTO "public"."data_fields"("is_valid_identifier", "restricted_admin", "weight", "data_type", "description", "name", "path", "regex_test", "regex_transform", "resource", "created_at") VALUES (false, false, 1, null, null, E'web3_address', E'company.web3_address', null, null, E'company', E'2024-04-30T21:07:25.029391+00:00');