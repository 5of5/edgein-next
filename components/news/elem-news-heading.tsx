import React from 'react';
import Link from 'next/link';
import { IconExternalLink } from '@/components/icons';
import { News } from '@/graphql/types';
import moment from 'moment-timezone';

type Props = {
  news: News;
  isPublisher?: boolean;
  isAuthor?: boolean;
  showPoweredBy?: boolean;
};

const ElemNewsHeading: React.FC<Props> = ({
  news,
  isPublisher = false,
  isAuthor = false,
  showPoweredBy = false,
}) => {
  return (
    <li className="relative pl-6 overflow-hidden group last:-mb-4">
      <span className="absolute dashes top-2 left-2 -bottom-2 right-auto w-px h-auto border-y border-white bg-repeat-y"></span>
      <span className="absolute block top-2 left-1 w-2 h-2 rounded-full bg-primary-300 transition-all group-hover:bg-primary-500"></span>

      <div className="mb-4">
        <div className="inline leading-7 text-gray-600">
          {news?.link ? (
            <Link href={news.link}>
              <a className="font-medium text-sm" target="_blank">
                <span className="underline hover:no-underline">
                  {news.text}
                </span>
                <IconExternalLink className="inline-block w-5 h-5 ml-1 text-primary-500" />
              </a>
            </Link>
          ) : (
            <p className="font-medium text-sm">{news.text}</p>
          )}
          <div className="flex items-center gap-x-2">
            {isPublisher && (
              <div className="shrink-0 bg-gray-100 text-xs font-medium px-3 py-1 rounded-full">
                Publisher
              </div>
            )}
            {isAuthor && (
              <div className="shrink-0 bg-gray-100 text-xs font-medium px-3 py-1 rounded-full">
                Author
              </div>
            )}
            <p className="text-sm">
              {moment(news.date).format('ll')}
              {showPoweredBy && (
                <>
                  <span>{` • powered by `}</span>
                  <Link
                    href={`/companies/${
                      news?.source?.poweredby?.toLowerCase() === 'techcrunch'
                        ? 'techcrunch'
                        : 'cryptopanic'
                    }`}
                  >
                    <a className="underline hover:no-underline">
                      {news?.source?.poweredby || 'CryptoPanic'}
                    </a>
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ElemNewsHeading;
