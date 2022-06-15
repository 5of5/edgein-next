import { useQuery, UseQueryOptions } from 'react-query';
import { fetcher } from './fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  date: any;
  jsonb: any;
  numeric: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq: InputMaybe<Scalars['Boolean']>;
  _gt: InputMaybe<Scalars['Boolean']>;
  _gte: InputMaybe<Scalars['Boolean']>;
  _in: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['Boolean']>;
  _lte: InputMaybe<Scalars['Boolean']>;
  _neq: InputMaybe<Scalars['Boolean']>;
  _nin: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq: InputMaybe<Scalars['Int']>;
  _gt: InputMaybe<Scalars['Int']>;
  _gte: InputMaybe<Scalars['Int']>;
  _in: InputMaybe<Array<Scalars['Int']>>;
  _is_null: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['Int']>;
  _lte: InputMaybe<Scalars['Int']>;
  _neq: InputMaybe<Scalars['Int']>;
  _nin: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq: InputMaybe<Scalars['String']>;
  _gt: InputMaybe<Scalars['String']>;
  _gte: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike: InputMaybe<Scalars['String']>;
  _in: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex: InputMaybe<Scalars['String']>;
  _is_null: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like: InputMaybe<Scalars['String']>;
  _lt: InputMaybe<Scalars['String']>;
  _lte: InputMaybe<Scalars['String']>;
  _neq: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike: InputMaybe<Scalars['String']>;
  _nin: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "companies" */
export type Companies = {
  __typename?: 'companies';
  careers_page: Maybe<Scalars['String']>;
  coins: Maybe<Scalars['String']>;
  company_linkedin: Maybe<Scalars['String']>;
  external_id: Scalars['String'];
  github: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An array relationship */
  investment_rounds: Array<Investment_Rounds>;
  /** An aggregate relationship */
  investment_rounds_aggregate: Investment_Rounds_Aggregate;
  investor_amount: Maybe<Scalars['String']>;
  layer: Maybe<Scalars['String']>;
  layer_detail: Maybe<Scalars['String']>;
  logo: Maybe<Scalars['jsonb']>;
  market_verified: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  notes: Maybe<Scalars['String']>;
  overview: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  /** An array relationship */
  teamMembers: Array<Team_Members>;
  /** An aggregate relationship */
  teamMembers_aggregate: Team_Members_Aggregate;
  total_employees: Maybe<Scalars['numeric']>;
  total_valuation: Maybe<Scalars['String']>;
  velocity_linkedin: Maybe<Scalars['String']>;
  velocity_token: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
  white_paper: Maybe<Scalars['String']>;
  year_founded: Maybe<Scalars['String']>;
};


/** columns and relationships of "companies" */
export type CompaniesInvestment_RoundsArgs = {
  distinct_on: InputMaybe<Array<Investment_Rounds_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investment_Rounds_Order_By>>;
  where: InputMaybe<Investment_Rounds_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesInvestment_Rounds_AggregateArgs = {
  distinct_on: InputMaybe<Array<Investment_Rounds_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investment_Rounds_Order_By>>;
  where: InputMaybe<Investment_Rounds_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesLogoArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "companies" */
export type CompaniesTeamMembersArgs = {
  distinct_on: InputMaybe<Array<Team_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Team_Members_Order_By>>;
  where: InputMaybe<Team_Members_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesTeamMembers_AggregateArgs = {
  distinct_on: InputMaybe<Array<Team_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Team_Members_Order_By>>;
  where: InputMaybe<Team_Members_Bool_Exp>;
};

/** aggregated selection of "companies" */
export type Companies_Aggregate = {
  __typename?: 'companies_aggregate';
  aggregate: Maybe<Companies_Aggregate_Fields>;
  nodes: Array<Companies>;
};

/** aggregate fields of "companies" */
export type Companies_Aggregate_Fields = {
  __typename?: 'companies_aggregate_fields';
  avg: Maybe<Companies_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Companies_Max_Fields>;
  min: Maybe<Companies_Min_Fields>;
  stddev: Maybe<Companies_Stddev_Fields>;
  stddev_pop: Maybe<Companies_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Companies_Stddev_Samp_Fields>;
  sum: Maybe<Companies_Sum_Fields>;
  var_pop: Maybe<Companies_Var_Pop_Fields>;
  var_samp: Maybe<Companies_Var_Samp_Fields>;
  variance: Maybe<Companies_Variance_Fields>;
};


/** aggregate fields of "companies" */
export type Companies_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Companies_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Companies_Append_Input = {
  logo: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Companies_Avg_Fields = {
  __typename?: 'companies_avg_fields';
  id: Maybe<Scalars['Float']>;
  total_employees: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "companies". All fields are combined with a logical 'AND'. */
export type Companies_Bool_Exp = {
  _and: InputMaybe<Array<Companies_Bool_Exp>>;
  _not: InputMaybe<Companies_Bool_Exp>;
  _or: InputMaybe<Array<Companies_Bool_Exp>>;
  careers_page: InputMaybe<String_Comparison_Exp>;
  coins: InputMaybe<String_Comparison_Exp>;
  company_linkedin: InputMaybe<String_Comparison_Exp>;
  external_id: InputMaybe<String_Comparison_Exp>;
  github: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  investment_rounds: InputMaybe<Investment_Rounds_Bool_Exp>;
  investor_amount: InputMaybe<String_Comparison_Exp>;
  layer: InputMaybe<String_Comparison_Exp>;
  layer_detail: InputMaybe<String_Comparison_Exp>;
  logo: InputMaybe<Jsonb_Comparison_Exp>;
  market_verified: InputMaybe<String_Comparison_Exp>;
  name: InputMaybe<String_Comparison_Exp>;
  notes: InputMaybe<String_Comparison_Exp>;
  overview: InputMaybe<String_Comparison_Exp>;
  slug: InputMaybe<String_Comparison_Exp>;
  teamMembers: InputMaybe<Team_Members_Bool_Exp>;
  total_employees: InputMaybe<Numeric_Comparison_Exp>;
  total_valuation: InputMaybe<String_Comparison_Exp>;
  velocity_linkedin: InputMaybe<String_Comparison_Exp>;
  velocity_token: InputMaybe<String_Comparison_Exp>;
  website: InputMaybe<String_Comparison_Exp>;
  white_paper: InputMaybe<String_Comparison_Exp>;
  year_founded: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "companies" */
export enum Companies_Constraint {
  /** unique or primary key constraint */
  CompaniesExternalIdKey = 'companies_external_id_key',
  /** unique or primary key constraint */
  CompaniesPkey = 'companies_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Companies_Delete_At_Path_Input = {
  logo: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Companies_Delete_Elem_Input = {
  logo: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Companies_Delete_Key_Input = {
  logo: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "companies" */
export type Companies_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
  total_employees: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "companies" */
export type Companies_Insert_Input = {
  careers_page: InputMaybe<Scalars['String']>;
  coins: InputMaybe<Scalars['String']>;
  company_linkedin: InputMaybe<Scalars['String']>;
  external_id: InputMaybe<Scalars['String']>;
  github: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  investment_rounds: InputMaybe<Investment_Rounds_Arr_Rel_Insert_Input>;
  investor_amount: InputMaybe<Scalars['String']>;
  layer: InputMaybe<Scalars['String']>;
  layer_detail: InputMaybe<Scalars['String']>;
  logo: InputMaybe<Scalars['jsonb']>;
  market_verified: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  notes: InputMaybe<Scalars['String']>;
  overview: InputMaybe<Scalars['String']>;
  slug: InputMaybe<Scalars['String']>;
  teamMembers: InputMaybe<Team_Members_Arr_Rel_Insert_Input>;
  total_employees: InputMaybe<Scalars['numeric']>;
  total_valuation: InputMaybe<Scalars['String']>;
  velocity_linkedin: InputMaybe<Scalars['String']>;
  velocity_token: InputMaybe<Scalars['String']>;
  website: InputMaybe<Scalars['String']>;
  white_paper: InputMaybe<Scalars['String']>;
  year_founded: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Companies_Max_Fields = {
  __typename?: 'companies_max_fields';
  careers_page: Maybe<Scalars['String']>;
  coins: Maybe<Scalars['String']>;
  company_linkedin: Maybe<Scalars['String']>;
  external_id: Maybe<Scalars['String']>;
  github: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  investor_amount: Maybe<Scalars['String']>;
  layer: Maybe<Scalars['String']>;
  layer_detail: Maybe<Scalars['String']>;
  market_verified: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  notes: Maybe<Scalars['String']>;
  overview: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  total_employees: Maybe<Scalars['numeric']>;
  total_valuation: Maybe<Scalars['String']>;
  velocity_linkedin: Maybe<Scalars['String']>;
  velocity_token: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
  white_paper: Maybe<Scalars['String']>;
  year_founded: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Companies_Min_Fields = {
  __typename?: 'companies_min_fields';
  careers_page: Maybe<Scalars['String']>;
  coins: Maybe<Scalars['String']>;
  company_linkedin: Maybe<Scalars['String']>;
  external_id: Maybe<Scalars['String']>;
  github: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  investor_amount: Maybe<Scalars['String']>;
  layer: Maybe<Scalars['String']>;
  layer_detail: Maybe<Scalars['String']>;
  market_verified: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  notes: Maybe<Scalars['String']>;
  overview: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  total_employees: Maybe<Scalars['numeric']>;
  total_valuation: Maybe<Scalars['String']>;
  velocity_linkedin: Maybe<Scalars['String']>;
  velocity_token: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
  white_paper: Maybe<Scalars['String']>;
  year_founded: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "companies" */
export type Companies_Mutation_Response = {
  __typename?: 'companies_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Companies>;
};

/** input type for inserting object relation for remote table "companies" */
export type Companies_Obj_Rel_Insert_Input = {
  data: Companies_Insert_Input;
  /** upsert condition */
  on_conflict: InputMaybe<Companies_On_Conflict>;
};

/** on_conflict condition type for table "companies" */
export type Companies_On_Conflict = {
  constraint: Companies_Constraint;
  update_columns: Array<Companies_Update_Column>;
  where: InputMaybe<Companies_Bool_Exp>;
};

/** Ordering options when selecting data from "companies". */
export type Companies_Order_By = {
  careers_page: InputMaybe<Order_By>;
  coins: InputMaybe<Order_By>;
  company_linkedin: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  github: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  investment_rounds_aggregate: InputMaybe<Investment_Rounds_Aggregate_Order_By>;
  investor_amount: InputMaybe<Order_By>;
  layer: InputMaybe<Order_By>;
  layer_detail: InputMaybe<Order_By>;
  logo: InputMaybe<Order_By>;
  market_verified: InputMaybe<Order_By>;
  name: InputMaybe<Order_By>;
  notes: InputMaybe<Order_By>;
  overview: InputMaybe<Order_By>;
  slug: InputMaybe<Order_By>;
  teamMembers_aggregate: InputMaybe<Team_Members_Aggregate_Order_By>;
  total_employees: InputMaybe<Order_By>;
  total_valuation: InputMaybe<Order_By>;
  velocity_linkedin: InputMaybe<Order_By>;
  velocity_token: InputMaybe<Order_By>;
  website: InputMaybe<Order_By>;
  white_paper: InputMaybe<Order_By>;
  year_founded: InputMaybe<Order_By>;
};

/** primary key columns input for table: companies */
export type Companies_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Companies_Prepend_Input = {
  logo: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "companies" */
export enum Companies_Select_Column {
  /** column name */
  CareersPage = 'careers_page',
  /** column name */
  Coins = 'coins',
  /** column name */
  CompanyLinkedin = 'company_linkedin',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Github = 'github',
  /** column name */
  Id = 'id',
  /** column name */
  InvestorAmount = 'investor_amount',
  /** column name */
  Layer = 'layer',
  /** column name */
  LayerDetail = 'layer_detail',
  /** column name */
  Logo = 'logo',
  /** column name */
  MarketVerified = 'market_verified',
  /** column name */
  Name = 'name',
  /** column name */
  Notes = 'notes',
  /** column name */
  Overview = 'overview',
  /** column name */
  Slug = 'slug',
  /** column name */
  TotalEmployees = 'total_employees',
  /** column name */
  TotalValuation = 'total_valuation',
  /** column name */
  VelocityLinkedin = 'velocity_linkedin',
  /** column name */
  VelocityToken = 'velocity_token',
  /** column name */
  Website = 'website',
  /** column name */
  WhitePaper = 'white_paper',
  /** column name */
  YearFounded = 'year_founded'
}

/** input type for updating data in table "companies" */
export type Companies_Set_Input = {
  careers_page: InputMaybe<Scalars['String']>;
  coins: InputMaybe<Scalars['String']>;
  company_linkedin: InputMaybe<Scalars['String']>;
  external_id: InputMaybe<Scalars['String']>;
  github: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  investor_amount: InputMaybe<Scalars['String']>;
  layer: InputMaybe<Scalars['String']>;
  layer_detail: InputMaybe<Scalars['String']>;
  logo: InputMaybe<Scalars['jsonb']>;
  market_verified: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  notes: InputMaybe<Scalars['String']>;
  overview: InputMaybe<Scalars['String']>;
  slug: InputMaybe<Scalars['String']>;
  total_employees: InputMaybe<Scalars['numeric']>;
  total_valuation: InputMaybe<Scalars['String']>;
  velocity_linkedin: InputMaybe<Scalars['String']>;
  velocity_token: InputMaybe<Scalars['String']>;
  website: InputMaybe<Scalars['String']>;
  white_paper: InputMaybe<Scalars['String']>;
  year_founded: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Companies_Stddev_Fields = {
  __typename?: 'companies_stddev_fields';
  id: Maybe<Scalars['Float']>;
  total_employees: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Companies_Stddev_Pop_Fields = {
  __typename?: 'companies_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
  total_employees: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Companies_Stddev_Samp_Fields = {
  __typename?: 'companies_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
  total_employees: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Companies_Sum_Fields = {
  __typename?: 'companies_sum_fields';
  id: Maybe<Scalars['Int']>;
  total_employees: Maybe<Scalars['numeric']>;
};

/** update columns of table "companies" */
export enum Companies_Update_Column {
  /** column name */
  CareersPage = 'careers_page',
  /** column name */
  Coins = 'coins',
  /** column name */
  CompanyLinkedin = 'company_linkedin',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Github = 'github',
  /** column name */
  Id = 'id',
  /** column name */
  InvestorAmount = 'investor_amount',
  /** column name */
  Layer = 'layer',
  /** column name */
  LayerDetail = 'layer_detail',
  /** column name */
  Logo = 'logo',
  /** column name */
  MarketVerified = 'market_verified',
  /** column name */
  Name = 'name',
  /** column name */
  Notes = 'notes',
  /** column name */
  Overview = 'overview',
  /** column name */
  Slug = 'slug',
  /** column name */
  TotalEmployees = 'total_employees',
  /** column name */
  TotalValuation = 'total_valuation',
  /** column name */
  VelocityLinkedin = 'velocity_linkedin',
  /** column name */
  VelocityToken = 'velocity_token',
  /** column name */
  Website = 'website',
  /** column name */
  WhitePaper = 'white_paper',
  /** column name */
  YearFounded = 'year_founded'
}

/** aggregate var_pop on columns */
export type Companies_Var_Pop_Fields = {
  __typename?: 'companies_var_pop_fields';
  id: Maybe<Scalars['Float']>;
  total_employees: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Companies_Var_Samp_Fields = {
  __typename?: 'companies_var_samp_fields';
  id: Maybe<Scalars['Float']>;
  total_employees: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Companies_Variance_Fields = {
  __typename?: 'companies_variance_fields';
  id: Maybe<Scalars['Float']>;
  total_employees: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq: InputMaybe<Scalars['date']>;
  _gt: InputMaybe<Scalars['date']>;
  _gte: InputMaybe<Scalars['date']>;
  _in: InputMaybe<Array<Scalars['date']>>;
  _is_null: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['date']>;
  _lte: InputMaybe<Scalars['date']>;
  _neq: InputMaybe<Scalars['date']>;
  _nin: InputMaybe<Array<Scalars['date']>>;
};

/** columns and relationships of "investment_rounds" */
export type Investment_Rounds = {
  __typename?: 'investment_rounds';
  amount: Maybe<Scalars['numeric']>;
  /** An object relationship */
  company: Maybe<Companies>;
  company_id: Maybe<Scalars['Int']>;
  external_id: Scalars['String'];
  id: Scalars['Int'];
  /** An array relationship */
  investments: Array<Investments>;
  /** An aggregate relationship */
  investments_aggregate: Investments_Aggregate;
  round: Maybe<Scalars['String']>;
  round_date: Maybe<Scalars['String']>;
  valuation: Maybe<Scalars['numeric']>;
};


/** columns and relationships of "investment_rounds" */
export type Investment_RoundsInvestmentsArgs = {
  distinct_on: InputMaybe<Array<Investments_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investments_Order_By>>;
  where: InputMaybe<Investments_Bool_Exp>;
};


/** columns and relationships of "investment_rounds" */
export type Investment_RoundsInvestments_AggregateArgs = {
  distinct_on: InputMaybe<Array<Investments_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investments_Order_By>>;
  where: InputMaybe<Investments_Bool_Exp>;
};

/** aggregated selection of "investment_rounds" */
export type Investment_Rounds_Aggregate = {
  __typename?: 'investment_rounds_aggregate';
  aggregate: Maybe<Investment_Rounds_Aggregate_Fields>;
  nodes: Array<Investment_Rounds>;
};

/** aggregate fields of "investment_rounds" */
export type Investment_Rounds_Aggregate_Fields = {
  __typename?: 'investment_rounds_aggregate_fields';
  avg: Maybe<Investment_Rounds_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Investment_Rounds_Max_Fields>;
  min: Maybe<Investment_Rounds_Min_Fields>;
  stddev: Maybe<Investment_Rounds_Stddev_Fields>;
  stddev_pop: Maybe<Investment_Rounds_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Investment_Rounds_Stddev_Samp_Fields>;
  sum: Maybe<Investment_Rounds_Sum_Fields>;
  var_pop: Maybe<Investment_Rounds_Var_Pop_Fields>;
  var_samp: Maybe<Investment_Rounds_Var_Samp_Fields>;
  variance: Maybe<Investment_Rounds_Variance_Fields>;
};


/** aggregate fields of "investment_rounds" */
export type Investment_Rounds_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Investment_Rounds_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "investment_rounds" */
export type Investment_Rounds_Aggregate_Order_By = {
  avg: InputMaybe<Investment_Rounds_Avg_Order_By>;
  count: InputMaybe<Order_By>;
  max: InputMaybe<Investment_Rounds_Max_Order_By>;
  min: InputMaybe<Investment_Rounds_Min_Order_By>;
  stddev: InputMaybe<Investment_Rounds_Stddev_Order_By>;
  stddev_pop: InputMaybe<Investment_Rounds_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Investment_Rounds_Stddev_Samp_Order_By>;
  sum: InputMaybe<Investment_Rounds_Sum_Order_By>;
  var_pop: InputMaybe<Investment_Rounds_Var_Pop_Order_By>;
  var_samp: InputMaybe<Investment_Rounds_Var_Samp_Order_By>;
  variance: InputMaybe<Investment_Rounds_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "investment_rounds" */
export type Investment_Rounds_Arr_Rel_Insert_Input = {
  data: Array<Investment_Rounds_Insert_Input>;
  /** upsert condition */
  on_conflict: InputMaybe<Investment_Rounds_On_Conflict>;
};

/** aggregate avg on columns */
export type Investment_Rounds_Avg_Fields = {
  __typename?: 'investment_rounds_avg_fields';
  amount: Maybe<Scalars['Float']>;
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  valuation: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "investment_rounds" */
export type Investment_Rounds_Avg_Order_By = {
  amount: InputMaybe<Order_By>;
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  valuation: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "investment_rounds". All fields are combined with a logical 'AND'. */
export type Investment_Rounds_Bool_Exp = {
  _and: InputMaybe<Array<Investment_Rounds_Bool_Exp>>;
  _not: InputMaybe<Investment_Rounds_Bool_Exp>;
  _or: InputMaybe<Array<Investment_Rounds_Bool_Exp>>;
  amount: InputMaybe<Numeric_Comparison_Exp>;
  company: InputMaybe<Companies_Bool_Exp>;
  company_id: InputMaybe<Int_Comparison_Exp>;
  external_id: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  investments: InputMaybe<Investments_Bool_Exp>;
  round: InputMaybe<String_Comparison_Exp>;
  round_date: InputMaybe<String_Comparison_Exp>;
  valuation: InputMaybe<Numeric_Comparison_Exp>;
};

/** unique or primary key constraints on table "investment_rounds" */
export enum Investment_Rounds_Constraint {
  /** unique or primary key constraint */
  InvestmentRoundsExternalIdKey = 'investment_rounds_external_id_key',
  /** unique or primary key constraint */
  InvestmentRoundsPkey = 'investment_rounds_pkey'
}

/** input type for incrementing numeric columns in table "investment_rounds" */
export type Investment_Rounds_Inc_Input = {
  amount: InputMaybe<Scalars['numeric']>;
  company_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  valuation: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "investment_rounds" */
export type Investment_Rounds_Insert_Input = {
  amount: InputMaybe<Scalars['numeric']>;
  company: InputMaybe<Companies_Obj_Rel_Insert_Input>;
  company_id: InputMaybe<Scalars['Int']>;
  external_id: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  investments: InputMaybe<Investments_Arr_Rel_Insert_Input>;
  round: InputMaybe<Scalars['String']>;
  round_date: InputMaybe<Scalars['String']>;
  valuation: InputMaybe<Scalars['numeric']>;
};

/** aggregate max on columns */
export type Investment_Rounds_Max_Fields = {
  __typename?: 'investment_rounds_max_fields';
  amount: Maybe<Scalars['numeric']>;
  company_id: Maybe<Scalars['Int']>;
  external_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  round: Maybe<Scalars['String']>;
  round_date: Maybe<Scalars['String']>;
  valuation: Maybe<Scalars['numeric']>;
};

/** order by max() on columns of table "investment_rounds" */
export type Investment_Rounds_Max_Order_By = {
  amount: InputMaybe<Order_By>;
  company_id: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  round: InputMaybe<Order_By>;
  round_date: InputMaybe<Order_By>;
  valuation: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Investment_Rounds_Min_Fields = {
  __typename?: 'investment_rounds_min_fields';
  amount: Maybe<Scalars['numeric']>;
  company_id: Maybe<Scalars['Int']>;
  external_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  round: Maybe<Scalars['String']>;
  round_date: Maybe<Scalars['String']>;
  valuation: Maybe<Scalars['numeric']>;
};

/** order by min() on columns of table "investment_rounds" */
export type Investment_Rounds_Min_Order_By = {
  amount: InputMaybe<Order_By>;
  company_id: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  round: InputMaybe<Order_By>;
  round_date: InputMaybe<Order_By>;
  valuation: InputMaybe<Order_By>;
};

/** response of any mutation on the table "investment_rounds" */
export type Investment_Rounds_Mutation_Response = {
  __typename?: 'investment_rounds_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Investment_Rounds>;
};

/** input type for inserting object relation for remote table "investment_rounds" */
export type Investment_Rounds_Obj_Rel_Insert_Input = {
  data: Investment_Rounds_Insert_Input;
  /** upsert condition */
  on_conflict: InputMaybe<Investment_Rounds_On_Conflict>;
};

/** on_conflict condition type for table "investment_rounds" */
export type Investment_Rounds_On_Conflict = {
  constraint: Investment_Rounds_Constraint;
  update_columns: Array<Investment_Rounds_Update_Column>;
  where: InputMaybe<Investment_Rounds_Bool_Exp>;
};

/** Ordering options when selecting data from "investment_rounds". */
export type Investment_Rounds_Order_By = {
  amount: InputMaybe<Order_By>;
  company: InputMaybe<Companies_Order_By>;
  company_id: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  investments_aggregate: InputMaybe<Investments_Aggregate_Order_By>;
  round: InputMaybe<Order_By>;
  round_date: InputMaybe<Order_By>;
  valuation: InputMaybe<Order_By>;
};

/** primary key columns input for table: investment_rounds */
export type Investment_Rounds_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "investment_rounds" */
export enum Investment_Rounds_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CompanyId = 'company_id',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  Round = 'round',
  /** column name */
  RoundDate = 'round_date',
  /** column name */
  Valuation = 'valuation'
}

/** input type for updating data in table "investment_rounds" */
export type Investment_Rounds_Set_Input = {
  amount: InputMaybe<Scalars['numeric']>;
  company_id: InputMaybe<Scalars['Int']>;
  external_id: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  round: InputMaybe<Scalars['String']>;
  round_date: InputMaybe<Scalars['String']>;
  valuation: InputMaybe<Scalars['numeric']>;
};

/** aggregate stddev on columns */
export type Investment_Rounds_Stddev_Fields = {
  __typename?: 'investment_rounds_stddev_fields';
  amount: Maybe<Scalars['Float']>;
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  valuation: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "investment_rounds" */
export type Investment_Rounds_Stddev_Order_By = {
  amount: InputMaybe<Order_By>;
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  valuation: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Investment_Rounds_Stddev_Pop_Fields = {
  __typename?: 'investment_rounds_stddev_pop_fields';
  amount: Maybe<Scalars['Float']>;
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  valuation: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "investment_rounds" */
export type Investment_Rounds_Stddev_Pop_Order_By = {
  amount: InputMaybe<Order_By>;
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  valuation: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Investment_Rounds_Stddev_Samp_Fields = {
  __typename?: 'investment_rounds_stddev_samp_fields';
  amount: Maybe<Scalars['Float']>;
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  valuation: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "investment_rounds" */
export type Investment_Rounds_Stddev_Samp_Order_By = {
  amount: InputMaybe<Order_By>;
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  valuation: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Investment_Rounds_Sum_Fields = {
  __typename?: 'investment_rounds_sum_fields';
  amount: Maybe<Scalars['numeric']>;
  company_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  valuation: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "investment_rounds" */
export type Investment_Rounds_Sum_Order_By = {
  amount: InputMaybe<Order_By>;
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  valuation: InputMaybe<Order_By>;
};

/** update columns of table "investment_rounds" */
export enum Investment_Rounds_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CompanyId = 'company_id',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  Round = 'round',
  /** column name */
  RoundDate = 'round_date',
  /** column name */
  Valuation = 'valuation'
}

/** aggregate var_pop on columns */
export type Investment_Rounds_Var_Pop_Fields = {
  __typename?: 'investment_rounds_var_pop_fields';
  amount: Maybe<Scalars['Float']>;
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  valuation: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "investment_rounds" */
export type Investment_Rounds_Var_Pop_Order_By = {
  amount: InputMaybe<Order_By>;
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  valuation: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Investment_Rounds_Var_Samp_Fields = {
  __typename?: 'investment_rounds_var_samp_fields';
  amount: Maybe<Scalars['Float']>;
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  valuation: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "investment_rounds" */
export type Investment_Rounds_Var_Samp_Order_By = {
  amount: InputMaybe<Order_By>;
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  valuation: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Investment_Rounds_Variance_Fields = {
  __typename?: 'investment_rounds_variance_fields';
  amount: Maybe<Scalars['Float']>;
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  valuation: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "investment_rounds" */
export type Investment_Rounds_Variance_Order_By = {
  amount: InputMaybe<Order_By>;
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  valuation: InputMaybe<Order_By>;
};

/** columns and relationships of "investments" */
export type Investments = {
  __typename?: 'investments';
  external_id: Scalars['String'];
  id: Scalars['Int'];
  /** An object relationship */
  investment_round: Maybe<Investment_Rounds>;
  /** An object relationship */
  person: Maybe<People>;
  person_id: Maybe<Scalars['Int']>;
  round_id: Maybe<Scalars['Int']>;
  /** An object relationship */
  vc_firm: Maybe<Vc_Firms>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** aggregated selection of "investments" */
export type Investments_Aggregate = {
  __typename?: 'investments_aggregate';
  aggregate: Maybe<Investments_Aggregate_Fields>;
  nodes: Array<Investments>;
};

/** aggregate fields of "investments" */
export type Investments_Aggregate_Fields = {
  __typename?: 'investments_aggregate_fields';
  avg: Maybe<Investments_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Investments_Max_Fields>;
  min: Maybe<Investments_Min_Fields>;
  stddev: Maybe<Investments_Stddev_Fields>;
  stddev_pop: Maybe<Investments_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Investments_Stddev_Samp_Fields>;
  sum: Maybe<Investments_Sum_Fields>;
  var_pop: Maybe<Investments_Var_Pop_Fields>;
  var_samp: Maybe<Investments_Var_Samp_Fields>;
  variance: Maybe<Investments_Variance_Fields>;
};


/** aggregate fields of "investments" */
export type Investments_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Investments_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "investments" */
export type Investments_Aggregate_Order_By = {
  avg: InputMaybe<Investments_Avg_Order_By>;
  count: InputMaybe<Order_By>;
  max: InputMaybe<Investments_Max_Order_By>;
  min: InputMaybe<Investments_Min_Order_By>;
  stddev: InputMaybe<Investments_Stddev_Order_By>;
  stddev_pop: InputMaybe<Investments_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Investments_Stddev_Samp_Order_By>;
  sum: InputMaybe<Investments_Sum_Order_By>;
  var_pop: InputMaybe<Investments_Var_Pop_Order_By>;
  var_samp: InputMaybe<Investments_Var_Samp_Order_By>;
  variance: InputMaybe<Investments_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "investments" */
export type Investments_Arr_Rel_Insert_Input = {
  data: Array<Investments_Insert_Input>;
  /** upsert condition */
  on_conflict: InputMaybe<Investments_On_Conflict>;
};

/** aggregate avg on columns */
export type Investments_Avg_Fields = {
  __typename?: 'investments_avg_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  round_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "investments" */
export type Investments_Avg_Order_By = {
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "investments". All fields are combined with a logical 'AND'. */
export type Investments_Bool_Exp = {
  _and: InputMaybe<Array<Investments_Bool_Exp>>;
  _not: InputMaybe<Investments_Bool_Exp>;
  _or: InputMaybe<Array<Investments_Bool_Exp>>;
  external_id: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  investment_round: InputMaybe<Investment_Rounds_Bool_Exp>;
  person: InputMaybe<People_Bool_Exp>;
  person_id: InputMaybe<Int_Comparison_Exp>;
  round_id: InputMaybe<Int_Comparison_Exp>;
  vc_firm: InputMaybe<Vc_Firms_Bool_Exp>;
  vc_firm_id: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "investments" */
export enum Investments_Constraint {
  /** unique or primary key constraint */
  InvestmentsExternalIdKey = 'investments_external_id_key',
  /** unique or primary key constraint */
  InvestmentsPkey = 'investments_pkey'
}

/** input type for incrementing numeric columns in table "investments" */
export type Investments_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
  person_id: InputMaybe<Scalars['Int']>;
  round_id: InputMaybe<Scalars['Int']>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "investments" */
export type Investments_Insert_Input = {
  external_id: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  investment_round: InputMaybe<Investment_Rounds_Obj_Rel_Insert_Input>;
  person: InputMaybe<People_Obj_Rel_Insert_Input>;
  person_id: InputMaybe<Scalars['Int']>;
  round_id: InputMaybe<Scalars['Int']>;
  vc_firm: InputMaybe<Vc_Firms_Obj_Rel_Insert_Input>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Investments_Max_Fields = {
  __typename?: 'investments_max_fields';
  external_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  round_id: Maybe<Scalars['Int']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "investments" */
export type Investments_Max_Order_By = {
  external_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Investments_Min_Fields = {
  __typename?: 'investments_min_fields';
  external_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  round_id: Maybe<Scalars['Int']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "investments" */
export type Investments_Min_Order_By = {
  external_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** response of any mutation on the table "investments" */
export type Investments_Mutation_Response = {
  __typename?: 'investments_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Investments>;
};

/** on_conflict condition type for table "investments" */
export type Investments_On_Conflict = {
  constraint: Investments_Constraint;
  update_columns: Array<Investments_Update_Column>;
  where: InputMaybe<Investments_Bool_Exp>;
};

/** Ordering options when selecting data from "investments". */
export type Investments_Order_By = {
  external_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  investment_round: InputMaybe<Investment_Rounds_Order_By>;
  person: InputMaybe<People_Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm: InputMaybe<Vc_Firms_Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** primary key columns input for table: investments */
export type Investments_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "investments" */
export enum Investments_Select_Column {
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  PersonId = 'person_id',
  /** column name */
  RoundId = 'round_id',
  /** column name */
  VcFirmId = 'vc_firm_id'
}

/** input type for updating data in table "investments" */
export type Investments_Set_Input = {
  external_id: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  person_id: InputMaybe<Scalars['Int']>;
  round_id: InputMaybe<Scalars['Int']>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Investments_Stddev_Fields = {
  __typename?: 'investments_stddev_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  round_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "investments" */
export type Investments_Stddev_Order_By = {
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Investments_Stddev_Pop_Fields = {
  __typename?: 'investments_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  round_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "investments" */
export type Investments_Stddev_Pop_Order_By = {
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Investments_Stddev_Samp_Fields = {
  __typename?: 'investments_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  round_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "investments" */
export type Investments_Stddev_Samp_Order_By = {
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Investments_Sum_Fields = {
  __typename?: 'investments_sum_fields';
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  round_id: Maybe<Scalars['Int']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "investments" */
export type Investments_Sum_Order_By = {
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** update columns of table "investments" */
export enum Investments_Update_Column {
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  PersonId = 'person_id',
  /** column name */
  RoundId = 'round_id',
  /** column name */
  VcFirmId = 'vc_firm_id'
}

/** aggregate var_pop on columns */
export type Investments_Var_Pop_Fields = {
  __typename?: 'investments_var_pop_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  round_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "investments" */
export type Investments_Var_Pop_Order_By = {
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Investments_Var_Samp_Fields = {
  __typename?: 'investments_var_samp_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  round_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "investments" */
export type Investments_Var_Samp_Order_By = {
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Investments_Variance_Fields = {
  __typename?: 'investments_variance_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  round_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "investments" */
export type Investments_Variance_Order_By = {
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** columns and relationships of "investors" */
export type Investors = {
  __typename?: 'investors';
  end_date: Maybe<Scalars['numeric']>;
  external_id: Scalars['String'];
  function: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object relationship */
  person: Maybe<People>;
  person_id: Maybe<Scalars['Int']>;
  seniority: Maybe<Scalars['String']>;
  start_date: Maybe<Scalars['numeric']>;
  title: Maybe<Scalars['String']>;
  /** An object relationship */
  vc_firm: Maybe<Vc_Firms>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** aggregated selection of "investors" */
export type Investors_Aggregate = {
  __typename?: 'investors_aggregate';
  aggregate: Maybe<Investors_Aggregate_Fields>;
  nodes: Array<Investors>;
};

/** aggregate fields of "investors" */
export type Investors_Aggregate_Fields = {
  __typename?: 'investors_aggregate_fields';
  avg: Maybe<Investors_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Investors_Max_Fields>;
  min: Maybe<Investors_Min_Fields>;
  stddev: Maybe<Investors_Stddev_Fields>;
  stddev_pop: Maybe<Investors_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Investors_Stddev_Samp_Fields>;
  sum: Maybe<Investors_Sum_Fields>;
  var_pop: Maybe<Investors_Var_Pop_Fields>;
  var_samp: Maybe<Investors_Var_Samp_Fields>;
  variance: Maybe<Investors_Variance_Fields>;
};


/** aggregate fields of "investors" */
export type Investors_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Investors_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "investors" */
export type Investors_Aggregate_Order_By = {
  avg: InputMaybe<Investors_Avg_Order_By>;
  count: InputMaybe<Order_By>;
  max: InputMaybe<Investors_Max_Order_By>;
  min: InputMaybe<Investors_Min_Order_By>;
  stddev: InputMaybe<Investors_Stddev_Order_By>;
  stddev_pop: InputMaybe<Investors_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Investors_Stddev_Samp_Order_By>;
  sum: InputMaybe<Investors_Sum_Order_By>;
  var_pop: InputMaybe<Investors_Var_Pop_Order_By>;
  var_samp: InputMaybe<Investors_Var_Samp_Order_By>;
  variance: InputMaybe<Investors_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "investors" */
export type Investors_Arr_Rel_Insert_Input = {
  data: Array<Investors_Insert_Input>;
  /** upsert condition */
  on_conflict: InputMaybe<Investors_On_Conflict>;
};

/** aggregate avg on columns */
export type Investors_Avg_Fields = {
  __typename?: 'investors_avg_fields';
  end_date: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  start_date: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "investors" */
export type Investors_Avg_Order_By = {
  end_date: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "investors". All fields are combined with a logical 'AND'. */
export type Investors_Bool_Exp = {
  _and: InputMaybe<Array<Investors_Bool_Exp>>;
  _not: InputMaybe<Investors_Bool_Exp>;
  _or: InputMaybe<Array<Investors_Bool_Exp>>;
  end_date: InputMaybe<Numeric_Comparison_Exp>;
  external_id: InputMaybe<String_Comparison_Exp>;
  function: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  person: InputMaybe<People_Bool_Exp>;
  person_id: InputMaybe<Int_Comparison_Exp>;
  seniority: InputMaybe<String_Comparison_Exp>;
  start_date: InputMaybe<Numeric_Comparison_Exp>;
  title: InputMaybe<String_Comparison_Exp>;
  vc_firm: InputMaybe<Vc_Firms_Bool_Exp>;
  vc_firm_id: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "investors" */
export enum Investors_Constraint {
  /** unique or primary key constraint */
  InvestorsExternalIdKey = 'investors_external_id_key',
  /** unique or primary key constraint */
  InvestorsPkey = 'investors_pkey'
}

/** input type for incrementing numeric columns in table "investors" */
export type Investors_Inc_Input = {
  end_date: InputMaybe<Scalars['numeric']>;
  id: InputMaybe<Scalars['Int']>;
  person_id: InputMaybe<Scalars['Int']>;
  start_date: InputMaybe<Scalars['numeric']>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "investors" */
export type Investors_Insert_Input = {
  end_date: InputMaybe<Scalars['numeric']>;
  external_id: InputMaybe<Scalars['String']>;
  function: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  person: InputMaybe<People_Obj_Rel_Insert_Input>;
  person_id: InputMaybe<Scalars['Int']>;
  seniority: InputMaybe<Scalars['String']>;
  start_date: InputMaybe<Scalars['numeric']>;
  title: InputMaybe<Scalars['String']>;
  vc_firm: InputMaybe<Vc_Firms_Obj_Rel_Insert_Input>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Investors_Max_Fields = {
  __typename?: 'investors_max_fields';
  end_date: Maybe<Scalars['numeric']>;
  external_id: Maybe<Scalars['String']>;
  function: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  seniority: Maybe<Scalars['String']>;
  start_date: Maybe<Scalars['numeric']>;
  title: Maybe<Scalars['String']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "investors" */
export type Investors_Max_Order_By = {
  end_date: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  function: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  seniority: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  title: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Investors_Min_Fields = {
  __typename?: 'investors_min_fields';
  end_date: Maybe<Scalars['numeric']>;
  external_id: Maybe<Scalars['String']>;
  function: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  seniority: Maybe<Scalars['String']>;
  start_date: Maybe<Scalars['numeric']>;
  title: Maybe<Scalars['String']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "investors" */
export type Investors_Min_Order_By = {
  end_date: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  function: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  seniority: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  title: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** response of any mutation on the table "investors" */
export type Investors_Mutation_Response = {
  __typename?: 'investors_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Investors>;
};

/** on_conflict condition type for table "investors" */
export type Investors_On_Conflict = {
  constraint: Investors_Constraint;
  update_columns: Array<Investors_Update_Column>;
  where: InputMaybe<Investors_Bool_Exp>;
};

/** Ordering options when selecting data from "investors". */
export type Investors_Order_By = {
  end_date: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  function: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person: InputMaybe<People_Order_By>;
  person_id: InputMaybe<Order_By>;
  seniority: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  title: InputMaybe<Order_By>;
  vc_firm: InputMaybe<Vc_Firms_Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** primary key columns input for table: investors */
export type Investors_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "investors" */
export enum Investors_Select_Column {
  /** column name */
  EndDate = 'end_date',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Function = 'function',
  /** column name */
  Id = 'id',
  /** column name */
  PersonId = 'person_id',
  /** column name */
  Seniority = 'seniority',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  Title = 'title',
  /** column name */
  VcFirmId = 'vc_firm_id'
}

/** input type for updating data in table "investors" */
export type Investors_Set_Input = {
  end_date: InputMaybe<Scalars['numeric']>;
  external_id: InputMaybe<Scalars['String']>;
  function: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  person_id: InputMaybe<Scalars['Int']>;
  seniority: InputMaybe<Scalars['String']>;
  start_date: InputMaybe<Scalars['numeric']>;
  title: InputMaybe<Scalars['String']>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Investors_Stddev_Fields = {
  __typename?: 'investors_stddev_fields';
  end_date: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  start_date: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "investors" */
export type Investors_Stddev_Order_By = {
  end_date: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Investors_Stddev_Pop_Fields = {
  __typename?: 'investors_stddev_pop_fields';
  end_date: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  start_date: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "investors" */
export type Investors_Stddev_Pop_Order_By = {
  end_date: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Investors_Stddev_Samp_Fields = {
  __typename?: 'investors_stddev_samp_fields';
  end_date: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  start_date: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "investors" */
export type Investors_Stddev_Samp_Order_By = {
  end_date: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Investors_Sum_Fields = {
  __typename?: 'investors_sum_fields';
  end_date: Maybe<Scalars['numeric']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  start_date: Maybe<Scalars['numeric']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "investors" */
export type Investors_Sum_Order_By = {
  end_date: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** update columns of table "investors" */
export enum Investors_Update_Column {
  /** column name */
  EndDate = 'end_date',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Function = 'function',
  /** column name */
  Id = 'id',
  /** column name */
  PersonId = 'person_id',
  /** column name */
  Seniority = 'seniority',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  Title = 'title',
  /** column name */
  VcFirmId = 'vc_firm_id'
}

/** aggregate var_pop on columns */
export type Investors_Var_Pop_Fields = {
  __typename?: 'investors_var_pop_fields';
  end_date: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  start_date: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "investors" */
export type Investors_Var_Pop_Order_By = {
  end_date: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Investors_Var_Samp_Fields = {
  __typename?: 'investors_var_samp_fields';
  end_date: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  start_date: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "investors" */
export type Investors_Var_Samp_Order_By = {
  end_date: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Investors_Variance_Fields = {
  __typename?: 'investors_variance_fields';
  end_date: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  start_date: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "investors" */
export type Investors_Variance_Order_By = {
  end_date: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

export type Jsonb_Cast_Exp = {
  String: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains: InputMaybe<Scalars['jsonb']>;
  _eq: InputMaybe<Scalars['jsonb']>;
  _gt: InputMaybe<Scalars['jsonb']>;
  _gte: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any: InputMaybe<Array<Scalars['String']>>;
  _in: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['jsonb']>;
  _lte: InputMaybe<Scalars['jsonb']>;
  _neq: InputMaybe<Scalars['jsonb']>;
  _nin: InputMaybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "companies" */
  delete_companies: Maybe<Companies_Mutation_Response>;
  /** delete single row from the table: "companies" */
  delete_companies_by_pk: Maybe<Companies>;
  /** delete data from the table: "investment_rounds" */
  delete_investment_rounds: Maybe<Investment_Rounds_Mutation_Response>;
  /** delete single row from the table: "investment_rounds" */
  delete_investment_rounds_by_pk: Maybe<Investment_Rounds>;
  /** delete data from the table: "investments" */
  delete_investments: Maybe<Investments_Mutation_Response>;
  /** delete single row from the table: "investments" */
  delete_investments_by_pk: Maybe<Investments>;
  /** delete data from the table: "investors" */
  delete_investors: Maybe<Investors_Mutation_Response>;
  /** delete single row from the table: "investors" */
  delete_investors_by_pk: Maybe<Investors>;
  /** delete data from the table: "people" */
  delete_people: Maybe<People_Mutation_Response>;
  /** delete single row from the table: "people" */
  delete_people_by_pk: Maybe<People>;
  /** delete data from the table: "team_members" */
  delete_team_members: Maybe<Team_Members_Mutation_Response>;
  /** delete single row from the table: "team_members" */
  delete_team_members_by_pk: Maybe<Team_Members>;
  /** delete data from the table: "vc_firms" */
  delete_vc_firms: Maybe<Vc_Firms_Mutation_Response>;
  /** delete single row from the table: "vc_firms" */
  delete_vc_firms_by_pk: Maybe<Vc_Firms>;
  /** insert data into the table: "companies" */
  insert_companies: Maybe<Companies_Mutation_Response>;
  /** insert a single row into the table: "companies" */
  insert_companies_one: Maybe<Companies>;
  /** insert data into the table: "investment_rounds" */
  insert_investment_rounds: Maybe<Investment_Rounds_Mutation_Response>;
  /** insert a single row into the table: "investment_rounds" */
  insert_investment_rounds_one: Maybe<Investment_Rounds>;
  /** insert data into the table: "investments" */
  insert_investments: Maybe<Investments_Mutation_Response>;
  /** insert a single row into the table: "investments" */
  insert_investments_one: Maybe<Investments>;
  /** insert data into the table: "investors" */
  insert_investors: Maybe<Investors_Mutation_Response>;
  /** insert a single row into the table: "investors" */
  insert_investors_one: Maybe<Investors>;
  /** insert data into the table: "people" */
  insert_people: Maybe<People_Mutation_Response>;
  /** insert a single row into the table: "people" */
  insert_people_one: Maybe<People>;
  /** insert data into the table: "team_members" */
  insert_team_members: Maybe<Team_Members_Mutation_Response>;
  /** insert a single row into the table: "team_members" */
  insert_team_members_one: Maybe<Team_Members>;
  /** insert data into the table: "vc_firms" */
  insert_vc_firms: Maybe<Vc_Firms_Mutation_Response>;
  /** insert a single row into the table: "vc_firms" */
  insert_vc_firms_one: Maybe<Vc_Firms>;
  /** update data of the table: "companies" */
  update_companies: Maybe<Companies_Mutation_Response>;
  /** update single row of the table: "companies" */
  update_companies_by_pk: Maybe<Companies>;
  /** update data of the table: "investment_rounds" */
  update_investment_rounds: Maybe<Investment_Rounds_Mutation_Response>;
  /** update single row of the table: "investment_rounds" */
  update_investment_rounds_by_pk: Maybe<Investment_Rounds>;
  /** update data of the table: "investments" */
  update_investments: Maybe<Investments_Mutation_Response>;
  /** update single row of the table: "investments" */
  update_investments_by_pk: Maybe<Investments>;
  /** update data of the table: "investors" */
  update_investors: Maybe<Investors_Mutation_Response>;
  /** update single row of the table: "investors" */
  update_investors_by_pk: Maybe<Investors>;
  /** update data of the table: "people" */
  update_people: Maybe<People_Mutation_Response>;
  /** update single row of the table: "people" */
  update_people_by_pk: Maybe<People>;
  /** update data of the table: "team_members" */
  update_team_members: Maybe<Team_Members_Mutation_Response>;
  /** update single row of the table: "team_members" */
  update_team_members_by_pk: Maybe<Team_Members>;
  /** update data of the table: "vc_firms" */
  update_vc_firms: Maybe<Vc_Firms_Mutation_Response>;
  /** update single row of the table: "vc_firms" */
  update_vc_firms_by_pk: Maybe<Vc_Firms>;
};


/** mutation root */
export type Mutation_RootDelete_CompaniesArgs = {
  where: Companies_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Companies_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Investment_RoundsArgs = {
  where: Investment_Rounds_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Investment_Rounds_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_InvestmentsArgs = {
  where: Investments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Investments_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_InvestorsArgs = {
  where: Investors_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Investors_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_PeopleArgs = {
  where: People_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_People_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Team_MembersArgs = {
  where: Team_Members_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Team_Members_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Vc_FirmsArgs = {
  where: Vc_Firms_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Vc_Firms_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_CompaniesArgs = {
  objects: Array<Companies_Insert_Input>;
  on_conflict: InputMaybe<Companies_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Companies_OneArgs = {
  object: Companies_Insert_Input;
  on_conflict: InputMaybe<Companies_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Investment_RoundsArgs = {
  objects: Array<Investment_Rounds_Insert_Input>;
  on_conflict: InputMaybe<Investment_Rounds_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Investment_Rounds_OneArgs = {
  object: Investment_Rounds_Insert_Input;
  on_conflict: InputMaybe<Investment_Rounds_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_InvestmentsArgs = {
  objects: Array<Investments_Insert_Input>;
  on_conflict: InputMaybe<Investments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Investments_OneArgs = {
  object: Investments_Insert_Input;
  on_conflict: InputMaybe<Investments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_InvestorsArgs = {
  objects: Array<Investors_Insert_Input>;
  on_conflict: InputMaybe<Investors_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Investors_OneArgs = {
  object: Investors_Insert_Input;
  on_conflict: InputMaybe<Investors_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PeopleArgs = {
  objects: Array<People_Insert_Input>;
  on_conflict: InputMaybe<People_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_People_OneArgs = {
  object: People_Insert_Input;
  on_conflict: InputMaybe<People_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Team_MembersArgs = {
  objects: Array<Team_Members_Insert_Input>;
  on_conflict: InputMaybe<Team_Members_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Team_Members_OneArgs = {
  object: Team_Members_Insert_Input;
  on_conflict: InputMaybe<Team_Members_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vc_FirmsArgs = {
  objects: Array<Vc_Firms_Insert_Input>;
  on_conflict: InputMaybe<Vc_Firms_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vc_Firms_OneArgs = {
  object: Vc_Firms_Insert_Input;
  on_conflict: InputMaybe<Vc_Firms_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_CompaniesArgs = {
  _append: InputMaybe<Companies_Append_Input>;
  _delete_at_path: InputMaybe<Companies_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Companies_Delete_Elem_Input>;
  _delete_key: InputMaybe<Companies_Delete_Key_Input>;
  _inc: InputMaybe<Companies_Inc_Input>;
  _prepend: InputMaybe<Companies_Prepend_Input>;
  _set: InputMaybe<Companies_Set_Input>;
  where: Companies_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Companies_By_PkArgs = {
  _append: InputMaybe<Companies_Append_Input>;
  _delete_at_path: InputMaybe<Companies_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Companies_Delete_Elem_Input>;
  _delete_key: InputMaybe<Companies_Delete_Key_Input>;
  _inc: InputMaybe<Companies_Inc_Input>;
  _prepend: InputMaybe<Companies_Prepend_Input>;
  _set: InputMaybe<Companies_Set_Input>;
  pk_columns: Companies_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Investment_RoundsArgs = {
  _inc: InputMaybe<Investment_Rounds_Inc_Input>;
  _set: InputMaybe<Investment_Rounds_Set_Input>;
  where: Investment_Rounds_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Investment_Rounds_By_PkArgs = {
  _inc: InputMaybe<Investment_Rounds_Inc_Input>;
  _set: InputMaybe<Investment_Rounds_Set_Input>;
  pk_columns: Investment_Rounds_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_InvestmentsArgs = {
  _inc: InputMaybe<Investments_Inc_Input>;
  _set: InputMaybe<Investments_Set_Input>;
  where: Investments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Investments_By_PkArgs = {
  _inc: InputMaybe<Investments_Inc_Input>;
  _set: InputMaybe<Investments_Set_Input>;
  pk_columns: Investments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_InvestorsArgs = {
  _inc: InputMaybe<Investors_Inc_Input>;
  _set: InputMaybe<Investors_Set_Input>;
  where: Investors_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Investors_By_PkArgs = {
  _inc: InputMaybe<Investors_Inc_Input>;
  _set: InputMaybe<Investors_Set_Input>;
  pk_columns: Investors_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PeopleArgs = {
  _append: InputMaybe<People_Append_Input>;
  _delete_at_path: InputMaybe<People_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<People_Delete_Elem_Input>;
  _delete_key: InputMaybe<People_Delete_Key_Input>;
  _inc: InputMaybe<People_Inc_Input>;
  _prepend: InputMaybe<People_Prepend_Input>;
  _set: InputMaybe<People_Set_Input>;
  where: People_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_People_By_PkArgs = {
  _append: InputMaybe<People_Append_Input>;
  _delete_at_path: InputMaybe<People_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<People_Delete_Elem_Input>;
  _delete_key: InputMaybe<People_Delete_Key_Input>;
  _inc: InputMaybe<People_Inc_Input>;
  _prepend: InputMaybe<People_Prepend_Input>;
  _set: InputMaybe<People_Set_Input>;
  pk_columns: People_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Team_MembersArgs = {
  _inc: InputMaybe<Team_Members_Inc_Input>;
  _set: InputMaybe<Team_Members_Set_Input>;
  where: Team_Members_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Team_Members_By_PkArgs = {
  _inc: InputMaybe<Team_Members_Inc_Input>;
  _set: InputMaybe<Team_Members_Set_Input>;
  pk_columns: Team_Members_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Vc_FirmsArgs = {
  _append: InputMaybe<Vc_Firms_Append_Input>;
  _delete_at_path: InputMaybe<Vc_Firms_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Vc_Firms_Delete_Elem_Input>;
  _delete_key: InputMaybe<Vc_Firms_Delete_Key_Input>;
  _inc: InputMaybe<Vc_Firms_Inc_Input>;
  _prepend: InputMaybe<Vc_Firms_Prepend_Input>;
  _set: InputMaybe<Vc_Firms_Set_Input>;
  where: Vc_Firms_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vc_Firms_By_PkArgs = {
  _append: InputMaybe<Vc_Firms_Append_Input>;
  _delete_at_path: InputMaybe<Vc_Firms_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Vc_Firms_Delete_Elem_Input>;
  _delete_key: InputMaybe<Vc_Firms_Delete_Key_Input>;
  _inc: InputMaybe<Vc_Firms_Inc_Input>;
  _prepend: InputMaybe<Vc_Firms_Prepend_Input>;
  _set: InputMaybe<Vc_Firms_Set_Input>;
  pk_columns: Vc_Firms_Pk_Columns_Input;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq: InputMaybe<Scalars['numeric']>;
  _gt: InputMaybe<Scalars['numeric']>;
  _gte: InputMaybe<Scalars['numeric']>;
  _in: InputMaybe<Array<Scalars['numeric']>>;
  _is_null: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['numeric']>;
  _lte: InputMaybe<Scalars['numeric']>;
  _neq: InputMaybe<Scalars['numeric']>;
  _nin: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "people" */
export type People = {
  __typename?: 'people';
  external_id: Scalars['String'];
  github: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An array relationship */
  investments: Array<Investments>;
  /** An aggregate relationship */
  investments_aggregate: Investments_Aggregate;
  /** An array relationship */
  investors: Array<Investors>;
  /** An aggregate relationship */
  investors_aggregate: Investors_Aggregate;
  linkedin: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  personal_email: Maybe<Scalars['String']>;
  picture: Maybe<Scalars['jsonb']>;
  slug: Maybe<Scalars['String']>;
  /** An array relationship */
  team_members: Array<Team_Members>;
  /** An aggregate relationship */
  team_members_aggregate: Team_Members_Aggregate;
  type: Maybe<Scalars['String']>;
  work_email: Maybe<Scalars['String']>;
};


/** columns and relationships of "people" */
export type PeopleInvestmentsArgs = {
  distinct_on: InputMaybe<Array<Investments_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investments_Order_By>>;
  where: InputMaybe<Investments_Bool_Exp>;
};


/** columns and relationships of "people" */
export type PeopleInvestments_AggregateArgs = {
  distinct_on: InputMaybe<Array<Investments_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investments_Order_By>>;
  where: InputMaybe<Investments_Bool_Exp>;
};


/** columns and relationships of "people" */
export type PeopleInvestorsArgs = {
  distinct_on: InputMaybe<Array<Investors_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investors_Order_By>>;
  where: InputMaybe<Investors_Bool_Exp>;
};


/** columns and relationships of "people" */
export type PeopleInvestors_AggregateArgs = {
  distinct_on: InputMaybe<Array<Investors_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investors_Order_By>>;
  where: InputMaybe<Investors_Bool_Exp>;
};


/** columns and relationships of "people" */
export type PeoplePictureArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "people" */
export type PeopleTeam_MembersArgs = {
  distinct_on: InputMaybe<Array<Team_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Team_Members_Order_By>>;
  where: InputMaybe<Team_Members_Bool_Exp>;
};


/** columns and relationships of "people" */
export type PeopleTeam_Members_AggregateArgs = {
  distinct_on: InputMaybe<Array<Team_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Team_Members_Order_By>>;
  where: InputMaybe<Team_Members_Bool_Exp>;
};

/** aggregated selection of "people" */
export type People_Aggregate = {
  __typename?: 'people_aggregate';
  aggregate: Maybe<People_Aggregate_Fields>;
  nodes: Array<People>;
};

/** aggregate fields of "people" */
export type People_Aggregate_Fields = {
  __typename?: 'people_aggregate_fields';
  avg: Maybe<People_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<People_Max_Fields>;
  min: Maybe<People_Min_Fields>;
  stddev: Maybe<People_Stddev_Fields>;
  stddev_pop: Maybe<People_Stddev_Pop_Fields>;
  stddev_samp: Maybe<People_Stddev_Samp_Fields>;
  sum: Maybe<People_Sum_Fields>;
  var_pop: Maybe<People_Var_Pop_Fields>;
  var_samp: Maybe<People_Var_Samp_Fields>;
  variance: Maybe<People_Variance_Fields>;
};


/** aggregate fields of "people" */
export type People_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<People_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type People_Append_Input = {
  picture: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type People_Avg_Fields = {
  __typename?: 'people_avg_fields';
  id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "people". All fields are combined with a logical 'AND'. */
export type People_Bool_Exp = {
  _and: InputMaybe<Array<People_Bool_Exp>>;
  _not: InputMaybe<People_Bool_Exp>;
  _or: InputMaybe<Array<People_Bool_Exp>>;
  external_id: InputMaybe<String_Comparison_Exp>;
  github: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  investments: InputMaybe<Investments_Bool_Exp>;
  investors: InputMaybe<Investors_Bool_Exp>;
  linkedin: InputMaybe<String_Comparison_Exp>;
  name: InputMaybe<String_Comparison_Exp>;
  personal_email: InputMaybe<String_Comparison_Exp>;
  picture: InputMaybe<Jsonb_Comparison_Exp>;
  slug: InputMaybe<String_Comparison_Exp>;
  team_members: InputMaybe<Team_Members_Bool_Exp>;
  type: InputMaybe<String_Comparison_Exp>;
  work_email: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "people" */
export enum People_Constraint {
  /** unique or primary key constraint */
  PeopleExternalIdKey = 'people_external_id_key',
  /** unique or primary key constraint */
  PeoplePkey = 'people_pkey',
  /** unique or primary key constraint */
  PeopleSlugKey = 'people_slug_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type People_Delete_At_Path_Input = {
  picture: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type People_Delete_Elem_Input = {
  picture: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type People_Delete_Key_Input = {
  picture: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "people" */
export type People_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "people" */
export type People_Insert_Input = {
  external_id: InputMaybe<Scalars['String']>;
  github: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  investments: InputMaybe<Investments_Arr_Rel_Insert_Input>;
  investors: InputMaybe<Investors_Arr_Rel_Insert_Input>;
  linkedin: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  personal_email: InputMaybe<Scalars['String']>;
  picture: InputMaybe<Scalars['jsonb']>;
  slug: InputMaybe<Scalars['String']>;
  team_members: InputMaybe<Team_Members_Arr_Rel_Insert_Input>;
  type: InputMaybe<Scalars['String']>;
  work_email: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type People_Max_Fields = {
  __typename?: 'people_max_fields';
  external_id: Maybe<Scalars['String']>;
  github: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  linkedin: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  personal_email: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  work_email: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type People_Min_Fields = {
  __typename?: 'people_min_fields';
  external_id: Maybe<Scalars['String']>;
  github: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  linkedin: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  personal_email: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  work_email: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "people" */
export type People_Mutation_Response = {
  __typename?: 'people_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<People>;
};

/** input type for inserting object relation for remote table "people" */
export type People_Obj_Rel_Insert_Input = {
  data: People_Insert_Input;
  /** upsert condition */
  on_conflict: InputMaybe<People_On_Conflict>;
};

/** on_conflict condition type for table "people" */
export type People_On_Conflict = {
  constraint: People_Constraint;
  update_columns: Array<People_Update_Column>;
  where: InputMaybe<People_Bool_Exp>;
};

/** Ordering options when selecting data from "people". */
export type People_Order_By = {
  external_id: InputMaybe<Order_By>;
  github: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  investments_aggregate: InputMaybe<Investments_Aggregate_Order_By>;
  investors_aggregate: InputMaybe<Investors_Aggregate_Order_By>;
  linkedin: InputMaybe<Order_By>;
  name: InputMaybe<Order_By>;
  personal_email: InputMaybe<Order_By>;
  picture: InputMaybe<Order_By>;
  slug: InputMaybe<Order_By>;
  team_members_aggregate: InputMaybe<Team_Members_Aggregate_Order_By>;
  type: InputMaybe<Order_By>;
  work_email: InputMaybe<Order_By>;
};

/** primary key columns input for table: people */
export type People_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type People_Prepend_Input = {
  picture: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "people" */
export enum People_Select_Column {
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Github = 'github',
  /** column name */
  Id = 'id',
  /** column name */
  Linkedin = 'linkedin',
  /** column name */
  Name = 'name',
  /** column name */
  PersonalEmail = 'personal_email',
  /** column name */
  Picture = 'picture',
  /** column name */
  Slug = 'slug',
  /** column name */
  Type = 'type',
  /** column name */
  WorkEmail = 'work_email'
}

/** input type for updating data in table "people" */
export type People_Set_Input = {
  external_id: InputMaybe<Scalars['String']>;
  github: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  linkedin: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  personal_email: InputMaybe<Scalars['String']>;
  picture: InputMaybe<Scalars['jsonb']>;
  slug: InputMaybe<Scalars['String']>;
  type: InputMaybe<Scalars['String']>;
  work_email: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type People_Stddev_Fields = {
  __typename?: 'people_stddev_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type People_Stddev_Pop_Fields = {
  __typename?: 'people_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type People_Stddev_Samp_Fields = {
  __typename?: 'people_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type People_Sum_Fields = {
  __typename?: 'people_sum_fields';
  id: Maybe<Scalars['Int']>;
};

/** update columns of table "people" */
export enum People_Update_Column {
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Github = 'github',
  /** column name */
  Id = 'id',
  /** column name */
  Linkedin = 'linkedin',
  /** column name */
  Name = 'name',
  /** column name */
  PersonalEmail = 'personal_email',
  /** column name */
  Picture = 'picture',
  /** column name */
  Slug = 'slug',
  /** column name */
  Type = 'type',
  /** column name */
  WorkEmail = 'work_email'
}

/** aggregate var_pop on columns */
export type People_Var_Pop_Fields = {
  __typename?: 'people_var_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type People_Var_Samp_Fields = {
  __typename?: 'people_var_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type People_Variance_Fields = {
  __typename?: 'people_variance_fields';
  id: Maybe<Scalars['Float']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "companies" */
  companies: Array<Companies>;
  /** fetch aggregated fields from the table: "companies" */
  companies_aggregate: Companies_Aggregate;
  /** fetch data from the table: "companies" using primary key columns */
  companies_by_pk: Maybe<Companies>;
  /** An array relationship */
  investment_rounds: Array<Investment_Rounds>;
  /** An aggregate relationship */
  investment_rounds_aggregate: Investment_Rounds_Aggregate;
  /** fetch data from the table: "investment_rounds" using primary key columns */
  investment_rounds_by_pk: Maybe<Investment_Rounds>;
  /** An array relationship */
  investments: Array<Investments>;
  /** An aggregate relationship */
  investments_aggregate: Investments_Aggregate;
  /** fetch data from the table: "investments" using primary key columns */
  investments_by_pk: Maybe<Investments>;
  /** An array relationship */
  investors: Array<Investors>;
  /** An aggregate relationship */
  investors_aggregate: Investors_Aggregate;
  /** fetch data from the table: "investors" using primary key columns */
  investors_by_pk: Maybe<Investors>;
  /** fetch data from the table: "people" */
  people: Array<People>;
  /** fetch aggregated fields from the table: "people" */
  people_aggregate: People_Aggregate;
  /** fetch data from the table: "people" using primary key columns */
  people_by_pk: Maybe<People>;
  /** An array relationship */
  team_members: Array<Team_Members>;
  /** An aggregate relationship */
  team_members_aggregate: Team_Members_Aggregate;
  /** fetch data from the table: "team_members" using primary key columns */
  team_members_by_pk: Maybe<Team_Members>;
  /** fetch data from the table: "vc_firms" */
  vc_firms: Array<Vc_Firms>;
  /** fetch aggregated fields from the table: "vc_firms" */
  vc_firms_aggregate: Vc_Firms_Aggregate;
  /** fetch data from the table: "vc_firms" using primary key columns */
  vc_firms_by_pk: Maybe<Vc_Firms>;
};


export type Query_RootCompaniesArgs = {
  distinct_on: InputMaybe<Array<Companies_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Companies_Order_By>>;
  where: InputMaybe<Companies_Bool_Exp>;
};


export type Query_RootCompanies_AggregateArgs = {
  distinct_on: InputMaybe<Array<Companies_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Companies_Order_By>>;
  where: InputMaybe<Companies_Bool_Exp>;
};


export type Query_RootCompanies_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootInvestment_RoundsArgs = {
  distinct_on: InputMaybe<Array<Investment_Rounds_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investment_Rounds_Order_By>>;
  where: InputMaybe<Investment_Rounds_Bool_Exp>;
};


export type Query_RootInvestment_Rounds_AggregateArgs = {
  distinct_on: InputMaybe<Array<Investment_Rounds_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investment_Rounds_Order_By>>;
  where: InputMaybe<Investment_Rounds_Bool_Exp>;
};


export type Query_RootInvestment_Rounds_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootInvestmentsArgs = {
  distinct_on: InputMaybe<Array<Investments_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investments_Order_By>>;
  where: InputMaybe<Investments_Bool_Exp>;
};


export type Query_RootInvestments_AggregateArgs = {
  distinct_on: InputMaybe<Array<Investments_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investments_Order_By>>;
  where: InputMaybe<Investments_Bool_Exp>;
};


export type Query_RootInvestments_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootInvestorsArgs = {
  distinct_on: InputMaybe<Array<Investors_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investors_Order_By>>;
  where: InputMaybe<Investors_Bool_Exp>;
};


export type Query_RootInvestors_AggregateArgs = {
  distinct_on: InputMaybe<Array<Investors_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investors_Order_By>>;
  where: InputMaybe<Investors_Bool_Exp>;
};


export type Query_RootInvestors_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootPeopleArgs = {
  distinct_on: InputMaybe<Array<People_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<People_Order_By>>;
  where: InputMaybe<People_Bool_Exp>;
};


export type Query_RootPeople_AggregateArgs = {
  distinct_on: InputMaybe<Array<People_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<People_Order_By>>;
  where: InputMaybe<People_Bool_Exp>;
};


export type Query_RootPeople_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootTeam_MembersArgs = {
  distinct_on: InputMaybe<Array<Team_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Team_Members_Order_By>>;
  where: InputMaybe<Team_Members_Bool_Exp>;
};


export type Query_RootTeam_Members_AggregateArgs = {
  distinct_on: InputMaybe<Array<Team_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Team_Members_Order_By>>;
  where: InputMaybe<Team_Members_Bool_Exp>;
};


export type Query_RootTeam_Members_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootVc_FirmsArgs = {
  distinct_on: InputMaybe<Array<Vc_Firms_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Vc_Firms_Order_By>>;
  where: InputMaybe<Vc_Firms_Bool_Exp>;
};


export type Query_RootVc_Firms_AggregateArgs = {
  distinct_on: InputMaybe<Array<Vc_Firms_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Vc_Firms_Order_By>>;
  where: InputMaybe<Vc_Firms_Bool_Exp>;
};


export type Query_RootVc_Firms_By_PkArgs = {
  id: Scalars['Int'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "companies" */
  companies: Array<Companies>;
  /** fetch aggregated fields from the table: "companies" */
  companies_aggregate: Companies_Aggregate;
  /** fetch data from the table: "companies" using primary key columns */
  companies_by_pk: Maybe<Companies>;
  /** An array relationship */
  investment_rounds: Array<Investment_Rounds>;
  /** An aggregate relationship */
  investment_rounds_aggregate: Investment_Rounds_Aggregate;
  /** fetch data from the table: "investment_rounds" using primary key columns */
  investment_rounds_by_pk: Maybe<Investment_Rounds>;
  /** An array relationship */
  investments: Array<Investments>;
  /** An aggregate relationship */
  investments_aggregate: Investments_Aggregate;
  /** fetch data from the table: "investments" using primary key columns */
  investments_by_pk: Maybe<Investments>;
  /** An array relationship */
  investors: Array<Investors>;
  /** An aggregate relationship */
  investors_aggregate: Investors_Aggregate;
  /** fetch data from the table: "investors" using primary key columns */
  investors_by_pk: Maybe<Investors>;
  /** fetch data from the table: "people" */
  people: Array<People>;
  /** fetch aggregated fields from the table: "people" */
  people_aggregate: People_Aggregate;
  /** fetch data from the table: "people" using primary key columns */
  people_by_pk: Maybe<People>;
  /** An array relationship */
  team_members: Array<Team_Members>;
  /** An aggregate relationship */
  team_members_aggregate: Team_Members_Aggregate;
  /** fetch data from the table: "team_members" using primary key columns */
  team_members_by_pk: Maybe<Team_Members>;
  /** fetch data from the table: "vc_firms" */
  vc_firms: Array<Vc_Firms>;
  /** fetch aggregated fields from the table: "vc_firms" */
  vc_firms_aggregate: Vc_Firms_Aggregate;
  /** fetch data from the table: "vc_firms" using primary key columns */
  vc_firms_by_pk: Maybe<Vc_Firms>;
};


export type Subscription_RootCompaniesArgs = {
  distinct_on: InputMaybe<Array<Companies_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Companies_Order_By>>;
  where: InputMaybe<Companies_Bool_Exp>;
};


export type Subscription_RootCompanies_AggregateArgs = {
  distinct_on: InputMaybe<Array<Companies_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Companies_Order_By>>;
  where: InputMaybe<Companies_Bool_Exp>;
};


export type Subscription_RootCompanies_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootInvestment_RoundsArgs = {
  distinct_on: InputMaybe<Array<Investment_Rounds_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investment_Rounds_Order_By>>;
  where: InputMaybe<Investment_Rounds_Bool_Exp>;
};


export type Subscription_RootInvestment_Rounds_AggregateArgs = {
  distinct_on: InputMaybe<Array<Investment_Rounds_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investment_Rounds_Order_By>>;
  where: InputMaybe<Investment_Rounds_Bool_Exp>;
};


export type Subscription_RootInvestment_Rounds_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootInvestmentsArgs = {
  distinct_on: InputMaybe<Array<Investments_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investments_Order_By>>;
  where: InputMaybe<Investments_Bool_Exp>;
};


export type Subscription_RootInvestments_AggregateArgs = {
  distinct_on: InputMaybe<Array<Investments_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investments_Order_By>>;
  where: InputMaybe<Investments_Bool_Exp>;
};


export type Subscription_RootInvestments_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootInvestorsArgs = {
  distinct_on: InputMaybe<Array<Investors_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investors_Order_By>>;
  where: InputMaybe<Investors_Bool_Exp>;
};


export type Subscription_RootInvestors_AggregateArgs = {
  distinct_on: InputMaybe<Array<Investors_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investors_Order_By>>;
  where: InputMaybe<Investors_Bool_Exp>;
};


export type Subscription_RootInvestors_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootPeopleArgs = {
  distinct_on: InputMaybe<Array<People_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<People_Order_By>>;
  where: InputMaybe<People_Bool_Exp>;
};


export type Subscription_RootPeople_AggregateArgs = {
  distinct_on: InputMaybe<Array<People_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<People_Order_By>>;
  where: InputMaybe<People_Bool_Exp>;
};


export type Subscription_RootPeople_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootTeam_MembersArgs = {
  distinct_on: InputMaybe<Array<Team_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Team_Members_Order_By>>;
  where: InputMaybe<Team_Members_Bool_Exp>;
};


export type Subscription_RootTeam_Members_AggregateArgs = {
  distinct_on: InputMaybe<Array<Team_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Team_Members_Order_By>>;
  where: InputMaybe<Team_Members_Bool_Exp>;
};


export type Subscription_RootTeam_Members_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootVc_FirmsArgs = {
  distinct_on: InputMaybe<Array<Vc_Firms_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Vc_Firms_Order_By>>;
  where: InputMaybe<Vc_Firms_Bool_Exp>;
};


export type Subscription_RootVc_Firms_AggregateArgs = {
  distinct_on: InputMaybe<Array<Vc_Firms_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Vc_Firms_Order_By>>;
  where: InputMaybe<Vc_Firms_Bool_Exp>;
};


export type Subscription_RootVc_Firms_By_PkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "team_members" */
export type Team_Members = {
  __typename?: 'team_members';
  /** An object relationship */
  company: Maybe<Companies>;
  company_id: Maybe<Scalars['Int']>;
  end_date: Maybe<Scalars['date']>;
  external_id: Scalars['String'];
  founder: Maybe<Scalars['Boolean']>;
  function: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object relationship */
  person: Maybe<People>;
  person_id: Maybe<Scalars['Int']>;
  seniority: Maybe<Scalars['String']>;
  start_date: Maybe<Scalars['date']>;
  title: Maybe<Scalars['String']>;
};

/** aggregated selection of "team_members" */
export type Team_Members_Aggregate = {
  __typename?: 'team_members_aggregate';
  aggregate: Maybe<Team_Members_Aggregate_Fields>;
  nodes: Array<Team_Members>;
};

/** aggregate fields of "team_members" */
export type Team_Members_Aggregate_Fields = {
  __typename?: 'team_members_aggregate_fields';
  avg: Maybe<Team_Members_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Team_Members_Max_Fields>;
  min: Maybe<Team_Members_Min_Fields>;
  stddev: Maybe<Team_Members_Stddev_Fields>;
  stddev_pop: Maybe<Team_Members_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Team_Members_Stddev_Samp_Fields>;
  sum: Maybe<Team_Members_Sum_Fields>;
  var_pop: Maybe<Team_Members_Var_Pop_Fields>;
  var_samp: Maybe<Team_Members_Var_Samp_Fields>;
  variance: Maybe<Team_Members_Variance_Fields>;
};


/** aggregate fields of "team_members" */
export type Team_Members_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Team_Members_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "team_members" */
export type Team_Members_Aggregate_Order_By = {
  avg: InputMaybe<Team_Members_Avg_Order_By>;
  count: InputMaybe<Order_By>;
  max: InputMaybe<Team_Members_Max_Order_By>;
  min: InputMaybe<Team_Members_Min_Order_By>;
  stddev: InputMaybe<Team_Members_Stddev_Order_By>;
  stddev_pop: InputMaybe<Team_Members_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Team_Members_Stddev_Samp_Order_By>;
  sum: InputMaybe<Team_Members_Sum_Order_By>;
  var_pop: InputMaybe<Team_Members_Var_Pop_Order_By>;
  var_samp: InputMaybe<Team_Members_Var_Samp_Order_By>;
  variance: InputMaybe<Team_Members_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "team_members" */
export type Team_Members_Arr_Rel_Insert_Input = {
  data: Array<Team_Members_Insert_Input>;
  /** upsert condition */
  on_conflict: InputMaybe<Team_Members_On_Conflict>;
};

/** aggregate avg on columns */
export type Team_Members_Avg_Fields = {
  __typename?: 'team_members_avg_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "team_members" */
export type Team_Members_Avg_Order_By = {
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "team_members". All fields are combined with a logical 'AND'. */
export type Team_Members_Bool_Exp = {
  _and: InputMaybe<Array<Team_Members_Bool_Exp>>;
  _not: InputMaybe<Team_Members_Bool_Exp>;
  _or: InputMaybe<Array<Team_Members_Bool_Exp>>;
  company: InputMaybe<Companies_Bool_Exp>;
  company_id: InputMaybe<Int_Comparison_Exp>;
  end_date: InputMaybe<Date_Comparison_Exp>;
  external_id: InputMaybe<String_Comparison_Exp>;
  founder: InputMaybe<Boolean_Comparison_Exp>;
  function: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  person: InputMaybe<People_Bool_Exp>;
  person_id: InputMaybe<Int_Comparison_Exp>;
  seniority: InputMaybe<String_Comparison_Exp>;
  start_date: InputMaybe<Date_Comparison_Exp>;
  title: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "team_members" */
export enum Team_Members_Constraint {
  /** unique or primary key constraint */
  TeamMembersExternalIdKey = 'team_members_external_id_key',
  /** unique or primary key constraint */
  TeamMembersPkey = 'team_members_pkey'
}

/** input type for incrementing numeric columns in table "team_members" */
export type Team_Members_Inc_Input = {
  company_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  person_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "team_members" */
export type Team_Members_Insert_Input = {
  company: InputMaybe<Companies_Obj_Rel_Insert_Input>;
  company_id: InputMaybe<Scalars['Int']>;
  end_date: InputMaybe<Scalars['date']>;
  external_id: InputMaybe<Scalars['String']>;
  founder: InputMaybe<Scalars['Boolean']>;
  function: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  person: InputMaybe<People_Obj_Rel_Insert_Input>;
  person_id: InputMaybe<Scalars['Int']>;
  seniority: InputMaybe<Scalars['String']>;
  start_date: InputMaybe<Scalars['date']>;
  title: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Team_Members_Max_Fields = {
  __typename?: 'team_members_max_fields';
  company_id: Maybe<Scalars['Int']>;
  end_date: Maybe<Scalars['date']>;
  external_id: Maybe<Scalars['String']>;
  function: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  seniority: Maybe<Scalars['String']>;
  start_date: Maybe<Scalars['date']>;
  title: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "team_members" */
export type Team_Members_Max_Order_By = {
  company_id: InputMaybe<Order_By>;
  end_date: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  function: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  seniority: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  title: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Team_Members_Min_Fields = {
  __typename?: 'team_members_min_fields';
  company_id: Maybe<Scalars['Int']>;
  end_date: Maybe<Scalars['date']>;
  external_id: Maybe<Scalars['String']>;
  function: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  seniority: Maybe<Scalars['String']>;
  start_date: Maybe<Scalars['date']>;
  title: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "team_members" */
export type Team_Members_Min_Order_By = {
  company_id: InputMaybe<Order_By>;
  end_date: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  function: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  seniority: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  title: InputMaybe<Order_By>;
};

/** response of any mutation on the table "team_members" */
export type Team_Members_Mutation_Response = {
  __typename?: 'team_members_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Team_Members>;
};

/** on_conflict condition type for table "team_members" */
export type Team_Members_On_Conflict = {
  constraint: Team_Members_Constraint;
  update_columns: Array<Team_Members_Update_Column>;
  where: InputMaybe<Team_Members_Bool_Exp>;
};

/** Ordering options when selecting data from "team_members". */
export type Team_Members_Order_By = {
  company: InputMaybe<Companies_Order_By>;
  company_id: InputMaybe<Order_By>;
  end_date: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  founder: InputMaybe<Order_By>;
  function: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person: InputMaybe<People_Order_By>;
  person_id: InputMaybe<Order_By>;
  seniority: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  title: InputMaybe<Order_By>;
};

/** primary key columns input for table: team_members */
export type Team_Members_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "team_members" */
export enum Team_Members_Select_Column {
  /** column name */
  CompanyId = 'company_id',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Founder = 'founder',
  /** column name */
  Function = 'function',
  /** column name */
  Id = 'id',
  /** column name */
  PersonId = 'person_id',
  /** column name */
  Seniority = 'seniority',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "team_members" */
export type Team_Members_Set_Input = {
  company_id: InputMaybe<Scalars['Int']>;
  end_date: InputMaybe<Scalars['date']>;
  external_id: InputMaybe<Scalars['String']>;
  founder: InputMaybe<Scalars['Boolean']>;
  function: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  person_id: InputMaybe<Scalars['Int']>;
  seniority: InputMaybe<Scalars['String']>;
  start_date: InputMaybe<Scalars['date']>;
  title: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Team_Members_Stddev_Fields = {
  __typename?: 'team_members_stddev_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "team_members" */
export type Team_Members_Stddev_Order_By = {
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Team_Members_Stddev_Pop_Fields = {
  __typename?: 'team_members_stddev_pop_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "team_members" */
export type Team_Members_Stddev_Pop_Order_By = {
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Team_Members_Stddev_Samp_Fields = {
  __typename?: 'team_members_stddev_samp_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "team_members" */
export type Team_Members_Stddev_Samp_Order_By = {
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Team_Members_Sum_Fields = {
  __typename?: 'team_members_sum_fields';
  company_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "team_members" */
export type Team_Members_Sum_Order_By = {
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
};

/** update columns of table "team_members" */
export enum Team_Members_Update_Column {
  /** column name */
  CompanyId = 'company_id',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Founder = 'founder',
  /** column name */
  Function = 'function',
  /** column name */
  Id = 'id',
  /** column name */
  PersonId = 'person_id',
  /** column name */
  Seniority = 'seniority',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  Title = 'title'
}

/** aggregate var_pop on columns */
export type Team_Members_Var_Pop_Fields = {
  __typename?: 'team_members_var_pop_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "team_members" */
export type Team_Members_Var_Pop_Order_By = {
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Team_Members_Var_Samp_Fields = {
  __typename?: 'team_members_var_samp_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "team_members" */
export type Team_Members_Var_Samp_Order_By = {
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Team_Members_Variance_Fields = {
  __typename?: 'team_members_variance_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "team_members" */
export type Team_Members_Variance_Order_By = {
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
};

/** columns and relationships of "vc_firms" */
export type Vc_Firms = {
  __typename?: 'vc_firms';
  external_id: Scalars['String'];
  id: Scalars['Int'];
  /** An array relationship */
  investments: Array<Investments>;
  /** An aggregate relationship */
  investments_aggregate: Investments_Aggregate;
  /** An array relationship */
  investors: Array<Investors>;
  /** An aggregate relationship */
  investors_aggregate: Investors_Aggregate;
  linkedin: Maybe<Scalars['String']>;
  logo: Maybe<Scalars['jsonb']>;
  name: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsInvestmentsArgs = {
  distinct_on: InputMaybe<Array<Investments_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investments_Order_By>>;
  where: InputMaybe<Investments_Bool_Exp>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsInvestments_AggregateArgs = {
  distinct_on: InputMaybe<Array<Investments_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investments_Order_By>>;
  where: InputMaybe<Investments_Bool_Exp>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsInvestorsArgs = {
  distinct_on: InputMaybe<Array<Investors_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investors_Order_By>>;
  where: InputMaybe<Investors_Bool_Exp>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsInvestors_AggregateArgs = {
  distinct_on: InputMaybe<Array<Investors_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Investors_Order_By>>;
  where: InputMaybe<Investors_Bool_Exp>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsLogoArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "vc_firms" */
export type Vc_Firms_Aggregate = {
  __typename?: 'vc_firms_aggregate';
  aggregate: Maybe<Vc_Firms_Aggregate_Fields>;
  nodes: Array<Vc_Firms>;
};

/** aggregate fields of "vc_firms" */
export type Vc_Firms_Aggregate_Fields = {
  __typename?: 'vc_firms_aggregate_fields';
  avg: Maybe<Vc_Firms_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Vc_Firms_Max_Fields>;
  min: Maybe<Vc_Firms_Min_Fields>;
  stddev: Maybe<Vc_Firms_Stddev_Fields>;
  stddev_pop: Maybe<Vc_Firms_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Vc_Firms_Stddev_Samp_Fields>;
  sum: Maybe<Vc_Firms_Sum_Fields>;
  var_pop: Maybe<Vc_Firms_Var_Pop_Fields>;
  var_samp: Maybe<Vc_Firms_Var_Samp_Fields>;
  variance: Maybe<Vc_Firms_Variance_Fields>;
};


/** aggregate fields of "vc_firms" */
export type Vc_Firms_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Vc_Firms_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Vc_Firms_Append_Input = {
  logo: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Vc_Firms_Avg_Fields = {
  __typename?: 'vc_firms_avg_fields';
  id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "vc_firms". All fields are combined with a logical 'AND'. */
export type Vc_Firms_Bool_Exp = {
  _and: InputMaybe<Array<Vc_Firms_Bool_Exp>>;
  _not: InputMaybe<Vc_Firms_Bool_Exp>;
  _or: InputMaybe<Array<Vc_Firms_Bool_Exp>>;
  external_id: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  investments: InputMaybe<Investments_Bool_Exp>;
  investors: InputMaybe<Investors_Bool_Exp>;
  linkedin: InputMaybe<String_Comparison_Exp>;
  logo: InputMaybe<Jsonb_Comparison_Exp>;
  name: InputMaybe<String_Comparison_Exp>;
  slug: InputMaybe<String_Comparison_Exp>;
  website: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "vc_firms" */
export enum Vc_Firms_Constraint {
  /** unique or primary key constraint */
  VcFirmsExternalIdKey = 'vc_firms_external_id_key',
  /** unique or primary key constraint */
  VcFirmsPkey = 'vc_firms_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Vc_Firms_Delete_At_Path_Input = {
  logo: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Vc_Firms_Delete_Elem_Input = {
  logo: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Vc_Firms_Delete_Key_Input = {
  logo: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "vc_firms" */
export type Vc_Firms_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "vc_firms" */
export type Vc_Firms_Insert_Input = {
  external_id: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  investments: InputMaybe<Investments_Arr_Rel_Insert_Input>;
  investors: InputMaybe<Investors_Arr_Rel_Insert_Input>;
  linkedin: InputMaybe<Scalars['String']>;
  logo: InputMaybe<Scalars['jsonb']>;
  name: InputMaybe<Scalars['String']>;
  slug: InputMaybe<Scalars['String']>;
  website: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Vc_Firms_Max_Fields = {
  __typename?: 'vc_firms_max_fields';
  external_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  linkedin: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Vc_Firms_Min_Fields = {
  __typename?: 'vc_firms_min_fields';
  external_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  linkedin: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "vc_firms" */
export type Vc_Firms_Mutation_Response = {
  __typename?: 'vc_firms_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Vc_Firms>;
};

/** input type for inserting object relation for remote table "vc_firms" */
export type Vc_Firms_Obj_Rel_Insert_Input = {
  data: Vc_Firms_Insert_Input;
  /** upsert condition */
  on_conflict: InputMaybe<Vc_Firms_On_Conflict>;
};

/** on_conflict condition type for table "vc_firms" */
export type Vc_Firms_On_Conflict = {
  constraint: Vc_Firms_Constraint;
  update_columns: Array<Vc_Firms_Update_Column>;
  where: InputMaybe<Vc_Firms_Bool_Exp>;
};

/** Ordering options when selecting data from "vc_firms". */
export type Vc_Firms_Order_By = {
  external_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  investments_aggregate: InputMaybe<Investments_Aggregate_Order_By>;
  investors_aggregate: InputMaybe<Investors_Aggregate_Order_By>;
  linkedin: InputMaybe<Order_By>;
  logo: InputMaybe<Order_By>;
  name: InputMaybe<Order_By>;
  slug: InputMaybe<Order_By>;
  website: InputMaybe<Order_By>;
};

/** primary key columns input for table: vc_firms */
export type Vc_Firms_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Vc_Firms_Prepend_Input = {
  logo: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "vc_firms" */
export enum Vc_Firms_Select_Column {
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  Linkedin = 'linkedin',
  /** column name */
  Logo = 'logo',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
  /** column name */
  Website = 'website'
}

/** input type for updating data in table "vc_firms" */
export type Vc_Firms_Set_Input = {
  external_id: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  linkedin: InputMaybe<Scalars['String']>;
  logo: InputMaybe<Scalars['jsonb']>;
  name: InputMaybe<Scalars['String']>;
  slug: InputMaybe<Scalars['String']>;
  website: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Vc_Firms_Stddev_Fields = {
  __typename?: 'vc_firms_stddev_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Vc_Firms_Stddev_Pop_Fields = {
  __typename?: 'vc_firms_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Vc_Firms_Stddev_Samp_Fields = {
  __typename?: 'vc_firms_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Vc_Firms_Sum_Fields = {
  __typename?: 'vc_firms_sum_fields';
  id: Maybe<Scalars['Int']>;
};

/** update columns of table "vc_firms" */
export enum Vc_Firms_Update_Column {
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  Linkedin = 'linkedin',
  /** column name */
  Logo = 'logo',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
  /** column name */
  Website = 'website'
}

/** aggregate var_pop on columns */
export type Vc_Firms_Var_Pop_Fields = {
  __typename?: 'vc_firms_var_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Vc_Firms_Var_Samp_Fields = {
  __typename?: 'vc_firms_var_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Vc_Firms_Variance_Fields = {
  __typename?: 'vc_firms_variance_fields';
  id: Maybe<Scalars['Float']>;
};

export type GetCompanyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCompanyQuery = { __typename?: 'query_root', companies: Array<{ __typename?: 'companies', id: number, name: string | null, slug: string | null, logo: any | null, layer: string | null, overview: string | null, investor_amount: string | null, white_paper: string | null, total_employees: any | null, year_founded: string | null, website: string | null, market_verified: string | null, company_linkedin: string | null, github: string | null, velocity_linkedin: string | null, velocity_token: string | null, teamMembers: Array<{ __typename?: 'team_members', id: number, function: string | null, start_date: any | null, end_date: any | null, person: { __typename?: 'people', id: number, slug: string | null, name: string | null, picture: any | null } | null }>, investment_rounds: Array<{ __typename?: 'investment_rounds', id: number, round_date: string | null, round: string | null, amount: any | null, investments: Array<{ __typename?: 'investments', id: number, person: { __typename?: 'people', id: number, slug: string | null, name: string | null, picture: any | null } | null, vc_firm: { __typename?: 'vc_firms', id: number, slug: string | null, name: string | null, logo: any | null } | null }> }> }> };

export type GetCompaniesQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}>;


export type GetCompaniesQuery = { __typename?: 'query_root', companies: Array<{ __typename?: 'companies', id: number, name: string | null, slug: string | null, logo: any | null, layer: string | null }> };


export const GetCompanyDocument = `
    query GetCompany {
  companies {
    id
    name
    slug
    logo
    layer
    overview
    investor_amount
    white_paper
    total_employees
    year_founded
    website
    market_verified
    company_linkedin
    github
    velocity_linkedin
    velocity_token
    teamMembers {
      id
      person {
        id
        slug
        name
        picture
      }
      function
      start_date
      end_date
    }
    investment_rounds {
      id
      round_date
      round
      amount
      investments {
        id
        person {
          id
          slug
          name
          picture
        }
        vc_firm {
          id
          slug
          name
          logo
        }
      }
    }
  }
}
    `;
export const useGetCompanyQuery = <
      TData = GetCompanyQuery,
      TError = Error
    >(
      variables?: GetCompanyQueryVariables,
      options?: UseQueryOptions<GetCompanyQuery, TError, TData>
    ) =>
    useQuery<GetCompanyQuery, TError, TData>(
      variables === undefined ? ['GetCompany'] : ['GetCompany', variables],
      fetcher<GetCompanyQuery, GetCompanyQueryVariables>(GetCompanyDocument, variables),
      options
    );
useGetCompanyQuery.document = GetCompanyDocument;


useGetCompanyQuery.getKey = (variables?: GetCompanyQueryVariables) => variables === undefined ? ['GetCompany'] : ['GetCompany', variables];
;

useGetCompanyQuery.fetcher = (variables?: GetCompanyQueryVariables, options?: RequestInit['headers']) => fetcher<GetCompanyQuery, GetCompanyQueryVariables>(GetCompanyDocument, variables, options);
export const GetCompaniesDocument = `
    query GetCompanies($limit: Int!, $offset: Int!) {
  companies(limit: $limit, offset: $offset) {
    id
    name
    slug
    logo
    layer
  }
}
    `;
export const useGetCompaniesQuery = <
      TData = GetCompaniesQuery,
      TError = Error
    >(
      variables: GetCompaniesQueryVariables,
      options?: UseQueryOptions<GetCompaniesQuery, TError, TData>
    ) =>
    useQuery<GetCompaniesQuery, TError, TData>(
      ['GetCompanies', variables],
      fetcher<GetCompaniesQuery, GetCompaniesQueryVariables>(GetCompaniesDocument, variables),
      options
    );
useGetCompaniesQuery.document = GetCompaniesDocument;


useGetCompaniesQuery.getKey = (variables: GetCompaniesQueryVariables) => ['GetCompanies', variables];
;

useGetCompaniesQuery.fetcher = (variables: GetCompaniesQueryVariables, options?: RequestInit['headers']) => fetcher<GetCompaniesQuery, GetCompaniesQueryVariables>(GetCompaniesDocument, variables, options);