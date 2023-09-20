import React, { useState } from 'react';
import { TABLE_MAX_TEAM_LIMIT } from '@/utils/constants';

type Props = {
  className?: string;
  items?: (string | null | any)[];
  limit?: number;
};

export const ElemPillsPeople: React.FC<Props> = ({
  className,
  items,
  limit = TABLE_MAX_TEAM_LIMIT,
}) => {
  const [teamLimit, setTeamLimit] = useState(limit);

  const showMoreTeam = () => {
    setTeamLimit(TABLE_MAX_TEAM_LIMIT);
  };

  if (items) {
    return (
      <div className={`flex flex-wrap overflow-clip gap-2 ${className}`}>
        {items.slice(0, teamLimit).map((item, index: number) => {
          return (
            <a key={index} href={`/people/${item.person?.slug}`}>
              <button className="shrink-0 bg-gray-100 text-xs font-medium px-3 py-1 rounded-full hover:bg-gray-200">
                {item.person?.name}
              </button>
            </a>
          );
        })}

        {teamLimit < items.length && (
          <button
            onClick={showMoreTeam}
            className="text-xs text-gray-500 font-medium py-1"
          >
            {items.length - teamLimit} more
          </button>
        )}
      </div>
    );
  }
  return null;
};
