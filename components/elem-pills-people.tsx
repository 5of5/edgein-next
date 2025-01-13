import React, { useState, FC } from 'react';
import { TABLE_MAX_TEAM_LIMIT } from '@/utils/constants';
import { Team_Members, Investors } from '@/graphql/types';

type Props = {
  className?: string;
  items?: Team_Members[] | Investors[];
  limit?: number;
};

export const ElemPillsPeople: FC<Props> = ({
  className,
  items,
  limit = TABLE_MAX_TEAM_LIMIT,
}) => {
  const [teamLimit, setTeamLimit] = useState(limit);

  if (!items) {
    return null;
  }

  const showMoreTeam = () => {
    setTeamLimit(TABLE_MAX_TEAM_LIMIT);
  };

  return (
    <div className={`flex flex-wrap overflow-clip gap-2 ${className}`}>
      {items?.slice(0, teamLimit).map((item, index: number) => {
        return (
          <a key={index} href={`/people/${item.person?.slug}`}>
            <button className="shrink-0 bg-neutral-900 text-xs font-medium px-3 py-1 rounded-full ">
              {item.person?.name}
            </button>
          </a>
        );
      })}

      {teamLimit < items.length && (
        <button
          onClick={showMoreTeam}
          className="text-xs text-gray-500 font-medium py-1">
          {items.length - teamLimit} more
        </button>
      )}
    </div>
  );
};
