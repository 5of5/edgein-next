CREATE TABLE "public"."notifications" ("id" serial NOT NULL, "target_user_id" integer NOT NULL, "event_type" text NOT NULL, "follow_resource_type" text NOT NULL, "notification_resource_type" text NOT NULL, "company_id" integer NULL, "vc_firm_id" integer NULL, "message" text, "read" boolean  NOT NULL default 'false', "read_at" timestamptz, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "action_ids" jsonb, PRIMARY KEY ("id") );
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
CREATE TRIGGER "set_public_notifications_updated_at"
BEFORE UPDATE ON "public"."notifications"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_notifications_updated_at" ON "public"."notifications" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
