CREATE OR REPLACE VIEW vc_firms_edit_access AS
    SELECT *
    FROM public.organization_edit_access
    WHERE resource_type = 'vc_firms';
