import { FC, useState } from 'react';
import { Companies } from '@/graphql/types';
import { getLayerClass } from '@/utils/style';
import {
  CARD_DEFAULT_TAGS_LIMIT,
  CARD_MAX_TAGS_LIMIT,
} from '@/utils/constants';

type Props = {
  className?: string;
  company: Companies;
  hideLayer?: boolean;
  tagOnClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
    tag: string,
  ) => void;
};

const ElemCompanyTags: FC<Props> = ({
  className = '',
  company,
  hideLayer = false,
  tagOnClick,
}) => {
  const { layer, tags, status_tags } = company;

  const [tagsLimit, setTagsLimit] = useState(CARD_DEFAULT_TAGS_LIMIT);
  const showMoreTags = () => {
    setTagsLimit(CARD_MAX_TAGS_LIMIT);
  };

  const isRaisingCompany =
    status_tags && status_tags.length > 0 && status_tags.includes('Raising');

  const handleTagClick = (
    event: React.MouseEvent<HTMLButtonElement>,
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
            <button
              key={index}
              onClick={e => handleTagClick(e, tag)}
              className={`shrink-0 bg-gray-100 text-xs font-medium px-3 py-1 rounded-full ${
                tagOnClick !== undefined
                  ? 'cursor-pointer hover:bg-gray-200'
                  : ''
              }`}
            >
              {tag}
            </button>
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
