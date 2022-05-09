import { ElemPersonCard } from "../components/ElemPersonCard";

type Props = {
	heading: string;
	people: Record<string, any>[];
};

export const ElemFounderGrid: React.FC<Props> = ({ heading, people }) => {
	return (
		<section>
			{heading && <h2 className="text-3xl font-bold">{heading}</h2>}
			<div className="flex flex-col gap-5 mt-3 w-full sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{people.map((profile) => {
					return (
						<ElemPersonCard
							key={profile.id}
							href={`/people/${profile.slug}`}
							photos={profile.picture}
							heading={profile.name}
							text={profile.type}
						/>
					);
				})}
			</div>
		</section>
	);
};
