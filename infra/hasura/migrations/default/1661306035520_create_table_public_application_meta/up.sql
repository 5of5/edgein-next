CREATE TABLE "public"."application_meta" ("id" serial NOT NULL, "key" text NOT NULL, "value" timestamp with time zone NOT NULL DEFAULT now(), "error" text, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
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
CREATE TRIGGER "set_public_application_meta_updated_at"
BEFORE UPDATE ON "public"."application_meta"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_application_meta_updated_at" ON "public"."application_meta" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
