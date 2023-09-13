import React, { useEffect, useState, MutableRefObject, useRef } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemCredibility } from '@/components/company/elem-credibility';
import { ElemKeyInfo } from '@/components/elem-key-info';
import { ElemInvestments } from '@/components/company/elem-investments';
import { ElemOrganizationTeam } from '@/components/elem-organization-team';
import { runGraphQl, getCityAndCountry, toSentence } from '@/utils';
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
  GetCompanyDocument,
  GetCompanyQuery,
  Investment_Rounds,
  News,
  useGetCompanyQuery,
  GetNewsArticlesQuery,
  GetNewsArticlesDocument,
  Order_By,
} from '@/graphql/types';
// import { ElemReactions } from '@/components/elem-reactions';
import { tokenInfoMetrics } from '@/utils/constants';
import { convertToInternationalCurrencySystem } from '@/utils';
import { sortBy } from 'lodash';
import parse from 'html-react-parser';
import { stripHtmlTags } from '@/utils/text';
import { onTrackView } from '@/utils/track';
import ElemOrganizationNotes from '@/components/elem-organization-notes';
import { Popups } from '@/components/the-navbar';
import ElemNewsArticles, {
  DEFAULT_LIMIT,
} from '@/components/news/elem-news-articles';
import { getQueryBySource } from '@/utils/news';
import ElemNewsList from '@/components/news/elem-news-list';
import { ElemTags } from '@/components/elem-tags';
import { useUser } from '@/context/user-context';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ElemReactions } from '@/components/elem-reactions';
import useEmptyLibrary from '@/hooks/use-empty-library';

type Props = {
  company: Companies;
  sortRounds: Investment_Rounds[];
  sortNews: News[];
  metrics: Metric[];
  newsArticles?: News[];
};

const Company: NextPage<Props> = (props: Props) => {
  const router = useRouter();
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

  const { selectedLibrary } = useUser();

  const {
    data: companyData,
    error,
    isLoading,
  } = useGetCompanyQuery({
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

  useEmptyLibrary('companies', company.library, company.slug);

  useEffect(() => {
    if (companyData) setCompany(companyData?.companies[0] as any);
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
    item => item.link_type === 'child',
  );

  const handleTagClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    tag: string,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    router.push(
      `/companies/?filters=${encodeURIComponent(
        `{"industry":{"tags":["${tag}"]}}`,
      )}`,
    );
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="lg:grid lg:grid-cols-11 lg:gap-7 lg:items-center">
          <div className="col-span-3">
            <ElemPhoto
              photo={company.logo}
              wrapClass="flex items-center justify-center aspect-square shrink-0 rounded-lg border border-gray-200 overflow-hidden"
              imgClass="object-contain w-full h-full"
              imgAlt={company.name}
              placeholderClass="text-slate-300"
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
                  title={`Token: ${company.coin.ticker}`}
                >
                  {company.coin.ticker}
                </div>
              )}
            </div>

            <ElemTags
              className="mt-4"
              resourceType={'companies'}
              tags={company.tags}
            />

            {parentOrganization && (
              <div className="mt-4">
                <div className="font-medium text-sm">Sub-organization of:</div>
                <Link
                  href={`/${
                    parentLinks?.from_company ? 'companies' : 'investors'
                  }/${parentOrganization?.slug}`}
                  passHref
                >
                  <a className="flex items-center gap-2 mt-1 group">
                    <ElemPhoto
                      photo={parentOrganization?.logo}
                      wrapClass="flex items-center justify-center w-10 aspect-square shrink-0 rounded-lg border border-gray-200"
                      imgClass="object-contain w-full h-full"
                      imgAlt={parentOrganization?.name}
                      placeholderClass="text-slate-300"
                    />
                    <h2 className="inline leading-tight border-b border-primary-500 transition-all group-hover:border-b-2 group-hover:text-primary-500">
                      {parentOrganization?.name}
                    </h2>
                  </a>
                </Link>
              </div>
            )}
            {company.overview && (
              <>
                <div
                  ref={overviewDiv}
                  className={`mt-4 text-sm text-gray-500 ${
                    overviewMore ? '' : 'line-clamp-5'
                  }`}
                >
                  {parse(stripHtmlTags(company.overview))}
                </div>

                {overviewDivScrollHeight > overviewDivHeight && (
                  <ElemButton
                    onClick={() => setOverviewMore(!overviewMore)}
                    btn="transparent"
                    className="!px-0 !py-0 inline font-normal"
                  >
                    show {overviewMore ? 'less' : 'more'}
                  </ElemButton>
                )}
              </>
            )}
            <div className="flex flex-wrap items-center mt-4 gap-3">
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
          </div>
          <div className="col-span-3 mt-7 lg:mt-0">
            {Object.values(tokenInfo).some(i => i > 0) && (
              <section className="bg-white border border-gray-300 rounded-lg p-4 md:mt-0">
                <h2 className="font-medium">Token Info</h2>
                <div className="flex flex-col space-y-3 my-3">
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
                        key={item.id}
                      >
                        <div className="text-sm">{item.name}</div>
                        <div className={`text-sm font-medium ${metricsClass}`}>
                          {tokenInfo[item.id as keyof TokenInfo]
                            ? item.id === 'highLow24H'
                              ? `$${convertAmountRaised(
                                  tokenInfo.high24H,
                                )}/$${convertAmountRaised(tokenInfo.low24H)}`
                              : `${
                                  item.id === 'marketCapRank' ? '#' : '$'
                                }${convertAmountRaised(
                                  tokenInfo[item.id as keyof TokenInfo],
                                )}`
                            : `N/A`}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-xs text-center text-gray-500">
                  Token data source:{' '}
                  <a
                    href="https://www.amberdata.io/?ref=edgeinio"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-slate-600"
                  >
                    AmberData
                  </a>{' '}
                  and Coingecko
                </div>
              </section>
            )}
          </div>
        </div>
        <ElemTabBar
          className="mt-7"
          tabs={tabBarItems}
          resourceName={company.name}
        />
      </div>

      <div className="px-8">
        <div
          className="lg:grid lg:grid-cols-11 lg:gap-7"
          ref={overviewRef}
          id="overview"
        >
          <div className="col-span-3">
            <ElemKeyInfo
              className="sticky top-16"
              heading="Key Info"
              website={company.website}
              totalFundingRaised={company.investor_amount}
              whitePaper={company.white_paper}
              totalEmployees={company.total_employees}
              careerPage={company.careers_page}
              yearFounded={company.year_founded}
              linkedIn={company.company_linkedin}
              github={company.github}
              twitter={company.twitter}
              location={company.location}
              locationJson={company.location_json}
              discord={company.discord}
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
            people={company.teamMembers}
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
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { data: companies } = await runGraphQl<GetCompanyQuery>(
    GetCompanyDocument,
    { slug: context.params?.companyId },
    context.req.cookies,
  );

  if (!companies?.companies[0]) {
    return {
      notFound: true,
    };
  }

  const company = sortBy(companies?.companies, 'status').reverse()[0];

  if (company.library[0]?.toLowerCase() !== context.params?.library) {
    return {
      notFound: true,
    };
  }

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

  // Meta
  const metaWebsiteUrl = company.website || null;
  const metaFounded = company.year_founded
    ? `Founded in ${company.year_founded} `
    : '';

  const metaLocation = getCityAndCountry(
    company.location_json?.city,
    company.location_json?.country,
  );

  const metaEmployees = company.total_employees
    ? `${company.total_employees} Employees | `
    : '';

  const metaTags =
    company.tags?.length > 0 ? `Category ${toSentence(company.tags)} | ` : '';

  let metaTitle = null;
  if (company.name) {
    metaTitle = `${company.name} | EdgeIn ${company.library[0]} Company Profile - Contact Information`;
  }

  let metaDescription = null;
  if (
    metaWebsiteUrl ||
    metaFounded ||
    metaLocation ||
    metaEmployees ||
    metaTags ||
    company.overview
  ) {
    metaDescription = `${metaWebsiteUrl} ${metaFounded}${metaLocation}${metaEmployees}${metaTags}${company.overview}`;
  }

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
        metaTitle,
        metaDescription,
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
      metaTitle,
      metaDescription,
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
