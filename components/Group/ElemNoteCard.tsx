import React, { MutableRefObject, useRef, useEffect, useState } from "react";
import useSWR from "swr";
import moment from "moment-timezone";
import { GetNotesQuery } from "@/graphql/types";
import { ElemPhoto } from "../ElemPhoto";
import Link from "next/link";
import {
	IconEllipsisHorizontal,
	IconAnnotation,
	IconCheck,
	IconExclamationTriangle,
	IconShare3,
} from "@/components/Icons";
//import { ElemTooltip } from "@/components/ElemTooltip";
import { People, useGetUserProfileQuery } from "@/graphql/types";
import { useUser } from "@/context/userContext";
import { Popover, Transition } from "@headlessui/react";

type Props = {
	data: GetNotesQuery["notes"][0];
	refetch: () => void;
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

const ElemNoteCard: React.FC<Props> = ({ data, refetch }) => {
	const { user } = useUser();

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

	const [noteAuthor, setNoteAuthor] = useState<People>();

	const { data: users } = useGetUserProfileQuery({
		id: data?.created_by,
	});

	// set note author
	useEffect(() => {
		if (users) setNoteAuthor(users.users_by_pk?.person as People);
	}, [users]);

	// note content see more
	const [contentShowAll, setContentShowAll] = useState(false);
	const contentDiv = useRef() as MutableRefObject<HTMLDivElement>;
	const [contentDivHeight, setContentDivHeight] = useState(0);

	const likesCount = data.likes.length;
	const isLikedByCurrentUser = data.likes.some(item => item.created_by_user_id === user?.id);

	useEffect(() => {
		if (data.notes) {
			setContentDivHeight(contentDiv.current.scrollHeight);
		}
	}, [data.notes]);

	const formatDateShown = (date: Date) => {
		let utcTime = date;
		const local_date = moment
			.utc(utcTime)
			.local()
			.format("YYYY-MM-DD HH:mm:ss");

		const lastMonth = moment().subtract(1, "months").valueOf();
		const noteCreated = moment(local_date).valueOf();

		// if note is older than a month
		if (lastMonth > noteCreated) {
			return moment(local_date).format("LL");
		} else {
			return moment(local_date).fromNow();
		}
	};

	const onToggleLike = async () => {
    await fetch("/api/toggle_like_note/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        noteId: data.id,
      }),
    });
		refetch();
  };

	const NotePopover = (
		<Popover className="group-hover:block transition-all">
			<Popover.Button className="inline-flex items-center text-sm rounded-full aspect-square p-1 transition ease-in-out duration-150 group ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-200 focus:outline-none focus:ring-1">
				<IconEllipsisHorizontal
					className="h-6 w-6 group-hover:text-primary-500"
					title="Options"
				/>
			</Popover.Button>

			<Transition
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<Popover.Panel className="absolute right-0 overflow-hidden w-48 p-1 divide-y divide-slate-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5">
					{({ close }) => (
						<>
							<button
								onClick={() => {}}
								className="flex items-center space-x-1 w-full px-2 py-2 rounded-lg hover:bg-gray-50 hover:text-primary-500"
							>
								<IconShare3 className="h-4 aspect-square group-hover:text-primary-500" />
								<span className="text-sm">Share to a group</span>
							</button>
							<button
								onClick={() => {}}
								className="flex items-center space-x-1 w-full px-2 py-2 hover:bg-gray-50 hover:text-primary-500"
							>
								<IconExclamationTriangle className="h-4 aspect-square group-hover:text-primary-500" />
								<span className="text-sm">Report note</span>
							</button>
						</>
					)}
				</Popover.Panel>
			</Transition>
		</Popover>
	);

	return (
		<>
			<div className="flex flex-col bg-white shadow rounded-lg px-5 py-4">
				<div className="relative flex items-center space-x-3">
					<div className="flex-shrink-0 relative mb-2">
						<ElemPhoto
							photo={resource?.logo}
							wrapClass="flex items-center justify-center shrink-0 w-12 h-12 p-1 bg-white rounded-lg shadow"
							imgClass="object-fit max-w-full max-h-full"
							imgAlt={resource?.name}
						/>

						<ElemPhoto
							photo={noteAuthor?.picture}
							wrapClass="absolute -right-2 -bottom-2"
							imgClass="object-fit h-7 w-7 border-2 border-white rounded-full"
							imgAlt={noteAuthor?.name}
							placeholder="user"
							placeholderClass="text-slate-400 bg-white p-0"
						/>
					</div>
					<div className="min-w-0 flex-1">
						<a href="#" className="focus:outline-none">
							{/* <span className="absolute inset-0" aria-hidden="true"></span> */}
							<p className="text-lg leading-tight font-bold">
								{resource?.name}
							</p>
							<p className="truncate text-sm text-slate-600">
								{/* Created by  */}
								{noteAuthor?.name}
								<span aria-hidden="true"> · </span>
								{formatDateShown(data?.created_at)}
								{/* {data?.created_at && moment(data?.created_at).fromNow()} */}

								{/* {moment(data?.created_at).subtract(1, 'months')} */}
							</p>
						</a>
					</div>
					<div>{NotePopover}</div>
				</div>
				<div className="grow py-2 min-h-fit">
					<p
						className={`break-words ${!contentShowAll && "line-clamp-5"}`}
						ref={contentDiv}
					>
						{data.notes}
					</p>
					{contentDivHeight > 120 && !contentShowAll && (
						<button
							type="button"
							onClick={() => setContentShowAll(!contentShowAll)}
							className="inline text-primary-500"
						>
							See more
						</button>
					)}
				</div>
				{likesCount > 0 && (
          <span className="text-sm text-slate-600">{`${likesCount} like${
            likesCount > 1 ? "s" : ""
          }`}</span>
        )}
				<div className="flex space-x-1 py-1 border-t border-b border-black/10">
				<button
            className={`flex flex-1 items-center justify-center px-2 py-1 rounded-md shrink grow font-medium hover:text-primary-500 hover:bg-slate-200 ${
              isLikedByCurrentUser ? "text-primary-500" : "text-slate-600"
            }`}
            onClick={onToggleLike}
          >
            Like
          </button>
					<button className="flex flex-1 items-center justify-center px-2 py-1 rounded-md shrink grow font-medium text-slate-600 hover:text-primary-500 hover:bg-slate-200">
						<IconAnnotation className="h-5 w-5 mr-1" /> Comment
					</button>
					<button className="flex flex-1 items-center justify-center px-2 py-1 rounded-md shrink grow font-medium text-slate-600 hover:text-primary-500 hover:bg-slate-200">
						<IconShare3 className="h-5 w-5 mr-1" />
						Share
					</button>
				</div>
				<div className="mt-4 flex items-start gap-2">
					<ElemPhoto
						photo={user?.person?.picture}
						wrapClass="aspect-square shrink-0 bg-white overflow-hidden rounded-full w-8"
						imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
						imgAlt={user?.person?.name}
						placeholder="user"
						placeholderClass="text-slate-300"
					/>
					<div
						className="w-full cursor-pointer bg-slate-100 rounded-full px-4 py-1 text-slate-600 hover:bg-slate-200"
						//onClick={onOpenNoteForm}
					>
						Write a comment...
					</div>
				</div>
			</div>
			{/* <Link
				href={`/${
					data.resource_type === "vc_firms" ? "investors" : data.resource_type
				}/${resource?.slug}`}
				passHref
			>
				<div className="flex flex-col mx-auto w-full cursor-pointer rounded-lg divide-y divide-black/10 transition-all hover:scale-102 hover:shadow md:h-full">
					<div className="grow min-h-[180px]">
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

						<div className="pt-2 text-sm text-slate-600">
							<p>
								Created {moment(data?.created_at).format("LL")} by{" "}
								{noteAuthor?.name}
							</p>
							<p>Last edit {moment(data?.updated_at).format("LL")}</p>
						</div>
					</div>
				</div>
			</Link> */}
		</>
	);
};
export default ElemNoteCard;
