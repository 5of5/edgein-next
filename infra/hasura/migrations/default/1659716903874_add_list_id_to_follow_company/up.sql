CREATE OR REPLACE VIEW "public"."follows_companies" AS 
 SELECT follows.user_id,
    follows.resource_id,
    follows.id,
    follows.resource_type,
    follows.list_id
   FROM follows
  WHERE (follows.resource_type = 'companies'::text);
