import { ReactNode } from 'react';

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type GroupsTabType = 'my-groups' | 'discover' | 'joined';

export type GroupsTabItem = {
  id: GroupsTabType;
  name: string;
  disabled?: boolean;
};

export type Breadcrumb = {
  name: string;
  to?: string;
  component: string | ReactNode | JSX.Element;
};

export type Library = 'Web3' | 'AI';

export type LibraryTag = {
  id: Library;
  name: Library;
};

export type Tag = {
  id: string;
  name: string;
};

export type RadarAddressResponse = {
  latitude: number;
  longitude: number;
  country: string;
  countryCode: string;
  county: string;
  borough: string;
  city: string;
  number: string;
  neighborhood: string;
  postalCode: string;
  stateCode: string;
  state: string;
  street: string;
  layer: string;
  formattedAddress: string;
  placeLabel: string;
};
