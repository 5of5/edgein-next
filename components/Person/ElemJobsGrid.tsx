import { Team_Members } from "@/graphql/types";
import { IconEditPencil } from "../Icons";
import { getTimeOfWork, getWorkDurationFromAndTo } from "@/utils";
type Props = {
	className?: string;
	heading?: string;
	team_members?: Team_Members[];
};

export const ElemJobsGrid: React.FC<Props> = ({ className, heading, team_members }) => {
	return (
		<div className="bg-white w-full rounded-md p-4 border">
			{/* title todo */}
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-bold">Jobs</h2>
				<button className="border border-black/10 h-8 w-8 p-1.5 rounded-full transition-all hover:bg-slate-200">
					<IconEditPencil title="Edit" />
				</button>
			</div>

			{/* list jobs todo */}
			<div className="rounded-lg border-gray border mt-4 flex flex-col gap-3">

				{team_members && team_members.length > 0 && team_members.map((team) => (
					<>
						< div className="flex gap-5 p-2">
							{/* image */}
							<div className="flex sm:grid max-h-14 rounded-md max-w-[50px] bg-white p-2 border-red border">
								<img
									className="object-cover w-full h-full"
									src={team.company?.logo.url}
									alt={team.company?.name || "Logo"}
								/>
							</div>

							{/* info */}
							<div className="flex flex-col">
								<span className="text-slate-600 font-bold">{team.title}</span>
								<span className="text-slate-600">{team.function}</span>
								<div className="flex gap-2 text-slate-600">
									<span>{getWorkDurationFromAndTo(team.start_date, team.end_date)}</span>
									<span className="relative top-[-5px]">.</span>
									<span>{getTimeOfWork(team.start_date, team.end_date)}</span>
								</div>
								<span className="text-slate-600">{team.company?.location}</span>
							</div>
						</div>
						<hr />
					</>
				))
				}
			</div>
		</div >
	);
};
