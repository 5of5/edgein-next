-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE TYPE event_organization_type_enum AS ENUM ('sponsor', 'organizer');
-- ALTER TABLE event_organization
--   ALTER COLUMN "type"
--     SET DATA TYPE event_organization_type_enum
--     USING "type"::text::event_organization_type_enum;
