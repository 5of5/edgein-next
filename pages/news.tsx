import React, { useState, Fragment } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { useStateParams } from '@/hooks/use-state-params';
import { Pagination } from '@/components/pagination';
import { useRouter } from 'next/router';
import { ElemNewsCard } from '@/components/news/elem-news-card';
import { useIntercom } from 'react-use-intercom';
import { PlaceholderNewsCard } from '@/components/placeholders';
import { ElemButton } from '@/components/elem-button';
import { runGraphQl } from '../utils';
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
import { DeepPartial } from '@/types/common';
import { useUser } from '@/context/user-context';
import ElemLibrarySelector from '@/components/elem-library-selector';
import {
  SWITCH_LIBRARY_ALLOWED_DOMAINS,
  SWITCH_LIBRARY_ALLOWED_EMAILS,
} from '@/utils/constants';
import useLibrary from '@/hooks/use-library';
import { ElemDropdown } from '@/components/elem-dropdown';
import useDashboardSortBy from '@/hooks/use-dashboard-sort-by';

type Props = {
  newsCount: number;
  initialNews: GetNewsQuery['news'];
  newsStatusTags: TextFilter[];
};

const NewsPage: NextPage<Props> = ({
  newsCount,
  initialNews,
  newsStatusTags,
}) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const router = useRouter();
  const { show } = useIntercom();
  const { user, listAndFollows, myGroups } = useUser();

  const isDisplaySelectLibrary =
    user?.email &&
    (SWITCH_LIBRARY_ALLOWED_EMAILS.includes(user.email) ||
      SWITCH_LIBRARY_ALLOWED_DOMAINS.some(domain =>
        user.email.endsWith(domain),
      ));

  const { selectedLibrary } = useLibrary();

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

  const { sortChoices, orderByParam, orderByQuery } =
    useDashboardSortBy<News_Order_By>({
      ascendingSortKey: 'text',
      descendingSortKey: 'text',
      newestSortKey: 'date',
      oldestSortKey: 'date',
    });

  const defaultOrderBy = sortChoices.find(
    sortItem => sortItem.value === orderByParam,
  )?.id;

  const {
    data: newsData,
    error,
    isLoading,
  } = useGetNewsQuery({
    offset,
    limit,
    orderBy: [orderByQuery],
    where: filters as News_Bool_Exp,
  });

  if (!isLoading && initialLoad) {
    setInitialLoad(false);
  }

  const news = initialLoad ? initialNews : newsData?.news;
  const news_aggregate = initialLoad
    ? newsCount
    : newsData?.news_aggregate?.aggregate?.count || 0;

  return (
    <DashboardLayout>
      <div className="relative">
        <div
          className="relative mb-4 px-4 py-3 flex items-center justify-between border-b border-gray-200"
          role="tablist"
        >
          <nav className="flex space-x-2 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x">
            {newsStatusTags &&
              newsStatusTags.map((tab: any, index: number) =>
                tab.disabled === true ? (
                  <Fragment key={index}></Fragment>
                ) : (
                  <ElemButton
                    key={index}
                    // onClick={() => setSelectedStatusTag(tab)}
                    btn="gray"
                    roundedFull={false}
                    className="rounded-lg"
                  >
                    {tab.icon && <div className="w-5 h-5">{tab.icon}</div>}
                    {tab.title}
                  </ElemButton>
                ),
              )}
          </nav>

          <div className="flex space-x-2">
            {/* {isDisplaySelectLibrary &&  */}
            <ElemLibrarySelector />
            {/* } */}

            <ElemDropdown defaultItem={defaultOrderBy} items={sortChoices} />
          </div>
        </div>

        <ElemInviteBanner className="mt-3 mx-4" />

        <div className="mt-6 px-4">
          <div className="mt-3 grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {error ? (
              <h4>Error loading news</h4>
            ) : isLoading && !initialLoad ? (
              <>
                {Array.from({ length: 6 }, (_, i) => (
                  <PlaceholderNewsCard key={i} />
                ))}
              </>
            ) : (
              news?.map(item => (
                <ElemNewsCard
                  key={item.id}
                  newsPost={item}
                  //tagOnClick={filterByTag}
                />
              ))
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
      newsStatusTags,
    },
  };
};

export default NewsPage;

interface TextFilter {
  title: string;
  value: string;
  description?: string;
  icon?: string;
}

const newsStatusTags: TextFilter[] = [
  {
    title: 'Today',
    value: 'today',
    description: 'desc',
    icon: '✨',
  },
  {
    title: 'This week',
    value: 'week',
    description: 'desc',
    icon: '🗓',
  },
];
