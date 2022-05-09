import { ElemPersonCard } from "../components/ElemPersonCard";

type Props = {
	heading?: string;
	people: Record<string, any>[];
};

export const ElemTeamGrid: React.FC<Props> = ({ heading, people }) => {
	return (
		<section>
			{heading && <h2 className="text-3xl font-bold">{heading}</h2>}
			<div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-3 w-full">
				{people.map((teamMember) => {
					return (
						<div key={teamMember.id}>
							{teamMember.person.map((profile: any) => (
								<ElemPersonCard
									key={profile.id}
									href={`/people/${profile.slug}`}
									photos={profile.picture}
									heading={profile.name}
									text={teamMember.function}
								/>
							))}
						</div>
					);
				})}
			</div>
		</section>
	);
};
