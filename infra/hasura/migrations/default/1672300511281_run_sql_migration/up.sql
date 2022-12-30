ALTER TABLE public.companies ALTER COLUMN coin_id TYPE jsonb USING jsonb_build_array(coin_id)::jsonb;
ALTER TABLE public.companies RENAME COLUMN coin_id TO coin_ids;

CREATE FUNCTION link_coins(company_row companies)
 RETURNS SETOF coins
 LANGUAGE sql
 STABLE
AS $function$
  SELECT *
  FROM coins
  WHERE
    company_row.coin_ids @> jsonb_build_array(id) 
$function$
