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

  const tooltipContent = (
    <div className="flex-col p-2 group">
      <div>
        <ElemLink
          href={listUrl}
          className="inline-block first-letter:uppercase">
          <div className="inline mr-2 text-lg font-medium leading-snug text-gray-900 align-middle line-clamp-2 hover:underline">
            {getListDisplayName(list)}
          </div>
          <div className="leading-snug inline-flex space-x-0.5 align-middle px-2 py-0.5 text-xs border border-gray-200 rounded-full">
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
          <div className="first-letter:uppercase">
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
            {numberWithCommas(
              list.total_no_of_resources ? list.total_no_of_resources : 0,
            )}{' '}
            item
            {list.total_no_of_resources &&
              list.total_no_of_resources > 1 &&
              's'}
          </ElemLink>
        </div>
      </div>

      {list.description && (
        <a
          className="mt-3 text-sm font-normal text-gray-900 line-clamp-4"
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
      mode="light"
      size="lg"
      arrow={false}>
      <div>{children}</div>
    </ElemTooltip>
  );
};
