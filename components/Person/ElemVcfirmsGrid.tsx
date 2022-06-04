import { ElemOrganizationCard } from "../ElemOrganizationCard";

type Props = {
	className?: string;
	heading?: string;
	vcfirms: Record<string, any>[];
};

export const ElemVcfirmsGrid: React.FC<Props> = ({
	className,
	heading,
	vcfirms,
}) => {
	return (
		<section className={className}>
			{heading && <h2 className="text-2xl font-bold">{heading}</h2>}
			<div className="flex flex-col gap-5 mt-3 w-full sm:grid sm:grid-cols-2 md:grid-cols-3">
				{vcfirms.map((vcfirm: any) => {
					return (
						<ElemOrganizationCard
							key={vcfirm.id}
							href={`/vcfirms/${vcfirm.slug}`}
							photos={vcfirm.logo}
							heading={vcfirm.vcFirm}
						/>
					);
				})}
			</div>
		</section>
	);
};
