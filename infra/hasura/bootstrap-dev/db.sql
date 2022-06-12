DROP TABLE public.investors;
DROP TABLE public.team_members;
DROP TABLE public.investments;
DROP TABLE public.investment_rounds;
DROP TABLE public.companies;
DROP TABLE public.people;
DROP TABLE public.vc_firms;

CREATE TABLE public.companies (
	slug text NULL,
	layer text NULL,
	layer_detail text NULL,
	coins text NULL,
	name text NULL,
	logo jsonb NULL,
	total_employees numeric NULL,
	github text NULL,
	notes text NULL,
	overview text NULL,
	website text NULL,
	careers_page text NULL,
	company_linkedin text NULL,
	year_founded text NULL,
	investor_amount text NULL,
	total_valuation text NULL,
	white_paper text NULL,
	market_verified text NULL,
	velocity_linkedIn text NULL,
	velocity_token text NULL,
	id SERIAL PRIMARY KEY,
	external_id text NOT NULL,
	CONSTRAINT companies_external_id_key UNIQUE (external_id)
);


CREATE TABLE public.people (
	name text NULL,
	slug text NULL,
	picture jsonb NULL,
	github text NULL,
	type text NULL,
	personal_email text NULL,
	work_email text NULL,
	linkedin text NULL,
	id SERIAL PRIMARY KEY,
	external_id text NOT NULL,
	CONSTRAINT people_external_id_key UNIQUE (external_id),
	CONSTRAINT people_slug_key UNIQUE (slug)
);

CREATE TABLE public.vc_firms (
	name text NULL,
	slug text NULL,
	logo jsonb NULL,
	website text NULL,
	linkedin text NULL,
	id SERIAL PRIMARY KEY,
	external_id text NOT NULL,
	CONSTRAINT vc_firms_external_id_key UNIQUE (external_id)
);

CREATE TABLE public.investment_rounds (
  company_id int4 NULL REFERENCES companies (id),
	round_date text NULL,
	round text NULL,
	amount numeric NULL,
	valuation numeric NULL,
	id SERIAL PRIMARY KEY,
	external_id text NOT NULL,
	CONSTRAINT investment_rounds_external_id_key UNIQUE (external_id)
);

CREATE TABLE public.investments (
  round_id int4 NULL REFERENCES investment_rounds (id),
	person_id int4 NULL REFERENCES people (id),
	vc_firm_id int4 NULL REFERENCES vc_firms (id),
	id SERIAL PRIMARY KEY,
	external_id text NOT NULL,
	CONSTRAINT investments_external_id_key UNIQUE (external_id)
);


CREATE TABLE public.team_members (
	company_id int4 NULL REFERENCES companies (id),
	person_id int4 NULL REFERENCES people (id),
	function text NULL,
	start_date DATE NULL,
	end_date DATE NULL,
  founder boolean NULL,
  seniority text NULL,
  title text NULL,
	id SERIAL PRIMARY KEY,
	external_id text NOT NULL,
	CONSTRAINT team_members_external_id_key UNIQUE (external_id)
);

CREATE TABLE public.investors (
	vc_firm_id int4 NULL REFERENCES vc_firms (id),
	person_id int4 NULL REFERENCES people (id),
	function text NULL,
	start_date numeric NULL,
	end_date numeric NULL,
  seniority text NULL,
  title text NULL,
	id SERIAL PRIMARY KEY,
	external_id text NOT NULL,
	CONSTRAINT investors_external_id_key UNIQUE (external_id)
);


