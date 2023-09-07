CREATE  INDEX "vc_firms_investment_amount_total_idx" on
  "public"."vc_firms" using btree ("investment_amount_total");
CREATE  INDEX "vc_firms_latest_investment_idx" on
  "public"."vc_firms" using btree ("latest_investment");
