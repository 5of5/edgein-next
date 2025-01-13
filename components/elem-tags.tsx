import React, { useState } from 'react';
import { MAX_TAGS_LIMIT } from '@/utils/constants';

type Props = {
  className?: string;
  resourceType: 'companies' | 'investors' | 'events' | 'news' | 'people';
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
        {['news'].includes(resourceType)
          ? tags.slice(0, tagsLimit).map((tag, index: number) => {
              return (
                <div
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-neutral-900 rounded-full shrink-0">
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
                  )}`}>
                  <button className="px-3 py-1 text-xs font-medium bg-neutral-900 rounded-full shrink-0 ">
                    {tag}
                  </button>
                </a>
              );
            })}

        {tagsLimit < tags.length && (
          <button
            onClick={showMoreTags}
            className="py-1 text-xs font-medium text-gray-500">
            {tags.length - tagsLimit} more
          </button>
        )}
      </div>
    );
  }
  return null;
};
