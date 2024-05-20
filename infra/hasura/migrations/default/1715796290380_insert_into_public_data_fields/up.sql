DELETE FROM "public"."data_fields" WHERE "path" = 'people.city';
DELETE FROM "public"."data_fields" WHERE "path" = 'people.country';
INSERT INTO "public"."data_fields"("name", "path", "resource", "weight", "regex_transform", "description", "regex_test", "is_valid_identifier", "restricted_admin", "data_type", "created_at") VALUES (E'location_json', E'people.location_json', E'people', 1, null, null, null, false, false, null, E'2024-05-15T18:04:50.21457+00:00');
