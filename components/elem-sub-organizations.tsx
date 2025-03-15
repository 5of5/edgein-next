import React, { FC, MouseEvent } from 'react';
import { ElemCarouselWrap } from '@/components/elem-carousel-wrap';
import { ElemCarouselCard } from '@/components/elem-carousel-card';
import { Companies, Vc_Firms, Resource_Links } from '@/graphql/types';
import { ElemCompanyCard } from './companies/elem-company-card';
import { ElemInvestorCard } from './investors/elem-investor-card';

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
    <section className={`rounded-lg border border-gray-700 ${className}`}>
      {heading && <h2 className="text-xl font-medium px-4 pt-2">{heading}</h2>}

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
              className={`p-4 basis-full sm:basis-1/2 lg:basis-1/3`}>
              {item.to_company ? (
                <ElemCompanyCard company={item.to_company as Companies} />
              ) : (
                <ElemInvestorCard vcFirm={item.to_vc_firm as Vc_Firms} />
              )}
            </ElemCarouselCard>
          );
        })}
      </ElemCarouselWrap>
    </section>
  );
};
