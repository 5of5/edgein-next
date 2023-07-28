import { Maybe } from '@app/database/types';

export interface Location {
  country: string;
  state: Maybe<string>;
  city: string;
  address: Maybe<string>;
}
