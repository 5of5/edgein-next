import { Company } from '@app/types/company/company';
import { CompanyPageSource } from '@app/types/company/company-page-source';

export interface CompanyPageLink {
  ref: string;
  source: CompanyPageSource;
  companyId: string;
  company: Company;
}
