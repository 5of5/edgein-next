CREATE OR REPLACE TABLE "public"."user_notifications" ("id" serial NOT NULL, "user_id" integer NOT NULL, "action_id" integer NOT NULL, "read_flag" boolean NOT NULL DEFAULT False, "created_at" timestamptz NOT NULL DEFAULT now(), "read_at" timestamptz, PRIMARY KEY ("id") , FOREIGN KEY ("action_id") REFERENCES "public"."actions"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("user_id", "action_id"));
