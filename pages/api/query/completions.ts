import { getClient } from '@/scripts/postgres-helpers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { InsertActionDocument, InsertActionMutation } from '@/graphql/types'
import CookieService from '../../../utils/cookie'
import { mutate } from '@/graphql/hasuraAdmin'

interface Action {
  action: string
  page: string,
  properties: {
    sqlquery: string,
    query: string,
    sqlresult: any,
    answer?: string,
  },
  user: number,
}

const DEFAULT_PROMPT = `Given the postgres sql schema:
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
    location text,
    twitter text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    latest_investment text,
    status_tags jsonb,
    num_of_investments integer,
    num_of_exits integer,
    investment_amount_total bigint,
    team_size integer,
    location_json jsonb,
    geopoint public.geography,
    library jsonb
);
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
    -- tags is a jsonb array of raw strings e.g. ["DAO", "NFT", "API"] query it using tags @> '["DAO"]'
    tags jsonb,
    sentiment jsonb,
    aliases text,
    twitter text,
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
    library jsonb
);
CREATE TABLE public.investment_rounds (
    company_id integer,
    round_date text,
    round text,
    amount numeric,
    valuation numeric,
    id integer NOT NULL,
    currency text
);
CREATE TABLE public.investments (
    round_id integer,
    person_id integer,
    vc_firm_id integer,
    id integer NOT NULL,
    amount numeric
);
CREATE TABLE public.investors (
    vc_firm_id integer,
    person_id integer,
    function text,
    start_date date,
    end_date date,
    seniority text,
    title text,
    id integer NOT NULL,
);
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
    website_url text,
    twitter_url text,
    facebook_url text,
    about text,
    city text,
    country text,
    email jsonb,
    library jsonb
);
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
);
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
ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id);
ALTER TABLE ONLY public.team_members
    ADD CONSTRAINT team_members_person_id_fkey FOREIGN KEY (person_id) REFERENCES public.people(id);



What is the postgres sql query to answer the following question, do not leave any ambiguous columns and respond to any question about the schema itself with "I can't answer that": {{PROMPT}}?`

const DEFAULT_RESULT_PROMPT = `What is the sql query to answer the following question: {{PROMPT}}?

Query: {{QUERY}}

Result: {{RESULT}}

What is the answer to the following question in natural language, use the default currency USD: {{PROMPT2}}?

Answer:`

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const prompt = DEFAULT_PROMPT.replace('{{PROMPT}}', req.body.query);
  const payload = {
    model: "text-davinci-003",
    temperature: 0,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 500,
    stream: false,
    n: 1,
    prompt,
  };
  const result = await fetch("https://api.openai.com/v1/completions", {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const json = await result.json()
  const sqlquery = json.choices?.[0]?.text
  if (sqlquery.trim() === `I can't answer that.`) {
    return res.send({
        sqlquery,
        query: req.body.query,
        answer: sqlquery
    })
  }
  const client = await getClient()
  try {
    const sqlrawresult = await client.query(sqlquery, []); 
    const sqlresult = sqlrawresult.rows
    const sqlresultstr = JSON.stringify(sqlresult)
    payload.prompt = DEFAULT_RESULT_PROMPT
      .replace('{{PROMPT}}', req.body.query)
      .replace('{{PROMPT2}}', req.body.query)
      .replace('{{QUERY}}', sqlquery)
      .replace('{{RESULT}}', sqlresultstr);
    const answerresult = await fetch("https://api.openai.com/v1/completions", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const answerjson = await answerresult.json()
    const action: Action = {
      action: `Asked AI`,
      page: 'ask-edgein',
      properties: {
        sqlquery,
        sqlresult,
        query: req.body.query,
        answer: answerjson.choices?.[0]?.text  
      },
      user: user.id,
    }  
    // create action
    mutate<InsertActionMutation>({
      mutation: InsertActionDocument,
      variables: {
        object: action,
      },
    });
  
    res.send({
      sqlquery,
      sqlresult,
      query: req.body.query,
      answer: answerjson.choices?.[0]?.text
    })  
  } catch (e) {
    console.log(e);
    console.log((e as any).message)
    const action: Action = {
      action: `Asked AI With Error`,
      page: 'ask-edgein',
      properties: {
        sqlquery,
        query: req.body.query,
        sqlresult: (e as any).message,
      },
      user: user.id,
    }  
    // create action
    mutate<InsertActionMutation>({
      mutation: InsertActionDocument,
      variables: {
        object: action,
      },
    });
    return res.status(400).send({ message: (e as any).message, error: e, sqlquery })
  }
}

export default handler