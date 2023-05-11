CREATE TYPE event_type_enum AS ENUM ('Change Data', 'Insert Data', 'Delete Data');
ALTER TABLE notifications
  ALTER COLUMN event_type
    SET DATA TYPE event_type_enum
    USING event_type::text::event_type_enum;
