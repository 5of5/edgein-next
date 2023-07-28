import { Company } from '@app/types/company/company';
import { AiSocialMediumLink } from '@app/types/social-media';

export enum AiTags {
  Api = 'API',
  OpenSource = 'Open Source',
  ModelCreator = 'Model Creator',
  ModelHub = 'Model Hub',
  End2End = 'End 2 End',
  InfrastructureProvider = 'Infrastructure Provider',
  B2B = 'B2B',
  B2C = 'B2C',
  Image = 'Image',
  Text = 'Text',
  Code = 'Code',
  Video = 'Video',
  Audio = 'Audio',
  MultiModal = 'Multi-modal',
}

export interface AiCompanyData {
  companyId: string;
  company: Company;
  socialMediaLinks: AiSocialMediumLink[];
  tags: AiTags[];
}
