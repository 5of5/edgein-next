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
import { FilterInSectionType } from '../companies/elem-companies-by-filter-insection';
import { getHomepageEncodedURI } from '@/components/filters/processor';
import { ElemButton } from '../elem-button';
import { useRouter } from 'next/router';
import { ROUTES } from '@/routes';

type Props = {
  headingText: string;
  filters: DeepPartial<Vc_Firms_Bool_Exp>;
  fallbackFilters?: DeepPartial<Vc_Firms_Bool_Exp>;
  orderBy?: DeepPartial<Vc_Firms_Order_By>;
  itemsPerPage: number;
  isTableView?: boolean;
  cardType?: CardType;
  filterInSectionType?: FilterInSectionType;
  onOpenUpgradeDialog: () => void;
  userCanUsePremiumFilter: boolean;
  isEnabledSeeAll?: boolean;
};

export const InvestorsByFilterInSection: FC<Props> = ({
  headingText,
  filters,
  fallbackFilters,
  orderBy,
  itemsPerPage,
  isTableView = false,
  cardType = 'full',
  filterInSectionType = 'see-all',
  onOpenUpgradeDialog,
  userCanUsePremiumFilter,
  isEnabledSeeAll = true,
}) => {
  const router = useRouter();
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

  const { encodedFilters, encodedStatusTag, encodedSortBy, isPremiumFilter } =
    getHomepageEncodedURI(filters, orderBy);

  if (isLoading || isLoadingSecondary) {
    return (
      <div className="grid grid-cols-1 gap-8 mb-16 gap-x-8 sm:grid-cols-2 xl:grid-cols-4">
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
      <div className="mx-8 my-6 text-lg text-center">
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
      <div className="mt-5 mb-3 text-lg font-medium">{headingText}</div>
      {isTableView ? (
        <InvestorsTable
          investors={vc_firms}
          pageNumber={page}
          itemsPerPage={itemsPerPage}
          shownItems={vc_firms?.length ?? 0}
          totalItems={vc_firms_aggregate?.aggregate?.count ?? 0}
          onClickPrev={previousPage}
          onClickNext={nextPage}
        />
      ) : (
        <div>
          <div
            data-testid="personalizedCompanies"
            className="grid grid-cols-1 gap-8 gap-x-8 sm:grid-cols-2 xl:grid-cols-4">
            {vc_firms?.map(vcFirm => (
              <ElemInvestorCard
                key={vcFirm.id}
                vcFirm={vcFirm as Vc_Firms}
                type={cardType}
              />
            ))}
          </div>

          <div className="py-3">
            {filterInSectionType === 'pagination' && (
              <div className="px-4">
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
            )}

            {filterInSectionType === 'see-all' &&
              isEnabledSeeAll &&
              (vc_firms_aggregate?.aggregate?.count ?? 0) > itemsPerPage && (
                <div className="flex justify-end py-3">
                  <ElemButton
                    onClick={() => {
                      if (isPremiumFilter && !userCanUsePremiumFilter) {
                        onOpenUpgradeDialog();
                        return;
                      }
                      router.push(
                        `${ROUTES.INVESTORS}/?filters=${encodedFilters}&statusTag=${encodedStatusTag}&sortBy=${encodedSortBy}`,
                      );
                    }}
                    btn="primary"
                    size="sm">
                    See all
                  </ElemButton>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};
