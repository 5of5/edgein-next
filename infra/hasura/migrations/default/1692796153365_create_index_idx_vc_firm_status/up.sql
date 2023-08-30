CREATE  INDEX "idx_vc_firm_status" on
  "public"."vc_firms" using hash ("status");
