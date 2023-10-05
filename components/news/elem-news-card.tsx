import { FC, useEffect, useState, Fragment } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemTooltip } from '@/components/elem-tooltip';
import { GetNewsQuery } from '@/graphql/types';
import Link from 'next/link';
import { getCleanWebsiteUrl, stripHtmlTags } from '@/utils/text';
import parse from 'html-react-parser';
import { formatDateShown } from '@/utils';
import { CARD_DEFAULT_TAGS_LIMIT } from '@/utils/constants';
import { ElemTags } from '@/components/elem-tags';
import { onTrackView } from '@/utils/track';
import { useRouter } from 'next/router';
import { COMPANIES, INVESTORS } from '@/routes';

type Props = {
  className?: string;
  newsPost: GetNewsQuery['news'][0];
};

export const ElemNewsCard: FC<Props> = ({ className = '', newsPost }) => {
  const router = useRouter();

  const [postData, setPostData] = useState(newsPost);

  useEffect(() => {
    setPostData(newsPost);
  }, [newsPost]);

  const { id, kind, date, link, text, source, metadata, organizations } =
    postData;
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

  const handleLinkClick = () => {
    onTrackView({
      resourceId: id,
      resourceType: 'news',
      pathname: router.asPath,
    });
  };

  return (
    <div
      className={`flex flex-col w-full border border-gray-200 rounded-xl p-[16px] transition-all duration-300 hover:border-gray-400 ${className}`}
    >
      {link && (
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="font-medium break-words" title={text ?? ''}>
              <Link href={link}>
                <a target="_blank" onClick={handleLinkClick}>
                  {text}
                </a>
              </Link>
            </h2>
            <p className="mt-3 text-xs text-gray-500">
              {formatDateShown(date)}
            </p>

            {tags?.length > 0 && (
              <ElemTags
                className="mt-4"
                limit={CARD_DEFAULT_TAGS_LIMIT}
                resourceType={'news'}
                tags={tags}
              />
            )}

            {link && metadata?.image && (
              <div className="mt-3 text-gray-400">
                <Link href={link}>
                  <a
                    target="_blank"
                    className="block mb-2"
                    onClick={handleLinkClick}
                  >
                    {metadata?.image && (
                      <img
                        src={metadata?.image}
                        alt={text}
                        className="rounded-lg w-full h-auto text-sm text-gray-500 border border-gray-200 hover:opacity-75"
                      />
                    )}{' '}
                  </a>
                </Link>
              </div>
            )}

            {link ? (
              <Link href={link}>
                <a
                  target="_blank"
                  className={`text-sm text-gray-500 mt-4 ${
                    metadata?.image ? 'line-clamp-3' : 'line-clamp-6'
                  }`}
                  onClick={handleLinkClick}
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
                      ? `${COMPANIES}/${organizer.company?.slug}`
                      : organizer.vc_firm
                      ? `${INVESTORS}/${organizer.vc_firm?.slug}`
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
          </div>
          <div className="mt-4 flex flex-wrap items-center">
            {link && (
              <p className="text-xs text-gray-500">
                {'From  '}
                {publisher ? (
                  <Link
                    href={
                      publisher.company
                        ? `${COMPANIES}/${publisher.company?.slug}`
                        : publisher.vc_firm
                        ? `${INVESTORS}/${publisher.vc_firm?.slug}`
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
                  href={`${COMPANIES}/${
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
