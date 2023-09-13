CREATE  INDEX IF NOT EXISTS "companies_date_added_idx" on
  "public"."companies" using btree ("date_added");
CREATE  INDEX IF NOT EXISTS "companies_investor_amount_idx" on
  "public"."companies" using btree ("investor_amount");
