import { Vc_Firms } from '@/graphql/types';
import { FC } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import { ElemTags } from '@/components/elem-tags';
import { ElemTooltip } from '@/components/elem-tooltip';
import {
  IconGlobe,
  IconLinkedIn,
  IconGithub,
  IconTwitterX,
  IconLocation,
} from '@/components/icons';
import { CARD_DEFAULT_TAGS_LIMIT } from '@/utils/constants';
import { isEmpty, values } from 'lodash';
import { getFullAddress } from '@/utils/helpers';
import { convertToInternationalCurrencySystem } from '@/utils';
import { CardType } from '../companies/elem-company-card';
import { ElemSocialIconGroup } from '../elem-social-icon-group';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';

type Props = {
  vcFirm: Vc_Firms;
  type?: CardType;
};

export const ElemInvestorCard: FC<Props> = ({ vcFirm, type = 'full' }) => {
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
    github,
    location_json,
    year_founded,
    investment_amount_total,
    num_of_investments,
  } = vcFirm;

  const isEmptyLocationJson = values(location_json).every(isEmpty);

  return (
    <div className="flex flex-col w-full border border-gray-300 rounded-xl p-[16px] transition-all duration-300 hover:border-gray-400">
      <div className="flex flex-col justify-between h-full">
        <div>
          <ElemLink href={`${ROUTES.INVESTORS}/${slug}`}>
            <div className="flex items-center w-full gap-4 shrink-0">
              <ElemPhoto
                photo={logo}
                wrapClass="flex items-center justify-center shrink-0 w-20 h-20 aspect-square bg-black rounded-lg overflow-hidden"
                imgClass="object-fit max-w-full max-h-full"
                imgAlt={name}
                placeholder="company"
                placeholderClass="text-gray-300 w-full h-full m-4"
              />
              <ElemTooltip content={name} mode="light">
                <h3 className="text-lg font-medium truncate">{name}</h3>
              </ElemTooltip>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 text-gray-500">
              <div className="flex flex-col">
                <span className="text-xs">Founded</span>
                <span className="text-sm font-medium">
                  {year_founded && year_founded !== '' ? year_founded : '-'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs">Investments</span>
                <span className="text-sm font-medium">
                  {num_of_investments && num_of_investments > 0
                    ? num_of_investments
                    : '-'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs">Funding</span>
                <span className="text-sm font-medium">
                  {investment_amount_total && investment_amount_total > 0
                    ? `$${convertToInternationalCurrencySystem(
                        Number(investment_amount_total),
                      )}`
                    : '-'}
                </span>
              </div>
            </div>

            {type === 'full' && overview && (
              <div className="mt-2 text-sm text-gray-500 line-clamp-3">
                {overview}
              </div>
            )}
          </ElemLink>

          <div>
            {type === 'full' && !isEmptyLocationJson && (
              <div className="flex pt-1.5 items-center">
                <IconLocation
                  title={getFullAddress(location_json)}
                  className="self-start w-3 h-3 mt-1 shrink-0"
                />
                <span className="ml-1 text-sm text-gray-500 break-words line-clamp-3">
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
          <ElemSocialIconGroup
            resources={[
              {
                value: website,
                title: 'Website',
                icon: IconGlobe,
              },
              {
                isPremium: true,
                value: linkedin,
                icon: IconLinkedIn,
              },
              {
                value: twitter,
                icon: IconTwitterX,
              },
              {
                isPremium: true,
                value: github,
                icon: IconGithub,
              },
            ]}
          />

          {/*
            TO DO: add github and discord fields to vc_firms in db
          {github && (
            <Link href={github}>
              <a target="_blank">
                <IconGithub className="w-5 h-5 text-gray-600" />
              </a>
            </Link>
          )}
          {discord && (
            <Link href={discord}>
              <a target="_blank">
                <IconDiscord className="w-5 h-5 text-gray-600" />
              </a>
            </Link>
          )} */}

          {/* <ElemSaveToList
            resourceName={vcFirm.name}
            resourceId={id}
            resourceType={'vc_firms'}
            slug={slug!}
            buttonStyle="default"
            follows={follows}
          /> */}
        </div>
      </div>
    </div>
  );
};
