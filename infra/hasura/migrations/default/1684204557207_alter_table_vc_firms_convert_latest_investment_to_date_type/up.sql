ALTER TABLE vc_firms ALTER COLUMN latest_investment TYPE date USING latest_investment::date;
