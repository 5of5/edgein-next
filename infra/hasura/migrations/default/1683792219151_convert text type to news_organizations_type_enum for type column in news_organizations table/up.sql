CREATE TYPE news_organizations_type_enum AS ENUM ('publisher', 'subject');
ALTER TABLE news_organizations
  ALTER COLUMN "type"
    SET DATA TYPE news_organizations_type_enum
    USING "type"::text::news_organizations_type_enum;
