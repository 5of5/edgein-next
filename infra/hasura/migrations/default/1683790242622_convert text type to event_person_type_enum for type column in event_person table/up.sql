CREATE TYPE event_person_type_enum AS ENUM ('speaker', 'attendee', 'organizer');
ALTER TABLE event_person
  ALTER COLUMN "type"
    SET DATA TYPE event_person_type_enum
    USING "type"::text::event_person_type_enum;
