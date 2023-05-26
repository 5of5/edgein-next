import { User_Groups } from "@/graphql/types";
import { FC, useEffect, useState } from "react";
import { ElemButton } from "@/components/elem-button";
import moment from "moment-timezone";
import Link from "next/link";

type Props = {
	group: User_Groups;
};

export const ElemGroupCard: FC<Props> = ({ group }) => {
	const [groupData, setGroupData] = useState(group);

	useEffect(() => {
		setGroupData(group);
	}, [group]);

	const formatDateShown = (date: Date, timezone?: string) => {
		const local_date = moment(date).local().format("YYYY-MM-DD");
		return moment(local_date).format("LL");
	};

	const { id, name, created_at, description, created_by } = groupData;

	return (
		<div className="flex flex-col mx-auto w-full p-4 bg-white border border-black/10 rounded-lg shadow">
			<div className="flex shrink-0 w-full mb-2">
				<Link href={`/groups/${id}`} passHref>
					<a className="font-bold break-words leading-none line-clamp-2 border-b border-primary-500 transition-all hover:border-b-2 hover:text-primary-500">
						{name}
					</a>
				</Link>
			</div>

			<div className="grow">
				<p className="text-slate-600 text-sm">
					25 Members{" • "}3 Lists{" • "}16 Notes
				</p>

				{/* <p className="text-slate-600 text-sm">
					Created {formatDateShown(group.created_at)} by{" "}
					{created_by?.display_name}
				</p> */}

				{description && (
					<div className="grow mt-2">
						<div className="text-slate-600 text-sm line-clamp-5">
							{description}
						</div>
					</div>
				)}
			</div>
			<div
				className="flex items-center justify-between mt-2 gap-x-5"
				onClick={(e) => e.stopPropagation()}
			>
				<ElemButton onClick={() => {}} btn="slate" size="sm" className="w-full">
					Join group
				</ElemButton>
			</div>
		</div>
	);
};
