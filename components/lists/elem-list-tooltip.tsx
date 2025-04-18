import { FC, PropsWithChildren } from 'react';
import { kebabCase } from 'lodash';
import { getNameFromListName, getListDisplayName } from '@/utils/lists';
import { formatDateShown, numberWithCommas } from '@/utils';
import { GetFollowsByUserQuery } from '@/graphql/types';
import { ROUTES } from '@/routes';
import { IconGlobeAmericas, IconLockClosed } from '../icons';
import { ElemLink } from '../elem-link';
import { ElemTooltip } from '../elem-tooltip';

type List = GetFollowsByUserQuery['list_members'][0]['list'];
type Props = {
  list: List;
};

export const ElemListTooltip: FC<PropsWithChildren<Props>> = ({
  list,
  children,
}) => {
  const listUrl = `${ROUTES.LISTS}/${list.id}/${kebabCase(
    getNameFromListName(list),
  )}`;

  const totalItems =
    list?.follows_companies?.length +
    list?.follows_vcfirms?.length +
    list?.follows_people?.length;

  const tooltipContent = (
    <div className="flex-col p-2 group">
      <div>
        <ElemLink
          href={listUrl}
          className="inline-block first-letter:uppercase">
          <div className="inline mr-2 text-lg font-medium leading-snug text-gray-300 align-middle line-clamp-2 hover:underline">
            {getListDisplayName(list)}
          </div>
          <div className="leading-snug inline-flex space-x-0.5 align-middle px-2 py-0.5 text-xs border border-gray-300 hover:border-gray-400 text-gray-300 hover:text-gray-200 rounded-full transition-colors">
            {list.public ? (
              <IconGlobeAmericas
                title="Public"
                className="block w-4 h-4 shrink-0"
              />
            ) : (
              <IconLockClosed
                title="Private"
                className="block w-4 h-4 shrink-0"
              />
            )}
            <div>{list.public ? 'Public' : 'Private'}</div>
          </div>
        </ElemLink>
      </div>

      <div className="mt-1 flex flex-wrap items-center text-xs text-gray-500 font-normal gap-x-1 gap-y-0.5">
        <ElemTooltip content="Author" mode="dark" direction="bottom" size="lg">
          <div className="first-letter:uppercase" aria-label="Author">
            {list?.created_by?.person ? (
              <ElemLink
                href={`${ROUTES.PEOPLE}/${list?.created_by?.person?.slug}`}
                className="hover:underline">
                {list?.created_by?.person.name}
              </ElemLink>
            ) : (
              list?.created_by?.display_name
            )}
          </div>
        </ElemTooltip>
        &middot;
        <ElemTooltip
          content={
            <div className="p-1 text-sm">
              Updated {formatDateShown(list.updated_at, `LL [at] h:mmA`)}
            </div>
          }
          mode="dark"
          direction="bottom"
          size="lg">
          <div>
            <ElemLink href={listUrl} className="hover:underline">
              {formatDateShown(list.updated_at, `ll`)}
            </ElemLink>
          </div>
        </ElemTooltip>
        &middot;
        <div>
          <ElemLink href={listUrl} className="hover:underline">
            {numberWithCommas(totalItems ? totalItems : 0)} item
            {totalItems && totalItems > 1 && 's'}
          </ElemLink>
        </div>
      </div>

      {list.description && (
        <a
          className="mt-3 text-sm font-normal text-gray-300 line-clamp-4"
          href={listUrl}>
          {list.description}
        </a>
      )}
    </div>
  );

  return (
    <ElemTooltip
      content={tooltipContent}
      direction="top-start"
      delay={350}
      mode="dark"
      size="lg"
      arrow={false}
      className="!max-w-[24rem] [&_.MuiTooltip-tooltip]:!bg-black [&_.MuiTooltip-tooltip]:!text-white [&_.MuiTooltip-tooltip]:!border [&_.MuiTooltip-tooltip]:!border-gray-300 [&_.MuiTooltip-tooltip]:hover:!border-gray-400 [&_.MuiTooltip-tooltip]:transition-colors !important">
      <div>{children}</div>
    </ElemTooltip>
  );
};
