UPDATE public.companies SET "library" = '["Web3"]'
WHERE id IN (
	SELECT id FROM companies WHERE "library" != '["Web3"]'
);
UPDATE public.vc_firms SET "library" = '["Web3"]'
WHERE id IN (
	SELECT id FROM vc_firms WHERE "library" != '["Web3"]'
);
UPDATE public.people SET "library" = '["Web3"]'
WHERE id IN (
	SELECT id FROM people WHERE "library" != '["Web3"]'
);
