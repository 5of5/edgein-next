CREATE OR REPLACE FUNCTION after_upsert_investments_create_action()
  RETURNS trigger AS
$$
BEGIN
INSERT INTO public.actions (action, page, properties, resource, resource_id)
    VALUES ('investments_update', CONCAT('/companies/', (
        SELECT c.slug slug FROM public.investment_rounds r
        INNER JOIN companies c ON c.id=r.company_id
        WHERE r.id=NEW.round_id
    )), CAST(CONCAT('{"notification": "added new investments data", "resourceType": "investments", "resourceId": ', NEW.id ,'}') AS json), 'companies', 
    (
        SELECT c.id id FROM public.investment_rounds r
        INNER JOIN companies c ON c.id=r.company_id
        WHERE r.id=NEW.round_id
    ));
RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';
