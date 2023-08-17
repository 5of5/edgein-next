import { Companies } from '@/graphql/types';
import { FC, useEffect, useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemReactions } from '@/components/elem-reactions';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import { ElemTags } from '@/components/elem-tags';
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
import { CARD_DEFAULT_TAGS_LIMIT } from '@/utils/constants';
import { usePopup } from '@/context/popup-context';

type Props = {
  company: Companies;
};

export const ElemCompanyCard: FC<Props> = ({ company }) => {
  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

  const { user } = useUser();

  const { setShowPopup } = usePopup();

  const userCanViewLinkedIn = user?.entitlements.viewEmails
    ? user?.entitlements.viewEmails
    : false;

  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

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
  } = company;

  const isRaisingCompany =
    status_tags && status_tags.length > 0 && status_tags.includes('Raising');

  const onClickCompanyLinkedin = () => {
    if (!user) {
      setShowPopup('signup');
    } else {
      setIsOpenUpgradeDialog(true);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Link href={`/companies/${slug}`}>
        <a>
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
        <a className="flex items-center mt-3">
          <ElemTooltip content={name} mode="light">
            <h3 className="text-xl font-medium truncate">{name}</h3>
          </ElemTooltip>
          {coin && (
            <ElemTooltip content={`Token`} mode="light" className="">
              <span className="uppercase ml-1">{coin.ticker}</span>
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
          <ElemTags
            className="mt-4"
            limit={CARD_DEFAULT_TAGS_LIMIT}
            resourceType={'companies'}
            tags={tags}
          />
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

          {company_linkedin ? (
            userCanViewLinkedIn ? (
              <Link href={company_linkedin}>
                <a target="_blank">
                  <IconLinkedIn className="h-6 w-6 text-gray-400" />
                </a>
              </Link>
            ) : (
              <button onClick={onClickCompanyLinkedin}>
                <IconLinkedIn className="h-6 w-6 text-gray-400" />
              </button>
            )
          ) : null}

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
