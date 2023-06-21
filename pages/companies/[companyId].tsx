import React, { useEffect, useState, MutableRefObject, useRef } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemCredibility } from '@/components/company/elem-credibility';
import { ElemKeyInfo } from '@/components/elem-key-info';
import { ElemTags } from '@/components/elem-tags';
import { ElemInvestments } from '@/components/company/elem-investments';
import { ElemTeamGrid } from '@/components/company/elem-team-grid';
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
  GetCompanyDocument,
  GetCompanyQuery,
  Investment_Rounds,
  News,
  useGetCompanyQuery,
  GetNewsArticlesQuery,
  GetNewsArticlesDocument,
  Order_By,
} from '@/graphql/types';
import { ElemReactions } from '@/components/elem-reactions';
import { useAuth } from '@/hooks/use-auth';
import { companyLayerChoices, tokenInfoMetrics } from '@/utils/constants';
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
import ElemCompanyTags from '@/components/elem-company-tags';

type Props = {
  company: Companies;
  sortRounds: Investment_Rounds[];
  sortNews: News[];
  metrics: Metric[];
  newsArticles?: News[];
  setToggleFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPopup: React.Dispatch<React.SetStateAction<Popups>>;
};

const Company: NextPage<Props> = (props: Props) => {
  const { user } = useAuth();
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

  const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
  const newsRef = useRef() as MutableRefObject<HTMLDivElement>;
  const teamRef = useRef() as MutableRefObject<HTMLDivElement>;
  const investmentRef = useRef() as MutableRefObject<HTMLDivElement>;

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
      setOverviewDivHeight(overviewDiv.current.scrollHeight);
    }
  }, [company]);

  useEffect(() => {
    if (company && company.coin) {
      getTokenInfo(company.coin.id);
    }
  }, [company]);

  useEffect(() => {
    if (companyData) setCompany(companyData?.companies[0] as any);
  }, [companyData]);

  if (!company) {
    return <h1>Not Found</h1>;
  }

  const sortedInvestmentRounds = props.sortRounds;

  const isNewsOrganization =
    props.newsArticles && props.newsArticles.length > 0;

  const hasNewsTab = isNewsOrganization || props.sortNews.length > 0;

  // Company tags
  const companyTags: string[] = [];
  if (company.layer) {
    const layer = companyLayerChoices.find(layer => layer.id === company.layer);
    companyTags.unshift(layer ? layer.name : company.layer);
  }
  if (company.tags) {
    company.tags.map((tag: string, i: number) => [companyTags.push(tag)]);
  }

  const firstTag = company.tags ? company.tags[0] : '';
  const secondTag = company.tags ? company.tags[1] : '';

  // Tabs
  const tabBarItems = [{ name: 'Overview', ref: overviewRef }];
  if (hasNewsTab) {
    tabBarItems.push({ name: 'News', ref: newsRef });
  }
  if (company.teamMembers.length > 0) {
    tabBarItems.push({ name: 'Team', ref: teamRef });
  }
  if (sortedInvestmentRounds.length > 0) {
    tabBarItems.push({
      name: 'Investments',
      ref: investmentRef,
    });
  }

  const parentLinks = company?.to_links?.find(
    item => item.link_type === 'child',
  );
  const parentOrganization =
    parentLinks?.from_company || parentLinks?.from_vc_firm;
  const subOrganizations = company?.from_links?.filter(
    item => item.link_type === 'child',
  );

  const handleTagClick = (
    event: React.MouseEvent<HTMLDivElement>,
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
    <>
      <div className="w-full bg-gradient-to-b from-transparent to-white shadow pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-11 lg:gap-7">
            <div className="col-span-3">
              <ElemPhoto
                photo={company.logo}
                wrapClass="flex items-center justify-center aspect-square shrink-0 p-5 bg-white rounded-lg border border-black/10"
                imgClass="object-contain w-full h-full"
                imgAlt={company.name}
                placeholderClass="text-slate-300"
              />
            </div>
            <div className="w-full col-span-5 mt-7 lg:mt-4">
              <div className="shrink-0">
                <h1 className="self-end inline-block text-4xl font-bold md:text-5xl">
                  {company.name}
                </h1>
                {company.coin && (
                  <div
                    key={company.coin.id}
                    className="ml-2 pb-0.5 inline-block self-end whitespace-nowrap text-lg leading-sm uppercase"
                    title={`Token: ${company.coin.ticker}`}
                  >
                    {company.coin.ticker}
                  </div>
                )}
              </div>

              <ElemCompanyTags
                company={company}
                className="mt-4"
                hideLayer
                tagOnClick={handleTagClick}
              />

              {parentOrganization && (
                <div className="mt-4">
                  <div className="font-bold text-sm">Sub-organization of:</div>
                  <Link
                    href={`/${
                      parentLinks?.from_company ? 'companies' : 'investors'
                    }/${parentOrganization?.slug}`}
                    passHref
                  >
                    <a className="flex items-center gap-2 mt-1 group">
                      <ElemPhoto
                        photo={parentOrganization?.logo}
                        wrapClass="flex items-center justify-center w-10 aspect-square shrink-0 p-1 bg-white rounded-lg shadow group-hover:opacity-60"
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
                    className={`mt-4 text-base text-slate-600 prose ${
                      overviewMore ? '' : 'line-clamp-3'
                    }`}
                  >
                    {parse(stripHtmlTags(company.overview))}
                  </div>

                  {overviewDivHeight > 84 && (
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
              <div className="flex flex-wrap items-center mt-4 gap-x-5 gap-y-3 sm:gap-y-0">
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
                />
                <ElemSocialShare
                  resourceName={company.name}
                  resourceTwitterUrl={company.twitter}
                />
              </div>
            </div>
            <div className="col-span-3 mt-7 lg:mt-0">
              {Object.values(tokenInfo).some(i => i > 0) && (
                <section className="bg-white border border-black/10 rounded-lg p-5 md:mt-0">
                  <h2 className="text-xl font-bold">Token Info</h2>
                  <div className="flex flex-col space-y-2 mt-2">
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
                          <div>{item.name}</div>
                          <div
                            className={`${metricsClass} text-sm font-semibold py-1 px-2`}
                          >
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
                  <div className="mt-3 text-xs text-center text-slate-400">
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
            className="mt-7 border-b-0"
            tabs={tabBarItems}
            resourceName={company.name}
          />
        </div>
      </div>

      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
        <div
          className="mt-7 lg:grid lg:grid-cols-11 lg:gap-7"
          ref={overviewRef}
          id="overview"
        >
          <div className="col-span-3">
            <ElemKeyInfo
              className="sticky top-11"
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
            <div className="w-full mt-7 p-5 bg-slate-200  rounded-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.07)] lg:mt-0">
              <ElemOrganizationNotes
                resourceId={company.id}
                resourceType="companies"
                setShowPopup={props.setShowPopup}
              />
            </div>

            {(company.market_verified ||
              company.github ||
              company.company_linkedin ||
              company.velocity_linkedin ||
              company.velocity_token) && (
              <div className="mt-7 lg:grid lg:grid-cols-8 lg:gap-7">
                <ElemCredibility
                  className="col-span-5 mt-7 p-5 bg-white shadow rounded-lg lg:mt-0"
                  heading="Credibility"
                  marketVerified={company.market_verified}
                  githubVerified={company.github}
                  linkedInVerified={company.company_linkedin}
                />
                {(company.velocity_linkedin || velocityToken) && (
                  <ElemVelocity
                    className="col-span-3 mt-7 p-5 bg-white shadow rounded-lg lg:mt-0"
                    heading="Velocity"
                    employeeListings={company.velocity_linkedin}
                    tokenExchangeValue={velocityToken}
                  />
                )}
              </div>
            )}

            {hasNewsTab && (
              <div
                ref={newsRef}
                className="w-full mt-7 p-5 bg-white shadow rounded-lg"
              >
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
                    news={props.sortNews}
                    resourceType="companies"
                    resourceId={company.id}
                  />
                )}
              </div>
            )}

            <div className="w-full mt-7 p-5 bg-white shadow rounded-lg">
              <ElemOrganizationActivity
                resourceType="companies"
                resourceInvestments={sortedInvestmentRounds}
              />
            </div>
          </div>
        </div>

        {company.teamMembers.length > 0 && (
          <div
            ref={teamRef}
            className="mt-7 p-5 rounded-lg bg-white shadow"
            id="team"
          >
            <ElemTeamGrid
              showEdit={false}
              heading="Team"
              people={company.teamMembers}
            />
          </div>
        )}

        {sortedInvestmentRounds.length > 0 && (
          <div
            ref={investmentRef}
            className="mt-7 p-5 rounded-lg bg-white shadow"
            id="investments"
          >
            <ElemInvestments
              showEdit={false}
              heading="Investments"
              investments={sortedInvestmentRounds}
            />
          </div>
        )}

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
    </>
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

  let metaTitle = null;
  if (company.name) {
    metaTitle =
      company.name +
      ' Company Profile: Credibility, Velocity & Investors - EdgeIn.io';
  }
  let metaDescription = null;
  if (company.overview) {
    metaDescription = company.overview;
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
