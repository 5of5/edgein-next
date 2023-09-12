CREATE  INDEX IF NOT EXISTS "events_num_of_views_idx" on
  "public"."events" using btree ("num_of_views");
