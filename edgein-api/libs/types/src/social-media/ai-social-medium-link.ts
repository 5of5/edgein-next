import { AiCompanyData } from '@app/types/company';
import {
  AiSocialMediumSource,
  SocialMediumLink,
} from '@app/types/social-media';

export interface AiSocialMediumLink
  extends Omit<SocialMediumLink, 'source' | 'company' | 'companyId'> {
  source: AiSocialMediumSource;
  ref: string;
  aiCompanyId: string;
  aiCompany: AiCompanyData;
}
