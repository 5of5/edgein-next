CREATE TYPE classification_type_enum AS ENUM ('new', 'incorrect', 'validated');
ALTER TABLE data_runs
  ALTER COLUMN classification
    SET DATA TYPE classification_type_enum
    USING classification::text::classification_type_enum;
