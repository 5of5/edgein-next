SET check_function_bodies = false;
CREATE TABLE public.companies (
    slug text NOT NULL,
    layer text,
    layer_detail text,
    coin_id integer,
    name text,
    logo jsonb,
    total_employees numeric,
    github text,
    notes text,
    overview text,
    website text,
    careers_page text,
    company_linkedin text,
    year_founded text,
    investor_amount bigint,
    total_valuation text,
    white_paper text,
    market_verified text,
    velocity_linkedin text,
    velocity_token text,
    id integer NOT NULL,
    external_id text,
    date_added date,
    ico_start date,
    ico_end date,
    audit_file text,
    tags jsonb,
    sentiment jsonb,
    status text DEFAULT 'draft'::text NOT NULL,
    aliases text,
    twitter text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    discord text,
    glassdoor text,
    bitcointalk text,
    facebook text,
    instagram text,
    medium text,
    reddit text,
    telegram text,
    youtube text,
    blockchain_explorer text,
    status_tags jsonb,
    location_json jsonb,
    geopoint public.geography(Point,4326),
    library jsonb,
    search_count integer,
    trajectory double precision,
    web_domain text,
    email_domain text,
    team_enrichment_status text,
    enrichment_priority integer DEFAULT 0 NOT NULL,
    data_enriched_at timestamp without time zone,
    domain_enriched_at timestamp with time zone,
    num_of_views integer,
    datapoints_count integer DEFAULT 0 NOT NULL,
    company_size integer,
    longitude double precision,
    latitude double precision,
    web3_address jsonb
);
CREATE FUNCTION public.companies_datapoints(company_row public.companies) RETURNS integer
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    col_count integer;
    members_count integer;
    investment_rounds_count integer;
BEGIN
     col_count := (SELECT count(value)::int FROM json_each_text(row_to_json(company_row)));
     members_count := (SELECT count(*) FROM team_members tm WHERE company_row.id = tm.company_id);
     investment_rounds_count = (SELECT count(*) FROM investment_rounds ir WHERE company_row.id = ir.company_id);
     RETURN col_count + members_count + investment_rounds_count;
END;
$$;
CREATE FUNCTION public.compute_people_data() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
DELETE FROM people_computed_data WHERE person_id=NEW.person_id;
INSERT INTO people_computed_data (person_id, location_json, geopoint, tags, title)
SELECT
    NEW.person_id as person_id,
    result.location_json AS location_json,
    result.geopoint as geopoint,
    result.tags AS tags,
    result.title AS title
FROM (
    SELECT
        person_id,
        end_date,
        location_json,
        geopoint,
        tags,
        title,
        ROW_NUMBER() OVER (PARTITION BY person_id ORDER BY end_date DESC) AS rn
    FROM (
        SELECT
            ppl.id AS person_id,
            tm.end_date,
            tm.title,
            c.location_json,
            c.geopoint,
            c.tags
        FROM people AS ppl
        INNER JOIN team_members AS tm ON ppl.id = tm.person_id
        LEFT JOIN companies c on tm.company_id = c.id
        UNION ALL
        SELECT
            ppl.id AS person_id,
            i.end_date,
            i.title,
            vf.location_json,
            vf.geopoint,
            vf.tags
        FROM people AS ppl
        INNER JOIN investors AS i ON ppl.id = i.person_id
        LEFT JOIN vc_firms vf on i.vc_firm_id = vf.id
    ) AS subquery
    WHERE person_id=NEW.person_id
    GROUP BY person_id, end_date, location_json, title, geopoint, tags
    ORDER BY subquery.end_date DESC
) AS result
WHERE result.rn = 1;
RETURN NEW;
END;
$$;
CREATE FUNCTION public.link_person_to_user_when_added_new() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE public.users
        SET person_id=NEW.id
        WHERE email=NEW.work_email;
           RETURN NEW;
END;
$$;
CREATE FUNCTION public.link_person_to_user_when_new_user_added() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE public.users AS u
        SET person_id=personQuery.id
        FROM (
            SELECT id FROM public.people AS p
            WHERE p.work_email=NEW.email
        ) AS personQuery
        WHERE u.id=NEW.id;
           RETURN NEW;
END;
$$;
CREATE TABLE public.lists (
    id integer NOT NULL,
    name text NOT NULL,
    created_by_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    type text,
    public boolean DEFAULT true,
    updated_at timestamp with time zone DEFAULT now(),
    description text,
    total_no_of_resources integer
);
CREATE FUNCTION public.lists_total_no_of_companies(list_row public.lists) RETURNS integer
    LANGUAGE sql STABLE
    AS $$
SELECT (SELECT count(*)
  FROM follows_companies
  INNER JOIN companies
      ON follows_companies.resource_id = companies.id
  WHERE
    follows_companies.list_id = list_row.id AND companies.status = 'published')
    +
    (SELECT count(*)
  FROM follows_vc_firms
  INNER JOIN vc_firms
      ON follows_vc_firms.resource_id = vc_firms.id
  WHERE
    follows_vc_firms.list_id = list_row.id AND vc_firms.status = 'published')
     +
    (SELECT count(*)
  FROM follows_people
  INNER JOIN people
      ON follows_people.resource_id = people.id
  WHERE
    follows_people.list_id = list_row.id AND people.status = 'published')
$$;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.users (
    id integer NOT NULL,
    external_id text,
    email text,
    display_name text,
    role text DEFAULT 'user'::text,
    person_id integer,
    is_auth0_verified boolean DEFAULT false,
    auth0_linkedin_id text,
    auth0_user_pass_id text,
    reference_user_id integer,
    reference_id text DEFAULT "substring"(md5((random())::text), 0, 9) NOT NULL,
    additional_emails jsonb DEFAULT jsonb_build_array() NOT NULL,
    billing_org_id integer,
    active boolean DEFAULT true NOT NULL,
    onboarding_information jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    feature_flags jsonb DEFAULT jsonb_build_object() NOT NULL,
    preferences jsonb DEFAULT jsonb_build_object('daily_emails', true) NOT NULL,
    use_credits_system boolean DEFAULT false NOT NULL,
    last_transaction_expiration timestamp with time zone,
    credits text
);
CREATE FUNCTION public.user_credits(user_row public.users) RETURNS numeric
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    user_credits integer;
BEGIN
    user_credits := (SELECT SUM(amount) FROM user_transactions WHERE user_id = user_row.id AND created_at >= '2023-07-19T00:00:00.000000+00:00');
    IF user_credits < 0 OR user_credits IS NULL THEN
        RETURN 0;
    END IF;
    RETURN user_credits;
END;
$$;
CREATE TABLE public.vc_firms (
    name text,
    slug text NOT NULL,
    logo jsonb,
    website text,
    linkedin text,
    id integer NOT NULL,
    external_id text,
    sentiment jsonb,
    status text DEFAULT 'draft'::text NOT NULL,
    tags jsonb,
    overview text,
    year_founded text,
    twitter text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    latest_investment date,
    status_tags jsonb,
    num_of_investments integer,
    num_of_exits integer,
    investment_amount_total bigint,
    team_size integer,
    location_json jsonb,
    geopoint public.geography,
    library jsonb,
    web_domain text,
    email_domain text,
    enrichment_priority integer DEFAULT 0 NOT NULL,
    data_enriched_at timestamp with time zone,
    domain_enriched_at timestamp with time zone,
    num_of_views integer,
    datapoints_count integer DEFAULT 0 NOT NULL,
    longitude double precision,
    latitude double precision,
    github text,
    discord text,
    glassdoor text,
    telegram text,
    web3_address jsonb
);
CREATE FUNCTION public.vc_firms_datapoints(vc_firm_row public.vc_firms) RETURNS integer
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    col_count integer;
    investors_count integer;
    investments_count integer;
BEGIN
     col_count := (SELECT count(value)::int FROM json_each_text(row_to_json(vc_firm_row)));
     investors_count := ((SELECT count(*) FROM investors inv WHERE vc_firm_row.id = inv.vc_firm_id) * 2);
     investments_count = ((SELECT count(*) FROM investments invst WHERE vc_firm_row.id = invst.vc_firm_id) * 3);
     RETURN col_count + investors_count + investments_count;
END;
$$;
CREATE FUNCTION public.vc_firms_latest_investments(vc_firm_row public.vc_firms) RETURNS text
    LANGUAGE sql STABLE
    AS $$
  SELECT round_date
  FROM investments
  INNER JOIN investment_rounds
    ON investments.round_id = investment_rounds.id
  WHERE
    investments.vc_firm_id = vc_firm_row.id
    ORDER BY round_date DESC
    LIMIT 1
$$;
CREATE FUNCTION public.vc_firms_num_of_investments(vc_firm_row public.vc_firms) RETURNS integer
    LANGUAGE sql STABLE
    AS $$
  SELECT count(*)
  FROM investments
  WHERE
    investments.vc_firm_id = vc_firm_row.id
$$;
CREATE TABLE public.actions (
    "user" integer,
    action text NOT NULL,
    page text NOT NULL,
    properties jsonb NOT NULL,
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    resource text,
    resource_id integer,
    partner integer
);
CREATE SEQUENCE public.actions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.actions_id_seq OWNED BY public.actions.id;
CREATE TABLE public.allowed_emails (
    id integer NOT NULL,
    email text NOT NULL,
    created_at date DEFAULT now() NOT NULL,
    updated_at date DEFAULT now() NOT NULL,
    match_type text DEFAULT 'EMAIL'::text NOT NULL,
    person_id integer
);
COMMENT ON TABLE public.allowed_emails IS 'Allowed email Ids';
CREATE SEQUENCE public.allowed_emails_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.allowed_emails_id_seq OWNED BY public.allowed_emails.id;
CREATE TABLE public.application_meta (
    id integer NOT NULL,
    key text NOT NULL,
    value timestamp with time zone DEFAULT now() NOT NULL,
    error text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.application_meta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.application_meta_id_seq OWNED BY public.application_meta.id;
CREATE TABLE public.billing_org (
    id integer NOT NULL,
    plan text NOT NULL,
    user_limit integer NOT NULL,
    customer_id text NOT NULL,
    status text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.billing_org_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.billing_org_id_seq OWNED BY public.billing_org.id;
CREATE TABLE public.blockchains (
    name text NOT NULL,
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.blockchain_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.blockchain_id_seq OWNED BY public.blockchains.id;
CREATE TABLE public.coins (
    ticker text NOT NULL,
    name text NOT NULL,
    blockchain_id integer,
    id integer NOT NULL,
    external_id text,
    type text,
    company_id integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.coins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.coins_id_seq OWNED BY public.coins.id;
CREATE TABLE public.comments (
    id integer NOT NULL,
    content text NOT NULL,
    note_id integer NOT NULL,
    created_by_user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
CREATE TABLE public.resource_edit_access (
    id integer NOT NULL,
    resource_id integer NOT NULL,
    resource_type text NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
COMMENT ON TABLE public.resource_edit_access IS 'Add access to user if he has verified the access to organization';
CREATE VIEW public.companies_edit_access AS
 SELECT resource_edit_access.id,
    resource_edit_access.resource_id,
    resource_edit_access.resource_type,
    resource_edit_access.user_id
   FROM public.resource_edit_access
  WHERE (resource_edit_access.resource_type = 'companies'::text);
CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;
CREATE TABLE public.company_errors (
    slug text,
    layer text,
    layer_detail text,
    coin_id integer,
    name text,
    logo jsonb,
    total_employees numeric,
    github text,
    notes text,
    overview text,
    website text,
    careers_page text,
    company_linkedin text,
    year_founded text,
    investor_amount bigint,
    total_valuation text,
    white_paper text,
    market_verified text,
    velocity_linkedin text,
    velocity_token text,
    external_id text,
    id integer NOT NULL,
    date_added date,
    ico_start date,
    ico_end date,
    audit_file text,
    tags jsonb,
    sentiment jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    aliases text,
    twitter text,
    discord text,
    glassdoor text,
    location text,
    bitcointalk text,
    facebook text,
    instagram text,
    medium text,
    reddit text,
    telegram text,
    youtube text,
    blockchain_explorer text,
    duplicated_id integer,
    data_source text
);
CREATE SEQUENCE public.company_errors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.company_errors_id_seq OWNED BY public.company_errors.id;
CREATE TABLE public.company_overview_original (
    id integer NOT NULL,
    company_id integer,
    created_at timestamp without time zone DEFAULT now(),
    overview text
);
CREATE SEQUENCE public.company_overview_original_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.company_overview_original_id_seq OWNED BY public.company_overview_original.id;
CREATE TABLE public.data_actions (
    name text NOT NULL,
    partner_value integer NOT NULL,
    owner_value integer NOT NULL,
    user_value integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.data_discard (
    partner integer NOT NULL,
    resource text NOT NULL,
    resource_id integer NOT NULL,
    field text NOT NULL,
    value jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    accuracy_weight integer NOT NULL,
    id bigint NOT NULL
);
CREATE SEQUENCE public.data_discard_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.data_discard_id_seq OWNED BY public.data_discard.id;
CREATE TABLE public.data_fields (
    name text NOT NULL,
    path text NOT NULL,
    resource text NOT NULL,
    weight integer NOT NULL,
    regex_transform text,
    description text,
    regex_test text,
    is_valid_identifier boolean DEFAULT false NOT NULL,
    restricted_admin boolean DEFAULT false NOT NULL,
    data_type text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.data_partners (
    id integer NOT NULL,
    name text NOT NULL,
    api_key text DEFAULT md5((random())::text) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.data_partners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.data_partners_id_seq OWNED BY public.data_partners.id;
CREATE TABLE public.data_raw (
    partner integer NOT NULL,
    resource text NOT NULL,
    resource_id integer NOT NULL,
    field text NOT NULL,
    value jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    accuracy_weight integer NOT NULL,
    id bigint NOT NULL,
    user_id integer,
    is_active boolean DEFAULT true NOT NULL
);
CREATE SEQUENCE public.data_raw_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.data_raw_id_seq OWNED BY public.data_raw.id;
CREATE TABLE public.data_runs (
    data_raw integer NOT NULL,
    classification text NOT NULL,
    run_at timestamp with time zone NOT NULL,
    weight integer NOT NULL,
    weight_normalized double precision NOT NULL,
    id bigint NOT NULL,
    max_weight integer,
    ambiguity_score double precision,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.data_runs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.data_runs_id_seq OWNED BY public.data_runs.id;
CREATE TABLE public.disabled_emails (
    id integer NOT NULL,
    email text NOT NULL,
    match_type text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.disabled_emails_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.disabled_emails_id_seq OWNED BY public.disabled_emails.id;
CREATE TABLE public.domains (
    domain character varying(50)
);
CREATE TABLE public.event_organization (
    id integer NOT NULL,
    event_id integer NOT NULL,
    company_id integer,
    vc_firm_id integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    type text,
    sponsor_type text
);
CREATE SEQUENCE public.event_organization_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.event_organization_id_seq OWNED BY public.event_organization.id;
CREATE TABLE public.event_person (
    id integer NOT NULL,
    event_id integer NOT NULL,
    person_id integer NOT NULL,
    type text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.event_person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.event_person_id_seq OWNED BY public.event_person.id;
CREATE TABLE public.events (
    name text NOT NULL,
    start_date date,
    end_date date,
    location_json jsonb,
    link text,
    notes text,
    size text,
    status text DEFAULT 'draft'::text NOT NULL,
    parent_event_id integer,
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    geopoint public.geography,
    types jsonb,
    price numeric,
    banner jsonb,
    slug text NOT NULL,
    twitter text,
    facebook text,
    instagram text,
    discord text,
    telegram text,
    venue_name text,
    start_time time without time zone,
    end_time time without time zone,
    timezone text,
    overview text,
    is_featured boolean DEFAULT false,
    attachments jsonb DEFAULT jsonb_build_array() NOT NULL,
    library jsonb,
    num_of_views integer
);
CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;
CREATE TABLE public.follows (
    resource_type text NOT NULL,
    resource_id integer NOT NULL,
    id integer NOT NULL,
    list_id integer,
    created_by_user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE VIEW public.follows_companies AS
 SELECT follows.created_by_user_id,
    follows.resource_id,
    follows.id,
    follows.list_id,
    follows.resource_type
   FROM public.follows
  WHERE (follows.resource_type = 'companies'::text);
CREATE SEQUENCE public.follows_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.follows_id_seq OWNED BY public.follows.id;
CREATE VIEW public.follows_people AS
 SELECT follows.created_by_user_id,
    follows.resource_id,
    follows.id,
    follows.resource_type,
    follows.list_id
   FROM public.follows
  WHERE (follows.resource_type = 'people'::text);
CREATE VIEW public.follows_vc_firms AS
 SELECT follows.created_by_user_id,
    follows.resource_id,
    follows.id,
    follows.resource_type,
    follows.list_id
   FROM public.follows
  WHERE (follows.resource_type = 'vc_firms'::text);
CREATE TABLE public.investment_rounds (
    company_id integer,
    round_date date,
    round text,
    amount numeric,
    valuation numeric,
    id integer NOT NULL,
    external_id text,
    status text DEFAULT 'draft'::text NOT NULL,
    currency text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.investment_rounds_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.investment_rounds_id_seq OWNED BY public.investment_rounds.id;
CREATE TABLE public.investments (
    round_id integer,
    person_id integer,
    vc_firm_id integer,
    id integer NOT NULL,
    external_id text,
    status text DEFAULT 'draft'::text NOT NULL,
    amount numeric,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.investments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.investments_id_seq OWNED BY public.investments.id;
CREATE TABLE public.investors (
    vc_firm_id integer,
    person_id integer,
    function text,
    start_date date,
    end_date date,
    seniority text,
    title text,
    id integer NOT NULL,
    external_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    email_address text,
    founder boolean,
    enrichment_priority integer DEFAULT 0 NOT NULL,
    email_enriched_at timestamp with time zone
);
CREATE SEQUENCE public.investors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.investors_id_seq OWNED BY public.investors.id;
CREATE TABLE public.invited_people (
    id integer NOT NULL,
    person_id integer NOT NULL,
    inviter_user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.invited_people_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.invited_people_id_seq OWNED BY public.invited_people.id;
CREATE TABLE public.leads (
    id integer NOT NULL,
    first_name text,
    last_name text,
    email text NOT NULL,
    phone text,
    linkedin_url text,
    company_name text,
    website text,
    source text,
    campaign_id text,
    instantly_id text,
    status text DEFAULT 'pending'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    email_domain text,
    converted_userid integer
);
CREATE SEQUENCE public.leads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.leads_id_seq OWNED BY public.leads.id;
CREATE TABLE public.leads_segmentation (
    id integer NOT NULL,
    name text,
    description text,
    sql text,
    campaign_id text NOT NULL,
    status text DEFAULT 'inactive'::text NOT NULL,
    created_at date DEFAULT now() NOT NULL,
    updated_at date DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.leads_segmentation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.leads_segmentation_id_seq OWNED BY public.leads_segmentation.id;
CREATE TABLE public.likes (
    id integer NOT NULL,
    note_id integer NOT NULL,
    created_by_user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;
CREATE TABLE public.list_members (
    list_id integer NOT NULL,
    user_id integer NOT NULL,
    id integer NOT NULL,
    member_type text DEFAULT 'follow'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.list_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.list_members_id_seq OWNED BY public.list_members.id;
CREATE TABLE public.list_user_groups (
    list_id integer NOT NULL,
    user_group_id integer NOT NULL,
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.list_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.list_user_groups_id_seq OWNED BY public.list_user_groups.id;
CREATE SEQUENCE public.lists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.lists_id_seq OWNED BY public.lists.id;
CREATE TABLE public.news (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    date date,
    text text NOT NULL,
    link text,
    status text,
    source jsonb,
    kind text,
    metadata jsonb,
    library jsonb,
    num_of_views integer
);
CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;
CREATE TABLE public.news_organizations (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    news_id integer NOT NULL,
    company_id integer,
    vc_firm_id integer,
    type text
);
CREATE SEQUENCE public.news_organizations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.news_organizations_id_seq OWNED BY public.news_organizations.id;
CREATE TABLE public.news_person (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    news_id integer NOT NULL,
    person_id integer,
    type text
);
CREATE SEQUENCE public.news_person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.news_person_id_seq OWNED BY public.news_person.id;
CREATE TABLE public.news_related_organizations (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    news_id integer NOT NULL,
    name text,
    type text
);
CREATE SEQUENCE public.news_related_organizations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.news_related_organizations_id_seq OWNED BY public.news_related_organizations.id;
CREATE TABLE public.news_related_person (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    news_id integer NOT NULL,
    name text,
    type text
);
CREATE SEQUENCE public.news_related_person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.news_related_person_id_seq OWNED BY public.news_related_person.id;
CREATE TABLE public.notes (
    id integer NOT NULL,
    notes text NOT NULL,
    created_by integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    user_group_id integer,
    resource_type text,
    resource_id integer,
    updated_at timestamp with time zone DEFAULT now(),
    audience text
);
CREATE SEQUENCE public.notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.notes_id_seq OWNED BY public.notes.id;
CREATE TABLE public.notification_actions (
    id integer NOT NULL,
    notification_id integer NOT NULL,
    action_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.notification_actions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.notification_actions_id_seq OWNED BY public.notification_actions.id;
CREATE TABLE public.notifications (
    id integer NOT NULL,
    target_user_id integer NOT NULL,
    event_type text NOT NULL,
    follow_resource_type text NOT NULL,
    notification_resource_type text NOT NULL,
    company_id integer,
    vc_firm_id integer,
    message text,
    read boolean DEFAULT false NOT NULL,
    read_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    action_ids jsonb,
    notification_resource_id integer
);
CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;
CREATE TABLE public.people (
    name text,
    slug text NOT NULL,
    picture jsonb,
    github text,
    type text,
    personal_email text,
    work_email text,
    linkedin text,
    id integer NOT NULL,
    external_id text,
    status text DEFAULT 'draft'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    website_url text,
    twitter_url text,
    facebook_url text,
    about text,
    city text,
    country text,
    email jsonb,
    library jsonb,
    enrichment_priority integer DEFAULT 0 NOT NULL,
    data_enriched_at timestamp with time zone,
    datapoints_count integer,
    latitude double precision,
    longitude double precision,
    discord text,
    telegram text,
    web3_address jsonb,
    location_json jsonb,
    geopoint public.geography
);
COMMENT ON COLUMN public.people.email IS '[{"email": "john@example.com", "isPrimary": false}, {"email": "johny@example.com", "isPrimary": true}]';
CREATE TABLE public.people_bk (
    name character varying(50),
    slug character varying(50),
    id integer
);
CREATE TABLE public.people_computed_data (
    id integer NOT NULL,
    person_id integer NOT NULL,
    location_json jsonb,
    geopoint public.geography,
    tags jsonb,
    title text
);
COMMENT ON TABLE public.people_computed_data IS 'Computed data from its relations for better performance';
CREATE SEQUENCE public.people_computed_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.people_computed_data_id_seq OWNED BY public.people_computed_data.id;
CREATE SEQUENCE public.people_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.people_id_seq OWNED BY public.people.id;
CREATE TABLE public."postgres_edgein_1_cb64akwzxn73_us_east_2_rds_amazonaws_com-2023" (
    c1 text
);
CREATE TABLE public.reset_passwords (
    id integer NOT NULL,
    user_id integer NOT NULL,
    generated_password text NOT NULL,
    created_by_user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.reset_passwords_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.reset_passwords_id_seq OWNED BY public.reset_passwords.id;
CREATE SEQUENCE public.resource_edit_access_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.resource_edit_access_id_seq OWNED BY public.resource_edit_access.id;
CREATE TABLE public.resource_links (
    from_company_id integer,
    from_vc_firm_id integer,
    to_company_id integer,
    to_vc_firm_id integer,
    link_type text NOT NULL,
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.resource_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.resource_links_id_seq OWNED BY public.resource_links.id;
CREATE TABLE public.team_members (
    company_id integer,
    person_id integer,
    function text,
    start_date date,
    end_date date,
    founder boolean,
    seniority text,
    title text,
    id integer NOT NULL,
    external_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    email_address text,
    enrichment_priority integer DEFAULT 0 NOT NULL,
    data_enriched_at timestamp with time zone,
    email_enriched_at timestamp with time zone
);
CREATE SEQUENCE public.team_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.team_members_id_seq OWNED BY public.team_members.id;
CREATE TABLE public.temp_companies (
    slug text,
    layer text,
    layer_detail text,
    coin_id integer,
    name text,
    logo jsonb,
    total_employees numeric,
    github text,
    notes text,
    overview text,
    website text,
    careers_page text,
    company_linkedin text,
    year_founded text,
    investor_amount bigint,
    total_valuation text,
    white_paper text,
    market_verified text,
    velocity_linkedin text,
    velocity_token text,
    id integer,
    external_id text,
    date_added date,
    ico_start date,
    ico_end date,
    audit_file text,
    tags jsonb,
    sentiment jsonb,
    status text,
    aliases text,
    twitter text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    location text,
    discord text,
    glassdoor text,
    bitcointalk text,
    facebook text,
    instagram text,
    medium text,
    reddit text,
    telegram text,
    youtube text,
    blockchain_explorer text,
    status_tags jsonb,
    location_json jsonb,
    geopoint public.geography(Point,4326),
    library jsonb,
    search_count integer,
    trajectory double precision,
    web_domain text,
    email_domain text,
    team_enrichment_status text
);
CREATE TABLE public.temp_events (
    name text,
    start_date date,
    end_date date,
    location_json jsonb,
    link text,
    notes text,
    size text,
    status text,
    parent_event_id integer,
    id integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    geopoint public.geography,
    types jsonb,
    price numeric,
    banner jsonb,
    slug text,
    twitter text,
    facebook text,
    instagram text,
    discord text,
    telegram text,
    venue_name text,
    start_time time without time zone,
    end_time time without time zone,
    timezone text,
    overview text,
    is_featured boolean,
    attachments jsonb,
    library jsonb
);
CREATE TABLE public.temp_investment_rounds (
    company_id integer,
    round_date date,
    round text,
    amount numeric,
    valuation numeric,
    id integer,
    external_id text,
    status text,
    currency text,
    created_at timestamp with time zone
);
CREATE TABLE public.temp_investments (
    round_id integer,
    person_id integer,
    vc_firm_id integer,
    id integer,
    external_id text,
    status text,
    amount numeric,
    created_at timestamp with time zone
);
CREATE TABLE public.temp_news (
    id integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    date date,
    text text,
    link text,
    status text,
    source jsonb,
    kind text,
    metadata jsonb,
    library jsonb
);
CREATE TABLE public.temp_people (
    name text,
    slug text,
    picture jsonb,
    github text,
    type text,
    personal_email text,
    work_email text,
    linkedin text,
    id integer,
    external_id text,
    status text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    website_url text,
    twitter_url text,
    facebook_url text,
    about text,
    city text,
    country text,
    email jsonb,
    library jsonb
);
CREATE TABLE public.temp_team_members (
    company_id integer,
    person_id integer,
    function text,
    start_date date,
    end_date date,
    founder boolean,
    seniority text,
    title text,
    id integer,
    external_id text,
    created_at timestamp with time zone,
    email_address text
);
CREATE TABLE public.temp_vc_firms (
    name text,
    slug text,
    logo jsonb,
    website text,
    linkedin text,
    id integer,
    external_id text,
    sentiment jsonb,
    status text,
    tags jsonb,
    overview text,
    year_founded text,
    location text,
    twitter text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    latest_investment date,
    status_tags jsonb,
    num_of_investments integer,
    num_of_exits integer,
    investment_amount_total bigint,
    team_size integer,
    location_json jsonb,
    geopoint public.geography,
    library jsonb
);
CREATE MATERIALIZED VIEW public.temp_vc_firms_datapoint_count AS
 SELECT c.id,
    ((( SELECT (count(json_each_text.value))::integer AS count
           FROM json_each_text(row_to_json(c.*)) json_each_text(key, value)) + (( SELECT count(*) AS count
           FROM public.investors inv
          WHERE (c.id = inv.vc_firm_id)) * 2)) + (( SELECT count(*) AS count
           FROM public.investments invst
          WHERE (c.id = invst.vc_firm_id)) * 3)) AS datapoints_count
   FROM public.vc_firms c
  WITH NO DATA;
CREATE TABLE public.temp_web3_counter (
    company_id integer,
    library jsonb,
    status text,
    keyword_matched_count bigint,
    published_members bigint,
    draft_members bigint
);
CREATE TABLE public.temp_web3_counter2 (
    company_id integer,
    library jsonb,
    status text,
    keyword_matched_count bigint,
    published_members bigint,
    draft_members bigint
);
CREATE TABLE public.temp_web_not_matched (
    id integer,
    library jsonb,
    status text,
    published_members bigint,
    draft_members bigint
);
CREATE TABLE public.temp_web_not_matched2 (
    id integer,
    library jsonb,
    status text,
    published_members bigint,
    draft_members bigint
);
CREATE TABLE public.tmp_lib_people (
    id integer,
    status text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    library jsonb
);
CREATE TABLE public.user_group_invites (
    id integer NOT NULL,
    user_group_id integer NOT NULL,
    email text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by_user_id integer
);
CREATE SEQUENCE public.user_group_invites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.user_group_invites_id_seq OWNED BY public.user_group_invites.id;
CREATE TABLE public.user_group_members (
    id integer NOT NULL,
    user_group_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.user_group_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.user_group_members_id_seq OWNED BY public.user_group_members.id;
CREATE TABLE public.user_groups (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    twitter text,
    telegram text,
    discord text,
    created_by_user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false
);
CREATE SEQUENCE public.user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.user_groups_id_seq OWNED BY public.user_groups.id;
CREATE TABLE public.user_tokens (
    id integer NOT NULL,
    token text NOT NULL,
    type text NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
COMMENT ON TABLE public.user_tokens IS 'Store various tokens for user which we can invalidate by deleting them';
CREATE SEQUENCE public.user_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.user_tokens_id_seq OWNED BY public.user_tokens.id;
CREATE TABLE public.user_transactions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    amount integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    note text,
    created_by integer
);
CREATE SEQUENCE public.user_transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.user_transactions_id_seq OWNED BY public.user_transactions.id;
CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
CREATE VIEW public.users_public AS
 SELECT users.id,
    users.display_name,
    users.email,
    users.person_id
   FROM public.users;
CREATE VIEW public.vc_firms_edit_access AS
 SELECT resource_edit_access.id,
    resource_edit_access.resource_id,
    resource_edit_access.resource_type,
    resource_edit_access.user_id
   FROM public.resource_edit_access
  WHERE (resource_edit_access.resource_type = 'vc_firms'::text);
CREATE SEQUENCE public.vc_firms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.vc_firms_id_seq OWNED BY public.vc_firms.id;
CREATE TABLE public.waitlist_emails (
    id integer NOT NULL,
    email text NOT NULL,
    created_at date DEFAULT now() NOT NULL,
    updated_at date DEFAULT now() NOT NULL
);
COMMENT ON TABLE public.waitlist_emails IS 'List of waitlist emailIds';
CREATE SEQUENCE public.waitlist_emails_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.waitlist_emails_id_seq OWNED BY public.waitlist_emails.id;
ALTER TABLE ONLY public.actions ALTER COLUMN id SET DEFAULT nextval('public.actions_id_seq'::regclass);
ALTER TABLE ONLY public.allowed_emails ALTER COLUMN id SET DEFAULT nextval('public.allowed_emails_id_seq'::regclass);
ALTER TABLE ONLY public.application_meta ALTER COLUMN id SET DEFAULT nextval('public.application_meta_id_seq'::regclass);
ALTER TABLE ONLY public.billing_org ALTER COLUMN id SET DEFAULT nextval('public.billing_org_id_seq'::regclass);
ALTER TABLE ONLY public.blockchains ALTER COLUMN id SET DEFAULT nextval('public.blockchain_id_seq'::regclass);
ALTER TABLE ONLY public.coins ALTER COLUMN id SET DEFAULT nextval('public.coins_id_seq'::regclass);
ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);
ALTER TABLE ONLY public.company_errors ALTER COLUMN id SET DEFAULT nextval('public.company_errors_id_seq'::regclass);
ALTER TABLE ONLY public.company_overview_original ALTER COLUMN id SET DEFAULT nextval('public.company_overview_original_id_seq'::regclass);
ALTER TABLE ONLY public.data_discard ALTER COLUMN id SET DEFAULT nextval('public.data_discard_id_seq'::regclass);
ALTER TABLE ONLY public.data_partners ALTER COLUMN id SET DEFAULT nextval('public.data_partners_id_seq'::regclass);
ALTER TABLE ONLY public.data_raw ALTER COLUMN id SET DEFAULT nextval('public.data_raw_id_seq'::regclass);
ALTER TABLE ONLY public.data_runs ALTER COLUMN id SET DEFAULT nextval('public.data_runs_id_seq'::regclass);
ALTER TABLE ONLY public.disabled_emails ALTER COLUMN id SET DEFAULT nextval('public.disabled_emails_id_seq'::regclass);
ALTER TABLE ONLY public.event_organization ALTER COLUMN id SET DEFAULT nextval('public.event_organization_id_seq'::regclass);
ALTER TABLE ONLY public.event_person ALTER COLUMN id SET DEFAULT nextval('public.event_person_id_seq'::regclass);
ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);
ALTER TABLE ONLY public.follows ALTER COLUMN id SET DEFAULT nextval('public.follows_id_seq'::regclass);
ALTER TABLE ONLY public.investment_rounds ALTER COLUMN id SET DEFAULT nextval('public.investment_rounds_id_seq'::regclass);
ALTER TABLE ONLY public.investments ALTER COLUMN id SET DEFAULT nextval('public.investments_id_seq'::regclass);
ALTER TABLE ONLY public.investors ALTER COLUMN id SET DEFAULT nextval('public.investors_id_seq'::regclass);
ALTER TABLE ONLY public.invited_people ALTER COLUMN id SET DEFAULT nextval('public.invited_people_id_seq'::regclass);
ALTER TABLE ONLY public.leads ALTER COLUMN id SET DEFAULT nextval('public.leads_id_seq'::regclass);
ALTER TABLE ONLY public.leads_segmentation ALTER COLUMN id SET DEFAULT nextval('public.leads_segmentation_id_seq'::regclass);
ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);
ALTER TABLE ONLY public.list_members ALTER COLUMN id SET DEFAULT nextval('public.list_members_id_seq'::regclass);
ALTER TABLE ONLY public.list_user_groups ALTER COLUMN id SET DEFAULT nextval('public.list_user_groups_id_seq'::regclass);
ALTER TABLE ONLY public.lists ALTER COLUMN id SET DEFAULT nextval('public.lists_id_seq'::regclass);
ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);
ALTER TABLE ONLY public.news_organizations ALTER COLUMN id SET DEFAULT nextval('public.news_organizations_id_seq'::regclass);
ALTER TABLE ONLY public.news_person ALTER COLUMN id SET DEFAULT nextval('public.news_person_id_seq'::regclass);
ALTER TABLE ONLY public.news_related_organizations ALTER COLUMN id SET DEFAULT nextval('public.news_related_organizations_id_seq'::regclass);
ALTER TABLE ONLY public.news_related_person ALTER COLUMN id SET DEFAULT nextval('public.news_related_person_id_seq'::regclass);
ALTER TABLE ONLY public.notes ALTER COLUMN id SET DEFAULT nextval('public.notes_id_seq'::regclass);
ALTER TABLE ONLY public.notification_actions ALTER COLUMN id SET DEFAULT nextval('public.notification_actions_id_seq'::regclass);
ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);
ALTER TABLE ONLY public.people ALTER COLUMN id SET DEFAULT nextval('public.people_id_seq'::regclass);
ALTER TABLE ONLY public.people_computed_data ALTER COLUMN id SET DEFAULT nextval('public.people_computed_data_id_seq'::regclass);
ALTER TABLE ONLY public.reset_passwords ALTER COLUMN id SET DEFAULT nextval('public.reset_passwords_id_seq'::regclass);
ALTER TABLE ONLY public.resource_edit_access ALTER COLUMN id SET DEFAULT nextval('public.resource_edit_access_id_seq'::regclass);
ALTER TABLE ONLY public.resource_links ALTER COLUMN id SET DEFAULT nextval('public.resource_links_id_seq'::regclass);
ALTER TABLE ONLY public.team_members ALTER COLUMN id SET DEFAULT nextval('public.team_members_id_seq'::regclass);
ALTER TABLE ONLY public.user_group_invites ALTER COLUMN id SET DEFAULT nextval('public.user_group_invites_id_seq'::regclass);
ALTER TABLE ONLY public.user_group_members ALTER COLUMN id SET DEFAULT nextval('public.user_group_members_id_seq'::regclass);
ALTER TABLE ONLY public.user_groups ALTER COLUMN id SET DEFAULT nextval('public.user_groups_id_seq'::regclass);
ALTER TABLE ONLY public.user_tokens ALTER COLUMN id SET DEFAULT nextval('public.user_tokens_id_seq'::regclass);
ALTER TABLE ONLY public.user_transactions ALTER COLUMN id SET DEFAULT nextval('public.user_transactions_id_seq'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
ALTER TABLE ONLY public.vc_firms ALTER COLUMN id SET DEFAULT nextval('public.vc_firms_id_seq'::regclass);
ALTER TABLE ONLY public.waitlist_emails ALTER COLUMN id SET DEFAULT nextval('public.waitlist_emails_id_seq'::regclass);
ALTER TABLE ONLY public.actions
    ADD CONSTRAINT actions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.allowed_emails
    ADD CONSTRAINT allowed_emails_email_key UNIQUE (email);
ALTER TABLE ONLY public.allowed_emails
    ADD CONSTRAINT allowed_emails_person_id_key UNIQUE (person_id);
ALTER TABLE ONLY public.allowed_emails
    ADD CONSTRAINT allowed_emails_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.application_meta
    ADD CONSTRAINT application_meta_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.billing_org
    ADD CONSTRAINT billing_org_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.blockchains
    ADD CONSTRAINT blockchain_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.coins
    ADD CONSTRAINT coins_external_id_key UNIQUE (external_id);
ALTER TABLE ONLY public.coins
    ADD CONSTRAINT coins_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_external_id_key UNIQUE (external_id);
ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_slug_key UNIQUE (slug);
ALTER TABLE ONLY public.company_overview_original
    ADD CONSTRAINT company_overview_original_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.data_actions
    ADD CONSTRAINT data_actions_pkey PRIMARY KEY (name);
ALTER TABLE ONLY public.data_discard
    ADD CONSTRAINT data_discard_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.data_fields
    ADD CONSTRAINT data_fields_pkey PRIMARY KEY (path);
ALTER TABLE ONLY public.data_partners
    ADD CONSTRAINT data_partners_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.data_raw
    ADD CONSTRAINT data_raw_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.data_runs
    ADD CONSTRAINT data_runs_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.disabled_emails
    ADD CONSTRAINT disabled_emails_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.event_organization
    ADD CONSTRAINT event_organization_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.event_person
    ADD CONSTRAINT event_person_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_slug_key UNIQUE (slug);
ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_resource_type_resource_id_list_id_key UNIQUE (resource_type, resource_id, list_id);
ALTER TABLE ONLY public.investment_rounds
    ADD CONSTRAINT investment_rounds_external_id_key UNIQUE (external_id);
ALTER TABLE ONLY public.investment_rounds
    ADD CONSTRAINT investment_rounds_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.investments
    ADD CONSTRAINT investments_external_id_key UNIQUE (external_id);
ALTER TABLE ONLY public.investments
    ADD CONSTRAINT investments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.investors
    ADD CONSTRAINT investors_external_id_key UNIQUE (external_id);
ALTER TABLE ONLY public.investors
    ADD CONSTRAINT investors_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.investors
    ADD CONSTRAINT investors_vc_firm_id_person_id_key UNIQUE (vc_firm_id, person_id);
ALTER TABLE ONLY public.invited_people
    ADD CONSTRAINT invited_people_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_email_key UNIQUE (email);
ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.leads_segmentation
    ADD CONSTRAINT leads_segmentation_name_key UNIQUE (name);
ALTER TABLE ONLY public.leads_segmentation
    ADD CONSTRAINT leads_segmentation_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.list_members
    ADD CONSTRAINT list_members_list_id_user_id_key UNIQUE (list_id, user_id);
ALTER TABLE ONLY public.list_members
    ADD CONSTRAINT list_members_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.list_user_groups
    ADD CONSTRAINT list_user_groups_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.lists
    ADD CONSTRAINT lists_created_by_id_name_key UNIQUE (created_by_id, name);
ALTER TABLE ONLY public.lists
    ADD CONSTRAINT lists_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.news_organizations
    ADD CONSTRAINT news_organizations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.news_person
    ADD CONSTRAINT news_person_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.news_related_organizations
    ADD CONSTRAINT news_related_organizations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.news_related_person
    ADD CONSTRAINT news_related_person_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.notification_actions
    ADD CONSTRAINT notification_actions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.people_computed_data
    ADD CONSTRAINT people_computed_data_person_id_key UNIQUE (person_id);
ALTER TABLE ONLY public.people_computed_data
    ADD CONSTRAINT people_computed_data_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_external_id_key UNIQUE (external_id);
ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_slug_key UNIQUE (slug);
ALTER TABLE ONLY public.reset_passwords
    ADD CONSTRAINT reset_passwords_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.resource_edit_access
    ADD CONSTRAINT resource_edit_access_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.resource_edit_access
    ADD CONSTRAINT resource_edit_access_resource_id_user_id_resource_type_key UNIQUE (resource_id, user_id, resource_type);
ALTER TABLE ONLY public.resource_links
    ADD CONSTRAINT resource_links_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_company_id_person_id_key UNIQUE (company_id, person_id);
ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_external_id_key UNIQUE (external_id);
ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_group_invites
    ADD CONSTRAINT user_group_invites_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_group_members
    ADD CONSTRAINT user_group_members_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT user_groups_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_tokens
    ADD CONSTRAINT user_tokens_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_transactions
    ADD CONSTRAINT user_transactions_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_person_id_key UNIQUE (person_id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.vc_firms
    ADD CONSTRAINT vc_firms_external_id_key UNIQUE (external_id);
ALTER TABLE ONLY public.vc_firms
    ADD CONSTRAINT vc_firms_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.vc_firms
    ADD CONSTRAINT vc_firms_slug_key UNIQUE (slug);
ALTER TABLE ONLY public.waitlist_emails
    ADD CONSTRAINT waitlist_emails_email_key UNIQUE (email);
ALTER TABLE ONLY public.waitlist_emails
    ADD CONSTRAINT waitlist_emails_pkey PRIMARY KEY (id);
CREATE INDEX companies_date_added_idx ON public.companies USING btree (date_added);
CREATE INDEX companies_investor_amount_idx ON public.companies USING btree (investor_amount);
CREATE INDEX companies_name_idx ON public.companies USING btree (name);
CREATE INDEX companies_num_of_views_idx ON public.companies USING btree (num_of_views);
CREATE INDEX companies_tags_idx ON public.companies USING gin (tags);
CREATE INDEX events_num_of_views_idx ON public.events USING btree (num_of_views);
CREATE INDEX idx_companies_date_added_with_status ON public.companies USING btree (date_added, status);
CREATE INDEX idx_companies_status ON public.companies USING hash (status);
CREATE INDEX idx_created_at ON public.actions USING btree (created_at);
CREATE INDEX idx_events_publihed_and_started_at ON public.events USING btree (status, start_date);
CREATE INDEX idx_investment_rounds_round_date ON public.investment_rounds USING btree (round_date);
CREATE INDEX idx_news_created_at_and_status ON public.news USING btree (created_at, status);
CREATE INDEX idx_personalized_by_location_companies ON public.companies USING gin (location_json, library, status_tags);
CREATE INDEX idx_personalized_by_location_events ON public.events USING gin (location_json, library);
CREATE INDEX idx_personalized_by_location_vc_firms ON public.vc_firms USING gin (location_json, library, status_tags);
CREATE INDEX idx_target_user_event_type_notifications ON public.notifications USING btree (created_at, target_user_id, event_type);
CREATE INDEX idx_target_user_notifications ON public.notifications USING hash (target_user_id);
CREATE INDEX idx_vc_firm_status ON public.vc_firms USING hash (status);
CREATE INDEX news_num_of_views_idx ON public.news USING btree (num_of_views);
CREATE INDEX vc_firms_investment_amount_total_idx ON public.vc_firms USING btree (investment_amount_total);
CREATE INDEX vc_firms_latest_investment_idx ON public.vc_firms USING btree (latest_investment);
CREATE INDEX vc_firms_name_idx ON public.vc_firms USING btree (name);
CREATE INDEX vc_firms_num_of_views_idx ON public.vc_firms USING btree (num_of_views);
CREATE UNIQUE INDEX vc_firms_slug_idx ON public.vc_firms USING btree (slug);
CREATE INDEX vc_firms_tags_idx ON public.vc_firms USING gin (tags);
CREATE INDEX "“idx_vc_firms_datapoints_count”" ON public.vc_firms USING btree (datapoints_count);
CREATE TRIGGER compute_people_data AFTER INSERT ON public.investors FOR EACH ROW EXECUTE FUNCTION public.compute_people_data();
CREATE TRIGGER compute_people_data AFTER INSERT ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.compute_people_data();
CREATE TRIGGER set_public_application_meta_updated_at BEFORE UPDATE ON public.application_meta FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_application_meta_updated_at ON public.application_meta IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_companies_updated_at ON public.companies IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_events_updated_at ON public.events IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_investors_updated_at BEFORE UPDATE ON public.investors FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_investors_updated_at ON public.investors IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_leads_segmentation_updated_at BEFORE UPDATE ON public.leads_segmentation FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_public_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_public_lists_updated_at BEFORE UPDATE ON public.lists FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_lists_updated_at ON public.lists IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_news_organizations_updated_at BEFORE UPDATE ON public.news_organizations FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_news_organizations_updated_at ON public.news_organizations IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_news_person_updated_at BEFORE UPDATE ON public.news_person FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_news_person_updated_at ON public.news_person IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_news_related_organizations_updated_at BEFORE UPDATE ON public.news_related_organizations FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_news_related_organizations_updated_at ON public.news_related_organizations IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_news_related_person_updated_at BEFORE UPDATE ON public.news_related_person FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_news_related_person_updated_at ON public.news_related_person IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_news_updated_at BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_news_updated_at ON public.news IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_notes_updated_at BEFORE UPDATE ON public.notes FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_notes_updated_at ON public.notes IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_notifications_updated_at BEFORE UPDATE ON public.notifications FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_notifications_updated_at ON public.notifications IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_people_updated_at BEFORE UPDATE ON public.people FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_people_updated_at ON public.people IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_user_groups_updated_at BEFORE UPDATE ON public.user_groups FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_user_groups_updated_at ON public.user_groups IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_vc_firms_updated_at BEFORE UPDATE ON public.vc_firms FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_vc_firms_updated_at ON public.vc_firms IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER trigger_link_person_to_user_when_added_new AFTER INSERT ON public.people FOR EACH ROW EXECUTE FUNCTION public.link_person_to_user_when_added_new();
CREATE TRIGGER trigger_link_person_to_user_when_new_user_added AFTER INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION public.link_person_to_user_when_new_user_added();
ALTER TABLE ONLY public.coins
    ADD CONSTRAINT coins_blockchain_id_fkey FOREIGN KEY (blockchain_id) REFERENCES public.blockchains(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.investment_rounds
    ADD CONSTRAINT investment_rounds_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id);
ALTER TABLE ONLY public.investments
    ADD CONSTRAINT investments_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.people(id);
ALTER TABLE ONLY public.investments
    ADD CONSTRAINT investments_round_id_fkey FOREIGN KEY (round_id) REFERENCES public.investment_rounds(id);
ALTER TABLE ONLY public.investments
    ADD CONSTRAINT investments_vc_firm_id_fkey FOREIGN KEY (vc_firm_id) REFERENCES public.vc_firms(id);
ALTER TABLE ONLY public.investors
    ADD CONSTRAINT investors_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.people(id);
ALTER TABLE ONLY public.investors
    ADD CONSTRAINT investors_vc_firm_id_fkey FOREIGN KEY (vc_firm_id) REFERENCES public.vc_firms(id);
ALTER TABLE ONLY public.list_members
    ADD CONSTRAINT list_members_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.lists(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.list_members
    ADD CONSTRAINT list_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_user_group_id_fkey FOREIGN KEY (user_group_id) REFERENCES public.user_groups(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.notification_actions
    ADD CONSTRAINT notification_actions_notification_id_fkey FOREIGN KEY (notification_id) REFERENCES public.notifications(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.people_computed_data
    ADD CONSTRAINT people_computed_data_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.people(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id);
ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.people(id);
ALTER TABLE ONLY public.user_group_invites
    ADD CONSTRAINT user_group_invites_user_group_id_fkey FOREIGN KEY (user_group_id) REFERENCES public.user_groups(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.user_group_members
    ADD CONSTRAINT user_group_members_user_group_id_fkey FOREIGN KEY (user_group_id) REFERENCES public.user_groups(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.user_group_members
    ADD CONSTRAINT user_group_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.user_transactions
    ADD CONSTRAINT user_transactions_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.user_transactions
    ADD CONSTRAINT user_transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.people(id) ON UPDATE RESTRICT;
