import React, { FC } from 'react';
import { ElemCarouselWrap } from '@/components/elem-carousel-wrap';
import { ElemCarouselCard } from '@/components/elem-carousel-card';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemReactions } from '@/components/elem-reactions';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import { Resource_Links } from '@/graphql/types';
import ElemCompanyTags from './elem-company-tags';

type Props = {
  className?: string;
  heading?: string;
  subOrganizations?: Array<Resource_Links>;
};

export const ElemSubOrganizations: FC<Props> = ({
  className = '',
  heading,
  subOrganizations,
}) => {
  return (
    <section className={`bg-white rounded-lg p-5 shadow ${className}`}>
      {heading && <h2 className="text-xl font-bold">{heading}</h2>}

      <ElemCarouselWrap>
        {subOrganizations?.map((item: Resource_Links, index: number) => {
          const resourceType = item.to_company ? 'companies' : 'vc_firms';
          const subOrganization = item.to_company || item.to_vc_firm;

          if (!subOrganization) {
            return null;
          }

          // Add 'amount' from investment_rounds array
          const fundingTotal = item.to_company?.investment_rounds?.reduce(
            (total: number, currentValue: any) =>
              (total = total + currentValue.amount),
            0,
          );

          return (
            <ElemCarouselCard
              key={index}
              className={`p-3 basis-full sm:basis-1/2 lg:basis-1/3`}
            >
              <a
                href={`/${item.to_company ? 'companies' : 'investors'}/${
                  subOrganization.slug
                }`}
                className="z-0 flex flex-col box-border w-full h-full p-5 transition-all bg-white border border-black/10 rounded-lg  hover:scale-102 hover:shadow"
              >
                <div className="flex items-center">
                  <ElemPhoto
                    photo={subOrganization.logo}
                    wrapClass="flex items-center justify-center aspect-square w-16 h-16 p-2 bg-white rounded-lg shadow"
                    imgClass="object-contain w-full h-full"
                    imgAlt={subOrganization.name}
                    placeholderClass="text-slate-300"
                  />

                  <div className="pl-2 md:overflow-hidden">
                    <h3 className="inline min-w-0 text-2xl font-bold break-words align-middle line-clamp-2 sm:text-lg md:text-xl xl:text-2xl">
                      {subOrganization.name}
                    </h3>
                  </div>
                </div>

                {item.to_company && (
                  <ElemCompanyTags company={item.to_company} />
                )}

                <div className="mt-4 grow">
                  <div className="text-gray-400 line-clamp-3">
                    {subOrganization.overview}
                  </div>
                </div>
                <div
                  className="flex items-center justify-between mt-4 gap-x-5"
                  onClick={e => e.stopPropagation()}
                >
                  <ElemReactions
                    resource={subOrganization}
                    resourceType={resourceType}
                  />
                  <ElemSaveToList
                    resourceName={subOrganization.name}
                    resourceId={subOrganization.id}
                    resourceType={resourceType}
                    slug={subOrganization.slug!}
                  />
                </div>
              </a>
            </ElemCarouselCard>
          );
        })}
      </ElemCarouselWrap>
    </section>
  );
};
