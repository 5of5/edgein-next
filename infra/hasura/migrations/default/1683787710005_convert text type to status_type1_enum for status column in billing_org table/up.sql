CREATE TYPE status_type1_enum AS ENUM ('inactive', 'active');
ALTER TABLE billing_org
  ALTER COLUMN status
    SET DATA TYPE status_type1_enum
    USING status::text::status_type1_enum;
