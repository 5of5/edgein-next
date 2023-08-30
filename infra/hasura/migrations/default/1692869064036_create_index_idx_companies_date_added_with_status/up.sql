CREATE  INDEX "idx_companies_date_added_with_status" on
  "public"."companies" using btree ("date_added", "status");
