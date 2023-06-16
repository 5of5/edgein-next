import { FC } from 'react';
import { Companies } from '@/graphql/types';
import { getLayerClass } from '@/utils/style';

type Props = {
  company: Companies;
};

const ElemCompanyTags: FC<Props> = ({ company }) => {
  const { layer, tags, status_tags } = company;

  const isRaisingCompany =
    status_tags && status_tags.length > 0 && status_tags.includes('Raising');

  if (layer || isRaisingCompany || tags) {
    return (
      <div className="mt-4 flex flex-wrap gap-2">
        {layer && (
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
              className="shrink-0 bg-slate-200 text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full"
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
