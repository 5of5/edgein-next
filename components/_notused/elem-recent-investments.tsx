import React, { FC, useEffect, useState } from 'react';
import { PlaceholderInvestorCard } from '@/components/placeholders';
import { ElemCarouselWrap } from '@/components/elem-carousel-wrap';
import { ElemCarouselCard } from '@/components/elem-carousel-card';
import { ElemPhoto } from '@/components/elem-photo';
import {
  Vc_Firms_Bool_Exp,
  useGetVcFirmsRecentInvestmentsQuery,
} from '@/graphql/types';
import { ElemReactions } from '@/components/elem-reactions';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import { useAuth } from '@/hooks/use-auth';
import { formatDate } from '@/utils';
import useLibrary from '@/hooks/use-library';
import { DeepPartial } from '@/types/common';
import { ROUTES } from '@/routes';

type Props = {
  className?: string;
  heading?: string;
  itemsLimit?: number;
};

export const ElemRecentInvestments: FC<Props> = ({
  className = '',
  heading,
  itemsLimit,
}) => {
  const { user } = useAuth();

  const { selectedLibrary } = useLibrary();

  const limit = itemsLimit ? itemsLimit : 33;
  const offset = null;

  const filters: DeepPartial<Vc_Firms_Bool_Exp> = {
    _and: [
      { slug: { _neq: '' } },
      { status: { _neq: 'draft' } },
      { library: { _contains: selectedLibrary } },
    ],
  };

  const {
    data: vcFirmsData,
    error,
    isLoading,
  } = useGetVcFirmsRecentInvestmentsQuery({
    offset,
    limit,
    where: filters as Vc_Firms_Bool_Exp,
  });

  const vcFirms = vcFirmsData?.vc_firms || [];

  return (
    <div className={`bg-black rounded-lg p-5 shadow ${className}`}>
      {heading && <h2 className="text-xl font-bold">{heading}</h2>}
      {error ? (
        <h4>Error loading investors</h4>
      ) : isLoading ? (
        <>
          <div className="flex -mx-3 overflow-hidden">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="p-4 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3">
                <PlaceholderInvestorCard />
              </div>
            ))}
          </div>
        </>
      ) : (
        vcFirms && (
          <ElemCarouselWrap>
            {vcFirms.map((investor: any, index: number) => {
              return (
                <ElemCarouselCard
                  key={index}
                  className={`p-4 basis-full sm:basis-1/2 lg:basis-1/3`}>
                  <a
                    href={`${ROUTES.INVESTORS}/${investor.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="z-0 flex flex-col w-full h-full p-5 transition-all border rounded-lg border-dark-500/10 hover:scale-102 hover:shadow">
                    <div className="flex">
                      <ElemPhoto
                        photo={investor.logo}
                        wrapClass="flex items-center justify-center aspect-square w-16 h-16 p-2 bg-black rounded-lg shadow"
                        imgClass="object-contain w-full h-full"
                        imgAlt={investor.name}
                        placeholderClass="text-gray-300"
                      />
                      <div className="flex items-center justify-center pl-2 md:overflow-hidden">
                        <h3 className="inline min-w-0 max-w-[16rem] text-2xl font-bold break-words align-middle line-clamp-2 sm:text-lg md:text-xl xl:text-2xl">
                          {investor.name}
                        </h3>
                      </div>
                    </div>

                    {(investor.num_of_investments > 0 ||
                      investor.num_of_exits > 0) && (
                      <div className="flex flex-wrap mt-4 space-x-1 text-slate-600">
                        {investor.num_of_investments !== null &&
                          investor.num_of_investments > 0 && (
                            <div>
                              <span className="mr-1 font-bold">
                                {investor.num_of_investments}
                              </span>
                              Investment
                              {investor.num_of_investments > 1 && 's'}
                            </div>
                          )}

                        {investor.latest_investment && (
                          <>
                            <div>{'•'}</div>
                            <div>
                              Latest{' '}
                              {formatDate(investor.latest_investment, {
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric',
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {investor.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {investor.tags?.map((tag: string, index: number) => {
                          return (
                            <div
                              key={index}
                              className={`shrink-0 bg-slate-200 text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full`}>
                              {tag}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {investor.overview && (
                      <p className="mt-4 line-clamp-3 text-slate-600">
                        {investor.overview}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-4">
                      <ElemReactions
                        resource={investor}
                        resourceType={'vc_firms'}
                      />
                      <ElemSaveToList
                        resourceName={investor.name}
                        resourceId={investor.id}
                        resourceType={'vc_firms'}
                        slug={investor.slug!}
                        buttonStyle="default"
                        follows={investor.follows}
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
