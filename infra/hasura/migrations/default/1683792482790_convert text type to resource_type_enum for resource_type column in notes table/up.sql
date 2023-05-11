ALTER TABLE notes
  ALTER COLUMN resource_type
    SET DATA TYPE resource_type_enum
    USING resource_type::text::resource_type_enum;
