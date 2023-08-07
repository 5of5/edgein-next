import React, { useEffect, useState } from 'react';
import { useIntercom } from 'react-use-intercom';
import { ElemButton } from '../elem-button';
import {
  News,
  News_Bool_Exp,
  Order_By,
  useGetNewsArticlesQuery,
} from '@/graphql/types';
import { getQueryBySource } from '@/utils/news';
import ElemNewsHeading from './elem-news-heading';

type Props = {
  heading?: string;
  newsOrgSlug: string;
  news: News[] | undefined;
};

export const DEFAULT_LIMIT = 10;

const ElemNewsArticles: React.FC<Props> = ({
  heading,
  newsOrgSlug,
  news = [],
}) => {
  const [articles, setArticles] = useState<News[]>(news);

  const [page, setPage] = useState(0);

  const offset = DEFAULT_LIMIT * page;

  const sourceQuery = getQueryBySource(newsOrgSlug);

  const { data: newsArticles, isSuccess } = useGetNewsArticlesQuery({
    offset,
    limit: DEFAULT_LIMIT,
    order: Order_By.Desc,
    where: {
      _and: [{ status: { _eq: 'published' } }, { ...sourceQuery }],
    } as News_Bool_Exp,
  });

  const totalArticles = newsArticles?.news_aggregate?.aggregate?.count || 0;

  useEffect(() => {
    if (isSuccess && page > 0) {
      setArticles([...articles, ...(newsArticles.news as News[])]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, page]);

  const showMoreNews = () => {
    setPage(page + 1);
  };
  const { show } = useIntercom();

  return (
    <div>
      <div className="flex items-center justify-between px-4 pt-2">
        <h2 className="text-lg font-medium">{heading ? heading : 'News'}</h2>
      </div>

      <div className="p-4">
        {articles && articles.length > 0 ? (
          <>
            <ul className="flex flex-col">
              {articles.map(item => {
                return (
                  <li
                    key={item.id}
                    className="relative pl-6 overflow-hidden group last:-mb-4"
                  >
                    <ElemNewsHeading news={item} />
                  </li>
                );
              })}
            </ul>

            {articles.length < totalArticles && (
              <div className="mt-6">
                <ElemButton
                  btn="default"
                  onClick={showMoreNews}
                  className="w-full"
                >
                  Show More News
                </ElemButton>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center lg:p-5">
            <div className="text-gray-500 lg:text-xl">
              There is no recent news for this organization.
            </div>
            <ElemButton onClick={show} btn="default" className="mt-3">
              Request data or contribute
            </ElemButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElemNewsArticles;
