CREATE OR REPLACE FUNCTION link_person_to_user_when_added_new() RETURNS TRIGGER AS
$BODY$
BEGIN
    UPDATE public.users
        SET person_id=NEW.id
        WHERE email=NEW.work_email;

           RETURN NEW;
END;
$BODY$
language plpgsql;
