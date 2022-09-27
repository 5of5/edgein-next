CREATE OR REPLACE FUNCTION after_insert_investor_create_action()
  RETURNS trigger AS
$$
BEGIN
INSERT INTO public.actions (action, page, properties, resource, resource_id)
    VALUES ('investors_update', CONCAT('/investors/', (
        SELECT slug FROM public.vc_firms AS vc 
        WHERE vc.id=NEW.vc_firm_id
    )), CAST(CONCAT('{"notification": "added new investor information", "resourceType": "investors", "resourceId": ', NEW.id ,'}') AS json), 'vc_fimrs', NEW.vc_firm_id);
RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';
