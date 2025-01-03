import {
  Companies,
  Companies_Bool_Exp,
  Companies_Order_By,
  Order_By,
  useGetPersonalizedCompaniesQuery,
} from '@/graphql/types';
import usePagination from '@/hooks/use-pagination';
import { DeepPartial } from '@/types/common';
import { times } from 'lodash';
import { FC } from 'react';
import { Pagination } from '../pagination';
import { PlaceholderCompanyCard } from '../placeholders';
import { CompaniesTable } from '../companies/elem-companies-table';
import { CardType, ElemCompanyCard } from '../companies/elem-company-card';

type Props = {
  headingText: string;
  filters: DeepPartial<Companies_Bool_Exp>;
  orderBy?: DeepPartial<Companies_Order_By>;
  itemsPerPage: number;
  tagOnClick: any;
  isTableView?: boolean;
  cardType?: CardType;
};

export const CompaniesByFilter: FC<Props> = ({
  headingText,
  filters,
  orderBy,
  itemsPerPage,
  tagOnClick,
  isTableView = false,
  cardType = 'full',
}) => {
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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 gap-x-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
    return <></>;
  }

  const { companies, companies_aggregate } = data;

  return (
    <div>
      hello
      <div className="my-4 text-4xl font-medium">{headingText}</div>
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
            className="grid grid-cols-1 gap-8 mt-8 gap-x-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {companies.map(company => (
              <ElemCompanyCard
                key={company.id}
                company={company as Companies}
                type={cardType}
              />
            ))}
          </div>

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
    </div>
  );
};
