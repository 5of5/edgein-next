import {
  Order_By,
  useGetPersonalizedVcFirmsQuery,
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
import { CardType } from '../companies/elem-company-card';

type Props = {
  headingText: string;
  filters: DeepPartial<Vc_Firms_Bool_Exp>;
  fallbackFilters?: DeepPartial<Vc_Firms_Bool_Exp>;
  orderBy?: DeepPartial<Vc_Firms_Order_By>;
  itemsPerPage: number;
  tagOnClick: any;
  isTableView?: boolean;
  cardType?: CardType;
};

export const InvestorsByFilterInSection: FC<Props> = ({
  headingText,
  filters,
  fallbackFilters,
  orderBy,
  itemsPerPage,
  tagOnClick,
  isTableView = false,
  cardType = 'full',
}) => {
  const { page, setPage, nextPage, previousPage } = usePagination();

  const { data, isLoading, error } = useGetPersonalizedVcFirmsQuery(
    {
      offset: page * itemsPerPage,
      limit: itemsPerPage,
      // @ts-expect-error this should work
      orderBy: [orderBy ?? { updated_at: Order_By.Desc }],
      where: filters as Vc_Firms_Bool_Exp,
    },
    { refetchOnWindowFocus: false },
  );

  const {
    data: secondaryData,
    isLoading: isLoadingSecondary,
    error: secondaryError,
  } = useGetPersonalizedVcFirmsQuery(
    {
      offset: page * itemsPerPage,
      limit: itemsPerPage,
      // @ts-expect-error this should work
      orderBy: [orderBy ?? { updated_at: Order_By.Desc }],
      where: fallbackFilters as Vc_Firms_Bool_Exp,
    },
    {
      enabled: Boolean(fallbackFilters) && data?.vc_firms?.length === 0,
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading || isLoadingSecondary) {
    return (
      <div className="grid gap-8 gap-x-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mb-16">
        {times(itemsPerPage, index => (
          <PlaceholderInvestorCard key={index} />
        ))}
      </div>
    );
  }

  if (
    error ||
    secondaryError ||
    ((!data?.vc_firms ||
      !data?.vc_firms_aggregate ||
      data.vc_firms.length === 0) &&
      (!secondaryData?.vc_firms ||
        !secondaryData?.vc_firms_aggregate ||
        secondaryData.vc_firms.length === 0))
  ) {
    return (
      <div className="text-lg text-center mx-8 my-6">
        Sorry, we couldn&apos;t find any investors today. Check back in
        tomorrow!
      </div>
    );
  }

  const vc_firms =
    data?.vc_firms?.length === 0 && fallbackFilters
      ? secondaryData?.vc_firms
      : data?.vc_firms;

  const vc_firms_aggregate =
    data?.vc_firms?.length === 0 && fallbackFilters
      ? secondaryData?.vc_firms_aggregate
      : data?.vc_firms_aggregate;

  return (
    <div>
      <div className="text-lg mt-5 mb-3 font-medium">{headingText}</div>
      {isTableView ? (
        <InvestorsTable
          investors={vc_firms}
          pageNumber={page}
          itemsPerPage={itemsPerPage}
          shownItems={vc_firms?.length ?? 0}
          totalItems={vc_firms_aggregate?.aggregate?.count ?? 0}
          onClickPrev={previousPage}
          onClickNext={nextPage}
          filterByTag={tagOnClick}
        />
      ) : (
        <div>
          <div
            data-testid="personalizedCompanies"
            className="grid gap-8 gap-x-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          >
            {vc_firms?.map(vcFirm => (
              <ElemInvestorCard
                key={vcFirm.id}
                vcFirm={vcFirm as Vc_Firms}
                type={cardType}
              />
            ))}
          </div>

          <div className="py-3 px-4">
            <Pagination
              shownItems={vc_firms?.length ?? 0}
              totalItems={vc_firms_aggregate?.aggregate?.count ?? 0}
              page={page}
              itemsPerPage={itemsPerPage}
              onClickPrev={previousPage}
              onClickNext={nextPage}
              onClickToPage={selectedPage => setPage(selectedPage)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
