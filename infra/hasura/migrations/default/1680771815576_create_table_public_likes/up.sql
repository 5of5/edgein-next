CREATE TABLE "public"."likes" ("id" serial NOT NULL, "note_id" integer NOT NULL, "created_by_user_id" integer NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
