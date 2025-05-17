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
import { Card, CardContent, CardFooter, CardHeader } from '../shadcn/card';

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
    <Card className="flex flex-col w-full h-full border border-gray-800 bg-gradient-to-b from-gray-900 to-black hover:border-gray-600 transition-all duration-300">
      <CardHeader className="p-4 pb-3 flex-shrink-0">
        <ElemLink href={`${ROUTES.INVESTORS}/${slug}`} className="block">
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
              <ElemTooltip content={name} mode="light">
                <h3 className="text-base font-medium text-gray-100 truncate max-w-[200px]">
                  {name}
                </h3>
              </ElemTooltip>
            </div>
          </div>
        </ElemLink>

        {tags && tags.length > 0 && (
          <div className="mt-3">
            <ElemTags
              className="overflow-hidden"
              limit={CARD_DEFAULT_TAGS_LIMIT}
              resourceType={'investors'}
              tags={tags}
            />
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-grow min-h-0">
        <ElemLink href={`${ROUTES.INVESTORS}/${slug}`} className="block h-full">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-3">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Founded</span>
              <span className="text-sm font-medium text-gray-300">
                {year_founded && year_founded !== '' ? year_founded : '-'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Investments</span>
              <span className="text-sm font-medium text-gray-300">
                {num_of_investments && num_of_investments > 0
                  ? num_of_investments
                  : '-'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Funding</span>
              <span className="text-sm font-medium text-gray-300">
                {investment_amount_total && investment_amount_total > 0
                  ? `$${convertToInternationalCurrencySystem(
                      Number(investment_amount_total),
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

        <div className="inline-flex scale-90 origin-right">
          <ElemSaveToList
            resourceName={vcFirm.name}
            resourceId={id}
            resourceType={'vc_firms'}
            slug={slug!}
            buttonStyle="black-to-white"
            follows={follows}
          />
        </div>
      </CardFooter>
    </Card>
  );
};
