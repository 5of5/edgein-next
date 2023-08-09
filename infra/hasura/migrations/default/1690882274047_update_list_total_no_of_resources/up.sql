CREATE OR REPLACE FUNCTION public.lists_total_no_of_companies(list_row lists)
 RETURNS integer
 LANGUAGE sql
 STABLE
AS $function$
SELECT (SELECT count(*)
  FROM follows_companies
  INNER JOIN companies
      ON follows_companies.resource_id = companies.id
  WHERE
    follows_companies.list_id = list_row.id AND companies.status = 'published')
    +
    (SELECT count(*)
  FROM follows_vc_firms
  INNER JOIN vc_firms
      ON follows_vc_firms.resource_id = vc_firms.id
  WHERE
    follows_vc_firms.list_id = list_row.id AND vc_firms.status = 'published')
     +
    (SELECT count(*)
  FROM follows_people
  INNER JOIN people
      ON follows_people.resource_id = people.id
  WHERE
    follows_people.list_id = list_row.id AND people.status = 'published')
$function$;
