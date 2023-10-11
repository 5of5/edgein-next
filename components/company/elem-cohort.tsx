import { FC, MouseEvent } from 'react';
import { PlaceholderCompanyCard } from '@/components/placeholders';
import { ElemCarouselWrap } from '@/components/elem-carousel-wrap';
import { ElemCarouselCard } from '@/components/elem-carousel-card';
import { ElemCompanyCard } from '@/components/companies/elem-company-card';
import { useRouter } from 'next/router';
import {
  Companies,
  Companies_Bool_Exp,
  Maybe,
  useGetCompaniesRecentQuery,
} from '@/graphql/types';
import { DeepPartial } from '@/types/common';
import { useUser } from '@/context/user-context';
import { ROUTES } from '@/utils/routes';

type Props = {
  className?: string;
  heading?: string;
  currentSlug: Maybe<string>;
  tag1?: string;
  tag2?: string;
};

export const ElemCohort: FC<Props> = ({
  className = '',
  heading,
  currentSlug,
  tag1,
  tag2,
}) => {
  const { selectedLibrary } = useUser();

  const limit = 12;
  const offset = null;

  const router = useRouter();

  const filters: DeepPartial<Companies_Bool_Exp> = {
    _and: [
      {
        slug: { _neq: '' || currentSlug },
      },
      { library: { _contains: selectedLibrary } },
      { tags: { _contains: tag1 } },
      { tags: { _contains: tag2 } },
    ],
  };

  const {
    data: companiesData,
    error,
    isLoading,
  } = useGetCompaniesRecentQuery({
    offset,
    limit,
    where: filters as Companies_Bool_Exp,
  });

  const companies = companiesData?.companies;

  const tagOnClick = (event: MouseEvent<HTMLButtonElement>, type: string) => {
    event.stopPropagation();
    event.preventDefault();

    router.push(
      `${ROUTES.COMPANIES()}/?filters=${encodeURIComponent(
        `{"industry":{"tags":["${type}"]}}`,
      )}`,
    );
  };

  return (
    <section className={`rounded-lg border border-gray-300 ${className}`}>
      {heading && <h2 className="text-xl font-medium px-4 pt-2">{heading}</h2>}

      {error ? (
        <h4>Error loading similar companies</h4>
      ) : isLoading ? (
        <>
          <div className="flex overflow-hidden">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="p-4 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <PlaceholderCompanyCard />
              </div>
            ))}
          </div>
        </>
      ) : (
        companies && (
          <ElemCarouselWrap>
            {companies.map((company: any, index: number) => {
              return (
                <ElemCarouselCard
                  key={index}
                  className={`p-4 basis-full sm:basis-1/2 lg:basis-1/3`}
                >
                  <ElemCompanyCard company={company as Companies} />
                </ElemCarouselCard>
              );
            })}
          </ElemCarouselWrap>
        )
      )}
    </section>
  );
};
