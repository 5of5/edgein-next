UPDATE public.data_fields
	SET is_valid_identifier=true
	WHERE "path" IN ('team_member.company_id', 'team_member.person_id', 'people.slug');
