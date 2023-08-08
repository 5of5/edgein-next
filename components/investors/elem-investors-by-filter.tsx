import {
  Order_By,
  useGetVcFirmsQuery,
  Vc_Firms,
  Vc_Firms_Bool_Exp,
} from '@/graphql/types';
import { DeepPartial } from '@/types/common';
import { times } from 'lodash';
import { FC } from 'react';
import { PlaceholderInvestorCard } from '../placeholders';
import { ElemInvestorCard } from './elem-investor-card';

type Props = {
  headingText: string;
  filters: DeepPartial<Vc_Firms_Bool_Exp>;
  tagOnClick: any;
};

export const InvestorsByFilter: FC<Props> = ({
  headingText,
  filters,
  tagOnClick,
}) => {
  const { data, isLoading, error } = useGetVcFirmsQuery({
    offset: 0,
    limit: 8,
    // @ts-expect-error this should work
    orderBy: [{ updated_at: Order_By.Desc }],
    where: filters as Vc_Firms_Bool_Exp,
  });

  if (isLoading) {
    return (
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mb-16">
        {times(4, index => (
          <PlaceholderInvestorCard key={index} />
        ))}
      </div>
    );
  }

  if (isLoading || data?.vc_firms.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className="text-2xl font-semibold ml-4">{headingText}</div>
      <div
        data-testid="personalizedCompanies"
        className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mb-16"
      >
        {!isLoading &&
          !error &&
          data?.vc_firms.map(vcFirm => (
            <ElemInvestorCard
              key={vcFirm.id}
              vcFirm={vcFirm as Vc_Firms}
              tagOnClick={tagOnClick}
            />
          ))}
      </div>
    </>
  );
};
