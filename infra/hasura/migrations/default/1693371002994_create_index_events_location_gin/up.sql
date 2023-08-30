CREATE  INDEX "events_location_gin" on
  "public"."events" using gin ("location_json");
