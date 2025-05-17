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
import { Card, CardContent, CardFooter, CardHeader } from '../shadcn/card';

export type CardType = 'full' | 'compact';

type Props = {
  company: Companies;
  type?: CardType;
  name?: string | null | undefined;
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
    <Card className="flex flex-col w-full h-full border border-gray-800 bg-gradient-to-b from-gray-900 to-black hover:border-gray-600 transition-all duration-300">
      <CardHeader className="p-4 pb-3 flex-shrink-0">
        <ElemLink href={`${ROUTES.COMPANIES}/${slug}`} className="block">
          <div className="flex items-center gap-3">
            <ElemPhoto
              photo={logo}
              wrapClass="flex items-center justify-center shrink-0 w-12 h-12 aspect-square bg-white rounded-lg overflow-hidden"
              imgClass="object-fit max-w-full max-h-full"
              imgAlt={name}
              placeholder="company"
              placeholderClass="text-gray-300 w-full h-full m-2"
            />
            <div className="flex flex-col overflow-hidden">
              <div className="flex items-center gap-2">
                <ElemTooltip content={name} mode="light">
                  <h3 className="text-base font-medium text-gray-100 truncate max-w-[200px]">
                    {name}
                  </h3>
                </ElemTooltip>
                {isRaisingCompany && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-emerald-900 text-emerald-400 rounded-full">
                    Raising
                  </span>
                )}
              </div>
              {coin && (
                <span className="text-xs uppercase text-gray-400">
                  {coin.ticker}
                </span>
              )}
            </div>
          </div>
        </ElemLink>

        {tags && tags.length > 0 && (
          <div className="mt-3">
            <ElemTags
              className="overflow-hidden"
              limit={CARD_DEFAULT_TAGS_LIMIT}
              resourceType={'companies'}
              tags={tags}
            />
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-grow min-h-0">
        <ElemLink href={`${ROUTES.COMPANIES}/${slug}`} className="block h-full">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-3">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Founded</span>
              <span className="text-sm font-medium text-gray-300">
                {year_founded ?? '-'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Stage</span>
              <span className="text-sm font-medium text-gray-300">
                {investment_rounds?.[0]?.round ?? '-'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Employees</span>
              <span className="text-sm font-medium text-gray-300">
                {total_employees && total_employees > 0
                  ? numberWithCommas(total_employees)
                  : '-'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Funding</span>
              <span className="text-sm font-medium text-gray-300">
                {investor_amount && investor_amount > 0
                  ? `$${convertToInternationalCurrencySystem(
                      Number(investor_amount),
                    )}`
                  : '-'}
              </span>
            </div>
          </div>

          {type === 'full' && overview && (
            <div className="mt-4 text-sm text-gray-400 line-clamp-2">
              {overview}
            </div>
          )}

          {type === 'full' && !isEmptyLocationJson && (
            <div className="flex items-center mt-3 text-gray-400">
              <IconLocation
                title={getFullAddress(location_json)}
                className="w-3 h-3 shrink-0"
              />
              <span className="ml-1.5 text-xs truncate">
                {getFullAddress(location_json)}
              </span>
            </div>
          )}
        </ElemLink>
      </CardContent>

      <CardFooter className="p-4 pt-3 border-t border-gray-800 flex-shrink-0 h-[60px] flex items-center justify-between">
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

        <div className="inline-flex scale-90 origin-right">
          <ElemSaveToList
            resourceName={name}
            resourceId={id}
            resourceType={'companies'}
            slug={slug!}
            buttonStyle="black-to-white"
            follows={follows}
          />
        </div>
      </CardFooter>
    </Card>
  );
};
