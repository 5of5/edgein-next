import React from "react";
import { IconCustomList } from "@/components/Icons";
import { ElemButton } from "@/components/ElemButton";
import moment from "moment-timezone";

type Props = {
	lists: Array<any>;
};

export const ElemLists: React.FC<Props> = ({ lists }) => {
	return (
		<div className="w-full mt-7 p-5 bg-white shadow rounded-lg">
			<h2 className="text-xl font-bold">{`Lists (${lists.length})`}</h2>
			{lists.length > 0 ? (
				<ul className="mt-4 flex flex-col gap-4">
					{lists.map((item) => (
						<li key={item.id} className="flex items-center justify-between">
							<div className="flex items-center gap-x-4">
								<IconCustomList className="w-6 h-6" />
								<div>
									<p className="font-bold">{item.name}</p>
									<p className="text-slate-500 text-sm">
										{`Created by ${item.createdBy} ${moment(
											item.createdAt
										).fromNow()}`}
									</p>
								</div>
							</div>
							<ElemButton
								btn={item.following ? "white" : "slate"}
								className={`${
									item.following
										? "group hover:bg-red-100 hover:text-red-500 hover:ring-red-500"
										: ""
								}`}
							>
								{item.following ? (
									<>
										<span className="opacity-100 transition-all group-hover:opacity-0 group-hover:hidden">
											Following
										</span>
										<span className="opacity-0 transition-all hidden group-hover:opacity-100 group-hover:inline">
											Unfollow
										</span>
									</>
								) : (
									<span>Follow</span>
								)}
							</ElemButton>
						</li>
					))}
				</ul>
			) : (
				<p className="text-center">No data.</p>
			)}
		</div>
	);
};
