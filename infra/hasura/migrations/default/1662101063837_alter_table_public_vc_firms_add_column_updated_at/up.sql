alter table "public"."vc_firms" add column "updated_at" timestamptz
 null default now();

CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_vc_firms_updated_at"
BEFORE UPDATE ON "public"."vc_firms"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_vc_firms_updated_at" ON "public"."vc_firms" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
