import React from "react";
import useSWR from "swr";
import moment from "moment-timezone";
import { Notes } from "@/graphql/types";
import { ElemPhoto } from "../ElemPhoto";

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
		<div className="flex flex-col mx-auto w-full cursor-pointer rounded-lg border border-black/10 divide-y divide-black/10 transition-all hover:scale-102 hover:shadow md:h-full">
			<p className="grow break-words line-clamp-7 p-4 text-slate-600">
				{data.notes}
			</p>
			<div className="p-4">
				<div className="flex items-center gap-2">
					<ElemPhoto
						photo={{}}
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
				<p className="pt-2 text-sm text-slate-600">
					Created {moment(data.created_at).format("LL")}
				</p>
			</div>
		</div>
	);
};
export default ElemNoteCard;
