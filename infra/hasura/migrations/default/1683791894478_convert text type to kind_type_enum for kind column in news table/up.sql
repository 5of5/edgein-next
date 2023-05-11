CREATE TYPE kind_type_enum AS ENUM ('news', 'media');
ALTER TABLE news
  ALTER COLUMN kind
    SET DATA TYPE kind_type_enum
    USING kind::text::kind_type_enum;
