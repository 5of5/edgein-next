import { Scalars } from '@/graphql/types';


export type DataPartners = {
  id?: Scalars['Int'],
  name: Scalars['String'],
  api_key: Scalars['String']
}

export type DataRaw = {
  id?: Scalars['Int'],
  partner: Scalars['Int'],
  resource: Scalars['String'],
  resource_id: Scalars['Int'],
  field: Scalars['String'],
  value: Scalars['jsonb'],
  created_at?: Scalars['timestamptz'],
  accuracy_weight: Scalars['Int'],
}
