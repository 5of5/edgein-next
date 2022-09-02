CREATE OR REPLACE FUNCTION public.lists_total_no_of_companies(list_row lists)
 RETURNS integer
 LANGUAGE sql
 STABLE
AS $function$
  SELECT count(*)
  FROM follows
  WHERE
    follows.list_id = list_row.id
$function$;
