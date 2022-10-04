import { Investors } from "@/graphql/types";
import { IconEditPencil } from "@/components/Icons";
import { getTimeOfWork, getWorkDurationFromAndTo } from "@/utils";
import Link from "next/link";
type Props = {
	className?: string;
	heading?: string;
	investors: Investors[];
	showEdit?: boolean;
};

export const ElemInvestorsList: React.FC<Props> = ({
	className,
	heading,
	investors,
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
						{ investors.map((investor, index: number) => (
								<div className="flex space-x-4 p-4" key={index}>
									{investor.vc_firm?.slug ? (
										<Link href={`/investors/${investor.vc_firm.slug}`}>
											<a className="flex items-center justify-center h-10 w-10 p-1 aspect-square shrink-0 bg-white rounded-lg border border-black/10">
												<img
													className="object-contain w-full h-full"
													src={investor.vc_firm?.logo.url}
													alt={investor.vc_firm?.name || "Logo"}
												/>
											</a>
										</Link>
									) : (
										<div className="flex items-center justify-center h-10 w-10 p-1 aspect-square shrink-0 bg-white rounded-lg  border border-black/10">
											<img
												className="object-contain w-full h-full"
												src={investor.vc_firm?.logo.url}
												alt={investor.vc_firm?.name || "Logo"}
											/>
										</div>
									)}

									<div className="text-slate-600">
										<h3 className="font-bold">{investor.title}</h3>
										{investor.vc_firm?.slug ? (
											<Link href={`/investors/${investor.vc_firm.slug}`}>
												<a className="block hover:text-primary-500">
													{investor.vc_firm?.name}
												</a>
											</Link>
										) : (
											<>{investor.vc_firm?.name}</>
										)}

										<div className="flex space-x-2">
											<span>
												{getWorkDurationFromAndTo(
													investor.start_date,
													investor.end_date
												)}
											</span>
											<span>&middot;</span>
											<span>
												{getTimeOfWork(investor.start_date, investor.end_date)}
											</span>
										</div>
										{investor.vc_firm?.location && (
											<span>{investor.vc_firm?.location}</span>
										)}
									</div>
								</div>
							))
						}
					</div>
				</div>
			</div>
		</>
	);
};
