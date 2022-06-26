import React from "react";
import { Team_Members } from "../../graphql/types";
import { ElemPersonCard } from "../ElemPersonCard";

type Props = {
	className?: string;
	heading?: string;
	people: Team_Members[];
};

export const ElemTeamGrid: React.FC<Props> = ({
	className,
	heading,
	people,
}) => {
	return (
		<section className={className}>
			{heading && <h2 className="text-2xl font-bold">{heading}</h2>}
			<div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-3 w-full">
				{people.map((teamMember) => {
					return (
						<React.Fragment key={teamMember.id}>
							{ teamMember.person && <ElemPersonCard
								key={teamMember.person.id}
								href={`/people/${teamMember.person.slug}`}
								photo={teamMember.person.picture}
								heading={teamMember.person.name}
								text={teamMember.function}
							/> }
						</React.Fragment>
					);
				})}
			</div>
		</section>
	);
};
