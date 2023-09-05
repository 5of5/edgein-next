CREATE INDEX idx_personalized_by_location_vc_firms ON vc_firms
USING gin (location_json jsonb_ops, library jsonb_ops, status_tags jsonb_ops);