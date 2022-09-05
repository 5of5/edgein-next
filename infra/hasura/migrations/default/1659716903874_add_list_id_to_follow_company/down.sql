-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
CREATE OR REPLACE VIEW "public"."follows_companies" AS
 SELECT follows.created_by_user_id,
    follows.resource_id,
    follows.id,
    follows.resource_type
   FROM follows
  WHERE (follows.resource_type = 'companies'::text);
