import React from 'react';
import Link from 'next/link';
import { formatDate } from '@/utils';
import { IconExternalLink } from '@/components/icons';
import { News } from '@/graphql/types';

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
    <div>
      <span className="absolute h-full top-0 bottom-0 left-0">
        <span className="absolute dashes top-2 left-2 -bottom-2 right-auto w-px h-auto border-y border-white bg-repeat-y"></span>
        <span className="block absolute top-2 left-1 w-2 h-2 rounded-full bg-gradient-to-r from-primary-300 to-primary-300 transition-all group-hover:from-[#1A22FF] group-hover:via-primary-500 group-hover:to-primary-400"></span>
      </span>

      <div className="mb-4">
        <div className="inline leading-7 text-slate-600">
          {news?.link ? (
            <>
              <Link href={news.link}>
                <a className="font-semibold" target="_blank">
                  <span className="border-b border-primary-500 transition-all hover:border-b-2 hover:text-primary-500">
                    {news.text}
                  </span>
                  <IconExternalLink className="inline-block w-5 h-5 ml-1 text-primary-500" />
                </a>
              </Link>
            </>
          ) : (
            <div className="inline font-semibold">{news.text}</div>
          )}
          <div className="flex items-center gap-x-2">
            {isPublisher && (
              <span className="bg-slate-200 self-start text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full transition-all hover:bg-slate-300">
                Publisher
              </span>
            )}
            {isAuthor && (
              <span className="bg-slate-200 self-start text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full transition-all hover:bg-slate-300">
                Author
              </span>
            )}
            <p className="text-sm">
              {formatDate(news.date as string, {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })}
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
                    <a>{news?.source?.poweredby || 'CryptoPanic'}</a>
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElemNewsHeading;
