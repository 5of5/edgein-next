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
import {
  CARD_DEFAULT_TAGS_LIMIT,
  CARD_MAX_TAGS_LIMIT,
} from '@/utils/constants';

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

  const [tagsLimit, setTagsLimit] = useState(CARD_DEFAULT_TAGS_LIMIT);
  const showMoreTags = () => {
    setTagsLimit(CARD_MAX_TAGS_LIMIT);
  };

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
  const orgs = organizations as {
    company?: {
      tags: string[];
    };
    vc_firm?: {
      investments?: { investment_round?: { company: { tags: string[] }[] } };
    };
  }[];

  const vc_tags = orgs.reduce((tmp, org) => {
    const tags = org.vc_firm?.investments?.investment_round?.company.reduce(
      (tmp, company) => {
        return [...tmp, ...company.tags];
      },
      new Array<string>(),
    );
    return [...tmp, ...(tags || [])];
  }, new Array<string>());

  const company_tags = orgs.reduce((tmp, org) => {
    return [...tmp, ...(org.company?.tags || [])];
  }, new Array<string>());

  const tags = Array.from(new Set([...vc_tags, ...company_tags]));

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
          {tags && (
            <div className="mt-4 flex flex-wrap overflow-clip gap-2">
              {tags.slice(0, tagsLimit)?.map((tag: string, index: number) => {
                return (
                  <button
                    key={index}
                    onClick={e => tagOnClick(e, tag)}
                    className={`shrink-0 bg-gray-100 text-xs font-medium px-3 py-1 rounded-full ${
                      tagOnClick !== undefined
                        ? 'cursor-pointer hover:bg-gray-200'
                        : ''
                    }`}>
                    {tag}
                  </button>
                );
              })}
              {tagsLimit < tags.length && (
                <button
                  onClick={showMoreTags}
                  className="text-xs text-gray-500 font-medium py-1">
                  {tags.length - tagsLimit} more
                </button>
              )}
            </div>
          )}
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
                }`}>
                {parse(stripHtmlTags(metadata?.description))}
              </a>
            </Link>
          ) : (
            <p
              className={`text-sm text-gray-500 mt-4 ${
                metadata?.image ? 'line-clamp-3' : 'line-clamp-6'
              }`}>
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
                        }>
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
                    }>
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
                  }`}>
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
