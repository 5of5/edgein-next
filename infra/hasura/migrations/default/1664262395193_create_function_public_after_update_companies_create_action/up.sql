CREATE OR REPLACE FUNCTION after_update_companies_create_action()
  RETURNS trigger AS
$$
BEGIN
INSERT INTO public.actions (action, page, properties, resource, resource_id)
    VALUES ('company_update', CONCAT('/companies/', NEW.slug), CAST(CONCAT('{"notification": "updated information", "resourceType": "companies", "resourceId": ', NEW.id ,'}') AS json), 'companies', NEW.id);
RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';
