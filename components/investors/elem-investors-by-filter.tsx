import {
  Order_By,
  useGetVcFirmsQuery,
  Vc_Firms,
  Vc_Firms_Bool_Exp,
} from '@/graphql/types';
import usePagination from '@/hooks/use-pagination';
import { DeepPartial } from '@/types/common';
import { times } from 'lodash';
import { FC } from 'react';
import { Pagination } from '../pagination';
import { PlaceholderInvestorCard } from '../placeholders';
import { ElemInvestorCard } from './elem-investor-card';
import { InvestorsTable } from './elem-investors-table';

type Props = {
  headingText: string;
  filters: DeepPartial<Vc_Firms_Bool_Exp>;
  itemsPerPage: number;
  tagOnClick: any;
  isTableView?: boolean;
};

export const InvestorsByFilter: FC<Props> = ({
  headingText,
  filters,
  itemsPerPage,
  tagOnClick,
  isTableView = false,
}) => {
  const { page, setPage, nextPage, previousPage } = usePagination();

  const { data, isLoading, error } = useGetVcFirmsQuery({
    offset: page * itemsPerPage,
    limit: itemsPerPage,
    // @ts-expect-error this should work
    orderBy: [{ updated_at: Order_By.Desc }],
    where: filters as Vc_Firms_Bool_Exp,
  });

  if (isLoading) {
    return (
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mb-16">
        {times(itemsPerPage, index => (
          <PlaceholderInvestorCard key={index} />
        ))}
      </div>
    );
  }

  if (
    error ||
    !data?.vc_firms ||
    !data?.vc_firms_aggregate ||
    data.vc_firms.length === 0
  ) {
    return <></>;
  }

  const { vc_firms, vc_firms_aggregate } = data;

  return (
    <>
      <div className="text-2xl font-semibold ml-4">{headingText}</div>
      <div
        data-testid="personalizedCompanies"
        className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-16">
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
