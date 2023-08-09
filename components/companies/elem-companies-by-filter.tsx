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
import { CompaniesTable } from './elem-companies-table';
import { ElemCompanyCard } from './elem-company-card';

type Props = {
  headingText: string;
  filters: DeepPartial<Companies_Bool_Exp>;
  itemsPerPage: number;
  tagOnClick: any;
  isTableView?: boolean;
};

export const CompaniesByFilter: FC<Props> = ({
  headingText,
  filters,
  itemsPerPage,
  tagOnClick,
  isTableView = false,
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
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mb-16">
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
    <>
      <div className="text-2xl font-semibold ml-4">{headingText}</div>
      <div
        data-testid="personalizedCompanies"
        className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-16">
        {!isLoading &&
          !error &&
          data?.companies.map(company => (
            <ElemCompanyCard
              key={company.id}
              company={company as Companies}
              tagOnClick={tagOnClick}
            />
          ))}
      </div>
    </>
  );
};
