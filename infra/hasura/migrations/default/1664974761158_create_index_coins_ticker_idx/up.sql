CREATE UNIQUE INDEX "coins_ticker_idx" on
  "public"."coins" using btree ("ticker");
