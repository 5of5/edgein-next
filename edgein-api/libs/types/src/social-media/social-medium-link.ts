import { Company } from '@app/types/company';
import { SocialMediumSource } from '@app/types/social-media';

export interface SocialMediumLink {
  source: SocialMediumSource;
  ref: string;
  companyId: string;
  company: Company;
}
