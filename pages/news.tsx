import React, { useState, useEffect } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { useStateParams } from '@/hooks/use-state-params';
import { Pagination } from '@/components/pagination';
import { useRouter } from 'next/router';
import { ElemNewsCard } from '@/components/news/elem-news-card';
import { PlaceholderNewsCard } from '@/components/placeholders';
import { runGraphQl } from '../utils';
import { Toaster } from 'react-hot-toast';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import {
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
  TRENDING_CATEGORY_LIMIT,
} from '@/utils/constants';
import useLibrary from '@/hooks/use-library';
import { onTrackView } from '@/utils/track';
import moment from 'moment-timezone';
import { ElemCategories } from '@/components/dashboard/elem-categories';
import { NextSeo } from 'next-seo';
import { ElemFiltersWrap } from '@/components/filters/elem-filters-wrap';
import { NoResults } from '@/components/companies/no-results';
import { ElemInviteBanner } from '@/components/invites/elem-invite-banner';
import axios from 'axios';

type Props = {
  newsCount: number;
  initialNews: GetNewsQuery['news'];
  newsTab: DashboardCategory[];
};

const NewsPage: NextPage<Props> = ({ newsCount, initialNews, newsTab }) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [isLoader, setIsLoader] = useState(false);
  const [newses, setNewses] = useState();
  const [newsDetails, setNewsDetails] = useState();
  const router = useRouter();
  const { user } = useUser();
  const { query } = router;

  const isDisplaySelectLibrary =
    user?.email &&
    (SWITCH_LIBRARY_ALLOWED_EMAILS.includes(user.email) ||
      SWITCH_LIBRARY_ALLOWED_DOMAINS.some(domain =>
        user.email.endsWith(domain),
      ));

  const { selectedLibrary } = useLibrary();

  const [selectedTab, setSelectedTab] =
    useStateParams<DashboardCategory | null>(
      null,
      'tab',
      statusTag => (statusTag ? newsTab.indexOf(statusTag).toString() : ''),
      index => newsTab[Number(index)],
    );

  const [pageIndex, setPageIndex] = useStateParams<number>(
    0,
    'page',
    pageIndex => pageIndex + 1 + '',
    pageIndex => Number(pageIndex) - 1,
  );
  const limit = 50;
  const offset = limit * pageIndex;

  const filters: DeepPartial<News_Bool_Exp> = {
    _and: [
      { status: { _eq: 'published' } },
      { library: { _contains: selectedLibrary } },
    ],
  };

  //URL change edge case
  useEffect(() => {
    // Check if 'page' is present and is a number greater than 10
    const page = parseInt(query.page, 10);

    if (page > 10) {
      // Redirect to page 10 if it's above 10
      router.push('/news/?page=10');
    }
  }, [query.page, router]);

  useEffect(() => {
    if (!initialLoad) {
      setPageIndex(0);
    }
    if (initialLoad) {
      setInitialLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  useEffect(() => {
    // Fetch the news when the page index changes
    const fetchNews = async (page: number) => {
      setIsLoader(true);
      try {
        const response = await axios.get(
          `https://cryptopanic.com/api/pro/v1/posts/?auth_token=645c4c0d45faf64fdb16af8c822bc2effd4eee62&kind=news&page=${page}&metadata=true&approved=true`,
        );
        setNewses(response.data.results);
        setNewsDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsLoader(false);
      }
    };

    fetchNews(pageIndex + 1); // Fetch news when page changes
  }, [pageIndex]);

  useEffect(() => {
    onTrackView({
      properties: filters,
      pathname: router.pathname,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  if (selectedTab?.value === 'trending') {
    filters._and?.push({
      num_of_views: { _is_null: false },
    });
  }

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

  const getLimit = () => {
    if (selectedTab?.value === 'trending') {
      return TRENDING_CATEGORY_LIMIT;
    }

    return limit;
  };

  const {
    data: newsData,
    error,
    isLoading,
  } = useGetNewsQuery(
    {
      offset,
      limit: getLimit(),
      orderBy: [
        selectedTab?.value === 'trending'
          ? ({ num_of_views: Order_By.Desc } as News_Order_By)
          : ({ date: Order_By.Desc } as News_Order_By),
      ],
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

  // const getTotalItems = () => {
  //   if (selectedTab?.value === 'trending') {
  //     return TRENDING_CATEGORY_LIMIT;
  //   }

  //   return news_aggregate;
  // };

  const onPreviousPage = () => {
    setPageIndex(pageIndex - 1);
  };
  const onNextPage = () => {
    if (newsDetails?.next !== null) setPageIndex(pageIndex + 1);
  };

  const pageTitle = `All Latest news`;
  // selectedTab?.value === '7days'
  //   ? `${user ? `${selectedLibrary} news` : 'News'} from the last 7 days`
  //   : `${selectedTab?.title || 'All'} ${user ? selectedLibrary : ''} news`;

  return (
    <>
      <NextSeo
        title={`${selectedLibrary} News`}
        description={`EdgeIn provides the latest ${selectedLibrary} news and trends. Explore industry research and reports from the frontline of ${selectedLibrary} technology news. Discover an index of the most active and influential capital in the industry.`}
      />
      <DashboardLayout>
        <div className="relative">
          <ElemFiltersWrap resultsTotal={newses?.count}>
            {/* <ElemCategories
              categories={newsTab}
              selectedCategory={selectedTab}
              onChangeCategory={setSelectedTab}
            /> */}

            {/* <div className="hidden lg:block lg:ml-auto"></div>
            {isDisplaySelectLibrary && (
              <div>
                <h3 className="mb-1 font-medium lg:hidden">Library</h3>
                <ElemLibrarySelector />
              </div>
            )} */}

            {/* removed in qol-ui-fixes */}
            {/* {!selectedTab?.value && (
              <ElemDropdown
                ButtonIcon={IconSortDashboard}
                defaultItem={defaultOrderBy}
                items={sortChoices}
              />
            )} */}
          </ElemFiltersWrap>

          <ElemInviteBanner className="mx-8 mt-3" />

          <div className="mx-8">
            <div className="flex flex-col gap-8 mt-6">
              <div>
                <div className="flex justify-between py-8">
                  <div className="text-4xl font-medium">{pageTitle}</div>
                </div>
                {error ? (
                  <h4>Error loading news</h4>
                ) : isLoading && !initialLoad ? (
                  <div className="grid grid-cols-1 gap-8 gap-x-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {Array.from({ length: 6 }, (_, i) => (
                      <PlaceholderNewsCard key={i} />
                    ))}
                  </div>
                ) : newses?.length != 0 ? (
                  <>
                    <div className="grid grid-cols-1 gap-8 gap-x-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                      {newses?.map(item => (
                        <ElemNewsCard key={item.id} newsPost={item} />
                      ))}
                    </div>
                    <Pagination
                      shownItems={newses?.length}
                      totalItems={parseInt(newsDetails?.count)}
                      page={pageIndex}
                      itemsPerPage={20}
                      onClickPrev={onPreviousPage}
                      onClickNext={onNextPage}
                      isNext={newsDetails?.next}
                      onClickToPage={selectedPage => setPageIndex(selectedPage)}
                    />
                  </>
                ) : (
                  <NoResults />
                )}
              </div>
            </div>
          </div>

          <Toaster />
        </div>
      </DashboardLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
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
      newsCount: news?.news_aggregate?.aggregate?.count || 0,
      initialNews: news?.news || [],
      newsTab,
    },
    revalidate: 60 * 60 * 2,
  };
};

export default NewsPage;

const newsTab: DashboardCategory[] = [
  {
    title: 'Trending',
    value: 'trending',
    icon: '🔥',
  },
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
