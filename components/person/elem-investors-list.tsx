import { Investors } from "@/graphql/types";
import { IconEditPencil } from "@/components/icons-temp";
import { ElemPhoto } from "@/components/elem-photo";
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
			<div className={`w-full p-4 bg-white shadow rounded-lg ${className}`}>
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-bold">{heading}</h2>
					{showEdit && (
						<button className="border border-black/10 h-8 w-8 p-1.5 rounded-full transition-all hover:bg-slate-200">
							<IconEditPencil title="Edit" />
						</button>
					)}
				</div>
				<div className="mt-2 flex flex-col w-full gap-5 sm:grid sm:grid-cols-2">
					{investors.map((investor, index: number) => (
						<a
							href={`/investors/${investor.vc_firm?.slug}`}
							key={investor.vc_firm?.id}
							className="flex flex-col mx-auto w-full p-5 cursor-pointer rounded-lg border border-black/10 transition-all hover:scale-102 hover:shadow md:h-full"
						>
							<div className="flex shrink-0 w-full">
								<ElemPhoto
									photo={investor.vc_firm?.logo}
									wrapClass="flex items-center justify-center shrink-0 w-16 h-16 p-2 bg-white rounded-lg shadow"
									imgClass="object-fit max-w-full max-h-full"
									imgAlt={investor.vc_firm?.name}
								/>
								<div className="flex items-center justify-center pl-2 md:overflow-hidden">
									<h3
										className="inline min-w-0 text-lg font-bold break-words align-middle"
										title={investor.vc_firm?.name ?? ""}
									>
										{investor.vc_firm?.name}
									</h3>
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		</>
	);
};
