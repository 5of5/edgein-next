import { Team_Members } from "@/graphql/types";
import { IconEditPencil } from "@/components/icons";
import { getTimeOfWork, getWorkDurationFromAndTo } from "@/utils";
import Link from "next/link";
type Props = {
	className?: string;
	heading?: string;
	team_members?: Team_Members[];
	showEdit?: boolean;
};

export const ElemJobsList: React.FC<Props> = ({
	className,
	heading,
	team_members,
	showEdit,
}) => {
	return (
		<>
			<div className={`w-full p-5 bg-white shadow rounded-lg ${className}`}>
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-bold">{heading}</h2>
					{showEdit && (
						<button className="border border-black/10 h-8 w-8 p-1.5 rounded-full transition-all hover:bg-slate-200">
							<IconEditPencil title="Edit" />
						</button>
					)}
				</div>

				<div className="mt-2 border border-black/10 rounded-lg">
					<div className="flex flex-col divide-y divide-y-black/10">
						{!team_members || team_members.length === 0 ? (
							<div className="flex space-x-4 p-4">No job info listed.</div>
						) : (
							team_members.map((team, index: number) => (
								<div className="flex space-x-4 p-4" key={index}>
									{team.company?.slug ? (
										<Link href={`/companies/${team.company.slug}`}>
											<a className="flex items-center justify-center h-10 w-10 p-1 aspect-square shrink-0 bg-white rounded-lg border border-black/10">
												<img
													className="object-contain w-full h-full"
													src={team.company?.logo?.url}
													alt={team.company?.name || "Logo"}
												/>
											</a>
										</Link>
									) : (
										<div className="flex items-center justify-center h-10 w-10 p-1 aspect-square shrink-0 bg-white rounded-lg  border border-black/10">
											<img
												className="object-contain w-full h-full"
												src={team.company?.logo.url}
												alt={team.company?.name || "Logo"}
											/>
										</div>
									)}

									<div className="text-slate-600">
										<h3 className="font-bold">{team.title}</h3>
										{team.company?.slug ? (
											<Link href={`/companies/${team.company.slug}`}>
												<a className="block hover:text-primary-500">
													{team.company.name}
												</a>
											</Link>
										) : (
											<>{team.company?.name}</>
										)}

										<div className="flex space-x-2">
											<span>
												{getWorkDurationFromAndTo(
													team.start_date,
													team.end_date
												)}
											</span>
											<span>&middot;</span>
											<span>
												{getTimeOfWork(team.start_date, team.end_date)}
											</span>
										</div>
										{team.company?.location && (
											<span>{team.company?.location}</span>
										)}
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</>
	);
};
