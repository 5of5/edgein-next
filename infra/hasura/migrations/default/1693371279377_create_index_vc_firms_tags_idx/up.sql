CREATE  INDEX "vc_firms_tags_idx" on
  "public"."vc_firms" using gin ("tags");
