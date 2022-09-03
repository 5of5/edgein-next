ALTER TABLE actions ALTER COLUMN "user" TYPE integer USING CAST("user" AS integer);
