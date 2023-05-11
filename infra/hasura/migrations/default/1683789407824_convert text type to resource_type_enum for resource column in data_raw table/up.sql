ALTER TABLE data_raw
  ALTER COLUMN resource
    SET DATA TYPE resource_type_enum
    USING resource::text::resource_type_enum;
