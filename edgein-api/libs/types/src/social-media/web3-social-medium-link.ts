import { Web3CompanyData } from '@app/types/company';
import {
  SocialMediumLink,
  Web3SocialMediumSource,
} from '@app/types/social-media';

export interface Web3SocialMediumLink
  extends Omit<SocialMediumLink, 'source' | 'company' | 'companyId'> {
  source: Web3SocialMediumSource;
  ref: string;
  web3CompanyId: string;
  web3Company: Web3CompanyData;
}
