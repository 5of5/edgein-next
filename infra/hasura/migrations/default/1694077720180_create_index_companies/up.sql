CREATE  INDEX "companies_date_added_idx" on
  "public"."companies" using btree ("date_added");
CREATE  INDEX "companies_investor_amount_idx" on
  "public"."companies" using btree ("investor_amount");
