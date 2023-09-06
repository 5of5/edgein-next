CREATE OR REPLACE FUNCTION public.vc_firms_datapoints(vc_firm_row vc_firms)
 RETURNS integer
 LANGUAGE plpgsql
 STABLE
AS $function$
DECLARE
    col_count integer;
    investors_count integer;
    investments_count integer;
BEGIN
     col_count := (SELECT count(value)::int FROM json_each_text(row_to_json(vc_firm_row)));
     investors_count := ((SELECT count(*) FROM investors inv WHERE vc_firm_row.id = inv.vc_firm_id) * 2);
     investments_count = ((SELECT count(*) FROM investments invst WHERE vc_firm_row.id = invst.vc_firm_id) * 3);
     RETURN col_count + investors_count + investments_count;
END;
$function$;
