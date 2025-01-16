import {
  Companies,
  Companies_Bool_Exp,
  Companies_Order_By,
  Order_By,
  useGetPersonalizedCompaniesQuery,
} from '@/graphql/types';
import usePagination from '@/hooks/use-pagination';
import { DeepPartial } from '@/types/common';
import { getHomepageEncodedURI } from '@/components/filters/processor';
import { filter, times } from 'lodash';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { ElemButton } from '../elem-button';
import { Pagination } from '../pagination';
import { PlaceholderCompanyCard } from '../placeholders';
import { CompaniesTable } from './elem-companies-table';
import { CardType, ElemCompanyCard } from './elem-company-card';
import { ROUTES } from '@/routes';

export type FilterInSectionType = 'pagination' | 'see-all';

type Props = {
  headingText: string;
  filters: DeepPartial<Companies_Bool_Exp>;
  orderBy?: DeepPartial<Companies_Order_By>;
  itemsPerPage: number;
  isTableView?: boolean;
  cardType?: CardType;
  filterInSectionType?: FilterInSectionType;
  onOpenUpgradeDialog: () => void;
  userCanUsePremiumFilter: boolean;
  isEnabledSeeAll?: boolean;
};

export const CompaniesByFilterInSection: FC<Props> = ({
  headingText,
  filters,
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

  const { data, isLoading, error } = useGetPersonalizedCompaniesQuery(
    {
      offset: page * itemsPerPage,
      limit: itemsPerPage,
      // @ts-expect-error this should work
      orderBy: [orderBy ?? { updated_at: Order_By.Desc }],
      where: filters as Companies_Bool_Exp,
    },
    { refetchOnWindowFocus: false },
  );

  const { encodedFilters, encodedStatusTag, encodedSortBy, isPremiumFilter } =
    getHomepageEncodedURI(filters, orderBy);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 gap-x-8 sm:grid-cols-2 xl:grid-cols-4">
        {times(itemsPerPage, index => (
          <PlaceholderCompanyCard key={index} />
        ))}
      </div>
    );
  }

  if (
    error ||
    !data?.companies ||
    !data?.companies_aggregate ||
    data.companies.length === 0
  ) {
    return (
      <div className="mx-8 my-6 text-lg text-center">
        Sorry, we couldn&apos;t find any companies today. Check back in
        tomorrow!
      </div>
    );
  }

  const { companies, companies_aggregate } = data;

  return (
    <div>
      <div className="mt-5 mb-3 text-lg font-medium">{headingText}</div>
      {isTableView ? (
        <CompaniesTable
          companies={companies}
          pageNumber={page}
          itemsPerPage={itemsPerPage}
          shownItems={companies?.length}
          totalItems={companies_aggregate.aggregate?.count ?? 0}
          onClickPrev={previousPage}
          onClickNext={nextPage}
        />
      ) : (
        <div>
          <div
            data-testid="personalizedCompanies"
            className="grid grid-cols-1 gap-8 gap-x-8 sm:grid-cols-2 xl:grid-cols-4">
            {companies.map(company => (
              <ElemCompanyCard
                key={company.id}
                company={company as Companies}
                type={cardType} name={undefined}              />
            ))}
          </div>

          <div className="py-3">
            {filterInSectionType === 'pagination' && (
              <div className="px-4 ">
                <Pagination
                  shownItems={companies.length}
                  totalItems={companies_aggregate.aggregate?.count ?? 0}
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
              (companies_aggregate.aggregate?.count ?? 0) > itemsPerPage && (
                <div className="flex justify-end py-3">
                  <ElemButton
                    onClick={() => {
                      if (isPremiumFilter && !userCanUsePremiumFilter) {
                        onOpenUpgradeDialog();
                        return;
                      }
                      router.push(
                        `${ROUTES.COMPANIES}/?filters=${encodedFilters}&statusTag=${encodedStatusTag}&sortBy=${encodedSortBy}`,
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
