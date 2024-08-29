import React, { useState } from 'react';
import { News } from '@/graphql/types';
import { ElemButton } from '../elem-button';
import ElemNewsHeading from './elem-news-heading';
import { useIntercom } from 'react-use-intercom';

type Props = {
  heading?: string;
  resourceName?: string;
  resourceUrl?: string;
  resourceType: 'companies' | 'vc_firms' | 'people';
  news: News[];
  resourceId?: number;
};

const ElemNewsList: React.FC<Props> = ({
  heading,
  resourceName,
  resourceUrl,
  resourceType,
  news,
  resourceId,
}) => {
  const { showNewMessage } = useIntercom();

  const [limit, setLimit] = useState(10);
  const showMore = () => {
    setLimit(limit + 10);
  };

  const resource = resourceUrl
    ? `${resourceName}: ${resourceUrl}`
    : resourceName;

  return (
    <section className="border border-gray-300 rounded-lg">
      <div className="flex items-center justify-between px-4 pt-2">
        <h2 className="text-lg font-medium">{heading ? heading : 'News'}</h2>
      </div>

      <div className="p-4">
        {news.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-500">
              There are no recent news for this organization.
            </div>
            <ElemButton
              className="mt-2"
              onClick={() =>
                showNewMessage(
                  `Hi EdgeIn, I'd like to request news on ${resource}`,
                )
              }
              btn="default">
              Request data or contribute
            </ElemButton>
          </div>
        ) : (
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
                        resourceType === 'companies'
                          ? 'company_id'
                          : 'vc_firm_id'
                      ] === resourceId,
                  )?.type;
                  isPublisher = newsOrganizationType === 'publisher';
                }

                return (
                  <ElemNewsHeading
                    news={item}
                    isPublisher={isPublisher}
                    isAuthor={isAuthor}
                    showPoweredBy
                    key={item.id}
                  />
                );
              })}
            </ul>

            {limit < news.length && (
              <div className="mt-6">
                <ElemButton btn="default" onClick={showMore} className="w-full">
                  Show More News
                </ElemButton>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ElemNewsList;
