INSERT INTO "public"."data_fields"
  ("name", "path", "resource", "weight", "regex_transform", "description", "regex_test")
VALUES
-- companies fields
	(E'slug', E'company.slug', E'company', 1, null, null, null),
	(E'layer', E'company.layer', E'company', 1, null, null, null),
	(E'layer_detail', E'company.layer_detail', E'company', 1, null, null, null),
	(E'coin_id', E'company.coin_id', E'company', 1, null, null, null),
	(E'name', E'company.name', E'company', 1, null, null, null),
	(E'logo', E'company.logo', E'company', 1, null, null, null),
	(E'total_employees', E'company.total_employees', E'company', 1, null, null, null),
	(E'github', E'company.github', E'company', 1, null, null, null),
	(E'notes', E'company.notes', E'company', 1, null, null, null),
	(E'overview', E'company.overview', E'company', 1, null, null, null),
	(E'website', E'company.website', E'company', 1, null, null, null),
	(E'careers_page', E'company.careers_page', E'company', 1, null, null, null),
	(E'company_linkedin', E'company.company_linkedin', E'company', 1, null, null, null),
	(E'year_founded', E'company.year_founded', E'company', 1, null, null, null),
	(E'investor_amount', E'company.investor_amount', E'company', 1, null, null, null),
	(E'total_valuation', E'company.total_valuation', E'company', 1, null, null, null),
	(E'white_paper', E'company.white_paper', E'company', 1, null, null, null),
	(E'market_verified', E'company.market_verified', E'company', 1, null, null, null),
	(E'velocity_linkedin', E'company.velocity_linkedin', E'company', 1, null, null, null),
	(E'velocity_token', E'company.velocity_token', E'company', 1, null, null, null),
	(E'external_id', E'company.external_id', E'company', 1, null, null, null),
	(E'date_added', E'company.date_added', E'company', 1, null, null, null),
	(E'ico_start', E'company.ico_start', E'company', 1, null, null, null),
	(E'ico_end', E'company.ico_end', E'company', 1, null, null, null),
	(E'audit_file', E'company.audit_file', E'company', 1, null, null, null),
	(E'tags', E'company.tags', E'company', 1, null, null, null),
	(E'sentiment', E'company.sentiment', E'company', 1, null, null, null),
	(E'status', E'company.status', E'company', 1, null, null, null),
	(E'aliases', E'company.aliases', E'company', 1, null, null, null),
	(E'twitter', E'company.twitter', E'company', 1, null, null, null),
	(E'created_at', E'company.created_at', E'company', 1, null, null, null),
	(E'updated_at', E'company.updated_at', E'company', 1, null, null, null),
	(E'location', E'company.location', E'company', 1, null, null, null),
	(E'discord', E'company.discord', E'company', 1, null, null, null),
	(E'glassdoor', E'company.glassdoor', E'company', 1, null, null, null),
	-- vc_firms fields
	(E'name', E'vc_firm.name', E'vc_firm', 1, null, null, null),
	(E'slug', E'vc_firm.slug', E'vc_firm', 1, null, null, null),
	(E'logo', E'vc_firm.logo', E'vc_firm', 1, null, null, null),
	(E'website', E'vc_firm.website', E'vc_firm', 1, null, null, null),
	(E'linkedin', E'vc_firm.linkedin', E'vc_firm', 1, null, null, null),
	(E'external_id', E'vc_firm.external_id', E'vc_firm', 1, null, null, null),
	(E'sentiment', E'vc_firm.sentiment', E'vc_firm', 1, null, null, null),
	(E'status', E'vc_firm.status', E'vc_firm', 1, null, null, null),
	(E'tags', E'vc_firm.tags', E'vc_firm', 1, null, null, null),
	(E'overview', E'vc_firm.overview', E'vc_firm', 1, null, null, null),
	(E'year_founded', E'vc_firm.year_founded', E'vc_firm', 1, null, null, null),
	(E'location', E'vc_firm.location', E'vc_firm', 1, null, null, null),
	(E'twitter', E'vc_firm.twitter', E'vc_firm', 1, null, null, null),
	(E'created_at', E'vc_firm.created_at', E'vc_firm', 1, null, null, null),
	(E'updated_at', E'vc_firm.updated_at', E'vc_firm', 1, null, null, null),
	-- people fields
	(E'name', E'people.name', E'people', 1, null, null, null),
	(E'slug', E'people.slug', E'people', 1, null, null, null),
	(E'picture', E'people.picture', E'people', 1, null, null, null),
	(E'github', E'people.github', E'people', 1, null, null, null),
	(E'type', E'people.type', E'people', 1, null, null, null),
	(E'personal_email', E'people.personal_email', E'people', 1, null, null, null),
	(E'work_email', E'people.work_email', E'people', 1, null, null, null),
	(E'linkedin', E'people.linkedin', E'people', 1, null, null, null),
	(E'external_id', E'people.external_id', E'people', 1, null, null, null),
	(E'status', E'people.status', E'people', 1, null, null, null),
	(E'created_at', E'people.created_at', E'people', 1, null, null, null),
	(E'updated_at', E'people.updated_at', E'people', 1, null, null, null);
