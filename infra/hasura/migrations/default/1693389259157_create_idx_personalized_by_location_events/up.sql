CREATE INDEX idx_personalized_by_location_events ON events
USING gin (location_json jsonb_ops, library jsonb_ops);
