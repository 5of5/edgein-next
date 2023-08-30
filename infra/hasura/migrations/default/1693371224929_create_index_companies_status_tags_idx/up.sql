CREATE  INDEX "companies_status_tags_idx" on
  "public"."companies" using gin ("status_tags");
