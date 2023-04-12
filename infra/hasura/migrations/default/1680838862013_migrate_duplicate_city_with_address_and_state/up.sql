UPDATE "public"."companies"
SET location_json = location_json::jsonb - 'address' || '{"address":""}'::jsonb
WHERE location_json::json->>'address'=location_json::json->>'city' AND location_json::json->>'address'<>'';

UPDATE "public"."companies"
SET location_json = location_json::jsonb - 'state' || '{"state":""}'::jsonb
WHERE location_json::json->>'state'=location_json::json->>'city' AND location_json::json->>'state'<>'';
