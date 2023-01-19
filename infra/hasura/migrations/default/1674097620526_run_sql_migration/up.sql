ALTER TABLE public.investors ALTER COLUMN start_date TYPE DATE USING(to_date(start_date::TEXT, 'YYYY-MM-DD')::DATE);
ALTER TABLE public.investors ALTER COLUMN end_date TYPE DATE USING(to_date(end_date::TEXT, 'YYYY-MM-DD')::DATE);
