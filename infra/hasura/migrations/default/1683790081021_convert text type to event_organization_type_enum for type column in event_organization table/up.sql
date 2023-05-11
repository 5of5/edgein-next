CREATE TYPE event_organization_type_enum AS ENUM ('sponsor', 'organizer');
ALTER TABLE event_organization
  ALTER COLUMN "type"
    SET DATA TYPE event_organization_type_enum
    USING "type"::text::event_organization_type_enum;
