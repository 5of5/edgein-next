CREATE  INDEX IF NOT EXISTS "vc_firms_num_of_views_idx" on
  "public"."vc_firms" using btree ("num_of_views");
