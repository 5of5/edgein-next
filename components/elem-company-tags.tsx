import { FC, useState } from 'react';
import { Companies } from '@/graphql/types';
import { getLayerClass } from '@/utils/style';

type Props = {
  className?: string;
  company: Companies;
  hideLayer?: boolean;
  tagOnClick?: (event: React.MouseEvent<HTMLDivElement>, tag: string) => void;
};

const ElemCompanyTags: FC<Props> = ({
  className = '',
  company,
  hideLayer = false,
  tagOnClick,
}) => {
  const { layer, tags, status_tags } = company;

  const [tagsLimit, setTagsLimit] = useState(3);
  const showMoreTags = () => {
    setTagsLimit(50);
  };

  const isRaisingCompany =
    status_tags && status_tags.length > 0 && status_tags.includes('Raising');

  const handleTagClick = (
    event: React.MouseEvent<HTMLDivElement>,
    tag: string,
  ) => {
    if (tagOnClick) {
      tagOnClick(event, tag);
    }
  };

  if (isRaisingCompany || tags) {
    return (
      <div className={`mt-4 flex flex-wrap overflow-clip gap-2 ${className}`}>
        {isRaisingCompany && (
          <div className="shrink-0 bg-rose-100 text-rose-500 text-xs font-medium px-3 py-1 rounded-full">
            Raising
          </div>
        )}

        {tags.slice(0, tagsLimit)?.map((tag: string, index: number) => {
          return (
            <div
              key={index}
              onClick={e => handleTagClick(e, tag)}
              className={`shrink-0 bg-gray-100 text-xs font-medium px-3 py-1 rounded-full ${
                tagOnClick !== undefined
                  ? 'cursor-pointer hover:bg-slate-300'
                  : ''
              }`}
            >
              {tag}
            </div>
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

export default ElemCompanyTags;
