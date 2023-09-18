import { Companies } from '@/graphql/types';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
  IconLocation,
} from '@/components/icons';
import { useUser } from '@/context/user-context';
import { CARD_DEFAULT_TAGS_LIMIT } from '@/utils/constants';
import { isEmpty, values } from 'lodash';
import { getFullAddress } from '@/utils/helpers';
import {
  convertToInternationalCurrencySystem,
  formatDate,
  numberWithCommas,
} from '@/utils';

export type CardType = 'full' | 'compact';

type Props = {
  company: Companies;
  type?: CardType;
};

export const ElemCompanyCard: FC<Props> = ({ company, type = 'full' }) => {
  const router = useRouter();

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

  const { user } = useUser();

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
    location_json,
    total_employees,
    investor_amount,
    year_founded,
    investment_rounds_aggregate,
    investment_rounds,
  } = company;

  const isEmptyLocationJson = values(location_json).every(isEmpty);
  const isRaisingCompany =
    status_tags && status_tags.length > 0 && status_tags.includes('Raising');

  const onClickCompanyLinkedin = () => {
    if (!user) {
      router.push('/sign-in');
    } else {
      setIsOpenUpgradeDialog(true);
    }
  };

  return (
    <div className="flex flex-col w-full border border-gray-300 rounded-xl p-[16px] transition-all duration-300 hover:border-gray-400">
      <div className="flex flex-col justify-between h-full">
        <div>
          <Link href={`/companies/${slug}`}>
            <a>
              <div className="flex shrink-0 w-full items-center gap-4">
                <ElemPhoto
                  photo={logo}
                  wrapClass="flex items-center justify-center shrink-0 w-20 h-20 aspect-square bg-white rounded-lg overflow-hidden"
                  imgClass="object-fit max-w-full max-h-full"
                  imgAlt={name}
                  placeholderClass="text-slate-300"
                />
                <ElemTooltip content={name} mode="light">
                  <h3 className="text-lg font-medium truncate">{name}</h3>
                </ElemTooltip>
                {coin && (
                  <ElemTooltip content={`Token`} mode="light" className="">
                    <span className="uppercase ml-1">{coin.ticker}</span>
                  </ElemTooltip>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 text-gray-500">
                <div className="flex flex-col">
                  <span className="text-xs">Founded</span>
                  <span className="text-sm font-medium">
                    {year_founded ?? '-'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs">Stage</span>
                  <span className="text-sm font-medium">
                    {investment_rounds?.[0]?.round ?? '-'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs">Employees</span>
                  <span className="text-sm font-medium">
                    {total_employees && total_employees > 0
                      ? numberWithCommas(total_employees)
                      : '-'}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs">Rounds</span>
                  <span className="text-sm font-medium">
                    {investment_rounds_aggregate?.aggregate?.count &&
                    investment_rounds_aggregate?.aggregate?.count > 0
                      ? investment_rounds_aggregate?.aggregate?.count
                      : '-'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs">Funding</span>
                  <span className="text-sm font-medium">
                    {investor_amount && investor_amount > 0
                      ? `$${convertToInternationalCurrencySystem(
                          Number(investor_amount),
                        )}`
                      : '-'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs">Latest round</span>
                  <span className="text-sm font-medium">
                    {investment_rounds?.[0]?.round_date
                      ? formatDate(investment_rounds?.[0]?.round_date, {
                          month: 'short',
                          day: '2-digit',
                          year: 'numeric',
                        })
                      : '-'}
                  </span>
                </div>
              </div>
              
              {type === 'full' && overview && (
                <div className="mt-4 text-sm line-clamp-3 text-gray-500">
                  {overview}
                </div>
              )}
            </a>
          </Link>

          <div>
            {type === 'full' && !isEmptyLocationJson && (
              <div className="flex pt-1.5 items-center">
                <IconLocation
                  title={getFullAddress(location_json)}
                  className="h-3 w-3 shrink-0 self-start mt-1"
                />
                <span className="ml-1 break-words text-sm line-clamp-3 text-gray-500">
                  {getFullAddress(location_json)}
                </span>
              </div>
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
        </div>

        <div className="flex items-center justify-between mt-4 gap-x-5">
          <div className="flex items-center space-x-1.5">
            {website && (
              <Link href={website}>
                <a target="_blank">
                  <IconGlobe className="h-5 w-5 text-gray-600" />
                </a>
              </Link>
            )}

            {company_linkedin ? (
              userCanViewLinkedIn ? (
                <Link href={company_linkedin}>
                  <a target="_blank">
                    <IconLinkedIn className="h-5 w-5 text-gray-600" />
                  </a>
                </Link>
              ) : (
                <button onClick={onClickCompanyLinkedin}>
                  <IconLinkedIn className="h-5 w-5 text-gray-400" />
                </button>
              )
            ) : null}

            {twitter && (
              <Link href={twitter}>
                <a target="_blank">
                  <IconTwitter className="h-5 w-5 text-gray-600" />
                </a>
              </Link>
            )}
            {github && (
              <Link href={github}>
                <a target="_blank">
                  <IconGithub className="h-5 w-5 text-gray-600" />
                </a>
              </Link>
            )}
            {discord && (
              <Link href={discord}>
                <a target="_blank">
                  <IconDiscord className="h-5 w-5 text-gray-600" />
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
      </div>
      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </div>
  );
};
