export enum CompanyPageSource {
  WebSite = 'WebSite',
  Careers = 'Careers',
}

export const CompanyPageLinkMigrationAttribute: Record<
  CompanyPageSource,
  string
> = {
  [CompanyPageSource.Careers]: 'careers_page',
  [CompanyPageSource.WebSite]: 'website',
};
