import React, { useState } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { useStateParams } from '@/hooks/use-state-params';
import { Pagination } from '@/components/pagination';
import { useRouter } from 'next/router';
import { ElemHeading } from '@/components/elem-heading';
import { ElemNewsCard } from '@/components/news/elem-news-card';
import { useIntercom } from 'react-use-intercom';
import { PlaceholderNewsCard } from '@/components/placeholders';
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
} from '@/graphql/types';
import { DeepPartial } from '@/types/common';
import useLibrary from '@/hooks/use-library';

type Props = {
  newsCount: number;
  initialNews: GetNewsQuery['news'];
};

const NewsPage: NextPage<Props> = ({ newsCount, initialNews }) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const router = useRouter();
  const { show } = useIntercom();

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

  const {
    data: newsData,
    error,
    isLoading,
  } = useGetNewsQuery({
    offset,
    limit,
    order: Order_By.Desc,
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
      <div className="relative overflow-hidden">
        <ElemInviteBanner />

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
          numeric
          onClickPrev={() => setPage(page - 1)}
          onClickNext={() => setPage(page + 1)}
          onClickToPage={selectedPage => setPage(selectedPage)}
        />

        <Toaster />
      </div>
    </DashboardLayout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const { data: news } = await runGraphQl<GetNewsQuery>(GetNewsDocument, {
    offset: 0,
    limit: 50,
    order: Order_By.Desc,
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
    },
  };
};

export default NewsPage;
