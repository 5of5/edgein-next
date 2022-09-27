CREATE OR REPLACE FUNCTION after_insert_investment_round_create_action()
  RETURNS trigger AS
$$
BEGIN
INSERT INTO public.actions (action, page, properties, resource, resource_id)
    VALUES ('investment_rounds_update', CONCAT('/companies/', (
        SELECT slug FROM public.companies AS c 
        WHERE c.id=NEW.company_id
    )), CONCAT('{"notification": "added new investments data", "resourceType": "investment_rounds", "resourceId": ', NEW.id ,'}'), 'companies', NEW.company_id);
RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';
