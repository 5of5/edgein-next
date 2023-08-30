CREATE INDEX idx_personalized_by_location_companies ON companies
USING gin (location_json jsonb_ops, library jsonb_ops, status_tags jsonb_ops);
