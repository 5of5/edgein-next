CREATE OR REPLACE FUNCTION public.vc_firms_latest_investments(vc_firm_row vc_firms)
 RETURNS text
 LANGUAGE sql
 STABLE
AS $function$
  SELECT round_date
  FROM investments
  INNER JOIN investment_rounds
    ON investments.round_id = investment_rounds.id
  WHERE
    investments.vc_firm_id = vc_firm_row.id
    ORDER BY round_date DESC
    LIMIT 1
$function$;
