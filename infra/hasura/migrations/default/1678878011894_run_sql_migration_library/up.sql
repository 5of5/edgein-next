ALTER TABLE public.companies ALTER COLUMN library TYPE jsonb USING jsonb_build_array(library)::jsonb;
ALTER TABLE public.vc_firms ALTER COLUMN library TYPE jsonb USING jsonb_build_array(library)::jsonb;
ALTER TABLE public.people ALTER COLUMN library TYPE jsonb USING jsonb_build_array(library)::jsonb;
