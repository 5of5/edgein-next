--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.4

-- Started on 2022-07-24 09:54:03 PDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: edgeu
--

ALTER SCHEMA public OWNER TO edgeu;

--
-- TOC entry 4449 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: edgeu
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 227 (class 1259 OID 18245)
-- Name: vc_firms; Type: TABLE; Schema: public; Owner: edgeu
--

CREATE TABLE public.vc_firms (
    name text,
    slug text,
    logo jsonb,
    website text,
    linkedin text,
    id integer NOT NULL,
    external_id text NOT NULL
);


ALTER TABLE public.vc_firms OWNER TO edgeu;

--
-- TOC entry 297 (class 1255 OID 18996)
-- Name: vc_firms_num_of_investments(public.vc_firms); Type: FUNCTION; Schema: public; Owner: edgeu
--

CREATE FUNCTION public.vc_firms_num_of_investments(vc_firm_row public.vc_firms) RETURNS integer
    LANGUAGE sql STABLE
    AS $$
  SELECT count(*)
  FROM investments
  WHERE
    investments.vc_firm_id = vc_firm_row.id
$$;


ALTER FUNCTION public.vc_firms_num_of_investments(vc_firm_row public.vc_firms) OWNER TO edgeu;

--
-- TOC entry 237 (class 1259 OID 18578)
-- Name: actions; Type: TABLE; Schema: public; Owner: edgeu
--

CREATE TABLE public.actions (
    "user" text NOT NULL,
    action text NOT NULL,
    page text NOT NULL,
    properties jsonb NOT NULL,
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.actions OWNER TO edgeu;

--
-- TOC entry 236 (class 1259 OID 18577)
-- Name: actions_id_seq; Type: SEQUENCE; Schema: public; Owner: edgeu
--

CREATE SEQUENCE public.actions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.actions_id_seq OWNER TO edgeu;

--
-- TOC entry 4451 (class 0 OID 0)
-- Dependencies: 236
-- Name: actions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: edgeu
--

ALTER SEQUENCE public.actions_id_seq OWNED BY public.actions.id;


--
-- TOC entry 241 (class 1259 OID 18612)
-- Name: blockchains; Type: TABLE; Schema: public; Owner: edgeu
--

CREATE TABLE public.blockchains (
    name text NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.blockchains OWNER TO edgeu;

--
-- TOC entry 240 (class 1259 OID 18611)
-- Name: blockchain_id_seq; Type: SEQUENCE; Schema: public; Owner: edgeu
--

CREATE SEQUENCE public.blockchain_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blockchain_id_seq OWNER TO edgeu;

--
-- TOC entry 4452 (class 0 OID 0)
-- Dependencies: 240
-- Name: blockchain_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: edgeu
--

ALTER SEQUENCE public.blockchain_id_seq OWNED BY public.blockchains.id;


--
-- TOC entry 239 (class 1259 OID 18603)
-- Name: coins; Type: TABLE; Schema: public; Owner: edgeu
--

CREATE TABLE public.coins (
    ticker text NOT NULL,
    name text NOT NULL,
    blockchain_id integer,
    id integer NOT NULL,
    external_id text
);


ALTER TABLE public.coins OWNER TO edgeu;

--
-- TOC entry 238 (class 1259 OID 18602)
-- Name: coins_id_seq; Type: SEQUENCE; Schema: public; Owner: edgeu
--

CREATE SEQUENCE public.coins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coins_id_seq OWNER TO edgeu;

--
-- TOC entry 4453 (class 0 OID 0)
-- Dependencies: 238
-- Name: coins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: edgeu
--

ALTER SEQUENCE public.coins_id_seq OWNED BY public.coins.id;


--
-- TOC entry 223 (class 1259 OID 18221)
-- Name: companies; Type: TABLE; Schema: public; Owner: edgeu
--

CREATE TABLE public.companies (
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
    id integer NOT NULL,
    external_id text NOT NULL,
    date_added date,
    ico_start date,
    ico_end date,
    audit_file text,
    tags jsonb
);


ALTER TABLE public.companies OWNER TO edgeu;

--
-- TOC entry 222 (class 1259 OID 18220)
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: edgeu
--

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.companies_id_seq OWNER TO edgeu;

--
-- TOC entry 4454 (class 0 OID 0)
-- Dependencies: 222
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: edgeu
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- TOC entry 243 (class 1259 OID 20523)
-- Name: follows; Type: TABLE; Schema: public; Owner: edgeu
--

CREATE TABLE public.follows (
    created_by_user_id integer NOT NULL,
    resource_type text NOT NULL,
    resource_id integer NOT NULL,
    id integer NOT NULL,
    list_id integer
);


ALTER TABLE public.follows OWNER TO edgeu;

--
-- TOC entry 245 (class 1259 OID 20538)
-- Name: follows_companies; Type: VIEW; Schema: public; Owner: edgeu
--

CREATE VIEW public.follows_companies AS
 SELECT follows.created_by_user_id,
    follows.resource_id,
    follows.id,
    follows.resource_type
   FROM public.follows
  WHERE (follows.resource_type = 'companies'::text);


ALTER TABLE public.follows_companies OWNER TO edgeu;

--
-- TOC entry 242 (class 1259 OID 20522)
-- Name: follows_id_seq; Type: SEQUENCE; Schema: public; Owner: edgeu
--

CREATE SEQUENCE public.follows_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.follows_id_seq OWNER TO edgeu;

--
-- TOC entry 4455 (class 0 OID 0)
-- Dependencies: 242
-- Name: follows_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: edgeu
--

ALTER SEQUENCE public.follows_id_seq OWNED BY public.follows.id;


--
-- TOC entry 229 (class 1259 OID 18256)
-- Name: investment_rounds; Type: TABLE; Schema: public; Owner: edgeu
--

CREATE TABLE public.investment_rounds (
    company_id integer,
    round_date text,
    round text,
    amount numeric,
    valuation numeric,
    id integer NOT NULL,
    external_id text NOT NULL
);


ALTER TABLE public.investment_rounds OWNER TO edgeu;

--
-- TOC entry 228 (class 1259 OID 18255)
-- Name: investment_rounds_id_seq; Type: SEQUENCE; Schema: public; Owner: edgeu
--

CREATE SEQUENCE public.investment_rounds_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.investment_rounds_id_seq OWNER TO edgeu;

--
-- TOC entry 4456 (class 0 OID 0)
-- Dependencies: 228
-- Name: investment_rounds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: edgeu
--

ALTER SEQUENCE public.investment_rounds_id_seq OWNED BY public.investment_rounds.id;


--
-- TOC entry 231 (class 1259 OID 18272)
-- Name: investments; Type: TABLE; Schema: public; Owner: edgeu
--

CREATE TABLE public.investments (
    round_id integer,
    person_id integer,
    vc_firm_id integer,
    id integer NOT NULL,
    external_id text NOT NULL
);


ALTER TABLE public.investments OWNER TO edgeu;

--
-- TOC entry 230 (class 1259 OID 18271)
-- Name: investments_id_seq; Type: SEQUENCE; Schema: public; Owner: edgeu
--

CREATE SEQUENCE public.investments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.investments_id_seq OWNER TO edgeu;

--
-- TOC entry 4457 (class 0 OID 0)
-- Dependencies: 230
-- Name: investments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: edgeu
--

ALTER SEQUENCE public.investments_id_seq OWNED BY public.investments.id;


--
-- TOC entry 235 (class 1259 OID 18319)
-- Name: investors; Type: TABLE; Schema: public; Owner: edgeu
--

CREATE TABLE public.investors (
    vc_firm_id integer,
    person_id integer,
    function text,
    start_date numeric,
    end_date numeric,
    seniority text,
    title text,
    id integer NOT NULL,
    external_id text NOT NULL
);


ALTER TABLE public.investors OWNER TO edgeu;

--
-- TOC entry 234 (class 1259 OID 18318)
-- Name: investors_id_seq; Type: SEQUENCE; Schema: public; Owner: edgeu
--

CREATE SEQUENCE public.investors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.investors_id_seq OWNER TO edgeu;

--
-- TOC entry 4458 (class 0 OID 0)
-- Dependencies: 234
-- Name: investors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: edgeu
--

ALTER SEQUENCE public.investors_id_seq OWNED BY public.investors.id;


--
-- TOC entry 249 (class 1259 OID 20815)
-- Name: list_members; Type: TABLE; Schema: public; Owner: edgeu
--

CREATE TABLE public.list_members (
    list_id integer NOT NULL,
    user_id integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.list_members OWNER TO edgeu;

--
-- TOC entry 248 (class 1259 OID 20814)
-- Name: list_members_id_seq; Type: SEQUENCE; Schema: public; Owner: edgeu
--

CREATE SEQUENCE public.list_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.list_members_id_seq OWNER TO edgeu;

--
-- TOC entry 4459 (class 0 OID 0)
-- Dependencies: 248
-- Name: list_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: edgeu
--

ALTER SEQUENCE public.list_members_id_seq OWNED BY public.list_members.id;


--
-- TOC entry 247 (class 1259 OID 20806)
-- Name: lists; Type: TABLE; Schema: public; Owner: edgeu
--

CREATE TABLE public.lists (
    id integer NOT NULL,
    name text NOT NULL,
    created_by_id integer NOT NULL
);


ALTER TABLE public.lists OWNER TO edgeu;

--
-- TOC entry 246 (class 1259 OID 20805)
-- Name: lists_id_seq; Type: SEQUENCE; Schema: public; Owner: edgeu
--

CREATE SEQUENCE public.lists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lists_id_seq OWNER TO edgeu;

--
-- TOC entry 4460 (class 0 OID 0)
-- Dependencies: 246
-- Name: lists_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: edgeu
--

ALTER SEQUENCE public.lists_id_seq OWNED BY public.lists.id;


--
-- TOC entry 225 (class 1259 OID 18232)
-- Name: people; Type: TABLE; Schema: public; Owner: edgeu
--

CREATE TABLE public.people (
    name text,
    slug text,
    picture jsonb,
    github text,
    type text,
    personal_email text,
    work_email text,
    linkedin text,
    id integer NOT NULL,
    external_id text NOT NULL
);


ALTER TABLE public.people OWNER TO edgeu;

--
-- TOC entry 224 (class 1259 OID 18231)
-- Name: people_id_seq; Type: SEQUENCE; Schema: public; Owner: edgeu
--

CREATE SEQUENCE public.people_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.people_id_seq OWNER TO edgeu;

--
-- TOC entry 4461 (class 0 OID 0)
-- Dependencies: 224
-- Name: people_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: edgeu
--

ALTER SEQUENCE public.people_id_seq OWNED BY public.people.id;


--
-- TOC entry 233 (class 1259 OID 18298)
-- Name: team_members; Type: TABLE; Schema: public; Owner: edgeu
--

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
    external_id text NOT NULL
);


ALTER TABLE public.team_members OWNER TO edgeu;

--
-- TOC entry 232 (class 1259 OID 18297)
-- Name: team_members_id_seq; Type: SEQUENCE; Schema: public; Owner: edgeu
--

CREATE SEQUENCE public.team_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.team_members_id_seq OWNER TO edgeu;

--
-- TOC entry 4462 (class 0 OID 0)
-- Dependencies: 232
-- Name: team_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: edgeu
--

ALTER SEQUENCE public.team_members_id_seq OWNED BY public.team_members.id;


--
-- TOC entry 244 (class 1259 OID 20531)
-- Name: users; Type: TABLE; Schema: public; Owner: edgeu
--

CREATE TABLE public.users (
    id integer NOT NULL,
    external_id text,
    email text,
    display_name text
);


ALTER TABLE public.users OWNER TO edgeu;

--
-- TOC entry 226 (class 1259 OID 18244)
-- Name: vc_firms_id_seq; Type: SEQUENCE; Schema: public; Owner: edgeu
--

CREATE SEQUENCE public.vc_firms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vc_firms_id_seq OWNER TO edgeu;

--
-- TOC entry 4463 (class 0 OID 0)
-- Dependencies: 226
-- Name: vc_firms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: edgeu
--

ALTER SEQUENCE public.vc_firms_id_seq OWNED BY public.vc_firms.id;


--
-- TOC entry 4239 (class 2604 OID 18581)
-- Name: actions id; Type: DEFAULT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.actions ALTER COLUMN id SET DEFAULT nextval('public.actions_id_seq'::regclass);


--
-- TOC entry 4242 (class 2604 OID 18615)
-- Name: blockchains id; Type: DEFAULT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.blockchains ALTER COLUMN id SET DEFAULT nextval('public.blockchain_id_seq'::regclass);


--
-- TOC entry 4241 (class 2604 OID 18606)
-- Name: coins id; Type: DEFAULT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.coins ALTER COLUMN id SET DEFAULT nextval('public.coins_id_seq'::regclass);


--
-- TOC entry 4232 (class 2604 OID 18224)
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- TOC entry 4243 (class 2604 OID 20526)
-- Name: follows id; Type: DEFAULT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.follows ALTER COLUMN id SET DEFAULT nextval('public.follows_id_seq'::regclass);


--
-- TOC entry 4235 (class 2604 OID 18259)
-- Name: investment_rounds id; Type: DEFAULT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.investment_rounds ALTER COLUMN id SET DEFAULT nextval('public.investment_rounds_id_seq'::regclass);


--
-- TOC entry 4236 (class 2604 OID 18275)
-- Name: investments id; Type: DEFAULT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.investments ALTER COLUMN id SET DEFAULT nextval('public.investments_id_seq'::regclass);


--
-- TOC entry 4238 (class 2604 OID 18322)
-- Name: investors id; Type: DEFAULT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.investors ALTER COLUMN id SET DEFAULT nextval('public.investors_id_seq'::regclass);


--
-- TOC entry 4245 (class 2604 OID 20818)
-- Name: list_members id; Type: DEFAULT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.list_members ALTER COLUMN id SET DEFAULT nextval('public.list_members_id_seq'::regclass);


--
-- TOC entry 4244 (class 2604 OID 20809)
-- Name: lists id; Type: DEFAULT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.lists ALTER COLUMN id SET DEFAULT nextval('public.lists_id_seq'::regclass);


--
-- TOC entry 4233 (class 2604 OID 18235)
-- Name: people id; Type: DEFAULT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.people ALTER COLUMN id SET DEFAULT nextval('public.people_id_seq'::regclass);


--
-- TOC entry 4237 (class 2604 OID 18301)
-- Name: team_members id; Type: DEFAULT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.team_members ALTER COLUMN id SET DEFAULT nextval('public.team_members_id_seq'::regclass);


--
-- TOC entry 4234 (class 2604 OID 18248)
-- Name: vc_firms id; Type: DEFAULT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.vc_firms ALTER COLUMN id SET DEFAULT nextval('public.vc_firms_id_seq'::regclass);


--
-- TOC entry 4277 (class 2606 OID 18586)
-- Name: actions actions_pkey; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.actions
    ADD CONSTRAINT actions_pkey PRIMARY KEY (id);


--
-- TOC entry 4283 (class 2606 OID 18619)
-- Name: blockchains blockchain_pkey; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.blockchains
    ADD CONSTRAINT blockchain_pkey PRIMARY KEY (id);


--
-- TOC entry 4279 (class 2606 OID 18653)
-- Name: coins coins_external_id_key; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.coins
    ADD CONSTRAINT coins_external_id_key UNIQUE (external_id);


--
-- TOC entry 4281 (class 2606 OID 18610)
-- Name: coins coins_pkey; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.coins
    ADD CONSTRAINT coins_pkey PRIMARY KEY (id);


--
-- TOC entry 4247 (class 2606 OID 18230)
-- Name: companies companies_external_id_key; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_external_id_key UNIQUE (external_id);


--
-- TOC entry 4249 (class 2606 OID 18228)
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- TOC entry 4285 (class 2606 OID 20530)
-- Name: follows follows_pkey; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_pkey PRIMARY KEY (id);


--
-- TOC entry 4261 (class 2606 OID 18265)
-- Name: investment_rounds investment_rounds_external_id_key; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.investment_rounds
    ADD CONSTRAINT investment_rounds_external_id_key UNIQUE (external_id);


--
-- TOC entry 4263 (class 2606 OID 18263)
-- Name: investment_rounds investment_rounds_pkey; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.investment_rounds
    ADD CONSTRAINT investment_rounds_pkey PRIMARY KEY (id);


--
-- TOC entry 4265 (class 2606 OID 18281)
-- Name: investments investments_external_id_key; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.investments
    ADD CONSTRAINT investments_external_id_key UNIQUE (external_id);


--
-- TOC entry 4267 (class 2606 OID 18279)
-- Name: investments investments_pkey; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.investments
    ADD CONSTRAINT investments_pkey PRIMARY KEY (id);


--
-- TOC entry 4273 (class 2606 OID 18328)
-- Name: investors investors_external_id_key; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.investors
    ADD CONSTRAINT investors_external_id_key UNIQUE (external_id);


--
-- TOC entry 4275 (class 2606 OID 18326)
-- Name: investors investors_pkey; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.investors
    ADD CONSTRAINT investors_pkey PRIMARY KEY (id);


--
-- TOC entry 4291 (class 2606 OID 20822)
-- Name: list_members list_members_list_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.list_members
    ADD CONSTRAINT list_members_list_id_user_id_key UNIQUE (list_id, user_id);


--
-- TOC entry 4293 (class 2606 OID 20820)
-- Name: list_members list_members_pkey; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.list_members
    ADD CONSTRAINT list_members_pkey PRIMARY KEY (id);


--
-- TOC entry 4289 (class 2606 OID 20813)
-- Name: lists lists_pkey; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.lists
    ADD CONSTRAINT lists_pkey PRIMARY KEY (id);


--
-- TOC entry 4251 (class 2606 OID 18241)
-- Name: people people_external_id_key; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_external_id_key UNIQUE (external_id);


--
-- TOC entry 4253 (class 2606 OID 18239)
-- Name: people people_pkey; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_pkey PRIMARY KEY (id);


--
-- TOC entry 4255 (class 2606 OID 18243)
-- Name: people people_slug_key; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_slug_key UNIQUE (slug);


--
-- TOC entry 4269 (class 2606 OID 18307)
-- Name: team_members team_members_external_id_key; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_external_id_key UNIQUE (external_id);


--
-- TOC entry 4271 (class 2606 OID 18305)
-- Name: team_members team_members_pkey; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_pkey PRIMARY KEY (id);


--
-- TOC entry 4287 (class 2606 OID 20824)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4257 (class 2606 OID 18254)
-- Name: vc_firms vc_firms_external_id_key; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.vc_firms
    ADD CONSTRAINT vc_firms_external_id_key UNIQUE (external_id);


--
-- TOC entry 4259 (class 2606 OID 18252)
-- Name: vc_firms vc_firms_pkey; Type: CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.vc_firms
    ADD CONSTRAINT vc_firms_pkey PRIMARY KEY (id);


--
-- TOC entry 4294 (class 2606 OID 18266)
-- Name: investment_rounds investment_rounds_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.investment_rounds
    ADD CONSTRAINT investment_rounds_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id);


--
-- TOC entry 4296 (class 2606 OID 18287)
-- Name: investments investments_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.investments
    ADD CONSTRAINT investments_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.people(id);


--
-- TOC entry 4295 (class 2606 OID 18282)
-- Name: investments investments_round_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.investments
    ADD CONSTRAINT investments_round_id_fkey FOREIGN KEY (round_id) REFERENCES public.investment_rounds(id);


--
-- TOC entry 4297 (class 2606 OID 18292)
-- Name: investments investments_vc_firm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.investments
    ADD CONSTRAINT investments_vc_firm_id_fkey FOREIGN KEY (vc_firm_id) REFERENCES public.vc_firms(id);


--
-- TOC entry 4301 (class 2606 OID 18334)
-- Name: investors investors_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.investors
    ADD CONSTRAINT investors_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.people(id);


--
-- TOC entry 4300 (class 2606 OID 18329)
-- Name: investors investors_vc_firm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.investors
    ADD CONSTRAINT investors_vc_firm_id_fkey FOREIGN KEY (vc_firm_id) REFERENCES public.vc_firms(id);


--
-- TOC entry 4302 (class 2606 OID 20837)
-- Name: list_members list_members_list_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.list_members
    ADD CONSTRAINT list_members_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.lists(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 4303 (class 2606 OID 20832)
-- Name: list_members list_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.list_members
    ADD CONSTRAINT list_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 4298 (class 2606 OID 18308)
-- Name: team_members team_members_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id);


--
-- TOC entry 4299 (class 2606 OID 18313)
-- Name: team_members team_members_person_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: edgeu
--

ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.people(id);


-- Completed on 2022-07-24 09:54:25 PDT

--
-- PostgreSQL database dump complete
--

