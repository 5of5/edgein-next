CREATE  INDEX "vc_firms_location_gin" on
  "public"."vc_firms" using gin ("location_json");
