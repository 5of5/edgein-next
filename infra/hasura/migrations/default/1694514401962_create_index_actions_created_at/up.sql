CREATE  INDEX IF NOT EXISTS "idx_created_at" on
  "public"."actions" using btree ("created_at");
