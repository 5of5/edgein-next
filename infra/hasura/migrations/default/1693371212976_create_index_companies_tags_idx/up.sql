CREATE  INDEX "companies_tags_idx" on
  "public"."companies" using gin ("tags");
