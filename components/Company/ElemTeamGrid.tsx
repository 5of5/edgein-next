import React, { useState } from "react";
import { Team_Members } from "@/graphql/types";
import { ElemPersonCard } from "@/components/ElemPersonCard";
import { IconEditPencil } from "@/components/Icons";
import { ElemFilterTags } from "@/components/ElemFilterTags";
import { uniq, compact, sortBy } from "lodash";

type Props = {
	className?: string;
	heading?: string;
	people: Team_Members[];
	showEdit?: boolean;
	// tags?: Maybe<string>[] | null
};

export const ElemTeamGrid: React.FC<Props> = ({
	className,
	heading,
	people,
	showEdit,
}) => {
	// Show founders first
	const allTags = compact(
		uniq(["All Members", ...sortBy(people.map((people) => people.function))])
	);
	const [selectedTag, setSelectedTag] = useState<string | null>("All Members");
	const peopleFoundersFirst =
		selectedTag === "All Members"
			? people.sort(function (a: any, b: any) {
					return b.founder - a.founder;
			  })
			: people
					.filter((p) => p.function === selectedTag)
					.sort(function (a: any, b: any) {
						return b.founder - a.founder;
					});

	// Show inactive members last
	const peopleInactiveLast = [...peopleFoundersFirst]
		.slice(0)
		.sort(
			(a: any, b: any) =>
				Date.parse(new Date(a.end_date).toString()) -
				Date.parse(new Date(b.end_date).toString())
		);

	return (
		<section className={className}>
			{heading && (
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-bold">{heading}</h2>
					{showEdit && (
						<button className="border border-black/10 h-8 w-8 p-1.5 rounded-full transition-all hover:bg-slate-200">
							<IconEditPencil title="Edit" />
						</button>
					)}
				</div>
			)}
			<ElemFilterTags
				onClick={(tag, index) => setSelectedTag(tag)}
				selectedTag={selectedTag}
				className="mt-2"
				tags={allTags}
			/>
			<div className="flex flex-col gap-5 mt-4 sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{peopleInactiveLast.map((teamMember) => {
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
									end_date={teamMember.end_date}
								/>
							)}
						</React.Fragment>
					);
				})}
			</div>
		</section>
	);
};
