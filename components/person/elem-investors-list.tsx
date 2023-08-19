import { Investors } from '@/graphql/types';
import { ElemPhoto } from '@/components/elem-photo';
type Props = {
  className?: string;
  heading?: string;
  investors: Investors[];
};

export const ElemInvestorsList: React.FC<Props> = ({
  className,
  heading,
  investors,
}) => {
  return (
    <section className={`border border-gray-300 rounded-lg ${className}`}>
      <h2 className="text-lg font-medium px-4 pt-2">{heading}</h2>

      <div className="flex flex-col w-full gap-5 sm:grid sm:grid-cols-2">
        {investors.map((investor, index: number) => (
          <a
            href={`/investors/${investor.vc_firm?.slug}`}
            key={investor.vc_firm?.id}
            className="flex flex-col mx-auto w-full p-5 rounded-lg transition-all md:h-full"
          >
            <div className="flex shrink-0 w-full">
              <ElemPhoto
                photo={investor.vc_firm?.logo}
                wrapClass="flex items-center justify-center shrink-0 w-16 h-16 p-2 bg-white border border-gray-200 rounded-lg"
                imgClass="object-fit max-w-full max-h-full"
                imgAlt={investor.vc_firm?.name}
              />
              <div className="flex items-center justify-center pl-2 md:overflow-hidden">
                <h3
                  className="inline min-w-0 font-medium break-words align-middle underline hover:no-underline"
                  title={investor.vc_firm?.name ?? ''}
                >
                  {investor.vc_firm?.name}
                </h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
