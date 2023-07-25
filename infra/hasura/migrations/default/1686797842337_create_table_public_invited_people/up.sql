CREATE TABLE "public"."invited_people" ("id" serial NOT NULL, "person_id" integer NOT NULL, "inviter_user_id" integer NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
