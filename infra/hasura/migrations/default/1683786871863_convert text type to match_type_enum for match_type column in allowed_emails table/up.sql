CREATE TYPE match_type_enum AS ENUM ('EMAIL', 'DOMAIN');
ALTER TABLE allowed_emails
  ALTER COLUMN match_type DROP DEFAULT,
  ALTER COLUMN match_type
    SET DATA TYPE match_type_enum
    USING match_type::text::match_type_enum,
  ALTER COLUMN match_type SET DEFAULT 'EMAIL';
