import React from 'react';
import { IconExternalLink } from '@/components/icons';
import { News } from '@/graphql/types';
import moment from 'moment-timezone';
import { onTrackView } from '@/utils/track';
import { useRouter } from 'next/router';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';

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
  const router = useRouter();

  const handleLinkClick = () => {
    onTrackView({
      resourceId: news.id,
      resourceType: 'news',
      pathname: router.asPath,
    });
  };

  return (
    <li className="relative pl-6 overflow-hidden group last:-mb-4">
      <span className="absolute dashes top-2 left-2 -bottom-2 right-auto w-px h-auto border-y border-white bg-repeat-y"></span>
      <span className="absolute block top-2 left-1 w-2 h-2 rounded-full bg-primary-300 transition-all group-hover:bg-primary-500"></span>

      <div className="mb-4">
        <div className="inline leading-7 text-neutral-300">
          {news?.link ? (
            <ElemLink
              href={news.link}
              className="font-medium text-sm text-neutral-200 hover:text-primary-300"
              target="_blank"
              onClick={handleLinkClick}>
              <span className="underline hover:no-underline">{news.text}</span>
              <IconExternalLink className="inline-block w-5 h-5 ml-1 text-primary-500" />
            </ElemLink>
          ) : (
            <p className="font-medium text-sm text-neutral-200">{news.text}</p>
          )}
          <div className="flex items-center gap-x-2">
            {isPublisher && (
              <div className="shrink-0 bg-neutral-900 text-xs font-medium px-3 py-1 rounded-full text-neutral-300">
                Publisher
              </div>
            )}
            {isAuthor && (
              <div className="shrink-0 bg-neutral-900 text-xs font-medium px-3 py-1 rounded-full text-neutral-300">
                Author
              </div>
            )}
            <p className="text-sm text-neutral-500">
              {moment(news.date).format('ll')}
              {showPoweredBy && (
                <>
                  <span>{` • powered by `}</span>
                  <ElemLink
                    href={`${ROUTES.COMPANIES}/${
                      news?.source?.poweredby?.toLowerCase() === 'techcrunch'
                        ? 'techcrunch'
                        : 'cryptopanic'
                    }`}
                    className="underline hover:no-underline text-neutral-500 hover:text-neutral-300">
                    {news?.source?.poweredby || 'CryptoPanic'}
                  </ElemLink>
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
