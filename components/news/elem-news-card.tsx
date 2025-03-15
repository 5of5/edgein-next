import { FC, useEffect, useState, Fragment } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemTooltip } from '@/components/elem-tooltip';
import { GetNewsQuery } from '@/graphql/types';
import { getCleanWebsiteUrl, stripHtmlTags } from '@/utils/text';
import parse from 'html-react-parser';
import { formatDateShown } from '@/utils';
import { CARD_DEFAULT_TAGS_LIMIT } from '@/utils/constants';
import { ElemTags } from '@/components/elem-tags';
import { onTrackView } from '@/utils/track';
import { useRouter } from 'next/router';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';

type Organization = {
  id?: string;
  type?: string;
  company?: {
    id?: string;
    name?: string;
    slug?: string;
    logo?: string;
    tags?: string[];
  };
  vc_firm?: {
    id?: string;
    name?: string;
    slug?: string;
    logo?: string;
    investments?: {
      investment_round?: {
        company: {
          tags: string[];
        }[];
      };
    };
  };
};

type Props = {
  className?: string;
  newsPost: {
    id: string;
    title?: string;
    published_at?: string;
    source?: {
      url?: string;
      title?: string;
    };
    metadata?: {
      image?: string;
      description?: string;
    };
    organizations?: Organization[];
  };
};

export const ElemNewsCard: FC<Props> = ({ className = '', newsPost }) => {
  const router = useRouter();

  const [postData, setPostData] = useState(newsPost);

  useEffect(() => {
    setPostData(newsPost);
  }, [newsPost]);

  const { metadata, organizations = [] } = postData as Props['newsPost'];

  const orgs = organizations as {
    company?: {
      tags: string[];
    };
    vc_firm?: {
      investments?: { investment_round?: { company: { tags: string[] }[] } };
    };
  }[];
  let vc_tags: string[] = [];
  if (orgs?.length) {
    vc_tags = orgs?.reduce((tmp, org) => {
      const tags = org?.vc_firm?.investments?.investment_round?.company?.reduce(
        (tmp, company) => {
          return [...tmp, ...company.tags];
        },
        new Array<string>(),
      );
      return [...tmp, ...(tags || [])];
    }, new Array<string>());
  }
  let company_tags: string[] = [];
  if (orgs?.length) {
    company_tags = orgs?.reduce((tmp, org) => {
      return [...tmp, ...(org.company?.tags || [])];
    }, new Array<string>());
  }
  const tags = Array.from(
    new Set([
      ...(vc_tags || []), // Default to an empty array if vc_tags is undefined
      ...(company_tags || []), // Default to an empty array if company_tags is undefined
    ]),
  );
  let publisher: (typeof organizations)[0] | undefined = undefined;

  if (organizations?.length) {
    publisher = organizations.find(org => org.type === 'publisher');
  }

  let otherOrganizations: Organization[] = [];
  if (organizations?.length) {
    otherOrganizations = organizations.filter(
      org => org.type !== 'publisher' && (org.company?.id || org.vc_firm?.id),
    );
  }

  const handleLinkClick = () => {
    onTrackView({
      resourceId: parseInt(newsPost?.id ?? '0'),
      resourceType: 'news',
      pathname: router.asPath,
    });
  };

  return (
    <div
      className={`flex flex-col w-full border border-gray-700 rounded-xl p-[16px] transition-all duration-300 hover:border-gray-400 ${className}`}>
      {newsPost?.source?.url && (
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2
              className="font-medium break-words"
              title={newsPost?.title ?? ''}>
              <ElemLink
                href={newsPost?.source?.url}
                target="_blank"
                onClick={handleLinkClick}>
                {newsPost?.title}
              </ElemLink>
            </h2>
            <p className="mt-3 text-xs text-gray-500">
              {formatDateShown(new Date(newsPost?.published_at ?? ''))}
            </p>

            {tags?.length > 0 && (
              <ElemTags
                className="mt-4"
                limit={CARD_DEFAULT_TAGS_LIMIT}
                resourceType={'news'}
                tags={tags}
              />
            )}

            {newsPost?.source?.url && metadata?.image ? (
              <div className="mt-3 text-gray-400">
                <ElemLink
                  href={newsPost?.source?.url}
                  target="_blank"
                  className="className=block mb-2 flex justify-center"
                  onClick={handleLinkClick}>
                  {metadata?.image && (
                    <img
                      src={
                        metadata?.image === 'h'
                          ? 'https://play-lh.googleusercontent.com/E1HD4Y1rp0RbbU-8kWBYodXy8nDEX8sIzrBeBb3F_Rd2IP5VblkhHWo2_oUwHTTpovE'
                          : metadata?.image
                      }
                      alt={newsPost?.title}
                      className="rounded-lg object-cover"
                      style={{
                        width: '150px',
                        height: '150px',
                        objectPosition: 'center',
                      }}
                    />
                  )}{' '}
                </ElemLink>
              </div>
            ) : (
              <div className="mt-3 text-gray-400">
                <ElemLink
                  href={newsPost?.source?.url}
                  target="_blank"
                  className="className=block mb-2 flex justify-center"
                  onClick={handleLinkClick}>
                  <img
                    src={
                      'https://play-lh.googleusercontent.com/E1HD4Y1rp0RbbU-8kWBYodXy8nDEX8sIzrBeBb3F_Rd2IP5VblkhHWo2_oUwHTTpovE'
                    }
                    alt={'crypto'}
                    className="rounded-lg object-cover"
                    style={{
                      width: '150px',
                      height: '150px',
                      objectPosition: 'center',
                    }}
                  />
                </ElemLink>
              </div>
            )}

            {newsPost?.source?.url ? (
              <ElemLink
                href={newsPost?.source?.url}
                target="_blank"
                className={`text-sm text-gray-500 mt-4 ${
                  metadata?.image ? 'line-clamp-3' : 'line-clamp-6'
                }`}
                onClick={handleLinkClick}>
                {parse(stripHtmlTags(metadata?.description))}
              </ElemLink>
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
                      ? `${ROUTES.COMPANIES}/${organizer.company?.slug}`
                      : organizer.vc_firm
                      ? `${ROUTES.INVESTORS}/${organizer.vc_firm?.slug}`
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
                              placeholderClass="text-gray-300"
                            />
                          }>
                          <div className="inline-block">
                            <ElemLink
                              href={slug}
                              className="break-words border-b border-gray-600">
                              {organization?.name}
                            </ElemLink>
                          </div>
                        </ElemTooltip>
                        {otherOrganizations.length === index + 1 ? '' : ', '}
                      </Fragment>
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center">
            {newsPost?.source?.url && (
              <p className="text-xs text-gray-500">
                {'From  '}
                {publisher ? (
                  <ElemLink
                    href={
                      publisher.company
                        ? `${ROUTES.COMPANIES}/${publisher.company?.slug}`
                        : publisher.vc_firm
                        ? `${ROUTES.INVESTORS}/${publisher.vc_firm?.slug}`
                        : ''
                    }
                    target="_blank">
                    {publisher.company?.name || publisher.vc_firm?.name}
                  </ElemLink>
                ) : (
                  <ElemLink
                    href={getCleanWebsiteUrl(newsPost?.source?.url, true)}
                    target="_blank">
                    {getCleanWebsiteUrl(newsPost?.source?.url, false)}
                  </ElemLink>
                )}
                {' • '}
                Powered by{' '}
                <ElemLink
                  href={`${ROUTES.COMPANIES}/${
                    newsPost?.source?.title?.toLowerCase() === 'techcrunch'
                      ? 'techcrunch'
                      : 'cryptopanic'
                  }`}>
                  {newsPost?.source?.title || 'CryptoPanic'}
                </ElemLink>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
