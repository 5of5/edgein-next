import {
  Companies,
  Companies_Bool_Exp,
  Order_By,
  useGetCompaniesQuery,
} from '@/graphql/types';
import { DeepPartial } from '@/types/common';
import { times } from 'lodash';
import { FC } from 'react';
import { PlaceholderCompanyCard } from '../placeholders';
import { ElemCompanyCard } from './elem-company-card';

type Props = {
  headingText: string;
  filters: DeepPartial<Companies_Bool_Exp>;
  tagOnClick: any;
};

export const CompaniesByFilter: FC<Props> = ({
  headingText,
  filters,
  tagOnClick,
}) => {
  const { data, isLoading, error } = useGetCompaniesQuery({
    offset: 0,
    limit: 8,
    // @ts-expect-error this should work
    orderBy: [{ updated_at: Order_By.Desc }],
    where: filters as Companies_Bool_Exp,
  });

  if (isLoading) {
    return (
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-16">
        {times(4, index => (
          <PlaceholderCompanyCard key={index} />
        ))}
      </div>
    );
  }

  if (isLoading || data?.companies.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className="text-2xl font-semibold ml-4">{headingText}</div>
      <div
        data-testid="personalizedCompanies"
        className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-16"
      >
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