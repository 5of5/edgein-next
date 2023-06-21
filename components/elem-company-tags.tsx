import { FC } from 'react';
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

  if (layer || isRaisingCompany || tags) {
    return (
      <div className={`mt-4 flex flex-wrap gap-2 ${className}`}>
        {!hideLayer && layer && (
          <div
            className={`${getLayerClass(
              layer,
            )} shrink-0 text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full`}
          >
            {layer}
          </div>
        )}

        {isRaisingCompany && (
          <div className="shrink-0 bg-rose-100 text-rose-500 text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full">
            Raising
          </div>
        )}

        {tags?.map((tag: string, index: number) => {
          return (
            <div
              key={index}
              onClick={e => handleTagClick(e, tag)}
              className={`shrink-0 bg-slate-200 text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full ${
                tagOnClick !== undefined
                  ? 'cursor-pointer hover:bg-slate-300'
                  : ''
              }`}
            >
              {tag}
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};

export default ElemCompanyTags;
