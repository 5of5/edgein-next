CREATE OR REPLACE FUNCTION link_person_to_user_when_new_user_added() RETURNS TRIGGER AS
$BODY$
BEGIN
    UPDATE public.users AS u
        SET person_id=personQuery.id
        FROM (
            SELECT id FROM public.people AS p
            WHERE p.work_email=NEW.email
        ) AS personQuery
        WHERE u.id=NEW.id;

           RETURN NEW;
END;
$BODY$
language plpgsql;