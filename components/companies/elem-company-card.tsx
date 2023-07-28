import { Companies } from '@/graphql/types';
import { FC, useEffect, useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemReactions } from '@/components/elem-reactions';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import { ElemTooltip } from '@/components/elem-tooltip';
import Link from 'next/link';
import ElemCompanyTags from '../elem-company-tags';
import { IconGlobe } from '@/components/icons';

type Props = {
  company: Companies;
  tagOnClick: any;
};

export const ElemCompanyCard: FC<Props> = ({ company, tagOnClick }) => {
  const [companyData, setCompanyData] = useState(company);

  useEffect(() => {
    setCompanyData(company);
  }, [company]);

  const { id, slug, logo, name, coin, overview, follows, website } =
    companyData;

  return (
    <div className="flex flex-col w-full p-4">
      <Link href={`/companies/${slug}`}>
        <a target="_blank">
          <div className="flex shrink-0 w-full">
            <ElemPhoto
              photo={logo}
              wrapClass="flex items-center justify-center shrink-0 w-36 aspect-square p-1 bg-white rounded-lg shadow"
              imgClass="object-fit max-w-full max-h-full"
              imgAlt={name}
              placeholderClass="text-slate-300"
            />
          </div>
        </a>
      </Link>
      <Link href={`/companies/${slug}`}>
        <a target="_blank" className="flex items-center mt-4">
          <h3
            className="inline min-w-0 text-xl font-medium break-words line-clamp-1"
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
        </a>
      </Link>

      <div>
        {overview && (
          <div className="grow mt-4">
            <div className="text-sm line-clamp-3">{overview}</div>
          </div>
        )}
        <ElemCompanyTags company={company} tagOnClick={tagOnClick} />
      </div>
      <div className="flex items-center justify-between mt-4 gap-x-5">
        <div>
          {website && (
            <Link href={website}>
              <a target="_blank">
                <IconGlobe className="h-6 w-6" />
              </a>
            </Link>
          )}
        </div>
        {/* <ElemReactions resource={company} resourceType={'companies'} /> */}
        <ElemSaveToList
          resourceName={name}
          resourceId={id}
          resourceType={'companies'}
          slug={slug!}
          buttonStyle="white"
          follows={follows}
        />
      </div>
    </div>
  );
};
