import { FC, useEffect, useState, Fragment } from "react";
import { ElemPhoto } from "@/components/elem-photo";
import { ElemReactions } from "@/components/elem-reactions";
import { ElemSaveToList } from "@/components/elem-save-to-list";
import { ElemTooltip } from "@/components/elem-tooltip";
import {
	IconExternalLink,
	IconNewspaper,
	IconPlayCircle,
} from "@/components/icons";
import { GetNewsQuery } from "@/graphql/types";
import Link from "next/link";
import { getCleanWebsiteUrl } from "@/utils/text";
import parse from "html-react-parser";
import moment from "moment-timezone";

type Props = {
	newsPost: GetNewsQuery["news"][0];
	tagOnClick?: any;
};

export const ElemNewsCard: FC<Props> = ({ newsPost, tagOnClick }) => {
	const [postData, setPostData] = useState(newsPost);

	useEffect(() => {
		setPostData(newsPost);
	}, [newsPost]);

	const {
		// id,
		kind,
		date,
		link,
		text,
		source,
		// created_at,
		// updated_at,
		// status,
		metadata,
		organizations,
	} = postData;

	const publisher = organizations.find(org => org.type === "publisher");

	const otherOrganizations = organizations.filter((org) => org.type !== "publisher");

	const formatDateShown = (date: Date, timezone?: string) => {
		const local_date = moment(date).local().format("YYYY-MM-DD");
		return moment(local_date).format("LL");
	};

	return (
		<div className="flex flex-col mx-auto w-full p-5 border border-black/10 rounded-lg transition-all">
			<div className="flex items-start">
				{link && (
					<div>
						<h3
							className="mt-1 inline min-w-0 font-bold break-words border-b border-primary-500 transition-all hover:border-b-2 hover:text-primary-500"
							title={text ?? ""}
						>
							<Link href={link}>
								<a target="_blank">
									{/* <IconExternalLink className="inline-block align-sub w-5 h-5 mr-0.5 text-primary-500" /> */}
									{text}
								</a>
							</Link>
						</h3>

						<div className="mt-2 flex flex-wrap items-center">
							{kind === "news" ? (
								<IconNewspaper
									className="w-6 h-6 mr-1 text-slate-400"
									title="Article"
								/>
							) : kind === "media" ? (
								<IconPlayCircle
									className="w-6 h-6 mr-1 text-slate-400"
									title="Video"
								/>
							) : (
								""
							)}
							{link && (
                <p className="font-bold text-sm text-slate-600">
                  {"By "}
                  {publisher ? (
                    <Link
                      href={
                        publisher.company
                          ? `/companies/${publisher.company?.slug}`
                          : publisher.vc_firm
                          ? `/investors/${publisher.vc_firm?.slug}`
                          : ""
                      }
                    >
                      <a target="_blank" className="hover:text-primary-500">
                        {publisher.company?.name || publisher.vc_firm?.name}
                      </a>
                    </Link>
                  ) : (
                    <Link href={getCleanWebsiteUrl(link, true)}>
                      <a target="_blank" className="hover:text-primary-500">
                        {getCleanWebsiteUrl(link, false)}
                      </a>
                    </Link>
                  )}

                  {" • "}
                </p>
              )}

							<p className="font-bold text-sm text-slate-600">
								{formatDateShown(date)}
							</p>
						</div>
					</div>
				)}
			</div>
			<div className="grow text-gray-400">
				{metadata?.description && (
					<div className="grow mt-4">
						<div className="text-gray-400 line-clamp-5">
							{link && (
								<Link href={link}>
									<a target="_blank">
										{metadata?.image && (
											<img
												src={metadata?.image}
												alt={text}
												className="rounded-lg h-16 mr-3 float-left hover:opacity-75"
											/>
										)}{" "}
									</a>
								</Link>
							)}
							{parse(metadata?.description)}
						</div>
					</div>
				)}

				{otherOrganizations && (
					<div className="mt-4" onClick={(e) => e.stopPropagation()}>
						{otherOrganizations.map((organizer: any, index: number) => {
              const slug = organizer.company
								? `/companies/${organizer.company?.slug}`
								: organizer.vc_firm
								? `/investors/${organizer.vc_firm?.slug}`
								: "";

							const organization = organizer.company
								? organizer.company
								: organizer.vc_firm;

							const organizationId = organizer.company
								? organizer.company?.id
								: organizer.vc_firm?.id;

							return (
								<Fragment key={organizationId}>
									<ElemTooltip
										content={
											<ElemPhoto
												photo={organization?.logo}
												wrapClass="flex items-center justify-center shrink-0 w-16 h-16 p-2 bg-white"
												imgClass="object-fit max-w-full max-h-full"
												imgAlt={organization?.name}
												placeholderClass="text-slate-300"
											/>
										}
										mode="light"
									>
										<Link href={slug}>
											<a className="break-words border-b border-primary-500 transition-all hover:border-b-2 hover:text-primary-500">
												{organization?.name}
											</a>
										</Link>
									</ElemTooltip>
									{otherOrganizations.length === index + 1 ? "" : ", "}
								</Fragment>
							);
						})}
					</div>
				)}
			</div>
			<div>
				<p className="mt-4 text-xs text-gray-400">
					Powered by{" "}
					<Link
						href={`/companies/${source?.poweredby ? "techcrunch" : "cryptopanic"}`}
					>
						<a>{source?.poweredby || "CryptoPanic"}</a>
					</Link>
				</p>
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
