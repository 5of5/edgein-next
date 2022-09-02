CREATE OR REPLACE FUNCTION public.lists_total_no_of_companies(list_row lists)
 RETURNS integer
 LANGUAGE sql
 STABLE
AS $function$
  SELECT count(*)
  FROM follows_companies
  WHERE
    follows_companies.list_id = list_row.id
$function$;
