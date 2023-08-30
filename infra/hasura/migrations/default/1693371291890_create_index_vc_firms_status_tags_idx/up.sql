CREATE  INDEX "vc_firms_status_tags_idx" on
  "public"."vc_firms" using gin ("status_tags");
