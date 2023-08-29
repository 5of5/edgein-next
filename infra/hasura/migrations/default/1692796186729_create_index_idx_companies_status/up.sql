CREATE  INDEX "idx_companies_status" on
  "public"."companies" using hash ("status");
