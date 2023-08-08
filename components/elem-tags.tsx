import React from 'react';

type Props = {
  className?: string;
  resourceType: 'companies' | 'investors' | 'events';
  tags?: (string | null)[];
  filter?: string;
};

export const ElemTags: React.FC<Props> = ({
  className,
  resourceType,
  tags,
  filter = 'industry',
}) => {
  if (tags) {
    return (
      <div className={`mt-4 flex flex-wrap overflow-clip gap-2 ${className}`}>
        {tags.map((tag, index: number) => {
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
      </div>
    );
  }
  return null;
};
