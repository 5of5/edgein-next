UPDATE public.data_fields SET regex_transform = '{"url": "%s"}', data_type = 'json' WHERE path IN ('company.logo', 'vc_firm.logo', 'people.picture');
UPDATE public.data_fields SET is_valid_identifier=true WHERE path IN ('people.name', 'people.linkedin', 'vc_firm.name');
