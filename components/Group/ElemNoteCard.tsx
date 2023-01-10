import React from "react";
import useSWR from "swr";
import moment from "moment-timezone";
import { Notes } from "@/graphql/types";
import { ElemPhoto } from "../ElemPhoto";
import Link from "next/link";

type Props = {
	data: Notes;
};

const fetcher = async (url: string, args: any) => {
	return await fetch(url, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			resourceId: args.resourceId,
			resourceType: args.resourceType,
		}),
	}).then((res) => res.json());
};

const ElemNoteCard: React.FC<Props> = ({ data }) => {
	const { data: resource } = useSWR(
		[
			"/api/get_note_resource/",
			{
				resourceId: data.resource_id,
				resourceType: data.resource_type,
			},
		],
		fetcher
	);

	return (
		<Link
			href={`/${
				data.resource_type === "vc_firms" ? "investors" : data.resource_type
			}/${resource?.slug}`}
			passHref
		>
			<div className="flex flex-col mx-auto w-full cursor-pointer rounded-lg border border-black/10 divide-y divide-black/10 transition-all hover:scale-102 hover:shadow md:h-full">
				<div className="grow p-4 min-h-[180px]">
					<p className="break-words line-clamp-7 text-slate-600">
						{data.notes}
					</p>
				</div>
				<div className="p-4">
					<div className="flex items-center gap-2">
						<ElemPhoto
							photo={resource?.logo}
							wrapClass="flex items-center justify-center shrink-0 w-12 h-12 p-2 bg-white rounded-lg shadow"
							imgClass="object-fit max-w-full max-h-full"
							imgAlt={resource?.name}
						/>
						<h2
							className="text-lg font-bold"
							title={`Company: ${resource?.name}`}
						>
							{resource?.name}
						</h2>
					</div>
					{/* <p className="pt-2 text-sm text-slate-600">
					Last edit {moment(data?.updated_at).format("LL h:mma")}
				</p> */}
					<p className="pt-2 text-sm text-slate-600">
						Created {moment(data?.created_at).format("LL")}
					</p>
				</div>
			</div>
		</Link>
	);
};
export default ElemNoteCard;
