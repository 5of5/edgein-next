import { IBaseEntity, Maybe } from '@app/database/types';
import { AiCompanyData } from '@app/types/company/ai-company-data';
import { CompanyPageLink } from '@app/types/company/company-page-link';
import { Web3CompanyData } from '@app/types/company/web3-company-data';
import { GeoPoint } from '@app/types/geo/geoPoint';
import { Location } from '@app/types/geo/location';
import { SocialMediumLink } from '@app/types/social-media';

export interface Company extends IBaseEntity {
  oldId: number;
  dateAdded: Date;
  name: string;
  slug: string;
  trajectory: number;
  totalEmployees: number;
  overview: string;
  notes: Maybe<string>;
  yearFounded: Maybe<number>;
  totalValuation: Maybe<number>;
  investorAmount: Maybe<number>;
  marketVerified: Maybe<string>;
  geoPoint: Maybe<GeoPoint>;
  location: Maybe<Location>;
  web3Data: Maybe<Web3CompanyData>;
  aiData: Maybe<AiCompanyData>;
  socialMediaLinks: SocialMediumLink[];
  pages: CompanyPageLink[];
}
