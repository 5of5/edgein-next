import {
  Companies,
  Companies_Bool_Exp,
  Order_By,
  useGetCompaniesQuery,
} from '@/graphql/types';
import usePagination from '@/hooks/use-pagination';
import { DeepPartial } from '@/types/common';
import { times } from 'lodash';
import { FC } from 'react';
import { Pagination } from '../pagination';
import { PlaceholderCompanyCard } from '../placeholders';
import { ElemCompanyCard } from './elem-company-card';

type Props = {
  headingText: string;
  filters: DeepPartial<Companies_Bool_Exp>;
  itemsPerPage: number;
  tagOnClick: any;
};

export const CompaniesByFilter: FC<Props> = ({
  headingText,
  filters,
  itemsPerPage,
  tagOnClick,
}) => {
  const { page, setPage, nextPage, previousPage } = usePagination();

  const { data, isLoading, error } = useGetCompaniesQuery({
    offset: page * itemsPerPage,
    limit: itemsPerPage,
    // @ts-expect-error this should work
    orderBy: [{ updated_at: Order_By.Desc }],
    where: filters as Companies_Bool_Exp,
  });

  if (isLoading) {
    return (
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-16">
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
    <div className="mb-16">
      <div className="text-2xl font-semibold ml-4">{headingText}</div>
      <div
        data-testid="personalizedCompanies"
        className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
      >
        {companies.map(company => (
          <ElemCompanyCard
            key={company.id}
            company={company as Companies}
            tagOnClick={tagOnClick}
          />
        ))}
      </div>

      <div className="mx-4 mt-4">
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
    </div>
  );
};
