import {
  Order_By,
  useGetVcFirmsQuery,
  Vc_Firms,
  Vc_Firms_Bool_Exp,
  Vc_Firms_Order_By,
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
  orderBy?: DeepPartial<Vc_Firms_Order_By>;
  itemsPerPage: number;
  tagOnClick: any;
  isTableView?: boolean;
};

export const InvestorsByFilter: FC<Props> = ({
  headingText,
  filters,
  orderBy,
  itemsPerPage,
  tagOnClick,
  isTableView = false,
}) => {
  const { page, setPage, nextPage, previousPage } = usePagination();

  const { data, isLoading, error } = useGetVcFirmsQuery({
    offset: page * itemsPerPage,
    limit: itemsPerPage,
    // @ts-expect-error this should work
    orderBy: [orderBy ?? { updated_at: Order_By.Desc }],
    where: filters as Vc_Firms_Bool_Exp,
  });

  if (isLoading) {
    return (
      <div className="grid gap-8 gap-x-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mb-16">
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
    <div>
      <div className="text-2xl font-medium my-4">{headingText}</div>
      {isTableView ? (
        <InvestorsTable
          investors={vc_firms}
          pageNumber={page}
          itemsPerPage={itemsPerPage}
          shownItems={vc_firms.length}
          totalItems={vc_firms_aggregate.aggregate?.count ?? 0}
          onClickPrev={previousPage}
          onClickNext={nextPage}
          filterByTag={tagOnClick}
        />
      ) : (
        <div>
          <div
            data-testid="personalizedCompanies"
            className="grid gap-8 gap-x-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          >
            {vc_firms.map(vcFirm => (
              <ElemInvestorCard key={vcFirm.id} vcFirm={vcFirm as Vc_Firms} />
            ))}
          </div>

          <Pagination
            shownItems={vc_firms.length}
            totalItems={vc_firms_aggregate.aggregate?.count ?? 0}
            page={page}
            itemsPerPage={itemsPerPage}
            onClickPrev={previousPage}
            onClickNext={nextPage}
            onClickToPage={selectedPage => setPage(selectedPage)}
          />
        </div>
      )}
    </div>
  );
};
