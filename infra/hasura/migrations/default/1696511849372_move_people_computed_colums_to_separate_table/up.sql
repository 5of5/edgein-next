
alter table "public"."people" drop column "title" cascade;

alter table "public"."people" drop column "tags" cascade;

alter table "public"."people" drop column "geopoint" cascade;

alter table "public"."people" drop column "location_json" cascade;

CREATE TABLE "public"."people_computed_data" ("id" serial NOT NULL, "person_id" integer NOT NULL, "location_json" jsonb, "geopoint" geography, "tags" jsonb, "title" text, PRIMARY KEY ("id") , FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("id"), UNIQUE ("person_id"));COMMENT ON TABLE "public"."people_computed_data" IS E'Computed data from its relations for better performance';

-- Triggers for adding new person and computing their values
CREATE OR REPLACE FUNCTION public.compute_people_data()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN

DELETE FROM people_computed_data WHERE person_id=NEW.person_id;
INSERT INTO people_computed_data (person_id, location_json, geopoint, tags, title)
SELECT
    NEW.person_id as person_id,
    result.location_json AS location_json,
    result.geopoint as geopoint,
    result.tags AS tags,
    result.title AS title
FROM (
    SELECT
        person_id,
        end_date,
        location_json,
        geopoint,
        tags,
        title,
        ROW_NUMBER() OVER (PARTITION BY person_id ORDER BY end_date DESC) AS rn
    FROM (
        SELECT
            ppl.id AS person_id,
            tm.end_date,
            tm.title,
            c.location_json,
            c.geopoint,
            c.tags
        FROM people AS ppl
        INNER JOIN team_members AS tm ON ppl.id = tm.person_id
        LEFT JOIN companies c on tm.company_id = c.id
        UNION ALL
        SELECT
            ppl.id AS person_id,
            i.end_date,
            i.title,
            vf.location_json,
            vf.geopoint,
            vf.tags
        FROM people AS ppl
        INNER JOIN investors AS i ON ppl.id = i.person_id
        LEFT JOIN vc_firms vf on i.vc_firm_id = vf.id
    ) AS subquery
    WHERE person_id=NEW.person_id
    GROUP BY person_id, end_date, location_json, title, geopoint, tags
    ORDER BY subquery.end_date DESC
) AS result
WHERE result.rn = 1;

RETURN NEW;
END;
$function$;

CREATE OR REPLACE TRIGGER compute_people_data
    AFTER INSERT ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION compute_people_data();

CREATE OR REPLACE TRIGGER compute_people_data
    AFTER INSERT ON investors
    FOR EACH ROW
    EXECUTE FUNCTION compute_people_data();
