CREATE OR REPLACE VIEW companies_edit_access AS
    SELECT *
    FROM public.resource_edit_access
    WHERE resource_type = 'companies';
