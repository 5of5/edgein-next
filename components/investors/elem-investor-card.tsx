import { Vc_Firms } from "@/graphql/types";
import { FC, useEffect, useState } from "react";
import { ElemPhoto } from "@/components/elem-photo";
import { ElemReactions } from "@/components/elem-reactions";
import { ElemSaveToList } from "@/components/elem-save-to-list";
import Link from "next/link";

type Props = {
	vcFirm: Vc_Firms;
	tagOnClick: any;
};

export const ElemInvestorCard: FC<Props> = ({ vcFirm, tagOnClick }) => {
	const [vcFirmData, setVcFirmData] = useState(vcFirm);

	useEffect(() => {
		setVcFirmData(vcFirm);
	}, [vcFirm]);

	const { id, slug, logo, name, num_of_investments, tags, overview } =
		vcFirmData;

	return (
		<Link href={`/investors/${slug}`} passHref>
			<a className="flex flex-col mx-auto w-full p-5 cursor-pointer rounded-lg border border-dark-500/10 transition-all hover:scale-102 hover:shadow md:h-full">
				<div className="flex shrink-0 w-full">
					<ElemPhoto
						photo={logo}
						wrapClass="flex items-center justify-center shrink-0 w-16 h-16 p-2 bg-white rounded-lg shadow"
						imgClass="object-fit max-w-full max-h-full"
						imgAlt={name}
						placeholderClass="text-slate-300"
					/>
					<div className="flex items-center justify-center pl-2 md:overflow-hidden">
						<h3
							className="inline min-w-0 text-2xl font-bold break-words align-middle line-clamp-2 sm:text-lg md:text-xl xl:text-2xl"
							title={name ?? ""}
						>
							{name}
						</h3>
					</div>
				</div>

				{num_of_investments !== null && num_of_investments > 0 && (
					<div className="flex flex-wrap space-x-6 text-slate-600 mt-4">
						<div>
							<span className="font-bold mr-1">{num_of_investments}</span>
							Investment
							{num_of_investments > 1 && "s"}
						</div>

						{/* num_of_exits field needs to be added to DB */}
						{/* {vcfirm.num_of_exits !== null && vcfirm.num_of_exits > 0 && (
							<div>
							<span className="font-bold mr-1">
								{vcfirm.num_of_exits}
							</span>
							Exit
							{vcfirm.num_of_exits > 1 && "s"}
							</div>
						)} */}
					</div>
				)}
				<div className="grow">
					{tags?.length > 0 && (
						<div
							className="mt-4 flex flex-wrap gap-2"
							onClick={(e) => e.stopPropagation()}
						>
							{tags?.map((tag: string, index: number) => {
								return (
									<div
										key={index}
										onClick={(e) => tagOnClick(e, tag)}
										className={`shrink-0 bg-slate-200 text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full cursor-pointer hover:bg-slate-300`}
									>
										{tag}
									</div>
								);
							})}
						</div>
					)}

					{overview && (
						<div className={`grow mt-4`}>
							<div className="text-gray-400 line-clamp-5">{overview}</div>
						</div>
					)}
				</div>

				<div
					className="flex items-center justify-between mt-4"
					onClick={(e) => e.stopPropagation()}
				>
					<ElemReactions resource={vcFirmData} resourceType={"vc_firms"} />
					<ElemSaveToList
						resourceName={vcFirmData.name}
						resourceId={id}
						resourceType={"vc_firms"}
						slug={slug!}
					/>
				</div>
			</a>
		</Link>
	);
};
