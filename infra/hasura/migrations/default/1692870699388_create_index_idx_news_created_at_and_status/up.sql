CREATE  INDEX "idx_news_created_at_and_status" on
  "public"."news" using btree ("created_at", "status");
