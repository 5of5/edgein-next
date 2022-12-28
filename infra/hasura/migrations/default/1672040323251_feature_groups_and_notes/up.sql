CREATE TABLE "public"."user_groups" ("id" serial NOT NULL, "name" text NOT NULL, PRIMARY KEY ("id") );
CREATE TABLE "public"."user_group_members" ("id" serial NOT NULL, "user_group_id" integer NOT NULL, "user_id" integer NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("user_group_id") REFERENCES "public"."user_groups"("id") ON UPDATE restrict ON DELETE cascade);
CREATE TABLE "public"."notes" ("id" serial NOT NULL, "notes" text NOT NULL, "created_by" integer NOT NULL, "created_at" Timestamp NOT NULL DEFAULT now(), "user_group_id" integer NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("user_group_id") REFERENCES "public"."user_groups"("id") ON UPDATE restrict ON DELETE cascade);
CREATE TABLE "public"."user_group_invites" ("id" serial NOT NULL, "user_group_id" integer NOT NULL, "email" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("user_group_id") REFERENCES "public"."user_groups"("id") ON UPDATE restrict ON DELETE cascade);
alter table "public"."user_groups" add column "description" text null;
alter table "public"."user_groups" add column "twitter" text null;
alter table "public"."user_groups" add column "telegram" text null;
alter table "public"."user_groups" add column "discord" text null;
alter table "public"."notes" add column "resource" text null;
alter table "public"."notes" add column "resource_id" integer null;alter table "public"."notes" add column "updated_at" timestamptz null default now();
alter table "public"."user_groups" add column "created_by" integer not null;
alter table "public"."user_groups" add column "created_at" timestamptz not null default now();
alter table "public"."notes" rename column "resource" to "resource_type";
alter table "public"."user_groups" add column "updated_at" timestamptz
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
CREATE TRIGGER "set_public_user_groups_updated_at"
BEFORE UPDATE ON "public"."user_groups"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_user_groups_updated_at" ON "public"."user_groups" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

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
CREATE TRIGGER "set_public_notes_updated_at"
BEFORE UPDATE ON "public"."notes"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_notes_updated_at" ON "public"."notes" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

alter table "public"."user_groups" rename column "created_by" to "created_by_user_id";
