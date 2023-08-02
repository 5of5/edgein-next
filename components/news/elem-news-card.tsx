import { FC, useEffect, useState, Fragment } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemReactions } from '@/components/elem-reactions';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import { ElemTooltip } from '@/components/elem-tooltip';
import {
  IconExternalLink,
  IconNewspaper,
  IconPlayCircle,
} from '@/components/icons';
import { GetNewsQuery } from '@/graphql/types';
import Link from 'next/link';
import { getCleanWebsiteUrl, stripHtmlTags } from '@/utils/text';
import parse from 'html-react-parser';
import { formatDateShown } from '@/utils';

type Props = {
  className?: string;
  newsPost: GetNewsQuery['news'][0];
  tagOnClick?: any;
};

export const ElemNewsCard: FC<Props> = ({
  className = '',
  newsPost,
  tagOnClick,
}) => {
  const [postData, setPostData] = useState(newsPost);

  useEffect(() => {
    setPostData(newsPost);
  }, [newsPost]);

  const {
    // id,
    kind,
    date,
    link,
    text,
    source,
    // created_at,
    // updated_at,
    // status,
    metadata,
    organizations,
  } = postData;

  const publisher = organizations.find(org => org.type === 'publisher');

  const otherOrganizations = organizations.filter(
    org => org.type !== 'publisher' && (org.company?.id || org.vc_firm?.id),
  );

  return (
    <div className={`flex flex-col w-full p-4 ${className}`}>
      {link && (
        <div>
          <h2 className="font-medium break-words" title={text ?? ''}>
            <Link href={link}>
              <a target="_blank">{text}</a>
            </Link>
          </h2>
          <p className="mt-4 text-xs text-gray-500">{formatDateShown(date)}</p>
          {metadata?.description && (
            <div className="mt-4 text-gray-400">
              {link && metadata?.image && (
                <Link href={link}>
                  <a target="_blank" className="block mb-2">
                    {metadata?.image && (
                      <img
                        src={metadata?.image}
                        alt={text}
                        className="rounded-lg w-full h-auto text-sm text-gray-500 border border-gray-200 hover:opacity-75"
                      />
                    )}{' '}
                  </a>
                </Link>
              )}
            </div>
          )}

          {link ? (
            <Link href={link}>
              <a
                target="_blank"
                className={`text-sm text-gray-500 mt-4 ${
                  metadata?.image ? 'line-clamp-3' : 'line-clamp-6'
                }`}
              >
                {parse(stripHtmlTags(metadata?.description))}
              </a>
            </Link>
          ) : (
            <p
              className={`text-sm text-gray-500 mt-4 ${
                metadata?.image ? 'line-clamp-3' : 'line-clamp-6'
              }`}
            >
              {parse(stripHtmlTags(metadata?.description))}
            </p>
          )}

          <div className="mt-2 text-gray-600">
            {otherOrganizations && (
              <>
                {otherOrganizations.map((organizer: any, index: number) => {
                  const slug = organizer.company
                    ? `/companies/${organizer.company?.slug}`
                    : organizer.vc_firm
                    ? `/investors/${organizer.vc_firm?.slug}`
                    : '';

                  const organization = organizer.company
                    ? organizer.company
                    : organizer.vc_firm;

                  const organizationId = organizer.company
                    ? organizer.company?.id
                    : organizer.vc_firm?.id;

                  return (
                    <Fragment key={organizationId}>
                      <ElemTooltip
                        mode="light"
                        content={
                          <ElemPhoto
                            photo={organization?.logo}
                            wrapClass="flex items-center justify-center shrink-0 w-16 h-16 p-2"
                            imgClass="object-fit max-w-full max-h-full"
                            imgAlt={organization?.name}
                            placeholderClass="text-slate-300"
                          />
                        }
                      >
                        <div className="inline-block">
                          <Link href={slug}>
                            <a className="break-words border-b border-gray-600">
                              {organization?.name}
                            </a>
                          </Link>
                        </div>
                      </ElemTooltip>
                      {otherOrganizations.length === index + 1 ? '' : ', '}
                    </Fragment>
                  );
                })}
              </>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center">
            {link && (
              <p className="text-xs text-gray-500">
                {'From  '}
                {publisher ? (
                  <Link
                    href={
                      publisher.company
                        ? `/companies/${publisher.company?.slug}`
                        : publisher.vc_firm
                        ? `/investors/${publisher.vc_firm?.slug}`
                        : ''
                    }
                  >
                    <a target="_blank" className="">
                      {publisher.company?.name || publisher.vc_firm?.name}
                    </a>
                  </Link>
                ) : (
                  <Link href={getCleanWebsiteUrl(link, true)}>
                    <a target="_blank" className="">
                      {getCleanWebsiteUrl(link, false)}
                    </a>
                  </Link>
                )}
                {' • '}
                Powered by{' '}
                <Link
                  href={`/companies/${
                    source?.poweredby?.toLowerCase() === 'techcrunch'
                      ? 'techcrunch'
                      : 'cryptopanic'
                  }`}
                >
                  <a>{source?.poweredby || 'CryptoPanic'}</a>
                </Link>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
