CREATE TABLE "public"."news_related_person" ("id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "news_id" integer NOT NULL, "name" TEXT, "type" TEXT, PRIMARY KEY ("id") );

CREATE TRIGGER "set_public_news_related_person_updated_at"
BEFORE UPDATE ON "public"."news_related_person"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_news_related_person_updated_at" ON "public"."news_related_person" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
