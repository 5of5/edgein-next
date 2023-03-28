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
  bigint: any;
  date: any;
  float8: any;
  geography: any;
  geometry: any;
  jsonb: any;
  numeric: any;
  time: any;
  timestamp: any;
  timestamptz: any;
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

/** columns and relationships of "actions" */
export type Actions = {
  __typename?: 'actions';
  action: Scalars['String'];
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  page: Scalars['String'];
  partner: Maybe<Scalars['Int']>;
  properties: Scalars['jsonb'];
  resource: Maybe<Scalars['String']>;
  resource_id: Maybe<Scalars['Int']>;
  user: Maybe<Scalars['Int']>;
};


/** columns and relationships of "actions" */
export type ActionsPropertiesArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "actions" */
export type Actions_Aggregate = {
  __typename?: 'actions_aggregate';
  aggregate: Maybe<Actions_Aggregate_Fields>;
  nodes: Array<Actions>;
};

/** aggregate fields of "actions" */
export type Actions_Aggregate_Fields = {
  __typename?: 'actions_aggregate_fields';
  avg: Maybe<Actions_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Actions_Max_Fields>;
  min: Maybe<Actions_Min_Fields>;
  stddev: Maybe<Actions_Stddev_Fields>;
  stddev_pop: Maybe<Actions_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Actions_Stddev_Samp_Fields>;
  sum: Maybe<Actions_Sum_Fields>;
  var_pop: Maybe<Actions_Var_Pop_Fields>;
  var_samp: Maybe<Actions_Var_Samp_Fields>;
  variance: Maybe<Actions_Variance_Fields>;
};


/** aggregate fields of "actions" */
export type Actions_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Actions_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Actions_Append_Input = {
  properties: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Actions_Avg_Fields = {
  __typename?: 'actions_avg_fields';
  id: Maybe<Scalars['Float']>;
  partner: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "actions". All fields are combined with a logical 'AND'. */
export type Actions_Bool_Exp = {
  _and: InputMaybe<Array<Actions_Bool_Exp>>;
  _not: InputMaybe<Actions_Bool_Exp>;
  _or: InputMaybe<Array<Actions_Bool_Exp>>;
  action: InputMaybe<String_Comparison_Exp>;
  created_at: InputMaybe<Timestamptz_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  page: InputMaybe<String_Comparison_Exp>;
  partner: InputMaybe<Int_Comparison_Exp>;
  properties: InputMaybe<Jsonb_Comparison_Exp>;
  resource: InputMaybe<String_Comparison_Exp>;
  resource_id: InputMaybe<Int_Comparison_Exp>;
  user: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "actions" */
export enum Actions_Constraint {
  /** unique or primary key constraint */
  ActionsPkey = 'actions_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Actions_Delete_At_Path_Input = {
  properties: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Actions_Delete_Elem_Input = {
  properties: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Actions_Delete_Key_Input = {
  properties: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "actions" */
export type Actions_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
  partner: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  user: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "actions" */
export type Actions_Insert_Input = {
  action: InputMaybe<Scalars['String']>;
  created_at: InputMaybe<Scalars['timestamptz']>;
  id: InputMaybe<Scalars['Int']>;
  page: InputMaybe<Scalars['String']>;
  partner: InputMaybe<Scalars['Int']>;
  properties: InputMaybe<Scalars['jsonb']>;
  resource: InputMaybe<Scalars['String']>;
  resource_id: InputMaybe<Scalars['Int']>;
  user: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Actions_Max_Fields = {
  __typename?: 'actions_max_fields';
  action: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['Int']>;
  page: Maybe<Scalars['String']>;
  partner: Maybe<Scalars['Int']>;
  resource: Maybe<Scalars['String']>;
  resource_id: Maybe<Scalars['Int']>;
  user: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Actions_Min_Fields = {
  __typename?: 'actions_min_fields';
  action: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['Int']>;
  page: Maybe<Scalars['String']>;
  partner: Maybe<Scalars['Int']>;
  resource: Maybe<Scalars['String']>;
  resource_id: Maybe<Scalars['Int']>;
  user: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "actions" */
export type Actions_Mutation_Response = {
  __typename?: 'actions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Actions>;
};

/** on_conflict condition type for table "actions" */
export type Actions_On_Conflict = {
  constraint: Actions_Constraint;
  update_columns: Array<Actions_Update_Column>;
  where: InputMaybe<Actions_Bool_Exp>;
};

/** Ordering options when selecting data from "actions". */
export type Actions_Order_By = {
  action: InputMaybe<Order_By>;
  created_at: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  page: InputMaybe<Order_By>;
  partner: InputMaybe<Order_By>;
  properties: InputMaybe<Order_By>;
  resource: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user: InputMaybe<Order_By>;
};

/** primary key columns input for table: actions */
export type Actions_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Actions_Prepend_Input = {
  properties: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "actions" */
export enum Actions_Select_Column {
  /** column name */
  Action = 'action',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Page = 'page',
  /** column name */
  Partner = 'partner',
  /** column name */
  Properties = 'properties',
  /** column name */
  Resource = 'resource',
  /** column name */
  ResourceId = 'resource_id',
  /** column name */
  User = 'user'
}

/** input type for updating data in table "actions" */
export type Actions_Set_Input = {
  action: InputMaybe<Scalars['String']>;
  created_at: InputMaybe<Scalars['timestamptz']>;
  id: InputMaybe<Scalars['Int']>;
  page: InputMaybe<Scalars['String']>;
  partner: InputMaybe<Scalars['Int']>;
  properties: InputMaybe<Scalars['jsonb']>;
  resource: InputMaybe<Scalars['String']>;
  resource_id: InputMaybe<Scalars['Int']>;
  user: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Actions_Stddev_Fields = {
  __typename?: 'actions_stddev_fields';
  id: Maybe<Scalars['Float']>;
  partner: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Actions_Stddev_Pop_Fields = {
  __typename?: 'actions_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
  partner: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Actions_Stddev_Samp_Fields = {
  __typename?: 'actions_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
  partner: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Actions_Sum_Fields = {
  __typename?: 'actions_sum_fields';
  id: Maybe<Scalars['Int']>;
  partner: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  user: Maybe<Scalars['Int']>;
};

/** update columns of table "actions" */
export enum Actions_Update_Column {
  /** column name */
  Action = 'action',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Page = 'page',
  /** column name */
  Partner = 'partner',
  /** column name */
  Properties = 'properties',
  /** column name */
  Resource = 'resource',
  /** column name */
  ResourceId = 'resource_id',
  /** column name */
  User = 'user'
}

/** aggregate var_pop on columns */
export type Actions_Var_Pop_Fields = {
  __typename?: 'actions_var_pop_fields';
  id: Maybe<Scalars['Float']>;
  partner: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Actions_Var_Samp_Fields = {
  __typename?: 'actions_var_samp_fields';
  id: Maybe<Scalars['Float']>;
  partner: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Actions_Variance_Fields = {
  __typename?: 'actions_variance_fields';
  id: Maybe<Scalars['Float']>;
  partner: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user: Maybe<Scalars['Float']>;
};

/** Allowed email Ids */
export type Allowed_Emails = {
  __typename?: 'allowed_emails';
  created_at: Scalars['date'];
  email: Scalars['String'];
  id: Scalars['Int'];
  match_type: Scalars['String'];
  person_id: Maybe<Scalars['Int']>;
  updated_at: Scalars['date'];
};

/** aggregated selection of "allowed_emails" */
export type Allowed_Emails_Aggregate = {
  __typename?: 'allowed_emails_aggregate';
  aggregate: Maybe<Allowed_Emails_Aggregate_Fields>;
  nodes: Array<Allowed_Emails>;
};

/** aggregate fields of "allowed_emails" */
export type Allowed_Emails_Aggregate_Fields = {
  __typename?: 'allowed_emails_aggregate_fields';
  avg: Maybe<Allowed_Emails_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Allowed_Emails_Max_Fields>;
  min: Maybe<Allowed_Emails_Min_Fields>;
  stddev: Maybe<Allowed_Emails_Stddev_Fields>;
  stddev_pop: Maybe<Allowed_Emails_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Allowed_Emails_Stddev_Samp_Fields>;
  sum: Maybe<Allowed_Emails_Sum_Fields>;
  var_pop: Maybe<Allowed_Emails_Var_Pop_Fields>;
  var_samp: Maybe<Allowed_Emails_Var_Samp_Fields>;
  variance: Maybe<Allowed_Emails_Variance_Fields>;
};


/** aggregate fields of "allowed_emails" */
export type Allowed_Emails_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Allowed_Emails_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Allowed_Emails_Avg_Fields = {
  __typename?: 'allowed_emails_avg_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "allowed_emails". All fields are combined with a logical 'AND'. */
export type Allowed_Emails_Bool_Exp = {
  _and: InputMaybe<Array<Allowed_Emails_Bool_Exp>>;
  _not: InputMaybe<Allowed_Emails_Bool_Exp>;
  _or: InputMaybe<Array<Allowed_Emails_Bool_Exp>>;
  created_at: InputMaybe<Date_Comparison_Exp>;
  email: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  match_type: InputMaybe<String_Comparison_Exp>;
  person_id: InputMaybe<Int_Comparison_Exp>;
  updated_at: InputMaybe<Date_Comparison_Exp>;
};

/** unique or primary key constraints on table "allowed_emails" */
export enum Allowed_Emails_Constraint {
  /** unique or primary key constraint */
  AllowedEmailsEmailKey = 'allowed_emails_email_key',
  /** unique or primary key constraint */
  AllowedEmailsPersonIdKey = 'allowed_emails_person_id_key',
  /** unique or primary key constraint */
  AllowedEmailsPkey = 'allowed_emails_pkey'
}

/** input type for incrementing numeric columns in table "allowed_emails" */
export type Allowed_Emails_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
  person_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "allowed_emails" */
export type Allowed_Emails_Insert_Input = {
  created_at: InputMaybe<Scalars['date']>;
  email: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  match_type: InputMaybe<Scalars['String']>;
  person_id: InputMaybe<Scalars['Int']>;
  updated_at: InputMaybe<Scalars['date']>;
};

/** aggregate max on columns */
export type Allowed_Emails_Max_Fields = {
  __typename?: 'allowed_emails_max_fields';
  created_at: Maybe<Scalars['date']>;
  email: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  match_type: Maybe<Scalars['String']>;
  person_id: Maybe<Scalars['Int']>;
  updated_at: Maybe<Scalars['date']>;
};

/** aggregate min on columns */
export type Allowed_Emails_Min_Fields = {
  __typename?: 'allowed_emails_min_fields';
  created_at: Maybe<Scalars['date']>;
  email: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  match_type: Maybe<Scalars['String']>;
  person_id: Maybe<Scalars['Int']>;
  updated_at: Maybe<Scalars['date']>;
};

/** response of any mutation on the table "allowed_emails" */
export type Allowed_Emails_Mutation_Response = {
  __typename?: 'allowed_emails_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Allowed_Emails>;
};

/** on_conflict condition type for table "allowed_emails" */
export type Allowed_Emails_On_Conflict = {
  constraint: Allowed_Emails_Constraint;
  update_columns: Array<Allowed_Emails_Update_Column>;
  where: InputMaybe<Allowed_Emails_Bool_Exp>;
};

/** Ordering options when selecting data from "allowed_emails". */
export type Allowed_Emails_Order_By = {
  created_at: InputMaybe<Order_By>;
  email: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  match_type: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
};

/** primary key columns input for table: allowed_emails */
export type Allowed_Emails_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "allowed_emails" */
export enum Allowed_Emails_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  MatchType = 'match_type',
  /** column name */
  PersonId = 'person_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "allowed_emails" */
export type Allowed_Emails_Set_Input = {
  created_at: InputMaybe<Scalars['date']>;
  email: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  match_type: InputMaybe<Scalars['String']>;
  person_id: InputMaybe<Scalars['Int']>;
  updated_at: InputMaybe<Scalars['date']>;
};

/** aggregate stddev on columns */
export type Allowed_Emails_Stddev_Fields = {
  __typename?: 'allowed_emails_stddev_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Allowed_Emails_Stddev_Pop_Fields = {
  __typename?: 'allowed_emails_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Allowed_Emails_Stddev_Samp_Fields = {
  __typename?: 'allowed_emails_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Allowed_Emails_Sum_Fields = {
  __typename?: 'allowed_emails_sum_fields';
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
};

/** update columns of table "allowed_emails" */
export enum Allowed_Emails_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  MatchType = 'match_type',
  /** column name */
  PersonId = 'person_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Allowed_Emails_Var_Pop_Fields = {
  __typename?: 'allowed_emails_var_pop_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Allowed_Emails_Var_Samp_Fields = {
  __typename?: 'allowed_emails_var_samp_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Allowed_Emails_Variance_Fields = {
  __typename?: 'allowed_emails_variance_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** columns and relationships of "application_meta" */
export type Application_Meta = {
  __typename?: 'application_meta';
  created_at: Scalars['timestamptz'];
  error: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  key: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  value: Scalars['timestamptz'];
};

/** aggregated selection of "application_meta" */
export type Application_Meta_Aggregate = {
  __typename?: 'application_meta_aggregate';
  aggregate: Maybe<Application_Meta_Aggregate_Fields>;
  nodes: Array<Application_Meta>;
};

/** aggregate fields of "application_meta" */
export type Application_Meta_Aggregate_Fields = {
  __typename?: 'application_meta_aggregate_fields';
  avg: Maybe<Application_Meta_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Application_Meta_Max_Fields>;
  min: Maybe<Application_Meta_Min_Fields>;
  stddev: Maybe<Application_Meta_Stddev_Fields>;
  stddev_pop: Maybe<Application_Meta_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Application_Meta_Stddev_Samp_Fields>;
  sum: Maybe<Application_Meta_Sum_Fields>;
  var_pop: Maybe<Application_Meta_Var_Pop_Fields>;
  var_samp: Maybe<Application_Meta_Var_Samp_Fields>;
  variance: Maybe<Application_Meta_Variance_Fields>;
};


/** aggregate fields of "application_meta" */
export type Application_Meta_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Application_Meta_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Application_Meta_Avg_Fields = {
  __typename?: 'application_meta_avg_fields';
  id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "application_meta". All fields are combined with a logical 'AND'. */
export type Application_Meta_Bool_Exp = {
  _and: InputMaybe<Array<Application_Meta_Bool_Exp>>;
  _not: InputMaybe<Application_Meta_Bool_Exp>;
  _or: InputMaybe<Array<Application_Meta_Bool_Exp>>;
  created_at: InputMaybe<Timestamptz_Comparison_Exp>;
  error: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  key: InputMaybe<String_Comparison_Exp>;
  updated_at: InputMaybe<Timestamptz_Comparison_Exp>;
  value: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "application_meta" */
export enum Application_Meta_Constraint {
  /** unique or primary key constraint */
  ApplicationMetaPkey = 'application_meta_pkey'
}

/** input type for incrementing numeric columns in table "application_meta" */
export type Application_Meta_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "application_meta" */
export type Application_Meta_Insert_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  error: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  key: InputMaybe<Scalars['String']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  value: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Application_Meta_Max_Fields = {
  __typename?: 'application_meta_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  error: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  key: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  value: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Application_Meta_Min_Fields = {
  __typename?: 'application_meta_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  error: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  key: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  value: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "application_meta" */
export type Application_Meta_Mutation_Response = {
  __typename?: 'application_meta_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Application_Meta>;
};

/** on_conflict condition type for table "application_meta" */
export type Application_Meta_On_Conflict = {
  constraint: Application_Meta_Constraint;
  update_columns: Array<Application_Meta_Update_Column>;
  where: InputMaybe<Application_Meta_Bool_Exp>;
};

/** Ordering options when selecting data from "application_meta". */
export type Application_Meta_Order_By = {
  created_at: InputMaybe<Order_By>;
  error: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  key: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
  value: InputMaybe<Order_By>;
};

/** primary key columns input for table: application_meta */
export type Application_Meta_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "application_meta" */
export enum Application_Meta_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Error = 'error',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "application_meta" */
export type Application_Meta_Set_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  error: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  key: InputMaybe<Scalars['String']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  value: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Application_Meta_Stddev_Fields = {
  __typename?: 'application_meta_stddev_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Application_Meta_Stddev_Pop_Fields = {
  __typename?: 'application_meta_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Application_Meta_Stddev_Samp_Fields = {
  __typename?: 'application_meta_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Application_Meta_Sum_Fields = {
  __typename?: 'application_meta_sum_fields';
  id: Maybe<Scalars['Int']>;
};

/** update columns of table "application_meta" */
export enum Application_Meta_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Error = 'error',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Value = 'value'
}

/** aggregate var_pop on columns */
export type Application_Meta_Var_Pop_Fields = {
  __typename?: 'application_meta_var_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Application_Meta_Var_Samp_Fields = {
  __typename?: 'application_meta_var_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Application_Meta_Variance_Fields = {
  __typename?: 'application_meta_variance_fields';
  id: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq: InputMaybe<Scalars['bigint']>;
  _gt: InputMaybe<Scalars['bigint']>;
  _gte: InputMaybe<Scalars['bigint']>;
  _in: InputMaybe<Array<Scalars['bigint']>>;
  _is_null: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['bigint']>;
  _lte: InputMaybe<Scalars['bigint']>;
  _neq: InputMaybe<Scalars['bigint']>;
  _nin: InputMaybe<Array<Scalars['bigint']>>;
};

/** columns and relationships of "billing_org" */
export type Billing_Org = {
  __typename?: 'billing_org';
  customer_id: Scalars['String'];
  id: Scalars['Int'];
  plan: Scalars['String'];
  status: Scalars['String'];
  user_limit: Scalars['Int'];
  /** An object relationship */
  users: Maybe<Users>;
};

/** aggregated selection of "billing_org" */
export type Billing_Org_Aggregate = {
  __typename?: 'billing_org_aggregate';
  aggregate: Maybe<Billing_Org_Aggregate_Fields>;
  nodes: Array<Billing_Org>;
};

/** aggregate fields of "billing_org" */
export type Billing_Org_Aggregate_Fields = {
  __typename?: 'billing_org_aggregate_fields';
  avg: Maybe<Billing_Org_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Billing_Org_Max_Fields>;
  min: Maybe<Billing_Org_Min_Fields>;
  stddev: Maybe<Billing_Org_Stddev_Fields>;
  stddev_pop: Maybe<Billing_Org_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Billing_Org_Stddev_Samp_Fields>;
  sum: Maybe<Billing_Org_Sum_Fields>;
  var_pop: Maybe<Billing_Org_Var_Pop_Fields>;
  var_samp: Maybe<Billing_Org_Var_Samp_Fields>;
  variance: Maybe<Billing_Org_Variance_Fields>;
};


/** aggregate fields of "billing_org" */
export type Billing_Org_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Billing_Org_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Billing_Org_Avg_Fields = {
  __typename?: 'billing_org_avg_fields';
  id: Maybe<Scalars['Float']>;
  user_limit: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "billing_org". All fields are combined with a logical 'AND'. */
export type Billing_Org_Bool_Exp = {
  _and: InputMaybe<Array<Billing_Org_Bool_Exp>>;
  _not: InputMaybe<Billing_Org_Bool_Exp>;
  _or: InputMaybe<Array<Billing_Org_Bool_Exp>>;
  customer_id: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  plan: InputMaybe<String_Comparison_Exp>;
  status: InputMaybe<String_Comparison_Exp>;
  user_limit: InputMaybe<Int_Comparison_Exp>;
  users: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "billing_org" */
export enum Billing_Org_Constraint {
  /** unique or primary key constraint */
  BillingOrgPkey = 'billing_org_pkey'
}

/** input type for incrementing numeric columns in table "billing_org" */
export type Billing_Org_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
  user_limit: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "billing_org" */
export type Billing_Org_Insert_Input = {
  customer_id: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  plan: InputMaybe<Scalars['String']>;
  status: InputMaybe<Scalars['String']>;
  user_limit: InputMaybe<Scalars['Int']>;
  users: InputMaybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Billing_Org_Max_Fields = {
  __typename?: 'billing_org_max_fields';
  customer_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  plan: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  user_limit: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Billing_Org_Min_Fields = {
  __typename?: 'billing_org_min_fields';
  customer_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  plan: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  user_limit: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "billing_org" */
export type Billing_Org_Mutation_Response = {
  __typename?: 'billing_org_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Billing_Org>;
};

/** input type for inserting object relation for remote table "billing_org" */
export type Billing_Org_Obj_Rel_Insert_Input = {
  data: Billing_Org_Insert_Input;
  /** upsert condition */
  on_conflict: InputMaybe<Billing_Org_On_Conflict>;
};

/** on_conflict condition type for table "billing_org" */
export type Billing_Org_On_Conflict = {
  constraint: Billing_Org_Constraint;
  update_columns: Array<Billing_Org_Update_Column>;
  where: InputMaybe<Billing_Org_Bool_Exp>;
};

/** Ordering options when selecting data from "billing_org". */
export type Billing_Org_Order_By = {
  customer_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  plan: InputMaybe<Order_By>;
  status: InputMaybe<Order_By>;
  user_limit: InputMaybe<Order_By>;
  users: InputMaybe<Users_Order_By>;
};

/** primary key columns input for table: billing_org */
export type Billing_Org_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "billing_org" */
export enum Billing_Org_Select_Column {
  /** column name */
  CustomerId = 'customer_id',
  /** column name */
  Id = 'id',
  /** column name */
  Plan = 'plan',
  /** column name */
  Status = 'status',
  /** column name */
  UserLimit = 'user_limit'
}

/** input type for updating data in table "billing_org" */
export type Billing_Org_Set_Input = {
  customer_id: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  plan: InputMaybe<Scalars['String']>;
  status: InputMaybe<Scalars['String']>;
  user_limit: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Billing_Org_Stddev_Fields = {
  __typename?: 'billing_org_stddev_fields';
  id: Maybe<Scalars['Float']>;
  user_limit: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Billing_Org_Stddev_Pop_Fields = {
  __typename?: 'billing_org_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
  user_limit: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Billing_Org_Stddev_Samp_Fields = {
  __typename?: 'billing_org_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
  user_limit: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Billing_Org_Sum_Fields = {
  __typename?: 'billing_org_sum_fields';
  id: Maybe<Scalars['Int']>;
  user_limit: Maybe<Scalars['Int']>;
};

/** update columns of table "billing_org" */
export enum Billing_Org_Update_Column {
  /** column name */
  CustomerId = 'customer_id',
  /** column name */
  Id = 'id',
  /** column name */
  Plan = 'plan',
  /** column name */
  Status = 'status',
  /** column name */
  UserLimit = 'user_limit'
}

/** aggregate var_pop on columns */
export type Billing_Org_Var_Pop_Fields = {
  __typename?: 'billing_org_var_pop_fields';
  id: Maybe<Scalars['Float']>;
  user_limit: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Billing_Org_Var_Samp_Fields = {
  __typename?: 'billing_org_var_samp_fields';
  id: Maybe<Scalars['Float']>;
  user_limit: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Billing_Org_Variance_Fields = {
  __typename?: 'billing_org_variance_fields';
  id: Maybe<Scalars['Float']>;
  user_limit: Maybe<Scalars['Float']>;
};

/** columns and relationships of "blockchains" */
export type Blockchains = {
  __typename?: 'blockchains';
  id: Scalars['Int'];
  name: Scalars['String'];
};

/** aggregated selection of "blockchains" */
export type Blockchains_Aggregate = {
  __typename?: 'blockchains_aggregate';
  aggregate: Maybe<Blockchains_Aggregate_Fields>;
  nodes: Array<Blockchains>;
};

/** aggregate fields of "blockchains" */
export type Blockchains_Aggregate_Fields = {
  __typename?: 'blockchains_aggregate_fields';
  avg: Maybe<Blockchains_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Blockchains_Max_Fields>;
  min: Maybe<Blockchains_Min_Fields>;
  stddev: Maybe<Blockchains_Stddev_Fields>;
  stddev_pop: Maybe<Blockchains_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Blockchains_Stddev_Samp_Fields>;
  sum: Maybe<Blockchains_Sum_Fields>;
  var_pop: Maybe<Blockchains_Var_Pop_Fields>;
  var_samp: Maybe<Blockchains_Var_Samp_Fields>;
  variance: Maybe<Blockchains_Variance_Fields>;
};


/** aggregate fields of "blockchains" */
export type Blockchains_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Blockchains_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Blockchains_Avg_Fields = {
  __typename?: 'blockchains_avg_fields';
  id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "blockchains". All fields are combined with a logical 'AND'. */
export type Blockchains_Bool_Exp = {
  _and: InputMaybe<Array<Blockchains_Bool_Exp>>;
  _not: InputMaybe<Blockchains_Bool_Exp>;
  _or: InputMaybe<Array<Blockchains_Bool_Exp>>;
  id: InputMaybe<Int_Comparison_Exp>;
  name: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "blockchains" */
export enum Blockchains_Constraint {
  /** unique or primary key constraint */
  BlockchainPkey = 'blockchain_pkey'
}

/** input type for incrementing numeric columns in table "blockchains" */
export type Blockchains_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "blockchains" */
export type Blockchains_Insert_Input = {
  id: InputMaybe<Scalars['Int']>;
  name: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Blockchains_Max_Fields = {
  __typename?: 'blockchains_max_fields';
  id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Blockchains_Min_Fields = {
  __typename?: 'blockchains_min_fields';
  id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "blockchains" */
export type Blockchains_Mutation_Response = {
  __typename?: 'blockchains_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Blockchains>;
};

/** input type for inserting object relation for remote table "blockchains" */
export type Blockchains_Obj_Rel_Insert_Input = {
  data: Blockchains_Insert_Input;
  /** upsert condition */
  on_conflict: InputMaybe<Blockchains_On_Conflict>;
};

/** on_conflict condition type for table "blockchains" */
export type Blockchains_On_Conflict = {
  constraint: Blockchains_Constraint;
  update_columns: Array<Blockchains_Update_Column>;
  where: InputMaybe<Blockchains_Bool_Exp>;
};

/** Ordering options when selecting data from "blockchains". */
export type Blockchains_Order_By = {
  id: InputMaybe<Order_By>;
  name: InputMaybe<Order_By>;
};

/** primary key columns input for table: blockchains */
export type Blockchains_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "blockchains" */
export enum Blockchains_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "blockchains" */
export type Blockchains_Set_Input = {
  id: InputMaybe<Scalars['Int']>;
  name: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Blockchains_Stddev_Fields = {
  __typename?: 'blockchains_stddev_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Blockchains_Stddev_Pop_Fields = {
  __typename?: 'blockchains_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Blockchains_Stddev_Samp_Fields = {
  __typename?: 'blockchains_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Blockchains_Sum_Fields = {
  __typename?: 'blockchains_sum_fields';
  id: Maybe<Scalars['Int']>;
};

/** update columns of table "blockchains" */
export enum Blockchains_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** aggregate var_pop on columns */
export type Blockchains_Var_Pop_Fields = {
  __typename?: 'blockchains_var_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Blockchains_Var_Samp_Fields = {
  __typename?: 'blockchains_var_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Blockchains_Variance_Fields = {
  __typename?: 'blockchains_variance_fields';
  id: Maybe<Scalars['Float']>;
};

/** columns and relationships of "coins" */
export type Coins = {
  __typename?: 'coins';
  /** An object relationship */
  blockchain: Maybe<Blockchains>;
  blockchain_id: Maybe<Scalars['Int']>;
  company_id: Maybe<Scalars['Int']>;
  external_id: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  ticker: Scalars['String'];
  type: Maybe<Scalars['String']>;
};

/** aggregated selection of "coins" */
export type Coins_Aggregate = {
  __typename?: 'coins_aggregate';
  aggregate: Maybe<Coins_Aggregate_Fields>;
  nodes: Array<Coins>;
};

/** aggregate fields of "coins" */
export type Coins_Aggregate_Fields = {
  __typename?: 'coins_aggregate_fields';
  avg: Maybe<Coins_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Coins_Max_Fields>;
  min: Maybe<Coins_Min_Fields>;
  stddev: Maybe<Coins_Stddev_Fields>;
  stddev_pop: Maybe<Coins_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Coins_Stddev_Samp_Fields>;
  sum: Maybe<Coins_Sum_Fields>;
  var_pop: Maybe<Coins_Var_Pop_Fields>;
  var_samp: Maybe<Coins_Var_Samp_Fields>;
  variance: Maybe<Coins_Variance_Fields>;
};


/** aggregate fields of "coins" */
export type Coins_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Coins_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Coins_Avg_Fields = {
  __typename?: 'coins_avg_fields';
  blockchain_id: Maybe<Scalars['Float']>;
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "coins". All fields are combined with a logical 'AND'. */
export type Coins_Bool_Exp = {
  _and: InputMaybe<Array<Coins_Bool_Exp>>;
  _not: InputMaybe<Coins_Bool_Exp>;
  _or: InputMaybe<Array<Coins_Bool_Exp>>;
  blockchain: InputMaybe<Blockchains_Bool_Exp>;
  blockchain_id: InputMaybe<Int_Comparison_Exp>;
  company_id: InputMaybe<Int_Comparison_Exp>;
  external_id: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  name: InputMaybe<String_Comparison_Exp>;
  ticker: InputMaybe<String_Comparison_Exp>;
  type: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "coins" */
export enum Coins_Constraint {
  /** unique or primary key constraint */
  CoinsExternalIdKey = 'coins_external_id_key',
  /** unique or primary key constraint */
  CoinsPkey = 'coins_pkey'
}

/** input type for incrementing numeric columns in table "coins" */
export type Coins_Inc_Input = {
  blockchain_id: InputMaybe<Scalars['Int']>;
  company_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "coins" */
export type Coins_Insert_Input = {
  blockchain: InputMaybe<Blockchains_Obj_Rel_Insert_Input>;
  blockchain_id: InputMaybe<Scalars['Int']>;
  company_id: InputMaybe<Scalars['Int']>;
  external_id: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  name: InputMaybe<Scalars['String']>;
  ticker: InputMaybe<Scalars['String']>;
  type: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Coins_Max_Fields = {
  __typename?: 'coins_max_fields';
  blockchain_id: Maybe<Scalars['Int']>;
  company_id: Maybe<Scalars['Int']>;
  external_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
  ticker: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Coins_Min_Fields = {
  __typename?: 'coins_min_fields';
  blockchain_id: Maybe<Scalars['Int']>;
  company_id: Maybe<Scalars['Int']>;
  external_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
  ticker: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "coins" */
export type Coins_Mutation_Response = {
  __typename?: 'coins_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Coins>;
};

/** input type for inserting object relation for remote table "coins" */
export type Coins_Obj_Rel_Insert_Input = {
  data: Coins_Insert_Input;
  /** upsert condition */
  on_conflict: InputMaybe<Coins_On_Conflict>;
};

/** on_conflict condition type for table "coins" */
export type Coins_On_Conflict = {
  constraint: Coins_Constraint;
  update_columns: Array<Coins_Update_Column>;
  where: InputMaybe<Coins_Bool_Exp>;
};

/** Ordering options when selecting data from "coins". */
export type Coins_Order_By = {
  blockchain: InputMaybe<Blockchains_Order_By>;
  blockchain_id: InputMaybe<Order_By>;
  company_id: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  name: InputMaybe<Order_By>;
  ticker: InputMaybe<Order_By>;
  type: InputMaybe<Order_By>;
};

/** primary key columns input for table: coins */
export type Coins_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "coins" */
export enum Coins_Select_Column {
  /** column name */
  BlockchainId = 'blockchain_id',
  /** column name */
  CompanyId = 'company_id',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Ticker = 'ticker',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "coins" */
export type Coins_Set_Input = {
  blockchain_id: InputMaybe<Scalars['Int']>;
  company_id: InputMaybe<Scalars['Int']>;
  external_id: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  name: InputMaybe<Scalars['String']>;
  ticker: InputMaybe<Scalars['String']>;
  type: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Coins_Stddev_Fields = {
  __typename?: 'coins_stddev_fields';
  blockchain_id: Maybe<Scalars['Float']>;
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Coins_Stddev_Pop_Fields = {
  __typename?: 'coins_stddev_pop_fields';
  blockchain_id: Maybe<Scalars['Float']>;
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Coins_Stddev_Samp_Fields = {
  __typename?: 'coins_stddev_samp_fields';
  blockchain_id: Maybe<Scalars['Float']>;
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Coins_Sum_Fields = {
  __typename?: 'coins_sum_fields';
  blockchain_id: Maybe<Scalars['Int']>;
  company_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
};

/** update columns of table "coins" */
export enum Coins_Update_Column {
  /** column name */
  BlockchainId = 'blockchain_id',
  /** column name */
  CompanyId = 'company_id',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Ticker = 'ticker',
  /** column name */
  Type = 'type'
}

/** aggregate var_pop on columns */
export type Coins_Var_Pop_Fields = {
  __typename?: 'coins_var_pop_fields';
  blockchain_id: Maybe<Scalars['Float']>;
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Coins_Var_Samp_Fields = {
  __typename?: 'coins_var_samp_fields';
  blockchain_id: Maybe<Scalars['Float']>;
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Coins_Variance_Fields = {
  __typename?: 'coins_variance_fields';
  blockchain_id: Maybe<Scalars['Float']>;
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** columns and relationships of "companies" */
export type Companies = {
  __typename?: 'companies';
  aliases: Maybe<Scalars['String']>;
  audit_file: Maybe<Scalars['String']>;
  bitcointalk: Maybe<Scalars['String']>;
  blockchain_explorer: Maybe<Scalars['String']>;
  careers_page: Maybe<Scalars['String']>;
  /** An object relationship */
  coin: Maybe<Coins>;
  coin_id: Maybe<Scalars['Int']>;
  company_linkedin: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  date_added: Maybe<Scalars['date']>;
  discord: Maybe<Scalars['String']>;
  external_id: Maybe<Scalars['String']>;
  facebook: Maybe<Scalars['String']>;
  /** An array relationship */
  follows: Array<Follows_Companies>;
  /** An aggregate relationship */
  follows_aggregate: Follows_Companies_Aggregate;
  /** An array relationship */
  from_links: Array<Resource_Links>;
  /** An aggregate relationship */
  from_links_aggregate: Resource_Links_Aggregate;
  geopoint: Maybe<Scalars['geography']>;
  github: Maybe<Scalars['String']>;
  glassdoor: Maybe<Scalars['String']>;
  ico_end: Maybe<Scalars['date']>;
  ico_start: Maybe<Scalars['date']>;
  id: Scalars['Int'];
  instagram: Maybe<Scalars['String']>;
  /** An array relationship */
  investment_rounds: Array<Investment_Rounds>;
  /** An aggregate relationship */
  investment_rounds_aggregate: Investment_Rounds_Aggregate;
  investor_amount: Maybe<Scalars['bigint']>;
  layer: Maybe<Scalars['String']>;
  layer_detail: Maybe<Scalars['String']>;
  library: Maybe<Scalars['jsonb']>;
  location: Maybe<Scalars['String']>;
  location_json: Maybe<Scalars['jsonb']>;
  logo: Maybe<Scalars['jsonb']>;
  market_verified: Maybe<Scalars['String']>;
  medium: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  /** An array relationship */
  news_links: Array<News_Organizations>;
  /** An aggregate relationship */
  news_links_aggregate: News_Organizations_Aggregate;
  notes: Maybe<Scalars['String']>;
  overview: Maybe<Scalars['String']>;
  reddit: Maybe<Scalars['String']>;
  sentiment: Maybe<Scalars['jsonb']>;
  slug: Scalars['String'];
  status: Scalars['String'];
  status_tags: Maybe<Scalars['jsonb']>;
  tags: Maybe<Scalars['jsonb']>;
  /** An array relationship */
  teamMembers: Array<Team_Members>;
  /** An aggregate relationship */
  teamMembers_aggregate: Team_Members_Aggregate;
  telegram: Maybe<Scalars['String']>;
  /** An array relationship */
  to_links: Array<Resource_Links>;
  /** An aggregate relationship */
  to_links_aggregate: Resource_Links_Aggregate;
  total_employees: Maybe<Scalars['numeric']>;
  total_valuation: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
  velocity_linkedin: Maybe<Scalars['String']>;
  velocity_token: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
  white_paper: Maybe<Scalars['String']>;
  year_founded: Maybe<Scalars['String']>;
  youtube: Maybe<Scalars['String']>;
};


/** columns and relationships of "companies" */
export type CompaniesFollowsArgs = {
  distinct_on: InputMaybe<Array<Follows_Companies_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Companies_Order_By>>;
  where: InputMaybe<Follows_Companies_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesFollows_AggregateArgs = {
  distinct_on: InputMaybe<Array<Follows_Companies_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Companies_Order_By>>;
  where: InputMaybe<Follows_Companies_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesFrom_LinksArgs = {
  distinct_on: InputMaybe<Array<Resource_Links_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Resource_Links_Order_By>>;
  where: InputMaybe<Resource_Links_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesFrom_Links_AggregateArgs = {
  distinct_on: InputMaybe<Array<Resource_Links_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Resource_Links_Order_By>>;
  where: InputMaybe<Resource_Links_Bool_Exp>;
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
export type CompaniesLibraryArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "companies" */
export type CompaniesLocation_JsonArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "companies" */
export type CompaniesLogoArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "companies" */
export type CompaniesNews_LinksArgs = {
  distinct_on: InputMaybe<Array<News_Organizations_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<News_Organizations_Order_By>>;
  where: InputMaybe<News_Organizations_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesNews_Links_AggregateArgs = {
  distinct_on: InputMaybe<Array<News_Organizations_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<News_Organizations_Order_By>>;
  where: InputMaybe<News_Organizations_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesSentimentArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "companies" */
export type CompaniesStatus_TagsArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "companies" */
export type CompaniesTagsArgs = {
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


/** columns and relationships of "companies" */
export type CompaniesTo_LinksArgs = {
  distinct_on: InputMaybe<Array<Resource_Links_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Resource_Links_Order_By>>;
  where: InputMaybe<Resource_Links_Bool_Exp>;
};


/** columns and relationships of "companies" */
export type CompaniesTo_Links_AggregateArgs = {
  distinct_on: InputMaybe<Array<Resource_Links_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Resource_Links_Order_By>>;
  where: InputMaybe<Resource_Links_Bool_Exp>;
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
  library: InputMaybe<Scalars['jsonb']>;
  location_json: InputMaybe<Scalars['jsonb']>;
  logo: InputMaybe<Scalars['jsonb']>;
  sentiment: InputMaybe<Scalars['jsonb']>;
  status_tags: InputMaybe<Scalars['jsonb']>;
  tags: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Companies_Avg_Fields = {
  __typename?: 'companies_avg_fields';
  coin_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  investor_amount: Maybe<Scalars['Float']>;
  total_employees: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "companies". All fields are combined with a logical 'AND'. */
export type Companies_Bool_Exp = {
  _and: InputMaybe<Array<Companies_Bool_Exp>>;
  _not: InputMaybe<Companies_Bool_Exp>;
  _or: InputMaybe<Array<Companies_Bool_Exp>>;
  aliases: InputMaybe<String_Comparison_Exp>;
  audit_file: InputMaybe<String_Comparison_Exp>;
  bitcointalk: InputMaybe<String_Comparison_Exp>;
  blockchain_explorer: InputMaybe<String_Comparison_Exp>;
  careers_page: InputMaybe<String_Comparison_Exp>;
  coin: InputMaybe<Coins_Bool_Exp>;
  coin_id: InputMaybe<Int_Comparison_Exp>;
  company_linkedin: InputMaybe<String_Comparison_Exp>;
  created_at: InputMaybe<Timestamptz_Comparison_Exp>;
  date_added: InputMaybe<Date_Comparison_Exp>;
  discord: InputMaybe<String_Comparison_Exp>;
  external_id: InputMaybe<String_Comparison_Exp>;
  facebook: InputMaybe<String_Comparison_Exp>;
  follows: InputMaybe<Follows_Companies_Bool_Exp>;
  from_links: InputMaybe<Resource_Links_Bool_Exp>;
  geopoint: InputMaybe<Geography_Comparison_Exp>;
  github: InputMaybe<String_Comparison_Exp>;
  glassdoor: InputMaybe<String_Comparison_Exp>;
  ico_end: InputMaybe<Date_Comparison_Exp>;
  ico_start: InputMaybe<Date_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  instagram: InputMaybe<String_Comparison_Exp>;
  investment_rounds: InputMaybe<Investment_Rounds_Bool_Exp>;
  investor_amount: InputMaybe<Bigint_Comparison_Exp>;
  layer: InputMaybe<String_Comparison_Exp>;
  layer_detail: InputMaybe<String_Comparison_Exp>;
  library: InputMaybe<Jsonb_Comparison_Exp>;
  location: InputMaybe<String_Comparison_Exp>;
  location_json: InputMaybe<Jsonb_Comparison_Exp>;
  logo: InputMaybe<Jsonb_Comparison_Exp>;
  market_verified: InputMaybe<String_Comparison_Exp>;
  medium: InputMaybe<String_Comparison_Exp>;
  name: InputMaybe<String_Comparison_Exp>;
  news_links: InputMaybe<News_Organizations_Bool_Exp>;
  notes: InputMaybe<String_Comparison_Exp>;
  overview: InputMaybe<String_Comparison_Exp>;
  reddit: InputMaybe<String_Comparison_Exp>;
  sentiment: InputMaybe<Jsonb_Comparison_Exp>;
  slug: InputMaybe<String_Comparison_Exp>;
  status: InputMaybe<String_Comparison_Exp>;
  status_tags: InputMaybe<Jsonb_Comparison_Exp>;
  tags: InputMaybe<Jsonb_Comparison_Exp>;
  teamMembers: InputMaybe<Team_Members_Bool_Exp>;
  telegram: InputMaybe<String_Comparison_Exp>;
  to_links: InputMaybe<Resource_Links_Bool_Exp>;
  total_employees: InputMaybe<Numeric_Comparison_Exp>;
  total_valuation: InputMaybe<String_Comparison_Exp>;
  twitter: InputMaybe<String_Comparison_Exp>;
  updated_at: InputMaybe<Timestamptz_Comparison_Exp>;
  velocity_linkedin: InputMaybe<String_Comparison_Exp>;
  velocity_token: InputMaybe<String_Comparison_Exp>;
  website: InputMaybe<String_Comparison_Exp>;
  white_paper: InputMaybe<String_Comparison_Exp>;
  year_founded: InputMaybe<String_Comparison_Exp>;
  youtube: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "companies" */
export enum Companies_Constraint {
  /** unique or primary key constraint */
  CompaniesExternalIdKey = 'companies_external_id_key',
  /** unique or primary key constraint */
  CompaniesPkey = 'companies_pkey',
  /** unique or primary key constraint */
  CompaniesSlugIdx = 'companies_slug_idx',
  /** unique or primary key constraint */
  CompaniesSlugKey = 'companies_slug_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Companies_Delete_At_Path_Input = {
  library: InputMaybe<Array<Scalars['String']>>;
  location_json: InputMaybe<Array<Scalars['String']>>;
  logo: InputMaybe<Array<Scalars['String']>>;
  sentiment: InputMaybe<Array<Scalars['String']>>;
  status_tags: InputMaybe<Array<Scalars['String']>>;
  tags: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Companies_Delete_Elem_Input = {
  library: InputMaybe<Scalars['Int']>;
  location_json: InputMaybe<Scalars['Int']>;
  logo: InputMaybe<Scalars['Int']>;
  sentiment: InputMaybe<Scalars['Int']>;
  status_tags: InputMaybe<Scalars['Int']>;
  tags: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Companies_Delete_Key_Input = {
  library: InputMaybe<Scalars['String']>;
  location_json: InputMaybe<Scalars['String']>;
  logo: InputMaybe<Scalars['String']>;
  sentiment: InputMaybe<Scalars['String']>;
  status_tags: InputMaybe<Scalars['String']>;
  tags: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "companies_edit_access" */
export type Companies_Edit_Access = {
  __typename?: 'companies_edit_access';
  /** An object relationship */
  company: Maybe<Companies>;
  id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['Int']>;
};

/** aggregated selection of "companies_edit_access" */
export type Companies_Edit_Access_Aggregate = {
  __typename?: 'companies_edit_access_aggregate';
  aggregate: Maybe<Companies_Edit_Access_Aggregate_Fields>;
  nodes: Array<Companies_Edit_Access>;
};

/** aggregate fields of "companies_edit_access" */
export type Companies_Edit_Access_Aggregate_Fields = {
  __typename?: 'companies_edit_access_aggregate_fields';
  avg: Maybe<Companies_Edit_Access_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Companies_Edit_Access_Max_Fields>;
  min: Maybe<Companies_Edit_Access_Min_Fields>;
  stddev: Maybe<Companies_Edit_Access_Stddev_Fields>;
  stddev_pop: Maybe<Companies_Edit_Access_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Companies_Edit_Access_Stddev_Samp_Fields>;
  sum: Maybe<Companies_Edit_Access_Sum_Fields>;
  var_pop: Maybe<Companies_Edit_Access_Var_Pop_Fields>;
  var_samp: Maybe<Companies_Edit_Access_Var_Samp_Fields>;
  variance: Maybe<Companies_Edit_Access_Variance_Fields>;
};


/** aggregate fields of "companies_edit_access" */
export type Companies_Edit_Access_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Companies_Edit_Access_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "companies_edit_access" */
export type Companies_Edit_Access_Aggregate_Order_By = {
  avg: InputMaybe<Companies_Edit_Access_Avg_Order_By>;
  count: InputMaybe<Order_By>;
  max: InputMaybe<Companies_Edit_Access_Max_Order_By>;
  min: InputMaybe<Companies_Edit_Access_Min_Order_By>;
  stddev: InputMaybe<Companies_Edit_Access_Stddev_Order_By>;
  stddev_pop: InputMaybe<Companies_Edit_Access_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Companies_Edit_Access_Stddev_Samp_Order_By>;
  sum: InputMaybe<Companies_Edit_Access_Sum_Order_By>;
  var_pop: InputMaybe<Companies_Edit_Access_Var_Pop_Order_By>;
  var_samp: InputMaybe<Companies_Edit_Access_Var_Samp_Order_By>;
  variance: InputMaybe<Companies_Edit_Access_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "companies_edit_access" */
export type Companies_Edit_Access_Arr_Rel_Insert_Input = {
  data: Array<Companies_Edit_Access_Insert_Input>;
};

/** aggregate avg on columns */
export type Companies_Edit_Access_Avg_Fields = {
  __typename?: 'companies_edit_access_avg_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "companies_edit_access" */
export type Companies_Edit_Access_Avg_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "companies_edit_access". All fields are combined with a logical 'AND'. */
export type Companies_Edit_Access_Bool_Exp = {
  _and: InputMaybe<Array<Companies_Edit_Access_Bool_Exp>>;
  _not: InputMaybe<Companies_Edit_Access_Bool_Exp>;
  _or: InputMaybe<Array<Companies_Edit_Access_Bool_Exp>>;
  company: InputMaybe<Companies_Bool_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  resource_id: InputMaybe<Int_Comparison_Exp>;
  resource_type: InputMaybe<String_Comparison_Exp>;
  user_id: InputMaybe<Int_Comparison_Exp>;
};

/** input type for incrementing numeric columns in table "companies_edit_access" */
export type Companies_Edit_Access_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "companies_edit_access" */
export type Companies_Edit_Access_Insert_Input = {
  company: InputMaybe<Companies_Obj_Rel_Insert_Input>;
  id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  resource_type: InputMaybe<Scalars['String']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Companies_Edit_Access_Max_Fields = {
  __typename?: 'companies_edit_access_max_fields';
  id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "companies_edit_access" */
export type Companies_Edit_Access_Max_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  resource_type: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Companies_Edit_Access_Min_Fields = {
  __typename?: 'companies_edit_access_min_fields';
  id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "companies_edit_access" */
export type Companies_Edit_Access_Min_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  resource_type: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** response of any mutation on the table "companies_edit_access" */
export type Companies_Edit_Access_Mutation_Response = {
  __typename?: 'companies_edit_access_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Companies_Edit_Access>;
};

/** Ordering options when selecting data from "companies_edit_access". */
export type Companies_Edit_Access_Order_By = {
  company: InputMaybe<Companies_Order_By>;
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  resource_type: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** select columns of table "companies_edit_access" */
export enum Companies_Edit_Access_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ResourceId = 'resource_id',
  /** column name */
  ResourceType = 'resource_type',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "companies_edit_access" */
export type Companies_Edit_Access_Set_Input = {
  id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  resource_type: InputMaybe<Scalars['String']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Companies_Edit_Access_Stddev_Fields = {
  __typename?: 'companies_edit_access_stddev_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "companies_edit_access" */
export type Companies_Edit_Access_Stddev_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Companies_Edit_Access_Stddev_Pop_Fields = {
  __typename?: 'companies_edit_access_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "companies_edit_access" */
export type Companies_Edit_Access_Stddev_Pop_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Companies_Edit_Access_Stddev_Samp_Fields = {
  __typename?: 'companies_edit_access_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "companies_edit_access" */
export type Companies_Edit_Access_Stddev_Samp_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Companies_Edit_Access_Sum_Fields = {
  __typename?: 'companies_edit_access_sum_fields';
  id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  user_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "companies_edit_access" */
export type Companies_Edit_Access_Sum_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Companies_Edit_Access_Var_Pop_Fields = {
  __typename?: 'companies_edit_access_var_pop_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "companies_edit_access" */
export type Companies_Edit_Access_Var_Pop_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Companies_Edit_Access_Var_Samp_Fields = {
  __typename?: 'companies_edit_access_var_samp_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "companies_edit_access" */
export type Companies_Edit_Access_Var_Samp_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Companies_Edit_Access_Variance_Fields = {
  __typename?: 'companies_edit_access_variance_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "companies_edit_access" */
export type Companies_Edit_Access_Variance_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** input type for incrementing numeric columns in table "companies" */
export type Companies_Inc_Input = {
  coin_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  investor_amount: InputMaybe<Scalars['bigint']>;
  total_employees: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "companies" */
export type Companies_Insert_Input = {
  aliases: InputMaybe<Scalars['String']>;
  audit_file: InputMaybe<Scalars['String']>;
  bitcointalk: InputMaybe<Scalars['String']>;
  blockchain_explorer: InputMaybe<Scalars['String']>;
  careers_page: InputMaybe<Scalars['String']>;
  coin: InputMaybe<Coins_Obj_Rel_Insert_Input>;
  coin_id: InputMaybe<Scalars['Int']>;
  company_linkedin: InputMaybe<Scalars['String']>;
  created_at: InputMaybe<Scalars['timestamptz']>;
  date_added: InputMaybe<Scalars['date']>;
  discord: InputMaybe<Scalars['String']>;
  external_id: InputMaybe<Scalars['String']>;
  facebook: InputMaybe<Scalars['String']>;
  follows: InputMaybe<Follows_Companies_Arr_Rel_Insert_Input>;
  from_links: InputMaybe<Resource_Links_Arr_Rel_Insert_Input>;
  geopoint: InputMaybe<Scalars['geography']>;
  github: InputMaybe<Scalars['String']>;
  glassdoor: InputMaybe<Scalars['String']>;
  ico_end: InputMaybe<Scalars['date']>;
  ico_start: InputMaybe<Scalars['date']>;
  id: InputMaybe<Scalars['Int']>;
  instagram: InputMaybe<Scalars['String']>;
  investment_rounds: InputMaybe<Investment_Rounds_Arr_Rel_Insert_Input>;
  investor_amount: InputMaybe<Scalars['bigint']>;
  layer: InputMaybe<Scalars['String']>;
  layer_detail: InputMaybe<Scalars['String']>;
  library: InputMaybe<Scalars['jsonb']>;
  location: InputMaybe<Scalars['String']>;
  location_json: InputMaybe<Scalars['jsonb']>;
  logo: InputMaybe<Scalars['jsonb']>;
  market_verified: InputMaybe<Scalars['String']>;
  medium: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  news_links: InputMaybe<News_Organizations_Arr_Rel_Insert_Input>;
  notes: InputMaybe<Scalars['String']>;
  overview: InputMaybe<Scalars['String']>;
  reddit: InputMaybe<Scalars['String']>;
  sentiment: InputMaybe<Scalars['jsonb']>;
  slug: InputMaybe<Scalars['String']>;
  status: InputMaybe<Scalars['String']>;
  status_tags: InputMaybe<Scalars['jsonb']>;
  tags: InputMaybe<Scalars['jsonb']>;
  teamMembers: InputMaybe<Team_Members_Arr_Rel_Insert_Input>;
  telegram: InputMaybe<Scalars['String']>;
  to_links: InputMaybe<Resource_Links_Arr_Rel_Insert_Input>;
  total_employees: InputMaybe<Scalars['numeric']>;
  total_valuation: InputMaybe<Scalars['String']>;
  twitter: InputMaybe<Scalars['String']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  velocity_linkedin: InputMaybe<Scalars['String']>;
  velocity_token: InputMaybe<Scalars['String']>;
  website: InputMaybe<Scalars['String']>;
  white_paper: InputMaybe<Scalars['String']>;
  year_founded: InputMaybe<Scalars['String']>;
  youtube: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Companies_Max_Fields = {
  __typename?: 'companies_max_fields';
  aliases: Maybe<Scalars['String']>;
  audit_file: Maybe<Scalars['String']>;
  bitcointalk: Maybe<Scalars['String']>;
  blockchain_explorer: Maybe<Scalars['String']>;
  careers_page: Maybe<Scalars['String']>;
  coin_id: Maybe<Scalars['Int']>;
  company_linkedin: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['timestamptz']>;
  date_added: Maybe<Scalars['date']>;
  discord: Maybe<Scalars['String']>;
  external_id: Maybe<Scalars['String']>;
  facebook: Maybe<Scalars['String']>;
  github: Maybe<Scalars['String']>;
  glassdoor: Maybe<Scalars['String']>;
  ico_end: Maybe<Scalars['date']>;
  ico_start: Maybe<Scalars['date']>;
  id: Maybe<Scalars['Int']>;
  instagram: Maybe<Scalars['String']>;
  investor_amount: Maybe<Scalars['bigint']>;
  layer: Maybe<Scalars['String']>;
  layer_detail: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  market_verified: Maybe<Scalars['String']>;
  medium: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  notes: Maybe<Scalars['String']>;
  overview: Maybe<Scalars['String']>;
  reddit: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  telegram: Maybe<Scalars['String']>;
  total_employees: Maybe<Scalars['numeric']>;
  total_valuation: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  velocity_linkedin: Maybe<Scalars['String']>;
  velocity_token: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
  white_paper: Maybe<Scalars['String']>;
  year_founded: Maybe<Scalars['String']>;
  youtube: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Companies_Min_Fields = {
  __typename?: 'companies_min_fields';
  aliases: Maybe<Scalars['String']>;
  audit_file: Maybe<Scalars['String']>;
  bitcointalk: Maybe<Scalars['String']>;
  blockchain_explorer: Maybe<Scalars['String']>;
  careers_page: Maybe<Scalars['String']>;
  coin_id: Maybe<Scalars['Int']>;
  company_linkedin: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['timestamptz']>;
  date_added: Maybe<Scalars['date']>;
  discord: Maybe<Scalars['String']>;
  external_id: Maybe<Scalars['String']>;
  facebook: Maybe<Scalars['String']>;
  github: Maybe<Scalars['String']>;
  glassdoor: Maybe<Scalars['String']>;
  ico_end: Maybe<Scalars['date']>;
  ico_start: Maybe<Scalars['date']>;
  id: Maybe<Scalars['Int']>;
  instagram: Maybe<Scalars['String']>;
  investor_amount: Maybe<Scalars['bigint']>;
  layer: Maybe<Scalars['String']>;
  layer_detail: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  market_verified: Maybe<Scalars['String']>;
  medium: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  notes: Maybe<Scalars['String']>;
  overview: Maybe<Scalars['String']>;
  reddit: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  telegram: Maybe<Scalars['String']>;
  total_employees: Maybe<Scalars['numeric']>;
  total_valuation: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  velocity_linkedin: Maybe<Scalars['String']>;
  velocity_token: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
  white_paper: Maybe<Scalars['String']>;
  year_founded: Maybe<Scalars['String']>;
  youtube: Maybe<Scalars['String']>;
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
  aliases: InputMaybe<Order_By>;
  audit_file: InputMaybe<Order_By>;
  bitcointalk: InputMaybe<Order_By>;
  blockchain_explorer: InputMaybe<Order_By>;
  careers_page: InputMaybe<Order_By>;
  coin: InputMaybe<Coins_Order_By>;
  coin_id: InputMaybe<Order_By>;
  company_linkedin: InputMaybe<Order_By>;
  created_at: InputMaybe<Order_By>;
  date_added: InputMaybe<Order_By>;
  discord: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  facebook: InputMaybe<Order_By>;
  follows_aggregate: InputMaybe<Follows_Companies_Aggregate_Order_By>;
  from_links_aggregate: InputMaybe<Resource_Links_Aggregate_Order_By>;
  geopoint: InputMaybe<Order_By>;
  github: InputMaybe<Order_By>;
  glassdoor: InputMaybe<Order_By>;
  ico_end: InputMaybe<Order_By>;
  ico_start: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  instagram: InputMaybe<Order_By>;
  investment_rounds_aggregate: InputMaybe<Investment_Rounds_Aggregate_Order_By>;
  investor_amount: InputMaybe<Order_By>;
  layer: InputMaybe<Order_By>;
  layer_detail: InputMaybe<Order_By>;
  library: InputMaybe<Order_By>;
  location: InputMaybe<Order_By>;
  location_json: InputMaybe<Order_By>;
  logo: InputMaybe<Order_By>;
  market_verified: InputMaybe<Order_By>;
  medium: InputMaybe<Order_By>;
  name: InputMaybe<Order_By>;
  news_links_aggregate: InputMaybe<News_Organizations_Aggregate_Order_By>;
  notes: InputMaybe<Order_By>;
  overview: InputMaybe<Order_By>;
  reddit: InputMaybe<Order_By>;
  sentiment: InputMaybe<Order_By>;
  slug: InputMaybe<Order_By>;
  status: InputMaybe<Order_By>;
  status_tags: InputMaybe<Order_By>;
  tags: InputMaybe<Order_By>;
  teamMembers_aggregate: InputMaybe<Team_Members_Aggregate_Order_By>;
  telegram: InputMaybe<Order_By>;
  to_links_aggregate: InputMaybe<Resource_Links_Aggregate_Order_By>;
  total_employees: InputMaybe<Order_By>;
  total_valuation: InputMaybe<Order_By>;
  twitter: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
  velocity_linkedin: InputMaybe<Order_By>;
  velocity_token: InputMaybe<Order_By>;
  website: InputMaybe<Order_By>;
  white_paper: InputMaybe<Order_By>;
  year_founded: InputMaybe<Order_By>;
  youtube: InputMaybe<Order_By>;
};

/** primary key columns input for table: companies */
export type Companies_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Companies_Prepend_Input = {
  library: InputMaybe<Scalars['jsonb']>;
  location_json: InputMaybe<Scalars['jsonb']>;
  logo: InputMaybe<Scalars['jsonb']>;
  sentiment: InputMaybe<Scalars['jsonb']>;
  status_tags: InputMaybe<Scalars['jsonb']>;
  tags: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "companies" */
export enum Companies_Select_Column {
  /** column name */
  Aliases = 'aliases',
  /** column name */
  AuditFile = 'audit_file',
  /** column name */
  Bitcointalk = 'bitcointalk',
  /** column name */
  BlockchainExplorer = 'blockchain_explorer',
  /** column name */
  CareersPage = 'careers_page',
  /** column name */
  CoinId = 'coin_id',
  /** column name */
  CompanyLinkedin = 'company_linkedin',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DateAdded = 'date_added',
  /** column name */
  Discord = 'discord',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Facebook = 'facebook',
  /** column name */
  Geopoint = 'geopoint',
  /** column name */
  Github = 'github',
  /** column name */
  Glassdoor = 'glassdoor',
  /** column name */
  IcoEnd = 'ico_end',
  /** column name */
  IcoStart = 'ico_start',
  /** column name */
  Id = 'id',
  /** column name */
  Instagram = 'instagram',
  /** column name */
  InvestorAmount = 'investor_amount',
  /** column name */
  Layer = 'layer',
  /** column name */
  LayerDetail = 'layer_detail',
  /** column name */
  Library = 'library',
  /** column name */
  Location = 'location',
  /** column name */
  LocationJson = 'location_json',
  /** column name */
  Logo = 'logo',
  /** column name */
  MarketVerified = 'market_verified',
  /** column name */
  Medium = 'medium',
  /** column name */
  Name = 'name',
  /** column name */
  Notes = 'notes',
  /** column name */
  Overview = 'overview',
  /** column name */
  Reddit = 'reddit',
  /** column name */
  Sentiment = 'sentiment',
  /** column name */
  Slug = 'slug',
  /** column name */
  Status = 'status',
  /** column name */
  StatusTags = 'status_tags',
  /** column name */
  Tags = 'tags',
  /** column name */
  Telegram = 'telegram',
  /** column name */
  TotalEmployees = 'total_employees',
  /** column name */
  TotalValuation = 'total_valuation',
  /** column name */
  Twitter = 'twitter',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VelocityLinkedin = 'velocity_linkedin',
  /** column name */
  VelocityToken = 'velocity_token',
  /** column name */
  Website = 'website',
  /** column name */
  WhitePaper = 'white_paper',
  /** column name */
  YearFounded = 'year_founded',
  /** column name */
  Youtube = 'youtube'
}

/** input type for updating data in table "companies" */
export type Companies_Set_Input = {
  aliases: InputMaybe<Scalars['String']>;
  audit_file: InputMaybe<Scalars['String']>;
  bitcointalk: InputMaybe<Scalars['String']>;
  blockchain_explorer: InputMaybe<Scalars['String']>;
  careers_page: InputMaybe<Scalars['String']>;
  coin_id: InputMaybe<Scalars['Int']>;
  company_linkedin: InputMaybe<Scalars['String']>;
  created_at: InputMaybe<Scalars['timestamptz']>;
  date_added: InputMaybe<Scalars['date']>;
  discord: InputMaybe<Scalars['String']>;
  external_id: InputMaybe<Scalars['String']>;
  facebook: InputMaybe<Scalars['String']>;
  geopoint: InputMaybe<Scalars['geography']>;
  github: InputMaybe<Scalars['String']>;
  glassdoor: InputMaybe<Scalars['String']>;
  ico_end: InputMaybe<Scalars['date']>;
  ico_start: InputMaybe<Scalars['date']>;
  id: InputMaybe<Scalars['Int']>;
  instagram: InputMaybe<Scalars['String']>;
  investor_amount: InputMaybe<Scalars['bigint']>;
  layer: InputMaybe<Scalars['String']>;
  layer_detail: InputMaybe<Scalars['String']>;
  library: InputMaybe<Scalars['jsonb']>;
  location: InputMaybe<Scalars['String']>;
  location_json: InputMaybe<Scalars['jsonb']>;
  logo: InputMaybe<Scalars['jsonb']>;
  market_verified: InputMaybe<Scalars['String']>;
  medium: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  notes: InputMaybe<Scalars['String']>;
  overview: InputMaybe<Scalars['String']>;
  reddit: InputMaybe<Scalars['String']>;
  sentiment: InputMaybe<Scalars['jsonb']>;
  slug: InputMaybe<Scalars['String']>;
  status: InputMaybe<Scalars['String']>;
  status_tags: InputMaybe<Scalars['jsonb']>;
  tags: InputMaybe<Scalars['jsonb']>;
  telegram: InputMaybe<Scalars['String']>;
  total_employees: InputMaybe<Scalars['numeric']>;
  total_valuation: InputMaybe<Scalars['String']>;
  twitter: InputMaybe<Scalars['String']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  velocity_linkedin: InputMaybe<Scalars['String']>;
  velocity_token: InputMaybe<Scalars['String']>;
  website: InputMaybe<Scalars['String']>;
  white_paper: InputMaybe<Scalars['String']>;
  year_founded: InputMaybe<Scalars['String']>;
  youtube: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Companies_Stddev_Fields = {
  __typename?: 'companies_stddev_fields';
  coin_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  investor_amount: Maybe<Scalars['Float']>;
  total_employees: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Companies_Stddev_Pop_Fields = {
  __typename?: 'companies_stddev_pop_fields';
  coin_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  investor_amount: Maybe<Scalars['Float']>;
  total_employees: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Companies_Stddev_Samp_Fields = {
  __typename?: 'companies_stddev_samp_fields';
  coin_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  investor_amount: Maybe<Scalars['Float']>;
  total_employees: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Companies_Sum_Fields = {
  __typename?: 'companies_sum_fields';
  coin_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  investor_amount: Maybe<Scalars['bigint']>;
  total_employees: Maybe<Scalars['numeric']>;
};

/** update columns of table "companies" */
export enum Companies_Update_Column {
  /** column name */
  Aliases = 'aliases',
  /** column name */
  AuditFile = 'audit_file',
  /** column name */
  Bitcointalk = 'bitcointalk',
  /** column name */
  BlockchainExplorer = 'blockchain_explorer',
  /** column name */
  CareersPage = 'careers_page',
  /** column name */
  CoinId = 'coin_id',
  /** column name */
  CompanyLinkedin = 'company_linkedin',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DateAdded = 'date_added',
  /** column name */
  Discord = 'discord',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Facebook = 'facebook',
  /** column name */
  Geopoint = 'geopoint',
  /** column name */
  Github = 'github',
  /** column name */
  Glassdoor = 'glassdoor',
  /** column name */
  IcoEnd = 'ico_end',
  /** column name */
  IcoStart = 'ico_start',
  /** column name */
  Id = 'id',
  /** column name */
  Instagram = 'instagram',
  /** column name */
  InvestorAmount = 'investor_amount',
  /** column name */
  Layer = 'layer',
  /** column name */
  LayerDetail = 'layer_detail',
  /** column name */
  Library = 'library',
  /** column name */
  Location = 'location',
  /** column name */
  LocationJson = 'location_json',
  /** column name */
  Logo = 'logo',
  /** column name */
  MarketVerified = 'market_verified',
  /** column name */
  Medium = 'medium',
  /** column name */
  Name = 'name',
  /** column name */
  Notes = 'notes',
  /** column name */
  Overview = 'overview',
  /** column name */
  Reddit = 'reddit',
  /** column name */
  Sentiment = 'sentiment',
  /** column name */
  Slug = 'slug',
  /** column name */
  Status = 'status',
  /** column name */
  StatusTags = 'status_tags',
  /** column name */
  Tags = 'tags',
  /** column name */
  Telegram = 'telegram',
  /** column name */
  TotalEmployees = 'total_employees',
  /** column name */
  TotalValuation = 'total_valuation',
  /** column name */
  Twitter = 'twitter',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VelocityLinkedin = 'velocity_linkedin',
  /** column name */
  VelocityToken = 'velocity_token',
  /** column name */
  Website = 'website',
  /** column name */
  WhitePaper = 'white_paper',
  /** column name */
  YearFounded = 'year_founded',
  /** column name */
  Youtube = 'youtube'
}

/** aggregate var_pop on columns */
export type Companies_Var_Pop_Fields = {
  __typename?: 'companies_var_pop_fields';
  coin_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  investor_amount: Maybe<Scalars['Float']>;
  total_employees: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Companies_Var_Samp_Fields = {
  __typename?: 'companies_var_samp_fields';
  coin_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  investor_amount: Maybe<Scalars['Float']>;
  total_employees: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Companies_Variance_Fields = {
  __typename?: 'companies_variance_fields';
  coin_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  investor_amount: Maybe<Scalars['Float']>;
  total_employees: Maybe<Scalars['Float']>;
};

/** columns and relationships of "data_actions" */
export type Data_Actions = {
  __typename?: 'data_actions';
  name: Scalars['String'];
  owner_value: Scalars['Int'];
  partner_value: Scalars['Int'];
  user_value: Scalars['Int'];
};

/** aggregated selection of "data_actions" */
export type Data_Actions_Aggregate = {
  __typename?: 'data_actions_aggregate';
  aggregate: Maybe<Data_Actions_Aggregate_Fields>;
  nodes: Array<Data_Actions>;
};

/** aggregate fields of "data_actions" */
export type Data_Actions_Aggregate_Fields = {
  __typename?: 'data_actions_aggregate_fields';
  avg: Maybe<Data_Actions_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Data_Actions_Max_Fields>;
  min: Maybe<Data_Actions_Min_Fields>;
  stddev: Maybe<Data_Actions_Stddev_Fields>;
  stddev_pop: Maybe<Data_Actions_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Data_Actions_Stddev_Samp_Fields>;
  sum: Maybe<Data_Actions_Sum_Fields>;
  var_pop: Maybe<Data_Actions_Var_Pop_Fields>;
  var_samp: Maybe<Data_Actions_Var_Samp_Fields>;
  variance: Maybe<Data_Actions_Variance_Fields>;
};


/** aggregate fields of "data_actions" */
export type Data_Actions_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Data_Actions_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Data_Actions_Avg_Fields = {
  __typename?: 'data_actions_avg_fields';
  owner_value: Maybe<Scalars['Float']>;
  partner_value: Maybe<Scalars['Float']>;
  user_value: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "data_actions". All fields are combined with a logical 'AND'. */
export type Data_Actions_Bool_Exp = {
  _and: InputMaybe<Array<Data_Actions_Bool_Exp>>;
  _not: InputMaybe<Data_Actions_Bool_Exp>;
  _or: InputMaybe<Array<Data_Actions_Bool_Exp>>;
  name: InputMaybe<String_Comparison_Exp>;
  owner_value: InputMaybe<Int_Comparison_Exp>;
  partner_value: InputMaybe<Int_Comparison_Exp>;
  user_value: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "data_actions" */
export enum Data_Actions_Constraint {
  /** unique or primary key constraint */
  DataActionsPkey = 'data_actions_pkey'
}

/** input type for incrementing numeric columns in table "data_actions" */
export type Data_Actions_Inc_Input = {
  owner_value: InputMaybe<Scalars['Int']>;
  partner_value: InputMaybe<Scalars['Int']>;
  user_value: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "data_actions" */
export type Data_Actions_Insert_Input = {
  name: InputMaybe<Scalars['String']>;
  owner_value: InputMaybe<Scalars['Int']>;
  partner_value: InputMaybe<Scalars['Int']>;
  user_value: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Data_Actions_Max_Fields = {
  __typename?: 'data_actions_max_fields';
  name: Maybe<Scalars['String']>;
  owner_value: Maybe<Scalars['Int']>;
  partner_value: Maybe<Scalars['Int']>;
  user_value: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Data_Actions_Min_Fields = {
  __typename?: 'data_actions_min_fields';
  name: Maybe<Scalars['String']>;
  owner_value: Maybe<Scalars['Int']>;
  partner_value: Maybe<Scalars['Int']>;
  user_value: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "data_actions" */
export type Data_Actions_Mutation_Response = {
  __typename?: 'data_actions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Data_Actions>;
};

/** on_conflict condition type for table "data_actions" */
export type Data_Actions_On_Conflict = {
  constraint: Data_Actions_Constraint;
  update_columns: Array<Data_Actions_Update_Column>;
  where: InputMaybe<Data_Actions_Bool_Exp>;
};

/** Ordering options when selecting data from "data_actions". */
export type Data_Actions_Order_By = {
  name: InputMaybe<Order_By>;
  owner_value: InputMaybe<Order_By>;
  partner_value: InputMaybe<Order_By>;
  user_value: InputMaybe<Order_By>;
};

/** primary key columns input for table: data_actions */
export type Data_Actions_Pk_Columns_Input = {
  name: Scalars['String'];
};

/** select columns of table "data_actions" */
export enum Data_Actions_Select_Column {
  /** column name */
  Name = 'name',
  /** column name */
  OwnerValue = 'owner_value',
  /** column name */
  PartnerValue = 'partner_value',
  /** column name */
  UserValue = 'user_value'
}

/** input type for updating data in table "data_actions" */
export type Data_Actions_Set_Input = {
  name: InputMaybe<Scalars['String']>;
  owner_value: InputMaybe<Scalars['Int']>;
  partner_value: InputMaybe<Scalars['Int']>;
  user_value: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Data_Actions_Stddev_Fields = {
  __typename?: 'data_actions_stddev_fields';
  owner_value: Maybe<Scalars['Float']>;
  partner_value: Maybe<Scalars['Float']>;
  user_value: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Data_Actions_Stddev_Pop_Fields = {
  __typename?: 'data_actions_stddev_pop_fields';
  owner_value: Maybe<Scalars['Float']>;
  partner_value: Maybe<Scalars['Float']>;
  user_value: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Data_Actions_Stddev_Samp_Fields = {
  __typename?: 'data_actions_stddev_samp_fields';
  owner_value: Maybe<Scalars['Float']>;
  partner_value: Maybe<Scalars['Float']>;
  user_value: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Data_Actions_Sum_Fields = {
  __typename?: 'data_actions_sum_fields';
  owner_value: Maybe<Scalars['Int']>;
  partner_value: Maybe<Scalars['Int']>;
  user_value: Maybe<Scalars['Int']>;
};

/** update columns of table "data_actions" */
export enum Data_Actions_Update_Column {
  /** column name */
  Name = 'name',
  /** column name */
  OwnerValue = 'owner_value',
  /** column name */
  PartnerValue = 'partner_value',
  /** column name */
  UserValue = 'user_value'
}

/** aggregate var_pop on columns */
export type Data_Actions_Var_Pop_Fields = {
  __typename?: 'data_actions_var_pop_fields';
  owner_value: Maybe<Scalars['Float']>;
  partner_value: Maybe<Scalars['Float']>;
  user_value: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Data_Actions_Var_Samp_Fields = {
  __typename?: 'data_actions_var_samp_fields';
  owner_value: Maybe<Scalars['Float']>;
  partner_value: Maybe<Scalars['Float']>;
  user_value: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Data_Actions_Variance_Fields = {
  __typename?: 'data_actions_variance_fields';
  owner_value: Maybe<Scalars['Float']>;
  partner_value: Maybe<Scalars['Float']>;
  user_value: Maybe<Scalars['Float']>;
};

/** columns and relationships of "data_fields" */
export type Data_Fields = {
  __typename?: 'data_fields';
  data_type: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  is_valid_identifier: Scalars['Boolean'];
  name: Scalars['String'];
  path: Scalars['String'];
  regex_test: Maybe<Scalars['String']>;
  regex_transform: Maybe<Scalars['String']>;
  resource: Scalars['String'];
  restricted_admin: Scalars['Boolean'];
  weight: Scalars['Int'];
};

/** aggregated selection of "data_fields" */
export type Data_Fields_Aggregate = {
  __typename?: 'data_fields_aggregate';
  aggregate: Maybe<Data_Fields_Aggregate_Fields>;
  nodes: Array<Data_Fields>;
};

/** aggregate fields of "data_fields" */
export type Data_Fields_Aggregate_Fields = {
  __typename?: 'data_fields_aggregate_fields';
  avg: Maybe<Data_Fields_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Data_Fields_Max_Fields>;
  min: Maybe<Data_Fields_Min_Fields>;
  stddev: Maybe<Data_Fields_Stddev_Fields>;
  stddev_pop: Maybe<Data_Fields_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Data_Fields_Stddev_Samp_Fields>;
  sum: Maybe<Data_Fields_Sum_Fields>;
  var_pop: Maybe<Data_Fields_Var_Pop_Fields>;
  var_samp: Maybe<Data_Fields_Var_Samp_Fields>;
  variance: Maybe<Data_Fields_Variance_Fields>;
};


/** aggregate fields of "data_fields" */
export type Data_Fields_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Data_Fields_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Data_Fields_Avg_Fields = {
  __typename?: 'data_fields_avg_fields';
  weight: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "data_fields". All fields are combined with a logical 'AND'. */
export type Data_Fields_Bool_Exp = {
  _and: InputMaybe<Array<Data_Fields_Bool_Exp>>;
  _not: InputMaybe<Data_Fields_Bool_Exp>;
  _or: InputMaybe<Array<Data_Fields_Bool_Exp>>;
  data_type: InputMaybe<String_Comparison_Exp>;
  description: InputMaybe<String_Comparison_Exp>;
  is_valid_identifier: InputMaybe<Boolean_Comparison_Exp>;
  name: InputMaybe<String_Comparison_Exp>;
  path: InputMaybe<String_Comparison_Exp>;
  regex_test: InputMaybe<String_Comparison_Exp>;
  regex_transform: InputMaybe<String_Comparison_Exp>;
  resource: InputMaybe<String_Comparison_Exp>;
  restricted_admin: InputMaybe<Boolean_Comparison_Exp>;
  weight: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "data_fields" */
export enum Data_Fields_Constraint {
  /** unique or primary key constraint */
  DataFieldsPkey = 'data_fields_pkey'
}

/** input type for incrementing numeric columns in table "data_fields" */
export type Data_Fields_Inc_Input = {
  weight: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "data_fields" */
export type Data_Fields_Insert_Input = {
  data_type: InputMaybe<Scalars['String']>;
  description: InputMaybe<Scalars['String']>;
  is_valid_identifier: InputMaybe<Scalars['Boolean']>;
  name: InputMaybe<Scalars['String']>;
  path: InputMaybe<Scalars['String']>;
  regex_test: InputMaybe<Scalars['String']>;
  regex_transform: InputMaybe<Scalars['String']>;
  resource: InputMaybe<Scalars['String']>;
  restricted_admin: InputMaybe<Scalars['Boolean']>;
  weight: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Data_Fields_Max_Fields = {
  __typename?: 'data_fields_max_fields';
  data_type: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  path: Maybe<Scalars['String']>;
  regex_test: Maybe<Scalars['String']>;
  regex_transform: Maybe<Scalars['String']>;
  resource: Maybe<Scalars['String']>;
  weight: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Data_Fields_Min_Fields = {
  __typename?: 'data_fields_min_fields';
  data_type: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  path: Maybe<Scalars['String']>;
  regex_test: Maybe<Scalars['String']>;
  regex_transform: Maybe<Scalars['String']>;
  resource: Maybe<Scalars['String']>;
  weight: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "data_fields" */
export type Data_Fields_Mutation_Response = {
  __typename?: 'data_fields_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Data_Fields>;
};

/** on_conflict condition type for table "data_fields" */
export type Data_Fields_On_Conflict = {
  constraint: Data_Fields_Constraint;
  update_columns: Array<Data_Fields_Update_Column>;
  where: InputMaybe<Data_Fields_Bool_Exp>;
};

/** Ordering options when selecting data from "data_fields". */
export type Data_Fields_Order_By = {
  data_type: InputMaybe<Order_By>;
  description: InputMaybe<Order_By>;
  is_valid_identifier: InputMaybe<Order_By>;
  name: InputMaybe<Order_By>;
  path: InputMaybe<Order_By>;
  regex_test: InputMaybe<Order_By>;
  regex_transform: InputMaybe<Order_By>;
  resource: InputMaybe<Order_By>;
  restricted_admin: InputMaybe<Order_By>;
  weight: InputMaybe<Order_By>;
};

/** primary key columns input for table: data_fields */
export type Data_Fields_Pk_Columns_Input = {
  path: Scalars['String'];
};

/** select columns of table "data_fields" */
export enum Data_Fields_Select_Column {
  /** column name */
  DataType = 'data_type',
  /** column name */
  Description = 'description',
  /** column name */
  IsValidIdentifier = 'is_valid_identifier',
  /** column name */
  Name = 'name',
  /** column name */
  Path = 'path',
  /** column name */
  RegexTest = 'regex_test',
  /** column name */
  RegexTransform = 'regex_transform',
  /** column name */
  Resource = 'resource',
  /** column name */
  RestrictedAdmin = 'restricted_admin',
  /** column name */
  Weight = 'weight'
}

/** input type for updating data in table "data_fields" */
export type Data_Fields_Set_Input = {
  data_type: InputMaybe<Scalars['String']>;
  description: InputMaybe<Scalars['String']>;
  is_valid_identifier: InputMaybe<Scalars['Boolean']>;
  name: InputMaybe<Scalars['String']>;
  path: InputMaybe<Scalars['String']>;
  regex_test: InputMaybe<Scalars['String']>;
  regex_transform: InputMaybe<Scalars['String']>;
  resource: InputMaybe<Scalars['String']>;
  restricted_admin: InputMaybe<Scalars['Boolean']>;
  weight: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Data_Fields_Stddev_Fields = {
  __typename?: 'data_fields_stddev_fields';
  weight: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Data_Fields_Stddev_Pop_Fields = {
  __typename?: 'data_fields_stddev_pop_fields';
  weight: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Data_Fields_Stddev_Samp_Fields = {
  __typename?: 'data_fields_stddev_samp_fields';
  weight: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Data_Fields_Sum_Fields = {
  __typename?: 'data_fields_sum_fields';
  weight: Maybe<Scalars['Int']>;
};

/** update columns of table "data_fields" */
export enum Data_Fields_Update_Column {
  /** column name */
  DataType = 'data_type',
  /** column name */
  Description = 'description',
  /** column name */
  IsValidIdentifier = 'is_valid_identifier',
  /** column name */
  Name = 'name',
  /** column name */
  Path = 'path',
  /** column name */
  RegexTest = 'regex_test',
  /** column name */
  RegexTransform = 'regex_transform',
  /** column name */
  Resource = 'resource',
  /** column name */
  RestrictedAdmin = 'restricted_admin',
  /** column name */
  Weight = 'weight'
}

/** aggregate var_pop on columns */
export type Data_Fields_Var_Pop_Fields = {
  __typename?: 'data_fields_var_pop_fields';
  weight: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Data_Fields_Var_Samp_Fields = {
  __typename?: 'data_fields_var_samp_fields';
  weight: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Data_Fields_Variance_Fields = {
  __typename?: 'data_fields_variance_fields';
  weight: Maybe<Scalars['Float']>;
};

/** columns and relationships of "data_partners" */
export type Data_Partners = {
  __typename?: 'data_partners';
  api_key: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

/** aggregated selection of "data_partners" */
export type Data_Partners_Aggregate = {
  __typename?: 'data_partners_aggregate';
  aggregate: Maybe<Data_Partners_Aggregate_Fields>;
  nodes: Array<Data_Partners>;
};

/** aggregate fields of "data_partners" */
export type Data_Partners_Aggregate_Fields = {
  __typename?: 'data_partners_aggregate_fields';
  avg: Maybe<Data_Partners_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Data_Partners_Max_Fields>;
  min: Maybe<Data_Partners_Min_Fields>;
  stddev: Maybe<Data_Partners_Stddev_Fields>;
  stddev_pop: Maybe<Data_Partners_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Data_Partners_Stddev_Samp_Fields>;
  sum: Maybe<Data_Partners_Sum_Fields>;
  var_pop: Maybe<Data_Partners_Var_Pop_Fields>;
  var_samp: Maybe<Data_Partners_Var_Samp_Fields>;
  variance: Maybe<Data_Partners_Variance_Fields>;
};


/** aggregate fields of "data_partners" */
export type Data_Partners_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Data_Partners_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Data_Partners_Avg_Fields = {
  __typename?: 'data_partners_avg_fields';
  id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "data_partners". All fields are combined with a logical 'AND'. */
export type Data_Partners_Bool_Exp = {
  _and: InputMaybe<Array<Data_Partners_Bool_Exp>>;
  _not: InputMaybe<Data_Partners_Bool_Exp>;
  _or: InputMaybe<Array<Data_Partners_Bool_Exp>>;
  api_key: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  name: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "data_partners" */
export enum Data_Partners_Constraint {
  /** unique or primary key constraint */
  DataPartnersPkey = 'data_partners_pkey'
}

/** input type for incrementing numeric columns in table "data_partners" */
export type Data_Partners_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "data_partners" */
export type Data_Partners_Insert_Input = {
  api_key: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  name: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Data_Partners_Max_Fields = {
  __typename?: 'data_partners_max_fields';
  api_key: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Data_Partners_Min_Fields = {
  __typename?: 'data_partners_min_fields';
  api_key: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "data_partners" */
export type Data_Partners_Mutation_Response = {
  __typename?: 'data_partners_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Data_Partners>;
};

/** on_conflict condition type for table "data_partners" */
export type Data_Partners_On_Conflict = {
  constraint: Data_Partners_Constraint;
  update_columns: Array<Data_Partners_Update_Column>;
  where: InputMaybe<Data_Partners_Bool_Exp>;
};

/** Ordering options when selecting data from "data_partners". */
export type Data_Partners_Order_By = {
  api_key: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  name: InputMaybe<Order_By>;
};

/** primary key columns input for table: data_partners */
export type Data_Partners_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "data_partners" */
export enum Data_Partners_Select_Column {
  /** column name */
  ApiKey = 'api_key',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "data_partners" */
export type Data_Partners_Set_Input = {
  api_key: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  name: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Data_Partners_Stddev_Fields = {
  __typename?: 'data_partners_stddev_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Data_Partners_Stddev_Pop_Fields = {
  __typename?: 'data_partners_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Data_Partners_Stddev_Samp_Fields = {
  __typename?: 'data_partners_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Data_Partners_Sum_Fields = {
  __typename?: 'data_partners_sum_fields';
  id: Maybe<Scalars['Int']>;
};

/** update columns of table "data_partners" */
export enum Data_Partners_Update_Column {
  /** column name */
  ApiKey = 'api_key',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** aggregate var_pop on columns */
export type Data_Partners_Var_Pop_Fields = {
  __typename?: 'data_partners_var_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Data_Partners_Var_Samp_Fields = {
  __typename?: 'data_partners_var_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Data_Partners_Variance_Fields = {
  __typename?: 'data_partners_variance_fields';
  id: Maybe<Scalars['Float']>;
};

/** columns and relationships of "data_raw" */
export type Data_Raw = {
  __typename?: 'data_raw';
  accuracy_weight: Scalars['Int'];
  created_at: Scalars['timestamp'];
  field: Scalars['String'];
  id: Scalars['bigint'];
  is_active: Scalars['Boolean'];
  partner: Scalars['Int'];
  resource: Scalars['String'];
  resource_id: Scalars['Int'];
  user_id: Maybe<Scalars['Int']>;
  value: Scalars['jsonb'];
};


/** columns and relationships of "data_raw" */
export type Data_RawValueArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "data_raw" */
export type Data_Raw_Aggregate = {
  __typename?: 'data_raw_aggregate';
  aggregate: Maybe<Data_Raw_Aggregate_Fields>;
  nodes: Array<Data_Raw>;
};

/** aggregate fields of "data_raw" */
export type Data_Raw_Aggregate_Fields = {
  __typename?: 'data_raw_aggregate_fields';
  avg: Maybe<Data_Raw_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Data_Raw_Max_Fields>;
  min: Maybe<Data_Raw_Min_Fields>;
  stddev: Maybe<Data_Raw_Stddev_Fields>;
  stddev_pop: Maybe<Data_Raw_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Data_Raw_Stddev_Samp_Fields>;
  sum: Maybe<Data_Raw_Sum_Fields>;
  var_pop: Maybe<Data_Raw_Var_Pop_Fields>;
  var_samp: Maybe<Data_Raw_Var_Samp_Fields>;
  variance: Maybe<Data_Raw_Variance_Fields>;
};


/** aggregate fields of "data_raw" */
export type Data_Raw_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Data_Raw_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Data_Raw_Append_Input = {
  value: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Data_Raw_Avg_Fields = {
  __typename?: 'data_raw_avg_fields';
  accuracy_weight: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  partner: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "data_raw". All fields are combined with a logical 'AND'. */
export type Data_Raw_Bool_Exp = {
  _and: InputMaybe<Array<Data_Raw_Bool_Exp>>;
  _not: InputMaybe<Data_Raw_Bool_Exp>;
  _or: InputMaybe<Array<Data_Raw_Bool_Exp>>;
  accuracy_weight: InputMaybe<Int_Comparison_Exp>;
  created_at: InputMaybe<Timestamp_Comparison_Exp>;
  field: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Bigint_Comparison_Exp>;
  is_active: InputMaybe<Boolean_Comparison_Exp>;
  partner: InputMaybe<Int_Comparison_Exp>;
  resource: InputMaybe<String_Comparison_Exp>;
  resource_id: InputMaybe<Int_Comparison_Exp>;
  user_id: InputMaybe<Int_Comparison_Exp>;
  value: InputMaybe<Jsonb_Comparison_Exp>;
};

/** unique or primary key constraints on table "data_raw" */
export enum Data_Raw_Constraint {
  /** unique or primary key constraint */
  DataRawPkey = 'data_raw_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Data_Raw_Delete_At_Path_Input = {
  value: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Data_Raw_Delete_Elem_Input = {
  value: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Data_Raw_Delete_Key_Input = {
  value: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "data_raw" */
export type Data_Raw_Inc_Input = {
  accuracy_weight: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['bigint']>;
  partner: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "data_raw" */
export type Data_Raw_Insert_Input = {
  accuracy_weight: InputMaybe<Scalars['Int']>;
  created_at: InputMaybe<Scalars['timestamp']>;
  field: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  is_active: InputMaybe<Scalars['Boolean']>;
  partner: InputMaybe<Scalars['Int']>;
  resource: InputMaybe<Scalars['String']>;
  resource_id: InputMaybe<Scalars['Int']>;
  user_id: InputMaybe<Scalars['Int']>;
  value: InputMaybe<Scalars['jsonb']>;
};

/** aggregate max on columns */
export type Data_Raw_Max_Fields = {
  __typename?: 'data_raw_max_fields';
  accuracy_weight: Maybe<Scalars['Int']>;
  created_at: Maybe<Scalars['timestamp']>;
  field: Maybe<Scalars['String']>;
  id: Maybe<Scalars['bigint']>;
  partner: Maybe<Scalars['Int']>;
  resource: Maybe<Scalars['String']>;
  resource_id: Maybe<Scalars['Int']>;
  user_id: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Data_Raw_Min_Fields = {
  __typename?: 'data_raw_min_fields';
  accuracy_weight: Maybe<Scalars['Int']>;
  created_at: Maybe<Scalars['timestamp']>;
  field: Maybe<Scalars['String']>;
  id: Maybe<Scalars['bigint']>;
  partner: Maybe<Scalars['Int']>;
  resource: Maybe<Scalars['String']>;
  resource_id: Maybe<Scalars['Int']>;
  user_id: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "data_raw" */
export type Data_Raw_Mutation_Response = {
  __typename?: 'data_raw_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Data_Raw>;
};

/** on_conflict condition type for table "data_raw" */
export type Data_Raw_On_Conflict = {
  constraint: Data_Raw_Constraint;
  update_columns: Array<Data_Raw_Update_Column>;
  where: InputMaybe<Data_Raw_Bool_Exp>;
};

/** Ordering options when selecting data from "data_raw". */
export type Data_Raw_Order_By = {
  accuracy_weight: InputMaybe<Order_By>;
  created_at: InputMaybe<Order_By>;
  field: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  is_active: InputMaybe<Order_By>;
  partner: InputMaybe<Order_By>;
  resource: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
  value: InputMaybe<Order_By>;
};

/** primary key columns input for table: data_raw */
export type Data_Raw_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Data_Raw_Prepend_Input = {
  value: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "data_raw" */
export enum Data_Raw_Select_Column {
  /** column name */
  AccuracyWeight = 'accuracy_weight',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Field = 'field',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  Partner = 'partner',
  /** column name */
  Resource = 'resource',
  /** column name */
  ResourceId = 'resource_id',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "data_raw" */
export type Data_Raw_Set_Input = {
  accuracy_weight: InputMaybe<Scalars['Int']>;
  created_at: InputMaybe<Scalars['timestamp']>;
  field: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  is_active: InputMaybe<Scalars['Boolean']>;
  partner: InputMaybe<Scalars['Int']>;
  resource: InputMaybe<Scalars['String']>;
  resource_id: InputMaybe<Scalars['Int']>;
  user_id: InputMaybe<Scalars['Int']>;
  value: InputMaybe<Scalars['jsonb']>;
};

/** aggregate stddev on columns */
export type Data_Raw_Stddev_Fields = {
  __typename?: 'data_raw_stddev_fields';
  accuracy_weight: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  partner: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Data_Raw_Stddev_Pop_Fields = {
  __typename?: 'data_raw_stddev_pop_fields';
  accuracy_weight: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  partner: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Data_Raw_Stddev_Samp_Fields = {
  __typename?: 'data_raw_stddev_samp_fields';
  accuracy_weight: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  partner: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Data_Raw_Sum_Fields = {
  __typename?: 'data_raw_sum_fields';
  accuracy_weight: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['bigint']>;
  partner: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  user_id: Maybe<Scalars['Int']>;
};

/** update columns of table "data_raw" */
export enum Data_Raw_Update_Column {
  /** column name */
  AccuracyWeight = 'accuracy_weight',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Field = 'field',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  Partner = 'partner',
  /** column name */
  Resource = 'resource',
  /** column name */
  ResourceId = 'resource_id',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Value = 'value'
}

/** aggregate var_pop on columns */
export type Data_Raw_Var_Pop_Fields = {
  __typename?: 'data_raw_var_pop_fields';
  accuracy_weight: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  partner: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Data_Raw_Var_Samp_Fields = {
  __typename?: 'data_raw_var_samp_fields';
  accuracy_weight: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  partner: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Data_Raw_Variance_Fields = {
  __typename?: 'data_raw_variance_fields';
  accuracy_weight: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  partner: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** columns and relationships of "data_runs" */
export type Data_Runs = {
  __typename?: 'data_runs';
  ambiguity_score: Maybe<Scalars['float8']>;
  classification: Scalars['String'];
  data_raw: Scalars['Int'];
  id: Scalars['bigint'];
  max_weight: Maybe<Scalars['Int']>;
  run_at: Scalars['timestamptz'];
  weight: Scalars['Int'];
  weight_normalized: Scalars['float8'];
};

/** aggregated selection of "data_runs" */
export type Data_Runs_Aggregate = {
  __typename?: 'data_runs_aggregate';
  aggregate: Maybe<Data_Runs_Aggregate_Fields>;
  nodes: Array<Data_Runs>;
};

/** aggregate fields of "data_runs" */
export type Data_Runs_Aggregate_Fields = {
  __typename?: 'data_runs_aggregate_fields';
  avg: Maybe<Data_Runs_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Data_Runs_Max_Fields>;
  min: Maybe<Data_Runs_Min_Fields>;
  stddev: Maybe<Data_Runs_Stddev_Fields>;
  stddev_pop: Maybe<Data_Runs_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Data_Runs_Stddev_Samp_Fields>;
  sum: Maybe<Data_Runs_Sum_Fields>;
  var_pop: Maybe<Data_Runs_Var_Pop_Fields>;
  var_samp: Maybe<Data_Runs_Var_Samp_Fields>;
  variance: Maybe<Data_Runs_Variance_Fields>;
};


/** aggregate fields of "data_runs" */
export type Data_Runs_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Data_Runs_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Data_Runs_Avg_Fields = {
  __typename?: 'data_runs_avg_fields';
  ambiguity_score: Maybe<Scalars['Float']>;
  data_raw: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  max_weight: Maybe<Scalars['Float']>;
  weight: Maybe<Scalars['Float']>;
  weight_normalized: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "data_runs". All fields are combined with a logical 'AND'. */
export type Data_Runs_Bool_Exp = {
  _and: InputMaybe<Array<Data_Runs_Bool_Exp>>;
  _not: InputMaybe<Data_Runs_Bool_Exp>;
  _or: InputMaybe<Array<Data_Runs_Bool_Exp>>;
  ambiguity_score: InputMaybe<Float8_Comparison_Exp>;
  classification: InputMaybe<String_Comparison_Exp>;
  data_raw: InputMaybe<Int_Comparison_Exp>;
  id: InputMaybe<Bigint_Comparison_Exp>;
  max_weight: InputMaybe<Int_Comparison_Exp>;
  run_at: InputMaybe<Timestamptz_Comparison_Exp>;
  weight: InputMaybe<Int_Comparison_Exp>;
  weight_normalized: InputMaybe<Float8_Comparison_Exp>;
};

/** unique or primary key constraints on table "data_runs" */
export enum Data_Runs_Constraint {
  /** unique or primary key constraint */
  DataRunsPkey = 'data_runs_pkey'
}

/** input type for incrementing numeric columns in table "data_runs" */
export type Data_Runs_Inc_Input = {
  ambiguity_score: InputMaybe<Scalars['float8']>;
  data_raw: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['bigint']>;
  max_weight: InputMaybe<Scalars['Int']>;
  weight: InputMaybe<Scalars['Int']>;
  weight_normalized: InputMaybe<Scalars['float8']>;
};

/** input type for inserting data into table "data_runs" */
export type Data_Runs_Insert_Input = {
  ambiguity_score: InputMaybe<Scalars['float8']>;
  classification: InputMaybe<Scalars['String']>;
  data_raw: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['bigint']>;
  max_weight: InputMaybe<Scalars['Int']>;
  run_at: InputMaybe<Scalars['timestamptz']>;
  weight: InputMaybe<Scalars['Int']>;
  weight_normalized: InputMaybe<Scalars['float8']>;
};

/** aggregate max on columns */
export type Data_Runs_Max_Fields = {
  __typename?: 'data_runs_max_fields';
  ambiguity_score: Maybe<Scalars['float8']>;
  classification: Maybe<Scalars['String']>;
  data_raw: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['bigint']>;
  max_weight: Maybe<Scalars['Int']>;
  run_at: Maybe<Scalars['timestamptz']>;
  weight: Maybe<Scalars['Int']>;
  weight_normalized: Maybe<Scalars['float8']>;
};

/** aggregate min on columns */
export type Data_Runs_Min_Fields = {
  __typename?: 'data_runs_min_fields';
  ambiguity_score: Maybe<Scalars['float8']>;
  classification: Maybe<Scalars['String']>;
  data_raw: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['bigint']>;
  max_weight: Maybe<Scalars['Int']>;
  run_at: Maybe<Scalars['timestamptz']>;
  weight: Maybe<Scalars['Int']>;
  weight_normalized: Maybe<Scalars['float8']>;
};

/** response of any mutation on the table "data_runs" */
export type Data_Runs_Mutation_Response = {
  __typename?: 'data_runs_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Data_Runs>;
};

/** on_conflict condition type for table "data_runs" */
export type Data_Runs_On_Conflict = {
  constraint: Data_Runs_Constraint;
  update_columns: Array<Data_Runs_Update_Column>;
  where: InputMaybe<Data_Runs_Bool_Exp>;
};

/** Ordering options when selecting data from "data_runs". */
export type Data_Runs_Order_By = {
  ambiguity_score: InputMaybe<Order_By>;
  classification: InputMaybe<Order_By>;
  data_raw: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  max_weight: InputMaybe<Order_By>;
  run_at: InputMaybe<Order_By>;
  weight: InputMaybe<Order_By>;
  weight_normalized: InputMaybe<Order_By>;
};

/** primary key columns input for table: data_runs */
export type Data_Runs_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "data_runs" */
export enum Data_Runs_Select_Column {
  /** column name */
  AmbiguityScore = 'ambiguity_score',
  /** column name */
  Classification = 'classification',
  /** column name */
  DataRaw = 'data_raw',
  /** column name */
  Id = 'id',
  /** column name */
  MaxWeight = 'max_weight',
  /** column name */
  RunAt = 'run_at',
  /** column name */
  Weight = 'weight',
  /** column name */
  WeightNormalized = 'weight_normalized'
}

/** input type for updating data in table "data_runs" */
export type Data_Runs_Set_Input = {
  ambiguity_score: InputMaybe<Scalars['float8']>;
  classification: InputMaybe<Scalars['String']>;
  data_raw: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['bigint']>;
  max_weight: InputMaybe<Scalars['Int']>;
  run_at: InputMaybe<Scalars['timestamptz']>;
  weight: InputMaybe<Scalars['Int']>;
  weight_normalized: InputMaybe<Scalars['float8']>;
};

/** aggregate stddev on columns */
export type Data_Runs_Stddev_Fields = {
  __typename?: 'data_runs_stddev_fields';
  ambiguity_score: Maybe<Scalars['Float']>;
  data_raw: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  max_weight: Maybe<Scalars['Float']>;
  weight: Maybe<Scalars['Float']>;
  weight_normalized: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Data_Runs_Stddev_Pop_Fields = {
  __typename?: 'data_runs_stddev_pop_fields';
  ambiguity_score: Maybe<Scalars['Float']>;
  data_raw: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  max_weight: Maybe<Scalars['Float']>;
  weight: Maybe<Scalars['Float']>;
  weight_normalized: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Data_Runs_Stddev_Samp_Fields = {
  __typename?: 'data_runs_stddev_samp_fields';
  ambiguity_score: Maybe<Scalars['Float']>;
  data_raw: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  max_weight: Maybe<Scalars['Float']>;
  weight: Maybe<Scalars['Float']>;
  weight_normalized: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Data_Runs_Sum_Fields = {
  __typename?: 'data_runs_sum_fields';
  ambiguity_score: Maybe<Scalars['float8']>;
  data_raw: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['bigint']>;
  max_weight: Maybe<Scalars['Int']>;
  weight: Maybe<Scalars['Int']>;
  weight_normalized: Maybe<Scalars['float8']>;
};

/** update columns of table "data_runs" */
export enum Data_Runs_Update_Column {
  /** column name */
  AmbiguityScore = 'ambiguity_score',
  /** column name */
  Classification = 'classification',
  /** column name */
  DataRaw = 'data_raw',
  /** column name */
  Id = 'id',
  /** column name */
  MaxWeight = 'max_weight',
  /** column name */
  RunAt = 'run_at',
  /** column name */
  Weight = 'weight',
  /** column name */
  WeightNormalized = 'weight_normalized'
}

/** aggregate var_pop on columns */
export type Data_Runs_Var_Pop_Fields = {
  __typename?: 'data_runs_var_pop_fields';
  ambiguity_score: Maybe<Scalars['Float']>;
  data_raw: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  max_weight: Maybe<Scalars['Float']>;
  weight: Maybe<Scalars['Float']>;
  weight_normalized: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Data_Runs_Var_Samp_Fields = {
  __typename?: 'data_runs_var_samp_fields';
  ambiguity_score: Maybe<Scalars['Float']>;
  data_raw: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  max_weight: Maybe<Scalars['Float']>;
  weight: Maybe<Scalars['Float']>;
  weight_normalized: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Data_Runs_Variance_Fields = {
  __typename?: 'data_runs_variance_fields';
  ambiguity_score: Maybe<Scalars['Float']>;
  data_raw: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  max_weight: Maybe<Scalars['Float']>;
  weight: Maybe<Scalars['Float']>;
  weight_normalized: Maybe<Scalars['Float']>;
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

/** columns and relationships of "disabled_emails" */
export type Disabled_Emails = {
  __typename?: 'disabled_emails';
  email: Scalars['String'];
  id: Scalars['Int'];
  match_type: Scalars['String'];
};

/** aggregated selection of "disabled_emails" */
export type Disabled_Emails_Aggregate = {
  __typename?: 'disabled_emails_aggregate';
  aggregate: Maybe<Disabled_Emails_Aggregate_Fields>;
  nodes: Array<Disabled_Emails>;
};

/** aggregate fields of "disabled_emails" */
export type Disabled_Emails_Aggregate_Fields = {
  __typename?: 'disabled_emails_aggregate_fields';
  avg: Maybe<Disabled_Emails_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Disabled_Emails_Max_Fields>;
  min: Maybe<Disabled_Emails_Min_Fields>;
  stddev: Maybe<Disabled_Emails_Stddev_Fields>;
  stddev_pop: Maybe<Disabled_Emails_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Disabled_Emails_Stddev_Samp_Fields>;
  sum: Maybe<Disabled_Emails_Sum_Fields>;
  var_pop: Maybe<Disabled_Emails_Var_Pop_Fields>;
  var_samp: Maybe<Disabled_Emails_Var_Samp_Fields>;
  variance: Maybe<Disabled_Emails_Variance_Fields>;
};


/** aggregate fields of "disabled_emails" */
export type Disabled_Emails_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Disabled_Emails_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Disabled_Emails_Avg_Fields = {
  __typename?: 'disabled_emails_avg_fields';
  id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "disabled_emails". All fields are combined with a logical 'AND'. */
export type Disabled_Emails_Bool_Exp = {
  _and: InputMaybe<Array<Disabled_Emails_Bool_Exp>>;
  _not: InputMaybe<Disabled_Emails_Bool_Exp>;
  _or: InputMaybe<Array<Disabled_Emails_Bool_Exp>>;
  email: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  match_type: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "disabled_emails" */
export enum Disabled_Emails_Constraint {
  /** unique or primary key constraint */
  DisabledEmailsPkey = 'disabled_emails_pkey'
}

/** input type for incrementing numeric columns in table "disabled_emails" */
export type Disabled_Emails_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "disabled_emails" */
export type Disabled_Emails_Insert_Input = {
  email: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  match_type: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Disabled_Emails_Max_Fields = {
  __typename?: 'disabled_emails_max_fields';
  email: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  match_type: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Disabled_Emails_Min_Fields = {
  __typename?: 'disabled_emails_min_fields';
  email: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  match_type: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "disabled_emails" */
export type Disabled_Emails_Mutation_Response = {
  __typename?: 'disabled_emails_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Disabled_Emails>;
};

/** on_conflict condition type for table "disabled_emails" */
export type Disabled_Emails_On_Conflict = {
  constraint: Disabled_Emails_Constraint;
  update_columns: Array<Disabled_Emails_Update_Column>;
  where: InputMaybe<Disabled_Emails_Bool_Exp>;
};

/** Ordering options when selecting data from "disabled_emails". */
export type Disabled_Emails_Order_By = {
  email: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  match_type: InputMaybe<Order_By>;
};

/** primary key columns input for table: disabled_emails */
export type Disabled_Emails_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "disabled_emails" */
export enum Disabled_Emails_Select_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  MatchType = 'match_type'
}

/** input type for updating data in table "disabled_emails" */
export type Disabled_Emails_Set_Input = {
  email: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  match_type: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Disabled_Emails_Stddev_Fields = {
  __typename?: 'disabled_emails_stddev_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Disabled_Emails_Stddev_Pop_Fields = {
  __typename?: 'disabled_emails_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Disabled_Emails_Stddev_Samp_Fields = {
  __typename?: 'disabled_emails_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Disabled_Emails_Sum_Fields = {
  __typename?: 'disabled_emails_sum_fields';
  id: Maybe<Scalars['Int']>;
};

/** update columns of table "disabled_emails" */
export enum Disabled_Emails_Update_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  MatchType = 'match_type'
}

/** aggregate var_pop on columns */
export type Disabled_Emails_Var_Pop_Fields = {
  __typename?: 'disabled_emails_var_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Disabled_Emails_Var_Samp_Fields = {
  __typename?: 'disabled_emails_var_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Disabled_Emails_Variance_Fields = {
  __typename?: 'disabled_emails_variance_fields';
  id: Maybe<Scalars['Float']>;
};

/** columns and relationships of "event_organization" */
export type Event_Organization = {
  __typename?: 'event_organization';
  /** An object relationship */
  company: Maybe<Companies>;
  company_id: Maybe<Scalars['Int']>;
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  event: Maybe<Events>;
  event_id: Scalars['Int'];
  id: Scalars['Int'];
  sponsor_type: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  /** An object relationship */
  vc_firm: Maybe<Vc_Firms>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** aggregated selection of "event_organization" */
export type Event_Organization_Aggregate = {
  __typename?: 'event_organization_aggregate';
  aggregate: Maybe<Event_Organization_Aggregate_Fields>;
  nodes: Array<Event_Organization>;
};

/** aggregate fields of "event_organization" */
export type Event_Organization_Aggregate_Fields = {
  __typename?: 'event_organization_aggregate_fields';
  avg: Maybe<Event_Organization_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Event_Organization_Max_Fields>;
  min: Maybe<Event_Organization_Min_Fields>;
  stddev: Maybe<Event_Organization_Stddev_Fields>;
  stddev_pop: Maybe<Event_Organization_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Event_Organization_Stddev_Samp_Fields>;
  sum: Maybe<Event_Organization_Sum_Fields>;
  var_pop: Maybe<Event_Organization_Var_Pop_Fields>;
  var_samp: Maybe<Event_Organization_Var_Samp_Fields>;
  variance: Maybe<Event_Organization_Variance_Fields>;
};


/** aggregate fields of "event_organization" */
export type Event_Organization_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Event_Organization_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "event_organization" */
export type Event_Organization_Aggregate_Order_By = {
  avg: InputMaybe<Event_Organization_Avg_Order_By>;
  count: InputMaybe<Order_By>;
  max: InputMaybe<Event_Organization_Max_Order_By>;
  min: InputMaybe<Event_Organization_Min_Order_By>;
  stddev: InputMaybe<Event_Organization_Stddev_Order_By>;
  stddev_pop: InputMaybe<Event_Organization_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Event_Organization_Stddev_Samp_Order_By>;
  sum: InputMaybe<Event_Organization_Sum_Order_By>;
  var_pop: InputMaybe<Event_Organization_Var_Pop_Order_By>;
  var_samp: InputMaybe<Event_Organization_Var_Samp_Order_By>;
  variance: InputMaybe<Event_Organization_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "event_organization" */
export type Event_Organization_Arr_Rel_Insert_Input = {
  data: Array<Event_Organization_Insert_Input>;
  /** upsert condition */
  on_conflict: InputMaybe<Event_Organization_On_Conflict>;
};

/** aggregate avg on columns */
export type Event_Organization_Avg_Fields = {
  __typename?: 'event_organization_avg_fields';
  company_id: Maybe<Scalars['Float']>;
  event_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "event_organization" */
export type Event_Organization_Avg_Order_By = {
  company_id: InputMaybe<Order_By>;
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "event_organization". All fields are combined with a logical 'AND'. */
export type Event_Organization_Bool_Exp = {
  _and: InputMaybe<Array<Event_Organization_Bool_Exp>>;
  _not: InputMaybe<Event_Organization_Bool_Exp>;
  _or: InputMaybe<Array<Event_Organization_Bool_Exp>>;
  company: InputMaybe<Companies_Bool_Exp>;
  company_id: InputMaybe<Int_Comparison_Exp>;
  created_at: InputMaybe<Timestamptz_Comparison_Exp>;
  event: InputMaybe<Events_Bool_Exp>;
  event_id: InputMaybe<Int_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  sponsor_type: InputMaybe<String_Comparison_Exp>;
  type: InputMaybe<String_Comparison_Exp>;
  vc_firm: InputMaybe<Vc_Firms_Bool_Exp>;
  vc_firm_id: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "event_organization" */
export enum Event_Organization_Constraint {
  /** unique or primary key constraint */
  EventOrganizationPkey = 'event_organization_pkey'
}

/** input type for incrementing numeric columns in table "event_organization" */
export type Event_Organization_Inc_Input = {
  company_id: InputMaybe<Scalars['Int']>;
  event_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "event_organization" */
export type Event_Organization_Insert_Input = {
  company: InputMaybe<Companies_Obj_Rel_Insert_Input>;
  company_id: InputMaybe<Scalars['Int']>;
  created_at: InputMaybe<Scalars['timestamptz']>;
  event: InputMaybe<Events_Obj_Rel_Insert_Input>;
  event_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  sponsor_type: InputMaybe<Scalars['String']>;
  type: InputMaybe<Scalars['String']>;
  vc_firm: InputMaybe<Vc_Firms_Obj_Rel_Insert_Input>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Event_Organization_Max_Fields = {
  __typename?: 'event_organization_max_fields';
  company_id: Maybe<Scalars['Int']>;
  created_at: Maybe<Scalars['timestamptz']>;
  event_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  sponsor_type: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "event_organization" */
export type Event_Organization_Max_Order_By = {
  company_id: InputMaybe<Order_By>;
  created_at: InputMaybe<Order_By>;
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  sponsor_type: InputMaybe<Order_By>;
  type: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Event_Organization_Min_Fields = {
  __typename?: 'event_organization_min_fields';
  company_id: Maybe<Scalars['Int']>;
  created_at: Maybe<Scalars['timestamptz']>;
  event_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  sponsor_type: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "event_organization" */
export type Event_Organization_Min_Order_By = {
  company_id: InputMaybe<Order_By>;
  created_at: InputMaybe<Order_By>;
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  sponsor_type: InputMaybe<Order_By>;
  type: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** response of any mutation on the table "event_organization" */
export type Event_Organization_Mutation_Response = {
  __typename?: 'event_organization_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Event_Organization>;
};

/** on_conflict condition type for table "event_organization" */
export type Event_Organization_On_Conflict = {
  constraint: Event_Organization_Constraint;
  update_columns: Array<Event_Organization_Update_Column>;
  where: InputMaybe<Event_Organization_Bool_Exp>;
};

/** Ordering options when selecting data from "event_organization". */
export type Event_Organization_Order_By = {
  company: InputMaybe<Companies_Order_By>;
  company_id: InputMaybe<Order_By>;
  created_at: InputMaybe<Order_By>;
  event: InputMaybe<Events_Order_By>;
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  sponsor_type: InputMaybe<Order_By>;
  type: InputMaybe<Order_By>;
  vc_firm: InputMaybe<Vc_Firms_Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** primary key columns input for table: event_organization */
export type Event_Organization_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "event_organization" */
export enum Event_Organization_Select_Column {
  /** column name */
  CompanyId = 'company_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  SponsorType = 'sponsor_type',
  /** column name */
  Type = 'type',
  /** column name */
  VcFirmId = 'vc_firm_id'
}

/** input type for updating data in table "event_organization" */
export type Event_Organization_Set_Input = {
  company_id: InputMaybe<Scalars['Int']>;
  created_at: InputMaybe<Scalars['timestamptz']>;
  event_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  sponsor_type: InputMaybe<Scalars['String']>;
  type: InputMaybe<Scalars['String']>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Event_Organization_Stddev_Fields = {
  __typename?: 'event_organization_stddev_fields';
  company_id: Maybe<Scalars['Float']>;
  event_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "event_organization" */
export type Event_Organization_Stddev_Order_By = {
  company_id: InputMaybe<Order_By>;
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Event_Organization_Stddev_Pop_Fields = {
  __typename?: 'event_organization_stddev_pop_fields';
  company_id: Maybe<Scalars['Float']>;
  event_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "event_organization" */
export type Event_Organization_Stddev_Pop_Order_By = {
  company_id: InputMaybe<Order_By>;
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Event_Organization_Stddev_Samp_Fields = {
  __typename?: 'event_organization_stddev_samp_fields';
  company_id: Maybe<Scalars['Float']>;
  event_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "event_organization" */
export type Event_Organization_Stddev_Samp_Order_By = {
  company_id: InputMaybe<Order_By>;
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Event_Organization_Sum_Fields = {
  __typename?: 'event_organization_sum_fields';
  company_id: Maybe<Scalars['Int']>;
  event_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "event_organization" */
export type Event_Organization_Sum_Order_By = {
  company_id: InputMaybe<Order_By>;
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** update columns of table "event_organization" */
export enum Event_Organization_Update_Column {
  /** column name */
  CompanyId = 'company_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  SponsorType = 'sponsor_type',
  /** column name */
  Type = 'type',
  /** column name */
  VcFirmId = 'vc_firm_id'
}

/** aggregate var_pop on columns */
export type Event_Organization_Var_Pop_Fields = {
  __typename?: 'event_organization_var_pop_fields';
  company_id: Maybe<Scalars['Float']>;
  event_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "event_organization" */
export type Event_Organization_Var_Pop_Order_By = {
  company_id: InputMaybe<Order_By>;
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Event_Organization_Var_Samp_Fields = {
  __typename?: 'event_organization_var_samp_fields';
  company_id: Maybe<Scalars['Float']>;
  event_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "event_organization" */
export type Event_Organization_Var_Samp_Order_By = {
  company_id: InputMaybe<Order_By>;
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Event_Organization_Variance_Fields = {
  __typename?: 'event_organization_variance_fields';
  company_id: Maybe<Scalars['Float']>;
  event_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "event_organization" */
export type Event_Organization_Variance_Order_By = {
  company_id: InputMaybe<Order_By>;
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** columns and relationships of "event_person" */
export type Event_Person = {
  __typename?: 'event_person';
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  event: Maybe<Events>;
  event_id: Scalars['Int'];
  id: Scalars['Int'];
  /** An object relationship */
  person: Maybe<People>;
  person_id: Scalars['Int'];
  type: Scalars['String'];
};

/** aggregated selection of "event_person" */
export type Event_Person_Aggregate = {
  __typename?: 'event_person_aggregate';
  aggregate: Maybe<Event_Person_Aggregate_Fields>;
  nodes: Array<Event_Person>;
};

/** aggregate fields of "event_person" */
export type Event_Person_Aggregate_Fields = {
  __typename?: 'event_person_aggregate_fields';
  avg: Maybe<Event_Person_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Event_Person_Max_Fields>;
  min: Maybe<Event_Person_Min_Fields>;
  stddev: Maybe<Event_Person_Stddev_Fields>;
  stddev_pop: Maybe<Event_Person_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Event_Person_Stddev_Samp_Fields>;
  sum: Maybe<Event_Person_Sum_Fields>;
  var_pop: Maybe<Event_Person_Var_Pop_Fields>;
  var_samp: Maybe<Event_Person_Var_Samp_Fields>;
  variance: Maybe<Event_Person_Variance_Fields>;
};


/** aggregate fields of "event_person" */
export type Event_Person_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Event_Person_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "event_person" */
export type Event_Person_Aggregate_Order_By = {
  avg: InputMaybe<Event_Person_Avg_Order_By>;
  count: InputMaybe<Order_By>;
  max: InputMaybe<Event_Person_Max_Order_By>;
  min: InputMaybe<Event_Person_Min_Order_By>;
  stddev: InputMaybe<Event_Person_Stddev_Order_By>;
  stddev_pop: InputMaybe<Event_Person_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Event_Person_Stddev_Samp_Order_By>;
  sum: InputMaybe<Event_Person_Sum_Order_By>;
  var_pop: InputMaybe<Event_Person_Var_Pop_Order_By>;
  var_samp: InputMaybe<Event_Person_Var_Samp_Order_By>;
  variance: InputMaybe<Event_Person_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "event_person" */
export type Event_Person_Arr_Rel_Insert_Input = {
  data: Array<Event_Person_Insert_Input>;
  /** upsert condition */
  on_conflict: InputMaybe<Event_Person_On_Conflict>;
};

/** aggregate avg on columns */
export type Event_Person_Avg_Fields = {
  __typename?: 'event_person_avg_fields';
  event_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "event_person" */
export type Event_Person_Avg_Order_By = {
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "event_person". All fields are combined with a logical 'AND'. */
export type Event_Person_Bool_Exp = {
  _and: InputMaybe<Array<Event_Person_Bool_Exp>>;
  _not: InputMaybe<Event_Person_Bool_Exp>;
  _or: InputMaybe<Array<Event_Person_Bool_Exp>>;
  created_at: InputMaybe<Timestamptz_Comparison_Exp>;
  event: InputMaybe<Events_Bool_Exp>;
  event_id: InputMaybe<Int_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  person: InputMaybe<People_Bool_Exp>;
  person_id: InputMaybe<Int_Comparison_Exp>;
  type: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "event_person" */
export enum Event_Person_Constraint {
  /** unique or primary key constraint */
  EventPersonPkey = 'event_person_pkey'
}

/** input type for incrementing numeric columns in table "event_person" */
export type Event_Person_Inc_Input = {
  event_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  person_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "event_person" */
export type Event_Person_Insert_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  event: InputMaybe<Events_Obj_Rel_Insert_Input>;
  event_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  person: InputMaybe<People_Obj_Rel_Insert_Input>;
  person_id: InputMaybe<Scalars['Int']>;
  type: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Event_Person_Max_Fields = {
  __typename?: 'event_person_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  event_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  type: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "event_person" */
export type Event_Person_Max_Order_By = {
  created_at: InputMaybe<Order_By>;
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  type: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Event_Person_Min_Fields = {
  __typename?: 'event_person_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  event_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  type: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "event_person" */
export type Event_Person_Min_Order_By = {
  created_at: InputMaybe<Order_By>;
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  type: InputMaybe<Order_By>;
};

/** response of any mutation on the table "event_person" */
export type Event_Person_Mutation_Response = {
  __typename?: 'event_person_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Event_Person>;
};

/** on_conflict condition type for table "event_person" */
export type Event_Person_On_Conflict = {
  constraint: Event_Person_Constraint;
  update_columns: Array<Event_Person_Update_Column>;
  where: InputMaybe<Event_Person_Bool_Exp>;
};

/** Ordering options when selecting data from "event_person". */
export type Event_Person_Order_By = {
  created_at: InputMaybe<Order_By>;
  event: InputMaybe<Events_Order_By>;
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person: InputMaybe<People_Order_By>;
  person_id: InputMaybe<Order_By>;
  type: InputMaybe<Order_By>;
};

/** primary key columns input for table: event_person */
export type Event_Person_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "event_person" */
export enum Event_Person_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  PersonId = 'person_id',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "event_person" */
export type Event_Person_Set_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  event_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  person_id: InputMaybe<Scalars['Int']>;
  type: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Event_Person_Stddev_Fields = {
  __typename?: 'event_person_stddev_fields';
  event_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "event_person" */
export type Event_Person_Stddev_Order_By = {
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Event_Person_Stddev_Pop_Fields = {
  __typename?: 'event_person_stddev_pop_fields';
  event_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "event_person" */
export type Event_Person_Stddev_Pop_Order_By = {
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Event_Person_Stddev_Samp_Fields = {
  __typename?: 'event_person_stddev_samp_fields';
  event_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "event_person" */
export type Event_Person_Stddev_Samp_Order_By = {
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Event_Person_Sum_Fields = {
  __typename?: 'event_person_sum_fields';
  event_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "event_person" */
export type Event_Person_Sum_Order_By = {
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
};

/** update columns of table "event_person" */
export enum Event_Person_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  PersonId = 'person_id',
  /** column name */
  Type = 'type'
}

/** aggregate var_pop on columns */
export type Event_Person_Var_Pop_Fields = {
  __typename?: 'event_person_var_pop_fields';
  event_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "event_person" */
export type Event_Person_Var_Pop_Order_By = {
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Event_Person_Var_Samp_Fields = {
  __typename?: 'event_person_var_samp_fields';
  event_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "event_person" */
export type Event_Person_Var_Samp_Order_By = {
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Event_Person_Variance_Fields = {
  __typename?: 'event_person_variance_fields';
  event_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "event_person" */
export type Event_Person_Variance_Order_By = {
  event_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
};

/** columns and relationships of "events" */
export type Events = {
  __typename?: 'events';
  banner: Maybe<Scalars['jsonb']>;
  created_at: Scalars['timestamptz'];
  discord: Maybe<Scalars['String']>;
  end_date: Maybe<Scalars['date']>;
  end_time: Maybe<Scalars['time']>;
  /** An array relationship */
  event_organization: Array<Event_Organization>;
  /** An aggregate relationship */
  event_organization_aggregate: Event_Organization_Aggregate;
  /** An array relationship */
  event_person: Array<Event_Person>;
  /** An aggregate relationship */
  event_person_aggregate: Event_Person_Aggregate;
  facebook: Maybe<Scalars['String']>;
  geopoint: Maybe<Scalars['geography']>;
  id: Scalars['Int'];
  instagram: Maybe<Scalars['String']>;
  is_featured: Maybe<Scalars['Boolean']>;
  link: Maybe<Scalars['String']>;
  location_json: Maybe<Scalars['jsonb']>;
  name: Scalars['String'];
  notes: Maybe<Scalars['String']>;
  overview: Maybe<Scalars['String']>;
  /** An object relationship */
  parent_event: Maybe<Events>;
  parent_event_id: Maybe<Scalars['Int']>;
  price: Maybe<Scalars['numeric']>;
  size: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  start_date: Maybe<Scalars['date']>;
  start_time: Maybe<Scalars['time']>;
  status: Scalars['String'];
  telegram: Maybe<Scalars['String']>;
  timezone: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  types: Maybe<Scalars['jsonb']>;
  updated_at: Scalars['timestamptz'];
  venue_name: Maybe<Scalars['String']>;
};


/** columns and relationships of "events" */
export type EventsBannerArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "events" */
export type EventsEvent_OrganizationArgs = {
  distinct_on: InputMaybe<Array<Event_Organization_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Event_Organization_Order_By>>;
  where: InputMaybe<Event_Organization_Bool_Exp>;
};


/** columns and relationships of "events" */
export type EventsEvent_Organization_AggregateArgs = {
  distinct_on: InputMaybe<Array<Event_Organization_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Event_Organization_Order_By>>;
  where: InputMaybe<Event_Organization_Bool_Exp>;
};


/** columns and relationships of "events" */
export type EventsEvent_PersonArgs = {
  distinct_on: InputMaybe<Array<Event_Person_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Event_Person_Order_By>>;
  where: InputMaybe<Event_Person_Bool_Exp>;
};


/** columns and relationships of "events" */
export type EventsEvent_Person_AggregateArgs = {
  distinct_on: InputMaybe<Array<Event_Person_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Event_Person_Order_By>>;
  where: InputMaybe<Event_Person_Bool_Exp>;
};


/** columns and relationships of "events" */
export type EventsLocation_JsonArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "events" */
export type EventsTypesArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "events" */
export type Events_Aggregate = {
  __typename?: 'events_aggregate';
  aggregate: Maybe<Events_Aggregate_Fields>;
  nodes: Array<Events>;
};

/** aggregate fields of "events" */
export type Events_Aggregate_Fields = {
  __typename?: 'events_aggregate_fields';
  avg: Maybe<Events_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Events_Max_Fields>;
  min: Maybe<Events_Min_Fields>;
  stddev: Maybe<Events_Stddev_Fields>;
  stddev_pop: Maybe<Events_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Events_Stddev_Samp_Fields>;
  sum: Maybe<Events_Sum_Fields>;
  var_pop: Maybe<Events_Var_Pop_Fields>;
  var_samp: Maybe<Events_Var_Samp_Fields>;
  variance: Maybe<Events_Variance_Fields>;
};


/** aggregate fields of "events" */
export type Events_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Events_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Events_Append_Input = {
  banner: InputMaybe<Scalars['jsonb']>;
  location_json: InputMaybe<Scalars['jsonb']>;
  types: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Events_Avg_Fields = {
  __typename?: 'events_avg_fields';
  id: Maybe<Scalars['Float']>;
  parent_event_id: Maybe<Scalars['Float']>;
  price: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  _and: InputMaybe<Array<Events_Bool_Exp>>;
  _not: InputMaybe<Events_Bool_Exp>;
  _or: InputMaybe<Array<Events_Bool_Exp>>;
  banner: InputMaybe<Jsonb_Comparison_Exp>;
  created_at: InputMaybe<Timestamptz_Comparison_Exp>;
  discord: InputMaybe<String_Comparison_Exp>;
  end_date: InputMaybe<Date_Comparison_Exp>;
  end_time: InputMaybe<Time_Comparison_Exp>;
  event_organization: InputMaybe<Event_Organization_Bool_Exp>;
  event_person: InputMaybe<Event_Person_Bool_Exp>;
  facebook: InputMaybe<String_Comparison_Exp>;
  geopoint: InputMaybe<Geography_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  instagram: InputMaybe<String_Comparison_Exp>;
  is_featured: InputMaybe<Boolean_Comparison_Exp>;
  link: InputMaybe<String_Comparison_Exp>;
  location_json: InputMaybe<Jsonb_Comparison_Exp>;
  name: InputMaybe<String_Comparison_Exp>;
  notes: InputMaybe<String_Comparison_Exp>;
  overview: InputMaybe<String_Comparison_Exp>;
  parent_event: InputMaybe<Events_Bool_Exp>;
  parent_event_id: InputMaybe<Int_Comparison_Exp>;
  price: InputMaybe<Numeric_Comparison_Exp>;
  size: InputMaybe<String_Comparison_Exp>;
  slug: InputMaybe<String_Comparison_Exp>;
  start_date: InputMaybe<Date_Comparison_Exp>;
  start_time: InputMaybe<Time_Comparison_Exp>;
  status: InputMaybe<String_Comparison_Exp>;
  telegram: InputMaybe<String_Comparison_Exp>;
  timezone: InputMaybe<String_Comparison_Exp>;
  twitter: InputMaybe<String_Comparison_Exp>;
  types: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at: InputMaybe<Timestamptz_Comparison_Exp>;
  venue_name: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "events" */
export enum Events_Constraint {
  /** unique or primary key constraint */
  EventsPkey = 'events_pkey',
  /** unique or primary key constraint */
  EventsSlugKey = 'events_slug_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Events_Delete_At_Path_Input = {
  banner: InputMaybe<Array<Scalars['String']>>;
  location_json: InputMaybe<Array<Scalars['String']>>;
  types: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Events_Delete_Elem_Input = {
  banner: InputMaybe<Scalars['Int']>;
  location_json: InputMaybe<Scalars['Int']>;
  types: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Events_Delete_Key_Input = {
  banner: InputMaybe<Scalars['String']>;
  location_json: InputMaybe<Scalars['String']>;
  types: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "events" */
export type Events_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
  parent_event_id: InputMaybe<Scalars['Int']>;
  price: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "events" */
export type Events_Insert_Input = {
  banner: InputMaybe<Scalars['jsonb']>;
  created_at: InputMaybe<Scalars['timestamptz']>;
  discord: InputMaybe<Scalars['String']>;
  end_date: InputMaybe<Scalars['date']>;
  end_time: InputMaybe<Scalars['time']>;
  event_organization: InputMaybe<Event_Organization_Arr_Rel_Insert_Input>;
  event_person: InputMaybe<Event_Person_Arr_Rel_Insert_Input>;
  facebook: InputMaybe<Scalars['String']>;
  geopoint: InputMaybe<Scalars['geography']>;
  id: InputMaybe<Scalars['Int']>;
  instagram: InputMaybe<Scalars['String']>;
  is_featured: InputMaybe<Scalars['Boolean']>;
  link: InputMaybe<Scalars['String']>;
  location_json: InputMaybe<Scalars['jsonb']>;
  name: InputMaybe<Scalars['String']>;
  notes: InputMaybe<Scalars['String']>;
  overview: InputMaybe<Scalars['String']>;
  parent_event: InputMaybe<Events_Obj_Rel_Insert_Input>;
  parent_event_id: InputMaybe<Scalars['Int']>;
  price: InputMaybe<Scalars['numeric']>;
  size: InputMaybe<Scalars['String']>;
  slug: InputMaybe<Scalars['String']>;
  start_date: InputMaybe<Scalars['date']>;
  start_time: InputMaybe<Scalars['time']>;
  status: InputMaybe<Scalars['String']>;
  telegram: InputMaybe<Scalars['String']>;
  timezone: InputMaybe<Scalars['String']>;
  twitter: InputMaybe<Scalars['String']>;
  types: InputMaybe<Scalars['jsonb']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  venue_name: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Events_Max_Fields = {
  __typename?: 'events_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  discord: Maybe<Scalars['String']>;
  end_date: Maybe<Scalars['date']>;
  facebook: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  instagram: Maybe<Scalars['String']>;
  link: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  notes: Maybe<Scalars['String']>;
  overview: Maybe<Scalars['String']>;
  parent_event_id: Maybe<Scalars['Int']>;
  price: Maybe<Scalars['numeric']>;
  size: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  start_date: Maybe<Scalars['date']>;
  status: Maybe<Scalars['String']>;
  telegram: Maybe<Scalars['String']>;
  timezone: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  venue_name: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Events_Min_Fields = {
  __typename?: 'events_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  discord: Maybe<Scalars['String']>;
  end_date: Maybe<Scalars['date']>;
  facebook: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  instagram: Maybe<Scalars['String']>;
  link: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  notes: Maybe<Scalars['String']>;
  overview: Maybe<Scalars['String']>;
  parent_event_id: Maybe<Scalars['Int']>;
  price: Maybe<Scalars['numeric']>;
  size: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  start_date: Maybe<Scalars['date']>;
  status: Maybe<Scalars['String']>;
  telegram: Maybe<Scalars['String']>;
  timezone: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  venue_name: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "events" */
export type Events_Mutation_Response = {
  __typename?: 'events_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Events>;
};

/** input type for inserting object relation for remote table "events" */
export type Events_Obj_Rel_Insert_Input = {
  data: Events_Insert_Input;
  /** upsert condition */
  on_conflict: InputMaybe<Events_On_Conflict>;
};

/** on_conflict condition type for table "events" */
export type Events_On_Conflict = {
  constraint: Events_Constraint;
  update_columns: Array<Events_Update_Column>;
  where: InputMaybe<Events_Bool_Exp>;
};

/** Ordering options when selecting data from "events". */
export type Events_Order_By = {
  banner: InputMaybe<Order_By>;
  created_at: InputMaybe<Order_By>;
  discord: InputMaybe<Order_By>;
  end_date: InputMaybe<Order_By>;
  end_time: InputMaybe<Order_By>;
  event_organization_aggregate: InputMaybe<Event_Organization_Aggregate_Order_By>;
  event_person_aggregate: InputMaybe<Event_Person_Aggregate_Order_By>;
  facebook: InputMaybe<Order_By>;
  geopoint: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  instagram: InputMaybe<Order_By>;
  is_featured: InputMaybe<Order_By>;
  link: InputMaybe<Order_By>;
  location_json: InputMaybe<Order_By>;
  name: InputMaybe<Order_By>;
  notes: InputMaybe<Order_By>;
  overview: InputMaybe<Order_By>;
  parent_event: InputMaybe<Events_Order_By>;
  parent_event_id: InputMaybe<Order_By>;
  price: InputMaybe<Order_By>;
  size: InputMaybe<Order_By>;
  slug: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  start_time: InputMaybe<Order_By>;
  status: InputMaybe<Order_By>;
  telegram: InputMaybe<Order_By>;
  timezone: InputMaybe<Order_By>;
  twitter: InputMaybe<Order_By>;
  types: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
  venue_name: InputMaybe<Order_By>;
};

/** primary key columns input for table: events */
export type Events_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Events_Prepend_Input = {
  banner: InputMaybe<Scalars['jsonb']>;
  location_json: InputMaybe<Scalars['jsonb']>;
  types: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "events" */
export enum Events_Select_Column {
  /** column name */
  Banner = 'banner',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Discord = 'discord',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  Facebook = 'facebook',
  /** column name */
  Geopoint = 'geopoint',
  /** column name */
  Id = 'id',
  /** column name */
  Instagram = 'instagram',
  /** column name */
  IsFeatured = 'is_featured',
  /** column name */
  Link = 'link',
  /** column name */
  LocationJson = 'location_json',
  /** column name */
  Name = 'name',
  /** column name */
  Notes = 'notes',
  /** column name */
  Overview = 'overview',
  /** column name */
  ParentEventId = 'parent_event_id',
  /** column name */
  Price = 'price',
  /** column name */
  Size = 'size',
  /** column name */
  Slug = 'slug',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  Status = 'status',
  /** column name */
  Telegram = 'telegram',
  /** column name */
  Timezone = 'timezone',
  /** column name */
  Twitter = 'twitter',
  /** column name */
  Types = 'types',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VenueName = 'venue_name'
}

/** input type for updating data in table "events" */
export type Events_Set_Input = {
  banner: InputMaybe<Scalars['jsonb']>;
  created_at: InputMaybe<Scalars['timestamptz']>;
  discord: InputMaybe<Scalars['String']>;
  end_date: InputMaybe<Scalars['date']>;
  end_time: InputMaybe<Scalars['time']>;
  facebook: InputMaybe<Scalars['String']>;
  geopoint: InputMaybe<Scalars['geography']>;
  id: InputMaybe<Scalars['Int']>;
  instagram: InputMaybe<Scalars['String']>;
  is_featured: InputMaybe<Scalars['Boolean']>;
  link: InputMaybe<Scalars['String']>;
  location_json: InputMaybe<Scalars['jsonb']>;
  name: InputMaybe<Scalars['String']>;
  notes: InputMaybe<Scalars['String']>;
  overview: InputMaybe<Scalars['String']>;
  parent_event_id: InputMaybe<Scalars['Int']>;
  price: InputMaybe<Scalars['numeric']>;
  size: InputMaybe<Scalars['String']>;
  slug: InputMaybe<Scalars['String']>;
  start_date: InputMaybe<Scalars['date']>;
  start_time: InputMaybe<Scalars['time']>;
  status: InputMaybe<Scalars['String']>;
  telegram: InputMaybe<Scalars['String']>;
  timezone: InputMaybe<Scalars['String']>;
  twitter: InputMaybe<Scalars['String']>;
  types: InputMaybe<Scalars['jsonb']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  venue_name: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Events_Stddev_Fields = {
  __typename?: 'events_stddev_fields';
  id: Maybe<Scalars['Float']>;
  parent_event_id: Maybe<Scalars['Float']>;
  price: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Events_Stddev_Pop_Fields = {
  __typename?: 'events_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
  parent_event_id: Maybe<Scalars['Float']>;
  price: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Events_Stddev_Samp_Fields = {
  __typename?: 'events_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
  parent_event_id: Maybe<Scalars['Float']>;
  price: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Events_Sum_Fields = {
  __typename?: 'events_sum_fields';
  id: Maybe<Scalars['Int']>;
  parent_event_id: Maybe<Scalars['Int']>;
  price: Maybe<Scalars['numeric']>;
};

/** update columns of table "events" */
export enum Events_Update_Column {
  /** column name */
  Banner = 'banner',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Discord = 'discord',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  Facebook = 'facebook',
  /** column name */
  Geopoint = 'geopoint',
  /** column name */
  Id = 'id',
  /** column name */
  Instagram = 'instagram',
  /** column name */
  IsFeatured = 'is_featured',
  /** column name */
  Link = 'link',
  /** column name */
  LocationJson = 'location_json',
  /** column name */
  Name = 'name',
  /** column name */
  Notes = 'notes',
  /** column name */
  Overview = 'overview',
  /** column name */
  ParentEventId = 'parent_event_id',
  /** column name */
  Price = 'price',
  /** column name */
  Size = 'size',
  /** column name */
  Slug = 'slug',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  Status = 'status',
  /** column name */
  Telegram = 'telegram',
  /** column name */
  Timezone = 'timezone',
  /** column name */
  Twitter = 'twitter',
  /** column name */
  Types = 'types',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VenueName = 'venue_name'
}

/** aggregate var_pop on columns */
export type Events_Var_Pop_Fields = {
  __typename?: 'events_var_pop_fields';
  id: Maybe<Scalars['Float']>;
  parent_event_id: Maybe<Scalars['Float']>;
  price: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Events_Var_Samp_Fields = {
  __typename?: 'events_var_samp_fields';
  id: Maybe<Scalars['Float']>;
  parent_event_id: Maybe<Scalars['Float']>;
  price: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Events_Variance_Fields = {
  __typename?: 'events_variance_fields';
  id: Maybe<Scalars['Float']>;
  parent_event_id: Maybe<Scalars['Float']>;
  price: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq: InputMaybe<Scalars['float8']>;
  _gt: InputMaybe<Scalars['float8']>;
  _gte: InputMaybe<Scalars['float8']>;
  _in: InputMaybe<Array<Scalars['float8']>>;
  _is_null: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['float8']>;
  _lte: InputMaybe<Scalars['float8']>;
  _neq: InputMaybe<Scalars['float8']>;
  _nin: InputMaybe<Array<Scalars['float8']>>;
};

/** columns and relationships of "follows" */
export type Follows = {
  __typename?: 'follows';
  created_by_user_id: Scalars['Int'];
  /** An object relationship */
  follow_member: Maybe<List_Members>;
  id: Scalars['Int'];
  /** An object relationship */
  list: Maybe<Lists>;
  list_id: Maybe<Scalars['Int']>;
  resource_id: Scalars['Int'];
  resource_type: Scalars['String'];
};

/** aggregated selection of "follows" */
export type Follows_Aggregate = {
  __typename?: 'follows_aggregate';
  aggregate: Maybe<Follows_Aggregate_Fields>;
  nodes: Array<Follows>;
};

/** aggregate fields of "follows" */
export type Follows_Aggregate_Fields = {
  __typename?: 'follows_aggregate_fields';
  avg: Maybe<Follows_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Follows_Max_Fields>;
  min: Maybe<Follows_Min_Fields>;
  stddev: Maybe<Follows_Stddev_Fields>;
  stddev_pop: Maybe<Follows_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Follows_Stddev_Samp_Fields>;
  sum: Maybe<Follows_Sum_Fields>;
  var_pop: Maybe<Follows_Var_Pop_Fields>;
  var_samp: Maybe<Follows_Var_Samp_Fields>;
  variance: Maybe<Follows_Variance_Fields>;
};


/** aggregate fields of "follows" */
export type Follows_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Follows_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Follows_Avg_Fields = {
  __typename?: 'follows_avg_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "follows". All fields are combined with a logical 'AND'. */
export type Follows_Bool_Exp = {
  _and: InputMaybe<Array<Follows_Bool_Exp>>;
  _not: InputMaybe<Follows_Bool_Exp>;
  _or: InputMaybe<Array<Follows_Bool_Exp>>;
  created_by_user_id: InputMaybe<Int_Comparison_Exp>;
  follow_member: InputMaybe<List_Members_Bool_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  list: InputMaybe<Lists_Bool_Exp>;
  list_id: InputMaybe<Int_Comparison_Exp>;
  resource_id: InputMaybe<Int_Comparison_Exp>;
  resource_type: InputMaybe<String_Comparison_Exp>;
};

/** columns and relationships of "follows_companies" */
export type Follows_Companies = {
  __typename?: 'follows_companies';
  /** An object relationship */
  company: Maybe<Companies>;
  created_by_user_id: Maybe<Scalars['Int']>;
  /** An object relationship */
  follow_member: Maybe<List_Members>;
  id: Maybe<Scalars['Int']>;
  /** An object relationship */
  list: Maybe<Lists>;
  list_id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
};

/** aggregated selection of "follows_companies" */
export type Follows_Companies_Aggregate = {
  __typename?: 'follows_companies_aggregate';
  aggregate: Maybe<Follows_Companies_Aggregate_Fields>;
  nodes: Array<Follows_Companies>;
};

/** aggregate fields of "follows_companies" */
export type Follows_Companies_Aggregate_Fields = {
  __typename?: 'follows_companies_aggregate_fields';
  avg: Maybe<Follows_Companies_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Follows_Companies_Max_Fields>;
  min: Maybe<Follows_Companies_Min_Fields>;
  stddev: Maybe<Follows_Companies_Stddev_Fields>;
  stddev_pop: Maybe<Follows_Companies_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Follows_Companies_Stddev_Samp_Fields>;
  sum: Maybe<Follows_Companies_Sum_Fields>;
  var_pop: Maybe<Follows_Companies_Var_Pop_Fields>;
  var_samp: Maybe<Follows_Companies_Var_Samp_Fields>;
  variance: Maybe<Follows_Companies_Variance_Fields>;
};


/** aggregate fields of "follows_companies" */
export type Follows_Companies_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Follows_Companies_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "follows_companies" */
export type Follows_Companies_Aggregate_Order_By = {
  avg: InputMaybe<Follows_Companies_Avg_Order_By>;
  count: InputMaybe<Order_By>;
  max: InputMaybe<Follows_Companies_Max_Order_By>;
  min: InputMaybe<Follows_Companies_Min_Order_By>;
  stddev: InputMaybe<Follows_Companies_Stddev_Order_By>;
  stddev_pop: InputMaybe<Follows_Companies_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Follows_Companies_Stddev_Samp_Order_By>;
  sum: InputMaybe<Follows_Companies_Sum_Order_By>;
  var_pop: InputMaybe<Follows_Companies_Var_Pop_Order_By>;
  var_samp: InputMaybe<Follows_Companies_Var_Samp_Order_By>;
  variance: InputMaybe<Follows_Companies_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "follows_companies" */
export type Follows_Companies_Arr_Rel_Insert_Input = {
  data: Array<Follows_Companies_Insert_Input>;
};

/** aggregate avg on columns */
export type Follows_Companies_Avg_Fields = {
  __typename?: 'follows_companies_avg_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "follows_companies" */
export type Follows_Companies_Avg_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "follows_companies". All fields are combined with a logical 'AND'. */
export type Follows_Companies_Bool_Exp = {
  _and: InputMaybe<Array<Follows_Companies_Bool_Exp>>;
  _not: InputMaybe<Follows_Companies_Bool_Exp>;
  _or: InputMaybe<Array<Follows_Companies_Bool_Exp>>;
  company: InputMaybe<Companies_Bool_Exp>;
  created_by_user_id: InputMaybe<Int_Comparison_Exp>;
  follow_member: InputMaybe<List_Members_Bool_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  list: InputMaybe<Lists_Bool_Exp>;
  list_id: InputMaybe<Int_Comparison_Exp>;
  resource_id: InputMaybe<Int_Comparison_Exp>;
  resource_type: InputMaybe<String_Comparison_Exp>;
};

/** input type for incrementing numeric columns in table "follows_companies" */
export type Follows_Companies_Inc_Input = {
  created_by_user_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  list_id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "follows_companies" */
export type Follows_Companies_Insert_Input = {
  company: InputMaybe<Companies_Obj_Rel_Insert_Input>;
  created_by_user_id: InputMaybe<Scalars['Int']>;
  follow_member: InputMaybe<List_Members_Obj_Rel_Insert_Input>;
  id: InputMaybe<Scalars['Int']>;
  list: InputMaybe<Lists_Obj_Rel_Insert_Input>;
  list_id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  resource_type: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Follows_Companies_Max_Fields = {
  __typename?: 'follows_companies_max_fields';
  created_by_user_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  list_id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "follows_companies" */
export type Follows_Companies_Max_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  resource_type: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Follows_Companies_Min_Fields = {
  __typename?: 'follows_companies_min_fields';
  created_by_user_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  list_id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "follows_companies" */
export type Follows_Companies_Min_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  resource_type: InputMaybe<Order_By>;
};

/** response of any mutation on the table "follows_companies" */
export type Follows_Companies_Mutation_Response = {
  __typename?: 'follows_companies_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Follows_Companies>;
};

/** Ordering options when selecting data from "follows_companies". */
export type Follows_Companies_Order_By = {
  company: InputMaybe<Companies_Order_By>;
  created_by_user_id: InputMaybe<Order_By>;
  follow_member: InputMaybe<List_Members_Order_By>;
  id: InputMaybe<Order_By>;
  list: InputMaybe<Lists_Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  resource_type: InputMaybe<Order_By>;
};

/** select columns of table "follows_companies" */
export enum Follows_Companies_Select_Column {
  /** column name */
  CreatedByUserId = 'created_by_user_id',
  /** column name */
  Id = 'id',
  /** column name */
  ListId = 'list_id',
  /** column name */
  ResourceId = 'resource_id',
  /** column name */
  ResourceType = 'resource_type'
}

/** input type for updating data in table "follows_companies" */
export type Follows_Companies_Set_Input = {
  created_by_user_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  list_id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  resource_type: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Follows_Companies_Stddev_Fields = {
  __typename?: 'follows_companies_stddev_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "follows_companies" */
export type Follows_Companies_Stddev_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Follows_Companies_Stddev_Pop_Fields = {
  __typename?: 'follows_companies_stddev_pop_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "follows_companies" */
export type Follows_Companies_Stddev_Pop_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Follows_Companies_Stddev_Samp_Fields = {
  __typename?: 'follows_companies_stddev_samp_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "follows_companies" */
export type Follows_Companies_Stddev_Samp_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Follows_Companies_Sum_Fields = {
  __typename?: 'follows_companies_sum_fields';
  created_by_user_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  list_id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "follows_companies" */
export type Follows_Companies_Sum_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Follows_Companies_Var_Pop_Fields = {
  __typename?: 'follows_companies_var_pop_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "follows_companies" */
export type Follows_Companies_Var_Pop_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Follows_Companies_Var_Samp_Fields = {
  __typename?: 'follows_companies_var_samp_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "follows_companies" */
export type Follows_Companies_Var_Samp_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Follows_Companies_Variance_Fields = {
  __typename?: 'follows_companies_variance_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "follows_companies" */
export type Follows_Companies_Variance_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
};

/** unique or primary key constraints on table "follows" */
export enum Follows_Constraint {
  /** unique or primary key constraint */
  FollowsPkey = 'follows_pkey',
  /** unique or primary key constraint */
  FollowsResourceTypeResourceIdListIdKey = 'follows_resource_type_resource_id_list_id_key'
}

/** input type for incrementing numeric columns in table "follows" */
export type Follows_Inc_Input = {
  created_by_user_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  list_id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "follows" */
export type Follows_Insert_Input = {
  created_by_user_id: InputMaybe<Scalars['Int']>;
  follow_member: InputMaybe<List_Members_Obj_Rel_Insert_Input>;
  id: InputMaybe<Scalars['Int']>;
  list: InputMaybe<Lists_Obj_Rel_Insert_Input>;
  list_id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  resource_type: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Follows_Max_Fields = {
  __typename?: 'follows_max_fields';
  created_by_user_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  list_id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Follows_Min_Fields = {
  __typename?: 'follows_min_fields';
  created_by_user_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  list_id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "follows" */
export type Follows_Mutation_Response = {
  __typename?: 'follows_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Follows>;
};

/** on_conflict condition type for table "follows" */
export type Follows_On_Conflict = {
  constraint: Follows_Constraint;
  update_columns: Array<Follows_Update_Column>;
  where: InputMaybe<Follows_Bool_Exp>;
};

/** Ordering options when selecting data from "follows". */
export type Follows_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  follow_member: InputMaybe<List_Members_Order_By>;
  id: InputMaybe<Order_By>;
  list: InputMaybe<Lists_Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  resource_type: InputMaybe<Order_By>;
};

/** primary key columns input for table: follows */
export type Follows_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "follows" */
export enum Follows_Select_Column {
  /** column name */
  CreatedByUserId = 'created_by_user_id',
  /** column name */
  Id = 'id',
  /** column name */
  ListId = 'list_id',
  /** column name */
  ResourceId = 'resource_id',
  /** column name */
  ResourceType = 'resource_type'
}

/** input type for updating data in table "follows" */
export type Follows_Set_Input = {
  created_by_user_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  list_id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  resource_type: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Follows_Stddev_Fields = {
  __typename?: 'follows_stddev_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Follows_Stddev_Pop_Fields = {
  __typename?: 'follows_stddev_pop_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Follows_Stddev_Samp_Fields = {
  __typename?: 'follows_stddev_samp_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Follows_Sum_Fields = {
  __typename?: 'follows_sum_fields';
  created_by_user_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  list_id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
};

/** update columns of table "follows" */
export enum Follows_Update_Column {
  /** column name */
  CreatedByUserId = 'created_by_user_id',
  /** column name */
  Id = 'id',
  /** column name */
  ListId = 'list_id',
  /** column name */
  ResourceId = 'resource_id',
  /** column name */
  ResourceType = 'resource_type'
}

/** aggregate var_pop on columns */
export type Follows_Var_Pop_Fields = {
  __typename?: 'follows_var_pop_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Follows_Var_Samp_Fields = {
  __typename?: 'follows_var_samp_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Follows_Variance_Fields = {
  __typename?: 'follows_variance_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** columns and relationships of "follows_vc_firms" */
export type Follows_Vc_Firms = {
  __typename?: 'follows_vc_firms';
  created_by_user_id: Maybe<Scalars['Int']>;
  /** An object relationship */
  follow_member: Maybe<List_Members>;
  id: Maybe<Scalars['Int']>;
  /** An object relationship */
  list: Maybe<Lists>;
  list_id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
  /** An object relationship */
  vc_firm: Maybe<Vc_Firms>;
};

/** aggregated selection of "follows_vc_firms" */
export type Follows_Vc_Firms_Aggregate = {
  __typename?: 'follows_vc_firms_aggregate';
  aggregate: Maybe<Follows_Vc_Firms_Aggregate_Fields>;
  nodes: Array<Follows_Vc_Firms>;
};

/** aggregate fields of "follows_vc_firms" */
export type Follows_Vc_Firms_Aggregate_Fields = {
  __typename?: 'follows_vc_firms_aggregate_fields';
  avg: Maybe<Follows_Vc_Firms_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Follows_Vc_Firms_Max_Fields>;
  min: Maybe<Follows_Vc_Firms_Min_Fields>;
  stddev: Maybe<Follows_Vc_Firms_Stddev_Fields>;
  stddev_pop: Maybe<Follows_Vc_Firms_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Follows_Vc_Firms_Stddev_Samp_Fields>;
  sum: Maybe<Follows_Vc_Firms_Sum_Fields>;
  var_pop: Maybe<Follows_Vc_Firms_Var_Pop_Fields>;
  var_samp: Maybe<Follows_Vc_Firms_Var_Samp_Fields>;
  variance: Maybe<Follows_Vc_Firms_Variance_Fields>;
};


/** aggregate fields of "follows_vc_firms" */
export type Follows_Vc_Firms_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Follows_Vc_Firms_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "follows_vc_firms" */
export type Follows_Vc_Firms_Aggregate_Order_By = {
  avg: InputMaybe<Follows_Vc_Firms_Avg_Order_By>;
  count: InputMaybe<Order_By>;
  max: InputMaybe<Follows_Vc_Firms_Max_Order_By>;
  min: InputMaybe<Follows_Vc_Firms_Min_Order_By>;
  stddev: InputMaybe<Follows_Vc_Firms_Stddev_Order_By>;
  stddev_pop: InputMaybe<Follows_Vc_Firms_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Follows_Vc_Firms_Stddev_Samp_Order_By>;
  sum: InputMaybe<Follows_Vc_Firms_Sum_Order_By>;
  var_pop: InputMaybe<Follows_Vc_Firms_Var_Pop_Order_By>;
  var_samp: InputMaybe<Follows_Vc_Firms_Var_Samp_Order_By>;
  variance: InputMaybe<Follows_Vc_Firms_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "follows_vc_firms" */
export type Follows_Vc_Firms_Arr_Rel_Insert_Input = {
  data: Array<Follows_Vc_Firms_Insert_Input>;
};

/** aggregate avg on columns */
export type Follows_Vc_Firms_Avg_Fields = {
  __typename?: 'follows_vc_firms_avg_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "follows_vc_firms" */
export type Follows_Vc_Firms_Avg_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "follows_vc_firms". All fields are combined with a logical 'AND'. */
export type Follows_Vc_Firms_Bool_Exp = {
  _and: InputMaybe<Array<Follows_Vc_Firms_Bool_Exp>>;
  _not: InputMaybe<Follows_Vc_Firms_Bool_Exp>;
  _or: InputMaybe<Array<Follows_Vc_Firms_Bool_Exp>>;
  created_by_user_id: InputMaybe<Int_Comparison_Exp>;
  follow_member: InputMaybe<List_Members_Bool_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  list: InputMaybe<Lists_Bool_Exp>;
  list_id: InputMaybe<Int_Comparison_Exp>;
  resource_id: InputMaybe<Int_Comparison_Exp>;
  resource_type: InputMaybe<String_Comparison_Exp>;
  vc_firm: InputMaybe<Vc_Firms_Bool_Exp>;
};

/** input type for incrementing numeric columns in table "follows_vc_firms" */
export type Follows_Vc_Firms_Inc_Input = {
  created_by_user_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  list_id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "follows_vc_firms" */
export type Follows_Vc_Firms_Insert_Input = {
  created_by_user_id: InputMaybe<Scalars['Int']>;
  follow_member: InputMaybe<List_Members_Obj_Rel_Insert_Input>;
  id: InputMaybe<Scalars['Int']>;
  list: InputMaybe<Lists_Obj_Rel_Insert_Input>;
  list_id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  resource_type: InputMaybe<Scalars['String']>;
  vc_firm: InputMaybe<Vc_Firms_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Follows_Vc_Firms_Max_Fields = {
  __typename?: 'follows_vc_firms_max_fields';
  created_by_user_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  list_id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "follows_vc_firms" */
export type Follows_Vc_Firms_Max_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  resource_type: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Follows_Vc_Firms_Min_Fields = {
  __typename?: 'follows_vc_firms_min_fields';
  created_by_user_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  list_id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "follows_vc_firms" */
export type Follows_Vc_Firms_Min_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  resource_type: InputMaybe<Order_By>;
};

/** response of any mutation on the table "follows_vc_firms" */
export type Follows_Vc_Firms_Mutation_Response = {
  __typename?: 'follows_vc_firms_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Follows_Vc_Firms>;
};

/** Ordering options when selecting data from "follows_vc_firms". */
export type Follows_Vc_Firms_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  follow_member: InputMaybe<List_Members_Order_By>;
  id: InputMaybe<Order_By>;
  list: InputMaybe<Lists_Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  resource_type: InputMaybe<Order_By>;
  vc_firm: InputMaybe<Vc_Firms_Order_By>;
};

/** select columns of table "follows_vc_firms" */
export enum Follows_Vc_Firms_Select_Column {
  /** column name */
  CreatedByUserId = 'created_by_user_id',
  /** column name */
  Id = 'id',
  /** column name */
  ListId = 'list_id',
  /** column name */
  ResourceId = 'resource_id',
  /** column name */
  ResourceType = 'resource_type'
}

/** input type for updating data in table "follows_vc_firms" */
export type Follows_Vc_Firms_Set_Input = {
  created_by_user_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  list_id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  resource_type: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Follows_Vc_Firms_Stddev_Fields = {
  __typename?: 'follows_vc_firms_stddev_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "follows_vc_firms" */
export type Follows_Vc_Firms_Stddev_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Follows_Vc_Firms_Stddev_Pop_Fields = {
  __typename?: 'follows_vc_firms_stddev_pop_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "follows_vc_firms" */
export type Follows_Vc_Firms_Stddev_Pop_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Follows_Vc_Firms_Stddev_Samp_Fields = {
  __typename?: 'follows_vc_firms_stddev_samp_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "follows_vc_firms" */
export type Follows_Vc_Firms_Stddev_Samp_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Follows_Vc_Firms_Sum_Fields = {
  __typename?: 'follows_vc_firms_sum_fields';
  created_by_user_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  list_id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "follows_vc_firms" */
export type Follows_Vc_Firms_Sum_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Follows_Vc_Firms_Var_Pop_Fields = {
  __typename?: 'follows_vc_firms_var_pop_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "follows_vc_firms" */
export type Follows_Vc_Firms_Var_Pop_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Follows_Vc_Firms_Var_Samp_Fields = {
  __typename?: 'follows_vc_firms_var_samp_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "follows_vc_firms" */
export type Follows_Vc_Firms_Var_Samp_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Follows_Vc_Firms_Variance_Fields = {
  __typename?: 'follows_vc_firms_variance_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "follows_vc_firms" */
export type Follows_Vc_Firms_Variance_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
};

export type Geography_Cast_Exp = {
  geometry: InputMaybe<Geometry_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "geography". All fields are combined with logical 'AND'. */
export type Geography_Comparison_Exp = {
  _cast: InputMaybe<Geography_Cast_Exp>;
  _eq: InputMaybe<Scalars['geography']>;
  _gt: InputMaybe<Scalars['geography']>;
  _gte: InputMaybe<Scalars['geography']>;
  _in: InputMaybe<Array<Scalars['geography']>>;
  _is_null: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['geography']>;
  _lte: InputMaybe<Scalars['geography']>;
  _neq: InputMaybe<Scalars['geography']>;
  _nin: InputMaybe<Array<Scalars['geography']>>;
  /** is the column within a given distance from the given geography value */
  _st_d_within: InputMaybe<St_D_Within_Geography_Input>;
  /** does the column spatially intersect the given geography value */
  _st_intersects: InputMaybe<Scalars['geography']>;
};

export type Geometry_Cast_Exp = {
  geography: InputMaybe<Geography_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "geometry". All fields are combined with logical 'AND'. */
export type Geometry_Comparison_Exp = {
  _cast: InputMaybe<Geometry_Cast_Exp>;
  _eq: InputMaybe<Scalars['geometry']>;
  _gt: InputMaybe<Scalars['geometry']>;
  _gte: InputMaybe<Scalars['geometry']>;
  _in: InputMaybe<Array<Scalars['geometry']>>;
  _is_null: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['geometry']>;
  _lte: InputMaybe<Scalars['geometry']>;
  _neq: InputMaybe<Scalars['geometry']>;
  _nin: InputMaybe<Array<Scalars['geometry']>>;
  /** is the column within a given 3D distance from the given geometry value */
  _st_3d_d_within: InputMaybe<St_D_Within_Input>;
  /** does the column spatially intersect the given geometry value in 3D */
  _st_3d_intersects: InputMaybe<Scalars['geometry']>;
  /** does the column contain the given geometry value */
  _st_contains: InputMaybe<Scalars['geometry']>;
  /** does the column cross the given geometry value */
  _st_crosses: InputMaybe<Scalars['geometry']>;
  /** is the column within a given distance from the given geometry value */
  _st_d_within: InputMaybe<St_D_Within_Input>;
  /** is the column equal to given geometry value (directionality is ignored) */
  _st_equals: InputMaybe<Scalars['geometry']>;
  /** does the column spatially intersect the given geometry value */
  _st_intersects: InputMaybe<Scalars['geometry']>;
  /** does the column 'spatially overlap' (intersect but not completely contain) the given geometry value */
  _st_overlaps: InputMaybe<Scalars['geometry']>;
  /** does the column have atleast one point in common with the given geometry value */
  _st_touches: InputMaybe<Scalars['geometry']>;
  /** is the column contained in the given geometry value */
  _st_within: InputMaybe<Scalars['geometry']>;
};

/** columns and relationships of "investment_rounds" */
export type Investment_Rounds = {
  __typename?: 'investment_rounds';
  amount: Maybe<Scalars['numeric']>;
  /** An object relationship */
  company: Maybe<Companies>;
  company_id: Maybe<Scalars['Int']>;
  currency: Maybe<Scalars['String']>;
  external_id: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An array relationship */
  investments: Array<Investments>;
  /** An aggregate relationship */
  investments_aggregate: Investments_Aggregate;
  round: Maybe<Scalars['String']>;
  round_date: Maybe<Scalars['String']>;
  status: Scalars['String'];
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
  currency: InputMaybe<String_Comparison_Exp>;
  external_id: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  investments: InputMaybe<Investments_Bool_Exp>;
  round: InputMaybe<String_Comparison_Exp>;
  round_date: InputMaybe<String_Comparison_Exp>;
  status: InputMaybe<String_Comparison_Exp>;
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
  currency: InputMaybe<Scalars['String']>;
  external_id: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  investments: InputMaybe<Investments_Arr_Rel_Insert_Input>;
  round: InputMaybe<Scalars['String']>;
  round_date: InputMaybe<Scalars['String']>;
  status: InputMaybe<Scalars['String']>;
  valuation: InputMaybe<Scalars['numeric']>;
};

/** aggregate max on columns */
export type Investment_Rounds_Max_Fields = {
  __typename?: 'investment_rounds_max_fields';
  amount: Maybe<Scalars['numeric']>;
  company_id: Maybe<Scalars['Int']>;
  currency: Maybe<Scalars['String']>;
  external_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  round: Maybe<Scalars['String']>;
  round_date: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  valuation: Maybe<Scalars['numeric']>;
};

/** order by max() on columns of table "investment_rounds" */
export type Investment_Rounds_Max_Order_By = {
  amount: InputMaybe<Order_By>;
  company_id: InputMaybe<Order_By>;
  currency: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  round: InputMaybe<Order_By>;
  round_date: InputMaybe<Order_By>;
  status: InputMaybe<Order_By>;
  valuation: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Investment_Rounds_Min_Fields = {
  __typename?: 'investment_rounds_min_fields';
  amount: Maybe<Scalars['numeric']>;
  company_id: Maybe<Scalars['Int']>;
  currency: Maybe<Scalars['String']>;
  external_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  round: Maybe<Scalars['String']>;
  round_date: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  valuation: Maybe<Scalars['numeric']>;
};

/** order by min() on columns of table "investment_rounds" */
export type Investment_Rounds_Min_Order_By = {
  amount: InputMaybe<Order_By>;
  company_id: InputMaybe<Order_By>;
  currency: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  round: InputMaybe<Order_By>;
  round_date: InputMaybe<Order_By>;
  status: InputMaybe<Order_By>;
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
  currency: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  investments_aggregate: InputMaybe<Investments_Aggregate_Order_By>;
  round: InputMaybe<Order_By>;
  round_date: InputMaybe<Order_By>;
  status: InputMaybe<Order_By>;
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
  Currency = 'currency',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  Round = 'round',
  /** column name */
  RoundDate = 'round_date',
  /** column name */
  Status = 'status',
  /** column name */
  Valuation = 'valuation'
}

/** input type for updating data in table "investment_rounds" */
export type Investment_Rounds_Set_Input = {
  amount: InputMaybe<Scalars['numeric']>;
  company_id: InputMaybe<Scalars['Int']>;
  currency: InputMaybe<Scalars['String']>;
  external_id: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  round: InputMaybe<Scalars['String']>;
  round_date: InputMaybe<Scalars['String']>;
  status: InputMaybe<Scalars['String']>;
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
  Currency = 'currency',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  Round = 'round',
  /** column name */
  RoundDate = 'round_date',
  /** column name */
  Status = 'status',
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
  amount: Maybe<Scalars['numeric']>;
  external_id: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object relationship */
  investment_round: Maybe<Investment_Rounds>;
  /** An object relationship */
  person: Maybe<People>;
  person_id: Maybe<Scalars['Int']>;
  round_id: Maybe<Scalars['Int']>;
  status: Scalars['String'];
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
  amount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  round_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "investments" */
export type Investments_Avg_Order_By = {
  amount: InputMaybe<Order_By>;
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
  amount: InputMaybe<Numeric_Comparison_Exp>;
  external_id: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  investment_round: InputMaybe<Investment_Rounds_Bool_Exp>;
  person: InputMaybe<People_Bool_Exp>;
  person_id: InputMaybe<Int_Comparison_Exp>;
  round_id: InputMaybe<Int_Comparison_Exp>;
  status: InputMaybe<String_Comparison_Exp>;
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
  amount: InputMaybe<Scalars['numeric']>;
  id: InputMaybe<Scalars['Int']>;
  person_id: InputMaybe<Scalars['Int']>;
  round_id: InputMaybe<Scalars['Int']>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "investments" */
export type Investments_Insert_Input = {
  amount: InputMaybe<Scalars['numeric']>;
  external_id: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  investment_round: InputMaybe<Investment_Rounds_Obj_Rel_Insert_Input>;
  person: InputMaybe<People_Obj_Rel_Insert_Input>;
  person_id: InputMaybe<Scalars['Int']>;
  round_id: InputMaybe<Scalars['Int']>;
  status: InputMaybe<Scalars['String']>;
  vc_firm: InputMaybe<Vc_Firms_Obj_Rel_Insert_Input>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Investments_Max_Fields = {
  __typename?: 'investments_max_fields';
  amount: Maybe<Scalars['numeric']>;
  external_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  round_id: Maybe<Scalars['Int']>;
  status: Maybe<Scalars['String']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "investments" */
export type Investments_Max_Order_By = {
  amount: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  status: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Investments_Min_Fields = {
  __typename?: 'investments_min_fields';
  amount: Maybe<Scalars['numeric']>;
  external_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  round_id: Maybe<Scalars['Int']>;
  status: Maybe<Scalars['String']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "investments" */
export type Investments_Min_Order_By = {
  amount: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  status: InputMaybe<Order_By>;
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
  amount: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  investment_round: InputMaybe<Investment_Rounds_Order_By>;
  person: InputMaybe<People_Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  status: InputMaybe<Order_By>;
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
  Amount = 'amount',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  PersonId = 'person_id',
  /** column name */
  RoundId = 'round_id',
  /** column name */
  Status = 'status',
  /** column name */
  VcFirmId = 'vc_firm_id'
}

/** input type for updating data in table "investments" */
export type Investments_Set_Input = {
  amount: InputMaybe<Scalars['numeric']>;
  external_id: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  person_id: InputMaybe<Scalars['Int']>;
  round_id: InputMaybe<Scalars['Int']>;
  status: InputMaybe<Scalars['String']>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Investments_Stddev_Fields = {
  __typename?: 'investments_stddev_fields';
  amount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  round_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "investments" */
export type Investments_Stddev_Order_By = {
  amount: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Investments_Stddev_Pop_Fields = {
  __typename?: 'investments_stddev_pop_fields';
  amount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  round_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "investments" */
export type Investments_Stddev_Pop_Order_By = {
  amount: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Investments_Stddev_Samp_Fields = {
  __typename?: 'investments_stddev_samp_fields';
  amount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  round_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "investments" */
export type Investments_Stddev_Samp_Order_By = {
  amount: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Investments_Sum_Fields = {
  __typename?: 'investments_sum_fields';
  amount: Maybe<Scalars['numeric']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  round_id: Maybe<Scalars['Int']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "investments" */
export type Investments_Sum_Order_By = {
  amount: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** update columns of table "investments" */
export enum Investments_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  PersonId = 'person_id',
  /** column name */
  RoundId = 'round_id',
  /** column name */
  Status = 'status',
  /** column name */
  VcFirmId = 'vc_firm_id'
}

/** aggregate var_pop on columns */
export type Investments_Var_Pop_Fields = {
  __typename?: 'investments_var_pop_fields';
  amount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  round_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "investments" */
export type Investments_Var_Pop_Order_By = {
  amount: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Investments_Var_Samp_Fields = {
  __typename?: 'investments_var_samp_fields';
  amount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  round_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "investments" */
export type Investments_Var_Samp_Order_By = {
  amount: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Investments_Variance_Fields = {
  __typename?: 'investments_variance_fields';
  amount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  round_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "investments" */
export type Investments_Variance_Order_By = {
  amount: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  round_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** columns and relationships of "investors" */
export type Investors = {
  __typename?: 'investors';
  created_at: Scalars['timestamptz'];
  end_date: Maybe<Scalars['date']>;
  external_id: Maybe<Scalars['String']>;
  function: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object relationship */
  person: Maybe<People>;
  person_id: Maybe<Scalars['Int']>;
  seniority: Maybe<Scalars['String']>;
  start_date: Maybe<Scalars['date']>;
  title: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
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
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "investors" */
export type Investors_Avg_Order_By = {
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "investors". All fields are combined with a logical 'AND'. */
export type Investors_Bool_Exp = {
  _and: InputMaybe<Array<Investors_Bool_Exp>>;
  _not: InputMaybe<Investors_Bool_Exp>;
  _or: InputMaybe<Array<Investors_Bool_Exp>>;
  created_at: InputMaybe<Timestamptz_Comparison_Exp>;
  end_date: InputMaybe<Date_Comparison_Exp>;
  external_id: InputMaybe<String_Comparison_Exp>;
  function: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  person: InputMaybe<People_Bool_Exp>;
  person_id: InputMaybe<Int_Comparison_Exp>;
  seniority: InputMaybe<String_Comparison_Exp>;
  start_date: InputMaybe<Date_Comparison_Exp>;
  title: InputMaybe<String_Comparison_Exp>;
  updated_at: InputMaybe<Timestamptz_Comparison_Exp>;
  vc_firm: InputMaybe<Vc_Firms_Bool_Exp>;
  vc_firm_id: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "investors" */
export enum Investors_Constraint {
  /** unique or primary key constraint */
  InvestorsExternalIdKey = 'investors_external_id_key',
  /** unique or primary key constraint */
  InvestorsPkey = 'investors_pkey',
  /** unique or primary key constraint */
  InvestorsVcFirmIdPersonIdKey = 'investors_vc_firm_id_person_id_key'
}

/** input type for incrementing numeric columns in table "investors" */
export type Investors_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
  person_id: InputMaybe<Scalars['Int']>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "investors" */
export type Investors_Insert_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  end_date: InputMaybe<Scalars['date']>;
  external_id: InputMaybe<Scalars['String']>;
  function: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  person: InputMaybe<People_Obj_Rel_Insert_Input>;
  person_id: InputMaybe<Scalars['Int']>;
  seniority: InputMaybe<Scalars['String']>;
  start_date: InputMaybe<Scalars['date']>;
  title: InputMaybe<Scalars['String']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  vc_firm: InputMaybe<Vc_Firms_Obj_Rel_Insert_Input>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Investors_Max_Fields = {
  __typename?: 'investors_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  end_date: Maybe<Scalars['date']>;
  external_id: Maybe<Scalars['String']>;
  function: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  seniority: Maybe<Scalars['String']>;
  start_date: Maybe<Scalars['date']>;
  title: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "investors" */
export type Investors_Max_Order_By = {
  created_at: InputMaybe<Order_By>;
  end_date: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  function: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  seniority: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  title: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Investors_Min_Fields = {
  __typename?: 'investors_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  end_date: Maybe<Scalars['date']>;
  external_id: Maybe<Scalars['String']>;
  function: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  seniority: Maybe<Scalars['String']>;
  start_date: Maybe<Scalars['date']>;
  title: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "investors" */
export type Investors_Min_Order_By = {
  created_at: InputMaybe<Order_By>;
  end_date: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  function: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  seniority: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  title: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
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
  created_at: InputMaybe<Order_By>;
  end_date: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  function: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  person: InputMaybe<People_Order_By>;
  person_id: InputMaybe<Order_By>;
  seniority: InputMaybe<Order_By>;
  start_date: InputMaybe<Order_By>;
  title: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
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
  CreatedAt = 'created_at',
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
  UpdatedAt = 'updated_at',
  /** column name */
  VcFirmId = 'vc_firm_id'
}

/** input type for updating data in table "investors" */
export type Investors_Set_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  end_date: InputMaybe<Scalars['date']>;
  external_id: InputMaybe<Scalars['String']>;
  function: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  person_id: InputMaybe<Scalars['Int']>;
  seniority: InputMaybe<Scalars['String']>;
  start_date: InputMaybe<Scalars['date']>;
  title: InputMaybe<Scalars['String']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Investors_Stddev_Fields = {
  __typename?: 'investors_stddev_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "investors" */
export type Investors_Stddev_Order_By = {
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Investors_Stddev_Pop_Fields = {
  __typename?: 'investors_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "investors" */
export type Investors_Stddev_Pop_Order_By = {
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Investors_Stddev_Samp_Fields = {
  __typename?: 'investors_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "investors" */
export type Investors_Stddev_Samp_Order_By = {
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Investors_Sum_Fields = {
  __typename?: 'investors_sum_fields';
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "investors" */
export type Investors_Sum_Order_By = {
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** update columns of table "investors" */
export enum Investors_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
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
  UpdatedAt = 'updated_at',
  /** column name */
  VcFirmId = 'vc_firm_id'
}

/** aggregate var_pop on columns */
export type Investors_Var_Pop_Fields = {
  __typename?: 'investors_var_pop_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "investors" */
export type Investors_Var_Pop_Order_By = {
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Investors_Var_Samp_Fields = {
  __typename?: 'investors_var_samp_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "investors" */
export type Investors_Var_Samp_Order_By = {
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Investors_Variance_Fields = {
  __typename?: 'investors_variance_fields';
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "investors" */
export type Investors_Variance_Order_By = {
  id: InputMaybe<Order_By>;
  person_id: InputMaybe<Order_By>;
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

/** columns and relationships of "list_members" */
export type List_Members = {
  __typename?: 'list_members';
  id: Scalars['Int'];
  /** An object relationship */
  list: Lists;
  list_id: Scalars['Int'];
  member_type: Scalars['String'];
  /** An object relationship */
  user: Maybe<Users>;
  user_id: Scalars['Int'];
};

/** aggregated selection of "list_members" */
export type List_Members_Aggregate = {
  __typename?: 'list_members_aggregate';
  aggregate: Maybe<List_Members_Aggregate_Fields>;
  nodes: Array<List_Members>;
};

/** aggregate fields of "list_members" */
export type List_Members_Aggregate_Fields = {
  __typename?: 'list_members_aggregate_fields';
  avg: Maybe<List_Members_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<List_Members_Max_Fields>;
  min: Maybe<List_Members_Min_Fields>;
  stddev: Maybe<List_Members_Stddev_Fields>;
  stddev_pop: Maybe<List_Members_Stddev_Pop_Fields>;
  stddev_samp: Maybe<List_Members_Stddev_Samp_Fields>;
  sum: Maybe<List_Members_Sum_Fields>;
  var_pop: Maybe<List_Members_Var_Pop_Fields>;
  var_samp: Maybe<List_Members_Var_Samp_Fields>;
  variance: Maybe<List_Members_Variance_Fields>;
};


/** aggregate fields of "list_members" */
export type List_Members_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<List_Members_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "list_members" */
export type List_Members_Aggregate_Order_By = {
  avg: InputMaybe<List_Members_Avg_Order_By>;
  count: InputMaybe<Order_By>;
  max: InputMaybe<List_Members_Max_Order_By>;
  min: InputMaybe<List_Members_Min_Order_By>;
  stddev: InputMaybe<List_Members_Stddev_Order_By>;
  stddev_pop: InputMaybe<List_Members_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<List_Members_Stddev_Samp_Order_By>;
  sum: InputMaybe<List_Members_Sum_Order_By>;
  var_pop: InputMaybe<List_Members_Var_Pop_Order_By>;
  var_samp: InputMaybe<List_Members_Var_Samp_Order_By>;
  variance: InputMaybe<List_Members_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "list_members" */
export type List_Members_Arr_Rel_Insert_Input = {
  data: Array<List_Members_Insert_Input>;
  /** upsert condition */
  on_conflict: InputMaybe<List_Members_On_Conflict>;
};

/** aggregate avg on columns */
export type List_Members_Avg_Fields = {
  __typename?: 'list_members_avg_fields';
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "list_members" */
export type List_Members_Avg_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "list_members". All fields are combined with a logical 'AND'. */
export type List_Members_Bool_Exp = {
  _and: InputMaybe<Array<List_Members_Bool_Exp>>;
  _not: InputMaybe<List_Members_Bool_Exp>;
  _or: InputMaybe<Array<List_Members_Bool_Exp>>;
  id: InputMaybe<Int_Comparison_Exp>;
  list: InputMaybe<Lists_Bool_Exp>;
  list_id: InputMaybe<Int_Comparison_Exp>;
  member_type: InputMaybe<String_Comparison_Exp>;
  user: InputMaybe<Users_Bool_Exp>;
  user_id: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "list_members" */
export enum List_Members_Constraint {
  /** unique or primary key constraint */
  ListMembersListIdUserIdKey = 'list_members_list_id_user_id_key',
  /** unique or primary key constraint */
  ListMembersPkey = 'list_members_pkey'
}

/** input type for incrementing numeric columns in table "list_members" */
export type List_Members_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
  list_id: InputMaybe<Scalars['Int']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "list_members" */
export type List_Members_Insert_Input = {
  id: InputMaybe<Scalars['Int']>;
  list: InputMaybe<Lists_Obj_Rel_Insert_Input>;
  list_id: InputMaybe<Scalars['Int']>;
  member_type: InputMaybe<Scalars['String']>;
  user: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type List_Members_Max_Fields = {
  __typename?: 'list_members_max_fields';
  id: Maybe<Scalars['Int']>;
  list_id: Maybe<Scalars['Int']>;
  member_type: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "list_members" */
export type List_Members_Max_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  member_type: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type List_Members_Min_Fields = {
  __typename?: 'list_members_min_fields';
  id: Maybe<Scalars['Int']>;
  list_id: Maybe<Scalars['Int']>;
  member_type: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "list_members" */
export type List_Members_Min_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  member_type: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** response of any mutation on the table "list_members" */
export type List_Members_Mutation_Response = {
  __typename?: 'list_members_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<List_Members>;
};

/** input type for inserting object relation for remote table "list_members" */
export type List_Members_Obj_Rel_Insert_Input = {
  data: List_Members_Insert_Input;
  /** upsert condition */
  on_conflict: InputMaybe<List_Members_On_Conflict>;
};

/** on_conflict condition type for table "list_members" */
export type List_Members_On_Conflict = {
  constraint: List_Members_Constraint;
  update_columns: Array<List_Members_Update_Column>;
  where: InputMaybe<List_Members_Bool_Exp>;
};

/** Ordering options when selecting data from "list_members". */
export type List_Members_Order_By = {
  id: InputMaybe<Order_By>;
  list: InputMaybe<Lists_Order_By>;
  list_id: InputMaybe<Order_By>;
  member_type: InputMaybe<Order_By>;
  user: InputMaybe<Users_Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** primary key columns input for table: list_members */
export type List_Members_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "list_members" */
export enum List_Members_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ListId = 'list_id',
  /** column name */
  MemberType = 'member_type',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "list_members" */
export type List_Members_Set_Input = {
  id: InputMaybe<Scalars['Int']>;
  list_id: InputMaybe<Scalars['Int']>;
  member_type: InputMaybe<Scalars['String']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type List_Members_Stddev_Fields = {
  __typename?: 'list_members_stddev_fields';
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "list_members" */
export type List_Members_Stddev_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type List_Members_Stddev_Pop_Fields = {
  __typename?: 'list_members_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "list_members" */
export type List_Members_Stddev_Pop_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type List_Members_Stddev_Samp_Fields = {
  __typename?: 'list_members_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "list_members" */
export type List_Members_Stddev_Samp_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type List_Members_Sum_Fields = {
  __typename?: 'list_members_sum_fields';
  id: Maybe<Scalars['Int']>;
  list_id: Maybe<Scalars['Int']>;
  user_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "list_members" */
export type List_Members_Sum_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** update columns of table "list_members" */
export enum List_Members_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ListId = 'list_id',
  /** column name */
  MemberType = 'member_type',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type List_Members_Var_Pop_Fields = {
  __typename?: 'list_members_var_pop_fields';
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "list_members" */
export type List_Members_Var_Pop_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type List_Members_Var_Samp_Fields = {
  __typename?: 'list_members_var_samp_fields';
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "list_members" */
export type List_Members_Var_Samp_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type List_Members_Variance_Fields = {
  __typename?: 'list_members_variance_fields';
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "list_members" */
export type List_Members_Variance_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** columns and relationships of "list_user_groups" */
export type List_User_Groups = {
  __typename?: 'list_user_groups';
  id: Scalars['Int'];
  /** An object relationship */
  list: Maybe<Lists>;
  list_id: Scalars['Int'];
  /** An object relationship */
  user_group: Maybe<User_Groups>;
  user_group_id: Scalars['Int'];
};

/** aggregated selection of "list_user_groups" */
export type List_User_Groups_Aggregate = {
  __typename?: 'list_user_groups_aggregate';
  aggregate: Maybe<List_User_Groups_Aggregate_Fields>;
  nodes: Array<List_User_Groups>;
};

/** aggregate fields of "list_user_groups" */
export type List_User_Groups_Aggregate_Fields = {
  __typename?: 'list_user_groups_aggregate_fields';
  avg: Maybe<List_User_Groups_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<List_User_Groups_Max_Fields>;
  min: Maybe<List_User_Groups_Min_Fields>;
  stddev: Maybe<List_User_Groups_Stddev_Fields>;
  stddev_pop: Maybe<List_User_Groups_Stddev_Pop_Fields>;
  stddev_samp: Maybe<List_User_Groups_Stddev_Samp_Fields>;
  sum: Maybe<List_User_Groups_Sum_Fields>;
  var_pop: Maybe<List_User_Groups_Var_Pop_Fields>;
  var_samp: Maybe<List_User_Groups_Var_Samp_Fields>;
  variance: Maybe<List_User_Groups_Variance_Fields>;
};


/** aggregate fields of "list_user_groups" */
export type List_User_Groups_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<List_User_Groups_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "list_user_groups" */
export type List_User_Groups_Aggregate_Order_By = {
  avg: InputMaybe<List_User_Groups_Avg_Order_By>;
  count: InputMaybe<Order_By>;
  max: InputMaybe<List_User_Groups_Max_Order_By>;
  min: InputMaybe<List_User_Groups_Min_Order_By>;
  stddev: InputMaybe<List_User_Groups_Stddev_Order_By>;
  stddev_pop: InputMaybe<List_User_Groups_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<List_User_Groups_Stddev_Samp_Order_By>;
  sum: InputMaybe<List_User_Groups_Sum_Order_By>;
  var_pop: InputMaybe<List_User_Groups_Var_Pop_Order_By>;
  var_samp: InputMaybe<List_User_Groups_Var_Samp_Order_By>;
  variance: InputMaybe<List_User_Groups_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "list_user_groups" */
export type List_User_Groups_Arr_Rel_Insert_Input = {
  data: Array<List_User_Groups_Insert_Input>;
  /** upsert condition */
  on_conflict: InputMaybe<List_User_Groups_On_Conflict>;
};

/** aggregate avg on columns */
export type List_User_Groups_Avg_Fields = {
  __typename?: 'list_user_groups_avg_fields';
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "list_user_groups" */
export type List_User_Groups_Avg_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "list_user_groups". All fields are combined with a logical 'AND'. */
export type List_User_Groups_Bool_Exp = {
  _and: InputMaybe<Array<List_User_Groups_Bool_Exp>>;
  _not: InputMaybe<List_User_Groups_Bool_Exp>;
  _or: InputMaybe<Array<List_User_Groups_Bool_Exp>>;
  id: InputMaybe<Int_Comparison_Exp>;
  list: InputMaybe<Lists_Bool_Exp>;
  list_id: InputMaybe<Int_Comparison_Exp>;
  user_group: InputMaybe<User_Groups_Bool_Exp>;
  user_group_id: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "list_user_groups" */
export enum List_User_Groups_Constraint {
  /** unique or primary key constraint */
  ListUserGroupsPkey = 'list_user_groups_pkey'
}

/** input type for incrementing numeric columns in table "list_user_groups" */
export type List_User_Groups_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
  list_id: InputMaybe<Scalars['Int']>;
  user_group_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "list_user_groups" */
export type List_User_Groups_Insert_Input = {
  id: InputMaybe<Scalars['Int']>;
  list: InputMaybe<Lists_Obj_Rel_Insert_Input>;
  list_id: InputMaybe<Scalars['Int']>;
  user_group: InputMaybe<User_Groups_Obj_Rel_Insert_Input>;
  user_group_id: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type List_User_Groups_Max_Fields = {
  __typename?: 'list_user_groups_max_fields';
  id: Maybe<Scalars['Int']>;
  list_id: Maybe<Scalars['Int']>;
  user_group_id: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "list_user_groups" */
export type List_User_Groups_Max_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type List_User_Groups_Min_Fields = {
  __typename?: 'list_user_groups_min_fields';
  id: Maybe<Scalars['Int']>;
  list_id: Maybe<Scalars['Int']>;
  user_group_id: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "list_user_groups" */
export type List_User_Groups_Min_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** response of any mutation on the table "list_user_groups" */
export type List_User_Groups_Mutation_Response = {
  __typename?: 'list_user_groups_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<List_User_Groups>;
};

/** on_conflict condition type for table "list_user_groups" */
export type List_User_Groups_On_Conflict = {
  constraint: List_User_Groups_Constraint;
  update_columns: Array<List_User_Groups_Update_Column>;
  where: InputMaybe<List_User_Groups_Bool_Exp>;
};

/** Ordering options when selecting data from "list_user_groups". */
export type List_User_Groups_Order_By = {
  id: InputMaybe<Order_By>;
  list: InputMaybe<Lists_Order_By>;
  list_id: InputMaybe<Order_By>;
  user_group: InputMaybe<User_Groups_Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** primary key columns input for table: list_user_groups */
export type List_User_Groups_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "list_user_groups" */
export enum List_User_Groups_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ListId = 'list_id',
  /** column name */
  UserGroupId = 'user_group_id'
}

/** input type for updating data in table "list_user_groups" */
export type List_User_Groups_Set_Input = {
  id: InputMaybe<Scalars['Int']>;
  list_id: InputMaybe<Scalars['Int']>;
  user_group_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type List_User_Groups_Stddev_Fields = {
  __typename?: 'list_user_groups_stddev_fields';
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "list_user_groups" */
export type List_User_Groups_Stddev_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type List_User_Groups_Stddev_Pop_Fields = {
  __typename?: 'list_user_groups_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "list_user_groups" */
export type List_User_Groups_Stddev_Pop_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type List_User_Groups_Stddev_Samp_Fields = {
  __typename?: 'list_user_groups_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "list_user_groups" */
export type List_User_Groups_Stddev_Samp_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type List_User_Groups_Sum_Fields = {
  __typename?: 'list_user_groups_sum_fields';
  id: Maybe<Scalars['Int']>;
  list_id: Maybe<Scalars['Int']>;
  user_group_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "list_user_groups" */
export type List_User_Groups_Sum_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** update columns of table "list_user_groups" */
export enum List_User_Groups_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ListId = 'list_id',
  /** column name */
  UserGroupId = 'user_group_id'
}

/** aggregate var_pop on columns */
export type List_User_Groups_Var_Pop_Fields = {
  __typename?: 'list_user_groups_var_pop_fields';
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "list_user_groups" */
export type List_User_Groups_Var_Pop_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type List_User_Groups_Var_Samp_Fields = {
  __typename?: 'list_user_groups_var_samp_fields';
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "list_user_groups" */
export type List_User_Groups_Var_Samp_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type List_User_Groups_Variance_Fields = {
  __typename?: 'list_user_groups_variance_fields';
  id: Maybe<Scalars['Float']>;
  list_id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "list_user_groups" */
export type List_User_Groups_Variance_Order_By = {
  id: InputMaybe<Order_By>;
  list_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** columns and relationships of "lists" */
export type Lists = {
  __typename?: 'lists';
  created_at: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  created_by: Maybe<Users>;
  created_by_id: Scalars['Int'];
  /** An array relationship */
  follows_companies: Array<Follows_Companies>;
  /** An aggregate relationship */
  follows_companies_aggregate: Follows_Companies_Aggregate;
  /** An array relationship */
  follows_vcfirms: Array<Follows_Vc_Firms>;
  /** An aggregate relationship */
  follows_vcfirms_aggregate: Follows_Vc_Firms_Aggregate;
  id: Scalars['Int'];
  /** An array relationship */
  list_members: Array<List_Members>;
  /** An aggregate relationship */
  list_members_aggregate: List_Members_Aggregate;
  name: Scalars['String'];
  /** Computed field to get total no. of companies in a list */
  total_no_of_resources: Maybe<Scalars['Int']>;
  /** An array relationship */
  user_groups: Array<List_User_Groups>;
  /** An aggregate relationship */
  user_groups_aggregate: List_User_Groups_Aggregate;
};


/** columns and relationships of "lists" */
export type ListsFollows_CompaniesArgs = {
  distinct_on: InputMaybe<Array<Follows_Companies_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Companies_Order_By>>;
  where: InputMaybe<Follows_Companies_Bool_Exp>;
};


/** columns and relationships of "lists" */
export type ListsFollows_Companies_AggregateArgs = {
  distinct_on: InputMaybe<Array<Follows_Companies_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Companies_Order_By>>;
  where: InputMaybe<Follows_Companies_Bool_Exp>;
};


/** columns and relationships of "lists" */
export type ListsFollows_VcfirmsArgs = {
  distinct_on: InputMaybe<Array<Follows_Vc_Firms_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Vc_Firms_Order_By>>;
  where: InputMaybe<Follows_Vc_Firms_Bool_Exp>;
};


/** columns and relationships of "lists" */
export type ListsFollows_Vcfirms_AggregateArgs = {
  distinct_on: InputMaybe<Array<Follows_Vc_Firms_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Vc_Firms_Order_By>>;
  where: InputMaybe<Follows_Vc_Firms_Bool_Exp>;
};


/** columns and relationships of "lists" */
export type ListsList_MembersArgs = {
  distinct_on: InputMaybe<Array<List_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<List_Members_Order_By>>;
  where: InputMaybe<List_Members_Bool_Exp>;
};


/** columns and relationships of "lists" */
export type ListsList_Members_AggregateArgs = {
  distinct_on: InputMaybe<Array<List_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<List_Members_Order_By>>;
  where: InputMaybe<List_Members_Bool_Exp>;
};


/** columns and relationships of "lists" */
export type ListsUser_GroupsArgs = {
  distinct_on: InputMaybe<Array<List_User_Groups_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<List_User_Groups_Order_By>>;
  where: InputMaybe<List_User_Groups_Bool_Exp>;
};


/** columns and relationships of "lists" */
export type ListsUser_Groups_AggregateArgs = {
  distinct_on: InputMaybe<Array<List_User_Groups_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<List_User_Groups_Order_By>>;
  where: InputMaybe<List_User_Groups_Bool_Exp>;
};

/** aggregated selection of "lists" */
export type Lists_Aggregate = {
  __typename?: 'lists_aggregate';
  aggregate: Maybe<Lists_Aggregate_Fields>;
  nodes: Array<Lists>;
};

/** aggregate fields of "lists" */
export type Lists_Aggregate_Fields = {
  __typename?: 'lists_aggregate_fields';
  avg: Maybe<Lists_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Lists_Max_Fields>;
  min: Maybe<Lists_Min_Fields>;
  stddev: Maybe<Lists_Stddev_Fields>;
  stddev_pop: Maybe<Lists_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Lists_Stddev_Samp_Fields>;
  sum: Maybe<Lists_Sum_Fields>;
  var_pop: Maybe<Lists_Var_Pop_Fields>;
  var_samp: Maybe<Lists_Var_Samp_Fields>;
  variance: Maybe<Lists_Variance_Fields>;
};


/** aggregate fields of "lists" */
export type Lists_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Lists_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Lists_Avg_Fields = {
  __typename?: 'lists_avg_fields';
  created_by_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "lists". All fields are combined with a logical 'AND'. */
export type Lists_Bool_Exp = {
  _and: InputMaybe<Array<Lists_Bool_Exp>>;
  _not: InputMaybe<Lists_Bool_Exp>;
  _or: InputMaybe<Array<Lists_Bool_Exp>>;
  created_at: InputMaybe<Timestamptz_Comparison_Exp>;
  created_by: InputMaybe<Users_Bool_Exp>;
  created_by_id: InputMaybe<Int_Comparison_Exp>;
  follows_companies: InputMaybe<Follows_Companies_Bool_Exp>;
  follows_vcfirms: InputMaybe<Follows_Vc_Firms_Bool_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  list_members: InputMaybe<List_Members_Bool_Exp>;
  name: InputMaybe<String_Comparison_Exp>;
  total_no_of_resources: InputMaybe<Int_Comparison_Exp>;
  user_groups: InputMaybe<List_User_Groups_Bool_Exp>;
};

/** unique or primary key constraints on table "lists" */
export enum Lists_Constraint {
  /** unique or primary key constraint */
  ListsCreatedByIdNameKey = 'lists_created_by_id_name_key',
  /** unique or primary key constraint */
  ListsPkey = 'lists_pkey'
}

/** input type for incrementing numeric columns in table "lists" */
export type Lists_Inc_Input = {
  created_by_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "lists" */
export type Lists_Insert_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  created_by: InputMaybe<Users_Obj_Rel_Insert_Input>;
  created_by_id: InputMaybe<Scalars['Int']>;
  follows_companies: InputMaybe<Follows_Companies_Arr_Rel_Insert_Input>;
  follows_vcfirms: InputMaybe<Follows_Vc_Firms_Arr_Rel_Insert_Input>;
  id: InputMaybe<Scalars['Int']>;
  list_members: InputMaybe<List_Members_Arr_Rel_Insert_Input>;
  name: InputMaybe<Scalars['String']>;
  user_groups: InputMaybe<List_User_Groups_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Lists_Max_Fields = {
  __typename?: 'lists_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  created_by_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Lists_Min_Fields = {
  __typename?: 'lists_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  created_by_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "lists" */
export type Lists_Mutation_Response = {
  __typename?: 'lists_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Lists>;
};

/** input type for inserting object relation for remote table "lists" */
export type Lists_Obj_Rel_Insert_Input = {
  data: Lists_Insert_Input;
  /** upsert condition */
  on_conflict: InputMaybe<Lists_On_Conflict>;
};

/** on_conflict condition type for table "lists" */
export type Lists_On_Conflict = {
  constraint: Lists_Constraint;
  update_columns: Array<Lists_Update_Column>;
  where: InputMaybe<Lists_Bool_Exp>;
};

/** Ordering options when selecting data from "lists". */
export type Lists_Order_By = {
  created_at: InputMaybe<Order_By>;
  created_by: InputMaybe<Users_Order_By>;
  created_by_id: InputMaybe<Order_By>;
  follows_companies_aggregate: InputMaybe<Follows_Companies_Aggregate_Order_By>;
  follows_vcfirms_aggregate: InputMaybe<Follows_Vc_Firms_Aggregate_Order_By>;
  id: InputMaybe<Order_By>;
  list_members_aggregate: InputMaybe<List_Members_Aggregate_Order_By>;
  name: InputMaybe<Order_By>;
  total_no_of_resources: InputMaybe<Order_By>;
  user_groups_aggregate: InputMaybe<List_User_Groups_Aggregate_Order_By>;
};

/** primary key columns input for table: lists */
export type Lists_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "lists" */
export enum Lists_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "lists" */
export type Lists_Set_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  created_by_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  name: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Lists_Stddev_Fields = {
  __typename?: 'lists_stddev_fields';
  created_by_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Lists_Stddev_Pop_Fields = {
  __typename?: 'lists_stddev_pop_fields';
  created_by_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Lists_Stddev_Samp_Fields = {
  __typename?: 'lists_stddev_samp_fields';
  created_by_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Lists_Sum_Fields = {
  __typename?: 'lists_sum_fields';
  created_by_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
};

/** update columns of table "lists" */
export enum Lists_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedById = 'created_by_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** aggregate var_pop on columns */
export type Lists_Var_Pop_Fields = {
  __typename?: 'lists_var_pop_fields';
  created_by_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Lists_Var_Samp_Fields = {
  __typename?: 'lists_var_samp_fields';
  created_by_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Lists_Variance_Fields = {
  __typename?: 'lists_variance_fields';
  created_by_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "actions" */
  delete_actions: Maybe<Actions_Mutation_Response>;
  /** delete single row from the table: "actions" */
  delete_actions_by_pk: Maybe<Actions>;
  /** delete data from the table: "allowed_emails" */
  delete_allowed_emails: Maybe<Allowed_Emails_Mutation_Response>;
  /** delete single row from the table: "allowed_emails" */
  delete_allowed_emails_by_pk: Maybe<Allowed_Emails>;
  /** delete data from the table: "application_meta" */
  delete_application_meta: Maybe<Application_Meta_Mutation_Response>;
  /** delete single row from the table: "application_meta" */
  delete_application_meta_by_pk: Maybe<Application_Meta>;
  /** delete data from the table: "billing_org" */
  delete_billing_org: Maybe<Billing_Org_Mutation_Response>;
  /** delete single row from the table: "billing_org" */
  delete_billing_org_by_pk: Maybe<Billing_Org>;
  /** delete data from the table: "blockchains" */
  delete_blockchains: Maybe<Blockchains_Mutation_Response>;
  /** delete single row from the table: "blockchains" */
  delete_blockchains_by_pk: Maybe<Blockchains>;
  /** delete data from the table: "coins" */
  delete_coins: Maybe<Coins_Mutation_Response>;
  /** delete single row from the table: "coins" */
  delete_coins_by_pk: Maybe<Coins>;
  /** delete data from the table: "companies" */
  delete_companies: Maybe<Companies_Mutation_Response>;
  /** delete single row from the table: "companies" */
  delete_companies_by_pk: Maybe<Companies>;
  /** delete data from the table: "companies_edit_access" */
  delete_companies_edit_access: Maybe<Companies_Edit_Access_Mutation_Response>;
  /** delete data from the table: "data_actions" */
  delete_data_actions: Maybe<Data_Actions_Mutation_Response>;
  /** delete single row from the table: "data_actions" */
  delete_data_actions_by_pk: Maybe<Data_Actions>;
  /** delete data from the table: "data_fields" */
  delete_data_fields: Maybe<Data_Fields_Mutation_Response>;
  /** delete single row from the table: "data_fields" */
  delete_data_fields_by_pk: Maybe<Data_Fields>;
  /** delete data from the table: "data_partners" */
  delete_data_partners: Maybe<Data_Partners_Mutation_Response>;
  /** delete single row from the table: "data_partners" */
  delete_data_partners_by_pk: Maybe<Data_Partners>;
  /** delete data from the table: "data_raw" */
  delete_data_raw: Maybe<Data_Raw_Mutation_Response>;
  /** delete single row from the table: "data_raw" */
  delete_data_raw_by_pk: Maybe<Data_Raw>;
  /** delete data from the table: "data_runs" */
  delete_data_runs: Maybe<Data_Runs_Mutation_Response>;
  /** delete single row from the table: "data_runs" */
  delete_data_runs_by_pk: Maybe<Data_Runs>;
  /** delete data from the table: "disabled_emails" */
  delete_disabled_emails: Maybe<Disabled_Emails_Mutation_Response>;
  /** delete single row from the table: "disabled_emails" */
  delete_disabled_emails_by_pk: Maybe<Disabled_Emails>;
  /** delete data from the table: "event_organization" */
  delete_event_organization: Maybe<Event_Organization_Mutation_Response>;
  /** delete single row from the table: "event_organization" */
  delete_event_organization_by_pk: Maybe<Event_Organization>;
  /** delete data from the table: "event_person" */
  delete_event_person: Maybe<Event_Person_Mutation_Response>;
  /** delete single row from the table: "event_person" */
  delete_event_person_by_pk: Maybe<Event_Person>;
  /** delete data from the table: "events" */
  delete_events: Maybe<Events_Mutation_Response>;
  /** delete single row from the table: "events" */
  delete_events_by_pk: Maybe<Events>;
  /** delete data from the table: "follows" */
  delete_follows: Maybe<Follows_Mutation_Response>;
  /** delete single row from the table: "follows" */
  delete_follows_by_pk: Maybe<Follows>;
  /** delete data from the table: "follows_companies" */
  delete_follows_companies: Maybe<Follows_Companies_Mutation_Response>;
  /** delete data from the table: "follows_vc_firms" */
  delete_follows_vc_firms: Maybe<Follows_Vc_Firms_Mutation_Response>;
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
  /** delete data from the table: "list_members" */
  delete_list_members: Maybe<List_Members_Mutation_Response>;
  /** delete single row from the table: "list_members" */
  delete_list_members_by_pk: Maybe<List_Members>;
  /** delete data from the table: "list_user_groups" */
  delete_list_user_groups: Maybe<List_User_Groups_Mutation_Response>;
  /** delete single row from the table: "list_user_groups" */
  delete_list_user_groups_by_pk: Maybe<List_User_Groups>;
  /** delete data from the table: "lists" */
  delete_lists: Maybe<Lists_Mutation_Response>;
  /** delete single row from the table: "lists" */
  delete_lists_by_pk: Maybe<Lists>;
  /** delete data from the table: "news" */
  delete_news: Maybe<News_Mutation_Response>;
  /** delete single row from the table: "news" */
  delete_news_by_pk: Maybe<News>;
  /** delete data from the table: "news_organizations" */
  delete_news_organizations: Maybe<News_Organizations_Mutation_Response>;
  /** delete single row from the table: "news_organizations" */
  delete_news_organizations_by_pk: Maybe<News_Organizations>;
  /** delete data from the table: "notes" */
  delete_notes: Maybe<Notes_Mutation_Response>;
  /** delete single row from the table: "notes" */
  delete_notes_by_pk: Maybe<Notes>;
  /** delete data from the table: "notifications" */
  delete_notifications: Maybe<Notifications_Mutation_Response>;
  /** delete single row from the table: "notifications" */
  delete_notifications_by_pk: Maybe<Notifications>;
  /** delete data from the table: "people" */
  delete_people: Maybe<People_Mutation_Response>;
  /** delete single row from the table: "people" */
  delete_people_by_pk: Maybe<People>;
  /** delete data from the table: "reset_passwords" */
  delete_reset_passwords: Maybe<Reset_Passwords_Mutation_Response>;
  /** delete single row from the table: "reset_passwords" */
  delete_reset_passwords_by_pk: Maybe<Reset_Passwords>;
  /** delete data from the table: "resource_edit_access" */
  delete_resource_edit_access: Maybe<Resource_Edit_Access_Mutation_Response>;
  /** delete single row from the table: "resource_edit_access" */
  delete_resource_edit_access_by_pk: Maybe<Resource_Edit_Access>;
  /** delete data from the table: "resource_links" */
  delete_resource_links: Maybe<Resource_Links_Mutation_Response>;
  /** delete single row from the table: "resource_links" */
  delete_resource_links_by_pk: Maybe<Resource_Links>;
  /** delete data from the table: "team_members" */
  delete_team_members: Maybe<Team_Members_Mutation_Response>;
  /** delete single row from the table: "team_members" */
  delete_team_members_by_pk: Maybe<Team_Members>;
  /** delete data from the table: "user_group_invites" */
  delete_user_group_invites: Maybe<User_Group_Invites_Mutation_Response>;
  /** delete single row from the table: "user_group_invites" */
  delete_user_group_invites_by_pk: Maybe<User_Group_Invites>;
  /** delete data from the table: "user_group_members" */
  delete_user_group_members: Maybe<User_Group_Members_Mutation_Response>;
  /** delete single row from the table: "user_group_members" */
  delete_user_group_members_by_pk: Maybe<User_Group_Members>;
  /** delete data from the table: "user_groups" */
  delete_user_groups: Maybe<User_Groups_Mutation_Response>;
  /** delete single row from the table: "user_groups" */
  delete_user_groups_by_pk: Maybe<User_Groups>;
  /** delete data from the table: "user_tokens" */
  delete_user_tokens: Maybe<User_Tokens_Mutation_Response>;
  /** delete single row from the table: "user_tokens" */
  delete_user_tokens_by_pk: Maybe<User_Tokens>;
  /** delete data from the table: "users" */
  delete_users: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk: Maybe<Users>;
  /** delete data from the table: "vc_firms" */
  delete_vc_firms: Maybe<Vc_Firms_Mutation_Response>;
  /** delete single row from the table: "vc_firms" */
  delete_vc_firms_by_pk: Maybe<Vc_Firms>;
  /** delete data from the table: "vc_firms_edit_access" */
  delete_vc_firms_edit_access: Maybe<Vc_Firms_Edit_Access_Mutation_Response>;
  /** delete data from the table: "waitlist_emails" */
  delete_waitlist_emails: Maybe<Waitlist_Emails_Mutation_Response>;
  /** delete single row from the table: "waitlist_emails" */
  delete_waitlist_emails_by_pk: Maybe<Waitlist_Emails>;
  /** insert data into the table: "actions" */
  insert_actions: Maybe<Actions_Mutation_Response>;
  /** insert a single row into the table: "actions" */
  insert_actions_one: Maybe<Actions>;
  /** insert data into the table: "allowed_emails" */
  insert_allowed_emails: Maybe<Allowed_Emails_Mutation_Response>;
  /** insert a single row into the table: "allowed_emails" */
  insert_allowed_emails_one: Maybe<Allowed_Emails>;
  /** insert data into the table: "application_meta" */
  insert_application_meta: Maybe<Application_Meta_Mutation_Response>;
  /** insert a single row into the table: "application_meta" */
  insert_application_meta_one: Maybe<Application_Meta>;
  /** insert data into the table: "billing_org" */
  insert_billing_org: Maybe<Billing_Org_Mutation_Response>;
  /** insert a single row into the table: "billing_org" */
  insert_billing_org_one: Maybe<Billing_Org>;
  /** insert data into the table: "blockchains" */
  insert_blockchains: Maybe<Blockchains_Mutation_Response>;
  /** insert a single row into the table: "blockchains" */
  insert_blockchains_one: Maybe<Blockchains>;
  /** insert data into the table: "coins" */
  insert_coins: Maybe<Coins_Mutation_Response>;
  /** insert a single row into the table: "coins" */
  insert_coins_one: Maybe<Coins>;
  /** insert data into the table: "companies" */
  insert_companies: Maybe<Companies_Mutation_Response>;
  /** insert data into the table: "companies_edit_access" */
  insert_companies_edit_access: Maybe<Companies_Edit_Access_Mutation_Response>;
  /** insert a single row into the table: "companies_edit_access" */
  insert_companies_edit_access_one: Maybe<Companies_Edit_Access>;
  /** insert a single row into the table: "companies" */
  insert_companies_one: Maybe<Companies>;
  /** insert data into the table: "data_actions" */
  insert_data_actions: Maybe<Data_Actions_Mutation_Response>;
  /** insert a single row into the table: "data_actions" */
  insert_data_actions_one: Maybe<Data_Actions>;
  /** insert data into the table: "data_fields" */
  insert_data_fields: Maybe<Data_Fields_Mutation_Response>;
  /** insert a single row into the table: "data_fields" */
  insert_data_fields_one: Maybe<Data_Fields>;
  /** insert data into the table: "data_partners" */
  insert_data_partners: Maybe<Data_Partners_Mutation_Response>;
  /** insert a single row into the table: "data_partners" */
  insert_data_partners_one: Maybe<Data_Partners>;
  /** insert data into the table: "data_raw" */
  insert_data_raw: Maybe<Data_Raw_Mutation_Response>;
  /** insert a single row into the table: "data_raw" */
  insert_data_raw_one: Maybe<Data_Raw>;
  /** insert data into the table: "data_runs" */
  insert_data_runs: Maybe<Data_Runs_Mutation_Response>;
  /** insert a single row into the table: "data_runs" */
  insert_data_runs_one: Maybe<Data_Runs>;
  /** insert data into the table: "disabled_emails" */
  insert_disabled_emails: Maybe<Disabled_Emails_Mutation_Response>;
  /** insert a single row into the table: "disabled_emails" */
  insert_disabled_emails_one: Maybe<Disabled_Emails>;
  /** insert data into the table: "event_organization" */
  insert_event_organization: Maybe<Event_Organization_Mutation_Response>;
  /** insert a single row into the table: "event_organization" */
  insert_event_organization_one: Maybe<Event_Organization>;
  /** insert data into the table: "event_person" */
  insert_event_person: Maybe<Event_Person_Mutation_Response>;
  /** insert a single row into the table: "event_person" */
  insert_event_person_one: Maybe<Event_Person>;
  /** insert data into the table: "events" */
  insert_events: Maybe<Events_Mutation_Response>;
  /** insert a single row into the table: "events" */
  insert_events_one: Maybe<Events>;
  /** insert data into the table: "follows" */
  insert_follows: Maybe<Follows_Mutation_Response>;
  /** insert data into the table: "follows_companies" */
  insert_follows_companies: Maybe<Follows_Companies_Mutation_Response>;
  /** insert a single row into the table: "follows_companies" */
  insert_follows_companies_one: Maybe<Follows_Companies>;
  /** insert a single row into the table: "follows" */
  insert_follows_one: Maybe<Follows>;
  /** insert data into the table: "follows_vc_firms" */
  insert_follows_vc_firms: Maybe<Follows_Vc_Firms_Mutation_Response>;
  /** insert a single row into the table: "follows_vc_firms" */
  insert_follows_vc_firms_one: Maybe<Follows_Vc_Firms>;
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
  /** insert data into the table: "list_members" */
  insert_list_members: Maybe<List_Members_Mutation_Response>;
  /** insert a single row into the table: "list_members" */
  insert_list_members_one: Maybe<List_Members>;
  /** insert data into the table: "list_user_groups" */
  insert_list_user_groups: Maybe<List_User_Groups_Mutation_Response>;
  /** insert a single row into the table: "list_user_groups" */
  insert_list_user_groups_one: Maybe<List_User_Groups>;
  /** insert data into the table: "lists" */
  insert_lists: Maybe<Lists_Mutation_Response>;
  /** insert a single row into the table: "lists" */
  insert_lists_one: Maybe<Lists>;
  /** insert data into the table: "news" */
  insert_news: Maybe<News_Mutation_Response>;
  /** insert a single row into the table: "news" */
  insert_news_one: Maybe<News>;
  /** insert data into the table: "news_organizations" */
  insert_news_organizations: Maybe<News_Organizations_Mutation_Response>;
  /** insert a single row into the table: "news_organizations" */
  insert_news_organizations_one: Maybe<News_Organizations>;
  /** insert data into the table: "notes" */
  insert_notes: Maybe<Notes_Mutation_Response>;
  /** insert a single row into the table: "notes" */
  insert_notes_one: Maybe<Notes>;
  /** insert data into the table: "notifications" */
  insert_notifications: Maybe<Notifications_Mutation_Response>;
  /** insert a single row into the table: "notifications" */
  insert_notifications_one: Maybe<Notifications>;
  /** insert data into the table: "people" */
  insert_people: Maybe<People_Mutation_Response>;
  /** insert a single row into the table: "people" */
  insert_people_one: Maybe<People>;
  /** insert data into the table: "reset_passwords" */
  insert_reset_passwords: Maybe<Reset_Passwords_Mutation_Response>;
  /** insert a single row into the table: "reset_passwords" */
  insert_reset_passwords_one: Maybe<Reset_Passwords>;
  /** insert data into the table: "resource_edit_access" */
  insert_resource_edit_access: Maybe<Resource_Edit_Access_Mutation_Response>;
  /** insert a single row into the table: "resource_edit_access" */
  insert_resource_edit_access_one: Maybe<Resource_Edit_Access>;
  /** insert data into the table: "resource_links" */
  insert_resource_links: Maybe<Resource_Links_Mutation_Response>;
  /** insert a single row into the table: "resource_links" */
  insert_resource_links_one: Maybe<Resource_Links>;
  /** insert data into the table: "team_members" */
  insert_team_members: Maybe<Team_Members_Mutation_Response>;
  /** insert a single row into the table: "team_members" */
  insert_team_members_one: Maybe<Team_Members>;
  /** insert data into the table: "user_group_invites" */
  insert_user_group_invites: Maybe<User_Group_Invites_Mutation_Response>;
  /** insert a single row into the table: "user_group_invites" */
  insert_user_group_invites_one: Maybe<User_Group_Invites>;
  /** insert data into the table: "user_group_members" */
  insert_user_group_members: Maybe<User_Group_Members_Mutation_Response>;
  /** insert a single row into the table: "user_group_members" */
  insert_user_group_members_one: Maybe<User_Group_Members>;
  /** insert data into the table: "user_groups" */
  insert_user_groups: Maybe<User_Groups_Mutation_Response>;
  /** insert a single row into the table: "user_groups" */
  insert_user_groups_one: Maybe<User_Groups>;
  /** insert data into the table: "user_tokens" */
  insert_user_tokens: Maybe<User_Tokens_Mutation_Response>;
  /** insert a single row into the table: "user_tokens" */
  insert_user_tokens_one: Maybe<User_Tokens>;
  /** insert data into the table: "users" */
  insert_users: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one: Maybe<Users>;
  /** insert data into the table: "vc_firms" */
  insert_vc_firms: Maybe<Vc_Firms_Mutation_Response>;
  /** insert data into the table: "vc_firms_edit_access" */
  insert_vc_firms_edit_access: Maybe<Vc_Firms_Edit_Access_Mutation_Response>;
  /** insert a single row into the table: "vc_firms_edit_access" */
  insert_vc_firms_edit_access_one: Maybe<Vc_Firms_Edit_Access>;
  /** insert a single row into the table: "vc_firms" */
  insert_vc_firms_one: Maybe<Vc_Firms>;
  /** insert data into the table: "waitlist_emails" */
  insert_waitlist_emails: Maybe<Waitlist_Emails_Mutation_Response>;
  /** insert a single row into the table: "waitlist_emails" */
  insert_waitlist_emails_one: Maybe<Waitlist_Emails>;
  /** update data of the table: "actions" */
  update_actions: Maybe<Actions_Mutation_Response>;
  /** update single row of the table: "actions" */
  update_actions_by_pk: Maybe<Actions>;
  /** update data of the table: "allowed_emails" */
  update_allowed_emails: Maybe<Allowed_Emails_Mutation_Response>;
  /** update single row of the table: "allowed_emails" */
  update_allowed_emails_by_pk: Maybe<Allowed_Emails>;
  /** update data of the table: "application_meta" */
  update_application_meta: Maybe<Application_Meta_Mutation_Response>;
  /** update single row of the table: "application_meta" */
  update_application_meta_by_pk: Maybe<Application_Meta>;
  /** update data of the table: "billing_org" */
  update_billing_org: Maybe<Billing_Org_Mutation_Response>;
  /** update single row of the table: "billing_org" */
  update_billing_org_by_pk: Maybe<Billing_Org>;
  /** update data of the table: "blockchains" */
  update_blockchains: Maybe<Blockchains_Mutation_Response>;
  /** update single row of the table: "blockchains" */
  update_blockchains_by_pk: Maybe<Blockchains>;
  /** update data of the table: "coins" */
  update_coins: Maybe<Coins_Mutation_Response>;
  /** update single row of the table: "coins" */
  update_coins_by_pk: Maybe<Coins>;
  /** update data of the table: "companies" */
  update_companies: Maybe<Companies_Mutation_Response>;
  /** update single row of the table: "companies" */
  update_companies_by_pk: Maybe<Companies>;
  /** update data of the table: "companies_edit_access" */
  update_companies_edit_access: Maybe<Companies_Edit_Access_Mutation_Response>;
  /** update data of the table: "data_actions" */
  update_data_actions: Maybe<Data_Actions_Mutation_Response>;
  /** update single row of the table: "data_actions" */
  update_data_actions_by_pk: Maybe<Data_Actions>;
  /** update data of the table: "data_fields" */
  update_data_fields: Maybe<Data_Fields_Mutation_Response>;
  /** update single row of the table: "data_fields" */
  update_data_fields_by_pk: Maybe<Data_Fields>;
  /** update data of the table: "data_partners" */
  update_data_partners: Maybe<Data_Partners_Mutation_Response>;
  /** update single row of the table: "data_partners" */
  update_data_partners_by_pk: Maybe<Data_Partners>;
  /** update data of the table: "data_raw" */
  update_data_raw: Maybe<Data_Raw_Mutation_Response>;
  /** update single row of the table: "data_raw" */
  update_data_raw_by_pk: Maybe<Data_Raw>;
  /** update data of the table: "data_runs" */
  update_data_runs: Maybe<Data_Runs_Mutation_Response>;
  /** update single row of the table: "data_runs" */
  update_data_runs_by_pk: Maybe<Data_Runs>;
  /** update data of the table: "disabled_emails" */
  update_disabled_emails: Maybe<Disabled_Emails_Mutation_Response>;
  /** update single row of the table: "disabled_emails" */
  update_disabled_emails_by_pk: Maybe<Disabled_Emails>;
  /** update data of the table: "event_organization" */
  update_event_organization: Maybe<Event_Organization_Mutation_Response>;
  /** update single row of the table: "event_organization" */
  update_event_organization_by_pk: Maybe<Event_Organization>;
  /** update data of the table: "event_person" */
  update_event_person: Maybe<Event_Person_Mutation_Response>;
  /** update single row of the table: "event_person" */
  update_event_person_by_pk: Maybe<Event_Person>;
  /** update data of the table: "events" */
  update_events: Maybe<Events_Mutation_Response>;
  /** update single row of the table: "events" */
  update_events_by_pk: Maybe<Events>;
  /** update data of the table: "follows" */
  update_follows: Maybe<Follows_Mutation_Response>;
  /** update single row of the table: "follows" */
  update_follows_by_pk: Maybe<Follows>;
  /** update data of the table: "follows_companies" */
  update_follows_companies: Maybe<Follows_Companies_Mutation_Response>;
  /** update data of the table: "follows_vc_firms" */
  update_follows_vc_firms: Maybe<Follows_Vc_Firms_Mutation_Response>;
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
  /** update data of the table: "list_members" */
  update_list_members: Maybe<List_Members_Mutation_Response>;
  /** update single row of the table: "list_members" */
  update_list_members_by_pk: Maybe<List_Members>;
  /** update data of the table: "list_user_groups" */
  update_list_user_groups: Maybe<List_User_Groups_Mutation_Response>;
  /** update single row of the table: "list_user_groups" */
  update_list_user_groups_by_pk: Maybe<List_User_Groups>;
  /** update data of the table: "lists" */
  update_lists: Maybe<Lists_Mutation_Response>;
  /** update single row of the table: "lists" */
  update_lists_by_pk: Maybe<Lists>;
  /** update data of the table: "news" */
  update_news: Maybe<News_Mutation_Response>;
  /** update single row of the table: "news" */
  update_news_by_pk: Maybe<News>;
  /** update data of the table: "news_organizations" */
  update_news_organizations: Maybe<News_Organizations_Mutation_Response>;
  /** update single row of the table: "news_organizations" */
  update_news_organizations_by_pk: Maybe<News_Organizations>;
  /** update data of the table: "notes" */
  update_notes: Maybe<Notes_Mutation_Response>;
  /** update single row of the table: "notes" */
  update_notes_by_pk: Maybe<Notes>;
  /** update data of the table: "notifications" */
  update_notifications: Maybe<Notifications_Mutation_Response>;
  /** update single row of the table: "notifications" */
  update_notifications_by_pk: Maybe<Notifications>;
  /** update data of the table: "people" */
  update_people: Maybe<People_Mutation_Response>;
  /** update single row of the table: "people" */
  update_people_by_pk: Maybe<People>;
  /** update data of the table: "reset_passwords" */
  update_reset_passwords: Maybe<Reset_Passwords_Mutation_Response>;
  /** update single row of the table: "reset_passwords" */
  update_reset_passwords_by_pk: Maybe<Reset_Passwords>;
  /** update data of the table: "resource_edit_access" */
  update_resource_edit_access: Maybe<Resource_Edit_Access_Mutation_Response>;
  /** update single row of the table: "resource_edit_access" */
  update_resource_edit_access_by_pk: Maybe<Resource_Edit_Access>;
  /** update data of the table: "resource_links" */
  update_resource_links: Maybe<Resource_Links_Mutation_Response>;
  /** update single row of the table: "resource_links" */
  update_resource_links_by_pk: Maybe<Resource_Links>;
  /** update data of the table: "team_members" */
  update_team_members: Maybe<Team_Members_Mutation_Response>;
  /** update single row of the table: "team_members" */
  update_team_members_by_pk: Maybe<Team_Members>;
  /** update data of the table: "user_group_invites" */
  update_user_group_invites: Maybe<User_Group_Invites_Mutation_Response>;
  /** update single row of the table: "user_group_invites" */
  update_user_group_invites_by_pk: Maybe<User_Group_Invites>;
  /** update data of the table: "user_group_members" */
  update_user_group_members: Maybe<User_Group_Members_Mutation_Response>;
  /** update single row of the table: "user_group_members" */
  update_user_group_members_by_pk: Maybe<User_Group_Members>;
  /** update data of the table: "user_groups" */
  update_user_groups: Maybe<User_Groups_Mutation_Response>;
  /** update single row of the table: "user_groups" */
  update_user_groups_by_pk: Maybe<User_Groups>;
  /** update data of the table: "user_tokens" */
  update_user_tokens: Maybe<User_Tokens_Mutation_Response>;
  /** update single row of the table: "user_tokens" */
  update_user_tokens_by_pk: Maybe<User_Tokens>;
  /** update data of the table: "users" */
  update_users: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk: Maybe<Users>;
  /** update data of the table: "vc_firms" */
  update_vc_firms: Maybe<Vc_Firms_Mutation_Response>;
  /** update single row of the table: "vc_firms" */
  update_vc_firms_by_pk: Maybe<Vc_Firms>;
  /** update data of the table: "vc_firms_edit_access" */
  update_vc_firms_edit_access: Maybe<Vc_Firms_Edit_Access_Mutation_Response>;
  /** update data of the table: "waitlist_emails" */
  update_waitlist_emails: Maybe<Waitlist_Emails_Mutation_Response>;
  /** update single row of the table: "waitlist_emails" */
  update_waitlist_emails_by_pk: Maybe<Waitlist_Emails>;
};


/** mutation root */
export type Mutation_RootDelete_ActionsArgs = {
  where: Actions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Actions_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Allowed_EmailsArgs = {
  where: Allowed_Emails_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Allowed_Emails_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Application_MetaArgs = {
  where: Application_Meta_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Application_Meta_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Billing_OrgArgs = {
  where: Billing_Org_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Billing_Org_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_BlockchainsArgs = {
  where: Blockchains_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Blockchains_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_CoinsArgs = {
  where: Coins_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Coins_By_PkArgs = {
  id: Scalars['Int'];
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
export type Mutation_RootDelete_Companies_Edit_AccessArgs = {
  where: Companies_Edit_Access_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Data_ActionsArgs = {
  where: Data_Actions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Data_Actions_By_PkArgs = {
  name: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Data_FieldsArgs = {
  where: Data_Fields_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Data_Fields_By_PkArgs = {
  path: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Data_PartnersArgs = {
  where: Data_Partners_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Data_Partners_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Data_RawArgs = {
  where: Data_Raw_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Data_Raw_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_Data_RunsArgs = {
  where: Data_Runs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Data_Runs_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_Disabled_EmailsArgs = {
  where: Disabled_Emails_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Disabled_Emails_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Event_OrganizationArgs = {
  where: Event_Organization_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Event_Organization_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Event_PersonArgs = {
  where: Event_Person_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Event_Person_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_EventsArgs = {
  where: Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Events_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_FollowsArgs = {
  where: Follows_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Follows_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Follows_CompaniesArgs = {
  where: Follows_Companies_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Follows_Vc_FirmsArgs = {
  where: Follows_Vc_Firms_Bool_Exp;
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
export type Mutation_RootDelete_List_MembersArgs = {
  where: List_Members_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_List_Members_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_List_User_GroupsArgs = {
  where: List_User_Groups_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_List_User_Groups_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_ListsArgs = {
  where: Lists_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Lists_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_NewsArgs = {
  where: News_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_News_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_News_OrganizationsArgs = {
  where: News_Organizations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_News_Organizations_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_NotesArgs = {
  where: Notes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Notes_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_NotificationsArgs = {
  where: Notifications_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Notifications_By_PkArgs = {
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
export type Mutation_RootDelete_Reset_PasswordsArgs = {
  where: Reset_Passwords_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Reset_Passwords_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Resource_Edit_AccessArgs = {
  where: Resource_Edit_Access_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Resource_Edit_Access_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Resource_LinksArgs = {
  where: Resource_Links_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Resource_Links_By_PkArgs = {
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
export type Mutation_RootDelete_User_Group_InvitesArgs = {
  where: User_Group_Invites_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Group_Invites_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_User_Group_MembersArgs = {
  where: User_Group_Members_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Group_Members_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_User_GroupsArgs = {
  where: User_Groups_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Groups_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_User_TokensArgs = {
  where: User_Tokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Tokens_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
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
export type Mutation_RootDelete_Vc_Firms_Edit_AccessArgs = {
  where: Vc_Firms_Edit_Access_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Waitlist_EmailsArgs = {
  where: Waitlist_Emails_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Waitlist_Emails_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_ActionsArgs = {
  objects: Array<Actions_Insert_Input>;
  on_conflict: InputMaybe<Actions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Actions_OneArgs = {
  object: Actions_Insert_Input;
  on_conflict: InputMaybe<Actions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Allowed_EmailsArgs = {
  objects: Array<Allowed_Emails_Insert_Input>;
  on_conflict: InputMaybe<Allowed_Emails_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Allowed_Emails_OneArgs = {
  object: Allowed_Emails_Insert_Input;
  on_conflict: InputMaybe<Allowed_Emails_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Application_MetaArgs = {
  objects: Array<Application_Meta_Insert_Input>;
  on_conflict: InputMaybe<Application_Meta_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Application_Meta_OneArgs = {
  object: Application_Meta_Insert_Input;
  on_conflict: InputMaybe<Application_Meta_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Billing_OrgArgs = {
  objects: Array<Billing_Org_Insert_Input>;
  on_conflict: InputMaybe<Billing_Org_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Billing_Org_OneArgs = {
  object: Billing_Org_Insert_Input;
  on_conflict: InputMaybe<Billing_Org_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BlockchainsArgs = {
  objects: Array<Blockchains_Insert_Input>;
  on_conflict: InputMaybe<Blockchains_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Blockchains_OneArgs = {
  object: Blockchains_Insert_Input;
  on_conflict: InputMaybe<Blockchains_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CoinsArgs = {
  objects: Array<Coins_Insert_Input>;
  on_conflict: InputMaybe<Coins_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Coins_OneArgs = {
  object: Coins_Insert_Input;
  on_conflict: InputMaybe<Coins_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CompaniesArgs = {
  objects: Array<Companies_Insert_Input>;
  on_conflict: InputMaybe<Companies_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Companies_Edit_AccessArgs = {
  objects: Array<Companies_Edit_Access_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Companies_Edit_Access_OneArgs = {
  object: Companies_Edit_Access_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Companies_OneArgs = {
  object: Companies_Insert_Input;
  on_conflict: InputMaybe<Companies_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Data_ActionsArgs = {
  objects: Array<Data_Actions_Insert_Input>;
  on_conflict: InputMaybe<Data_Actions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Data_Actions_OneArgs = {
  object: Data_Actions_Insert_Input;
  on_conflict: InputMaybe<Data_Actions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Data_FieldsArgs = {
  objects: Array<Data_Fields_Insert_Input>;
  on_conflict: InputMaybe<Data_Fields_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Data_Fields_OneArgs = {
  object: Data_Fields_Insert_Input;
  on_conflict: InputMaybe<Data_Fields_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Data_PartnersArgs = {
  objects: Array<Data_Partners_Insert_Input>;
  on_conflict: InputMaybe<Data_Partners_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Data_Partners_OneArgs = {
  object: Data_Partners_Insert_Input;
  on_conflict: InputMaybe<Data_Partners_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Data_RawArgs = {
  objects: Array<Data_Raw_Insert_Input>;
  on_conflict: InputMaybe<Data_Raw_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Data_Raw_OneArgs = {
  object: Data_Raw_Insert_Input;
  on_conflict: InputMaybe<Data_Raw_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Data_RunsArgs = {
  objects: Array<Data_Runs_Insert_Input>;
  on_conflict: InputMaybe<Data_Runs_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Data_Runs_OneArgs = {
  object: Data_Runs_Insert_Input;
  on_conflict: InputMaybe<Data_Runs_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Disabled_EmailsArgs = {
  objects: Array<Disabled_Emails_Insert_Input>;
  on_conflict: InputMaybe<Disabled_Emails_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Disabled_Emails_OneArgs = {
  object: Disabled_Emails_Insert_Input;
  on_conflict: InputMaybe<Disabled_Emails_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Event_OrganizationArgs = {
  objects: Array<Event_Organization_Insert_Input>;
  on_conflict: InputMaybe<Event_Organization_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Event_Organization_OneArgs = {
  object: Event_Organization_Insert_Input;
  on_conflict: InputMaybe<Event_Organization_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Event_PersonArgs = {
  objects: Array<Event_Person_Insert_Input>;
  on_conflict: InputMaybe<Event_Person_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Event_Person_OneArgs = {
  object: Event_Person_Insert_Input;
  on_conflict: InputMaybe<Event_Person_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_EventsArgs = {
  objects: Array<Events_Insert_Input>;
  on_conflict: InputMaybe<Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_OneArgs = {
  object: Events_Insert_Input;
  on_conflict: InputMaybe<Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_FollowsArgs = {
  objects: Array<Follows_Insert_Input>;
  on_conflict: InputMaybe<Follows_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Follows_CompaniesArgs = {
  objects: Array<Follows_Companies_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Follows_Companies_OneArgs = {
  object: Follows_Companies_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Follows_OneArgs = {
  object: Follows_Insert_Input;
  on_conflict: InputMaybe<Follows_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Follows_Vc_FirmsArgs = {
  objects: Array<Follows_Vc_Firms_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Follows_Vc_Firms_OneArgs = {
  object: Follows_Vc_Firms_Insert_Input;
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
export type Mutation_RootInsert_List_MembersArgs = {
  objects: Array<List_Members_Insert_Input>;
  on_conflict: InputMaybe<List_Members_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_List_Members_OneArgs = {
  object: List_Members_Insert_Input;
  on_conflict: InputMaybe<List_Members_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_List_User_GroupsArgs = {
  objects: Array<List_User_Groups_Insert_Input>;
  on_conflict: InputMaybe<List_User_Groups_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_List_User_Groups_OneArgs = {
  object: List_User_Groups_Insert_Input;
  on_conflict: InputMaybe<List_User_Groups_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ListsArgs = {
  objects: Array<Lists_Insert_Input>;
  on_conflict: InputMaybe<Lists_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Lists_OneArgs = {
  object: Lists_Insert_Input;
  on_conflict: InputMaybe<Lists_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_NewsArgs = {
  objects: Array<News_Insert_Input>;
  on_conflict: InputMaybe<News_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_News_OneArgs = {
  object: News_Insert_Input;
  on_conflict: InputMaybe<News_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_News_OrganizationsArgs = {
  objects: Array<News_Organizations_Insert_Input>;
  on_conflict: InputMaybe<News_Organizations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_News_Organizations_OneArgs = {
  object: News_Organizations_Insert_Input;
  on_conflict: InputMaybe<News_Organizations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_NotesArgs = {
  objects: Array<Notes_Insert_Input>;
  on_conflict: InputMaybe<Notes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Notes_OneArgs = {
  object: Notes_Insert_Input;
  on_conflict: InputMaybe<Notes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_NotificationsArgs = {
  objects: Array<Notifications_Insert_Input>;
  on_conflict: InputMaybe<Notifications_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Notifications_OneArgs = {
  object: Notifications_Insert_Input;
  on_conflict: InputMaybe<Notifications_On_Conflict>;
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
export type Mutation_RootInsert_Reset_PasswordsArgs = {
  objects: Array<Reset_Passwords_Insert_Input>;
  on_conflict: InputMaybe<Reset_Passwords_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Reset_Passwords_OneArgs = {
  object: Reset_Passwords_Insert_Input;
  on_conflict: InputMaybe<Reset_Passwords_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Resource_Edit_AccessArgs = {
  objects: Array<Resource_Edit_Access_Insert_Input>;
  on_conflict: InputMaybe<Resource_Edit_Access_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Resource_Edit_Access_OneArgs = {
  object: Resource_Edit_Access_Insert_Input;
  on_conflict: InputMaybe<Resource_Edit_Access_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Resource_LinksArgs = {
  objects: Array<Resource_Links_Insert_Input>;
  on_conflict: InputMaybe<Resource_Links_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Resource_Links_OneArgs = {
  object: Resource_Links_Insert_Input;
  on_conflict: InputMaybe<Resource_Links_On_Conflict>;
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
export type Mutation_RootInsert_User_Group_InvitesArgs = {
  objects: Array<User_Group_Invites_Insert_Input>;
  on_conflict: InputMaybe<User_Group_Invites_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Group_Invites_OneArgs = {
  object: User_Group_Invites_Insert_Input;
  on_conflict: InputMaybe<User_Group_Invites_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Group_MembersArgs = {
  objects: Array<User_Group_Members_Insert_Input>;
  on_conflict: InputMaybe<User_Group_Members_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Group_Members_OneArgs = {
  object: User_Group_Members_Insert_Input;
  on_conflict: InputMaybe<User_Group_Members_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_GroupsArgs = {
  objects: Array<User_Groups_Insert_Input>;
  on_conflict: InputMaybe<User_Groups_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Groups_OneArgs = {
  object: User_Groups_Insert_Input;
  on_conflict: InputMaybe<User_Groups_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_TokensArgs = {
  objects: Array<User_Tokens_Insert_Input>;
  on_conflict: InputMaybe<User_Tokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Tokens_OneArgs = {
  object: User_Tokens_Insert_Input;
  on_conflict: InputMaybe<User_Tokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vc_FirmsArgs = {
  objects: Array<Vc_Firms_Insert_Input>;
  on_conflict: InputMaybe<Vc_Firms_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vc_Firms_Edit_AccessArgs = {
  objects: Array<Vc_Firms_Edit_Access_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Vc_Firms_Edit_Access_OneArgs = {
  object: Vc_Firms_Edit_Access_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Vc_Firms_OneArgs = {
  object: Vc_Firms_Insert_Input;
  on_conflict: InputMaybe<Vc_Firms_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Waitlist_EmailsArgs = {
  objects: Array<Waitlist_Emails_Insert_Input>;
  on_conflict: InputMaybe<Waitlist_Emails_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Waitlist_Emails_OneArgs = {
  object: Waitlist_Emails_Insert_Input;
  on_conflict: InputMaybe<Waitlist_Emails_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ActionsArgs = {
  _append: InputMaybe<Actions_Append_Input>;
  _delete_at_path: InputMaybe<Actions_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Actions_Delete_Elem_Input>;
  _delete_key: InputMaybe<Actions_Delete_Key_Input>;
  _inc: InputMaybe<Actions_Inc_Input>;
  _prepend: InputMaybe<Actions_Prepend_Input>;
  _set: InputMaybe<Actions_Set_Input>;
  where: Actions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Actions_By_PkArgs = {
  _append: InputMaybe<Actions_Append_Input>;
  _delete_at_path: InputMaybe<Actions_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Actions_Delete_Elem_Input>;
  _delete_key: InputMaybe<Actions_Delete_Key_Input>;
  _inc: InputMaybe<Actions_Inc_Input>;
  _prepend: InputMaybe<Actions_Prepend_Input>;
  _set: InputMaybe<Actions_Set_Input>;
  pk_columns: Actions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Allowed_EmailsArgs = {
  _inc: InputMaybe<Allowed_Emails_Inc_Input>;
  _set: InputMaybe<Allowed_Emails_Set_Input>;
  where: Allowed_Emails_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Allowed_Emails_By_PkArgs = {
  _inc: InputMaybe<Allowed_Emails_Inc_Input>;
  _set: InputMaybe<Allowed_Emails_Set_Input>;
  pk_columns: Allowed_Emails_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Application_MetaArgs = {
  _inc: InputMaybe<Application_Meta_Inc_Input>;
  _set: InputMaybe<Application_Meta_Set_Input>;
  where: Application_Meta_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Application_Meta_By_PkArgs = {
  _inc: InputMaybe<Application_Meta_Inc_Input>;
  _set: InputMaybe<Application_Meta_Set_Input>;
  pk_columns: Application_Meta_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Billing_OrgArgs = {
  _inc: InputMaybe<Billing_Org_Inc_Input>;
  _set: InputMaybe<Billing_Org_Set_Input>;
  where: Billing_Org_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Billing_Org_By_PkArgs = {
  _inc: InputMaybe<Billing_Org_Inc_Input>;
  _set: InputMaybe<Billing_Org_Set_Input>;
  pk_columns: Billing_Org_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_BlockchainsArgs = {
  _inc: InputMaybe<Blockchains_Inc_Input>;
  _set: InputMaybe<Blockchains_Set_Input>;
  where: Blockchains_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Blockchains_By_PkArgs = {
  _inc: InputMaybe<Blockchains_Inc_Input>;
  _set: InputMaybe<Blockchains_Set_Input>;
  pk_columns: Blockchains_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CoinsArgs = {
  _inc: InputMaybe<Coins_Inc_Input>;
  _set: InputMaybe<Coins_Set_Input>;
  where: Coins_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Coins_By_PkArgs = {
  _inc: InputMaybe<Coins_Inc_Input>;
  _set: InputMaybe<Coins_Set_Input>;
  pk_columns: Coins_Pk_Columns_Input;
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
export type Mutation_RootUpdate_Companies_Edit_AccessArgs = {
  _inc: InputMaybe<Companies_Edit_Access_Inc_Input>;
  _set: InputMaybe<Companies_Edit_Access_Set_Input>;
  where: Companies_Edit_Access_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Data_ActionsArgs = {
  _inc: InputMaybe<Data_Actions_Inc_Input>;
  _set: InputMaybe<Data_Actions_Set_Input>;
  where: Data_Actions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Data_Actions_By_PkArgs = {
  _inc: InputMaybe<Data_Actions_Inc_Input>;
  _set: InputMaybe<Data_Actions_Set_Input>;
  pk_columns: Data_Actions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Data_FieldsArgs = {
  _inc: InputMaybe<Data_Fields_Inc_Input>;
  _set: InputMaybe<Data_Fields_Set_Input>;
  where: Data_Fields_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Data_Fields_By_PkArgs = {
  _inc: InputMaybe<Data_Fields_Inc_Input>;
  _set: InputMaybe<Data_Fields_Set_Input>;
  pk_columns: Data_Fields_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Data_PartnersArgs = {
  _inc: InputMaybe<Data_Partners_Inc_Input>;
  _set: InputMaybe<Data_Partners_Set_Input>;
  where: Data_Partners_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Data_Partners_By_PkArgs = {
  _inc: InputMaybe<Data_Partners_Inc_Input>;
  _set: InputMaybe<Data_Partners_Set_Input>;
  pk_columns: Data_Partners_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Data_RawArgs = {
  _append: InputMaybe<Data_Raw_Append_Input>;
  _delete_at_path: InputMaybe<Data_Raw_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Data_Raw_Delete_Elem_Input>;
  _delete_key: InputMaybe<Data_Raw_Delete_Key_Input>;
  _inc: InputMaybe<Data_Raw_Inc_Input>;
  _prepend: InputMaybe<Data_Raw_Prepend_Input>;
  _set: InputMaybe<Data_Raw_Set_Input>;
  where: Data_Raw_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Data_Raw_By_PkArgs = {
  _append: InputMaybe<Data_Raw_Append_Input>;
  _delete_at_path: InputMaybe<Data_Raw_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Data_Raw_Delete_Elem_Input>;
  _delete_key: InputMaybe<Data_Raw_Delete_Key_Input>;
  _inc: InputMaybe<Data_Raw_Inc_Input>;
  _prepend: InputMaybe<Data_Raw_Prepend_Input>;
  _set: InputMaybe<Data_Raw_Set_Input>;
  pk_columns: Data_Raw_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Data_RunsArgs = {
  _inc: InputMaybe<Data_Runs_Inc_Input>;
  _set: InputMaybe<Data_Runs_Set_Input>;
  where: Data_Runs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Data_Runs_By_PkArgs = {
  _inc: InputMaybe<Data_Runs_Inc_Input>;
  _set: InputMaybe<Data_Runs_Set_Input>;
  pk_columns: Data_Runs_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Disabled_EmailsArgs = {
  _inc: InputMaybe<Disabled_Emails_Inc_Input>;
  _set: InputMaybe<Disabled_Emails_Set_Input>;
  where: Disabled_Emails_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Disabled_Emails_By_PkArgs = {
  _inc: InputMaybe<Disabled_Emails_Inc_Input>;
  _set: InputMaybe<Disabled_Emails_Set_Input>;
  pk_columns: Disabled_Emails_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Event_OrganizationArgs = {
  _inc: InputMaybe<Event_Organization_Inc_Input>;
  _set: InputMaybe<Event_Organization_Set_Input>;
  where: Event_Organization_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Event_Organization_By_PkArgs = {
  _inc: InputMaybe<Event_Organization_Inc_Input>;
  _set: InputMaybe<Event_Organization_Set_Input>;
  pk_columns: Event_Organization_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Event_PersonArgs = {
  _inc: InputMaybe<Event_Person_Inc_Input>;
  _set: InputMaybe<Event_Person_Set_Input>;
  where: Event_Person_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Event_Person_By_PkArgs = {
  _inc: InputMaybe<Event_Person_Inc_Input>;
  _set: InputMaybe<Event_Person_Set_Input>;
  pk_columns: Event_Person_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_EventsArgs = {
  _append: InputMaybe<Events_Append_Input>;
  _delete_at_path: InputMaybe<Events_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Events_Delete_Elem_Input>;
  _delete_key: InputMaybe<Events_Delete_Key_Input>;
  _inc: InputMaybe<Events_Inc_Input>;
  _prepend: InputMaybe<Events_Prepend_Input>;
  _set: InputMaybe<Events_Set_Input>;
  where: Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Events_By_PkArgs = {
  _append: InputMaybe<Events_Append_Input>;
  _delete_at_path: InputMaybe<Events_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Events_Delete_Elem_Input>;
  _delete_key: InputMaybe<Events_Delete_Key_Input>;
  _inc: InputMaybe<Events_Inc_Input>;
  _prepend: InputMaybe<Events_Prepend_Input>;
  _set: InputMaybe<Events_Set_Input>;
  pk_columns: Events_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_FollowsArgs = {
  _inc: InputMaybe<Follows_Inc_Input>;
  _set: InputMaybe<Follows_Set_Input>;
  where: Follows_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Follows_By_PkArgs = {
  _inc: InputMaybe<Follows_Inc_Input>;
  _set: InputMaybe<Follows_Set_Input>;
  pk_columns: Follows_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Follows_CompaniesArgs = {
  _inc: InputMaybe<Follows_Companies_Inc_Input>;
  _set: InputMaybe<Follows_Companies_Set_Input>;
  where: Follows_Companies_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Follows_Vc_FirmsArgs = {
  _inc: InputMaybe<Follows_Vc_Firms_Inc_Input>;
  _set: InputMaybe<Follows_Vc_Firms_Set_Input>;
  where: Follows_Vc_Firms_Bool_Exp;
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
export type Mutation_RootUpdate_List_MembersArgs = {
  _inc: InputMaybe<List_Members_Inc_Input>;
  _set: InputMaybe<List_Members_Set_Input>;
  where: List_Members_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_List_Members_By_PkArgs = {
  _inc: InputMaybe<List_Members_Inc_Input>;
  _set: InputMaybe<List_Members_Set_Input>;
  pk_columns: List_Members_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_List_User_GroupsArgs = {
  _inc: InputMaybe<List_User_Groups_Inc_Input>;
  _set: InputMaybe<List_User_Groups_Set_Input>;
  where: List_User_Groups_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_List_User_Groups_By_PkArgs = {
  _inc: InputMaybe<List_User_Groups_Inc_Input>;
  _set: InputMaybe<List_User_Groups_Set_Input>;
  pk_columns: List_User_Groups_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ListsArgs = {
  _inc: InputMaybe<Lists_Inc_Input>;
  _set: InputMaybe<Lists_Set_Input>;
  where: Lists_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Lists_By_PkArgs = {
  _inc: InputMaybe<Lists_Inc_Input>;
  _set: InputMaybe<Lists_Set_Input>;
  pk_columns: Lists_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_NewsArgs = {
  _inc: InputMaybe<News_Inc_Input>;
  _set: InputMaybe<News_Set_Input>;
  where: News_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_News_By_PkArgs = {
  _inc: InputMaybe<News_Inc_Input>;
  _set: InputMaybe<News_Set_Input>;
  pk_columns: News_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_News_OrganizationsArgs = {
  _inc: InputMaybe<News_Organizations_Inc_Input>;
  _set: InputMaybe<News_Organizations_Set_Input>;
  where: News_Organizations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_News_Organizations_By_PkArgs = {
  _inc: InputMaybe<News_Organizations_Inc_Input>;
  _set: InputMaybe<News_Organizations_Set_Input>;
  pk_columns: News_Organizations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_NotesArgs = {
  _inc: InputMaybe<Notes_Inc_Input>;
  _set: InputMaybe<Notes_Set_Input>;
  where: Notes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Notes_By_PkArgs = {
  _inc: InputMaybe<Notes_Inc_Input>;
  _set: InputMaybe<Notes_Set_Input>;
  pk_columns: Notes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_NotificationsArgs = {
  _append: InputMaybe<Notifications_Append_Input>;
  _delete_at_path: InputMaybe<Notifications_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Notifications_Delete_Elem_Input>;
  _delete_key: InputMaybe<Notifications_Delete_Key_Input>;
  _inc: InputMaybe<Notifications_Inc_Input>;
  _prepend: InputMaybe<Notifications_Prepend_Input>;
  _set: InputMaybe<Notifications_Set_Input>;
  where: Notifications_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Notifications_By_PkArgs = {
  _append: InputMaybe<Notifications_Append_Input>;
  _delete_at_path: InputMaybe<Notifications_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Notifications_Delete_Elem_Input>;
  _delete_key: InputMaybe<Notifications_Delete_Key_Input>;
  _inc: InputMaybe<Notifications_Inc_Input>;
  _prepend: InputMaybe<Notifications_Prepend_Input>;
  _set: InputMaybe<Notifications_Set_Input>;
  pk_columns: Notifications_Pk_Columns_Input;
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
export type Mutation_RootUpdate_Reset_PasswordsArgs = {
  _inc: InputMaybe<Reset_Passwords_Inc_Input>;
  _set: InputMaybe<Reset_Passwords_Set_Input>;
  where: Reset_Passwords_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Reset_Passwords_By_PkArgs = {
  _inc: InputMaybe<Reset_Passwords_Inc_Input>;
  _set: InputMaybe<Reset_Passwords_Set_Input>;
  pk_columns: Reset_Passwords_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Resource_Edit_AccessArgs = {
  _inc: InputMaybe<Resource_Edit_Access_Inc_Input>;
  _set: InputMaybe<Resource_Edit_Access_Set_Input>;
  where: Resource_Edit_Access_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Resource_Edit_Access_By_PkArgs = {
  _inc: InputMaybe<Resource_Edit_Access_Inc_Input>;
  _set: InputMaybe<Resource_Edit_Access_Set_Input>;
  pk_columns: Resource_Edit_Access_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Resource_LinksArgs = {
  _inc: InputMaybe<Resource_Links_Inc_Input>;
  _set: InputMaybe<Resource_Links_Set_Input>;
  where: Resource_Links_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Resource_Links_By_PkArgs = {
  _inc: InputMaybe<Resource_Links_Inc_Input>;
  _set: InputMaybe<Resource_Links_Set_Input>;
  pk_columns: Resource_Links_Pk_Columns_Input;
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
export type Mutation_RootUpdate_User_Group_InvitesArgs = {
  _inc: InputMaybe<User_Group_Invites_Inc_Input>;
  _set: InputMaybe<User_Group_Invites_Set_Input>;
  where: User_Group_Invites_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Group_Invites_By_PkArgs = {
  _inc: InputMaybe<User_Group_Invites_Inc_Input>;
  _set: InputMaybe<User_Group_Invites_Set_Input>;
  pk_columns: User_Group_Invites_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Group_MembersArgs = {
  _inc: InputMaybe<User_Group_Members_Inc_Input>;
  _set: InputMaybe<User_Group_Members_Set_Input>;
  where: User_Group_Members_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Group_Members_By_PkArgs = {
  _inc: InputMaybe<User_Group_Members_Inc_Input>;
  _set: InputMaybe<User_Group_Members_Set_Input>;
  pk_columns: User_Group_Members_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_GroupsArgs = {
  _inc: InputMaybe<User_Groups_Inc_Input>;
  _set: InputMaybe<User_Groups_Set_Input>;
  where: User_Groups_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Groups_By_PkArgs = {
  _inc: InputMaybe<User_Groups_Inc_Input>;
  _set: InputMaybe<User_Groups_Set_Input>;
  pk_columns: User_Groups_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_TokensArgs = {
  _inc: InputMaybe<User_Tokens_Inc_Input>;
  _set: InputMaybe<User_Tokens_Set_Input>;
  where: User_Tokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Tokens_By_PkArgs = {
  _inc: InputMaybe<User_Tokens_Inc_Input>;
  _set: InputMaybe<User_Tokens_Set_Input>;
  pk_columns: User_Tokens_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _append: InputMaybe<Users_Append_Input>;
  _delete_at_path: InputMaybe<Users_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Users_Delete_Elem_Input>;
  _delete_key: InputMaybe<Users_Delete_Key_Input>;
  _inc: InputMaybe<Users_Inc_Input>;
  _prepend: InputMaybe<Users_Prepend_Input>;
  _set: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _append: InputMaybe<Users_Append_Input>;
  _delete_at_path: InputMaybe<Users_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Users_Delete_Elem_Input>;
  _delete_key: InputMaybe<Users_Delete_Key_Input>;
  _inc: InputMaybe<Users_Inc_Input>;
  _prepend: InputMaybe<Users_Prepend_Input>;
  _set: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
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


/** mutation root */
export type Mutation_RootUpdate_Vc_Firms_Edit_AccessArgs = {
  _inc: InputMaybe<Vc_Firms_Edit_Access_Inc_Input>;
  _set: InputMaybe<Vc_Firms_Edit_Access_Set_Input>;
  where: Vc_Firms_Edit_Access_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Waitlist_EmailsArgs = {
  _inc: InputMaybe<Waitlist_Emails_Inc_Input>;
  _set: InputMaybe<Waitlist_Emails_Set_Input>;
  where: Waitlist_Emails_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Waitlist_Emails_By_PkArgs = {
  _inc: InputMaybe<Waitlist_Emails_Inc_Input>;
  _set: InputMaybe<Waitlist_Emails_Set_Input>;
  pk_columns: Waitlist_Emails_Pk_Columns_Input;
};

/** columns and relationships of "news" */
export type News = {
  __typename?: 'news';
  created_at: Scalars['timestamptz'];
  date: Maybe<Scalars['date']>;
  id: Scalars['Int'];
  link: Maybe<Scalars['String']>;
  /** An array relationship */
  organizations: Array<News_Organizations>;
  /** An aggregate relationship */
  organizations_aggregate: News_Organizations_Aggregate;
  status: Maybe<Scalars['String']>;
  text: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "news" */
export type NewsOrganizationsArgs = {
  distinct_on: InputMaybe<Array<News_Organizations_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<News_Organizations_Order_By>>;
  where: InputMaybe<News_Organizations_Bool_Exp>;
};


/** columns and relationships of "news" */
export type NewsOrganizations_AggregateArgs = {
  distinct_on: InputMaybe<Array<News_Organizations_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<News_Organizations_Order_By>>;
  where: InputMaybe<News_Organizations_Bool_Exp>;
};

/** aggregated selection of "news" */
export type News_Aggregate = {
  __typename?: 'news_aggregate';
  aggregate: Maybe<News_Aggregate_Fields>;
  nodes: Array<News>;
};

/** aggregate fields of "news" */
export type News_Aggregate_Fields = {
  __typename?: 'news_aggregate_fields';
  avg: Maybe<News_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<News_Max_Fields>;
  min: Maybe<News_Min_Fields>;
  stddev: Maybe<News_Stddev_Fields>;
  stddev_pop: Maybe<News_Stddev_Pop_Fields>;
  stddev_samp: Maybe<News_Stddev_Samp_Fields>;
  sum: Maybe<News_Sum_Fields>;
  var_pop: Maybe<News_Var_Pop_Fields>;
  var_samp: Maybe<News_Var_Samp_Fields>;
  variance: Maybe<News_Variance_Fields>;
};


/** aggregate fields of "news" */
export type News_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<News_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type News_Avg_Fields = {
  __typename?: 'news_avg_fields';
  id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "news". All fields are combined with a logical 'AND'. */
export type News_Bool_Exp = {
  _and: InputMaybe<Array<News_Bool_Exp>>;
  _not: InputMaybe<News_Bool_Exp>;
  _or: InputMaybe<Array<News_Bool_Exp>>;
  created_at: InputMaybe<Timestamptz_Comparison_Exp>;
  date: InputMaybe<Date_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  link: InputMaybe<String_Comparison_Exp>;
  organizations: InputMaybe<News_Organizations_Bool_Exp>;
  status: InputMaybe<String_Comparison_Exp>;
  text: InputMaybe<String_Comparison_Exp>;
  updated_at: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "news" */
export enum News_Constraint {
  /** unique or primary key constraint */
  NewsPkey = 'news_pkey'
}

/** input type for incrementing numeric columns in table "news" */
export type News_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "news" */
export type News_Insert_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  date: InputMaybe<Scalars['date']>;
  id: InputMaybe<Scalars['Int']>;
  link: InputMaybe<Scalars['String']>;
  organizations: InputMaybe<News_Organizations_Arr_Rel_Insert_Input>;
  status: InputMaybe<Scalars['String']>;
  text: InputMaybe<Scalars['String']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type News_Max_Fields = {
  __typename?: 'news_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  date: Maybe<Scalars['date']>;
  id: Maybe<Scalars['Int']>;
  link: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  text: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type News_Min_Fields = {
  __typename?: 'news_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  date: Maybe<Scalars['date']>;
  id: Maybe<Scalars['Int']>;
  link: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  text: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "news" */
export type News_Mutation_Response = {
  __typename?: 'news_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<News>;
};

/** input type for inserting object relation for remote table "news" */
export type News_Obj_Rel_Insert_Input = {
  data: News_Insert_Input;
  /** upsert condition */
  on_conflict: InputMaybe<News_On_Conflict>;
};

/** on_conflict condition type for table "news" */
export type News_On_Conflict = {
  constraint: News_Constraint;
  update_columns: Array<News_Update_Column>;
  where: InputMaybe<News_Bool_Exp>;
};

/** Ordering options when selecting data from "news". */
export type News_Order_By = {
  created_at: InputMaybe<Order_By>;
  date: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  link: InputMaybe<Order_By>;
  organizations_aggregate: InputMaybe<News_Organizations_Aggregate_Order_By>;
  status: InputMaybe<Order_By>;
  text: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
};

/** columns and relationships of "news_organizations" */
export type News_Organizations = {
  __typename?: 'news_organizations';
  /** An object relationship */
  company: Maybe<Companies>;
  company_id: Maybe<Scalars['Int']>;
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  /** An object relationship */
  news: Maybe<News>;
  news_id: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  vc_firm: Maybe<Vc_Firms>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** aggregated selection of "news_organizations" */
export type News_Organizations_Aggregate = {
  __typename?: 'news_organizations_aggregate';
  aggregate: Maybe<News_Organizations_Aggregate_Fields>;
  nodes: Array<News_Organizations>;
};

/** aggregate fields of "news_organizations" */
export type News_Organizations_Aggregate_Fields = {
  __typename?: 'news_organizations_aggregate_fields';
  avg: Maybe<News_Organizations_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<News_Organizations_Max_Fields>;
  min: Maybe<News_Organizations_Min_Fields>;
  stddev: Maybe<News_Organizations_Stddev_Fields>;
  stddev_pop: Maybe<News_Organizations_Stddev_Pop_Fields>;
  stddev_samp: Maybe<News_Organizations_Stddev_Samp_Fields>;
  sum: Maybe<News_Organizations_Sum_Fields>;
  var_pop: Maybe<News_Organizations_Var_Pop_Fields>;
  var_samp: Maybe<News_Organizations_Var_Samp_Fields>;
  variance: Maybe<News_Organizations_Variance_Fields>;
};


/** aggregate fields of "news_organizations" */
export type News_Organizations_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<News_Organizations_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "news_organizations" */
export type News_Organizations_Aggregate_Order_By = {
  avg: InputMaybe<News_Organizations_Avg_Order_By>;
  count: InputMaybe<Order_By>;
  max: InputMaybe<News_Organizations_Max_Order_By>;
  min: InputMaybe<News_Organizations_Min_Order_By>;
  stddev: InputMaybe<News_Organizations_Stddev_Order_By>;
  stddev_pop: InputMaybe<News_Organizations_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<News_Organizations_Stddev_Samp_Order_By>;
  sum: InputMaybe<News_Organizations_Sum_Order_By>;
  var_pop: InputMaybe<News_Organizations_Var_Pop_Order_By>;
  var_samp: InputMaybe<News_Organizations_Var_Samp_Order_By>;
  variance: InputMaybe<News_Organizations_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "news_organizations" */
export type News_Organizations_Arr_Rel_Insert_Input = {
  data: Array<News_Organizations_Insert_Input>;
  /** upsert condition */
  on_conflict: InputMaybe<News_Organizations_On_Conflict>;
};

/** aggregate avg on columns */
export type News_Organizations_Avg_Fields = {
  __typename?: 'news_organizations_avg_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  news_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "news_organizations" */
export type News_Organizations_Avg_Order_By = {
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  news_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "news_organizations". All fields are combined with a logical 'AND'. */
export type News_Organizations_Bool_Exp = {
  _and: InputMaybe<Array<News_Organizations_Bool_Exp>>;
  _not: InputMaybe<News_Organizations_Bool_Exp>;
  _or: InputMaybe<Array<News_Organizations_Bool_Exp>>;
  company: InputMaybe<Companies_Bool_Exp>;
  company_id: InputMaybe<Int_Comparison_Exp>;
  created_at: InputMaybe<Timestamptz_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  news: InputMaybe<News_Bool_Exp>;
  news_id: InputMaybe<Int_Comparison_Exp>;
  updated_at: InputMaybe<Timestamptz_Comparison_Exp>;
  vc_firm: InputMaybe<Vc_Firms_Bool_Exp>;
  vc_firm_id: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "news_organizations" */
export enum News_Organizations_Constraint {
  /** unique or primary key constraint */
  NewsOrganizationsPkey = 'news_organizations_pkey'
}

/** input type for incrementing numeric columns in table "news_organizations" */
export type News_Organizations_Inc_Input = {
  company_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  news_id: InputMaybe<Scalars['Int']>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "news_organizations" */
export type News_Organizations_Insert_Input = {
  company: InputMaybe<Companies_Obj_Rel_Insert_Input>;
  company_id: InputMaybe<Scalars['Int']>;
  created_at: InputMaybe<Scalars['timestamptz']>;
  id: InputMaybe<Scalars['Int']>;
  news: InputMaybe<News_Obj_Rel_Insert_Input>;
  news_id: InputMaybe<Scalars['Int']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  vc_firm: InputMaybe<Vc_Firms_Obj_Rel_Insert_Input>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type News_Organizations_Max_Fields = {
  __typename?: 'news_organizations_max_fields';
  company_id: Maybe<Scalars['Int']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['Int']>;
  news_id: Maybe<Scalars['Int']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "news_organizations" */
export type News_Organizations_Max_Order_By = {
  company_id: InputMaybe<Order_By>;
  created_at: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  news_id: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type News_Organizations_Min_Fields = {
  __typename?: 'news_organizations_min_fields';
  company_id: Maybe<Scalars['Int']>;
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['Int']>;
  news_id: Maybe<Scalars['Int']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "news_organizations" */
export type News_Organizations_Min_Order_By = {
  company_id: InputMaybe<Order_By>;
  created_at: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  news_id: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** response of any mutation on the table "news_organizations" */
export type News_Organizations_Mutation_Response = {
  __typename?: 'news_organizations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<News_Organizations>;
};

/** on_conflict condition type for table "news_organizations" */
export type News_Organizations_On_Conflict = {
  constraint: News_Organizations_Constraint;
  update_columns: Array<News_Organizations_Update_Column>;
  where: InputMaybe<News_Organizations_Bool_Exp>;
};

/** Ordering options when selecting data from "news_organizations". */
export type News_Organizations_Order_By = {
  company: InputMaybe<Companies_Order_By>;
  company_id: InputMaybe<Order_By>;
  created_at: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  news: InputMaybe<News_Order_By>;
  news_id: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
  vc_firm: InputMaybe<Vc_Firms_Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** primary key columns input for table: news_organizations */
export type News_Organizations_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "news_organizations" */
export enum News_Organizations_Select_Column {
  /** column name */
  CompanyId = 'company_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  NewsId = 'news_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VcFirmId = 'vc_firm_id'
}

/** input type for updating data in table "news_organizations" */
export type News_Organizations_Set_Input = {
  company_id: InputMaybe<Scalars['Int']>;
  created_at: InputMaybe<Scalars['timestamptz']>;
  id: InputMaybe<Scalars['Int']>;
  news_id: InputMaybe<Scalars['Int']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type News_Organizations_Stddev_Fields = {
  __typename?: 'news_organizations_stddev_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  news_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "news_organizations" */
export type News_Organizations_Stddev_Order_By = {
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  news_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type News_Organizations_Stddev_Pop_Fields = {
  __typename?: 'news_organizations_stddev_pop_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  news_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "news_organizations" */
export type News_Organizations_Stddev_Pop_Order_By = {
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  news_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type News_Organizations_Stddev_Samp_Fields = {
  __typename?: 'news_organizations_stddev_samp_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  news_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "news_organizations" */
export type News_Organizations_Stddev_Samp_Order_By = {
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  news_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type News_Organizations_Sum_Fields = {
  __typename?: 'news_organizations_sum_fields';
  company_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  news_id: Maybe<Scalars['Int']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "news_organizations" */
export type News_Organizations_Sum_Order_By = {
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  news_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** update columns of table "news_organizations" */
export enum News_Organizations_Update_Column {
  /** column name */
  CompanyId = 'company_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  NewsId = 'news_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VcFirmId = 'vc_firm_id'
}

/** aggregate var_pop on columns */
export type News_Organizations_Var_Pop_Fields = {
  __typename?: 'news_organizations_var_pop_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  news_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "news_organizations" */
export type News_Organizations_Var_Pop_Order_By = {
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  news_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type News_Organizations_Var_Samp_Fields = {
  __typename?: 'news_organizations_var_samp_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  news_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "news_organizations" */
export type News_Organizations_Var_Samp_Order_By = {
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  news_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type News_Organizations_Variance_Fields = {
  __typename?: 'news_organizations_variance_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  news_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "news_organizations" */
export type News_Organizations_Variance_Order_By = {
  company_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  news_id: InputMaybe<Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** primary key columns input for table: news */
export type News_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "news" */
export enum News_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  Id = 'id',
  /** column name */
  Link = 'link',
  /** column name */
  Status = 'status',
  /** column name */
  Text = 'text',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "news" */
export type News_Set_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  date: InputMaybe<Scalars['date']>;
  id: InputMaybe<Scalars['Int']>;
  link: InputMaybe<Scalars['String']>;
  status: InputMaybe<Scalars['String']>;
  text: InputMaybe<Scalars['String']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type News_Stddev_Fields = {
  __typename?: 'news_stddev_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type News_Stddev_Pop_Fields = {
  __typename?: 'news_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type News_Stddev_Samp_Fields = {
  __typename?: 'news_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type News_Sum_Fields = {
  __typename?: 'news_sum_fields';
  id: Maybe<Scalars['Int']>;
};

/** update columns of table "news" */
export enum News_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  Id = 'id',
  /** column name */
  Link = 'link',
  /** column name */
  Status = 'status',
  /** column name */
  Text = 'text',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type News_Var_Pop_Fields = {
  __typename?: 'news_var_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type News_Var_Samp_Fields = {
  __typename?: 'news_var_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type News_Variance_Fields = {
  __typename?: 'news_variance_fields';
  id: Maybe<Scalars['Float']>;
};

/** columns and relationships of "notes" */
export type Notes = {
  __typename?: 'notes';
  created_at: Scalars['timestamp'];
  created_by: Scalars['Int'];
  id: Scalars['Int'];
  notes: Scalars['String'];
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user_group: User_Groups;
  user_group_id: Scalars['Int'];
};

/** aggregated selection of "notes" */
export type Notes_Aggregate = {
  __typename?: 'notes_aggregate';
  aggregate: Maybe<Notes_Aggregate_Fields>;
  nodes: Array<Notes>;
};

/** aggregate fields of "notes" */
export type Notes_Aggregate_Fields = {
  __typename?: 'notes_aggregate_fields';
  avg: Maybe<Notes_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Notes_Max_Fields>;
  min: Maybe<Notes_Min_Fields>;
  stddev: Maybe<Notes_Stddev_Fields>;
  stddev_pop: Maybe<Notes_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Notes_Stddev_Samp_Fields>;
  sum: Maybe<Notes_Sum_Fields>;
  var_pop: Maybe<Notes_Var_Pop_Fields>;
  var_samp: Maybe<Notes_Var_Samp_Fields>;
  variance: Maybe<Notes_Variance_Fields>;
};


/** aggregate fields of "notes" */
export type Notes_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Notes_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "notes" */
export type Notes_Aggregate_Order_By = {
  avg: InputMaybe<Notes_Avg_Order_By>;
  count: InputMaybe<Order_By>;
  max: InputMaybe<Notes_Max_Order_By>;
  min: InputMaybe<Notes_Min_Order_By>;
  stddev: InputMaybe<Notes_Stddev_Order_By>;
  stddev_pop: InputMaybe<Notes_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Notes_Stddev_Samp_Order_By>;
  sum: InputMaybe<Notes_Sum_Order_By>;
  var_pop: InputMaybe<Notes_Var_Pop_Order_By>;
  var_samp: InputMaybe<Notes_Var_Samp_Order_By>;
  variance: InputMaybe<Notes_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "notes" */
export type Notes_Arr_Rel_Insert_Input = {
  data: Array<Notes_Insert_Input>;
  /** upsert condition */
  on_conflict: InputMaybe<Notes_On_Conflict>;
};

/** aggregate avg on columns */
export type Notes_Avg_Fields = {
  __typename?: 'notes_avg_fields';
  created_by: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "notes" */
export type Notes_Avg_Order_By = {
  created_by: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "notes". All fields are combined with a logical 'AND'. */
export type Notes_Bool_Exp = {
  _and: InputMaybe<Array<Notes_Bool_Exp>>;
  _not: InputMaybe<Notes_Bool_Exp>;
  _or: InputMaybe<Array<Notes_Bool_Exp>>;
  created_at: InputMaybe<Timestamp_Comparison_Exp>;
  created_by: InputMaybe<Int_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  notes: InputMaybe<String_Comparison_Exp>;
  resource_id: InputMaybe<Int_Comparison_Exp>;
  resource_type: InputMaybe<String_Comparison_Exp>;
  updated_at: InputMaybe<Timestamptz_Comparison_Exp>;
  user_group: InputMaybe<User_Groups_Bool_Exp>;
  user_group_id: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "notes" */
export enum Notes_Constraint {
  /** unique or primary key constraint */
  NotesPkey = 'notes_pkey'
}

/** input type for incrementing numeric columns in table "notes" */
export type Notes_Inc_Input = {
  created_by: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  user_group_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "notes" */
export type Notes_Insert_Input = {
  created_at: InputMaybe<Scalars['timestamp']>;
  created_by: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  notes: InputMaybe<Scalars['String']>;
  resource_id: InputMaybe<Scalars['Int']>;
  resource_type: InputMaybe<Scalars['String']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  user_group: InputMaybe<User_Groups_Obj_Rel_Insert_Input>;
  user_group_id: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Notes_Max_Fields = {
  __typename?: 'notes_max_fields';
  created_at: Maybe<Scalars['timestamp']>;
  created_by: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  notes: Maybe<Scalars['String']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_group_id: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "notes" */
export type Notes_Max_Order_By = {
  created_at: InputMaybe<Order_By>;
  created_by: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  notes: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  resource_type: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Notes_Min_Fields = {
  __typename?: 'notes_min_fields';
  created_at: Maybe<Scalars['timestamp']>;
  created_by: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  notes: Maybe<Scalars['String']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  user_group_id: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "notes" */
export type Notes_Min_Order_By = {
  created_at: InputMaybe<Order_By>;
  created_by: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  notes: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  resource_type: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** response of any mutation on the table "notes" */
export type Notes_Mutation_Response = {
  __typename?: 'notes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Notes>;
};

/** on_conflict condition type for table "notes" */
export type Notes_On_Conflict = {
  constraint: Notes_Constraint;
  update_columns: Array<Notes_Update_Column>;
  where: InputMaybe<Notes_Bool_Exp>;
};

/** Ordering options when selecting data from "notes". */
export type Notes_Order_By = {
  created_at: InputMaybe<Order_By>;
  created_by: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  notes: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  resource_type: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
  user_group: InputMaybe<User_Groups_Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** primary key columns input for table: notes */
export type Notes_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "notes" */
export enum Notes_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  Id = 'id',
  /** column name */
  Notes = 'notes',
  /** column name */
  ResourceId = 'resource_id',
  /** column name */
  ResourceType = 'resource_type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserGroupId = 'user_group_id'
}

/** input type for updating data in table "notes" */
export type Notes_Set_Input = {
  created_at: InputMaybe<Scalars['timestamp']>;
  created_by: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  notes: InputMaybe<Scalars['String']>;
  resource_id: InputMaybe<Scalars['Int']>;
  resource_type: InputMaybe<Scalars['String']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  user_group_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Notes_Stddev_Fields = {
  __typename?: 'notes_stddev_fields';
  created_by: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "notes" */
export type Notes_Stddev_Order_By = {
  created_by: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Notes_Stddev_Pop_Fields = {
  __typename?: 'notes_stddev_pop_fields';
  created_by: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "notes" */
export type Notes_Stddev_Pop_Order_By = {
  created_by: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Notes_Stddev_Samp_Fields = {
  __typename?: 'notes_stddev_samp_fields';
  created_by: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "notes" */
export type Notes_Stddev_Samp_Order_By = {
  created_by: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Notes_Sum_Fields = {
  __typename?: 'notes_sum_fields';
  created_by: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  user_group_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "notes" */
export type Notes_Sum_Order_By = {
  created_by: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** update columns of table "notes" */
export enum Notes_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  Id = 'id',
  /** column name */
  Notes = 'notes',
  /** column name */
  ResourceId = 'resource_id',
  /** column name */
  ResourceType = 'resource_type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserGroupId = 'user_group_id'
}

/** aggregate var_pop on columns */
export type Notes_Var_Pop_Fields = {
  __typename?: 'notes_var_pop_fields';
  created_by: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "notes" */
export type Notes_Var_Pop_Order_By = {
  created_by: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Notes_Var_Samp_Fields = {
  __typename?: 'notes_var_samp_fields';
  created_by: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "notes" */
export type Notes_Var_Samp_Order_By = {
  created_by: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Notes_Variance_Fields = {
  __typename?: 'notes_variance_fields';
  created_by: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "notes" */
export type Notes_Variance_Order_By = {
  created_by: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** columns and relationships of "notifications" */
export type Notifications = {
  __typename?: 'notifications';
  action_ids: Maybe<Scalars['jsonb']>;
  /** An object relationship */
  company: Maybe<Companies>;
  company_id: Maybe<Scalars['Int']>;
  created_at: Scalars['timestamptz'];
  event_type: Scalars['String'];
  follow_resource_type: Scalars['String'];
  id: Scalars['Int'];
  message: Maybe<Scalars['String']>;
  notification_resource_type: Scalars['String'];
  read: Scalars['Boolean'];
  read_at: Maybe<Scalars['timestamptz']>;
  target_user_id: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  vc_firm: Maybe<Vc_Firms>;
  vc_firm_id: Maybe<Scalars['Int']>;
};


/** columns and relationships of "notifications" */
export type NotificationsAction_IdsArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "notifications" */
export type Notifications_Aggregate = {
  __typename?: 'notifications_aggregate';
  aggregate: Maybe<Notifications_Aggregate_Fields>;
  nodes: Array<Notifications>;
};

/** aggregate fields of "notifications" */
export type Notifications_Aggregate_Fields = {
  __typename?: 'notifications_aggregate_fields';
  avg: Maybe<Notifications_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Notifications_Max_Fields>;
  min: Maybe<Notifications_Min_Fields>;
  stddev: Maybe<Notifications_Stddev_Fields>;
  stddev_pop: Maybe<Notifications_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Notifications_Stddev_Samp_Fields>;
  sum: Maybe<Notifications_Sum_Fields>;
  var_pop: Maybe<Notifications_Var_Pop_Fields>;
  var_samp: Maybe<Notifications_Var_Samp_Fields>;
  variance: Maybe<Notifications_Variance_Fields>;
};


/** aggregate fields of "notifications" */
export type Notifications_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Notifications_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Notifications_Append_Input = {
  action_ids: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Notifications_Avg_Fields = {
  __typename?: 'notifications_avg_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  target_user_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "notifications". All fields are combined with a logical 'AND'. */
export type Notifications_Bool_Exp = {
  _and: InputMaybe<Array<Notifications_Bool_Exp>>;
  _not: InputMaybe<Notifications_Bool_Exp>;
  _or: InputMaybe<Array<Notifications_Bool_Exp>>;
  action_ids: InputMaybe<Jsonb_Comparison_Exp>;
  company: InputMaybe<Companies_Bool_Exp>;
  company_id: InputMaybe<Int_Comparison_Exp>;
  created_at: InputMaybe<Timestamptz_Comparison_Exp>;
  event_type: InputMaybe<String_Comparison_Exp>;
  follow_resource_type: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  message: InputMaybe<String_Comparison_Exp>;
  notification_resource_type: InputMaybe<String_Comparison_Exp>;
  read: InputMaybe<Boolean_Comparison_Exp>;
  read_at: InputMaybe<Timestamptz_Comparison_Exp>;
  target_user_id: InputMaybe<Int_Comparison_Exp>;
  updated_at: InputMaybe<Timestamptz_Comparison_Exp>;
  vc_firm: InputMaybe<Vc_Firms_Bool_Exp>;
  vc_firm_id: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "notifications" */
export enum Notifications_Constraint {
  /** unique or primary key constraint */
  NotificationsPkey = 'notifications_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Notifications_Delete_At_Path_Input = {
  action_ids: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Notifications_Delete_Elem_Input = {
  action_ids: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Notifications_Delete_Key_Input = {
  action_ids: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "notifications" */
export type Notifications_Inc_Input = {
  company_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  target_user_id: InputMaybe<Scalars['Int']>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "notifications" */
export type Notifications_Insert_Input = {
  action_ids: InputMaybe<Scalars['jsonb']>;
  company: InputMaybe<Companies_Obj_Rel_Insert_Input>;
  company_id: InputMaybe<Scalars['Int']>;
  created_at: InputMaybe<Scalars['timestamptz']>;
  event_type: InputMaybe<Scalars['String']>;
  follow_resource_type: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  message: InputMaybe<Scalars['String']>;
  notification_resource_type: InputMaybe<Scalars['String']>;
  read: InputMaybe<Scalars['Boolean']>;
  read_at: InputMaybe<Scalars['timestamptz']>;
  target_user_id: InputMaybe<Scalars['Int']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  vc_firm: InputMaybe<Vc_Firms_Obj_Rel_Insert_Input>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Notifications_Max_Fields = {
  __typename?: 'notifications_max_fields';
  company_id: Maybe<Scalars['Int']>;
  created_at: Maybe<Scalars['timestamptz']>;
  event_type: Maybe<Scalars['String']>;
  follow_resource_type: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  message: Maybe<Scalars['String']>;
  notification_resource_type: Maybe<Scalars['String']>;
  read_at: Maybe<Scalars['timestamptz']>;
  target_user_id: Maybe<Scalars['Int']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Notifications_Min_Fields = {
  __typename?: 'notifications_min_fields';
  company_id: Maybe<Scalars['Int']>;
  created_at: Maybe<Scalars['timestamptz']>;
  event_type: Maybe<Scalars['String']>;
  follow_resource_type: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  message: Maybe<Scalars['String']>;
  notification_resource_type: Maybe<Scalars['String']>;
  read_at: Maybe<Scalars['timestamptz']>;
  target_user_id: Maybe<Scalars['Int']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "notifications" */
export type Notifications_Mutation_Response = {
  __typename?: 'notifications_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Notifications>;
};

/** on_conflict condition type for table "notifications" */
export type Notifications_On_Conflict = {
  constraint: Notifications_Constraint;
  update_columns: Array<Notifications_Update_Column>;
  where: InputMaybe<Notifications_Bool_Exp>;
};

/** Ordering options when selecting data from "notifications". */
export type Notifications_Order_By = {
  action_ids: InputMaybe<Order_By>;
  company: InputMaybe<Companies_Order_By>;
  company_id: InputMaybe<Order_By>;
  created_at: InputMaybe<Order_By>;
  event_type: InputMaybe<Order_By>;
  follow_resource_type: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  message: InputMaybe<Order_By>;
  notification_resource_type: InputMaybe<Order_By>;
  read: InputMaybe<Order_By>;
  read_at: InputMaybe<Order_By>;
  target_user_id: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
  vc_firm: InputMaybe<Vc_Firms_Order_By>;
  vc_firm_id: InputMaybe<Order_By>;
};

/** primary key columns input for table: notifications */
export type Notifications_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Notifications_Prepend_Input = {
  action_ids: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "notifications" */
export enum Notifications_Select_Column {
  /** column name */
  ActionIds = 'action_ids',
  /** column name */
  CompanyId = 'company_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventType = 'event_type',
  /** column name */
  FollowResourceType = 'follow_resource_type',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  NotificationResourceType = 'notification_resource_type',
  /** column name */
  Read = 'read',
  /** column name */
  ReadAt = 'read_at',
  /** column name */
  TargetUserId = 'target_user_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VcFirmId = 'vc_firm_id'
}

/** input type for updating data in table "notifications" */
export type Notifications_Set_Input = {
  action_ids: InputMaybe<Scalars['jsonb']>;
  company_id: InputMaybe<Scalars['Int']>;
  created_at: InputMaybe<Scalars['timestamptz']>;
  event_type: InputMaybe<Scalars['String']>;
  follow_resource_type: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  message: InputMaybe<Scalars['String']>;
  notification_resource_type: InputMaybe<Scalars['String']>;
  read: InputMaybe<Scalars['Boolean']>;
  read_at: InputMaybe<Scalars['timestamptz']>;
  target_user_id: InputMaybe<Scalars['Int']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Notifications_Stddev_Fields = {
  __typename?: 'notifications_stddev_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  target_user_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Notifications_Stddev_Pop_Fields = {
  __typename?: 'notifications_stddev_pop_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  target_user_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Notifications_Stddev_Samp_Fields = {
  __typename?: 'notifications_stddev_samp_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  target_user_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Notifications_Sum_Fields = {
  __typename?: 'notifications_sum_fields';
  company_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  target_user_id: Maybe<Scalars['Int']>;
  vc_firm_id: Maybe<Scalars['Int']>;
};

/** update columns of table "notifications" */
export enum Notifications_Update_Column {
  /** column name */
  ActionIds = 'action_ids',
  /** column name */
  CompanyId = 'company_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventType = 'event_type',
  /** column name */
  FollowResourceType = 'follow_resource_type',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  NotificationResourceType = 'notification_resource_type',
  /** column name */
  Read = 'read',
  /** column name */
  ReadAt = 'read_at',
  /** column name */
  TargetUserId = 'target_user_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VcFirmId = 'vc_firm_id'
}

/** aggregate var_pop on columns */
export type Notifications_Var_Pop_Fields = {
  __typename?: 'notifications_var_pop_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  target_user_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Notifications_Var_Samp_Fields = {
  __typename?: 'notifications_var_samp_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  target_user_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Notifications_Variance_Fields = {
  __typename?: 'notifications_variance_fields';
  company_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  target_user_id: Maybe<Scalars['Float']>;
  vc_firm_id: Maybe<Scalars['Float']>;
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
  about: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  country: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  /** [{"email": "john@example.com", "isPrimary": false}, {"email": "johny@example.com", "isPrimary": true}] */
  email: Maybe<Scalars['jsonb']>;
  external_id: Maybe<Scalars['String']>;
  facebook_url: Maybe<Scalars['String']>;
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
  library: Maybe<Scalars['jsonb']>;
  linkedin: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  personal_email: Maybe<Scalars['String']>;
  picture: Maybe<Scalars['jsonb']>;
  slug: Scalars['String'];
  status: Scalars['String'];
  /** An array relationship */
  team_members: Array<Team_Members>;
  /** An aggregate relationship */
  team_members_aggregate: Team_Members_Aggregate;
  twitter_url: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  website_url: Maybe<Scalars['String']>;
  work_email: Maybe<Scalars['String']>;
};


/** columns and relationships of "people" */
export type PeopleEmailArgs = {
  path: InputMaybe<Scalars['String']>;
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
export type PeopleLibraryArgs = {
  path: InputMaybe<Scalars['String']>;
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
  /** [{"email": "john@example.com", "isPrimary": false}, {"email": "johny@example.com", "isPrimary": true}] */
  email: InputMaybe<Scalars['jsonb']>;
  library: InputMaybe<Scalars['jsonb']>;
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
  about: InputMaybe<String_Comparison_Exp>;
  city: InputMaybe<String_Comparison_Exp>;
  country: InputMaybe<String_Comparison_Exp>;
  created_at: InputMaybe<Timestamptz_Comparison_Exp>;
  email: InputMaybe<Jsonb_Comparison_Exp>;
  external_id: InputMaybe<String_Comparison_Exp>;
  facebook_url: InputMaybe<String_Comparison_Exp>;
  github: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  investments: InputMaybe<Investments_Bool_Exp>;
  investors: InputMaybe<Investors_Bool_Exp>;
  library: InputMaybe<Jsonb_Comparison_Exp>;
  linkedin: InputMaybe<String_Comparison_Exp>;
  name: InputMaybe<String_Comparison_Exp>;
  personal_email: InputMaybe<String_Comparison_Exp>;
  picture: InputMaybe<Jsonb_Comparison_Exp>;
  slug: InputMaybe<String_Comparison_Exp>;
  status: InputMaybe<String_Comparison_Exp>;
  team_members: InputMaybe<Team_Members_Bool_Exp>;
  twitter_url: InputMaybe<String_Comparison_Exp>;
  type: InputMaybe<String_Comparison_Exp>;
  updated_at: InputMaybe<Timestamptz_Comparison_Exp>;
  website_url: InputMaybe<String_Comparison_Exp>;
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
  /** [{"email": "john@example.com", "isPrimary": false}, {"email": "johny@example.com", "isPrimary": true}] */
  email: InputMaybe<Array<Scalars['String']>>;
  library: InputMaybe<Array<Scalars['String']>>;
  picture: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type People_Delete_Elem_Input = {
  /** [{"email": "john@example.com", "isPrimary": false}, {"email": "johny@example.com", "isPrimary": true}] */
  email: InputMaybe<Scalars['Int']>;
  library: InputMaybe<Scalars['Int']>;
  picture: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type People_Delete_Key_Input = {
  /** [{"email": "john@example.com", "isPrimary": false}, {"email": "johny@example.com", "isPrimary": true}] */
  email: InputMaybe<Scalars['String']>;
  library: InputMaybe<Scalars['String']>;
  picture: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "people" */
export type People_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "people" */
export type People_Insert_Input = {
  about: InputMaybe<Scalars['String']>;
  city: InputMaybe<Scalars['String']>;
  country: InputMaybe<Scalars['String']>;
  created_at: InputMaybe<Scalars['timestamptz']>;
  /** [{"email": "john@example.com", "isPrimary": false}, {"email": "johny@example.com", "isPrimary": true}] */
  email: InputMaybe<Scalars['jsonb']>;
  external_id: InputMaybe<Scalars['String']>;
  facebook_url: InputMaybe<Scalars['String']>;
  github: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  investments: InputMaybe<Investments_Arr_Rel_Insert_Input>;
  investors: InputMaybe<Investors_Arr_Rel_Insert_Input>;
  library: InputMaybe<Scalars['jsonb']>;
  linkedin: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  personal_email: InputMaybe<Scalars['String']>;
  picture: InputMaybe<Scalars['jsonb']>;
  slug: InputMaybe<Scalars['String']>;
  status: InputMaybe<Scalars['String']>;
  team_members: InputMaybe<Team_Members_Arr_Rel_Insert_Input>;
  twitter_url: InputMaybe<Scalars['String']>;
  type: InputMaybe<Scalars['String']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  website_url: InputMaybe<Scalars['String']>;
  work_email: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type People_Max_Fields = {
  __typename?: 'people_max_fields';
  about: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  country: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['timestamptz']>;
  external_id: Maybe<Scalars['String']>;
  facebook_url: Maybe<Scalars['String']>;
  github: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  linkedin: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  personal_email: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  twitter_url: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  website_url: Maybe<Scalars['String']>;
  work_email: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type People_Min_Fields = {
  __typename?: 'people_min_fields';
  about: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  country: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['timestamptz']>;
  external_id: Maybe<Scalars['String']>;
  facebook_url: Maybe<Scalars['String']>;
  github: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  linkedin: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  personal_email: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  twitter_url: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  website_url: Maybe<Scalars['String']>;
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
  about: InputMaybe<Order_By>;
  city: InputMaybe<Order_By>;
  country: InputMaybe<Order_By>;
  created_at: InputMaybe<Order_By>;
  email: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  facebook_url: InputMaybe<Order_By>;
  github: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  investments_aggregate: InputMaybe<Investments_Aggregate_Order_By>;
  investors_aggregate: InputMaybe<Investors_Aggregate_Order_By>;
  library: InputMaybe<Order_By>;
  linkedin: InputMaybe<Order_By>;
  name: InputMaybe<Order_By>;
  personal_email: InputMaybe<Order_By>;
  picture: InputMaybe<Order_By>;
  slug: InputMaybe<Order_By>;
  status: InputMaybe<Order_By>;
  team_members_aggregate: InputMaybe<Team_Members_Aggregate_Order_By>;
  twitter_url: InputMaybe<Order_By>;
  type: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
  website_url: InputMaybe<Order_By>;
  work_email: InputMaybe<Order_By>;
};

/** primary key columns input for table: people */
export type People_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type People_Prepend_Input = {
  /** [{"email": "john@example.com", "isPrimary": false}, {"email": "johny@example.com", "isPrimary": true}] */
  email: InputMaybe<Scalars['jsonb']>;
  library: InputMaybe<Scalars['jsonb']>;
  picture: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "people" */
export enum People_Select_Column {
  /** column name */
  About = 'about',
  /** column name */
  City = 'city',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  FacebookUrl = 'facebook_url',
  /** column name */
  Github = 'github',
  /** column name */
  Id = 'id',
  /** column name */
  Library = 'library',
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
  Status = 'status',
  /** column name */
  TwitterUrl = 'twitter_url',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WebsiteUrl = 'website_url',
  /** column name */
  WorkEmail = 'work_email'
}

/** input type for updating data in table "people" */
export type People_Set_Input = {
  about: InputMaybe<Scalars['String']>;
  city: InputMaybe<Scalars['String']>;
  country: InputMaybe<Scalars['String']>;
  created_at: InputMaybe<Scalars['timestamptz']>;
  /** [{"email": "john@example.com", "isPrimary": false}, {"email": "johny@example.com", "isPrimary": true}] */
  email: InputMaybe<Scalars['jsonb']>;
  external_id: InputMaybe<Scalars['String']>;
  facebook_url: InputMaybe<Scalars['String']>;
  github: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  library: InputMaybe<Scalars['jsonb']>;
  linkedin: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  personal_email: InputMaybe<Scalars['String']>;
  picture: InputMaybe<Scalars['jsonb']>;
  slug: InputMaybe<Scalars['String']>;
  status: InputMaybe<Scalars['String']>;
  twitter_url: InputMaybe<Scalars['String']>;
  type: InputMaybe<Scalars['String']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  website_url: InputMaybe<Scalars['String']>;
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
  About = 'about',
  /** column name */
  City = 'city',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  FacebookUrl = 'facebook_url',
  /** column name */
  Github = 'github',
  /** column name */
  Id = 'id',
  /** column name */
  Library = 'library',
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
  Status = 'status',
  /** column name */
  TwitterUrl = 'twitter_url',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WebsiteUrl = 'website_url',
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
  /** fetch data from the table: "actions" */
  actions: Array<Actions>;
  /** fetch aggregated fields from the table: "actions" */
  actions_aggregate: Actions_Aggregate;
  /** fetch data from the table: "actions" using primary key columns */
  actions_by_pk: Maybe<Actions>;
  /** fetch data from the table: "allowed_emails" */
  allowed_emails: Array<Allowed_Emails>;
  /** fetch aggregated fields from the table: "allowed_emails" */
  allowed_emails_aggregate: Allowed_Emails_Aggregate;
  /** fetch data from the table: "allowed_emails" using primary key columns */
  allowed_emails_by_pk: Maybe<Allowed_Emails>;
  /** fetch data from the table: "application_meta" */
  application_meta: Array<Application_Meta>;
  /** fetch aggregated fields from the table: "application_meta" */
  application_meta_aggregate: Application_Meta_Aggregate;
  /** fetch data from the table: "application_meta" using primary key columns */
  application_meta_by_pk: Maybe<Application_Meta>;
  /** fetch data from the table: "billing_org" */
  billing_org: Array<Billing_Org>;
  /** fetch aggregated fields from the table: "billing_org" */
  billing_org_aggregate: Billing_Org_Aggregate;
  /** fetch data from the table: "billing_org" using primary key columns */
  billing_org_by_pk: Maybe<Billing_Org>;
  /** fetch data from the table: "blockchains" */
  blockchains: Array<Blockchains>;
  /** fetch aggregated fields from the table: "blockchains" */
  blockchains_aggregate: Blockchains_Aggregate;
  /** fetch data from the table: "blockchains" using primary key columns */
  blockchains_by_pk: Maybe<Blockchains>;
  /** fetch data from the table: "coins" */
  coins: Array<Coins>;
  /** fetch aggregated fields from the table: "coins" */
  coins_aggregate: Coins_Aggregate;
  /** fetch data from the table: "coins" using primary key columns */
  coins_by_pk: Maybe<Coins>;
  /** fetch data from the table: "companies" */
  companies: Array<Companies>;
  /** fetch aggregated fields from the table: "companies" */
  companies_aggregate: Companies_Aggregate;
  /** fetch data from the table: "companies" using primary key columns */
  companies_by_pk: Maybe<Companies>;
  /** fetch data from the table: "companies_edit_access" */
  companies_edit_access: Array<Companies_Edit_Access>;
  /** fetch aggregated fields from the table: "companies_edit_access" */
  companies_edit_access_aggregate: Companies_Edit_Access_Aggregate;
  /** fetch data from the table: "data_actions" */
  data_actions: Array<Data_Actions>;
  /** fetch aggregated fields from the table: "data_actions" */
  data_actions_aggregate: Data_Actions_Aggregate;
  /** fetch data from the table: "data_actions" using primary key columns */
  data_actions_by_pk: Maybe<Data_Actions>;
  /** fetch data from the table: "data_fields" */
  data_fields: Array<Data_Fields>;
  /** fetch aggregated fields from the table: "data_fields" */
  data_fields_aggregate: Data_Fields_Aggregate;
  /** fetch data from the table: "data_fields" using primary key columns */
  data_fields_by_pk: Maybe<Data_Fields>;
  /** fetch data from the table: "data_partners" */
  data_partners: Array<Data_Partners>;
  /** fetch aggregated fields from the table: "data_partners" */
  data_partners_aggregate: Data_Partners_Aggregate;
  /** fetch data from the table: "data_partners" using primary key columns */
  data_partners_by_pk: Maybe<Data_Partners>;
  /** fetch data from the table: "data_raw" */
  data_raw: Array<Data_Raw>;
  /** fetch aggregated fields from the table: "data_raw" */
  data_raw_aggregate: Data_Raw_Aggregate;
  /** fetch data from the table: "data_raw" using primary key columns */
  data_raw_by_pk: Maybe<Data_Raw>;
  /** fetch data from the table: "data_runs" */
  data_runs: Array<Data_Runs>;
  /** fetch aggregated fields from the table: "data_runs" */
  data_runs_aggregate: Data_Runs_Aggregate;
  /** fetch data from the table: "data_runs" using primary key columns */
  data_runs_by_pk: Maybe<Data_Runs>;
  /** fetch data from the table: "disabled_emails" */
  disabled_emails: Array<Disabled_Emails>;
  /** fetch aggregated fields from the table: "disabled_emails" */
  disabled_emails_aggregate: Disabled_Emails_Aggregate;
  /** fetch data from the table: "disabled_emails" using primary key columns */
  disabled_emails_by_pk: Maybe<Disabled_Emails>;
  /** An array relationship */
  event_organization: Array<Event_Organization>;
  /** An aggregate relationship */
  event_organization_aggregate: Event_Organization_Aggregate;
  /** fetch data from the table: "event_organization" using primary key columns */
  event_organization_by_pk: Maybe<Event_Organization>;
  /** An array relationship */
  event_person: Array<Event_Person>;
  /** An aggregate relationship */
  event_person_aggregate: Event_Person_Aggregate;
  /** fetch data from the table: "event_person" using primary key columns */
  event_person_by_pk: Maybe<Event_Person>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk: Maybe<Events>;
  /** fetch data from the table: "follows" */
  follows: Array<Follows>;
  /** fetch aggregated fields from the table: "follows" */
  follows_aggregate: Follows_Aggregate;
  /** fetch data from the table: "follows" using primary key columns */
  follows_by_pk: Maybe<Follows>;
  /** An array relationship */
  follows_companies: Array<Follows_Companies>;
  /** An aggregate relationship */
  follows_companies_aggregate: Follows_Companies_Aggregate;
  /** fetch data from the table: "follows_vc_firms" */
  follows_vc_firms: Array<Follows_Vc_Firms>;
  /** fetch aggregated fields from the table: "follows_vc_firms" */
  follows_vc_firms_aggregate: Follows_Vc_Firms_Aggregate;
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
  /** An array relationship */
  list_members: Array<List_Members>;
  /** An aggregate relationship */
  list_members_aggregate: List_Members_Aggregate;
  /** fetch data from the table: "list_members" using primary key columns */
  list_members_by_pk: Maybe<List_Members>;
  /** fetch data from the table: "list_user_groups" */
  list_user_groups: Array<List_User_Groups>;
  /** fetch aggregated fields from the table: "list_user_groups" */
  list_user_groups_aggregate: List_User_Groups_Aggregate;
  /** fetch data from the table: "list_user_groups" using primary key columns */
  list_user_groups_by_pk: Maybe<List_User_Groups>;
  /** fetch data from the table: "lists" */
  lists: Array<Lists>;
  /** fetch aggregated fields from the table: "lists" */
  lists_aggregate: Lists_Aggregate;
  /** fetch data from the table: "lists" using primary key columns */
  lists_by_pk: Maybe<Lists>;
  /** fetch data from the table: "news" */
  news: Array<News>;
  /** fetch aggregated fields from the table: "news" */
  news_aggregate: News_Aggregate;
  /** fetch data from the table: "news" using primary key columns */
  news_by_pk: Maybe<News>;
  /** fetch data from the table: "news_organizations" */
  news_organizations: Array<News_Organizations>;
  /** fetch aggregated fields from the table: "news_organizations" */
  news_organizations_aggregate: News_Organizations_Aggregate;
  /** fetch data from the table: "news_organizations" using primary key columns */
  news_organizations_by_pk: Maybe<News_Organizations>;
  /** An array relationship */
  notes: Array<Notes>;
  /** An aggregate relationship */
  notes_aggregate: Notes_Aggregate;
  /** fetch data from the table: "notes" using primary key columns */
  notes_by_pk: Maybe<Notes>;
  /** fetch data from the table: "notifications" */
  notifications: Array<Notifications>;
  /** fetch aggregated fields from the table: "notifications" */
  notifications_aggregate: Notifications_Aggregate;
  /** fetch data from the table: "notifications" using primary key columns */
  notifications_by_pk: Maybe<Notifications>;
  /** fetch data from the table: "people" */
  people: Array<People>;
  /** fetch aggregated fields from the table: "people" */
  people_aggregate: People_Aggregate;
  /** fetch data from the table: "people" using primary key columns */
  people_by_pk: Maybe<People>;
   /** fetch data from the table: "reset_passwords" */
  reset_passwords: Array<Reset_Passwords>;
  /** fetch aggregated fields from the table: "reset_passwords" */
  reset_passwords_aggregate: Reset_Passwords_Aggregate;
  /** fetch data from the table: "reset_passwords" using primary key columns */
  reset_passwords_by_pk: Maybe<Reset_Passwords>;
  /** fetch data from the table: "resource_edit_access" */
  resource_edit_access: Array<Resource_Edit_Access>;
  /** fetch aggregated fields from the table: "resource_edit_access" */
  resource_edit_access_aggregate: Resource_Edit_Access_Aggregate;
  /** fetch data from the table: "resource_edit_access" using primary key columns */
  resource_edit_access_by_pk: Maybe<Resource_Edit_Access>;
  /** fetch data from the table: "resource_links" */
  resource_links: Array<Resource_Links>;
  /** fetch aggregated fields from the table: "resource_links" */
  resource_links_aggregate: Resource_Links_Aggregate;
  /** fetch data from the table: "resource_links" using primary key columns */
  resource_links_by_pk: Maybe<Resource_Links>;
  /** An array relationship */
  team_members: Array<Team_Members>;
  /** An aggregate relationship */
  team_members_aggregate: Team_Members_Aggregate;
  /** fetch data from the table: "team_members" using primary key columns */
  team_members_by_pk: Maybe<Team_Members>;
  /** An array relationship */
  user_group_invites: Array<User_Group_Invites>;
  /** An aggregate relationship */
  user_group_invites_aggregate: User_Group_Invites_Aggregate;
  /** fetch data from the table: "user_group_invites" using primary key columns */
  user_group_invites_by_pk: Maybe<User_Group_Invites>;
  /** An array relationship */
  user_group_members: Array<User_Group_Members>;
  /** An aggregate relationship */
  user_group_members_aggregate: User_Group_Members_Aggregate;
  /** fetch data from the table: "user_group_members" using primary key columns */
  user_group_members_by_pk: Maybe<User_Group_Members>;
  /** fetch data from the table: "user_groups" */
  user_groups: Array<User_Groups>;
  /** fetch aggregated fields from the table: "user_groups" */
  user_groups_aggregate: User_Groups_Aggregate;
  /** fetch data from the table: "user_groups" using primary key columns */
  user_groups_by_pk: Maybe<User_Groups>;
  /** fetch data from the table: "user_tokens" */
  user_tokens: Array<User_Tokens>;
  /** fetch aggregated fields from the table: "user_tokens" */
  user_tokens_aggregate: User_Tokens_Aggregate;
  /** fetch data from the table: "user_tokens" using primary key columns */
  user_tokens_by_pk: Maybe<User_Tokens>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk: Maybe<Users>;
  /** fetch data from the table: "vc_firms" */
  vc_firms: Array<Vc_Firms>;
  /** fetch aggregated fields from the table: "vc_firms" */
  vc_firms_aggregate: Vc_Firms_Aggregate;
  /** fetch data from the table: "vc_firms" using primary key columns */
  vc_firms_by_pk: Maybe<Vc_Firms>;
  /** fetch data from the table: "vc_firms_edit_access" */
  vc_firms_edit_access: Array<Vc_Firms_Edit_Access>;
  /** fetch aggregated fields from the table: "vc_firms_edit_access" */
  vc_firms_edit_access_aggregate: Vc_Firms_Edit_Access_Aggregate;
  /** fetch data from the table: "waitlist_emails" */
  waitlist_emails: Array<Waitlist_Emails>;
  /** fetch aggregated fields from the table: "waitlist_emails" */
  waitlist_emails_aggregate: Waitlist_Emails_Aggregate;
  /** fetch data from the table: "waitlist_emails" using primary key columns */
  waitlist_emails_by_pk: Maybe<Waitlist_Emails>;
};


export type Query_RootActionsArgs = {
  distinct_on: InputMaybe<Array<Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Actions_Order_By>>;
  where: InputMaybe<Actions_Bool_Exp>;
};


export type Query_RootActions_AggregateArgs = {
  distinct_on: InputMaybe<Array<Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Actions_Order_By>>;
  where: InputMaybe<Actions_Bool_Exp>;
};


export type Query_RootActions_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootAllowed_EmailsArgs = {
  distinct_on: InputMaybe<Array<Allowed_Emails_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Allowed_Emails_Order_By>>;
  where: InputMaybe<Allowed_Emails_Bool_Exp>;
};


export type Query_RootAllowed_Emails_AggregateArgs = {
  distinct_on: InputMaybe<Array<Allowed_Emails_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Allowed_Emails_Order_By>>;
  where: InputMaybe<Allowed_Emails_Bool_Exp>;
};


export type Query_RootAllowed_Emails_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootApplication_MetaArgs = {
  distinct_on: InputMaybe<Array<Application_Meta_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Application_Meta_Order_By>>;
  where: InputMaybe<Application_Meta_Bool_Exp>;
};


export type Query_RootApplication_Meta_AggregateArgs = {
  distinct_on: InputMaybe<Array<Application_Meta_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Application_Meta_Order_By>>;
  where: InputMaybe<Application_Meta_Bool_Exp>;
};


export type Query_RootApplication_Meta_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootBilling_OrgArgs = {
  distinct_on: InputMaybe<Array<Billing_Org_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Billing_Org_Order_By>>;
  where: InputMaybe<Billing_Org_Bool_Exp>;
};


export type Query_RootBilling_Org_AggregateArgs = {
  distinct_on: InputMaybe<Array<Billing_Org_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Billing_Org_Order_By>>;
  where: InputMaybe<Billing_Org_Bool_Exp>;
};


export type Query_RootBilling_Org_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootBlockchainsArgs = {
  distinct_on: InputMaybe<Array<Blockchains_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Blockchains_Order_By>>;
  where: InputMaybe<Blockchains_Bool_Exp>;
};


export type Query_RootBlockchains_AggregateArgs = {
  distinct_on: InputMaybe<Array<Blockchains_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Blockchains_Order_By>>;
  where: InputMaybe<Blockchains_Bool_Exp>;
};


export type Query_RootBlockchains_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootCoinsArgs = {
  distinct_on: InputMaybe<Array<Coins_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Coins_Order_By>>;
  where: InputMaybe<Coins_Bool_Exp>;
};


export type Query_RootCoins_AggregateArgs = {
  distinct_on: InputMaybe<Array<Coins_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Coins_Order_By>>;
  where: InputMaybe<Coins_Bool_Exp>;
};


export type Query_RootCoins_By_PkArgs = {
  id: Scalars['Int'];
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


export type Query_RootCompanies_Edit_AccessArgs = {
  distinct_on: InputMaybe<Array<Companies_Edit_Access_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Companies_Edit_Access_Order_By>>;
  where: InputMaybe<Companies_Edit_Access_Bool_Exp>;
};


export type Query_RootCompanies_Edit_Access_AggregateArgs = {
  distinct_on: InputMaybe<Array<Companies_Edit_Access_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Companies_Edit_Access_Order_By>>;
  where: InputMaybe<Companies_Edit_Access_Bool_Exp>;
};


export type Query_RootData_ActionsArgs = {
  distinct_on: InputMaybe<Array<Data_Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Actions_Order_By>>;
  where: InputMaybe<Data_Actions_Bool_Exp>;
};


export type Query_RootData_Actions_AggregateArgs = {
  distinct_on: InputMaybe<Array<Data_Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Actions_Order_By>>;
  where: InputMaybe<Data_Actions_Bool_Exp>;
};


export type Query_RootData_Actions_By_PkArgs = {
  name: Scalars['String'];
};


export type Query_RootData_FieldsArgs = {
  distinct_on: InputMaybe<Array<Data_Fields_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Fields_Order_By>>;
  where: InputMaybe<Data_Fields_Bool_Exp>;
};


export type Query_RootData_Fields_AggregateArgs = {
  distinct_on: InputMaybe<Array<Data_Fields_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Fields_Order_By>>;
  where: InputMaybe<Data_Fields_Bool_Exp>;
};


export type Query_RootData_Fields_By_PkArgs = {
  path: Scalars['String'];
};


export type Query_RootData_PartnersArgs = {
  distinct_on: InputMaybe<Array<Data_Partners_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Partners_Order_By>>;
  where: InputMaybe<Data_Partners_Bool_Exp>;
};


export type Query_RootData_Partners_AggregateArgs = {
  distinct_on: InputMaybe<Array<Data_Partners_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Partners_Order_By>>;
  where: InputMaybe<Data_Partners_Bool_Exp>;
};


export type Query_RootData_Partners_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootData_RawArgs = {
  distinct_on: InputMaybe<Array<Data_Raw_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Raw_Order_By>>;
  where: InputMaybe<Data_Raw_Bool_Exp>;
};


export type Query_RootData_Raw_AggregateArgs = {
  distinct_on: InputMaybe<Array<Data_Raw_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Raw_Order_By>>;
  where: InputMaybe<Data_Raw_Bool_Exp>;
};


export type Query_RootData_Raw_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootData_RunsArgs = {
  distinct_on: InputMaybe<Array<Data_Runs_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Runs_Order_By>>;
  where: InputMaybe<Data_Runs_Bool_Exp>;
};


export type Query_RootData_Runs_AggregateArgs = {
  distinct_on: InputMaybe<Array<Data_Runs_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Runs_Order_By>>;
  where: InputMaybe<Data_Runs_Bool_Exp>;
};


export type Query_RootData_Runs_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootDisabled_EmailsArgs = {
  distinct_on: InputMaybe<Array<Disabled_Emails_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Disabled_Emails_Order_By>>;
  where: InputMaybe<Disabled_Emails_Bool_Exp>;
};


export type Query_RootDisabled_Emails_AggregateArgs = {
  distinct_on: InputMaybe<Array<Disabled_Emails_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Disabled_Emails_Order_By>>;
  where: InputMaybe<Disabled_Emails_Bool_Exp>;
};


export type Query_RootDisabled_Emails_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootEvent_OrganizationArgs = {
  distinct_on: InputMaybe<Array<Event_Organization_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Event_Organization_Order_By>>;
  where: InputMaybe<Event_Organization_Bool_Exp>;
};


export type Query_RootEvent_Organization_AggregateArgs = {
  distinct_on: InputMaybe<Array<Event_Organization_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Event_Organization_Order_By>>;
  where: InputMaybe<Event_Organization_Bool_Exp>;
};


export type Query_RootEvent_Organization_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootEvent_PersonArgs = {
  distinct_on: InputMaybe<Array<Event_Person_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Event_Person_Order_By>>;
  where: InputMaybe<Event_Person_Bool_Exp>;
};


export type Query_RootEvent_Person_AggregateArgs = {
  distinct_on: InputMaybe<Array<Event_Person_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Event_Person_Order_By>>;
  where: InputMaybe<Event_Person_Bool_Exp>;
};


export type Query_RootEvent_Person_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootEventsArgs = {
  distinct_on: InputMaybe<Array<Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Events_Order_By>>;
  where: InputMaybe<Events_Bool_Exp>;
};


export type Query_RootEvents_AggregateArgs = {
  distinct_on: InputMaybe<Array<Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Events_Order_By>>;
  where: InputMaybe<Events_Bool_Exp>;
};


export type Query_RootEvents_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootFollowsArgs = {
  distinct_on: InputMaybe<Array<Follows_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Order_By>>;
  where: InputMaybe<Follows_Bool_Exp>;
};


export type Query_RootFollows_AggregateArgs = {
  distinct_on: InputMaybe<Array<Follows_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Order_By>>;
  where: InputMaybe<Follows_Bool_Exp>;
};


export type Query_RootFollows_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootFollows_CompaniesArgs = {
  distinct_on: InputMaybe<Array<Follows_Companies_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Companies_Order_By>>;
  where: InputMaybe<Follows_Companies_Bool_Exp>;
};


export type Query_RootFollows_Companies_AggregateArgs = {
  distinct_on: InputMaybe<Array<Follows_Companies_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Companies_Order_By>>;
  where: InputMaybe<Follows_Companies_Bool_Exp>;
};


export type Query_RootFollows_Vc_FirmsArgs = {
  distinct_on: InputMaybe<Array<Follows_Vc_Firms_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Vc_Firms_Order_By>>;
  where: InputMaybe<Follows_Vc_Firms_Bool_Exp>;
};


export type Query_RootFollows_Vc_Firms_AggregateArgs = {
  distinct_on: InputMaybe<Array<Follows_Vc_Firms_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Vc_Firms_Order_By>>;
  where: InputMaybe<Follows_Vc_Firms_Bool_Exp>;
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


export type Query_RootList_MembersArgs = {
  distinct_on: InputMaybe<Array<List_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<List_Members_Order_By>>;
  where: InputMaybe<List_Members_Bool_Exp>;
};


export type Query_RootList_Members_AggregateArgs = {
  distinct_on: InputMaybe<Array<List_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<List_Members_Order_By>>;
  where: InputMaybe<List_Members_Bool_Exp>;
};


export type Query_RootList_Members_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootList_User_GroupsArgs = {
  distinct_on: InputMaybe<Array<List_User_Groups_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<List_User_Groups_Order_By>>;
  where: InputMaybe<List_User_Groups_Bool_Exp>;
};


export type Query_RootList_User_Groups_AggregateArgs = {
  distinct_on: InputMaybe<Array<List_User_Groups_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<List_User_Groups_Order_By>>;
  where: InputMaybe<List_User_Groups_Bool_Exp>;
};


export type Query_RootList_User_Groups_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootListsArgs = {
  distinct_on: InputMaybe<Array<Lists_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Lists_Order_By>>;
  where: InputMaybe<Lists_Bool_Exp>;
};


export type Query_RootLists_AggregateArgs = {
  distinct_on: InputMaybe<Array<Lists_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Lists_Order_By>>;
  where: InputMaybe<Lists_Bool_Exp>;
};


export type Query_RootLists_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootNewsArgs = {
  distinct_on: InputMaybe<Array<News_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<News_Order_By>>;
  where: InputMaybe<News_Bool_Exp>;
};


export type Query_RootNews_AggregateArgs = {
  distinct_on: InputMaybe<Array<News_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<News_Order_By>>;
  where: InputMaybe<News_Bool_Exp>;
};


export type Query_RootNews_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootNews_OrganizationsArgs = {
  distinct_on: InputMaybe<Array<News_Organizations_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<News_Organizations_Order_By>>;
  where: InputMaybe<News_Organizations_Bool_Exp>;
};


export type Query_RootNews_Organizations_AggregateArgs = {
  distinct_on: InputMaybe<Array<News_Organizations_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<News_Organizations_Order_By>>;
  where: InputMaybe<News_Organizations_Bool_Exp>;
};


export type Query_RootNews_Organizations_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootNotesArgs = {
  distinct_on: InputMaybe<Array<Notes_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Notes_Order_By>>;
  where: InputMaybe<Notes_Bool_Exp>;
};


export type Query_RootNotes_AggregateArgs = {
  distinct_on: InputMaybe<Array<Notes_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Notes_Order_By>>;
  where: InputMaybe<Notes_Bool_Exp>;
};


export type Query_RootNotes_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootNotificationsArgs = {
  distinct_on: InputMaybe<Array<Notifications_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Notifications_Order_By>>;
  where: InputMaybe<Notifications_Bool_Exp>;
};


export type Query_RootNotifications_AggregateArgs = {
  distinct_on: InputMaybe<Array<Notifications_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Notifications_Order_By>>;
  where: InputMaybe<Notifications_Bool_Exp>;
};


export type Query_RootNotifications_By_PkArgs = {
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


export type Query_RootReset_PasswordsArgs = {
  distinct_on: InputMaybe<Array<Reset_Passwords_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Reset_Passwords_Order_By>>;
  where: InputMaybe<Reset_Passwords_Bool_Exp>;
};


export type Query_RootReset_Passwords_AggregateArgs = {
  distinct_on: InputMaybe<Array<Reset_Passwords_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Reset_Passwords_Order_By>>;
  where: InputMaybe<Reset_Passwords_Bool_Exp>;
};


export type Query_RootReset_Passwords_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootResource_Edit_AccessArgs = {
  distinct_on: InputMaybe<Array<Resource_Edit_Access_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Resource_Edit_Access_Order_By>>;
  where: InputMaybe<Resource_Edit_Access_Bool_Exp>;
};


export type Query_RootResource_Edit_Access_AggregateArgs = {
  distinct_on: InputMaybe<Array<Resource_Edit_Access_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Resource_Edit_Access_Order_By>>;
  where: InputMaybe<Resource_Edit_Access_Bool_Exp>;
};


export type Query_RootResource_Edit_Access_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootResource_LinksArgs = {
  distinct_on: InputMaybe<Array<Resource_Links_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Resource_Links_Order_By>>;
  where: InputMaybe<Resource_Links_Bool_Exp>;
};


export type Query_RootResource_Links_AggregateArgs = {
  distinct_on: InputMaybe<Array<Resource_Links_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Resource_Links_Order_By>>;
  where: InputMaybe<Resource_Links_Bool_Exp>;
};


export type Query_RootResource_Links_By_PkArgs = {
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


export type Query_RootUser_Group_InvitesArgs = {
  distinct_on: InputMaybe<Array<User_Group_Invites_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Group_Invites_Order_By>>;
  where: InputMaybe<User_Group_Invites_Bool_Exp>;
};


export type Query_RootUser_Group_Invites_AggregateArgs = {
  distinct_on: InputMaybe<Array<User_Group_Invites_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Group_Invites_Order_By>>;
  where: InputMaybe<User_Group_Invites_Bool_Exp>;
};


export type Query_RootUser_Group_Invites_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootUser_Group_MembersArgs = {
  distinct_on: InputMaybe<Array<User_Group_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Group_Members_Order_By>>;
  where: InputMaybe<User_Group_Members_Bool_Exp>;
};


export type Query_RootUser_Group_Members_AggregateArgs = {
  distinct_on: InputMaybe<Array<User_Group_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Group_Members_Order_By>>;
  where: InputMaybe<User_Group_Members_Bool_Exp>;
};


export type Query_RootUser_Group_Members_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootUser_GroupsArgs = {
  distinct_on: InputMaybe<Array<User_Groups_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Groups_Order_By>>;
  where: InputMaybe<User_Groups_Bool_Exp>;
};


export type Query_RootUser_Groups_AggregateArgs = {
  distinct_on: InputMaybe<Array<User_Groups_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Groups_Order_By>>;
  where: InputMaybe<User_Groups_Bool_Exp>;
};


export type Query_RootUser_Groups_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootUser_TokensArgs = {
  distinct_on: InputMaybe<Array<User_Tokens_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Tokens_Order_By>>;
  where: InputMaybe<User_Tokens_Bool_Exp>;
};


export type Query_RootUser_Tokens_AggregateArgs = {
  distinct_on: InputMaybe<Array<User_Tokens_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Tokens_Order_By>>;
  where: InputMaybe<User_Tokens_Bool_Exp>;
};


export type Query_RootUser_Tokens_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootUsersArgs = {
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
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


export type Query_RootVc_Firms_Edit_AccessArgs = {
  distinct_on: InputMaybe<Array<Vc_Firms_Edit_Access_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Vc_Firms_Edit_Access_Order_By>>;
  where: InputMaybe<Vc_Firms_Edit_Access_Bool_Exp>;
};


export type Query_RootVc_Firms_Edit_Access_AggregateArgs = {
  distinct_on: InputMaybe<Array<Vc_Firms_Edit_Access_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Vc_Firms_Edit_Access_Order_By>>;
  where: InputMaybe<Vc_Firms_Edit_Access_Bool_Exp>;
};


export type Query_RootWaitlist_EmailsArgs = {
  distinct_on: InputMaybe<Array<Waitlist_Emails_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Waitlist_Emails_Order_By>>;
  where: InputMaybe<Waitlist_Emails_Bool_Exp>;
};


export type Query_RootWaitlist_Emails_AggregateArgs = {
  distinct_on: InputMaybe<Array<Waitlist_Emails_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Waitlist_Emails_Order_By>>;
  where: InputMaybe<Waitlist_Emails_Bool_Exp>;
};


export type Query_RootWaitlist_Emails_By_PkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "reset_passwords" */
export type Reset_Passwords = {
  __typename?: 'reset_passwords';
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  created_by_user: Maybe<Users>;
  created_by_user_id: Scalars['Int'];
  generated_password: Scalars['String'];
  id: Scalars['Int'];
  /** An object relationship */
  user: Maybe<Users>;
  user_id: Scalars['Int'];
};

/** aggregated selection of "reset_passwords" */
export type Reset_Passwords_Aggregate = {
  __typename?: 'reset_passwords_aggregate';
  aggregate: Maybe<Reset_Passwords_Aggregate_Fields>;
  nodes: Array<Reset_Passwords>;
};

/** aggregate fields of "reset_passwords" */
export type Reset_Passwords_Aggregate_Fields = {
  __typename?: 'reset_passwords_aggregate_fields';
  avg: Maybe<Reset_Passwords_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Reset_Passwords_Max_Fields>;
  min: Maybe<Reset_Passwords_Min_Fields>;
  stddev: Maybe<Reset_Passwords_Stddev_Fields>;
  stddev_pop: Maybe<Reset_Passwords_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Reset_Passwords_Stddev_Samp_Fields>;
  sum: Maybe<Reset_Passwords_Sum_Fields>;
  var_pop: Maybe<Reset_Passwords_Var_Pop_Fields>;
  var_samp: Maybe<Reset_Passwords_Var_Samp_Fields>;
  variance: Maybe<Reset_Passwords_Variance_Fields>;
};


/** aggregate fields of "reset_passwords" */
export type Reset_Passwords_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Reset_Passwords_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Reset_Passwords_Avg_Fields = {
  __typename?: 'reset_passwords_avg_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "reset_passwords". All fields are combined with a logical 'AND'. */
export type Reset_Passwords_Bool_Exp = {
  _and: InputMaybe<Array<Reset_Passwords_Bool_Exp>>;
  _not: InputMaybe<Reset_Passwords_Bool_Exp>;
  _or: InputMaybe<Array<Reset_Passwords_Bool_Exp>>;
  created_at: InputMaybe<Timestamptz_Comparison_Exp>;
  created_by_user: InputMaybe<Users_Bool_Exp>;
  created_by_user_id: InputMaybe<Int_Comparison_Exp>;
  generated_password: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  user: InputMaybe<Users_Bool_Exp>;
  user_id: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "reset_passwords" */
export enum Reset_Passwords_Constraint {
  /** unique or primary key constraint */
  ResetPasswordsPkey = 'reset_passwords_pkey'
}

/** input type for incrementing numeric columns in table "reset_passwords" */
export type Reset_Passwords_Inc_Input = {
  created_by_user_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "reset_passwords" */
export type Reset_Passwords_Insert_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  created_by_user: InputMaybe<Users_Obj_Rel_Insert_Input>;
  created_by_user_id: InputMaybe<Scalars['Int']>;
  generated_password: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  user: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Reset_Passwords_Max_Fields = {
  __typename?: 'reset_passwords_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  created_by_user_id: Maybe<Scalars['Int']>;
  generated_password: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  user_id: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Reset_Passwords_Min_Fields = {
  __typename?: 'reset_passwords_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  created_by_user_id: Maybe<Scalars['Int']>;
  generated_password: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  user_id: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "reset_passwords" */
export type Reset_Passwords_Mutation_Response = {
  __typename?: 'reset_passwords_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Reset_Passwords>;
};

/** on_conflict condition type for table "reset_passwords" */
export type Reset_Passwords_On_Conflict = {
  constraint: Reset_Passwords_Constraint;
  update_columns: Array<Reset_Passwords_Update_Column>;
  where: InputMaybe<Reset_Passwords_Bool_Exp>;
};

/** Ordering options when selecting data from "reset_passwords". */
export type Reset_Passwords_Order_By = {
  created_at: InputMaybe<Order_By>;
  created_by_user: InputMaybe<Users_Order_By>;
  created_by_user_id: InputMaybe<Order_By>;
  generated_password: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  user: InputMaybe<Users_Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** primary key columns input for table: reset_passwords */
export type Reset_Passwords_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "reset_passwords" */
export enum Reset_Passwords_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedByUserId = 'created_by_user_id',
  /** column name */
  GeneratedPassword = 'generated_password',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "reset_passwords" */
export type Reset_Passwords_Set_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  created_by_user_id: InputMaybe<Scalars['Int']>;
  generated_password: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Reset_Passwords_Stddev_Fields = {
  __typename?: 'reset_passwords_stddev_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Reset_Passwords_Stddev_Pop_Fields = {
  __typename?: 'reset_passwords_stddev_pop_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Reset_Passwords_Stddev_Samp_Fields = {
  __typename?: 'reset_passwords_stddev_samp_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Reset_Passwords_Sum_Fields = {
  __typename?: 'reset_passwords_sum_fields';
  created_by_user_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  user_id: Maybe<Scalars['Int']>;
};

/** update columns of table "reset_passwords" */
export enum Reset_Passwords_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedByUserId = 'created_by_user_id',
  /** column name */
  GeneratedPassword = 'generated_password',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Reset_Passwords_Var_Pop_Fields = {
  __typename?: 'reset_passwords_var_pop_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Reset_Passwords_Var_Samp_Fields = {
  __typename?: 'reset_passwords_var_samp_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Reset_Passwords_Variance_Fields = {
  __typename?: 'reset_passwords_variance_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** Add access to user if he has verified the access to organization */
export type Resource_Edit_Access = {
  __typename?: 'resource_edit_access';
  /** An object relationship */
  company: Maybe<Companies>;
  id: Scalars['Int'];
  resource_id: Scalars['Int'];
  resource_type: Scalars['String'];
  user_id: Scalars['Int'];
  /** An object relationship */
  vc_firm: Maybe<Vc_Firms>;
};

/** aggregated selection of "resource_edit_access" */
export type Resource_Edit_Access_Aggregate = {
  __typename?: 'resource_edit_access_aggregate';
  aggregate: Maybe<Resource_Edit_Access_Aggregate_Fields>;
  nodes: Array<Resource_Edit_Access>;
};

/** aggregate fields of "resource_edit_access" */
export type Resource_Edit_Access_Aggregate_Fields = {
  __typename?: 'resource_edit_access_aggregate_fields';
  avg: Maybe<Resource_Edit_Access_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Resource_Edit_Access_Max_Fields>;
  min: Maybe<Resource_Edit_Access_Min_Fields>;
  stddev: Maybe<Resource_Edit_Access_Stddev_Fields>;
  stddev_pop: Maybe<Resource_Edit_Access_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Resource_Edit_Access_Stddev_Samp_Fields>;
  sum: Maybe<Resource_Edit_Access_Sum_Fields>;
  var_pop: Maybe<Resource_Edit_Access_Var_Pop_Fields>;
  var_samp: Maybe<Resource_Edit_Access_Var_Samp_Fields>;
  variance: Maybe<Resource_Edit_Access_Variance_Fields>;
};


/** aggregate fields of "resource_edit_access" */
export type Resource_Edit_Access_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Resource_Edit_Access_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Resource_Edit_Access_Avg_Fields = {
  __typename?: 'resource_edit_access_avg_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "resource_edit_access". All fields are combined with a logical 'AND'. */
export type Resource_Edit_Access_Bool_Exp = {
  _and: InputMaybe<Array<Resource_Edit_Access_Bool_Exp>>;
  _not: InputMaybe<Resource_Edit_Access_Bool_Exp>;
  _or: InputMaybe<Array<Resource_Edit_Access_Bool_Exp>>;
  company: InputMaybe<Companies_Bool_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  resource_id: InputMaybe<Int_Comparison_Exp>;
  resource_type: InputMaybe<String_Comparison_Exp>;
  user_id: InputMaybe<Int_Comparison_Exp>;
  vc_firm: InputMaybe<Vc_Firms_Bool_Exp>;
};

/** unique or primary key constraints on table "resource_edit_access" */
export enum Resource_Edit_Access_Constraint {
  /** unique or primary key constraint */
  ResourceEditAccessPkey = 'resource_edit_access_pkey',
  /** unique or primary key constraint */
  ResourceEditAccessResourceIdUserIdResourceTypeKey = 'resource_edit_access_resource_id_user_id_resource_type_key'
}

/** input type for incrementing numeric columns in table "resource_edit_access" */
export type Resource_Edit_Access_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "resource_edit_access" */
export type Resource_Edit_Access_Insert_Input = {
  company: InputMaybe<Companies_Obj_Rel_Insert_Input>;
  id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  resource_type: InputMaybe<Scalars['String']>;
  user_id: InputMaybe<Scalars['Int']>;
  vc_firm: InputMaybe<Vc_Firms_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Resource_Edit_Access_Max_Fields = {
  __typename?: 'resource_edit_access_max_fields';
  id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Resource_Edit_Access_Min_Fields = {
  __typename?: 'resource_edit_access_min_fields';
  id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "resource_edit_access" */
export type Resource_Edit_Access_Mutation_Response = {
  __typename?: 'resource_edit_access_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Resource_Edit_Access>;
};

/** on_conflict condition type for table "resource_edit_access" */
export type Resource_Edit_Access_On_Conflict = {
  constraint: Resource_Edit_Access_Constraint;
  update_columns: Array<Resource_Edit_Access_Update_Column>;
  where: InputMaybe<Resource_Edit_Access_Bool_Exp>;
};

/** Ordering options when selecting data from "resource_edit_access". */
export type Resource_Edit_Access_Order_By = {
  company: InputMaybe<Companies_Order_By>;
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  resource_type: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
  vc_firm: InputMaybe<Vc_Firms_Order_By>;
};

/** primary key columns input for table: resource_edit_access */
export type Resource_Edit_Access_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "resource_edit_access" */
export enum Resource_Edit_Access_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ResourceId = 'resource_id',
  /** column name */
  ResourceType = 'resource_type',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "resource_edit_access" */
export type Resource_Edit_Access_Set_Input = {
  id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  resource_type: InputMaybe<Scalars['String']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Resource_Edit_Access_Stddev_Fields = {
  __typename?: 'resource_edit_access_stddev_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Resource_Edit_Access_Stddev_Pop_Fields = {
  __typename?: 'resource_edit_access_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Resource_Edit_Access_Stddev_Samp_Fields = {
  __typename?: 'resource_edit_access_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Resource_Edit_Access_Sum_Fields = {
  __typename?: 'resource_edit_access_sum_fields';
  id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  user_id: Maybe<Scalars['Int']>;
};

/** update columns of table "resource_edit_access" */
export enum Resource_Edit_Access_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ResourceId = 'resource_id',
  /** column name */
  ResourceType = 'resource_type',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Resource_Edit_Access_Var_Pop_Fields = {
  __typename?: 'resource_edit_access_var_pop_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Resource_Edit_Access_Var_Samp_Fields = {
  __typename?: 'resource_edit_access_var_samp_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Resource_Edit_Access_Variance_Fields = {
  __typename?: 'resource_edit_access_variance_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** columns and relationships of "resource_links" */
export type Resource_Links = {
  __typename?: 'resource_links';
  /** An object relationship */
  from_company: Maybe<Companies>;
  from_company_id: Maybe<Scalars['Int']>;
  /** An object relationship */
  from_vc_firm: Maybe<Vc_Firms>;
  from_vc_firm_id: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  link_type: Scalars['String'];
  /** An object relationship */
  to_company: Maybe<Companies>;
  to_company_id: Maybe<Scalars['Int']>;
  /** An object relationship */
  to_vc_firm: Maybe<Vc_Firms>;
  to_vc_firm_id: Maybe<Scalars['Int']>;
};

/** aggregated selection of "resource_links" */
export type Resource_Links_Aggregate = {
  __typename?: 'resource_links_aggregate';
  aggregate: Maybe<Resource_Links_Aggregate_Fields>;
  nodes: Array<Resource_Links>;
};

/** aggregate fields of "resource_links" */
export type Resource_Links_Aggregate_Fields = {
  __typename?: 'resource_links_aggregate_fields';
  avg: Maybe<Resource_Links_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Resource_Links_Max_Fields>;
  min: Maybe<Resource_Links_Min_Fields>;
  stddev: Maybe<Resource_Links_Stddev_Fields>;
  stddev_pop: Maybe<Resource_Links_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Resource_Links_Stddev_Samp_Fields>;
  sum: Maybe<Resource_Links_Sum_Fields>;
  var_pop: Maybe<Resource_Links_Var_Pop_Fields>;
  var_samp: Maybe<Resource_Links_Var_Samp_Fields>;
  variance: Maybe<Resource_Links_Variance_Fields>;
};


/** aggregate fields of "resource_links" */
export type Resource_Links_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Resource_Links_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "resource_links" */
export type Resource_Links_Aggregate_Order_By = {
  avg: InputMaybe<Resource_Links_Avg_Order_By>;
  count: InputMaybe<Order_By>;
  max: InputMaybe<Resource_Links_Max_Order_By>;
  min: InputMaybe<Resource_Links_Min_Order_By>;
  stddev: InputMaybe<Resource_Links_Stddev_Order_By>;
  stddev_pop: InputMaybe<Resource_Links_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Resource_Links_Stddev_Samp_Order_By>;
  sum: InputMaybe<Resource_Links_Sum_Order_By>;
  var_pop: InputMaybe<Resource_Links_Var_Pop_Order_By>;
  var_samp: InputMaybe<Resource_Links_Var_Samp_Order_By>;
  variance: InputMaybe<Resource_Links_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "resource_links" */
export type Resource_Links_Arr_Rel_Insert_Input = {
  data: Array<Resource_Links_Insert_Input>;
  /** upsert condition */
  on_conflict: InputMaybe<Resource_Links_On_Conflict>;
};

/** aggregate avg on columns */
export type Resource_Links_Avg_Fields = {
  __typename?: 'resource_links_avg_fields';
  from_company_id: Maybe<Scalars['Float']>;
  from_vc_firm_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  to_company_id: Maybe<Scalars['Float']>;
  to_vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "resource_links" */
export type Resource_Links_Avg_Order_By = {
  from_company_id: InputMaybe<Order_By>;
  from_vc_firm_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  to_company_id: InputMaybe<Order_By>;
  to_vc_firm_id: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "resource_links". All fields are combined with a logical 'AND'. */
export type Resource_Links_Bool_Exp = {
  _and: InputMaybe<Array<Resource_Links_Bool_Exp>>;
  _not: InputMaybe<Resource_Links_Bool_Exp>;
  _or: InputMaybe<Array<Resource_Links_Bool_Exp>>;
  from_company: InputMaybe<Companies_Bool_Exp>;
  from_company_id: InputMaybe<Int_Comparison_Exp>;
  from_vc_firm: InputMaybe<Vc_Firms_Bool_Exp>;
  from_vc_firm_id: InputMaybe<Int_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  link_type: InputMaybe<String_Comparison_Exp>;
  to_company: InputMaybe<Companies_Bool_Exp>;
  to_company_id: InputMaybe<Int_Comparison_Exp>;
  to_vc_firm: InputMaybe<Vc_Firms_Bool_Exp>;
  to_vc_firm_id: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "resource_links" */
export enum Resource_Links_Constraint {
  /** unique or primary key constraint */
  ResourceLinksPkey = 'resource_links_pkey'
}

/** input type for incrementing numeric columns in table "resource_links" */
export type Resource_Links_Inc_Input = {
  from_company_id: InputMaybe<Scalars['Int']>;
  from_vc_firm_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  to_company_id: InputMaybe<Scalars['Int']>;
  to_vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "resource_links" */
export type Resource_Links_Insert_Input = {
  from_company: InputMaybe<Companies_Obj_Rel_Insert_Input>;
  from_company_id: InputMaybe<Scalars['Int']>;
  from_vc_firm: InputMaybe<Vc_Firms_Obj_Rel_Insert_Input>;
  from_vc_firm_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  link_type: InputMaybe<Scalars['String']>;
  to_company: InputMaybe<Companies_Obj_Rel_Insert_Input>;
  to_company_id: InputMaybe<Scalars['Int']>;
  to_vc_firm: InputMaybe<Vc_Firms_Obj_Rel_Insert_Input>;
  to_vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Resource_Links_Max_Fields = {
  __typename?: 'resource_links_max_fields';
  from_company_id: Maybe<Scalars['Int']>;
  from_vc_firm_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  link_type: Maybe<Scalars['String']>;
  to_company_id: Maybe<Scalars['Int']>;
  to_vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "resource_links" */
export type Resource_Links_Max_Order_By = {
  from_company_id: InputMaybe<Order_By>;
  from_vc_firm_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  link_type: InputMaybe<Order_By>;
  to_company_id: InputMaybe<Order_By>;
  to_vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Resource_Links_Min_Fields = {
  __typename?: 'resource_links_min_fields';
  from_company_id: Maybe<Scalars['Int']>;
  from_vc_firm_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  link_type: Maybe<Scalars['String']>;
  to_company_id: Maybe<Scalars['Int']>;
  to_vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "resource_links" */
export type Resource_Links_Min_Order_By = {
  from_company_id: InputMaybe<Order_By>;
  from_vc_firm_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  link_type: InputMaybe<Order_By>;
  to_company_id: InputMaybe<Order_By>;
  to_vc_firm_id: InputMaybe<Order_By>;
};

/** response of any mutation on the table "resource_links" */
export type Resource_Links_Mutation_Response = {
  __typename?: 'resource_links_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Resource_Links>;
};

/** on_conflict condition type for table "resource_links" */
export type Resource_Links_On_Conflict = {
  constraint: Resource_Links_Constraint;
  update_columns: Array<Resource_Links_Update_Column>;
  where: InputMaybe<Resource_Links_Bool_Exp>;
};

/** Ordering options when selecting data from "resource_links". */
export type Resource_Links_Order_By = {
  from_company: InputMaybe<Companies_Order_By>;
  from_company_id: InputMaybe<Order_By>;
  from_vc_firm: InputMaybe<Vc_Firms_Order_By>;
  from_vc_firm_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  link_type: InputMaybe<Order_By>;
  to_company: InputMaybe<Companies_Order_By>;
  to_company_id: InputMaybe<Order_By>;
  to_vc_firm: InputMaybe<Vc_Firms_Order_By>;
  to_vc_firm_id: InputMaybe<Order_By>;
};

/** primary key columns input for table: resource_links */
export type Resource_Links_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "resource_links" */
export enum Resource_Links_Select_Column {
  /** column name */
  FromCompanyId = 'from_company_id',
  /** column name */
  FromVcFirmId = 'from_vc_firm_id',
  /** column name */
  Id = 'id',
  /** column name */
  LinkType = 'link_type',
  /** column name */
  ToCompanyId = 'to_company_id',
  /** column name */
  ToVcFirmId = 'to_vc_firm_id'
}

/** input type for updating data in table "resource_links" */
export type Resource_Links_Set_Input = {
  from_company_id: InputMaybe<Scalars['Int']>;
  from_vc_firm_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  link_type: InputMaybe<Scalars['String']>;
  to_company_id: InputMaybe<Scalars['Int']>;
  to_vc_firm_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Resource_Links_Stddev_Fields = {
  __typename?: 'resource_links_stddev_fields';
  from_company_id: Maybe<Scalars['Float']>;
  from_vc_firm_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  to_company_id: Maybe<Scalars['Float']>;
  to_vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "resource_links" */
export type Resource_Links_Stddev_Order_By = {
  from_company_id: InputMaybe<Order_By>;
  from_vc_firm_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  to_company_id: InputMaybe<Order_By>;
  to_vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Resource_Links_Stddev_Pop_Fields = {
  __typename?: 'resource_links_stddev_pop_fields';
  from_company_id: Maybe<Scalars['Float']>;
  from_vc_firm_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  to_company_id: Maybe<Scalars['Float']>;
  to_vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "resource_links" */
export type Resource_Links_Stddev_Pop_Order_By = {
  from_company_id: InputMaybe<Order_By>;
  from_vc_firm_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  to_company_id: InputMaybe<Order_By>;
  to_vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Resource_Links_Stddev_Samp_Fields = {
  __typename?: 'resource_links_stddev_samp_fields';
  from_company_id: Maybe<Scalars['Float']>;
  from_vc_firm_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  to_company_id: Maybe<Scalars['Float']>;
  to_vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "resource_links" */
export type Resource_Links_Stddev_Samp_Order_By = {
  from_company_id: InputMaybe<Order_By>;
  from_vc_firm_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  to_company_id: InputMaybe<Order_By>;
  to_vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Resource_Links_Sum_Fields = {
  __typename?: 'resource_links_sum_fields';
  from_company_id: Maybe<Scalars['Int']>;
  from_vc_firm_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  to_company_id: Maybe<Scalars['Int']>;
  to_vc_firm_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "resource_links" */
export type Resource_Links_Sum_Order_By = {
  from_company_id: InputMaybe<Order_By>;
  from_vc_firm_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  to_company_id: InputMaybe<Order_By>;
  to_vc_firm_id: InputMaybe<Order_By>;
};

/** update columns of table "resource_links" */
export enum Resource_Links_Update_Column {
  /** column name */
  FromCompanyId = 'from_company_id',
  /** column name */
  FromVcFirmId = 'from_vc_firm_id',
  /** column name */
  Id = 'id',
  /** column name */
  LinkType = 'link_type',
  /** column name */
  ToCompanyId = 'to_company_id',
  /** column name */
  ToVcFirmId = 'to_vc_firm_id'
}

/** aggregate var_pop on columns */
export type Resource_Links_Var_Pop_Fields = {
  __typename?: 'resource_links_var_pop_fields';
  from_company_id: Maybe<Scalars['Float']>;
  from_vc_firm_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  to_company_id: Maybe<Scalars['Float']>;
  to_vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "resource_links" */
export type Resource_Links_Var_Pop_Order_By = {
  from_company_id: InputMaybe<Order_By>;
  from_vc_firm_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  to_company_id: InputMaybe<Order_By>;
  to_vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Resource_Links_Var_Samp_Fields = {
  __typename?: 'resource_links_var_samp_fields';
  from_company_id: Maybe<Scalars['Float']>;
  from_vc_firm_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  to_company_id: Maybe<Scalars['Float']>;
  to_vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "resource_links" */
export type Resource_Links_Var_Samp_Order_By = {
  from_company_id: InputMaybe<Order_By>;
  from_vc_firm_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  to_company_id: InputMaybe<Order_By>;
  to_vc_firm_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Resource_Links_Variance_Fields = {
  __typename?: 'resource_links_variance_fields';
  from_company_id: Maybe<Scalars['Float']>;
  from_vc_firm_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  to_company_id: Maybe<Scalars['Float']>;
  to_vc_firm_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "resource_links" */
export type Resource_Links_Variance_Order_By = {
  from_company_id: InputMaybe<Order_By>;
  from_vc_firm_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  to_company_id: InputMaybe<Order_By>;
  to_vc_firm_id: InputMaybe<Order_By>;
};

export type St_D_Within_Geography_Input = {
  distance: Scalars['Float'];
  from: Scalars['geography'];
  use_spheroid: InputMaybe<Scalars['Boolean']>;
};

export type St_D_Within_Input = {
  distance: Scalars['Float'];
  from: Scalars['geometry'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "actions" */
  actions: Array<Actions>;
  /** fetch aggregated fields from the table: "actions" */
  actions_aggregate: Actions_Aggregate;
  /** fetch data from the table: "actions" using primary key columns */
  actions_by_pk: Maybe<Actions>;
  /** fetch data from the table: "allowed_emails" */
  allowed_emails: Array<Allowed_Emails>;
  /** fetch aggregated fields from the table: "allowed_emails" */
  allowed_emails_aggregate: Allowed_Emails_Aggregate;
  /** fetch data from the table: "allowed_emails" using primary key columns */
  allowed_emails_by_pk: Maybe<Allowed_Emails>;
  /** fetch data from the table: "application_meta" */
  application_meta: Array<Application_Meta>;
  /** fetch aggregated fields from the table: "application_meta" */
  application_meta_aggregate: Application_Meta_Aggregate;
  /** fetch data from the table: "application_meta" using primary key columns */
  application_meta_by_pk: Maybe<Application_Meta>;
  /** fetch data from the table: "billing_org" */
  billing_org: Array<Billing_Org>;
  /** fetch aggregated fields from the table: "billing_org" */
  billing_org_aggregate: Billing_Org_Aggregate;
  /** fetch data from the table: "billing_org" using primary key columns */
  billing_org_by_pk: Maybe<Billing_Org>;
  /** fetch data from the table: "blockchains" */
  blockchains: Array<Blockchains>;
  /** fetch aggregated fields from the table: "blockchains" */
  blockchains_aggregate: Blockchains_Aggregate;
  /** fetch data from the table: "blockchains" using primary key columns */
  blockchains_by_pk: Maybe<Blockchains>;
  /** fetch data from the table: "coins" */
  coins: Array<Coins>;
  /** fetch aggregated fields from the table: "coins" */
  coins_aggregate: Coins_Aggregate;
  /** fetch data from the table: "coins" using primary key columns */
  coins_by_pk: Maybe<Coins>;
  /** fetch data from the table: "companies" */
  companies: Array<Companies>;
  /** fetch aggregated fields from the table: "companies" */
  companies_aggregate: Companies_Aggregate;
  /** fetch data from the table: "companies" using primary key columns */
  companies_by_pk: Maybe<Companies>;
  /** fetch data from the table: "companies_edit_access" */
  companies_edit_access: Array<Companies_Edit_Access>;
  /** fetch aggregated fields from the table: "companies_edit_access" */
  companies_edit_access_aggregate: Companies_Edit_Access_Aggregate;
  /** fetch data from the table: "data_actions" */
  data_actions: Array<Data_Actions>;
  /** fetch aggregated fields from the table: "data_actions" */
  data_actions_aggregate: Data_Actions_Aggregate;
  /** fetch data from the table: "data_actions" using primary key columns */
  data_actions_by_pk: Maybe<Data_Actions>;
  /** fetch data from the table: "data_fields" */
  data_fields: Array<Data_Fields>;
  /** fetch aggregated fields from the table: "data_fields" */
  data_fields_aggregate: Data_Fields_Aggregate;
  /** fetch data from the table: "data_fields" using primary key columns */
  data_fields_by_pk: Maybe<Data_Fields>;
  /** fetch data from the table: "data_partners" */
  data_partners: Array<Data_Partners>;
  /** fetch aggregated fields from the table: "data_partners" */
  data_partners_aggregate: Data_Partners_Aggregate;
  /** fetch data from the table: "data_partners" using primary key columns */
  data_partners_by_pk: Maybe<Data_Partners>;
  /** fetch data from the table: "data_raw" */
  data_raw: Array<Data_Raw>;
  /** fetch aggregated fields from the table: "data_raw" */
  data_raw_aggregate: Data_Raw_Aggregate;
  /** fetch data from the table: "data_raw" using primary key columns */
  data_raw_by_pk: Maybe<Data_Raw>;
  /** fetch data from the table: "data_runs" */
  data_runs: Array<Data_Runs>;
  /** fetch aggregated fields from the table: "data_runs" */
  data_runs_aggregate: Data_Runs_Aggregate;
  /** fetch data from the table: "data_runs" using primary key columns */
  data_runs_by_pk: Maybe<Data_Runs>;
  /** fetch data from the table: "disabled_emails" */
  disabled_emails: Array<Disabled_Emails>;
  /** fetch aggregated fields from the table: "disabled_emails" */
  disabled_emails_aggregate: Disabled_Emails_Aggregate;
  /** fetch data from the table: "disabled_emails" using primary key columns */
  disabled_emails_by_pk: Maybe<Disabled_Emails>;
  /** An array relationship */
  event_organization: Array<Event_Organization>;
  /** An aggregate relationship */
  event_organization_aggregate: Event_Organization_Aggregate;
  /** fetch data from the table: "event_organization" using primary key columns */
  event_organization_by_pk: Maybe<Event_Organization>;
  /** An array relationship */
  event_person: Array<Event_Person>;
  /** An aggregate relationship */
  event_person_aggregate: Event_Person_Aggregate;
  /** fetch data from the table: "event_person" using primary key columns */
  event_person_by_pk: Maybe<Event_Person>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk: Maybe<Events>;
  /** fetch data from the table: "follows" */
  follows: Array<Follows>;
  /** fetch aggregated fields from the table: "follows" */
  follows_aggregate: Follows_Aggregate;
  /** fetch data from the table: "follows" using primary key columns */
  follows_by_pk: Maybe<Follows>;
  /** An array relationship */
  follows_companies: Array<Follows_Companies>;
  /** An aggregate relationship */
  follows_companies_aggregate: Follows_Companies_Aggregate;
  /** fetch data from the table: "follows_vc_firms" */
  follows_vc_firms: Array<Follows_Vc_Firms>;
  /** fetch aggregated fields from the table: "follows_vc_firms" */
  follows_vc_firms_aggregate: Follows_Vc_Firms_Aggregate;
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
  /** An array relationship */
  list_members: Array<List_Members>;
  /** An aggregate relationship */
  list_members_aggregate: List_Members_Aggregate;
  /** fetch data from the table: "list_members" using primary key columns */
  list_members_by_pk: Maybe<List_Members>;
  /** fetch data from the table: "list_user_groups" */
  list_user_groups: Array<List_User_Groups>;
  /** fetch aggregated fields from the table: "list_user_groups" */
  list_user_groups_aggregate: List_User_Groups_Aggregate;
  /** fetch data from the table: "list_user_groups" using primary key columns */
  list_user_groups_by_pk: Maybe<List_User_Groups>;
  /** fetch data from the table: "lists" */
  lists: Array<Lists>;
  /** fetch aggregated fields from the table: "lists" */
  lists_aggregate: Lists_Aggregate;
  /** fetch data from the table: "lists" using primary key columns */
  lists_by_pk: Maybe<Lists>;
  /** fetch data from the table: "news" */
  news: Array<News>;
  /** fetch aggregated fields from the table: "news" */
  news_aggregate: News_Aggregate;
  /** fetch data from the table: "news" using primary key columns */
  news_by_pk: Maybe<News>;
  /** fetch data from the table: "news_organizations" */
  news_organizations: Array<News_Organizations>;
  /** fetch aggregated fields from the table: "news_organizations" */
  news_organizations_aggregate: News_Organizations_Aggregate;
  /** fetch data from the table: "news_organizations" using primary key columns */
  news_organizations_by_pk: Maybe<News_Organizations>;
  /** An array relationship */
  notes: Array<Notes>;
  /** An aggregate relationship */
  notes_aggregate: Notes_Aggregate;
  /** fetch data from the table: "notes" using primary key columns */
  notes_by_pk: Maybe<Notes>;
  /** fetch data from the table: "notifications" */
  notifications: Array<Notifications>;
  /** fetch aggregated fields from the table: "notifications" */
  notifications_aggregate: Notifications_Aggregate;
  /** fetch data from the table: "notifications" using primary key columns */
  notifications_by_pk: Maybe<Notifications>;
  /** fetch data from the table: "people" */
  people: Array<People>;
  /** fetch aggregated fields from the table: "people" */
  people_aggregate: People_Aggregate;
  /** fetch data from the table: "people" using primary key columns */
  people_by_pk: Maybe<People>;
  /** fetch data from the table: "reset_passwords" */
  reset_passwords: Array<Reset_Passwords>;
  /** fetch aggregated fields from the table: "reset_passwords" */
  reset_passwords_aggregate: Reset_Passwords_Aggregate;
  /** fetch data from the table: "reset_passwords" using primary key columns */
  reset_passwords_by_pk: Maybe<Reset_Passwords>;
  /** fetch data from the table: "resource_edit_access" */
  resource_edit_access: Array<Resource_Edit_Access>;
  /** fetch aggregated fields from the table: "resource_edit_access" */
  resource_edit_access_aggregate: Resource_Edit_Access_Aggregate;
  /** fetch data from the table: "resource_edit_access" using primary key columns */
  resource_edit_access_by_pk: Maybe<Resource_Edit_Access>;
  /** fetch data from the table: "resource_links" */
  resource_links: Array<Resource_Links>;
  /** fetch aggregated fields from the table: "resource_links" */
  resource_links_aggregate: Resource_Links_Aggregate;
  /** fetch data from the table: "resource_links" using primary key columns */
  resource_links_by_pk: Maybe<Resource_Links>;
  /** An array relationship */
  team_members: Array<Team_Members>;
  /** An aggregate relationship */
  team_members_aggregate: Team_Members_Aggregate;
  /** fetch data from the table: "team_members" using primary key columns */
  team_members_by_pk: Maybe<Team_Members>;
  /** An array relationship */
  user_group_invites: Array<User_Group_Invites>;
  /** An aggregate relationship */
  user_group_invites_aggregate: User_Group_Invites_Aggregate;
  /** fetch data from the table: "user_group_invites" using primary key columns */
  user_group_invites_by_pk: Maybe<User_Group_Invites>;
  /** An array relationship */
  user_group_members: Array<User_Group_Members>;
  /** An aggregate relationship */
  user_group_members_aggregate: User_Group_Members_Aggregate;
  /** fetch data from the table: "user_group_members" using primary key columns */
  user_group_members_by_pk: Maybe<User_Group_Members>;
  /** fetch data from the table: "user_groups" */
  user_groups: Array<User_Groups>;
  /** fetch aggregated fields from the table: "user_groups" */
  user_groups_aggregate: User_Groups_Aggregate;
  /** fetch data from the table: "user_groups" using primary key columns */
  user_groups_by_pk: Maybe<User_Groups>;
  /** fetch data from the table: "user_tokens" */
  user_tokens: Array<User_Tokens>;
  /** fetch aggregated fields from the table: "user_tokens" */
  user_tokens_aggregate: User_Tokens_Aggregate;
  /** fetch data from the table: "user_tokens" using primary key columns */
  user_tokens_by_pk: Maybe<User_Tokens>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk: Maybe<Users>;
  /** fetch data from the table: "vc_firms" */
  vc_firms: Array<Vc_Firms>;
  /** fetch aggregated fields from the table: "vc_firms" */
  vc_firms_aggregate: Vc_Firms_Aggregate;
  /** fetch data from the table: "vc_firms" using primary key columns */
  vc_firms_by_pk: Maybe<Vc_Firms>;
  /** fetch data from the table: "vc_firms_edit_access" */
  vc_firms_edit_access: Array<Vc_Firms_Edit_Access>;
  /** fetch aggregated fields from the table: "vc_firms_edit_access" */
  vc_firms_edit_access_aggregate: Vc_Firms_Edit_Access_Aggregate;
  /** fetch data from the table: "waitlist_emails" */
  waitlist_emails: Array<Waitlist_Emails>;
  /** fetch aggregated fields from the table: "waitlist_emails" */
  waitlist_emails_aggregate: Waitlist_Emails_Aggregate;
  /** fetch data from the table: "waitlist_emails" using primary key columns */
  waitlist_emails_by_pk: Maybe<Waitlist_Emails>;
};


export type Subscription_RootActionsArgs = {
  distinct_on: InputMaybe<Array<Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Actions_Order_By>>;
  where: InputMaybe<Actions_Bool_Exp>;
};


export type Subscription_RootActions_AggregateArgs = {
  distinct_on: InputMaybe<Array<Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Actions_Order_By>>;
  where: InputMaybe<Actions_Bool_Exp>;
};


export type Subscription_RootActions_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootAllowed_EmailsArgs = {
  distinct_on: InputMaybe<Array<Allowed_Emails_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Allowed_Emails_Order_By>>;
  where: InputMaybe<Allowed_Emails_Bool_Exp>;
};


export type Subscription_RootAllowed_Emails_AggregateArgs = {
  distinct_on: InputMaybe<Array<Allowed_Emails_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Allowed_Emails_Order_By>>;
  where: InputMaybe<Allowed_Emails_Bool_Exp>;
};


export type Subscription_RootAllowed_Emails_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootApplication_MetaArgs = {
  distinct_on: InputMaybe<Array<Application_Meta_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Application_Meta_Order_By>>;
  where: InputMaybe<Application_Meta_Bool_Exp>;
};


export type Subscription_RootApplication_Meta_AggregateArgs = {
  distinct_on: InputMaybe<Array<Application_Meta_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Application_Meta_Order_By>>;
  where: InputMaybe<Application_Meta_Bool_Exp>;
};


export type Subscription_RootApplication_Meta_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootBilling_OrgArgs = {
  distinct_on: InputMaybe<Array<Billing_Org_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Billing_Org_Order_By>>;
  where: InputMaybe<Billing_Org_Bool_Exp>;
};


export type Subscription_RootBilling_Org_AggregateArgs = {
  distinct_on: InputMaybe<Array<Billing_Org_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Billing_Org_Order_By>>;
  where: InputMaybe<Billing_Org_Bool_Exp>;
};


export type Subscription_RootBilling_Org_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootBlockchainsArgs = {
  distinct_on: InputMaybe<Array<Blockchains_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Blockchains_Order_By>>;
  where: InputMaybe<Blockchains_Bool_Exp>;
};


export type Subscription_RootBlockchains_AggregateArgs = {
  distinct_on: InputMaybe<Array<Blockchains_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Blockchains_Order_By>>;
  where: InputMaybe<Blockchains_Bool_Exp>;
};


export type Subscription_RootBlockchains_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootCoinsArgs = {
  distinct_on: InputMaybe<Array<Coins_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Coins_Order_By>>;
  where: InputMaybe<Coins_Bool_Exp>;
};


export type Subscription_RootCoins_AggregateArgs = {
  distinct_on: InputMaybe<Array<Coins_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Coins_Order_By>>;
  where: InputMaybe<Coins_Bool_Exp>;
};


export type Subscription_RootCoins_By_PkArgs = {
  id: Scalars['Int'];
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


export type Subscription_RootCompanies_Edit_AccessArgs = {
  distinct_on: InputMaybe<Array<Companies_Edit_Access_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Companies_Edit_Access_Order_By>>;
  where: InputMaybe<Companies_Edit_Access_Bool_Exp>;
};


export type Subscription_RootCompanies_Edit_Access_AggregateArgs = {
  distinct_on: InputMaybe<Array<Companies_Edit_Access_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Companies_Edit_Access_Order_By>>;
  where: InputMaybe<Companies_Edit_Access_Bool_Exp>;
};


export type Subscription_RootData_ActionsArgs = {
  distinct_on: InputMaybe<Array<Data_Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Actions_Order_By>>;
  where: InputMaybe<Data_Actions_Bool_Exp>;
};


export type Subscription_RootData_Actions_AggregateArgs = {
  distinct_on: InputMaybe<Array<Data_Actions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Actions_Order_By>>;
  where: InputMaybe<Data_Actions_Bool_Exp>;
};


export type Subscription_RootData_Actions_By_PkArgs = {
  name: Scalars['String'];
};


export type Subscription_RootData_FieldsArgs = {
  distinct_on: InputMaybe<Array<Data_Fields_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Fields_Order_By>>;
  where: InputMaybe<Data_Fields_Bool_Exp>;
};


export type Subscription_RootData_Fields_AggregateArgs = {
  distinct_on: InputMaybe<Array<Data_Fields_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Fields_Order_By>>;
  where: InputMaybe<Data_Fields_Bool_Exp>;
};


export type Subscription_RootData_Fields_By_PkArgs = {
  path: Scalars['String'];
};


export type Subscription_RootData_PartnersArgs = {
  distinct_on: InputMaybe<Array<Data_Partners_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Partners_Order_By>>;
  where: InputMaybe<Data_Partners_Bool_Exp>;
};


export type Subscription_RootData_Partners_AggregateArgs = {
  distinct_on: InputMaybe<Array<Data_Partners_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Partners_Order_By>>;
  where: InputMaybe<Data_Partners_Bool_Exp>;
};


export type Subscription_RootData_Partners_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootData_RawArgs = {
  distinct_on: InputMaybe<Array<Data_Raw_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Raw_Order_By>>;
  where: InputMaybe<Data_Raw_Bool_Exp>;
};


export type Subscription_RootData_Raw_AggregateArgs = {
  distinct_on: InputMaybe<Array<Data_Raw_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Raw_Order_By>>;
  where: InputMaybe<Data_Raw_Bool_Exp>;
};


export type Subscription_RootData_Raw_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootData_RunsArgs = {
  distinct_on: InputMaybe<Array<Data_Runs_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Runs_Order_By>>;
  where: InputMaybe<Data_Runs_Bool_Exp>;
};


export type Subscription_RootData_Runs_AggregateArgs = {
  distinct_on: InputMaybe<Array<Data_Runs_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Data_Runs_Order_By>>;
  where: InputMaybe<Data_Runs_Bool_Exp>;
};


export type Subscription_RootData_Runs_By_PkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootDisabled_EmailsArgs = {
  distinct_on: InputMaybe<Array<Disabled_Emails_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Disabled_Emails_Order_By>>;
  where: InputMaybe<Disabled_Emails_Bool_Exp>;
};


export type Subscription_RootDisabled_Emails_AggregateArgs = {
  distinct_on: InputMaybe<Array<Disabled_Emails_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Disabled_Emails_Order_By>>;
  where: InputMaybe<Disabled_Emails_Bool_Exp>;
};


export type Subscription_RootDisabled_Emails_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootEvent_OrganizationArgs = {
  distinct_on: InputMaybe<Array<Event_Organization_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Event_Organization_Order_By>>;
  where: InputMaybe<Event_Organization_Bool_Exp>;
};


export type Subscription_RootEvent_Organization_AggregateArgs = {
  distinct_on: InputMaybe<Array<Event_Organization_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Event_Organization_Order_By>>;
  where: InputMaybe<Event_Organization_Bool_Exp>;
};


export type Subscription_RootEvent_Organization_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootEvent_PersonArgs = {
  distinct_on: InputMaybe<Array<Event_Person_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Event_Person_Order_By>>;
  where: InputMaybe<Event_Person_Bool_Exp>;
};


export type Subscription_RootEvent_Person_AggregateArgs = {
  distinct_on: InputMaybe<Array<Event_Person_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Event_Person_Order_By>>;
  where: InputMaybe<Event_Person_Bool_Exp>;
};


export type Subscription_RootEvent_Person_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootEventsArgs = {
  distinct_on: InputMaybe<Array<Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Events_Order_By>>;
  where: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootEvents_AggregateArgs = {
  distinct_on: InputMaybe<Array<Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Events_Order_By>>;
  where: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootEvents_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootFollowsArgs = {
  distinct_on: InputMaybe<Array<Follows_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Order_By>>;
  where: InputMaybe<Follows_Bool_Exp>;
};


export type Subscription_RootFollows_AggregateArgs = {
  distinct_on: InputMaybe<Array<Follows_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Order_By>>;
  where: InputMaybe<Follows_Bool_Exp>;
};


export type Subscription_RootFollows_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootFollows_CompaniesArgs = {
  distinct_on: InputMaybe<Array<Follows_Companies_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Companies_Order_By>>;
  where: InputMaybe<Follows_Companies_Bool_Exp>;
};


export type Subscription_RootFollows_Companies_AggregateArgs = {
  distinct_on: InputMaybe<Array<Follows_Companies_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Companies_Order_By>>;
  where: InputMaybe<Follows_Companies_Bool_Exp>;
};


export type Subscription_RootFollows_Vc_FirmsArgs = {
  distinct_on: InputMaybe<Array<Follows_Vc_Firms_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Vc_Firms_Order_By>>;
  where: InputMaybe<Follows_Vc_Firms_Bool_Exp>;
};


export type Subscription_RootFollows_Vc_Firms_AggregateArgs = {
  distinct_on: InputMaybe<Array<Follows_Vc_Firms_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Vc_Firms_Order_By>>;
  where: InputMaybe<Follows_Vc_Firms_Bool_Exp>;
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


export type Subscription_RootList_MembersArgs = {
  distinct_on: InputMaybe<Array<List_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<List_Members_Order_By>>;
  where: InputMaybe<List_Members_Bool_Exp>;
};


export type Subscription_RootList_Members_AggregateArgs = {
  distinct_on: InputMaybe<Array<List_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<List_Members_Order_By>>;
  where: InputMaybe<List_Members_Bool_Exp>;
};


export type Subscription_RootList_Members_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootList_User_GroupsArgs = {
  distinct_on: InputMaybe<Array<List_User_Groups_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<List_User_Groups_Order_By>>;
  where: InputMaybe<List_User_Groups_Bool_Exp>;
};


export type Subscription_RootList_User_Groups_AggregateArgs = {
  distinct_on: InputMaybe<Array<List_User_Groups_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<List_User_Groups_Order_By>>;
  where: InputMaybe<List_User_Groups_Bool_Exp>;
};


export type Subscription_RootList_User_Groups_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootListsArgs = {
  distinct_on: InputMaybe<Array<Lists_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Lists_Order_By>>;
  where: InputMaybe<Lists_Bool_Exp>;
};


export type Subscription_RootLists_AggregateArgs = {
  distinct_on: InputMaybe<Array<Lists_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Lists_Order_By>>;
  where: InputMaybe<Lists_Bool_Exp>;
};


export type Subscription_RootLists_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootNewsArgs = {
  distinct_on: InputMaybe<Array<News_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<News_Order_By>>;
  where: InputMaybe<News_Bool_Exp>;
};


export type Subscription_RootNews_AggregateArgs = {
  distinct_on: InputMaybe<Array<News_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<News_Order_By>>;
  where: InputMaybe<News_Bool_Exp>;
};


export type Subscription_RootNews_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootNews_OrganizationsArgs = {
  distinct_on: InputMaybe<Array<News_Organizations_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<News_Organizations_Order_By>>;
  where: InputMaybe<News_Organizations_Bool_Exp>;
};


export type Subscription_RootNews_Organizations_AggregateArgs = {
  distinct_on: InputMaybe<Array<News_Organizations_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<News_Organizations_Order_By>>;
  where: InputMaybe<News_Organizations_Bool_Exp>;
};


export type Subscription_RootNews_Organizations_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootNotesArgs = {
  distinct_on: InputMaybe<Array<Notes_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Notes_Order_By>>;
  where: InputMaybe<Notes_Bool_Exp>;
};


export type Subscription_RootNotes_AggregateArgs = {
  distinct_on: InputMaybe<Array<Notes_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Notes_Order_By>>;
  where: InputMaybe<Notes_Bool_Exp>;
};


export type Subscription_RootNotes_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootNotificationsArgs = {
  distinct_on: InputMaybe<Array<Notifications_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Notifications_Order_By>>;
  where: InputMaybe<Notifications_Bool_Exp>;
};


export type Subscription_RootNotifications_AggregateArgs = {
  distinct_on: InputMaybe<Array<Notifications_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Notifications_Order_By>>;
  where: InputMaybe<Notifications_Bool_Exp>;
};


export type Subscription_RootNotifications_By_PkArgs = {
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


export type Subscription_RootReset_PasswordsArgs = {
  distinct_on: InputMaybe<Array<Reset_Passwords_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Reset_Passwords_Order_By>>;
  where: InputMaybe<Reset_Passwords_Bool_Exp>;
};


export type Subscription_RootReset_Passwords_AggregateArgs = {
  distinct_on: InputMaybe<Array<Reset_Passwords_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Reset_Passwords_Order_By>>;
  where: InputMaybe<Reset_Passwords_Bool_Exp>;
};


export type Subscription_RootReset_Passwords_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootResource_Edit_AccessArgs = {
  distinct_on: InputMaybe<Array<Resource_Edit_Access_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Resource_Edit_Access_Order_By>>;
  where: InputMaybe<Resource_Edit_Access_Bool_Exp>;
};


export type Subscription_RootResource_Edit_Access_AggregateArgs = {
  distinct_on: InputMaybe<Array<Resource_Edit_Access_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Resource_Edit_Access_Order_By>>;
  where: InputMaybe<Resource_Edit_Access_Bool_Exp>;
};


export type Subscription_RootResource_Edit_Access_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootResource_LinksArgs = {
  distinct_on: InputMaybe<Array<Resource_Links_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Resource_Links_Order_By>>;
  where: InputMaybe<Resource_Links_Bool_Exp>;
};


export type Subscription_RootResource_Links_AggregateArgs = {
  distinct_on: InputMaybe<Array<Resource_Links_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Resource_Links_Order_By>>;
  where: InputMaybe<Resource_Links_Bool_Exp>;
};


export type Subscription_RootResource_Links_By_PkArgs = {
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


export type Subscription_RootUser_Group_InvitesArgs = {
  distinct_on: InputMaybe<Array<User_Group_Invites_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Group_Invites_Order_By>>;
  where: InputMaybe<User_Group_Invites_Bool_Exp>;
};


export type Subscription_RootUser_Group_Invites_AggregateArgs = {
  distinct_on: InputMaybe<Array<User_Group_Invites_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Group_Invites_Order_By>>;
  where: InputMaybe<User_Group_Invites_Bool_Exp>;
};


export type Subscription_RootUser_Group_Invites_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootUser_Group_MembersArgs = {
  distinct_on: InputMaybe<Array<User_Group_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Group_Members_Order_By>>;
  where: InputMaybe<User_Group_Members_Bool_Exp>;
};


export type Subscription_RootUser_Group_Members_AggregateArgs = {
  distinct_on: InputMaybe<Array<User_Group_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Group_Members_Order_By>>;
  where: InputMaybe<User_Group_Members_Bool_Exp>;
};


export type Subscription_RootUser_Group_Members_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootUser_GroupsArgs = {
  distinct_on: InputMaybe<Array<User_Groups_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Groups_Order_By>>;
  where: InputMaybe<User_Groups_Bool_Exp>;
};


export type Subscription_RootUser_Groups_AggregateArgs = {
  distinct_on: InputMaybe<Array<User_Groups_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Groups_Order_By>>;
  where: InputMaybe<User_Groups_Bool_Exp>;
};


export type Subscription_RootUser_Groups_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootUser_TokensArgs = {
  distinct_on: InputMaybe<Array<User_Tokens_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Tokens_Order_By>>;
  where: InputMaybe<User_Tokens_Bool_Exp>;
};


export type Subscription_RootUser_Tokens_AggregateArgs = {
  distinct_on: InputMaybe<Array<User_Tokens_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Tokens_Order_By>>;
  where: InputMaybe<User_Tokens_Bool_Exp>;
};


export type Subscription_RootUser_Tokens_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootUsersArgs = {
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
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


export type Subscription_RootVc_Firms_Edit_AccessArgs = {
  distinct_on: InputMaybe<Array<Vc_Firms_Edit_Access_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Vc_Firms_Edit_Access_Order_By>>;
  where: InputMaybe<Vc_Firms_Edit_Access_Bool_Exp>;
};


export type Subscription_RootVc_Firms_Edit_Access_AggregateArgs = {
  distinct_on: InputMaybe<Array<Vc_Firms_Edit_Access_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Vc_Firms_Edit_Access_Order_By>>;
  where: InputMaybe<Vc_Firms_Edit_Access_Bool_Exp>;
};


export type Subscription_RootWaitlist_EmailsArgs = {
  distinct_on: InputMaybe<Array<Waitlist_Emails_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Waitlist_Emails_Order_By>>;
  where: InputMaybe<Waitlist_Emails_Bool_Exp>;
};


export type Subscription_RootWaitlist_Emails_AggregateArgs = {
  distinct_on: InputMaybe<Array<Waitlist_Emails_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Waitlist_Emails_Order_By>>;
  where: InputMaybe<Waitlist_Emails_Bool_Exp>;
};


export type Subscription_RootWaitlist_Emails_By_PkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "team_members" */
export type Team_Members = {
  __typename?: 'team_members';
  /** An object relationship */
  company: Maybe<Companies>;
  company_id: Maybe<Scalars['Int']>;
  end_date: Maybe<Scalars['date']>;
  external_id: Maybe<Scalars['String']>;
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
  TeamMembersCompanyIdPersonIdKey = 'team_members_company_id_person_id_key',
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

/** Boolean expression to compare columns of type "time". All fields are combined with logical 'AND'. */
export type Time_Comparison_Exp = {
  _eq: InputMaybe<Scalars['time']>;
  _gt: InputMaybe<Scalars['time']>;
  _gte: InputMaybe<Scalars['time']>;
  _in: InputMaybe<Array<Scalars['time']>>;
  _is_null: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['time']>;
  _lte: InputMaybe<Scalars['time']>;
  _neq: InputMaybe<Scalars['time']>;
  _nin: InputMaybe<Array<Scalars['time']>>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq: InputMaybe<Scalars['timestamp']>;
  _gt: InputMaybe<Scalars['timestamp']>;
  _gte: InputMaybe<Scalars['timestamp']>;
  _in: InputMaybe<Array<Scalars['timestamp']>>;
  _is_null: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['timestamp']>;
  _lte: InputMaybe<Scalars['timestamp']>;
  _neq: InputMaybe<Scalars['timestamp']>;
  _nin: InputMaybe<Array<Scalars['timestamp']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq: InputMaybe<Scalars['timestamptz']>;
  _gt: InputMaybe<Scalars['timestamptz']>;
  _gte: InputMaybe<Scalars['timestamptz']>;
  _in: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['timestamptz']>;
  _lte: InputMaybe<Scalars['timestamptz']>;
  _neq: InputMaybe<Scalars['timestamptz']>;
  _nin: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "user_group_invites" */
export type User_Group_Invites = {
  __typename?: 'user_group_invites';
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  created_by: Maybe<Users>;
  created_by_user_id: Maybe<Scalars['Int']>;
  email: Scalars['String'];
  id: Scalars['Int'];
  /** An object relationship */
  user_group: User_Groups;
  user_group_id: Scalars['Int'];
};

/** aggregated selection of "user_group_invites" */
export type User_Group_Invites_Aggregate = {
  __typename?: 'user_group_invites_aggregate';
  aggregate: Maybe<User_Group_Invites_Aggregate_Fields>;
  nodes: Array<User_Group_Invites>;
};

/** aggregate fields of "user_group_invites" */
export type User_Group_Invites_Aggregate_Fields = {
  __typename?: 'user_group_invites_aggregate_fields';
  avg: Maybe<User_Group_Invites_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<User_Group_Invites_Max_Fields>;
  min: Maybe<User_Group_Invites_Min_Fields>;
  stddev: Maybe<User_Group_Invites_Stddev_Fields>;
  stddev_pop: Maybe<User_Group_Invites_Stddev_Pop_Fields>;
  stddev_samp: Maybe<User_Group_Invites_Stddev_Samp_Fields>;
  sum: Maybe<User_Group_Invites_Sum_Fields>;
  var_pop: Maybe<User_Group_Invites_Var_Pop_Fields>;
  var_samp: Maybe<User_Group_Invites_Var_Samp_Fields>;
  variance: Maybe<User_Group_Invites_Variance_Fields>;
};


/** aggregate fields of "user_group_invites" */
export type User_Group_Invites_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<User_Group_Invites_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_group_invites" */
export type User_Group_Invites_Aggregate_Order_By = {
  avg: InputMaybe<User_Group_Invites_Avg_Order_By>;
  count: InputMaybe<Order_By>;
  max: InputMaybe<User_Group_Invites_Max_Order_By>;
  min: InputMaybe<User_Group_Invites_Min_Order_By>;
  stddev: InputMaybe<User_Group_Invites_Stddev_Order_By>;
  stddev_pop: InputMaybe<User_Group_Invites_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<User_Group_Invites_Stddev_Samp_Order_By>;
  sum: InputMaybe<User_Group_Invites_Sum_Order_By>;
  var_pop: InputMaybe<User_Group_Invites_Var_Pop_Order_By>;
  var_samp: InputMaybe<User_Group_Invites_Var_Samp_Order_By>;
  variance: InputMaybe<User_Group_Invites_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_group_invites" */
export type User_Group_Invites_Arr_Rel_Insert_Input = {
  data: Array<User_Group_Invites_Insert_Input>;
  /** upsert condition */
  on_conflict: InputMaybe<User_Group_Invites_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Group_Invites_Avg_Fields = {
  __typename?: 'user_group_invites_avg_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_group_invites" */
export type User_Group_Invites_Avg_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_group_invites". All fields are combined with a logical 'AND'. */
export type User_Group_Invites_Bool_Exp = {
  _and: InputMaybe<Array<User_Group_Invites_Bool_Exp>>;
  _not: InputMaybe<User_Group_Invites_Bool_Exp>;
  _or: InputMaybe<Array<User_Group_Invites_Bool_Exp>>;
  created_at: InputMaybe<Timestamptz_Comparison_Exp>;
  created_by: InputMaybe<Users_Bool_Exp>;
  created_by_user_id: InputMaybe<Int_Comparison_Exp>;
  email: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  user_group: InputMaybe<User_Groups_Bool_Exp>;
  user_group_id: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_group_invites" */
export enum User_Group_Invites_Constraint {
  /** unique or primary key constraint */
  UserGroupInvitesPkey = 'user_group_invites_pkey'
}

/** input type for incrementing numeric columns in table "user_group_invites" */
export type User_Group_Invites_Inc_Input = {
  created_by_user_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  user_group_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_group_invites" */
export type User_Group_Invites_Insert_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  created_by: InputMaybe<Users_Obj_Rel_Insert_Input>;
  created_by_user_id: InputMaybe<Scalars['Int']>;
  email: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  user_group: InputMaybe<User_Groups_Obj_Rel_Insert_Input>;
  user_group_id: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type User_Group_Invites_Max_Fields = {
  __typename?: 'user_group_invites_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  created_by_user_id: Maybe<Scalars['Int']>;
  email: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  user_group_id: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "user_group_invites" */
export type User_Group_Invites_Max_Order_By = {
  created_at: InputMaybe<Order_By>;
  created_by_user_id: InputMaybe<Order_By>;
  email: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Group_Invites_Min_Fields = {
  __typename?: 'user_group_invites_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  created_by_user_id: Maybe<Scalars['Int']>;
  email: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  user_group_id: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "user_group_invites" */
export type User_Group_Invites_Min_Order_By = {
  created_at: InputMaybe<Order_By>;
  created_by_user_id: InputMaybe<Order_By>;
  email: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_group_invites" */
export type User_Group_Invites_Mutation_Response = {
  __typename?: 'user_group_invites_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Group_Invites>;
};

/** on_conflict condition type for table "user_group_invites" */
export type User_Group_Invites_On_Conflict = {
  constraint: User_Group_Invites_Constraint;
  update_columns: Array<User_Group_Invites_Update_Column>;
  where: InputMaybe<User_Group_Invites_Bool_Exp>;
};

/** Ordering options when selecting data from "user_group_invites". */
export type User_Group_Invites_Order_By = {
  created_at: InputMaybe<Order_By>;
  created_by: InputMaybe<Users_Order_By>;
  created_by_user_id: InputMaybe<Order_By>;
  email: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  user_group: InputMaybe<User_Groups_Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_group_invites */
export type User_Group_Invites_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "user_group_invites" */
export enum User_Group_Invites_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedByUserId = 'created_by_user_id',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  UserGroupId = 'user_group_id'
}

/** input type for updating data in table "user_group_invites" */
export type User_Group_Invites_Set_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  created_by_user_id: InputMaybe<Scalars['Int']>;
  email: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  user_group_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type User_Group_Invites_Stddev_Fields = {
  __typename?: 'user_group_invites_stddev_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_group_invites" */
export type User_Group_Invites_Stddev_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Group_Invites_Stddev_Pop_Fields = {
  __typename?: 'user_group_invites_stddev_pop_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_group_invites" */
export type User_Group_Invites_Stddev_Pop_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Group_Invites_Stddev_Samp_Fields = {
  __typename?: 'user_group_invites_stddev_samp_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_group_invites" */
export type User_Group_Invites_Stddev_Samp_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Group_Invites_Sum_Fields = {
  __typename?: 'user_group_invites_sum_fields';
  created_by_user_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  user_group_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user_group_invites" */
export type User_Group_Invites_Sum_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** update columns of table "user_group_invites" */
export enum User_Group_Invites_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedByUserId = 'created_by_user_id',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  UserGroupId = 'user_group_id'
}

/** aggregate var_pop on columns */
export type User_Group_Invites_Var_Pop_Fields = {
  __typename?: 'user_group_invites_var_pop_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_group_invites" */
export type User_Group_Invites_Var_Pop_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Group_Invites_Var_Samp_Fields = {
  __typename?: 'user_group_invites_var_samp_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_group_invites" */
export type User_Group_Invites_Var_Samp_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Group_Invites_Variance_Fields = {
  __typename?: 'user_group_invites_variance_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_group_invites" */
export type User_Group_Invites_Variance_Order_By = {
  created_by_user_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
};

/** columns and relationships of "user_group_members" */
export type User_Group_Members = {
  __typename?: 'user_group_members';
  id: Scalars['Int'];
  /** An object relationship */
  user: Users;
  /** An object relationship */
  user_group: User_Groups;
  user_group_id: Scalars['Int'];
  user_id: Scalars['Int'];
};

/** aggregated selection of "user_group_members" */
export type User_Group_Members_Aggregate = {
  __typename?: 'user_group_members_aggregate';
  aggregate: Maybe<User_Group_Members_Aggregate_Fields>;
  nodes: Array<User_Group_Members>;
};

/** aggregate fields of "user_group_members" */
export type User_Group_Members_Aggregate_Fields = {
  __typename?: 'user_group_members_aggregate_fields';
  avg: Maybe<User_Group_Members_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<User_Group_Members_Max_Fields>;
  min: Maybe<User_Group_Members_Min_Fields>;
  stddev: Maybe<User_Group_Members_Stddev_Fields>;
  stddev_pop: Maybe<User_Group_Members_Stddev_Pop_Fields>;
  stddev_samp: Maybe<User_Group_Members_Stddev_Samp_Fields>;
  sum: Maybe<User_Group_Members_Sum_Fields>;
  var_pop: Maybe<User_Group_Members_Var_Pop_Fields>;
  var_samp: Maybe<User_Group_Members_Var_Samp_Fields>;
  variance: Maybe<User_Group_Members_Variance_Fields>;
};


/** aggregate fields of "user_group_members" */
export type User_Group_Members_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<User_Group_Members_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_group_members" */
export type User_Group_Members_Aggregate_Order_By = {
  avg: InputMaybe<User_Group_Members_Avg_Order_By>;
  count: InputMaybe<Order_By>;
  max: InputMaybe<User_Group_Members_Max_Order_By>;
  min: InputMaybe<User_Group_Members_Min_Order_By>;
  stddev: InputMaybe<User_Group_Members_Stddev_Order_By>;
  stddev_pop: InputMaybe<User_Group_Members_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<User_Group_Members_Stddev_Samp_Order_By>;
  sum: InputMaybe<User_Group_Members_Sum_Order_By>;
  var_pop: InputMaybe<User_Group_Members_Var_Pop_Order_By>;
  var_samp: InputMaybe<User_Group_Members_Var_Samp_Order_By>;
  variance: InputMaybe<User_Group_Members_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_group_members" */
export type User_Group_Members_Arr_Rel_Insert_Input = {
  data: Array<User_Group_Members_Insert_Input>;
  /** upsert condition */
  on_conflict: InputMaybe<User_Group_Members_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Group_Members_Avg_Fields = {
  __typename?: 'user_group_members_avg_fields';
  id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_group_members" */
export type User_Group_Members_Avg_Order_By = {
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_group_members". All fields are combined with a logical 'AND'. */
export type User_Group_Members_Bool_Exp = {
  _and: InputMaybe<Array<User_Group_Members_Bool_Exp>>;
  _not: InputMaybe<User_Group_Members_Bool_Exp>;
  _or: InputMaybe<Array<User_Group_Members_Bool_Exp>>;
  id: InputMaybe<Int_Comparison_Exp>;
  user: InputMaybe<Users_Bool_Exp>;
  user_group: InputMaybe<User_Groups_Bool_Exp>;
  user_group_id: InputMaybe<Int_Comparison_Exp>;
  user_id: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_group_members" */
export enum User_Group_Members_Constraint {
  /** unique or primary key constraint */
  UserGroupMembersPkey = 'user_group_members_pkey'
}

/** input type for incrementing numeric columns in table "user_group_members" */
export type User_Group_Members_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
  user_group_id: InputMaybe<Scalars['Int']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_group_members" */
export type User_Group_Members_Insert_Input = {
  id: InputMaybe<Scalars['Int']>;
  user: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_group: InputMaybe<User_Groups_Obj_Rel_Insert_Input>;
  user_group_id: InputMaybe<Scalars['Int']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type User_Group_Members_Max_Fields = {
  __typename?: 'user_group_members_max_fields';
  id: Maybe<Scalars['Int']>;
  user_group_id: Maybe<Scalars['Int']>;
  user_id: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "user_group_members" */
export type User_Group_Members_Max_Order_By = {
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Group_Members_Min_Fields = {
  __typename?: 'user_group_members_min_fields';
  id: Maybe<Scalars['Int']>;
  user_group_id: Maybe<Scalars['Int']>;
  user_id: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "user_group_members" */
export type User_Group_Members_Min_Order_By = {
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_group_members" */
export type User_Group_Members_Mutation_Response = {
  __typename?: 'user_group_members_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Group_Members>;
};

/** on_conflict condition type for table "user_group_members" */
export type User_Group_Members_On_Conflict = {
  constraint: User_Group_Members_Constraint;
  update_columns: Array<User_Group_Members_Update_Column>;
  where: InputMaybe<User_Group_Members_Bool_Exp>;
};

/** Ordering options when selecting data from "user_group_members". */
export type User_Group_Members_Order_By = {
  id: InputMaybe<Order_By>;
  user: InputMaybe<Users_Order_By>;
  user_group: InputMaybe<User_Groups_Order_By>;
  user_group_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_group_members */
export type User_Group_Members_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "user_group_members" */
export enum User_Group_Members_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  UserGroupId = 'user_group_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "user_group_members" */
export type User_Group_Members_Set_Input = {
  id: InputMaybe<Scalars['Int']>;
  user_group_id: InputMaybe<Scalars['Int']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type User_Group_Members_Stddev_Fields = {
  __typename?: 'user_group_members_stddev_fields';
  id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_group_members" */
export type User_Group_Members_Stddev_Order_By = {
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Group_Members_Stddev_Pop_Fields = {
  __typename?: 'user_group_members_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_group_members" */
export type User_Group_Members_Stddev_Pop_Order_By = {
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Group_Members_Stddev_Samp_Fields = {
  __typename?: 'user_group_members_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_group_members" */
export type User_Group_Members_Stddev_Samp_Order_By = {
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Group_Members_Sum_Fields = {
  __typename?: 'user_group_members_sum_fields';
  id: Maybe<Scalars['Int']>;
  user_group_id: Maybe<Scalars['Int']>;
  user_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user_group_members" */
export type User_Group_Members_Sum_Order_By = {
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** update columns of table "user_group_members" */
export enum User_Group_Members_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  UserGroupId = 'user_group_id',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type User_Group_Members_Var_Pop_Fields = {
  __typename?: 'user_group_members_var_pop_fields';
  id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_group_members" */
export type User_Group_Members_Var_Pop_Order_By = {
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Group_Members_Var_Samp_Fields = {
  __typename?: 'user_group_members_var_samp_fields';
  id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_group_members" */
export type User_Group_Members_Var_Samp_Order_By = {
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Group_Members_Variance_Fields = {
  __typename?: 'user_group_members_variance_fields';
  id: Maybe<Scalars['Float']>;
  user_group_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_group_members" */
export type User_Group_Members_Variance_Order_By = {
  id: InputMaybe<Order_By>;
  user_group_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** columns and relationships of "user_groups" */
export type User_Groups = {
  __typename?: 'user_groups';
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  created_by: Maybe<Users>;
  created_by_user_id: Scalars['Int'];
  description: Maybe<Scalars['String']>;
  discord: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  /** An array relationship */
  notes: Array<Notes>;
  /** An aggregate relationship */
  notes_aggregate: Notes_Aggregate;
  telegram: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  user_group_invites: Array<User_Group_Invites>;
  /** An aggregate relationship */
  user_group_invites_aggregate: User_Group_Invites_Aggregate;
  /** An array relationship */
  user_group_members: Array<User_Group_Members>;
  /** An aggregate relationship */
  user_group_members_aggregate: User_Group_Members_Aggregate;
};


/** columns and relationships of "user_groups" */
export type User_GroupsNotesArgs = {
  distinct_on: InputMaybe<Array<Notes_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Notes_Order_By>>;
  where: InputMaybe<Notes_Bool_Exp>;
};


/** columns and relationships of "user_groups" */
export type User_GroupsNotes_AggregateArgs = {
  distinct_on: InputMaybe<Array<Notes_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Notes_Order_By>>;
  where: InputMaybe<Notes_Bool_Exp>;
};


/** columns and relationships of "user_groups" */
export type User_GroupsUser_Group_InvitesArgs = {
  distinct_on: InputMaybe<Array<User_Group_Invites_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Group_Invites_Order_By>>;
  where: InputMaybe<User_Group_Invites_Bool_Exp>;
};


/** columns and relationships of "user_groups" */
export type User_GroupsUser_Group_Invites_AggregateArgs = {
  distinct_on: InputMaybe<Array<User_Group_Invites_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Group_Invites_Order_By>>;
  where: InputMaybe<User_Group_Invites_Bool_Exp>;
};


/** columns and relationships of "user_groups" */
export type User_GroupsUser_Group_MembersArgs = {
  distinct_on: InputMaybe<Array<User_Group_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Group_Members_Order_By>>;
  where: InputMaybe<User_Group_Members_Bool_Exp>;
};


/** columns and relationships of "user_groups" */
export type User_GroupsUser_Group_Members_AggregateArgs = {
  distinct_on: InputMaybe<Array<User_Group_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Group_Members_Order_By>>;
  where: InputMaybe<User_Group_Members_Bool_Exp>;
};

/** aggregated selection of "user_groups" */
export type User_Groups_Aggregate = {
  __typename?: 'user_groups_aggregate';
  aggregate: Maybe<User_Groups_Aggregate_Fields>;
  nodes: Array<User_Groups>;
};

/** aggregate fields of "user_groups" */
export type User_Groups_Aggregate_Fields = {
  __typename?: 'user_groups_aggregate_fields';
  avg: Maybe<User_Groups_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<User_Groups_Max_Fields>;
  min: Maybe<User_Groups_Min_Fields>;
  stddev: Maybe<User_Groups_Stddev_Fields>;
  stddev_pop: Maybe<User_Groups_Stddev_Pop_Fields>;
  stddev_samp: Maybe<User_Groups_Stddev_Samp_Fields>;
  sum: Maybe<User_Groups_Sum_Fields>;
  var_pop: Maybe<User_Groups_Var_Pop_Fields>;
  var_samp: Maybe<User_Groups_Var_Samp_Fields>;
  variance: Maybe<User_Groups_Variance_Fields>;
};


/** aggregate fields of "user_groups" */
export type User_Groups_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<User_Groups_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type User_Groups_Avg_Fields = {
  __typename?: 'user_groups_avg_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "user_groups". All fields are combined with a logical 'AND'. */
export type User_Groups_Bool_Exp = {
  _and: InputMaybe<Array<User_Groups_Bool_Exp>>;
  _not: InputMaybe<User_Groups_Bool_Exp>;
  _or: InputMaybe<Array<User_Groups_Bool_Exp>>;
  created_at: InputMaybe<Timestamptz_Comparison_Exp>;
  created_by: InputMaybe<Users_Bool_Exp>;
  created_by_user_id: InputMaybe<Int_Comparison_Exp>;
  description: InputMaybe<String_Comparison_Exp>;
  discord: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  name: InputMaybe<String_Comparison_Exp>;
  notes: InputMaybe<Notes_Bool_Exp>;
  telegram: InputMaybe<String_Comparison_Exp>;
  twitter: InputMaybe<String_Comparison_Exp>;
  updated_at: InputMaybe<Timestamptz_Comparison_Exp>;
  user_group_invites: InputMaybe<User_Group_Invites_Bool_Exp>;
  user_group_members: InputMaybe<User_Group_Members_Bool_Exp>;
};

/** unique or primary key constraints on table "user_groups" */
export enum User_Groups_Constraint {
  /** unique or primary key constraint */
  UserGroupsPkey = 'user_groups_pkey'
}

/** input type for incrementing numeric columns in table "user_groups" */
export type User_Groups_Inc_Input = {
  created_by_user_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_groups" */
export type User_Groups_Insert_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  created_by: InputMaybe<Users_Obj_Rel_Insert_Input>;
  created_by_user_id: InputMaybe<Scalars['Int']>;
  description: InputMaybe<Scalars['String']>;
  discord: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  name: InputMaybe<Scalars['String']>;
  notes: InputMaybe<Notes_Arr_Rel_Insert_Input>;
  telegram: InputMaybe<Scalars['String']>;
  twitter: InputMaybe<Scalars['String']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  user_group_invites: InputMaybe<User_Group_Invites_Arr_Rel_Insert_Input>;
  user_group_members: InputMaybe<User_Group_Members_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type User_Groups_Max_Fields = {
  __typename?: 'user_groups_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  created_by_user_id: Maybe<Scalars['Int']>;
  description: Maybe<Scalars['String']>;
  discord: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
  telegram: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type User_Groups_Min_Fields = {
  __typename?: 'user_groups_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  created_by_user_id: Maybe<Scalars['Int']>;
  description: Maybe<Scalars['String']>;
  discord: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  name: Maybe<Scalars['String']>;
  telegram: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "user_groups" */
export type User_Groups_Mutation_Response = {
  __typename?: 'user_groups_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Groups>;
};

/** input type for inserting object relation for remote table "user_groups" */
export type User_Groups_Obj_Rel_Insert_Input = {
  data: User_Groups_Insert_Input;
  /** upsert condition */
  on_conflict: InputMaybe<User_Groups_On_Conflict>;
};

/** on_conflict condition type for table "user_groups" */
export type User_Groups_On_Conflict = {
  constraint: User_Groups_Constraint;
  update_columns: Array<User_Groups_Update_Column>;
  where: InputMaybe<User_Groups_Bool_Exp>;
};

/** Ordering options when selecting data from "user_groups". */
export type User_Groups_Order_By = {
  created_at: InputMaybe<Order_By>;
  created_by: InputMaybe<Users_Order_By>;
  created_by_user_id: InputMaybe<Order_By>;
  description: InputMaybe<Order_By>;
  discord: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  name: InputMaybe<Order_By>;
  notes_aggregate: InputMaybe<Notes_Aggregate_Order_By>;
  telegram: InputMaybe<Order_By>;
  twitter: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
  user_group_invites_aggregate: InputMaybe<User_Group_Invites_Aggregate_Order_By>;
  user_group_members_aggregate: InputMaybe<User_Group_Members_Aggregate_Order_By>;
};

/** primary key columns input for table: user_groups */
export type User_Groups_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "user_groups" */
export enum User_Groups_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedByUserId = 'created_by_user_id',
  /** column name */
  Description = 'description',
  /** column name */
  Discord = 'discord',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Telegram = 'telegram',
  /** column name */
  Twitter = 'twitter',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "user_groups" */
export type User_Groups_Set_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  created_by_user_id: InputMaybe<Scalars['Int']>;
  description: InputMaybe<Scalars['String']>;
  discord: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  name: InputMaybe<Scalars['String']>;
  telegram: InputMaybe<Scalars['String']>;
  twitter: InputMaybe<Scalars['String']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type User_Groups_Stddev_Fields = {
  __typename?: 'user_groups_stddev_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type User_Groups_Stddev_Pop_Fields = {
  __typename?: 'user_groups_stddev_pop_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type User_Groups_Stddev_Samp_Fields = {
  __typename?: 'user_groups_stddev_samp_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type User_Groups_Sum_Fields = {
  __typename?: 'user_groups_sum_fields';
  created_by_user_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
};

/** update columns of table "user_groups" */
export enum User_Groups_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedByUserId = 'created_by_user_id',
  /** column name */
  Description = 'description',
  /** column name */
  Discord = 'discord',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Telegram = 'telegram',
  /** column name */
  Twitter = 'twitter',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type User_Groups_Var_Pop_Fields = {
  __typename?: 'user_groups_var_pop_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type User_Groups_Var_Samp_Fields = {
  __typename?: 'user_groups_var_samp_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type User_Groups_Variance_Fields = {
  __typename?: 'user_groups_variance_fields';
  created_by_user_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
};

/** Store various tokens for user which we can invalidate by deleting them */
export type User_Tokens = {
  __typename?: 'user_tokens';
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  token: Scalars['String'];
  type: Scalars['String'];
  user_id: Scalars['Int'];
};

/** aggregated selection of "user_tokens" */
export type User_Tokens_Aggregate = {
  __typename?: 'user_tokens_aggregate';
  aggregate: Maybe<User_Tokens_Aggregate_Fields>;
  nodes: Array<User_Tokens>;
};

/** aggregate fields of "user_tokens" */
export type User_Tokens_Aggregate_Fields = {
  __typename?: 'user_tokens_aggregate_fields';
  avg: Maybe<User_Tokens_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<User_Tokens_Max_Fields>;
  min: Maybe<User_Tokens_Min_Fields>;
  stddev: Maybe<User_Tokens_Stddev_Fields>;
  stddev_pop: Maybe<User_Tokens_Stddev_Pop_Fields>;
  stddev_samp: Maybe<User_Tokens_Stddev_Samp_Fields>;
  sum: Maybe<User_Tokens_Sum_Fields>;
  var_pop: Maybe<User_Tokens_Var_Pop_Fields>;
  var_samp: Maybe<User_Tokens_Var_Samp_Fields>;
  variance: Maybe<User_Tokens_Variance_Fields>;
};


/** aggregate fields of "user_tokens" */
export type User_Tokens_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<User_Tokens_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type User_Tokens_Avg_Fields = {
  __typename?: 'user_tokens_avg_fields';
  id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "user_tokens". All fields are combined with a logical 'AND'. */
export type User_Tokens_Bool_Exp = {
  _and: InputMaybe<Array<User_Tokens_Bool_Exp>>;
  _not: InputMaybe<User_Tokens_Bool_Exp>;
  _or: InputMaybe<Array<User_Tokens_Bool_Exp>>;
  created_at: InputMaybe<Timestamptz_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  token: InputMaybe<String_Comparison_Exp>;
  type: InputMaybe<String_Comparison_Exp>;
  user_id: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_tokens" */
export enum User_Tokens_Constraint {
  /** unique or primary key constraint */
  UserTokensPkey = 'user_tokens_pkey'
}

/** input type for incrementing numeric columns in table "user_tokens" */
export type User_Tokens_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_tokens" */
export type User_Tokens_Insert_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  id: InputMaybe<Scalars['Int']>;
  token: InputMaybe<Scalars['String']>;
  type: InputMaybe<Scalars['String']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type User_Tokens_Max_Fields = {
  __typename?: 'user_tokens_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['Int']>;
  token: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type User_Tokens_Min_Fields = {
  __typename?: 'user_tokens_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['Int']>;
  token: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "user_tokens" */
export type User_Tokens_Mutation_Response = {
  __typename?: 'user_tokens_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Tokens>;
};

/** on_conflict condition type for table "user_tokens" */
export type User_Tokens_On_Conflict = {
  constraint: User_Tokens_Constraint;
  update_columns: Array<User_Tokens_Update_Column>;
  where: InputMaybe<User_Tokens_Bool_Exp>;
};

/** Ordering options when selecting data from "user_tokens". */
export type User_Tokens_Order_By = {
  created_at: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  token: InputMaybe<Order_By>;
  type: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_tokens */
export type User_Tokens_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "user_tokens" */
export enum User_Tokens_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Token = 'token',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "user_tokens" */
export type User_Tokens_Set_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  id: InputMaybe<Scalars['Int']>;
  token: InputMaybe<Scalars['String']>;
  type: InputMaybe<Scalars['String']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type User_Tokens_Stddev_Fields = {
  __typename?: 'user_tokens_stddev_fields';
  id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type User_Tokens_Stddev_Pop_Fields = {
  __typename?: 'user_tokens_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type User_Tokens_Stddev_Samp_Fields = {
  __typename?: 'user_tokens_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type User_Tokens_Sum_Fields = {
  __typename?: 'user_tokens_sum_fields';
  id: Maybe<Scalars['Int']>;
  user_id: Maybe<Scalars['Int']>;
};

/** update columns of table "user_tokens" */
export enum User_Tokens_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Token = 'token',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type User_Tokens_Var_Pop_Fields = {
  __typename?: 'user_tokens_var_pop_fields';
  id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type User_Tokens_Var_Samp_Fields = {
  __typename?: 'user_tokens_var_samp_fields';
  id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type User_Tokens_Variance_Fields = {
  __typename?: 'user_tokens_variance_fields';
  id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  active: Scalars['Boolean'];
  additional_emails: Scalars['jsonb'];
  auth0_linkedin_id: Maybe<Scalars['String']>;
  auth0_user_pass_id: Maybe<Scalars['String']>;
  /** An object relationship */
  billing_org: Maybe<Billing_Org>;
  billing_org_id: Maybe<Scalars['Int']>;
  display_name: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  external_id: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  is_auth0_verified: Maybe<Scalars['Boolean']>;
  /** An array relationship */
  list_members: Array<List_Members>;
  /** An aggregate relationship */
  list_members_aggregate: List_Members_Aggregate;
  /** An array relationship */
  organization_companies: Array<Companies_Edit_Access>;
  /** An aggregate relationship */
  organization_companies_aggregate: Companies_Edit_Access_Aggregate;
  /** An array relationship */
  organization_vc_firms: Array<Vc_Firms_Edit_Access>;
  /** An aggregate relationship */
  organization_vc_firms_aggregate: Vc_Firms_Edit_Access_Aggregate;
  /** An object relationship */
  person: Maybe<People>;
  person_id: Maybe<Scalars['Int']>;
  reference_id: Scalars['String'];
  reference_user_id: Maybe<Scalars['Int']>;
  role: Maybe<Scalars['String']>;
};


/** columns and relationships of "users" */
export type UsersAdditional_EmailsArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "users" */
export type UsersList_MembersArgs = {
  distinct_on: InputMaybe<Array<List_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<List_Members_Order_By>>;
  where: InputMaybe<List_Members_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersList_Members_AggregateArgs = {
  distinct_on: InputMaybe<Array<List_Members_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<List_Members_Order_By>>;
  where: InputMaybe<List_Members_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersOrganization_CompaniesArgs = {
  distinct_on: InputMaybe<Array<Companies_Edit_Access_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Companies_Edit_Access_Order_By>>;
  where: InputMaybe<Companies_Edit_Access_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersOrganization_Companies_AggregateArgs = {
  distinct_on: InputMaybe<Array<Companies_Edit_Access_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Companies_Edit_Access_Order_By>>;
  where: InputMaybe<Companies_Edit_Access_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersOrganization_Vc_FirmsArgs = {
  distinct_on: InputMaybe<Array<Vc_Firms_Edit_Access_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Vc_Firms_Edit_Access_Order_By>>;
  where: InputMaybe<Vc_Firms_Edit_Access_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersOrganization_Vc_Firms_AggregateArgs = {
  distinct_on: InputMaybe<Array<Vc_Firms_Edit_Access_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Vc_Firms_Edit_Access_Order_By>>;
  where: InputMaybe<Vc_Firms_Edit_Access_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  avg: Maybe<Users_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Users_Max_Fields>;
  min: Maybe<Users_Min_Fields>;
  stddev: Maybe<Users_Stddev_Fields>;
  stddev_pop: Maybe<Users_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Users_Stddev_Samp_Fields>;
  sum: Maybe<Users_Sum_Fields>;
  var_pop: Maybe<Users_Var_Pop_Fields>;
  var_samp: Maybe<Users_Var_Samp_Fields>;
  variance: Maybe<Users_Variance_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Users_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Users_Append_Input = {
  additional_emails: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Users_Avg_Fields = {
  __typename?: 'users_avg_fields';
  billing_org_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  reference_user_id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and: InputMaybe<Array<Users_Bool_Exp>>;
  _not: InputMaybe<Users_Bool_Exp>;
  _or: InputMaybe<Array<Users_Bool_Exp>>;
  active: InputMaybe<Boolean_Comparison_Exp>;
  additional_emails: InputMaybe<Jsonb_Comparison_Exp>;
  auth0_linkedin_id: InputMaybe<String_Comparison_Exp>;
  auth0_user_pass_id: InputMaybe<String_Comparison_Exp>;
  billing_org: InputMaybe<Billing_Org_Bool_Exp>;
  billing_org_id: InputMaybe<Int_Comparison_Exp>;
  display_name: InputMaybe<String_Comparison_Exp>;
  email: InputMaybe<String_Comparison_Exp>;
  external_id: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  is_auth0_verified: InputMaybe<Boolean_Comparison_Exp>;
  list_members: InputMaybe<List_Members_Bool_Exp>;
  organization_companies: InputMaybe<Companies_Edit_Access_Bool_Exp>;
  organization_vc_firms: InputMaybe<Vc_Firms_Edit_Access_Bool_Exp>;
  person: InputMaybe<People_Bool_Exp>;
  person_id: InputMaybe<Int_Comparison_Exp>;
  reference_id: InputMaybe<String_Comparison_Exp>;
  reference_user_id: InputMaybe<Int_Comparison_Exp>;
  role: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint */
  UsersPersonIdKey = 'users_person_id_key',
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Users_Delete_At_Path_Input = {
  additional_emails: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Users_Delete_Elem_Input = {
  additional_emails: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Users_Delete_Key_Input = {
  additional_emails: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "users" */
export type Users_Inc_Input = {
  billing_org_id: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['Int']>;
  person_id: InputMaybe<Scalars['Int']>;
  reference_user_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  active: InputMaybe<Scalars['Boolean']>;
  additional_emails: InputMaybe<Scalars['jsonb']>;
  auth0_linkedin_id: InputMaybe<Scalars['String']>;
  auth0_user_pass_id: InputMaybe<Scalars['String']>;
  billing_org: InputMaybe<Billing_Org_Obj_Rel_Insert_Input>;
  billing_org_id: InputMaybe<Scalars['Int']>;
  display_name: InputMaybe<Scalars['String']>;
  email: InputMaybe<Scalars['String']>;
  external_id: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  is_auth0_verified: InputMaybe<Scalars['Boolean']>;
  list_members: InputMaybe<List_Members_Arr_Rel_Insert_Input>;
  organization_companies: InputMaybe<Companies_Edit_Access_Arr_Rel_Insert_Input>;
  organization_vc_firms: InputMaybe<Vc_Firms_Edit_Access_Arr_Rel_Insert_Input>;
  person: InputMaybe<People_Obj_Rel_Insert_Input>;
  person_id: InputMaybe<Scalars['Int']>;
  reference_id: InputMaybe<Scalars['String']>;
  reference_user_id: InputMaybe<Scalars['Int']>;
  role: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  auth0_linkedin_id: Maybe<Scalars['String']>;
  auth0_user_pass_id: Maybe<Scalars['String']>;
  billing_org_id: Maybe<Scalars['Int']>;
  display_name: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  external_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  reference_id: Maybe<Scalars['String']>;
  reference_user_id: Maybe<Scalars['Int']>;
  role: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  auth0_linkedin_id: Maybe<Scalars['String']>;
  auth0_user_pass_id: Maybe<Scalars['String']>;
  billing_org_id: Maybe<Scalars['Int']>;
  display_name: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  external_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  reference_id: Maybe<Scalars['String']>;
  reference_user_id: Maybe<Scalars['Int']>;
  role: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  active: InputMaybe<Order_By>;
  additional_emails: InputMaybe<Order_By>;
  auth0_linkedin_id: InputMaybe<Order_By>;
  auth0_user_pass_id: InputMaybe<Order_By>;
  billing_org: InputMaybe<Billing_Org_Order_By>;
  billing_org_id: InputMaybe<Order_By>;
  display_name: InputMaybe<Order_By>;
  email: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  is_auth0_verified: InputMaybe<Order_By>;
  list_members_aggregate: InputMaybe<List_Members_Aggregate_Order_By>;
  organization_companies_aggregate: InputMaybe<Companies_Edit_Access_Aggregate_Order_By>;
  organization_vc_firms_aggregate: InputMaybe<Vc_Firms_Edit_Access_Aggregate_Order_By>;
  person: InputMaybe<People_Order_By>;
  person_id: InputMaybe<Order_By>;
  reference_id: InputMaybe<Order_By>;
  reference_user_id: InputMaybe<Order_By>;
  role: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Users_Prepend_Input = {
  additional_emails: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  AdditionalEmails = 'additional_emails',
  /** column name */
  Auth0LinkedinId = 'auth0_linkedin_id',
  /** column name */
  Auth0UserPassId = 'auth0_user_pass_id',
  /** column name */
  BillingOrgId = 'billing_org_id',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Email = 'email',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  IsAuth0Verified = 'is_auth0_verified',
  /** column name */
  PersonId = 'person_id',
  /** column name */
  ReferenceId = 'reference_id',
  /** column name */
  ReferenceUserId = 'reference_user_id',
  /** column name */
  Role = 'role'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  active: InputMaybe<Scalars['Boolean']>;
  additional_emails: InputMaybe<Scalars['jsonb']>;
  auth0_linkedin_id: InputMaybe<Scalars['String']>;
  auth0_user_pass_id: InputMaybe<Scalars['String']>;
  billing_org_id: InputMaybe<Scalars['Int']>;
  display_name: InputMaybe<Scalars['String']>;
  email: InputMaybe<Scalars['String']>;
  external_id: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  is_auth0_verified: InputMaybe<Scalars['Boolean']>;
  person_id: InputMaybe<Scalars['Int']>;
  reference_id: InputMaybe<Scalars['String']>;
  reference_user_id: InputMaybe<Scalars['Int']>;
  role: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: 'users_stddev_fields';
  billing_org_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  reference_user_id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: 'users_stddev_pop_fields';
  billing_org_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  reference_user_id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: 'users_stddev_samp_fields';
  billing_org_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  reference_user_id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: 'users_sum_fields';
  billing_org_id: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['Int']>;
  person_id: Maybe<Scalars['Int']>;
  reference_user_id: Maybe<Scalars['Int']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Active = 'active',
  /** column name */
  AdditionalEmails = 'additional_emails',
  /** column name */
  Auth0LinkedinId = 'auth0_linkedin_id',
  /** column name */
  Auth0UserPassId = 'auth0_user_pass_id',
  /** column name */
  BillingOrgId = 'billing_org_id',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Email = 'email',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Id = 'id',
  /** column name */
  IsAuth0Verified = 'is_auth0_verified',
  /** column name */
  PersonId = 'person_id',
  /** column name */
  ReferenceId = 'reference_id',
  /** column name */
  ReferenceUserId = 'reference_user_id',
  /** column name */
  Role = 'role'
}

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: 'users_var_pop_fields';
  billing_org_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  reference_user_id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: 'users_var_samp_fields';
  billing_org_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  reference_user_id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: 'users_variance_fields';
  billing_org_id: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  person_id: Maybe<Scalars['Float']>;
  reference_user_id: Maybe<Scalars['Float']>;
};

/** columns and relationships of "vc_firms" */
export type Vc_Firms = {
  __typename?: 'vc_firms';
  created_at: Maybe<Scalars['timestamptz']>;
  external_id: Maybe<Scalars['String']>;
  /** An array relationship */
  follows: Array<Follows_Vc_Firms>;
  /** An aggregate relationship */
  follows_aggregate: Follows_Vc_Firms_Aggregate;
  /** An array relationship */
  from_links: Array<Resource_Links>;
  /** An aggregate relationship */
  from_links_aggregate: Resource_Links_Aggregate;
  geopoint: Maybe<Scalars['geography']>;
  id: Scalars['Int'];
  investment_amount_total: Maybe<Scalars['bigint']>;
  /** An array relationship */
  investments: Array<Investments>;
  /** An aggregate relationship */
  investments_aggregate: Investments_Aggregate;
  /** An array relationship */
  investors: Array<Investors>;
  /** An aggregate relationship */
  investors_aggregate: Investors_Aggregate;
  latest_investment: Maybe<Scalars['String']>;
  library: Maybe<Scalars['jsonb']>;
  linkedin: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  location_json: Maybe<Scalars['jsonb']>;
  logo: Maybe<Scalars['jsonb']>;
  name: Maybe<Scalars['String']>;
  /** An array relationship */
  news_links: Array<News_Organizations>;
  /** An aggregate relationship */
  news_links_aggregate: News_Organizations_Aggregate;
  num_of_exits: Maybe<Scalars['Int']>;
  num_of_investments: Maybe<Scalars['Int']>;
  overview: Maybe<Scalars['String']>;
  sentiment: Maybe<Scalars['jsonb']>;
  slug: Scalars['String'];
  status: Scalars['String'];
  status_tags: Maybe<Scalars['jsonb']>;
  tags: Maybe<Scalars['jsonb']>;
  team_size: Maybe<Scalars['Int']>;
  /** An array relationship */
  to_links: Array<Resource_Links>;
  /** An aggregate relationship */
  to_links_aggregate: Resource_Links_Aggregate;
  twitter: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  website: Maybe<Scalars['String']>;
  year_founded: Maybe<Scalars['String']>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsFollowsArgs = {
  distinct_on: InputMaybe<Array<Follows_Vc_Firms_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Vc_Firms_Order_By>>;
  where: InputMaybe<Follows_Vc_Firms_Bool_Exp>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsFollows_AggregateArgs = {
  distinct_on: InputMaybe<Array<Follows_Vc_Firms_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Follows_Vc_Firms_Order_By>>;
  where: InputMaybe<Follows_Vc_Firms_Bool_Exp>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsFrom_LinksArgs = {
  distinct_on: InputMaybe<Array<Resource_Links_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Resource_Links_Order_By>>;
  where: InputMaybe<Resource_Links_Bool_Exp>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsFrom_Links_AggregateArgs = {
  distinct_on: InputMaybe<Array<Resource_Links_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Resource_Links_Order_By>>;
  where: InputMaybe<Resource_Links_Bool_Exp>;
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
export type Vc_FirmsLibraryArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsLocation_JsonArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsLogoArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsNews_LinksArgs = {
  distinct_on: InputMaybe<Array<News_Organizations_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<News_Organizations_Order_By>>;
  where: InputMaybe<News_Organizations_Bool_Exp>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsNews_Links_AggregateArgs = {
  distinct_on: InputMaybe<Array<News_Organizations_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<News_Organizations_Order_By>>;
  where: InputMaybe<News_Organizations_Bool_Exp>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsSentimentArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsStatus_TagsArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsTagsArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsTo_LinksArgs = {
  distinct_on: InputMaybe<Array<Resource_Links_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Resource_Links_Order_By>>;
  where: InputMaybe<Resource_Links_Bool_Exp>;
};


/** columns and relationships of "vc_firms" */
export type Vc_FirmsTo_Links_AggregateArgs = {
  distinct_on: InputMaybe<Array<Resource_Links_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Resource_Links_Order_By>>;
  where: InputMaybe<Resource_Links_Bool_Exp>;
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
  library: InputMaybe<Scalars['jsonb']>;
  location_json: InputMaybe<Scalars['jsonb']>;
  logo: InputMaybe<Scalars['jsonb']>;
  sentiment: InputMaybe<Scalars['jsonb']>;
  status_tags: InputMaybe<Scalars['jsonb']>;
  tags: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Vc_Firms_Avg_Fields = {
  __typename?: 'vc_firms_avg_fields';
  id: Maybe<Scalars['Float']>;
  investment_amount_total: Maybe<Scalars['Float']>;
  num_of_exits: Maybe<Scalars['Float']>;
  num_of_investments: Maybe<Scalars['Float']>;
  team_size: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "vc_firms". All fields are combined with a logical 'AND'. */
export type Vc_Firms_Bool_Exp = {
  _and: InputMaybe<Array<Vc_Firms_Bool_Exp>>;
  _not: InputMaybe<Vc_Firms_Bool_Exp>;
  _or: InputMaybe<Array<Vc_Firms_Bool_Exp>>;
  created_at: InputMaybe<Timestamptz_Comparison_Exp>;
  external_id: InputMaybe<String_Comparison_Exp>;
  follows: InputMaybe<Follows_Vc_Firms_Bool_Exp>;
  from_links: InputMaybe<Resource_Links_Bool_Exp>;
  geopoint: InputMaybe<Geography_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  investment_amount_total: InputMaybe<Bigint_Comparison_Exp>;
  investments: InputMaybe<Investments_Bool_Exp>;
  investors: InputMaybe<Investors_Bool_Exp>;
  latest_investment: InputMaybe<String_Comparison_Exp>;
  library: InputMaybe<Jsonb_Comparison_Exp>;
  linkedin: InputMaybe<String_Comparison_Exp>;
  location: InputMaybe<String_Comparison_Exp>;
  location_json: InputMaybe<Jsonb_Comparison_Exp>;
  logo: InputMaybe<Jsonb_Comparison_Exp>;
  name: InputMaybe<String_Comparison_Exp>;
  news_links: InputMaybe<News_Organizations_Bool_Exp>;
  num_of_exits: InputMaybe<Int_Comparison_Exp>;
  num_of_investments: InputMaybe<Int_Comparison_Exp>;
  overview: InputMaybe<String_Comparison_Exp>;
  sentiment: InputMaybe<Jsonb_Comparison_Exp>;
  slug: InputMaybe<String_Comparison_Exp>;
  status: InputMaybe<String_Comparison_Exp>;
  status_tags: InputMaybe<Jsonb_Comparison_Exp>;
  tags: InputMaybe<Jsonb_Comparison_Exp>;
  team_size: InputMaybe<Int_Comparison_Exp>;
  to_links: InputMaybe<Resource_Links_Bool_Exp>;
  twitter: InputMaybe<String_Comparison_Exp>;
  updated_at: InputMaybe<Timestamptz_Comparison_Exp>;
  website: InputMaybe<String_Comparison_Exp>;
  year_founded: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "vc_firms" */
export enum Vc_Firms_Constraint {
  /** unique or primary key constraint */
  VcFirmsExternalIdKey = 'vc_firms_external_id_key',
  /** unique or primary key constraint */
  VcFirmsPkey = 'vc_firms_pkey',
  /** unique or primary key constraint */
  VcFirmsSlugIdx = 'vc_firms_slug_idx',
  /** unique or primary key constraint */
  VcFirmsSlugKey = 'vc_firms_slug_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Vc_Firms_Delete_At_Path_Input = {
  library: InputMaybe<Array<Scalars['String']>>;
  location_json: InputMaybe<Array<Scalars['String']>>;
  logo: InputMaybe<Array<Scalars['String']>>;
  sentiment: InputMaybe<Array<Scalars['String']>>;
  status_tags: InputMaybe<Array<Scalars['String']>>;
  tags: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Vc_Firms_Delete_Elem_Input = {
  library: InputMaybe<Scalars['Int']>;
  location_json: InputMaybe<Scalars['Int']>;
  logo: InputMaybe<Scalars['Int']>;
  sentiment: InputMaybe<Scalars['Int']>;
  status_tags: InputMaybe<Scalars['Int']>;
  tags: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Vc_Firms_Delete_Key_Input = {
  library: InputMaybe<Scalars['String']>;
  location_json: InputMaybe<Scalars['String']>;
  logo: InputMaybe<Scalars['String']>;
  sentiment: InputMaybe<Scalars['String']>;
  status_tags: InputMaybe<Scalars['String']>;
  tags: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access = {
  __typename?: 'vc_firms_edit_access';
  id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['Int']>;
  /** An object relationship */
  vc_firm: Maybe<Vc_Firms>;
};

/** aggregated selection of "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Aggregate = {
  __typename?: 'vc_firms_edit_access_aggregate';
  aggregate: Maybe<Vc_Firms_Edit_Access_Aggregate_Fields>;
  nodes: Array<Vc_Firms_Edit_Access>;
};

/** aggregate fields of "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Aggregate_Fields = {
  __typename?: 'vc_firms_edit_access_aggregate_fields';
  avg: Maybe<Vc_Firms_Edit_Access_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Vc_Firms_Edit_Access_Max_Fields>;
  min: Maybe<Vc_Firms_Edit_Access_Min_Fields>;
  stddev: Maybe<Vc_Firms_Edit_Access_Stddev_Fields>;
  stddev_pop: Maybe<Vc_Firms_Edit_Access_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Vc_Firms_Edit_Access_Stddev_Samp_Fields>;
  sum: Maybe<Vc_Firms_Edit_Access_Sum_Fields>;
  var_pop: Maybe<Vc_Firms_Edit_Access_Var_Pop_Fields>;
  var_samp: Maybe<Vc_Firms_Edit_Access_Var_Samp_Fields>;
  variance: Maybe<Vc_Firms_Edit_Access_Variance_Fields>;
};


/** aggregate fields of "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Vc_Firms_Edit_Access_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Aggregate_Order_By = {
  avg: InputMaybe<Vc_Firms_Edit_Access_Avg_Order_By>;
  count: InputMaybe<Order_By>;
  max: InputMaybe<Vc_Firms_Edit_Access_Max_Order_By>;
  min: InputMaybe<Vc_Firms_Edit_Access_Min_Order_By>;
  stddev: InputMaybe<Vc_Firms_Edit_Access_Stddev_Order_By>;
  stddev_pop: InputMaybe<Vc_Firms_Edit_Access_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Vc_Firms_Edit_Access_Stddev_Samp_Order_By>;
  sum: InputMaybe<Vc_Firms_Edit_Access_Sum_Order_By>;
  var_pop: InputMaybe<Vc_Firms_Edit_Access_Var_Pop_Order_By>;
  var_samp: InputMaybe<Vc_Firms_Edit_Access_Var_Samp_Order_By>;
  variance: InputMaybe<Vc_Firms_Edit_Access_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Arr_Rel_Insert_Input = {
  data: Array<Vc_Firms_Edit_Access_Insert_Input>;
};

/** aggregate avg on columns */
export type Vc_Firms_Edit_Access_Avg_Fields = {
  __typename?: 'vc_firms_edit_access_avg_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Avg_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "vc_firms_edit_access". All fields are combined with a logical 'AND'. */
export type Vc_Firms_Edit_Access_Bool_Exp = {
  _and: InputMaybe<Array<Vc_Firms_Edit_Access_Bool_Exp>>;
  _not: InputMaybe<Vc_Firms_Edit_Access_Bool_Exp>;
  _or: InputMaybe<Array<Vc_Firms_Edit_Access_Bool_Exp>>;
  id: InputMaybe<Int_Comparison_Exp>;
  resource_id: InputMaybe<Int_Comparison_Exp>;
  resource_type: InputMaybe<String_Comparison_Exp>;
  user_id: InputMaybe<Int_Comparison_Exp>;
  vc_firm: InputMaybe<Vc_Firms_Bool_Exp>;
};

/** input type for incrementing numeric columns in table "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Insert_Input = {
  id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  resource_type: InputMaybe<Scalars['String']>;
  user_id: InputMaybe<Scalars['Int']>;
  vc_firm: InputMaybe<Vc_Firms_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Vc_Firms_Edit_Access_Max_Fields = {
  __typename?: 'vc_firms_edit_access_max_fields';
  id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Max_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  resource_type: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Vc_Firms_Edit_Access_Min_Fields = {
  __typename?: 'vc_firms_edit_access_min_fields';
  id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  resource_type: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Min_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  resource_type: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** response of any mutation on the table "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Mutation_Response = {
  __typename?: 'vc_firms_edit_access_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Vc_Firms_Edit_Access>;
};

/** Ordering options when selecting data from "vc_firms_edit_access". */
export type Vc_Firms_Edit_Access_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  resource_type: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
  vc_firm: InputMaybe<Vc_Firms_Order_By>;
};

/** select columns of table "vc_firms_edit_access" */
export enum Vc_Firms_Edit_Access_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ResourceId = 'resource_id',
  /** column name */
  ResourceType = 'resource_type',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Set_Input = {
  id: InputMaybe<Scalars['Int']>;
  resource_id: InputMaybe<Scalars['Int']>;
  resource_type: InputMaybe<Scalars['String']>;
  user_id: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Vc_Firms_Edit_Access_Stddev_Fields = {
  __typename?: 'vc_firms_edit_access_stddev_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Stddev_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Vc_Firms_Edit_Access_Stddev_Pop_Fields = {
  __typename?: 'vc_firms_edit_access_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Stddev_Pop_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Vc_Firms_Edit_Access_Stddev_Samp_Fields = {
  __typename?: 'vc_firms_edit_access_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Stddev_Samp_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Vc_Firms_Edit_Access_Sum_Fields = {
  __typename?: 'vc_firms_edit_access_sum_fields';
  id: Maybe<Scalars['Int']>;
  resource_id: Maybe<Scalars['Int']>;
  user_id: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Sum_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Vc_Firms_Edit_Access_Var_Pop_Fields = {
  __typename?: 'vc_firms_edit_access_var_pop_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Var_Pop_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Vc_Firms_Edit_Access_Var_Samp_Fields = {
  __typename?: 'vc_firms_edit_access_var_samp_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Var_Samp_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Vc_Firms_Edit_Access_Variance_Fields = {
  __typename?: 'vc_firms_edit_access_variance_fields';
  id: Maybe<Scalars['Float']>;
  resource_id: Maybe<Scalars['Float']>;
  user_id: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "vc_firms_edit_access" */
export type Vc_Firms_Edit_Access_Variance_Order_By = {
  id: InputMaybe<Order_By>;
  resource_id: InputMaybe<Order_By>;
  user_id: InputMaybe<Order_By>;
};

/** input type for incrementing numeric columns in table "vc_firms" */
export type Vc_Firms_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
  investment_amount_total: InputMaybe<Scalars['bigint']>;
  num_of_exits: InputMaybe<Scalars['Int']>;
  num_of_investments: InputMaybe<Scalars['Int']>;
  team_size: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "vc_firms" */
export type Vc_Firms_Insert_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  external_id: InputMaybe<Scalars['String']>;
  follows: InputMaybe<Follows_Vc_Firms_Arr_Rel_Insert_Input>;
  from_links: InputMaybe<Resource_Links_Arr_Rel_Insert_Input>;
  geopoint: InputMaybe<Scalars['geography']>;
  id: InputMaybe<Scalars['Int']>;
  investment_amount_total: InputMaybe<Scalars['bigint']>;
  investments: InputMaybe<Investments_Arr_Rel_Insert_Input>;
  investors: InputMaybe<Investors_Arr_Rel_Insert_Input>;
  latest_investment: InputMaybe<Scalars['String']>;
  library: InputMaybe<Scalars['jsonb']>;
  linkedin: InputMaybe<Scalars['String']>;
  location: InputMaybe<Scalars['String']>;
  location_json: InputMaybe<Scalars['jsonb']>;
  logo: InputMaybe<Scalars['jsonb']>;
  name: InputMaybe<Scalars['String']>;
  news_links: InputMaybe<News_Organizations_Arr_Rel_Insert_Input>;
  num_of_exits: InputMaybe<Scalars['Int']>;
  num_of_investments: InputMaybe<Scalars['Int']>;
  overview: InputMaybe<Scalars['String']>;
  sentiment: InputMaybe<Scalars['jsonb']>;
  slug: InputMaybe<Scalars['String']>;
  status: InputMaybe<Scalars['String']>;
  status_tags: InputMaybe<Scalars['jsonb']>;
  tags: InputMaybe<Scalars['jsonb']>;
  team_size: InputMaybe<Scalars['Int']>;
  to_links: InputMaybe<Resource_Links_Arr_Rel_Insert_Input>;
  twitter: InputMaybe<Scalars['String']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  website: InputMaybe<Scalars['String']>;
  year_founded: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Vc_Firms_Max_Fields = {
  __typename?: 'vc_firms_max_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  external_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  investment_amount_total: Maybe<Scalars['bigint']>;
  latest_investment: Maybe<Scalars['String']>;
  linkedin: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  num_of_exits: Maybe<Scalars['Int']>;
  num_of_investments: Maybe<Scalars['Int']>;
  overview: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  team_size: Maybe<Scalars['Int']>;
  twitter: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  website: Maybe<Scalars['String']>;
  year_founded: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Vc_Firms_Min_Fields = {
  __typename?: 'vc_firms_min_fields';
  created_at: Maybe<Scalars['timestamptz']>;
  external_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  investment_amount_total: Maybe<Scalars['bigint']>;
  latest_investment: Maybe<Scalars['String']>;
  linkedin: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  num_of_exits: Maybe<Scalars['Int']>;
  num_of_investments: Maybe<Scalars['Int']>;
  overview: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  status: Maybe<Scalars['String']>;
  team_size: Maybe<Scalars['Int']>;
  twitter: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamptz']>;
  website: Maybe<Scalars['String']>;
  year_founded: Maybe<Scalars['String']>;
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
  created_at: InputMaybe<Order_By>;
  external_id: InputMaybe<Order_By>;
  follows_aggregate: InputMaybe<Follows_Vc_Firms_Aggregate_Order_By>;
  from_links_aggregate: InputMaybe<Resource_Links_Aggregate_Order_By>;
  geopoint: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  investment_amount_total: InputMaybe<Order_By>;
  investments_aggregate: InputMaybe<Investments_Aggregate_Order_By>;
  investors_aggregate: InputMaybe<Investors_Aggregate_Order_By>;
  latest_investment: InputMaybe<Order_By>;
  library: InputMaybe<Order_By>;
  linkedin: InputMaybe<Order_By>;
  location: InputMaybe<Order_By>;
  location_json: InputMaybe<Order_By>;
  logo: InputMaybe<Order_By>;
  name: InputMaybe<Order_By>;
  news_links_aggregate: InputMaybe<News_Organizations_Aggregate_Order_By>;
  num_of_exits: InputMaybe<Order_By>;
  num_of_investments: InputMaybe<Order_By>;
  overview: InputMaybe<Order_By>;
  sentiment: InputMaybe<Order_By>;
  slug: InputMaybe<Order_By>;
  status: InputMaybe<Order_By>;
  status_tags: InputMaybe<Order_By>;
  tags: InputMaybe<Order_By>;
  team_size: InputMaybe<Order_By>;
  to_links_aggregate: InputMaybe<Resource_Links_Aggregate_Order_By>;
  twitter: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
  website: InputMaybe<Order_By>;
  year_founded: InputMaybe<Order_By>;
};

/** primary key columns input for table: vc_firms */
export type Vc_Firms_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Vc_Firms_Prepend_Input = {
  library: InputMaybe<Scalars['jsonb']>;
  location_json: InputMaybe<Scalars['jsonb']>;
  logo: InputMaybe<Scalars['jsonb']>;
  sentiment: InputMaybe<Scalars['jsonb']>;
  status_tags: InputMaybe<Scalars['jsonb']>;
  tags: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "vc_firms" */
export enum Vc_Firms_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Geopoint = 'geopoint',
  /** column name */
  Id = 'id',
  /** column name */
  InvestmentAmountTotal = 'investment_amount_total',
  /** column name */
  LatestInvestment = 'latest_investment',
  /** column name */
  Library = 'library',
  /** column name */
  Linkedin = 'linkedin',
  /** column name */
  Location = 'location',
  /** column name */
  LocationJson = 'location_json',
  /** column name */
  Logo = 'logo',
  /** column name */
  Name = 'name',
  /** column name */
  NumOfExits = 'num_of_exits',
  /** column name */
  NumOfInvestments = 'num_of_investments',
  /** column name */
  Overview = 'overview',
  /** column name */
  Sentiment = 'sentiment',
  /** column name */
  Slug = 'slug',
  /** column name */
  Status = 'status',
  /** column name */
  StatusTags = 'status_tags',
  /** column name */
  Tags = 'tags',
  /** column name */
  TeamSize = 'team_size',
  /** column name */
  Twitter = 'twitter',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Website = 'website',
  /** column name */
  YearFounded = 'year_founded'
}

/** input type for updating data in table "vc_firms" */
export type Vc_Firms_Set_Input = {
  created_at: InputMaybe<Scalars['timestamptz']>;
  external_id: InputMaybe<Scalars['String']>;
  geopoint: InputMaybe<Scalars['geography']>;
  id: InputMaybe<Scalars['Int']>;
  investment_amount_total: InputMaybe<Scalars['bigint']>;
  latest_investment: InputMaybe<Scalars['String']>;
  library: InputMaybe<Scalars['jsonb']>;
  linkedin: InputMaybe<Scalars['String']>;
  location: InputMaybe<Scalars['String']>;
  location_json: InputMaybe<Scalars['jsonb']>;
  logo: InputMaybe<Scalars['jsonb']>;
  name: InputMaybe<Scalars['String']>;
  num_of_exits: InputMaybe<Scalars['Int']>;
  num_of_investments: InputMaybe<Scalars['Int']>;
  overview: InputMaybe<Scalars['String']>;
  sentiment: InputMaybe<Scalars['jsonb']>;
  slug: InputMaybe<Scalars['String']>;
  status: InputMaybe<Scalars['String']>;
  status_tags: InputMaybe<Scalars['jsonb']>;
  tags: InputMaybe<Scalars['jsonb']>;
  team_size: InputMaybe<Scalars['Int']>;
  twitter: InputMaybe<Scalars['String']>;
  updated_at: InputMaybe<Scalars['timestamptz']>;
  website: InputMaybe<Scalars['String']>;
  year_founded: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Vc_Firms_Stddev_Fields = {
  __typename?: 'vc_firms_stddev_fields';
  id: Maybe<Scalars['Float']>;
  investment_amount_total: Maybe<Scalars['Float']>;
  num_of_exits: Maybe<Scalars['Float']>;
  num_of_investments: Maybe<Scalars['Float']>;
  team_size: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Vc_Firms_Stddev_Pop_Fields = {
  __typename?: 'vc_firms_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
  investment_amount_total: Maybe<Scalars['Float']>;
  num_of_exits: Maybe<Scalars['Float']>;
  num_of_investments: Maybe<Scalars['Float']>;
  team_size: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Vc_Firms_Stddev_Samp_Fields = {
  __typename?: 'vc_firms_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
  investment_amount_total: Maybe<Scalars['Float']>;
  num_of_exits: Maybe<Scalars['Float']>;
  num_of_investments: Maybe<Scalars['Float']>;
  team_size: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Vc_Firms_Sum_Fields = {
  __typename?: 'vc_firms_sum_fields';
  id: Maybe<Scalars['Int']>;
  investment_amount_total: Maybe<Scalars['bigint']>;
  num_of_exits: Maybe<Scalars['Int']>;
  num_of_investments: Maybe<Scalars['Int']>;
  team_size: Maybe<Scalars['Int']>;
};

/** update columns of table "vc_firms" */
export enum Vc_Firms_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExternalId = 'external_id',
  /** column name */
  Geopoint = 'geopoint',
  /** column name */
  Id = 'id',
  /** column name */
  InvestmentAmountTotal = 'investment_amount_total',
  /** column name */
  LatestInvestment = 'latest_investment',
  /** column name */
  Library = 'library',
  /** column name */
  Linkedin = 'linkedin',
  /** column name */
  Location = 'location',
  /** column name */
  LocationJson = 'location_json',
  /** column name */
  Logo = 'logo',
  /** column name */
  Name = 'name',
  /** column name */
  NumOfExits = 'num_of_exits',
  /** column name */
  NumOfInvestments = 'num_of_investments',
  /** column name */
  Overview = 'overview',
  /** column name */
  Sentiment = 'sentiment',
  /** column name */
  Slug = 'slug',
  /** column name */
  Status = 'status',
  /** column name */
  StatusTags = 'status_tags',
  /** column name */
  Tags = 'tags',
  /** column name */
  TeamSize = 'team_size',
  /** column name */
  Twitter = 'twitter',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Website = 'website',
  /** column name */
  YearFounded = 'year_founded'
}

/** aggregate var_pop on columns */
export type Vc_Firms_Var_Pop_Fields = {
  __typename?: 'vc_firms_var_pop_fields';
  id: Maybe<Scalars['Float']>;
  investment_amount_total: Maybe<Scalars['Float']>;
  num_of_exits: Maybe<Scalars['Float']>;
  num_of_investments: Maybe<Scalars['Float']>;
  team_size: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Vc_Firms_Var_Samp_Fields = {
  __typename?: 'vc_firms_var_samp_fields';
  id: Maybe<Scalars['Float']>;
  investment_amount_total: Maybe<Scalars['Float']>;
  num_of_exits: Maybe<Scalars['Float']>;
  num_of_investments: Maybe<Scalars['Float']>;
  team_size: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Vc_Firms_Variance_Fields = {
  __typename?: 'vc_firms_variance_fields';
  id: Maybe<Scalars['Float']>;
  investment_amount_total: Maybe<Scalars['Float']>;
  num_of_exits: Maybe<Scalars['Float']>;
  num_of_investments: Maybe<Scalars['Float']>;
  team_size: Maybe<Scalars['Float']>;
};

/** List of waitlist emailIds */
export type Waitlist_Emails = {
  __typename?: 'waitlist_emails';
  created_at: Scalars['date'];
  email: Scalars['String'];
  id: Scalars['Int'];
  updated_at: Scalars['date'];
};

/** aggregated selection of "waitlist_emails" */
export type Waitlist_Emails_Aggregate = {
  __typename?: 'waitlist_emails_aggregate';
  aggregate: Maybe<Waitlist_Emails_Aggregate_Fields>;
  nodes: Array<Waitlist_Emails>;
};

/** aggregate fields of "waitlist_emails" */
export type Waitlist_Emails_Aggregate_Fields = {
  __typename?: 'waitlist_emails_aggregate_fields';
  avg: Maybe<Waitlist_Emails_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Waitlist_Emails_Max_Fields>;
  min: Maybe<Waitlist_Emails_Min_Fields>;
  stddev: Maybe<Waitlist_Emails_Stddev_Fields>;
  stddev_pop: Maybe<Waitlist_Emails_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Waitlist_Emails_Stddev_Samp_Fields>;
  sum: Maybe<Waitlist_Emails_Sum_Fields>;
  var_pop: Maybe<Waitlist_Emails_Var_Pop_Fields>;
  var_samp: Maybe<Waitlist_Emails_Var_Samp_Fields>;
  variance: Maybe<Waitlist_Emails_Variance_Fields>;
};


/** aggregate fields of "waitlist_emails" */
export type Waitlist_Emails_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Waitlist_Emails_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Waitlist_Emails_Avg_Fields = {
  __typename?: 'waitlist_emails_avg_fields';
  id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "waitlist_emails". All fields are combined with a logical 'AND'. */
export type Waitlist_Emails_Bool_Exp = {
  _and: InputMaybe<Array<Waitlist_Emails_Bool_Exp>>;
  _not: InputMaybe<Waitlist_Emails_Bool_Exp>;
  _or: InputMaybe<Array<Waitlist_Emails_Bool_Exp>>;
  created_at: InputMaybe<Date_Comparison_Exp>;
  email: InputMaybe<String_Comparison_Exp>;
  id: InputMaybe<Int_Comparison_Exp>;
  updated_at: InputMaybe<Date_Comparison_Exp>;
};

/** unique or primary key constraints on table "waitlist_emails" */
export enum Waitlist_Emails_Constraint {
  /** unique or primary key constraint */
  WaitlistEmailsEmailKey = 'waitlist_emails_email_key',
  /** unique or primary key constraint */
  WaitlistEmailsPkey = 'waitlist_emails_pkey'
}

/** input type for incrementing numeric columns in table "waitlist_emails" */
export type Waitlist_Emails_Inc_Input = {
  id: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "waitlist_emails" */
export type Waitlist_Emails_Insert_Input = {
  created_at: InputMaybe<Scalars['date']>;
  email: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  updated_at: InputMaybe<Scalars['date']>;
};

/** aggregate max on columns */
export type Waitlist_Emails_Max_Fields = {
  __typename?: 'waitlist_emails_max_fields';
  created_at: Maybe<Scalars['date']>;
  email: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  updated_at: Maybe<Scalars['date']>;
};

/** aggregate min on columns */
export type Waitlist_Emails_Min_Fields = {
  __typename?: 'waitlist_emails_min_fields';
  created_at: Maybe<Scalars['date']>;
  email: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  updated_at: Maybe<Scalars['date']>;
};

/** response of any mutation on the table "waitlist_emails" */
export type Waitlist_Emails_Mutation_Response = {
  __typename?: 'waitlist_emails_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Waitlist_Emails>;
};

/** on_conflict condition type for table "waitlist_emails" */
export type Waitlist_Emails_On_Conflict = {
  constraint: Waitlist_Emails_Constraint;
  update_columns: Array<Waitlist_Emails_Update_Column>;
  where: InputMaybe<Waitlist_Emails_Bool_Exp>;
};

/** Ordering options when selecting data from "waitlist_emails". */
export type Waitlist_Emails_Order_By = {
  created_at: InputMaybe<Order_By>;
  email: InputMaybe<Order_By>;
  id: InputMaybe<Order_By>;
  updated_at: InputMaybe<Order_By>;
};

/** primary key columns input for table: waitlist_emails */
export type Waitlist_Emails_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "waitlist_emails" */
export enum Waitlist_Emails_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "waitlist_emails" */
export type Waitlist_Emails_Set_Input = {
  created_at: InputMaybe<Scalars['date']>;
  email: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['Int']>;
  updated_at: InputMaybe<Scalars['date']>;
};

/** aggregate stddev on columns */
export type Waitlist_Emails_Stddev_Fields = {
  __typename?: 'waitlist_emails_stddev_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Waitlist_Emails_Stddev_Pop_Fields = {
  __typename?: 'waitlist_emails_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Waitlist_Emails_Stddev_Samp_Fields = {
  __typename?: 'waitlist_emails_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Waitlist_Emails_Sum_Fields = {
  __typename?: 'waitlist_emails_sum_fields';
  id: Maybe<Scalars['Int']>;
};

/** update columns of table "waitlist_emails" */
export enum Waitlist_Emails_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Waitlist_Emails_Var_Pop_Fields = {
  __typename?: 'waitlist_emails_var_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Waitlist_Emails_Var_Samp_Fields = {
  __typename?: 'waitlist_emails_var_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Waitlist_Emails_Variance_Fields = {
  __typename?: 'waitlist_emails_variance_fields';
  id: Maybe<Scalars['Float']>;
};

export type GetAllCoinsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCoinsQuery = { __typename?: 'query_root', coins: Array<{ __typename?: 'coins', ticker: string, name: string, id: number }> };

export type GetCompanyQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetCompanyQuery = { __typename?: 'query_root', companies: Array<{ __typename?: 'companies', id: number, name: string | null, slug: string, logo: any | null, layer: string | null, overview: string | null, investor_amount: any | null, white_paper: string | null, total_employees: any | null, year_founded: string | null, website: string | null, market_verified: string | null, company_linkedin: string | null, careers_page: string | null, github: string | null, velocity_linkedin: string | null, velocity_token: string | null, tags: any | null, date_added: any | null, ico_start: any | null, ico_end: any | null, audit_file: string | null, sentiment: any | null, twitter: string | null, location: string | null, location_json: any | null, discord: string | null, glassdoor: string | null, coin: { __typename?: 'coins', id: number, ticker: string } | null, teamMembers: Array<{ __typename?: 'team_members', id: number, function: string | null, start_date: any | null, end_date: any | null, founder: boolean | null, title: string | null, person: { __typename?: 'people', id: number, slug: string, name: string | null, picture: any | null, linkedin: string | null, personal_email: string | null, work_email: string | null } | null }>, investment_rounds: Array<{ __typename?: 'investment_rounds', id: number, round_date: string | null, round: string | null, amount: any | null, valuation: any | null, investments: Array<{ __typename?: 'investments', id: number, amount: any | null, person: { __typename?: 'people', id: number, slug: string, name: string | null, picture: any | null } | null, vc_firm: { __typename?: 'vc_firms', id: number, slug: string, name: string | null, logo: any | null } | null }> }>, to_links: Array<{ __typename?: 'resource_links', id: number, link_type: string, from_company: { __typename?: 'companies', id: number, name: string | null, slug: string, tags: any | null, sentiment: any | null, overview: string | null, logo: any | null } | null, from_vc_firm: { __typename?: 'vc_firms', id: number, name: string | null, slug: string, tags: any | null, sentiment: any | null, overview: string | null, logo: any | null } | null }>, from_links: Array<{ __typename?: 'resource_links', id: number, link_type: string, to_company: { __typename?: 'companies', id: number, name: string | null, slug: string, tags: any | null, sentiment: any | null, overview: string | null, logo: any | null } | null, to_vc_firm: { __typename?: 'vc_firms', id: number, name: string | null, slug: string, tags: any | null, sentiment: any | null, overview: string | null, logo: any | null } | null }>, news_links: Array<{ __typename?: 'news_organizations', id: number, news: { __typename?: 'news', id: number, date: any | null, text: string, link: string | null, status: string | null } | null }> }> };

export type GetCompaniesQueryVariables = Exact<{
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  where: Companies_Bool_Exp;
}>;


export type GetCompaniesQuery = { __typename?: 'query_root', companies: Array<{ __typename?: 'companies', id: number, name: string | null, slug: string, layer: string | null, tags: any | null, sentiment: any | null, investor_amount: any | null, total_employees: any | null, logo: any | null, overview: string | null, github: string | null, company_linkedin: string | null, market_verified: string | null, velocity_linkedin: string | null, velocity_token: string | null, website: string | null, coin: { __typename?: 'coins', ticker: string } | null }>, companies_aggregate: { __typename?: 'companies_aggregate', aggregate: { __typename?: 'companies_aggregate_fields', count: number } | null } };

export type GetCompaniesRecentQueryVariables = Exact<{
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  where: Companies_Bool_Exp;
}>;


export type GetCompaniesRecentQuery = { __typename?: 'query_root', companies: Array<{ __typename?: 'companies', id: number, name: string | null, slug: string, layer: string | null, tags: any | null, logo: any | null, overview: string | null, total_employees: any | null, investor_amount: any | null, date_added: any | null, sentiment: any | null, investment_rounds: Array<{ __typename?: 'investment_rounds', id: number, amount: any | null }> }> };

export type GetCompaniesPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCompaniesPathsQuery = { __typename?: 'query_root', companies: Array<{ __typename?: 'companies', id: number, name: string | null, slug: string }> };

export type GetRelevantCompaniesQueryVariables = Exact<{
  where: Companies_Bool_Exp;
}>;


export type GetRelevantCompaniesQuery = { __typename?: 'query_root', companies: Array<{ __typename?: 'companies', id: number, logo: any | null, name: string | null, slug: string, sentiment: any | null }> };

export type GetEventsQueryVariables = Exact<{
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order: Order_By;
  where: Events_Bool_Exp;
}>;


export type GetEventsQuery = { __typename?: 'query_root', events: Array<{ __typename?: 'events', id: number, name: string, slug: string, banner: any | null, overview: string | null, notes: string | null, location_json: any | null, venue_name: string | null, link: string | null, size: string | null, price: any | null, types: any | null, start_date: any | null, start_time: any | null, end_date: any | null, end_time: any | null, timezone: string | null, is_featured: boolean | null, created_at: any }>, events_aggregate: { __typename?: 'events_aggregate', aggregate: { __typename?: 'events_aggregate_fields', count: number } | null } };

export type GetEventQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetEventQuery = { __typename?: 'query_root', events: Array<{ __typename?: 'events', id: number, name: string, slug: string, banner: any | null, overview: string | null, notes: string | null, location_json: any | null, venue_name: string | null, link: string | null, size: string | null, price: any | null, types: any | null, start_date: any | null, start_time: any | null, end_date: any | null, end_time: any | null, timezone: string | null, twitter: string | null, facebook: string | null, instagram: string | null, discord: string | null, telegram: string | null, is_featured: boolean | null, created_at: any, event_person: Array<{ __typename?: 'event_person', id: number, type: string, created_at: any, person: { __typename?: 'people', id: number, slug: string, name: string | null, picture: any | null, linkedin: string | null, personal_email: string | null, work_email: string | null } | null }>, event_organization: Array<{ __typename?: 'event_organization', id: number, type: string | null, sponsor_type: string | null, created_at: any, company: { __typename?: 'companies', id: number, name: string | null, slug: string, logo: any | null } | null, vc_firm: { __typename?: 'vc_firms', id: number, name: string | null, slug: string, logo: any | null } | null }> }> };

export type GetFollowsByUserQueryVariables = Exact<{
  user_id: Scalars['Int'];
}>;


export type GetFollowsByUserQuery = { __typename?: 'query_root', list_members: Array<{ __typename?: 'list_members', list: { __typename?: 'lists', name: string, id: number, created_by_id: number, created_at: any | null, total_no_of_resources: number | null, follows_companies: Array<{ __typename?: 'follows_companies', resource_id: number | null }>, follows_vcfirms: Array<{ __typename?: 'follows_vc_firms', resource_id: number | null }> } }> };

export type GetCompaniesByListIdQueryVariables = Exact<{
  list_id?: InputMaybe<Scalars['Int']>;
}>;


export type GetCompaniesByListIdQuery = { __typename?: 'query_root', follows_companies: Array<{ __typename?: 'follows_companies', id: number | null, company: { __typename?: 'companies', id: number, name: string | null, logo: any | null, sentiment: any | null, location: string | null, location_json: any | null, twitter: string | null, year_founded: string | null, total_employees: any | null, overview: string | null, tags: any | null, slug: string, coin: { __typename?: 'coins', ticker: string, name: string } | null, teamMembers: Array<{ __typename?: 'team_members', id: number }>, investment_rounds: Array<{ __typename?: 'investment_rounds', amount: any | null, round_date: string | null, round: string | null }> } | null }> };

export type GetVcFirmsByListIdQueryVariables = Exact<{
  list_id?: InputMaybe<Scalars['Int']>;
}>;


export type GetVcFirmsByListIdQuery = { __typename?: 'query_root', follows_vc_firms: Array<{ __typename?: 'follows_vc_firms', id: number | null, vc_firm: { __typename?: 'vc_firms', id: number, name: string | null, num_of_investments: number | null, latest_investment: string | null, sentiment: any | null, logo: any | null, slug: string, location: string | null, year_founded: string | null, overview: string | null, tags: any | null, investments: Array<{ __typename?: 'investments', investment_round: { __typename?: 'investment_rounds', id: number, amount: any | null, round_date: string | null, round: string | null } | null }> } | null }> };

export type GetGroupsOfUserQueryVariables = Exact<{
  user_id: Scalars['Int'];
}>;


export type GetGroupsOfUserQuery = { __typename?: 'query_root', user_group_members: Array<{ __typename?: 'user_group_members', id: number, user_id: number, user_group_id: number, user: { __typename?: 'users', id: number, email: string | null, display_name: string | null }, user_group: { __typename?: 'user_groups', id: number, name: string, description: string | null, telegram: string | null, twitter: string | null, discord: string | null, created_at: any, updated_at: any | null, created_by: { __typename?: 'users', id: number, display_name: string | null, email: string | null } | null } }> };

export type GetGroupQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetGroupQuery = { __typename?: 'query_root', user_groups: Array<{ __typename?: 'user_groups', id: number, name: string, description: string | null, telegram: string | null, twitter: string | null, discord: string | null, created_by_user_id: number, created_at: any, updated_at: any | null, created_by: { __typename?: 'users', id: number, display_name: string | null, email: string | null } | null, user_group_members: Array<{ __typename?: 'user_group_members', id: number, user: { __typename?: 'users', id: number, display_name: string | null, email: string | null, person: { __typename?: 'people', id: number, slug: string, picture: any | null } | null } }>, user_group_invites: Array<{ __typename?: 'user_group_invites', id: number, email: string, created_at: any, created_by_user_id: number | null }> }> };

export type GetListUserGroupsQueryVariables = Exact<{
  where: List_User_Groups_Bool_Exp;
}>;


export type GetListUserGroupsQuery = { __typename?: 'query_root', list_user_groups: Array<{ __typename?: 'list_user_groups', id: number, list_id: number, user_group_id: number, list: { __typename?: 'lists', id: number, name: string, created_at: any | null, created_by: { __typename?: 'users', id: number, display_name: string | null, email: string | null } | null } | null, user_group: { __typename?: 'user_groups', id: number, name: string } | null }> };

export type GetListMembersQueryVariables = Exact<{
  where: List_Members_Bool_Exp;
}>;


export type GetListMembersQuery = { __typename?: 'query_root', list_members: Array<{ __typename?: 'list_members', id: number, member_type: string, list_id: number, user_id: number, list: { __typename?: 'lists', id: number, name: string, created_at: any | null, created_by: { __typename?: 'users', id: number, display_name: string | null, email: string | null } | null }, user: { __typename?: 'users', id: number, display_name: string | null, email: string | null } | null }> };

export type GetNotesQueryVariables = Exact<{
  where: Notes_Bool_Exp;
}>;


export type GetNotesQuery = { __typename?: 'query_root', notes: Array<{ __typename?: 'notes', id: number, notes: string, created_by: number, created_at: any, updated_at: any | null, user_group_id: number, resource_type: string | null, resource_id: number | null, user_group: { __typename?: 'user_groups', id: number, name: string } }> };

export type GetNotificationsForUserQueryVariables = Exact<{
  user: Scalars['Int'];
}>;


export type GetNotificationsForUserQuery = { __typename?: 'query_root', notifications: Array<{ __typename?: 'notifications', id: number, read: boolean, created_at: any, event_type: string, message: string | null, read_at: any | null, follow_resource_type: string, notification_resource_type: string, company: { __typename?: 'companies', id: number, name: string | null, slug: string, logo: any | null } | null, vc_firm: { __typename?: 'vc_firms', id: number, name: string | null, slug: string, logo: any | null } | null }> };

export type GetPersonQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetPersonQuery = { __typename?: 'query_root', people: Array<{ __typename?: 'people', id: number, name: string | null, personal_email: string | null, picture: any | null, slug: string, status: string, type: string | null, work_email: string | null, linkedin: string | null, github: string | null, city: string | null, country: string | null, facebook_url: string | null, twitter_url: string | null, website_url: string | null, about: string | null, email: any | null, investors: Array<{ __typename?: 'investors', id: number, end_date: any | null, start_date: any | null, function: string | null, title: string | null, vc_firm: { __typename?: 'vc_firms', id: number, slug: string, name: string | null, logo: any | null, overview: string | null, location: string | null, tags: any | null } | null }>, team_members: Array<{ __typename?: 'team_members', id: number, end_date: any | null, start_date: any | null, founder: boolean | null, function: string | null, title: string | null, company: { __typename?: 'companies', id: number, slug: string, name: string | null, logo: any | null, overview: string | null, location: string | null, tags: any | null } | null }>, investments: Array<{ __typename?: 'investments', investment_round: { __typename?: 'investment_rounds', id: number, round_date: string | null, round: string | null, amount: any | null, company: { __typename?: 'companies', id: number, slug: string, name: string | null, logo: any | null, tags: any | null } | null } | null }> }> };

export type GetPersonsPathQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersonsPathQuery = { __typename?: 'query_root', people: Array<{ __typename?: 'people', id: number, name: string | null, slug: string }> };

export type GetAllPersonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPersonsQuery = { __typename?: 'query_root', people: Array<{ __typename?: 'people', id: number, name: string | null }> };

export type GetUserProfileQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserProfileQuery = { __typename?: 'query_root', users_by_pk: { __typename?: 'users', id: number, billing_org_id: number | null, organization_companies: Array<{ __typename?: 'companies_edit_access', id: number | null, company: { __typename?: 'companies', id: number, slug: string, name: string | null, logo: any | null, overview: string | null, location: string | null } | null }>, organization_vc_firms: Array<{ __typename?: 'vc_firms_edit_access', id: number | null, vc_firm: { __typename?: 'vc_firms', id: number, slug: string, name: string | null, logo: any | null, overview: string | null, location: string | null } | null }>, person: { __typename?: 'people', id: number, name: string | null, personal_email: string | null, picture: any | null, slug: string, status: string, type: string | null, work_email: string | null, linkedin: string | null, github: string | null, city: string | null, country: string | null, facebook_url: string | null, twitter_url: string | null, website_url: string | null, about: string | null, email: any | null, team_members: Array<{ __typename?: 'team_members', id: number, end_date: any | null, start_date: any | null, founder: boolean | null, function: string | null, title: string | null, company: { __typename?: 'companies', id: number, slug: string, name: string | null, logo: any | null, overview: string | null, location: string | null } | null }>, investments: Array<{ __typename?: 'investments', investment_round: { __typename?: 'investment_rounds', id: number, round_date: string | null, round: string | null, amount: any | null, company: { __typename?: 'companies', id: number, slug: string, name: string | null, logo: any | null } | null } | null }> } | null } | null };

export type GetVcFirmQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetVcFirmQuery = { __typename?: 'query_root', vc_firms: Array<{ __typename?: 'vc_firms', id: number, name: string | null, slug: string, logo: any | null, website: string | null, linkedin: string | null, sentiment: any | null, tags: any | null, overview: string | null, year_founded: string | null, location: string | null, location_json: any | null, twitter: string | null, investors: Array<{ __typename?: 'investors', id: number, function: string | null, start_date: any | null, end_date: any | null, seniority: string | null, title: string | null, person: { __typename?: 'people', id: number, slug: string, name: string | null, picture: any | null, linkedin: string | null, personal_email: string | null, work_email: string | null } | null }>, investments: Array<{ __typename?: 'investments', investment_round: { __typename?: 'investment_rounds', id: number, round_date: string | null, round: string | null, amount: any | null, company: { __typename?: 'companies', id: number, slug: string, name: string | null, tags: any | null, logo: any | null } | null } | null }>, to_links: Array<{ __typename?: 'resource_links', link_type: string, from_company: { __typename?: 'companies', id: number, name: string | null, slug: string, tags: any | null, sentiment: any | null, overview: string | null, logo: any | null } | null, from_vc_firm: { __typename?: 'vc_firms', id: number, name: string | null, slug: string, tags: any | null, sentiment: any | null, overview: string | null, logo: any | null } | null }>, from_links: Array<{ __typename?: 'resource_links', link_type: string, to_company: { __typename?: 'companies', id: number, name: string | null, slug: string, tags: any | null, sentiment: any | null, overview: string | null, logo: any | null } | null, to_vc_firm: { __typename?: 'vc_firms', id: number, name: string | null, slug: string, tags: any | null, sentiment: any | null, overview: string | null, logo: any | null } | null }>, news_links: Array<{ __typename?: 'news_organizations', id: number, news: { __typename?: 'news', id: number, date: any | null, text: string, link: string | null, status: string | null } | null }> }> };

export type GetVcFirmsQueryVariables = Exact<{
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  where: Vc_Firms_Bool_Exp;
}>;


export type GetVcFirmsQuery = { __typename?: 'query_root', vc_firms: Array<{ __typename?: 'vc_firms', id: number, name: string | null, slug: string, logo: any | null, num_of_investments: number | null, sentiment: any | null, tags: any | null, overview: string | null, website: string | null }>, vc_firms_aggregate: { __typename?: 'vc_firms_aggregate', aggregate: { __typename?: 'vc_firms_aggregate_fields', count: number } | null } };

export type GetVcFirmsRecentInvestmentsQueryVariables = Exact<{
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  where: Vc_Firms_Bool_Exp;
}>;


export type GetVcFirmsRecentInvestmentsQuery = { __typename?: 'query_root', vc_firms: Array<{ __typename?: 'vc_firms', id: number, name: string | null, slug: string, logo: any | null, tags: any | null, latest_investment: string | null, num_of_investments: number | null, sentiment: any | null, overview: string | null }> };

export type GetVcFirmsPathQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVcFirmsPathQuery = { __typename?: 'query_root', vc_firms: Array<{ __typename?: 'vc_firms', id: number, name: string | null, slug: string }> };

export type GetRelevantVcFirmsQueryVariables = Exact<{
  where: Vc_Firms_Bool_Exp;
}>;


export type GetRelevantVcFirmsQuery = { __typename?: 'query_root', vc_firms: Array<{ __typename?: 'vc_firms', id: number, logo: any | null, name: string | null, slug: string, sentiment: any | null }> };

export type GetAllVcFirmsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllVcFirmsQuery = { __typename?: 'query_root', vc_firms: Array<{ __typename?: 'vc_firms', id: number, name: string | null, logo: any | null, slug: string }> };


export const GetAllCoinsDocument = `
    query GetAllCoins {
  coins {
    ticker
    name
    id
  }
}
    `;
export const useGetAllCoinsQuery = <
      TData = GetAllCoinsQuery,
      TError = Error
    >(
      variables?: GetAllCoinsQueryVariables,
      options?: UseQueryOptions<GetAllCoinsQuery, TError, TData>
    ) =>
    useQuery<GetAllCoinsQuery, TError, TData>(
      variables === undefined ? ['GetAllCoins'] : ['GetAllCoins', variables],
      fetcher<GetAllCoinsQuery, GetAllCoinsQueryVariables>(GetAllCoinsDocument, variables),
      options
    );
useGetAllCoinsQuery.document = GetAllCoinsDocument;


useGetAllCoinsQuery.getKey = (variables?: GetAllCoinsQueryVariables) => variables === undefined ? ['GetAllCoins'] : ['GetAllCoins', variables];
;

useGetAllCoinsQuery.fetcher = (variables?: GetAllCoinsQueryVariables, options?: RequestInit['headers']) => fetcher<GetAllCoinsQuery, GetAllCoinsQueryVariables>(GetAllCoinsDocument, variables, options);
export const GetCompanyDocument = `
    query GetCompany($slug: String!) {
  companies(where: {slug: {_eq: $slug}}) {
    id
    name
    coin {
      id
      ticker
    }
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
    careers_page
    github
    velocity_linkedin
    velocity_token
    tags
    date_added
    ico_start
    ico_end
    audit_file
    sentiment
    twitter
    location
    location_json
    discord
    glassdoor
    teamMembers {
      id
      person {
        id
        slug
        name
        picture
        linkedin
        personal_email
        work_email
      }
      function
      start_date
      end_date
      founder
      title
    }
    investment_rounds {
      id
      round_date
      round
      amount
      valuation
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
        amount
      }
    }
    to_links {
      id
      link_type
      from_company {
        id
        name
        slug
        tags
        sentiment
        overview
        logo
      }
      from_vc_firm {
        id
        name
        slug
        tags
        sentiment
        overview
        logo
      }
    }
    from_links {
      id
      link_type
      to_company {
        id
        name
        slug
        tags
        sentiment
        overview
        logo
      }
      to_vc_firm {
        id
        name
        slug
        tags
        sentiment
        overview
        logo
      }
    }
    news_links {
      id
      news {
        id
        date
        text
        link
        status
      }
    }
  }
}
    `;
export const useGetCompanyQuery = <
      TData = GetCompanyQuery,
      TError = Error
    >(
      variables: GetCompanyQueryVariables,
      options?: UseQueryOptions<GetCompanyQuery, TError, TData>
    ) =>
    useQuery<GetCompanyQuery, TError, TData>(
      ['GetCompany', variables],
      fetcher<GetCompanyQuery, GetCompanyQueryVariables>(GetCompanyDocument, variables),
      options
    );
useGetCompanyQuery.document = GetCompanyDocument;


useGetCompanyQuery.getKey = (variables: GetCompanyQueryVariables) => ['GetCompany', variables];
;

useGetCompanyQuery.fetcher = (variables: GetCompanyQueryVariables, options?: RequestInit['headers']) => fetcher<GetCompanyQuery, GetCompanyQueryVariables>(GetCompanyDocument, variables, options);
export const GetCompaniesDocument = `
    query GetCompanies($limit: Int, $offset: Int, $where: companies_bool_exp!) {
  companies(where: $where, order_by: {slug: asc}, limit: $limit, offset: $offset) {
    id
    name
    slug
    layer
    tags
    coin {
      ticker
    }
    sentiment
    investor_amount
    total_employees
    logo
    overview
    github
    company_linkedin
    market_verified
    velocity_linkedin
    velocity_token
    website
  }
  companies_aggregate(where: $where) {
    aggregate {
      count
    }
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
export const GetCompaniesRecentDocument = `
    query GetCompaniesRecent($limit: Int, $offset: Int, $where: companies_bool_exp!) {
  companies(
    where: $where
    order_by: {date_added: desc}
    limit: $limit
    offset: $offset
  ) {
    id
    name
    slug
    layer
    tags
    logo
    overview
    total_employees
    investor_amount
    date_added
    sentiment
    investment_rounds {
      id
      amount
    }
  }
}
    `;
export const useGetCompaniesRecentQuery = <
      TData = GetCompaniesRecentQuery,
      TError = Error
    >(
      variables: GetCompaniesRecentQueryVariables,
      options?: UseQueryOptions<GetCompaniesRecentQuery, TError, TData>
    ) =>
    useQuery<GetCompaniesRecentQuery, TError, TData>(
      ['GetCompaniesRecent', variables],
      fetcher<GetCompaniesRecentQuery, GetCompaniesRecentQueryVariables>(GetCompaniesRecentDocument, variables),
      options
    );
useGetCompaniesRecentQuery.document = GetCompaniesRecentDocument;


useGetCompaniesRecentQuery.getKey = (variables: GetCompaniesRecentQueryVariables) => ['GetCompaniesRecent', variables];
;

useGetCompaniesRecentQuery.fetcher = (variables: GetCompaniesRecentQueryVariables, options?: RequestInit['headers']) => fetcher<GetCompaniesRecentQuery, GetCompaniesRecentQueryVariables>(GetCompaniesRecentDocument, variables, options);
export const GetCompaniesPathsDocument = `
    query GetCompaniesPaths {
  companies(where: {slug: {_neq: ""}}, order_by: {slug: asc}) {
    id
    name
    slug
  }
}
    `;
export const useGetCompaniesPathsQuery = <
      TData = GetCompaniesPathsQuery,
      TError = Error
    >(
      variables?: GetCompaniesPathsQueryVariables,
      options?: UseQueryOptions<GetCompaniesPathsQuery, TError, TData>
    ) =>
    useQuery<GetCompaniesPathsQuery, TError, TData>(
      variables === undefined ? ['GetCompaniesPaths'] : ['GetCompaniesPaths', variables],
      fetcher<GetCompaniesPathsQuery, GetCompaniesPathsQueryVariables>(GetCompaniesPathsDocument, variables),
      options
    );
useGetCompaniesPathsQuery.document = GetCompaniesPathsDocument;


useGetCompaniesPathsQuery.getKey = (variables?: GetCompaniesPathsQueryVariables) => variables === undefined ? ['GetCompaniesPaths'] : ['GetCompaniesPaths', variables];
;

useGetCompaniesPathsQuery.fetcher = (variables?: GetCompaniesPathsQueryVariables, options?: RequestInit['headers']) => fetcher<GetCompaniesPathsQuery, GetCompaniesPathsQueryVariables>(GetCompaniesPathsDocument, variables, options);
export const GetRelevantCompaniesDocument = `
    query GetRelevantCompanies($where: companies_bool_exp!) {
  companies(where: $where) {
    id
    logo
    name
    slug
    sentiment
  }
}
    `;
export const useGetRelevantCompaniesQuery = <
      TData = GetRelevantCompaniesQuery,
      TError = Error
    >(
      variables: GetRelevantCompaniesQueryVariables,
      options?: UseQueryOptions<GetRelevantCompaniesQuery, TError, TData>
    ) =>
    useQuery<GetRelevantCompaniesQuery, TError, TData>(
      ['GetRelevantCompanies', variables],
      fetcher<GetRelevantCompaniesQuery, GetRelevantCompaniesQueryVariables>(GetRelevantCompaniesDocument, variables),
      options
    );
useGetRelevantCompaniesQuery.document = GetRelevantCompaniesDocument;


useGetRelevantCompaniesQuery.getKey = (variables: GetRelevantCompaniesQueryVariables) => ['GetRelevantCompanies', variables];
;

useGetRelevantCompaniesQuery.fetcher = (variables: GetRelevantCompaniesQueryVariables, options?: RequestInit['headers']) => fetcher<GetRelevantCompaniesQuery, GetRelevantCompaniesQueryVariables>(GetRelevantCompaniesDocument, variables, options);
export const GetEventsDocument = `
    query GetEvents($limit: Int, $offset: Int, $order: order_by!, $where: events_bool_exp!) {
  events(
    where: $where
    order_by: {start_date: $order}
    limit: $limit
    offset: $offset
  ) {
    id
    name
    slug
    banner
    overview
    notes
    location_json
    venue_name
    link
    size
    price
    types
    start_date
    start_time
    end_date
    end_time
    timezone
    is_featured
    created_at
  }
  events_aggregate(where: $where) {
    aggregate {
      count
    }
  }
}
    `;
export const useGetEventsQuery = <
      TData = GetEventsQuery,
      TError = Error
    >(
      variables: GetEventsQueryVariables,
      options?: UseQueryOptions<GetEventsQuery, TError, TData>
    ) =>
    useQuery<GetEventsQuery, TError, TData>(
      ['GetEvents', variables],
      fetcher<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, variables),
      options
    );
useGetEventsQuery.document = GetEventsDocument;


useGetEventsQuery.getKey = (variables: GetEventsQueryVariables) => ['GetEvents', variables];
;

useGetEventsQuery.fetcher = (variables: GetEventsQueryVariables, options?: RequestInit['headers']) => fetcher<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, variables, options);
export const GetEventDocument = `
    query GetEvent($slug: String!) {
  events(where: {slug: {_eq: $slug}}) {
    id
    name
    slug
    banner
    overview
    notes
    location_json
    venue_name
    link
    size
    price
    types
    start_date
    start_time
    end_date
    end_time
    timezone
    twitter
    facebook
    instagram
    discord
    telegram
    is_featured
    created_at
    event_person {
      id
      type
      created_at
      person {
        id
        slug
        name
        picture
        linkedin
        personal_email
        work_email
      }
    }
    event_organization {
      id
      type
      sponsor_type
      created_at
      company {
        id
        name
        slug
        logo
      }
      vc_firm {
        id
        name
        slug
        logo
      }
    }
  }
}
    `;
export const useGetEventQuery = <
      TData = GetEventQuery,
      TError = Error
    >(
      variables: GetEventQueryVariables,
      options?: UseQueryOptions<GetEventQuery, TError, TData>
    ) =>
    useQuery<GetEventQuery, TError, TData>(
      ['GetEvent', variables],
      fetcher<GetEventQuery, GetEventQueryVariables>(GetEventDocument, variables),
      options
    );
useGetEventQuery.document = GetEventDocument;


useGetEventQuery.getKey = (variables: GetEventQueryVariables) => ['GetEvent', variables];
;

useGetEventQuery.fetcher = (variables: GetEventQueryVariables, options?: RequestInit['headers']) => fetcher<GetEventQuery, GetEventQueryVariables>(GetEventDocument, variables, options);
export const GetFollowsByUserDocument = `
    query GetFollowsByUser($user_id: Int!) {
  list_members(where: {user_id: {_eq: $user_id}}) {
    list {
      name
      id
      created_by_id
      created_at
      total_no_of_resources
      follows_companies {
        resource_id
      }
      follows_vcfirms {
        resource_id
      }
    }
  }
}
    `;
export const useGetFollowsByUserQuery = <
      TData = GetFollowsByUserQuery,
      TError = Error
    >(
      variables: GetFollowsByUserQueryVariables,
      options?: UseQueryOptions<GetFollowsByUserQuery, TError, TData>
    ) =>
    useQuery<GetFollowsByUserQuery, TError, TData>(
      ['GetFollowsByUser', variables],
      fetcher<GetFollowsByUserQuery, GetFollowsByUserQueryVariables>(GetFollowsByUserDocument, variables),
      options
    );
useGetFollowsByUserQuery.document = GetFollowsByUserDocument;


useGetFollowsByUserQuery.getKey = (variables: GetFollowsByUserQueryVariables) => ['GetFollowsByUser', variables];
;

useGetFollowsByUserQuery.fetcher = (variables: GetFollowsByUserQueryVariables, options?: RequestInit['headers']) => fetcher<GetFollowsByUserQuery, GetFollowsByUserQueryVariables>(GetFollowsByUserDocument, variables, options);
export const GetCompaniesByListIdDocument = `
    query GetCompaniesByListId($list_id: Int = 0) {
  follows_companies(where: {list_id: {_eq: $list_id}}) {
    id
    company {
      id
      name
      logo
      sentiment
      location
      location_json
      twitter
      year_founded
      total_employees
      overview
      coin {
        ticker
        name
      }
      teamMembers {
        id
      }
      investment_rounds {
        amount
        round_date
        round
      }
      tags
      slug
    }
  }
}
    `;
export const useGetCompaniesByListIdQuery = <
      TData = GetCompaniesByListIdQuery,
      TError = Error
    >(
      variables?: GetCompaniesByListIdQueryVariables,
      options?: UseQueryOptions<GetCompaniesByListIdQuery, TError, TData>
    ) =>
    useQuery<GetCompaniesByListIdQuery, TError, TData>(
      variables === undefined ? ['GetCompaniesByListId'] : ['GetCompaniesByListId', variables],
      fetcher<GetCompaniesByListIdQuery, GetCompaniesByListIdQueryVariables>(GetCompaniesByListIdDocument, variables),
      options
    );
useGetCompaniesByListIdQuery.document = GetCompaniesByListIdDocument;


useGetCompaniesByListIdQuery.getKey = (variables?: GetCompaniesByListIdQueryVariables) => variables === undefined ? ['GetCompaniesByListId'] : ['GetCompaniesByListId', variables];
;

useGetCompaniesByListIdQuery.fetcher = (variables?: GetCompaniesByListIdQueryVariables, options?: RequestInit['headers']) => fetcher<GetCompaniesByListIdQuery, GetCompaniesByListIdQueryVariables>(GetCompaniesByListIdDocument, variables, options);
export const GetVcFirmsByListIdDocument = `
    query GetVcFirmsByListId($list_id: Int = 0) {
  follows_vc_firms(where: {list_id: {_eq: $list_id}}) {
    id
    vc_firm {
      id
      name
      num_of_investments
      latest_investment
      sentiment
      logo
      slug
      location
      year_founded
      overview
      tags
      investments {
        investment_round {
          id
          amount
          round_date
          round
        }
      }
    }
  }
}
    `;
export const useGetVcFirmsByListIdQuery = <
      TData = GetVcFirmsByListIdQuery,
      TError = Error
    >(
      variables?: GetVcFirmsByListIdQueryVariables,
      options?: UseQueryOptions<GetVcFirmsByListIdQuery, TError, TData>
    ) =>
    useQuery<GetVcFirmsByListIdQuery, TError, TData>(
      variables === undefined ? ['GetVcFirmsByListId'] : ['GetVcFirmsByListId', variables],
      fetcher<GetVcFirmsByListIdQuery, GetVcFirmsByListIdQueryVariables>(GetVcFirmsByListIdDocument, variables),
      options
    );
useGetVcFirmsByListIdQuery.document = GetVcFirmsByListIdDocument;


useGetVcFirmsByListIdQuery.getKey = (variables?: GetVcFirmsByListIdQueryVariables) => variables === undefined ? ['GetVcFirmsByListId'] : ['GetVcFirmsByListId', variables];
;

useGetVcFirmsByListIdQuery.fetcher = (variables?: GetVcFirmsByListIdQueryVariables, options?: RequestInit['headers']) => fetcher<GetVcFirmsByListIdQuery, GetVcFirmsByListIdQueryVariables>(GetVcFirmsByListIdDocument, variables, options);
export const GetGroupsOfUserDocument = `
    query GetGroupsOfUser($user_id: Int!) {
  user_group_members(where: {user_id: {_eq: $user_id}}) {
    id
    user_id
    user {
      id
      email
      display_name
    }
    user_group_id
    user_group {
      id
      name
      description
      telegram
      twitter
      discord
      created_by {
        id
        display_name
        email
      }
      created_at
      updated_at
    }
  }
}
    `;
export const useGetGroupsOfUserQuery = <
      TData = GetGroupsOfUserQuery,
      TError = Error
    >(
      variables: GetGroupsOfUserQueryVariables,
      options?: UseQueryOptions<GetGroupsOfUserQuery, TError, TData>
    ) =>
    useQuery<GetGroupsOfUserQuery, TError, TData>(
      ['GetGroupsOfUser', variables],
      fetcher<GetGroupsOfUserQuery, GetGroupsOfUserQueryVariables>(GetGroupsOfUserDocument, variables),
      options
    );
useGetGroupsOfUserQuery.document = GetGroupsOfUserDocument;


useGetGroupsOfUserQuery.getKey = (variables: GetGroupsOfUserQueryVariables) => ['GetGroupsOfUser', variables];
;

useGetGroupsOfUserQuery.fetcher = (variables: GetGroupsOfUserQueryVariables, options?: RequestInit['headers']) => fetcher<GetGroupsOfUserQuery, GetGroupsOfUserQueryVariables>(GetGroupsOfUserDocument, variables, options);
export const GetGroupDocument = `
    query GetGroup($id: Int!) {
  user_groups(where: {id: {_eq: $id}}) {
    id
    name
    description
    telegram
    twitter
    discord
    created_by_user_id
    created_by {
      id
      display_name
      email
    }
    created_at
    updated_at
    user_group_members {
      id
      user {
        id
        display_name
        email
        person {
          id
          slug
          picture
        }
      }
    }
    user_group_invites {
      id
      email
      created_at
      created_by_user_id
    }
  }
}
    `;
export const useGetGroupQuery = <
      TData = GetGroupQuery,
      TError = Error
    >(
      variables: GetGroupQueryVariables,
      options?: UseQueryOptions<GetGroupQuery, TError, TData>
    ) =>
    useQuery<GetGroupQuery, TError, TData>(
      ['GetGroup', variables],
      fetcher<GetGroupQuery, GetGroupQueryVariables>(GetGroupDocument, variables),
      options
    );
useGetGroupQuery.document = GetGroupDocument;


useGetGroupQuery.getKey = (variables: GetGroupQueryVariables) => ['GetGroup', variables];
;

useGetGroupQuery.fetcher = (variables: GetGroupQueryVariables, options?: RequestInit['headers']) => fetcher<GetGroupQuery, GetGroupQueryVariables>(GetGroupDocument, variables, options);
export const GetListUserGroupsDocument = `
    query GetListUserGroups($where: list_user_groups_bool_exp!) {
  list_user_groups(where: $where) {
    id
    list_id
    list {
      id
      name
      created_at
      created_by {
        id
        display_name
        email
      }
    }
    user_group_id
    user_group {
      id
      name
    }
  }
}
    `;
export const useGetListUserGroupsQuery = <
      TData = GetListUserGroupsQuery,
      TError = Error
    >(
      variables: GetListUserGroupsQueryVariables,
      options?: UseQueryOptions<GetListUserGroupsQuery, TError, TData>
    ) =>
    useQuery<GetListUserGroupsQuery, TError, TData>(
      ['GetListUserGroups', variables],
      fetcher<GetListUserGroupsQuery, GetListUserGroupsQueryVariables>(GetListUserGroupsDocument, variables),
      options
    );
useGetListUserGroupsQuery.document = GetListUserGroupsDocument;


useGetListUserGroupsQuery.getKey = (variables: GetListUserGroupsQueryVariables) => ['GetListUserGroups', variables];
;

useGetListUserGroupsQuery.fetcher = (variables: GetListUserGroupsQueryVariables, options?: RequestInit['headers']) => fetcher<GetListUserGroupsQuery, GetListUserGroupsQueryVariables>(GetListUserGroupsDocument, variables, options);
export const GetListMembersDocument = `
    query GetListMembers($where: list_members_bool_exp!) {
  list_members(where: $where) {
    id
    member_type
    list_id
    list {
      id
      name
      created_at
      created_by {
        id
        display_name
        email
      }
    }
    user_id
    user {
      id
      display_name
      email
    }
  }
}
    `;
export const useGetListMembersQuery = <
      TData = GetListMembersQuery,
      TError = Error
    >(
      variables: GetListMembersQueryVariables,
      options?: UseQueryOptions<GetListMembersQuery, TError, TData>
    ) =>
    useQuery<GetListMembersQuery, TError, TData>(
      ['GetListMembers', variables],
      fetcher<GetListMembersQuery, GetListMembersQueryVariables>(GetListMembersDocument, variables),
      options
    );
useGetListMembersQuery.document = GetListMembersDocument;


useGetListMembersQuery.getKey = (variables: GetListMembersQueryVariables) => ['GetListMembers', variables];
;

useGetListMembersQuery.fetcher = (variables: GetListMembersQueryVariables, options?: RequestInit['headers']) => fetcher<GetListMembersQuery, GetListMembersQueryVariables>(GetListMembersDocument, variables, options);
export const GetNotesDocument = `
    query GetNotes($where: notes_bool_exp!) {
  notes(where: $where, order_by: {created_at: asc}) {
    id
    notes
    created_by
    created_at
    updated_at
    user_group_id
    resource_type
    resource_id
    user_group {
      id
      name
    }
  }
}
    `;
export const useGetNotesQuery = <
      TData = GetNotesQuery,
      TError = Error
    >(
      variables: GetNotesQueryVariables,
      options?: UseQueryOptions<GetNotesQuery, TError, TData>
    ) =>
    useQuery<GetNotesQuery, TError, TData>(
      ['GetNotes', variables],
      fetcher<GetNotesQuery, GetNotesQueryVariables>(GetNotesDocument, variables),
      options
    );
useGetNotesQuery.document = GetNotesDocument;


useGetNotesQuery.getKey = (variables: GetNotesQueryVariables) => ['GetNotes', variables];
;

useGetNotesQuery.fetcher = (variables: GetNotesQueryVariables, options?: RequestInit['headers']) => fetcher<GetNotesQuery, GetNotesQueryVariables>(GetNotesDocument, variables, options);
export const GetNotificationsForUserDocument = `
    query GetNotificationsForUser($user: Int!) {
  notifications(
    where: {target_user_id: {_eq: $user}}
    order_by: {created_at: desc}
    limit: 100
  ) {
    id
    read
    created_at
    event_type
    message
    read_at
    follow_resource_type
    notification_resource_type
    company {
      id
      name
      slug
      logo
    }
    vc_firm {
      id
      name
      slug
      logo
    }
  }
}
    `;
export const useGetNotificationsForUserQuery = <
      TData = GetNotificationsForUserQuery,
      TError = Error
    >(
      variables: GetNotificationsForUserQueryVariables,
      options?: UseQueryOptions<GetNotificationsForUserQuery, TError, TData>
    ) =>
    useQuery<GetNotificationsForUserQuery, TError, TData>(
      ['GetNotificationsForUser', variables],
      fetcher<GetNotificationsForUserQuery, GetNotificationsForUserQueryVariables>(GetNotificationsForUserDocument, variables),
      options
    );
useGetNotificationsForUserQuery.document = GetNotificationsForUserDocument;


useGetNotificationsForUserQuery.getKey = (variables: GetNotificationsForUserQueryVariables) => ['GetNotificationsForUser', variables];
;

useGetNotificationsForUserQuery.fetcher = (variables: GetNotificationsForUserQueryVariables, options?: RequestInit['headers']) => fetcher<GetNotificationsForUserQuery, GetNotificationsForUserQueryVariables>(GetNotificationsForUserDocument, variables, options);
export const GetPersonDocument = `
    query GetPerson($slug: String!) {
  people(where: {slug: {_eq: $slug}}) {
    id
    name
    personal_email
    picture
    slug
    status
    type
    work_email
    linkedin
    github
    city
    country
    facebook_url
    twitter_url
    website_url
    about
    email
    investors {
      id
      end_date
      start_date
      function
      title
      vc_firm {
        id
        slug
        name
        logo
        overview
        location
        tags
      }
    }
    team_members {
      id
      end_date
      start_date
      founder
      function
      title
      company {
        id
        slug
        name
        logo
        overview
        location
        tags
      }
    }
    investments {
      investment_round {
        id
        round_date
        round
        amount
        company {
          id
          slug
          name
          logo
          tags
        }
      }
    }
  }
}
    `;
export const useGetPersonQuery = <
      TData = GetPersonQuery,
      TError = Error
    >(
      variables: GetPersonQueryVariables,
      options?: UseQueryOptions<GetPersonQuery, TError, TData>
    ) =>
    useQuery<GetPersonQuery, TError, TData>(
      ['GetPerson', variables],
      fetcher<GetPersonQuery, GetPersonQueryVariables>(GetPersonDocument, variables),
      options
    );
useGetPersonQuery.document = GetPersonDocument;


useGetPersonQuery.getKey = (variables: GetPersonQueryVariables) => ['GetPerson', variables];
;

useGetPersonQuery.fetcher = (variables: GetPersonQueryVariables, options?: RequestInit['headers']) => fetcher<GetPersonQuery, GetPersonQueryVariables>(GetPersonDocument, variables, options);
export const GetPersonsPathDocument = `
    query GetPersonsPath {
  people(where: {slug: {_neq: ""}}, order_by: {slug: asc}) {
    id
    name
    slug
  }
}
    `;
export const useGetPersonsPathQuery = <
      TData = GetPersonsPathQuery,
      TError = Error
    >(
      variables?: GetPersonsPathQueryVariables,
      options?: UseQueryOptions<GetPersonsPathQuery, TError, TData>
    ) =>
    useQuery<GetPersonsPathQuery, TError, TData>(
      variables === undefined ? ['GetPersonsPath'] : ['GetPersonsPath', variables],
      fetcher<GetPersonsPathQuery, GetPersonsPathQueryVariables>(GetPersonsPathDocument, variables),
      options
    );
useGetPersonsPathQuery.document = GetPersonsPathDocument;


useGetPersonsPathQuery.getKey = (variables?: GetPersonsPathQueryVariables) => variables === undefined ? ['GetPersonsPath'] : ['GetPersonsPath', variables];
;

useGetPersonsPathQuery.fetcher = (variables?: GetPersonsPathQueryVariables, options?: RequestInit['headers']) => fetcher<GetPersonsPathQuery, GetPersonsPathQueryVariables>(GetPersonsPathDocument, variables, options);
export const GetAllPersonsDocument = `
    query GetAllPersons {
  people {
    id
    name
  }
}
    `;
export const useGetAllPersonsQuery = <
      TData = GetAllPersonsQuery,
      TError = Error
    >(
      variables?: GetAllPersonsQueryVariables,
      options?: UseQueryOptions<GetAllPersonsQuery, TError, TData>
    ) =>
    useQuery<GetAllPersonsQuery, TError, TData>(
      variables === undefined ? ['GetAllPersons'] : ['GetAllPersons', variables],
      fetcher<GetAllPersonsQuery, GetAllPersonsQueryVariables>(GetAllPersonsDocument, variables),
      options
    );
useGetAllPersonsQuery.document = GetAllPersonsDocument;


useGetAllPersonsQuery.getKey = (variables?: GetAllPersonsQueryVariables) => variables === undefined ? ['GetAllPersons'] : ['GetAllPersons', variables];
;

useGetAllPersonsQuery.fetcher = (variables?: GetAllPersonsQueryVariables, options?: RequestInit['headers']) => fetcher<GetAllPersonsQuery, GetAllPersonsQueryVariables>(GetAllPersonsDocument, variables, options);
export const GetUserProfileDocument = `
    query GetUserProfile($id: Int!) {
  users_by_pk(id: $id) {
    id
    billing_org_id
    organization_companies {
      id
      company {
        id
        slug
        name
        logo
        overview
        location
      }
    }
    organization_vc_firms {
      id
      vc_firm {
        id
        slug
        name
        logo
        overview
        location
      }
    }
    person {
      id
      name
      personal_email
      picture
      slug
      status
      type
      work_email
      linkedin
      github
      city
      country
      facebook_url
      twitter_url
      website_url
      about
      email
      team_members {
        id
        end_date
        start_date
        founder
        function
        title
        company {
          id
          slug
          name
          logo
          overview
          location
        }
      }
      investments {
        investment_round {
          id
          round_date
          round
          amount
          company {
            id
            slug
            name
            logo
          }
        }
      }
    }
  }
}
    `;
export const useGetUserProfileQuery = <
      TData = GetUserProfileQuery,
      TError = Error
    >(
      variables: GetUserProfileQueryVariables,
      options?: UseQueryOptions<GetUserProfileQuery, TError, TData>
    ) =>
    useQuery<GetUserProfileQuery, TError, TData>(
      ['GetUserProfile', variables],
      fetcher<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, variables),
      options
    );
useGetUserProfileQuery.document = GetUserProfileDocument;


useGetUserProfileQuery.getKey = (variables: GetUserProfileQueryVariables) => ['GetUserProfile', variables];
;

useGetUserProfileQuery.fetcher = (variables: GetUserProfileQueryVariables, options?: RequestInit['headers']) => fetcher<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, variables, options);
export const GetVcFirmDocument = `
    query GetVCFirm($slug: String!) {
  vc_firms(where: {slug: {_eq: $slug}}) {
    id
    name
    slug
    logo
    website
    linkedin
    sentiment
    tags
    overview
    year_founded
    location
    location_json
    twitter
    investors {
      id
      person {
        id
        slug
        name
        picture
        linkedin
        personal_email
        work_email
      }
      function
      start_date
      end_date
      seniority
      title
    }
    investments {
      investment_round {
        id
        round_date
        round
        amount
        company {
          id
          slug
          name
          tags
          logo
        }
      }
    }
    to_links {
      link_type
      from_company {
        id
        name
        slug
        tags
        sentiment
        overview
        logo
      }
      from_vc_firm {
        id
        name
        slug
        tags
        sentiment
        overview
        logo
      }
    }
    from_links {
      link_type
      to_company {
        id
        name
        slug
        tags
        sentiment
        overview
        logo
      }
      to_vc_firm {
        id
        name
        slug
        tags
        sentiment
        overview
        logo
      }
    }
    news_links {
      id
      news {
        id
        date
        text
        link
        status
      }
    }
  }
}
    `;
export const useGetVcFirmQuery = <
      TData = GetVcFirmQuery,
      TError = Error
    >(
      variables: GetVcFirmQueryVariables,
      options?: UseQueryOptions<GetVcFirmQuery, TError, TData>
    ) =>
    useQuery<GetVcFirmQuery, TError, TData>(
      ['GetVCFirm', variables],
      fetcher<GetVcFirmQuery, GetVcFirmQueryVariables>(GetVcFirmDocument, variables),
      options
    );
useGetVcFirmQuery.document = GetVcFirmDocument;


useGetVcFirmQuery.getKey = (variables: GetVcFirmQueryVariables) => ['GetVCFirm', variables];
;

useGetVcFirmQuery.fetcher = (variables: GetVcFirmQueryVariables, options?: RequestInit['headers']) => fetcher<GetVcFirmQuery, GetVcFirmQueryVariables>(GetVcFirmDocument, variables, options);
export const GetVcFirmsDocument = `
    query GetVCFirms($limit: Int, $offset: Int, $where: vc_firms_bool_exp!) {
  vc_firms(
    where: $where
    order_by: {num_of_investments: desc}
    limit: $limit
    offset: $offset
  ) {
    id
    name
    slug
    logo
    num_of_investments
    sentiment
    tags
    overview
    website
  }
  vc_firms_aggregate(where: $where) {
    aggregate {
      count
    }
  }
}
    `;
export const useGetVcFirmsQuery = <
      TData = GetVcFirmsQuery,
      TError = Error
    >(
      variables: GetVcFirmsQueryVariables,
      options?: UseQueryOptions<GetVcFirmsQuery, TError, TData>
    ) =>
    useQuery<GetVcFirmsQuery, TError, TData>(
      ['GetVCFirms', variables],
      fetcher<GetVcFirmsQuery, GetVcFirmsQueryVariables>(GetVcFirmsDocument, variables),
      options
    );
useGetVcFirmsQuery.document = GetVcFirmsDocument;


useGetVcFirmsQuery.getKey = (variables: GetVcFirmsQueryVariables) => ['GetVCFirms', variables];
;

useGetVcFirmsQuery.fetcher = (variables: GetVcFirmsQueryVariables, options?: RequestInit['headers']) => fetcher<GetVcFirmsQuery, GetVcFirmsQueryVariables>(GetVcFirmsDocument, variables, options);
export const GetVcFirmsRecentInvestmentsDocument = `
    query GetVCFirmsRecentInvestments($limit: Int, $offset: Int, $where: vc_firms_bool_exp!) {
  vc_firms(
    where: $where
    order_by: {latest_investment: desc_nulls_last}
    limit: $limit
    offset: $offset
  ) {
    id
    name
    slug
    logo
    tags
    latest_investment
    num_of_investments
    sentiment
    overview
  }
}
    `;
export const useGetVcFirmsRecentInvestmentsQuery = <
      TData = GetVcFirmsRecentInvestmentsQuery,
      TError = Error
    >(
      variables: GetVcFirmsRecentInvestmentsQueryVariables,
      options?: UseQueryOptions<GetVcFirmsRecentInvestmentsQuery, TError, TData>
    ) =>
    useQuery<GetVcFirmsRecentInvestmentsQuery, TError, TData>(
      ['GetVCFirmsRecentInvestments', variables],
      fetcher<GetVcFirmsRecentInvestmentsQuery, GetVcFirmsRecentInvestmentsQueryVariables>(GetVcFirmsRecentInvestmentsDocument, variables),
      options
    );
useGetVcFirmsRecentInvestmentsQuery.document = GetVcFirmsRecentInvestmentsDocument;


useGetVcFirmsRecentInvestmentsQuery.getKey = (variables: GetVcFirmsRecentInvestmentsQueryVariables) => ['GetVCFirmsRecentInvestments', variables];
;

useGetVcFirmsRecentInvestmentsQuery.fetcher = (variables: GetVcFirmsRecentInvestmentsQueryVariables, options?: RequestInit['headers']) => fetcher<GetVcFirmsRecentInvestmentsQuery, GetVcFirmsRecentInvestmentsQueryVariables>(GetVcFirmsRecentInvestmentsDocument, variables, options);
export const GetVcFirmsPathDocument = `
    query GetVCFirmsPath {
  vc_firms(where: {slug: {_neq: ""}}, order_by: {slug: asc}) {
    id
    name
    slug
  }
}
    `;
export const useGetVcFirmsPathQuery = <
      TData = GetVcFirmsPathQuery,
      TError = Error
    >(
      variables?: GetVcFirmsPathQueryVariables,
      options?: UseQueryOptions<GetVcFirmsPathQuery, TError, TData>
    ) =>
    useQuery<GetVcFirmsPathQuery, TError, TData>(
      variables === undefined ? ['GetVCFirmsPath'] : ['GetVCFirmsPath', variables],
      fetcher<GetVcFirmsPathQuery, GetVcFirmsPathQueryVariables>(GetVcFirmsPathDocument, variables),
      options
    );
useGetVcFirmsPathQuery.document = GetVcFirmsPathDocument;


useGetVcFirmsPathQuery.getKey = (variables?: GetVcFirmsPathQueryVariables) => variables === undefined ? ['GetVCFirmsPath'] : ['GetVCFirmsPath', variables];
;

useGetVcFirmsPathQuery.fetcher = (variables?: GetVcFirmsPathQueryVariables, options?: RequestInit['headers']) => fetcher<GetVcFirmsPathQuery, GetVcFirmsPathQueryVariables>(GetVcFirmsPathDocument, variables, options);
export const GetRelevantVcFirmsDocument = `
    query GetRelevantVCFirms($where: vc_firms_bool_exp!) {
  vc_firms(where: $where) {
    id
    logo
    name
    slug
    sentiment
  }
}
    `;
export const useGetRelevantVcFirmsQuery = <
      TData = GetRelevantVcFirmsQuery,
      TError = Error
    >(
      variables: GetRelevantVcFirmsQueryVariables,
      options?: UseQueryOptions<GetRelevantVcFirmsQuery, TError, TData>
    ) =>
    useQuery<GetRelevantVcFirmsQuery, TError, TData>(
      ['GetRelevantVCFirms', variables],
      fetcher<GetRelevantVcFirmsQuery, GetRelevantVcFirmsQueryVariables>(GetRelevantVcFirmsDocument, variables),
      options
    );
useGetRelevantVcFirmsQuery.document = GetRelevantVcFirmsDocument;


useGetRelevantVcFirmsQuery.getKey = (variables: GetRelevantVcFirmsQueryVariables) => ['GetRelevantVCFirms', variables];
;

useGetRelevantVcFirmsQuery.fetcher = (variables: GetRelevantVcFirmsQueryVariables, options?: RequestInit['headers']) => fetcher<GetRelevantVcFirmsQuery, GetRelevantVcFirmsQueryVariables>(GetRelevantVcFirmsDocument, variables, options);
export const GetAllVcFirmsDocument = `
    query GetAllVCFirms {
  vc_firms {
    id
    name
    logo
    slug
  }
}
    `;
export const useGetAllVcFirmsQuery = <
      TData = GetAllVcFirmsQuery,
      TError = Error
    >(
      variables?: GetAllVcFirmsQueryVariables,
      options?: UseQueryOptions<GetAllVcFirmsQuery, TError, TData>
    ) =>
    useQuery<GetAllVcFirmsQuery, TError, TData>(
      variables === undefined ? ['GetAllVCFirms'] : ['GetAllVCFirms', variables],
      fetcher<GetAllVcFirmsQuery, GetAllVcFirmsQueryVariables>(GetAllVcFirmsDocument, variables),
      options
    );
useGetAllVcFirmsQuery.document = GetAllVcFirmsDocument;


useGetAllVcFirmsQuery.getKey = (variables?: GetAllVcFirmsQueryVariables) => variables === undefined ? ['GetAllVCFirms'] : ['GetAllVCFirms', variables];
;

useGetAllVcFirmsQuery.fetcher = (variables?: GetAllVcFirmsQueryVariables, options?: RequestInit['headers']) => fetcher<GetAllVcFirmsQuery, GetAllVcFirmsQueryVariables>(GetAllVcFirmsDocument, variables, options);