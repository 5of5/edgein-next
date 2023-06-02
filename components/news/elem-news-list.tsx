import React, { useState } from 'react';
import { News } from '@/graphql/types';
import { ElemButton } from '../elem-button';
import ElemNewsHeading from './elem-news-heading';

type Props = {
  heading?: string;
  resourceType: 'companies' | 'vc_firms' | 'people';
  news: News[];
  resourceId?: number;
};

const ElemNewsList: React.FC<Props> = ({
  heading,
  resourceType,
  news,
  resourceId,
}) => {
  const [limit, setLimit] = useState(10);
  const showMore = () => {
    setLimit(limit + 10);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-2 border-b border-black/10">
        <h2 className="text-xl font-bold">{heading ? heading : 'News'}</h2>
      </div>

      <div className="py-4">
        <>
          <ul className="flex flex-col">
            {news.slice(0, limit).map(item => {
              let isPublisher = false;
              let isAuthor = false;

              if (resourceType === 'people') {
                const newsPersonType = item.people.find(
                  (person: any) => person.person_id === resourceId,
                )?.type;
                isAuthor = newsPersonType === 'author';
              } else {
                const newsOrganizationType = item.organizations.find(
                  (item: any) =>
                    item[
                      resourceType === 'companies' ? 'company_id' : 'vc_firm_id'
                    ] === resourceId,
                )?.type;
                isPublisher = newsOrganizationType === 'publisher';
              }

              return (
                <li
                  key={item.id}
                  className="relative pl-6 overflow-hidden group last:-mb-4"
                >
                  <ElemNewsHeading
                    news={item}
                    isPublisher={isPublisher}
                    isAuthor={isAuthor}
                    showPoweredBy
                  />
                </li>
              );
            })}
          </ul>

          {limit < news.length && (
            <div className="mt-6">
              <ElemButton
                btn="ol-primary"
                onClick={showMore}
                className="w-full"
              >
                Show More News
              </ElemButton>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default ElemNewsList;
