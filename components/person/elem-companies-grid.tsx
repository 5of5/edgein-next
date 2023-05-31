import { ElemOrganizationCard } from '../elem-organization-card';

type Props = {
  className?: string;
  heading?: string;
  companies: Record<string, any>[];
};

export const ElemCompaniesGrid: React.FC<Props> = ({
  className,
  heading,
  companies,
}) => {
  return (
    <section className={className}>
      {heading && <h2 className="text-2xl font-bold">{heading}</h2>}
      <div className="flex flex-col gap-5 mt-3 w-full sm:grid sm:grid-cols-2 md:grid-cols-3">
        {companies.map(company => {
          return (
            <ElemOrganizationCard
              key={company.id}
              href={`/companies/${company.slug}`}
              photos={company.logo}
              heading={company.name}
              text={company.overview}
            />
          );
        })}
      </div>
    </section>
  );
};
