import { Companies } from '@/graphql/types';
import { FC } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import { ElemTags } from '@/components/elem-tags';
import { ElemTooltip } from '@/components/elem-tooltip';
import {
  IconGlobe,
  IconLinkedIn,
  IconTwitterX,
  IconGithub,
  IconDiscord,
  IconLocation,
} from '@/components/icons';
import { CARD_DEFAULT_TAGS_LIMIT } from '@/utils/constants';
import { isEmpty, values } from 'lodash';
import { getFullAddress } from '@/utils/helpers';
import {
  convertToInternationalCurrencySystem,
  formatDate,
  numberWithCommas,
} from '@/utils';
import { ElemSocialIconGroup } from '../elem-social-icon-group';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';

export type CardType = 'full' | 'compact';

type Props = {
  company: Companies;
  type?: CardType;
};

export const ElemCompanyCard: FC<Props> = ({ company, type = 'full' }) => {
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

  return (
    <div className="flex flex-col w-full border border-gray-300 rounded-xl p-[16px] transition-all duration-300 hover:border-gray-400">
      <div className="flex flex-col justify-between h-full">
        <div>
          <ElemLink href={`${ROUTES.COMPANIES}/${slug}`}>
            <div className="flex items-center w-full gap-4 shrink-0">
              <ElemPhoto
                photo={logo}
                wrapClass="flex items-center justify-center shrink-0 w-20 h-20 aspect-square bg-dark-100 rounded-lg overflow-hidden"
                imgClass="object-fit max-w-full max-h-full"
                imgAlt={name}
                placeholder="company"
                placeholderClass="text-gray-300 w-full h-full m-4"
              />
              <ElemTooltip content={name} mode="light">
                <h3 className="text-lg font-medium truncate">{name}</h3>
              </ElemTooltip>
              {coin && (
                <ElemTooltip content={`Token`} mode="light" className="">
                  <span className="ml-1 uppercase">{coin.ticker}</span>
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
              <div className="mt-4 text-sm text-gray-500 line-clamp-3">
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
                resourceType={'companies'}
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
                value: company_linkedin,
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
              {
                value: discord,
                icon: IconDiscord,
              },
            ]}
          />

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
    </div>
  );
};
