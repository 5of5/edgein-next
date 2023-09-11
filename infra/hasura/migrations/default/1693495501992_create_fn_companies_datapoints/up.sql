CREATE OR REPLACE FUNCTION public.companies_datapoints(company_row companies)
 RETURNS integer
 LANGUAGE plpgsql
 STABLE
AS $function$
DECLARE
    col_count integer;
    members_count integer;
    investment_rounds_count integer;
BEGIN
     col_count := (SELECT count(value)::int FROM json_each_text(row_to_json(company_row)));
     members_count := (SELECT count(*) FROM team_members tm WHERE company_row.id = tm.company_id);
     investment_rounds_count = (SELECT count(*) FROM investment_rounds ir WHERE company_row.id = ir.company_id);
     RETURN col_count + members_count + investment_rounds_count;
END;
$function$;
