import React from 'react';

type Props = {
  className?: string;
  heading?: string;
  tags: (string | null)[];
  onClick: (tag: string | null, index: number) => void;
  selectedTag?: string | null;
};

export const ElemFilterTags: React.FC<Props> = ({
  className,
  heading,
  tags,
  onClick,
  selectedTag = 'All Members',
}) => {
  return (
    <div className={className}>
      {heading && <h2 className="text-xl font-bold">{heading}</h2>}
      <ul className="flex flex-wrap gap-y-3 gap-x-2 lg:gap-y-2">
        {tags.map((tag, index: number) => {
          return (
            <li
              onClick={() => onClick(tag, index)}
              key={index}
              className={`${
                selectedTag === tag ? 'bg-neutral-900' : ''
              } cursor-pointer px-2 py-1 text-sm rounded transition-all hover:bg-neutral-900`}>
              {tag}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
