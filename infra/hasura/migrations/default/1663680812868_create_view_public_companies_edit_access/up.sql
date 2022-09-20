CREATE OR REPLACE VIEW companies_edit_access AS
    SELECT *
    FROM public.organization_edit_access
    WHERE resource_type = 'companies';
