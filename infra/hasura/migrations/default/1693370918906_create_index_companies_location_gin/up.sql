CREATE  INDEX "companies_location_gin" on
  "public"."companies" using gin ("location_json");
