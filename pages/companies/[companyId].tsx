import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemCredibility } from '@/components/company/elem-credibility';
import { ElemKeyInfo } from '@/components/elem-key-info';
import { ElemInvestments } from '@/components/company/elem-investments';
import { ElemOrganizationTeam } from '@/components/elem-organization-team';
import { runGraphQl } from '@/utils';
import { ElemSubOrganizations } from '@/components/elem-sub-organizations';
import { ElemCohort } from '@/components/company/elem-cohort';
import { ElemTabBar } from '@/components/elem-tab-bar';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import { ElemButton } from '@/components/elem-button';
import { ElemSocialShare } from '@/components/elem-social-share';
import { ElemVelocity } from '@/components/company/elem-velocity';
import { ElemOrganizationActivity } from '@/components/elem-organization-activity';
import {
  Companies,
  GetCompanyBySlugDocument,
  GetCompanyBySlugQuery,
  Investment_Rounds,
  News,
  GetNewsArticlesQuery,
  GetNewsArticlesDocument,
  Order_By,
  useGetCompanyBySlugQuery,
} from '@/graphql/types';
import {
  COMPANY_PROFILE_DEFAULT_TAGS_LIMIT,
  tokenInfoMetrics,
} from '@/utils/constants';
import { convertToInternationalCurrencySystem } from '@/utils';
import { sortBy } from 'lodash';
import parse from 'html-react-parser';
import { stripHtmlTags } from '@/utils/text';
import { onTrackView } from '@/utils/track';
import ElemOrganizationNotes from '@/components/elem-organization-notes';
import ElemNewsArticles, {
  DEFAULT_LIMIT,
} from '@/components/news/elem-news-articles';
import { getQueryBySource } from '@/utils/news';
import ElemNewsList from '@/components/news/elem-news-list';
import { ElemTags } from '@/components/elem-tags';
import { useUser } from '@/context/user-context';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ElemReactions } from '@/components/elem-reactions';
import { ElemInviteBanner } from '@/components/invites/elem-invite-banner';
import { ROUTES } from '@/routes';
import { ElemLink } from '@/components/elem-link';
import { NextSeo } from 'next-seo';
import { USER_ROLES } from '@/utils/users';

type Props = {
  company: Companies;
  sortRounds: Investment_Rounds[];
  sortNews: News[];
  metrics: Metric[];
  newsArticles?: News[];
};

const Company: NextPage<Props> = (props: Props) => {
  const router = useRouter();
  const { user } = useUser();
  const { companyId } = router.query;
  const [company, setCompany] = useState<Companies>(props.company);

  const [tokenInfo, setTokenInfo] = useState<TokenInfo>({
    currentPrice: 0,
    marketCap: 0,
    marketCapRank: 0,
    low24H: 0,
    high24H: 0,
    vol24H: 0,
  });

  const [overviewMore, setOverviewMore] = useState(false);
  const overviewDiv = useRef() as MutableRefObject<HTMLDivElement>;
  const [overviewDivHeight, setOverviewDivHeight] = useState(0);
  const [overviewDivScrollHeight, setOverviewDivScrollHeight] = useState(0);

  const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
  const newsRef = useRef() as MutableRefObject<HTMLDivElement>;
  const activityRef = useRef() as MutableRefObject<HTMLDivElement>;
  const teamRef = useRef() as MutableRefObject<HTMLDivElement>;
  const investmentRef = useRef() as MutableRefObject<HTMLDivElement>;

  const {
    data: companyData,
    error,
    isLoading,
  } = useGetCompanyBySlugQuery({
    slug: companyId as string,
  });

  useEffect(() => {
    if (companyData) {
      onTrackView({
        resourceId: companyData?.companies[0]?.id,
        resourceType: 'companies',
        pathname: router.asPath,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyData]);

  const getTokenInfo = async (coinId: number) => {
    const data = await fetch('/api/get-metrics-amount/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coinId }),
    }).then(res => res.json());
    setTokenInfo(data);
  };

  const velocityToken =
    tokenInfo?.vol24H && tokenInfo?.marketCap
      ? Math.round((tokenInfo?.vol24H / tokenInfo?.marketCap) * 100) / 100
      : null;

  useEffect(() => {
    if (company.overview) {
      setOverviewDivHeight(overviewDiv.current.clientHeight);
      setOverviewDivScrollHeight(overviewDiv.current.scrollHeight);
    }
  }, [company]);

  useEffect(() => {
    if (company && company.coin) {
      getTokenInfo(company.coin.id);
    }
  }, [company]);

  useEffect(() => {
    if (companyData) setCompany(companyData?.companies[0] as Companies);
  }, [companyData]);

  if (!company) {
    return <h1>Not Found</h1>;
  }

  const sortedInvestmentRounds = props.sortRounds;

  const isNewsOrganization =
    props.newsArticles && props.newsArticles.length > 0;

  const hasNews = isNewsOrganization || props.sortNews.length > 0;

  // Company tags
  const companyTags: string[] = [];
  if (company.tags) {
    company.tags.map((tag: string, i: number) => [companyTags.push(tag)]);
  }

  const firstTag = company.tags ? company.tags[0] : '';
  const secondTag = company.tags ? company.tags[1] : '';

  // Tabs
  const tabBarItems = [
    { name: 'Overview', ref: overviewRef },
    { name: 'News', ref: newsRef },
    { name: 'Activity', ref: activityRef },
    { name: 'Team', ref: teamRef },
    {
      name: 'Investments',
      ref: investmentRef,
    },
  ];

  const parentLinks = company?.to_links?.find(
    item => item.link_type === 'child',
  );
  const parentOrganization =
    parentLinks?.from_company || parentLinks?.from_vc_firm;
  const subOrganizations = company?.from_links?.filter(
    item => item.link_type === 'child' && (item.to_company || item.to_vc_firm),
  );

  const metaWebsiteUrl = company.website ? `${company.website} ` : '';
  const organizationLibraries =
    company.library?.length > 0 ? company.library?.join(', ') : '';

  return (
    <>
      <NextSeo
        title={
          company.name
            ? `${company.name} Company Profile: ${organizationLibraries}, Investments, Contact Information, News, Activity, and Team`
            : ''
        }
        description={
          company.overview ? `${company.overview} ${metaWebsiteUrl}` : ''
        }
        openGraph={{
          images: [
            {
              url: 'https://edgein.io/social.jpg',
              width: 800,
              height: 600,
              alt: 'Company profile',
            },
            {
              url: company.logo?.url,
              alt: company.name ? company.name : 'Company profile',
            },
          ],
        }}
      />

      <DashboardLayout>
        <div className={`p-8 company-${company.id}`}>
          <div className="lg:grid lg:grid-cols-11 lg:gap-7 lg:items-center">
            <div className="col-span-3">
              <ElemPhoto
                photo={company.logo}
                wrapClass="flex items-center justify-center aspect-square shrink-0 rounded-lg border border-neutral-700 overflow-hidden p-2 max-w-40 lg:max-w-full"
                imgClass="object-contain w-full h-full"
                imgAlt={company.name}
                placeholder="company"
                placeholderClass="text-gray-300 w-full h-full m-12"
              />
            </div>
            <div className="w-full col-span-5 mt-7 lg:mt-0">
              <div className="shrink-0">
                <h1 className="self-end inline-block text-4xl font-medium">
                  {company.name}
                </h1>
                {company.coin && (
                  <div
                    key={company.coin.id}
                    className="ml-2 pb-0.5 inline-block self-end whitespace-nowrap uppercase"
                    title={`Token: ${company.coin.ticker}`}>
                    {company.coin.ticker}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <ElemReactions
                  resource={company}
                  resourceType={'companies'}
                  className="w-full sm:w-auto"
                />
                <ElemSaveToList
                  resourceName={company.name}
                  resourceId={company.id}
                  resourceType={'companies'}
                  slug={company.slug!}
                  follows={company.follows}
                />
                <ElemSocialShare
                  resourceName={company.name}
                  resourceTwitterUrl={company.twitter}
                />
              </div>

              <ElemTags
                className="mt-4"
                limit={COMPANY_PROFILE_DEFAULT_TAGS_LIMIT}
                resourceType={'companies'}
                tags={company.tags}
              />

              {parentOrganization && (
                <div className="mt-4">
                  <div className="text-sm font-medium">
                    Sub-organization of:
                  </div>
                  <ElemLink
                    href={`/${
                      parentLinks?.from_company ? 'companies' : 'investors'
                    }/${parentOrganization?.slug}`}
                    className="flex items-center gap-2 mt-1 group">
                    <ElemPhoto
                      photo={parentOrganization?.logo}
                      wrapClass="flex items-center justify-center w-10 aspect-square shrink-0 rounded-lg border  border-neutral-700"
                      imgClass="object-contain w-full h-full"
                      imgAlt={parentOrganization?.name}
                      placeholderClass="text-gray-300"
                    />
                    <h2 className="inline leading-tight transition-all border-b border-primary-500 group-hover:border-b-2 group-hover:text-primary-500">
                      {parentOrganization?.name}
                    </h2>
                  </ElemLink>
                </div>
              )}
              {company.overview && (
                <>
                  <div
                    ref={overviewDiv}
                    className={`mt-4 text-sm text-gray-500 ${
                      overviewMore ? '' : 'line-clamp-5'
                    }`}>
                    {parse(stripHtmlTags(company.overview))}
                  </div>

                  {overviewDivScrollHeight > overviewDivHeight && (
                    <ElemButton
                      onClick={() => setOverviewMore(!overviewMore)}
                      btn="transparent"
                      className="!px-0 !py-0 inline font-normal">
                      show {overviewMore ? 'less' : 'more'}
                    </ElemButton>
                  )}
                </>
              )}
              {user?.role === USER_ROLES.ADMIN && (
                <div className="mt-4">
                  <ElemButton
                    href={`${ROUTES.ADMIN_COMPANIES}/${company.id}`}
                    target="_blank"
                    btn="default">
                    Edit (admin)
                  </ElemButton>
                </div>
              )}
            </div>
            <div className="col-span-3 mt-7 lg:mt-0">
              {Object.values(tokenInfo).some(i => i > 0) && (
                <section className="p-4 bg-black border border-gray-300 rounded-lg md:mt-0">
                  <h2 className="font-medium">Token Info</h2>
                  <div className="flex flex-col my-3 space-y-3">
                    {props.metrics.map(item => {
                      let metricsClass = '';

                      if (item.id === 'currentPrice') {
                        metricsClass = 'text-green-600';
                      } else if (item.id === 'marketCap') {
                        metricsClass = 'text-green-600';
                      } else if (item.id === 'marketCapRank') {
                        metricsClass = '';
                      } else if (item.id === 'highLow24H') {
                        metricsClass = '';
                      } else if (item.id === 'vol24H') {
                        metricsClass = 'text-green-600';
                      } else {
                        metricsClass = '';
                      }
                      return (
                        <div
                          className="flex items-center justify-between space-x-2"
                          key={item.id}>
                          <div className="text-sm">{item.name}</div>
                          <div
                            className={`text-sm font-medium ${metricsClass}`}>
                            {tokenInfo[item.id as keyof TokenInfo]
                              ? `${
                                  item.id === 'marketCapRank' ? '#' : '$'
                                }${convertAmountRaised(
                                  tokenInfo[item.id as keyof TokenInfo],
                                )}`
                              : item.id === 'highLow24H'
                              ? `$${convertAmountRaised(
                                  tokenInfo.high24H,
                                )}/$${convertAmountRaised(tokenInfo.low24H)}`
                              : `N/A`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-xs text-center text-gray-500">
                    Token data source:{' '}
                    <a
                      href="https://mobula.io/?ref=edgeinio"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-slate-600">
                      AmberData
                    </a>{' '}
                    and Coingecko
                  </div>
                </section>
              )}
            </div>
          </div>

          <ElemInviteBanner className="mt-7" />
        </div>
        <ElemTabBar
          className="px-8 py-2"
          tabs={tabBarItems}
          resourceName={company.name}
          resourceUrl={`https://edgein.io${router.asPath}`}
        />

        <div className="px-8 mt-4">
          <div
            className="lg:grid lg:grid-cols-11 lg:gap-7"
            ref={overviewRef}
            id="overview">
            <div className="col-span-3">
              <ElemKeyInfo
                className="sticky top-28"
                heading="Key Info"
                website={company.website}
                totalFundingRaised={company.investor_amount}
                whitePaper={company.white_paper}
                totalEmployees={company.total_employees}
                careerPage={company.careers_page}
                yearFounded={company.year_founded}
                status_tags={company.status_tags}
                linkedIn={company.company_linkedin}
                web3Address={company.web3_address}
                github={company.github}
                twitter={company.twitter}
                locationJson={company.location_json}
                discord={company.discord}
                telegram={company.telegram}
                glassdoor={company.glassdoor}
              />
            </div>
            <div className="col-span-8">
              <div className="w-full mt-7 lg:mt-0">
                <ElemOrganizationNotes
                  resourceId={company.id}
                  resourceType="companies"
                  resourceName={company.name || ''}
                />
              </div>

              {(company.market_verified ||
                company.github ||
                company.company_linkedin ||
                company.velocity_linkedin ||
                company.velocity_token) && (
                <div className="mt-7 lg:grid lg:grid-cols-8 lg:gap-7">
                  <ElemCredibility
                    className="col-span-5 mt-7 lg:mt-0"
                    heading="Credibility"
                    marketVerified={company.market_verified}
                    githubVerified={company.github}
                    linkedInVerified={company.company_linkedin}
                  />
                  {(company.velocity_linkedin || velocityToken) && (
                    <ElemVelocity
                      className="col-span-3 mt-7 lg:mt-0"
                      heading="Velocity"
                      employeeListings={company.velocity_linkedin}
                      tokenExchangeValue={velocityToken}
                    />
                  )}
                </div>
              )}

              <div ref={newsRef} className="mt-7">
                {isNewsOrganization ? (
                  <ElemNewsArticles
                    heading={
                      isNewsOrganization
                        ? `News articles from ${company.name} feeds`
                        : 'News'
                    }
                    newsOrgSlug={company.slug}
                    news={props.newsArticles}
                  />
                ) : (
                  <ElemNewsList
                    heading="News"
                    resourceName={company.name || ''}
                    resourceUrl={`https://edgein.io${router.asPath}`}
                    news={props.sortNews}
                    resourceType="companies"
                    resourceId={company.id}
                  />
                )}
              </div>

              <div ref={activityRef} className="w-full mt-7">
                <ElemOrganizationActivity
                  resourceName={company.name || ''}
                  resourceType="companies"
                  resourceInvestments={sortedInvestmentRounds}
                />
              </div>
            </div>
          </div>

          <div ref={teamRef} className="mt-7">
            <ElemOrganizationTeam
              heading="Team"
              resourceName={company.name || ''}
              resourceType="companies"
              resourceId={company.id}
            />
          </div>

          <div ref={investmentRef} className="mt-7" id="investments">
            <ElemInvestments
              heading="Investments"
              resourceName={company.name || ''}
              investments={sortedInvestmentRounds}
            />
          </div>

          {subOrganizations?.length > 0 && (
            <ElemSubOrganizations
              className="mt-7"
              heading={`${company.name} Sub-Organizations (${subOrganizations.length})`}
              subOrganizations={subOrganizations}
            />
          )}

          {company.tags && (
            <ElemCohort
              className="mt-7"
              heading="Similar Companies"
              currentSlug={company.slug}
              tag1={firstTag}
              tag2={secondTag}
            />
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { data: companies } = await runGraphQl<GetCompanyBySlugQuery>(
    GetCompanyBySlugDocument,
    { slug: context.params?.companyId },
    context.req.cookies,
  );

  if (!companies?.companies[0]) {
    return {
      notFound: true,
    };
  }

  const company = sortBy(companies?.companies, 'status').reverse()[0];

  const sortRounds =
    company.investment_rounds
      ?.slice()
      .sort((a, b) => {
        return (
          new Date(a.round_date ?? '').getTime() -
          new Date(b.round_date ?? '').getTime()
        );
      })
      .reverse() || [];

  const sortNews =
    company.news_links
      ?.slice()
      ?.map(item => ({ ...item.news, type: 'news' }))
      ?.filter(item => item.status === 'published')
      .sort((a, b) => {
        return (
          new Date(a?.date ?? '').getTime() - new Date(b?.date ?? '').getTime()
        );
      })
      .reverse() || [];

  if (company.tags?.includes('News')) {
    const sourceQuery = getQueryBySource(context.params?.companyId as string);

    const { data: newsArticles } = await runGraphQl<GetNewsArticlesQuery>(
      GetNewsArticlesDocument,
      {
        offset: 0,
        limit: DEFAULT_LIMIT,
        order: Order_By.Desc,
        where: {
          _and: [{ status: { _eq: 'published' } }, { ...sourceQuery }],
        },
      },
      context.req.cookies,
    );

    return {
      props: {
        company,
        sortRounds,
        sortNews,
        metrics: tokenInfoMetrics,
        newsArticles: newsArticles?.news,
      },
    };
  }

  return {
    props: {
      company,
      sortRounds,
      sortNews,
      metrics: tokenInfoMetrics,
    },
  };
};
const convertAmountRaised = (theAmount: number) => {
  return convertToInternationalCurrencySystem(theAmount);
};
interface Metric {
  id: string;
  name: string;
}

interface TokenInfo {
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  low24H: number;
  high24H: number;
  vol24H: number;
}

export default Company;
