CREATE TYPE member_type_enum AS ENUM ('follow', 'owner');
ALTER TABLE list_members
  ALTER COLUMN member_type DROP DEFAULT,
  ALTER COLUMN member_type
    SET DATA TYPE member_type_enum
    USING member_type::text::member_type_enum,
  ALTER COLUMN member_type SET DEFAULT 'follow';
