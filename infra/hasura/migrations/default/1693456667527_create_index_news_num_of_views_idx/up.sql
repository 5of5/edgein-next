CREATE  INDEX IF NOT EXISTS "news_num_of_views_idx" on
  "public"."news" using btree ("num_of_views");
