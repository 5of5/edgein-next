import React, { useState } from "react";
import { useIntercom } from "react-use-intercom";
import { formatDate } from "@/utils";
import { ElemButton } from "../ElemButton";

type Props = {
	activities: Array<any>;
	eventName: string;
};

export const ElemEventActivity: React.FC<Props> = ({
	activities,
	eventName,
}) => {
	const [activityLimit, setActivityLimit] = useState(10);
	const showMoreActivity = () => {
		setActivityLimit(activityLimit + 10);
	};
	const { show } = useIntercom();

	return (
		<div>
			<h2 className="text-xl font-bold w-full mb-2 border-b border-black/10">
				Activity
			</h2>

			<div className="py-4">
				{activities.length > 0 ? (
					<>
						<ul className="flex flex-col">
							{activities.slice(0, activityLimit).map((activity, index) => {
								return (
									<li
										key={index}
										className="relative pl-6 overflow-hidden group last:-mb-4"
									>
										<span className="absolute h-full top-0 bottom-0 left-0">
											<span className="absolute dashes top-2 left-2 -bottom-2 right-auto w-px h-auto border-y border-white bg-repeat-y"></span>
											<span className="block absolute top-2 left-1 w-2 h-2 rounded-full bg-gradient-to-r from-primary-300 to-primary-300 transition-all group-hover:from-[#1A22FF] group-hover:via-primary-500 group-hover:to-primary-400"></span>
										</span>

										<div className="mb-4">
											<div className="inline leading-7 text-slate-600">
												<div className="inline font-bold">
													{activity?.type === "attendee" ? (
														<>{`${activity?.person?.name} is going to ${eventName}`}</>
													) : (
														<>
															{`${
																activity?.person?.name ||
																activity?.company?.name ||
																activity?.vc_firm?.name
															} was added as a ${activity?.type}`}
														</>
													)}
												</div>
												<p className="text-sm">
													{formatDate(activity.created_at as string, {
														month: "short",
														day: "2-digit",
														year: "numeric",
													})}
												</p>
											</div>
										</div>
									</li>
								);
							})}
						</ul>

						{activityLimit < activities.length && (
							<div className="mt-6">
								<ElemButton
									btn="ol-primary"
									onClick={showMoreActivity}
									className="w-full"
								>
									Show More Activity
								</ElemButton>
							</div>
						)}
					</>
				) : (
					<div className="flex flex-col items-center justify-center lg:p-5">
						<div className="text-slate-600 lg:text-xl">
							There is no recent activity for this event.
						</div>
						<ElemButton onClick={show} btn="slate" className="mt-3">
							Request data or contribute
						</ElemButton>
					</div>
				)}
			</div>
		</div>
	);
};
