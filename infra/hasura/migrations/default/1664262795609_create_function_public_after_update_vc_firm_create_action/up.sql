CREATE OR REPLACE FUNCTION after_update_vc_firm_create_action()
  RETURNS trigger AS
$$
BEGIN
INSERT INTO public.actions (action, page, properties, resource, resource_id)
    VALUES ('vc_firm_update', CONCAT('/investors/', NEW.slug), CONCAT('{"notification": "updated information", "resourceType": "vc_firms", "resourceId": ', NEW.id ,'}'), 'vc_firms', NEW.id);
RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';
