import { Vc_Firms } from '@/graphql/types';
import { FC, useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import { ElemTags } from '@/components/elem-tags';
import { ElemTooltip } from '@/components/elem-tooltip';
import Link from 'next/link';
import {
  IconGlobe,
  IconLinkedIn,
  IconTwitter,
  IconLocation,
  IconCash,
} from '@/components/icons';
import { useUser } from '@/context/user-context';
import { CARD_DEFAULT_TAGS_LIMIT } from '@/utils/constants';
import { useRouter } from 'next/router';
import { isEmpty, values } from 'lodash';
import { getFullAddress } from '@/utils/helpers';
import { convertToInternationalCurrencySystem } from '@/utils';

type Props = {
  vcFirm: Vc_Firms;
};

export const ElemInvestorCard: FC<Props> = ({ vcFirm }) => {
  const router = useRouter();

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

  const { user } = useUser();

  const userCanViewLinkedIn = user?.entitlements.viewEmails
    ? user?.entitlements.viewEmails
    : false;

  const {
    id,
    slug,
    logo,
    name,
    tags,
    overview,
    follows,
    website,
    linkedin,
    twitter,
    location_json,
    year_founded,
    investment_amount_total,
    num_of_investments,
  } = vcFirm;

  const isEmptyLocationJson = values(location_json).every(isEmpty);

  const onClickInvestorLinkedin = () => {
    if (!user) {
      router.push('/sign-in');
    } else {
      setIsOpenUpgradeDialog(true);
    }
  };

  return (
    <div className="flex flex-col w-full border border-gray-200 rounded-xl p-[16px] transition-all duration-300 hover:border-gray-400">
      <div className="flex flex-col justify-between h-full">
        <div>
          <Link href={`/investors/${slug}`}>
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
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 text-gray-500">
                <div className="flex flex-col">
                  <span className="text-xs">Founded</span>
                  <span className="text-sm font-medium">
                    {year_founded ?? '-'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs">Investments</span>
                  <span className="text-sm font-medium">
                    {num_of_investments ?? '-'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs">Funding</span>
                  <span className="text-sm font-medium">
                    {investment_amount_total
                      ? `$${convertToInternationalCurrencySystem(
                          Number(investment_amount_total),
                        )}`
                      : '-'}
                  </span>
                </div>
              </div>

              {overview && (
                <div className="mt-2 text-sm line-clamp-3 text-gray-500">
                  {overview}
                </div>
              )}
            </a>
          </Link>

          <div>
            {!isEmptyLocationJson && (
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
                resourceType={'investors'}
                tags={tags}
              />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 gap-x-5">
          {(website || linkedin || twitter) && (
            <div className="flex items-center space-x-1.5">
              {website && (
                <Link href={website}>
                  <a target="_blank">
                    <IconGlobe className="h-5 w-5 text-gray-600" />
                  </a>
                </Link>
              )}

              {linkedin ? (
                userCanViewLinkedIn ? (
                  <Link href={linkedin}>
                    <a target="_blank">
                      <IconLinkedIn className="h-5 w-5 text-gray-600" />
                    </a>
                  </Link>
                ) : (
                  <button onClick={onClickInvestorLinkedin}>
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
              {/*
            TO DO: add github and discord fields to vc_firms in db
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
          )} */}
            </div>
          )}

          <ElemSaveToList
            resourceName={vcFirm.name}
            resourceId={id}
            resourceType={'vc_firms'}
            slug={slug!}
            buttonStyle="default"
            follows={follows}
          />
        </div>
      </div>
    </div>
  );
};
