import React, { FC } from 'react';
import { PlaceholderCompanyCard } from '@/components/placeholders';
import { ElemCarouselWrap } from '@/components/elem-carousel-wrap';
import { ElemCarouselCard } from '@/components/elem-carousel-card';
import { ElemPhoto } from '@/components/elem-photo';
import { formatDate, convertToInternationalCurrencySystem } from '@/utils';
import {
  Companies_Bool_Exp,
  useGetCompaniesRecentQuery,
} from '@/graphql/types';
import { ElemReactions } from '@/components/elem-reactions';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import useLibrary from '@/hooks/use-library';
import { DeepPartial } from '@/types/common';
import { ElemTags } from '@/components/elem-tags';
import { ROUTES } from '@/routes';

type Props = {
  className?: string;
  heading?: string;
  itemsLimit?: number;
};

export const ElemRecentCompanies: FC<Props> = ({
  className = '',
  heading,
  itemsLimit,
}) => {
  const { selectedLibrary } = useLibrary();

  const limit = itemsLimit ? itemsLimit : 33;
  const offset = null;

  const filters: DeepPartial<Companies_Bool_Exp> = {
    _and: [
      {
        slug: { _neq: '' },
        date_added: { _neq: new Date(0) },
        library: { _contains: selectedLibrary },
      },
    ],
  };

  const {
    data: companiesData,
    error,
    isLoading,
  } = useGetCompaniesRecentQuery({
    offset,
    limit,
    where: filters as Companies_Bool_Exp,
  });

  const companies = companiesData?.companies || [];

  return (
    <div className={`bg-black rounded-lg p-5 ${className}`}>
      {heading && <h2 className="text-xl font-bold">{heading}</h2>}
      {error ? (
        <h4>Error loading companies</h4>
      ) : isLoading ? (
        <>
          <div className="flex -mx-3 overflow-hidden">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="p-4 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3">
                <PlaceholderCompanyCard />
              </div>
            ))}
          </div>
        </>
      ) : (
        companies && (
          <ElemCarouselWrap>
            {companies.map((company: any, index: number) => {
              // Add 'amount' from investment_rounds array
              const fundingTotal = company.investment_rounds?.reduce(
                (total: number, currentValue: any) =>
                  (total = total + currentValue.amount),
                0,
              );

              return (
                <ElemCarouselCard
                  key={index}
                  className={`p-4 basis-full sm:basis-1/2 lg:basis-1/3`}>
                  <a
                    href={`${ROUTES.COMPANIES}/${company.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="box-border z-0 flex flex-col w-full h-full p-5 transition-all bg-black border rounded-lg border-black/10 hover:scale-102 hover:shadow">
                    <div className="flex items-center">
                      <ElemPhoto
                        photo={company.logo}
                        wrapClass="flex items-center justify-center aspect-square w-16 h-16 p-2 bg-black rounded-lg shadow"
                        imgClass="object-contain w-full h-full"
                        imgAlt={company.name}
                        placeholderClass="text-gray-300"
                      />

                      <div className="pl-2 md:overflow-hidden">
                        <h3 className="inline min-w-0 max-w-[16rem] text-2xl font-bold break-words align-middle line-clamp-2 sm:text-lg md:text-xl xl:text-2xl">
                          {company.name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex gap-6 mt-4 text-xs font-bold text-slate-600">
                      <span>
                        Added{' '}
                        {formatDate(company.date_added, {
                          month: 'short',
                          day: '2-digit',
                          year: 'numeric',
                        })}
                      </span>
                      <span>
                        {fundingTotal > 0 && (
                          <div className="flex items-center space-x-1">
                            <div className="">Raised</div>
                            <div className="flex items-center text-green-600">
                              $
                              {convertToInternationalCurrencySystem(
                                fundingTotal,
                              )}
                            </div>
                          </div>
                        )}
                      </span>
                    </div>

                    <ElemTags
                      className="mt-4"
                      resourceType={'companies'}
                      tags={company.tags}
                    />

                    <div className="mt-4 grow">
                      <div className="text-gray-400 line-clamp-3">
                        {company.overview}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <ElemReactions
                        resource={company}
                        resourceType={'companies'}
                      />
                      <ElemSaveToList
                        resourceName={company.name}
                        resourceId={company.id}
                        resourceType={'companies'}
                        slug={company.slug}
                        buttonStyle="default"
                        follows={company.follows}
                      />
                    </div>
                  </a>
                </ElemCarouselCard>
              );
            })}
          </ElemCarouselWrap>
        )
      )}
    </div>
  );
};
