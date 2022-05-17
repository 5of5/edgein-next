import { ElemPersonCard } from "../components/ElemPersonCard";

type Props = {
	className?: string;
	heading?: string;
	people: Record<string, any>[];
};

export const ElemFounderGrid: React.FC<Props> = ({
	className,
	heading,
	people,
}) => {
	return (
		<section className={className}>
			{heading && <h2 className="text-3xl font-bold">{heading}</h2>}
			<div className="flex flex-col gap-5 mt-3 w-full sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{people.map((profile) => {
					let getTypes;

					if (profile.type && profile.type.length > 1) {
						getTypes = profile.type.join(", ");
					} else if (profile.type) {
						getTypes = profile.type;
					}

					return (
						<ElemPersonCard
							key={profile.id}
							href={`/people/${profile.slug}`}
							photos={profile.picture}
							heading={profile.name}
							text={getTypes}
						/>
					);
				})}
			</div>
		</section>
	);
};
