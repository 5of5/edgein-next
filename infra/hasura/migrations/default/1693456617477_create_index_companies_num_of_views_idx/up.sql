CREATE  INDEX IF NOT EXISTS "companies_num_of_views_idx" on
  "public"."companies" using btree ("num_of_views");
