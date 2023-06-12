CREATE
OR REPLACE VIEW "public"."users_public" AS
SELECT
        id,
        display_name,
        email,
        person_id
FROM
  users;
