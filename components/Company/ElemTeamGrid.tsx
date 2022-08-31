import React from "react";
import { Team_Members } from "../../graphql/types";
import { ElemPersonCard } from "../ElemPersonCard";
import { IconEditPencil } from "@/components/Icons";

type Props = {
	className?: string;
	heading?: string;
	people: Team_Members[];
	showEdit?: boolean;
};

export const ElemTeamGrid: React.FC<Props> = ({
	className,
	heading,
	people,
	showEdit
}) => {
	// Show founders first
	const peopleFoundersFirst = people.sort(function (a: any, b: any) {
		return b.founder - a.founder;
	});
	return (
		<section className={className}>
			{
				heading && (
					<div className="flex justify-between pb-4">
						<h2 className="text-2xl font-bold">{heading}</h2>
						{
							(showEdit) && (
								<span className="border rounded-full p-1 pl-2 pt-2">
									<IconEditPencil
										title="Edit"
										className="h-6 w-6"
									/>
								</span>
							)
						}
					</div>
				)}
			<div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-3 w-full">
				{peopleFoundersFirst.map((teamMember) => {
					return (
						<React.Fragment key={teamMember.id}>
							{teamMember.person && (
								<ElemPersonCard
									key={teamMember.person.id}
									href={`/people/${teamMember.person.slug}`}
									photo={teamMember.person.picture}
									heading={teamMember.person.name}
									founder={teamMember.founder}
									text={teamMember.function}
									linkedin={teamMember.person.linkedin}
									personal_email={teamMember.person.personal_email}
									work_email={teamMember.person.work_email}
								/>
							)}
						</React.Fragment>
					);
				})}
			</div>
		</section>
	);
};
