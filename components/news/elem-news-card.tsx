import { FC, useEffect, useState } from "react";
import { ElemPhoto } from "@/components/elem-photo";
import { ElemReactions } from "@/components/elem-reactions";
import { ElemSaveToList } from "@/components/elem-save-to-list";
import { ElemTooltip } from "@/components/elem-tooltip";
import Link from "next/link";
import moment from "moment-timezone";
import { formatDate } from "@/utils";
import { getCleanWebsiteUrl } from "@/utils/text";

type Props = {
	newsPost: any; //News;
	tagOnClick?: any;
};

export const ElemNewsCard: FC<Props> = ({ newsPost, tagOnClick }) => {
	const [postData, setPostData] = useState(newsPost);

	useEffect(() => {
		setPostData(newsPost);
	}, [newsPost]);

	// const { id, published_at, link, title, text, source } = postData;
	const { id, date, link, text } = postData;

	return (
		<div className="flex flex-col mx-auto w-full p-5 border border-black/10 rounded-lg transition-all">
			{/* hover:scale-102 hover:shadow */}
			<p className="text-xs text-gray-400">
				Powered by{" "}
				<Link href={`https://cryptopanic.com/`}>
					<a target="_blank">CryptoPanic</a>
				</Link>
			</p>
			<div className="mt-1 flex shrink-0 w-full">
				<h3
					className="inline min-w-0 text-lg font-bold break-words line-clamp-2 hover:text-primary-500"
					title={text ?? ""}
				>
					<Link href={link}>
						<a target="_blank">{text}</a>
					</Link>
				</h3>
			</div>

			<div className="grow text-gray-400">
				<p className="text-sm">
					{/* {date && moment(date).fromNow()} */}
					{formatDate(date as string, {
						month: "short",
						day: "2-digit",
						year: "numeric",
					})}
					{/* {source?.domain && (
						<>
							{" by "}
							<Link href={`https://${source?.domain}`}>
								<a target="_blank" className="underline hover:text-primary-500">
									{source?.domain && source?.domain}
								</a>
							</Link>
						</>
					)} */}

					{link && (
						<>
							{" by "}
							<Link href={getCleanWebsiteUrl(link, true)}>
								<a
									target="_blank"
									className="underline opacity-50 hover:text-primary-500"
								>
									{getCleanWebsiteUrl(link, false)}
								</a>
							</Link>
						</>
					)}
				</p>
				{/* {(tags) && (
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
				)} */}
				{/* {text && (
					<div className="grow mt-4">
						<div className="text-gray-400 line-clamp-3">{text}</div>
					</div>
				)} */}
			</div>

			{/* <div
					className="flex items-center justify-between mt-4 gap-x-5"
					onClick={(e) => e.stopPropagation()}
				>
					<ElemReactions resource={newsPost} resourceType={"news"} />
					<ElemSaveToList
						resourceName={name}
						resourceId={id}
						resourceType={"news"}
						slug={slug!}
					/>
				</div> */}
		</div>
	);
};
