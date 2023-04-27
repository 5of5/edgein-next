import React from "react";
import Link from "next/link";
import { ElemPhoto } from "@/components/ElemPhoto";
import { GetEventQuery } from "@/graphql/types";

type Props = {
	organizations: GetEventQuery["events"][0]["event_organization"];
};

export const ElemOrganizers: React.FC<Props> = ({ organizations }) => {
	return (
		<section>
			<h2 className="text-xl font-bold w-full mb-2">
				Organizer{organizations.length > 1 && "s"}
			</h2>
			<div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{organizations?.map((organizer) => {
					const slug = organizer.company
						? `/companies/${organizer.company?.slug}`
						: organizer.vc_firm
						? `/investors/${organizer.vc_firm?.slug}`
						: "";

					const organization = organizer.company
						? organizer.company
						: organizer.vc_firm;

					return (
						<Link href={slug} key={organizer.id}>
							<a className="flex flex-col mx-auto w-full p-3 cursor-pointer border border-black/10 rounded-lg transition-all hover:scale-102 hover:shadow">
								<div className="flex items-center shrink-0 w-full">
									<ElemPhoto
										photo={organization?.logo}
										wrapClass="flex items-center justify-center shrink-0 w-16 h-16 p-2 bg-white rounded-lg shadow"
										imgClass="object-fit max-w-full max-h-full"
										imgAlt={organization?.name}
										placeholderClass="text-slate-300"
									/>

									<div className="pl-2">
										<h3
											className="inline min-w-0 text-2xl font-bold break-words align-middle line-clamp-2 text-dark-500 sm:text-lg md:text-xl xl:text-xl"
											title={organization?.name ?? ""}
										>
											{organization?.name}
										</h3>
									</div>
								</div>
							</a>
						</Link>
					);
				})}
			</div>
		</section>
	);
};
