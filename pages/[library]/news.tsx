import React, { useState, useEffect } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { useStateParams } from '@/hooks/use-state-params';
import { Pagination } from '@/components/pagination';
import { useRouter } from 'next/router';
import { ElemNewsCard } from '@/components/news/elem-news-card';
import { useIntercom } from 'react-use-intercom';
import { PlaceholderNewsCard } from '@/components/placeholders';
import { ElemButton } from '@/components/elem-button';
import { runGraphQl } from '@/utils';
import toast, { Toaster } from 'react-hot-toast';
import { IconAnnotation, IconSearch } from '@/components/icons';
import { ElemInviteBanner } from '@/components/invites/elem-invite-banner';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import {
  News,
  GetNewsDocument,
  GetNewsQuery,
  useGetNewsQuery,
  News_Bool_Exp,
  Order_By,
  News_Order_By,
} from '@/graphql/types';
import { DashboardCategory, DeepPartial } from '@/types/common';
import { useUser } from '@/context/user-context';
import ElemLibrarySelector from '@/components/elem-library-selector';
import {
  ISO_DATE_FORMAT,
  SWITCH_LIBRARY_ALLOWED_DOMAINS,
  SWITCH_LIBRARY_ALLOWED_EMAILS,
} from '@/utils/constants';
import useLibrary from '@/hooks/use-library';
import { onTrackView } from '@/utils/track';
import moment from 'moment-timezone';
import { ElemCategories } from '@/components/dashboard/elem-categories';
import { getPersonalizedData } from '@/utils/personalizedTags';
import { NewsByFilter } from '@/components/news/elem-news-by-filter';

const ITEMS_PER_PAGE = 8;

type Props = {
  newsCount: number;
  initialNews: GetNewsQuery['news'];
  newsTab: DashboardCategory[];
};

const NewsPage: NextPage<Props> = ({ newsCount, initialNews, newsTab }) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const router = useRouter();
  const { showNewMessages } = useIntercom();
  const { user, selectedLibrary } = useUser();
  const personalizedTags = getPersonalizedData({ user });

  const isDisplaySelectLibrary =
    user?.email &&
    (SWITCH_LIBRARY_ALLOWED_EMAILS.includes(user.email) ||
      SWITCH_LIBRARY_ALLOWED_DOMAINS.some(domain =>
        user.email.endsWith(domain),
      ));

  const [selectedTab, setSelectedTab] =
    useStateParams<DashboardCategory | null>(
      null,
      'tab',
      statusTag => (statusTag ? newsTab.indexOf(statusTag).toString() : ''),
      index => newsTab[Number(index)],
    );

  const [page, setPage] = useStateParams<number>(
    0,
    'page',
    pageIndex => pageIndex + 1 + '',
    pageIndex => Number(pageIndex) - 1,
  );
  const limit = 50;
  const offset = limit * page;

  const filters: DeepPartial<News_Bool_Exp> = {
    _and: [
      { status: { _eq: 'published' } },
      { library: { _contains: selectedLibrary } },
    ],
  };

  useEffect(() => {
    if (!initialLoad) {
      setPage(0);
    }
    if (initialLoad) {
      setInitialLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  useEffect(() => {
    onTrackView({
      properties: filters,
      pathname: router.pathname,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  if (selectedTab?.value === 'today') {
    filters._and?.push({
      date: { _eq: moment().format(ISO_DATE_FORMAT) },
    });
  }

  if (selectedTab?.value === '7days') {
    filters._and?.push({
      _and: [
        {
          date: { _gte: moment().subtract(7, 'days').format(ISO_DATE_FORMAT) },
        },
        { date: { _lte: moment().format(ISO_DATE_FORMAT) } },
      ],
    });
  }

  const {
    data: newsData,
    error,
    isLoading,
  } = useGetNewsQuery(
    {
      offset,
      limit,
      orderBy: [{ date: Order_By.Desc } as News_Order_By],
      where: filters as News_Bool_Exp,
    },
    { refetchOnWindowFocus: false },
  );

  if (!isLoading && initialLoad) {
    setInitialLoad(false);
  }

  const news = initialLoad ? initialNews : newsData?.news;
  const news_aggregate = initialLoad
    ? newsCount
    : newsData?.news_aggregate?.aggregate?.count || 0;

  const showPersonalized = user && !selectedTab;

  const pageTitle = `All ${user ? selectedLibrary : ''} news`;

  return (
    <DashboardLayout>
      <div className="relative">
        <div
          className="px-8 pt-0.5 py-3 flex flex-wrap gap-3 items-center justify-between lg:items-center"
          role="tablist"
        >
          <ElemCategories
            categories={newsTab}
            selectedCategory={selectedTab}
            onChangeCategory={setSelectedTab}
          />

          <div className="flex flex-wrap gap-2">
            {isDisplaySelectLibrary && !initialLoad && <ElemLibrarySelector />}
            {/* removed in qol-ui-fixes */}
            {/* {!selectedTab?.value && (
              <ElemDropdown
                IconComponent={IconSortDashboard}
                defaultItem={defaultOrderBy}
                items={sortChoices}
              />
            )} */}
          </div>
        </div>

        <ElemInviteBanner className="mx-8 my-3" />

        <div className="mx-8">
          {showPersonalized && (
            <div className="flex flex-col gap-4 gap-x-8">
              {personalizedTags.locationTags.map((location, index) => (
                <NewsByFilter
                  key={`${location}-${index}`}
                  headingText={`Trending in ${location}`}
                  itemsPerPage={ITEMS_PER_PAGE}
                  orderBy={{
                    updated_at: Order_By.Desc,
                  }}
                  filters={{
                    _or: [
                      {
                        organizations: {
                          company: {
                            location_json: {
                              _contains: {
                                city: `${location}`,
                              },
                            },
                          },
                        },
                      },
                      {
                        organizations: {
                          vc_firm: {
                            location_json: {
                              _contains: {
                                city: `${location}`,
                              },
                            },
                          },
                        },
                      },
                    ],
                  }}
                />
              ))}
            </div>
          )}

          {news?.length === 0 && (
            <div className="flex items-center justify-center mx-auto min-h-[40vh]">
              <div className="w-full max-w-2xl my-8 p-8 text-center bg-white border rounded-2xl border-dark-500/10">
                <IconSearch className="w-12 h-12 mx-auto text-slate-300" />
                <h2 className="mt-5 text-3xl font-bold">No results found</h2>
                <div className="mt-1 text-lg text-slate-600">
                  Please check spelling, try different filters, or tell us about
                  missing data.
                </div>
                <ElemButton
                  onClick={() =>
                    showNewMessages(
                      `Hi EdgeIn, I'd like to report missing data on ${router.pathname} page`,
                    )
                  }
                  btn="white"
                  className="mt-3"
                >
                  <IconAnnotation className="w-6 h-6 mr-1" />
                  Tell us about missing data
                </ElemButton>
              </div>
            </div>
          )}

          <div className="flex justify-between py-8">
            <div className="text-4xl font-medium">{pageTitle}</div>
          </div>

          <div className="grid gap-8 gap-x-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {error ? (
              <h4>Error loading news</h4>
            ) : isLoading && !initialLoad ? (
              <>
                {Array.from({ length: 6 }, (_, i) => (
                  <PlaceholderNewsCard key={i} />
                ))}
              </>
            ) : (
              news?.map(item => <ElemNewsCard key={item.id} newsPost={item} />)
            )}
          </div>

          <Pagination
            shownItems={news?.length}
            totalItems={news_aggregate}
            page={page}
            itemsPerPage={limit}
            onClickPrev={() => setPage(page - 1)}
            onClickNext={() => setPage(page + 1)}
            onClickToPage={selectedPage => setPage(selectedPage)}
          />
        </div>

        <Toaster />
      </div>
    </DashboardLayout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const { data: news } = await runGraphQl<GetNewsQuery>(GetNewsDocument, {
    offset: 0,
    limit: 50,
    orderBy: [{ text: Order_By.Asc }],
    where: {
      _and: [
        { status: { _eq: 'published' } },
        { library: { _contains: 'Web3' } },
      ],
    },
  });

  return {
    props: {
      metaTitle: 'Web3 News - EdgeIn.io',
      metaDescription:
        'Get the latest news, guides, price and analysis on Web3',
      newsCount: news?.news_aggregate?.aggregate?.count || 0,
      initialNews: news?.news || [],
      newsTab,
    },
    revalidate: 60 * 60 * 2,
  };
};

export async function getStaticPaths() {
  return {
    paths: ['/web3/news', '/ai/news'],
    fallback: false,
  };
}

export default NewsPage;

const newsTab: DashboardCategory[] = [
  {
    title: 'Today',
    value: 'today',
    description: 'desc',
    icon: '✨',
  },
  {
    title: 'Last 7 days',
    value: '7days',
    description: 'desc',
    icon: '🗓',
  },
];
