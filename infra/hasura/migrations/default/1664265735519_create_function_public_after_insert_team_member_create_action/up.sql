CREATE OR REPLACE FUNCTION after_insert_team_member_create_action()
  RETURNS trigger AS
$$
BEGIN
INSERT INTO public.actions (action, page, properties, resource, resource_id)
    VALUES ('team_members_update', CONCAT('/companies/', (
        SELECT slug FROM public.companies AS c 
        WHERE c.id=NEW.company_id
    )), CAST(CONCAT('{"notification": "added new team information", "resourceType": "team_members", "resourceId": ', NEW.id ,'}') AS json), 'companies', NEW.company_id);
RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';
