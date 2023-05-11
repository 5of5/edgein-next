ALTER TABLE disabled_emails
  ALTER COLUMN match_type
    SET DATA TYPE match_type_enum
    USING match_type::text::match_type_enum;
