import { Team_Members } from "../../graphql/types";
import { ElemPersonCard } from "../ElemPersonCard";

type Props = {
	className?: string;
	heading?: string;
	people: Team_Members[];
};

export const ElemFounderGrid: React.FC<Props> = ({
	className,
	heading,
	people,
}) => {
	return (
		<section className={className}>
			{heading && <h2 className="text-2xl font-bold">{heading}</h2>}
			<div className="flex flex-col gap-5 mt-3 w-full sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{people.map((profile) => {
					return (
						<ElemPersonCard
							key={profile.id}
							href={`/people/${profile.person?.slug}`}
							photo={profile.person?.picture}
							heading={profile.person?.name}
							text={profile.person?.type}
						/>
					);
				})}
			</div>
		</section>
	);
};
