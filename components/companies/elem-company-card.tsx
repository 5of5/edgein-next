import { Companies } from '@/graphql/types';
import { FC, useEffect, useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemReactions } from '@/components/elem-reactions';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import { ElemTooltip } from '@/components/elem-tooltip';
import Link from 'next/link';
import ElemCompanyTags from '../elem-company-tags';

type Props = {
  company: Companies;
  tagOnClick: any;
};

export const ElemCompanyCard: FC<Props> = ({ company, tagOnClick }) => {
  const [companyData, setCompanyData] = useState(company);

  useEffect(() => {
    setCompanyData(company);
  }, [company]);

  const { id, slug, logo, name, coin, overview } = companyData;

  return (
    <Link href={`/companies/${slug}`}>
      <a
        target="_blank"
        className="flex flex-col mx-auto w-full p-5 cursor-pointer border border-black/10 rounded-lg transition-all hover:scale-102 hover:shadow"
      >
        <div className="flex shrink-0 w-full">
          <ElemPhoto
            photo={logo}
            wrapClass="flex items-center justify-center shrink-0 w-16 h-16 p-2 bg-white rounded-lg shadow"
            imgClass="object-fit max-w-full max-h-full"
            imgAlt={name}
            placeholderClass="text-slate-300"
          />

          <div className="flex items-center justify-center pl-2 md:overflow-visible">
            <div>
              <h3
                className="inline min-w-0 text-2xl font-bold break-words align-middle line-clamp-2 text-dark-500 sm:text-lg md:text-xl xl:text-2xl"
                title={name ?? ''}
              >
                {name}
              </h3>
              {coin && (
                <ElemTooltip
                  content={`Token`}
                  className="inline-flex items-center overflow-visible"
                >
                  <span className="uppercase">{coin.ticker}</span>
                </ElemTooltip>
              )}
            </div>
          </div>
        </div>

        <div className="grow">
          <ElemCompanyTags company={company} tagOnClick={tagOnClick} />

          {overview && (
            <div className="grow mt-4">
              <div className="text-gray-400 line-clamp-5">{overview}</div>
            </div>
          )}
        </div>
        <div
          className="flex items-center justify-between mt-4 gap-x-5"
          onClick={e => e.stopPropagation()}
        >
          <ElemReactions resource={company} resourceType={'companies'} />
          <ElemSaveToList
            resourceName={name}
            resourceId={id}
            resourceType={'companies'}
            slug={slug!}
            buttonStyle="white"
          />
        </div>
      </a>
    </Link>
  );
};
