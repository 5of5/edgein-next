CREATE TABLE "public"."events" ("name" text NOT NULL, "start_date" date, "end_date" date, "location" jsonb, "link" text, "notes" text, "company_ids" jsonb NULL, "vc_firm_ids" jsonb NULL, "speaker_ids" jsonb NULL, "organizer_ids" jsonb NULL, "size" text, "status" text NOT NULL DEFAULT 'draft', "parent_event_id" integer NULL, "id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
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
CREATE TRIGGER "set_public_events_updated_at"
BEFORE UPDATE ON "public"."events"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_events_updated_at" ON "public"."events" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
