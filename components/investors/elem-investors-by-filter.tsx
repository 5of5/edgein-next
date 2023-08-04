import {
  Order_By,
  useGetVcFirmsQuery,
  Vc_Firms,
  Vc_Firms_Bool_Exp,
} from '@/graphql/types';
import { DeepPartial } from '@/types/common';
import { FC } from 'react';
import { ElemInvestorCard } from './elem-investor-card';

type Props = {
  headingText: string;
  filters: DeepPartial<Vc_Firms_Bool_Exp>;
  isTableView?: boolean;
  tagOnClick: any
};

export const InvestorsByFilter: FC<Props> = ({
  headingText,
  filters,
  isTableView,
  tagOnClick
}) => {
  const { data, isLoading, error } = useGetVcFirmsQuery({
    offset: 0,
    limit: 8,
    // @ts-expect-error this should work
    orderBy: [{ updated_at: Order_By.Desc }],
    where: filters as Vc_Firms_Bool_Exp,
  });

  if (isLoading || data?.vc_firms.length === 0) {
    return <></>;
  }

  return isTableView ? (
    <>WIP</>
  ) : (
    <>
      <div className="text-2xl font-bold ml-4">{headingText}</div>
      <div
        data-testid="personalizedCompanies"
        className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-16"
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
