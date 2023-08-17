import React, { useState } from 'react';
import { MAX_TAGS_LIMIT } from '@/utils/constants';

type Props = {
  className?: string;
  resourceType: 'companies' | 'investors' | 'events' | 'news';
  tags?: (string | null)[];
  filter?: string;
  limit?: number;
};

export const ElemTags: React.FC<Props> = ({
  className,
  resourceType,
  tags,
  filter = 'industry',
  limit = MAX_TAGS_LIMIT,
}) => {
  const [tagsLimit, setTagsLimit] = useState(limit);

  const showMoreTags = () => {
    setTagsLimit(MAX_TAGS_LIMIT);
  };

  if (tags) {
    return (
      <div className={`flex flex-wrap overflow-clip gap-2 ${className}`}>
        {resourceType === 'news'
          ? tags.slice(0, tagsLimit).map((tag, index: number) => {
              return (
                <div
                  key={index}
                  className="shrink-0 bg-gray-100 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </div>
              );
            })
          : tags.slice(0, tagsLimit).map((tag, index: number) => {
              return (
                <a
                  key={index}
                  href={`/${resourceType}/?filters=${encodeURIComponent(
                    `{"${filter}":{"tags":["${tag}"]}}`,
                  )}`}
                >
                  <button className="shrink-0 bg-gray-100 text-xs font-medium px-3 py-1 rounded-full hover:bg-gray-200">
                    {tag}
                  </button>
                </a>
              );
            })}

        {tagsLimit < tags.length && (
          <button
            onClick={showMoreTags}
            className="text-xs text-gray-500 font-medium py-1"
          >
            {tags.length - tagsLimit} more
          </button>
        )}
      </div>
    );
  }
  return null;
};
