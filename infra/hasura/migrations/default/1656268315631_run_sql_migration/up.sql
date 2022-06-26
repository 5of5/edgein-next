CREATE FUNCTION vc_firms_num_of_investments(vc_firm_row vc_firms)
RETURNS INT AS $$
  SELECT count(*)
  FROM investments
  WHERE
    investments.vc_firm_id = vc_firm_row.id
$$ LANGUAGE sql STABLE;
