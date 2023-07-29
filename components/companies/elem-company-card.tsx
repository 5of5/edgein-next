import { Companies } from '@/graphql/types';
import { FC, useEffect, useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemReactions } from '@/components/elem-reactions';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import { ElemTooltip } from '@/components/elem-tooltip';
import Link from 'next/link';
import ElemCompanyTags from '../elem-company-tags';
import {
  IconGlobe,
  IconTwitter,
  IconGithub,
  IconDiscord,
} from '@/components/icons';

type Props = {
  company: Companies;
  tagOnClick: any;
};

export const ElemCompanyCard: FC<Props> = ({ company, tagOnClick }) => {
  const [companyData, setCompanyData] = useState(company);

  useEffect(() => {
    setCompanyData(company);
  }, [company]);

  const {
    id,
    slug,
    logo,
    name,
    coin,
    overview,
    follows,
    website,
    twitter,
    github,
    discord,
  } = companyData;

  return (
    <div className="flex flex-col w-full p-4">
      <Link href={`/companies/${slug}`}>
        <a target="_blank">
          <div className="flex shrink-0 w-full">
            <ElemPhoto
              photo={logo}
              wrapClass="flex items-center justify-center shrink-0 w-36 aspect-square bg-white rounded-lg overflow-hidden border border-gray-200"
              imgClass="object-fit max-w-full max-h-full"
              imgAlt={name}
              placeholderClass="text-slate-300"
            />
          </div>
        </a>
      </Link>

      <Link href={`/companies/${slug}`}>
        <a target="_blank" className="flex items-center mt-3">
          <ElemTooltip content={name} mode="light">
            <h3 className="text-xl font-medium truncate">{name}</h3>
          </ElemTooltip>
          {coin && (
            <ElemTooltip content={`Token`} mode="light" className="">
              <span className="uppercase">{coin.ticker}</span>
            </ElemTooltip>
          )}
        </a>
      </Link>

      <div className="mt-2">
        {overview && (
          <>
            {/* <ElemTooltip
            content={overview}
            mode="light"
            direction="bottom"
            size="lg"
            delay={1200}
            className="">
            <div className="text-sm line-clamp-3">{overview}</div>
          </ElemTooltip> */}
            <div className="text-sm line-clamp-3 text-gray-500">{overview}</div>
          </>
        )}
        <ElemCompanyTags company={company} tagOnClick={tagOnClick} />
      </div>
      <div className="flex items-center justify-between mt-4 gap-x-5">
        <div className="flex items-center space-x-0.5">
          {website && (
            <Link href={website}>
              <a target="_blank">
                <IconGlobe className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}

          {twitter && (
            <Link href={twitter}>
              <a target="_blank">
                <IconTwitter className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}

          {github && (
            <Link href={github}>
              <a target="_blank">
                <IconGithub className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}

          {discord && (
            <Link href={discord}>
              <a target="_blank">
                <IconDiscord className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}
        </div>

        <ElemSaveToList
          resourceName={name}
          resourceId={id}
          resourceType={'companies'}
          slug={slug!}
          buttonStyle="default"
          follows={follows}
        />
      </div>
    </div>
  );
};
