CREATE  INDEX "idx_events_publihed_and_started_at" on
  "public"."events" using btree ("status", "start_date");
