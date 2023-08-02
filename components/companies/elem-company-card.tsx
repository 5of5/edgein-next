import { Companies } from '@/graphql/types';
import { FC, useEffect, useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemReactions } from '@/components/elem-reactions';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import { ElemTooltip } from '@/components/elem-tooltip';
import Link from 'next/link';
import { ElemUpgradeDialog } from '../elem-upgrade-dialog';
import {
  IconGlobe,
  IconLinkedIn,
  IconTwitter,
  IconGithub,
  IconDiscord,
} from '@/components/icons';
import { useUser } from '@/context/user-context';

type Props = {
  company: Companies;
  tagOnClick: any;
};

export const ElemCompanyCard: FC<Props> = ({ company, tagOnClick }) => {
  const [companyData, setCompanyData] = useState(company);

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

  const [tagsLimit, setTagsLimit] = useState(3);
  const showMoreTags = () => {
    setTagsLimit(50);
  };

  const { user } = useUser();

  const userCanViewLinkedIn = user?.entitlements.viewEmails
    ? user?.entitlements.viewEmails
    : false;

  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  useEffect(() => {
    setCompanyData(company);
  }, [company]);

  const {
    id,
    slug,
    logo,
    name,
    coin,
    tags,
    status_tags,
    overview,
    follows,
    website,
    twitter,
    company_linkedin,
    github,
    discord,
  } = companyData;

  const isRaisingCompany =
    status_tags && status_tags.length > 0 && status_tags.includes('Raising');

  return (
    <div className="flex flex-col w-full p-4">
      <Link href={`/companies/${slug}`}>
        <a target="_blank">
          <div className="flex shrink-0 w-full">
            <ElemPhoto
              photo={logo}
              wrapClass="flex items-center justify-center shrink-0 w-36 aspect-square bg-white rounded-lg overflow-hidden border border-gray-200"
              imgClass="object-fit max-w-full max-h-full"
              imgAlt={name}
              placeholderClass="text-slate-300"
            />
          </div>
        </a>
      </Link>

      <Link href={`/companies/${slug}`}>
        <a target="_blank" className="flex items-center mt-3">
          <ElemTooltip content={name} mode="light">
            <h3 className="text-xl font-medium truncate">{name}</h3>
          </ElemTooltip>
          {coin && (
            <ElemTooltip content={`Token`} mode="light" className="">
              <span className="uppercase">{coin.ticker}</span>
            </ElemTooltip>
          )}
        </a>
      </Link>

      <div className="mt-2">
        {overview && (
          <>
            {/* <ElemTooltip
            content={overview}
            mode="light"
            direction="bottom"
            size="lg"
            delay={1200}
            className="">
            <div className="text-sm line-clamp-3">{overview}</div>
          </ElemTooltip> */}
            <div className="text-sm line-clamp-3 text-gray-500">{overview}</div>
          </>
        )}

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
                  }`}
                >
                  {tag}
                </button>
              );
            })}
            {tagsLimit < tags.length && (
              <button
                onClick={showMoreTags}
                className="text-xs text-gray-500 font-medium py-1"
              >
                {tags.length - tagsLimit} more
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 gap-x-5">
        <div className="flex items-center space-x-0.5">
          {website && (
            <Link href={website}>
              <a target="_blank">
                <IconGlobe className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}

          {userCanViewLinkedIn && company_linkedin ? (
            <Link href={company_linkedin}>
              <a target="_blank">
                <IconLinkedIn className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          ) : !userCanViewLinkedIn && company_linkedin ? (
            <button onClick={() => setIsOpenUpgradeDialog(true)}>
              <IconLinkedIn className="h-6 w-6 text-gray-400" />
            </button>
          ) : (
            <></>
          )}

          {twitter && (
            <Link href={twitter}>
              <a target="_blank">
                <IconTwitter className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}
          {github && (
            <Link href={github}>
              <a target="_blank">
                <IconGithub className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}
          {discord && (
            <Link href={discord}>
              <a target="_blank">
                <IconDiscord className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}
        </div>

        <ElemSaveToList
          resourceName={name}
          resourceId={id}
          resourceType={'companies'}
          slug={slug!}
          buttonStyle="default"
          follows={follows}
        />
      </div>
      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </div>
  );
};
