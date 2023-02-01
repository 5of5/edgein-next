import React, { FC, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { ElemButton } from "@/components/ElemButton";
import {
	IconX,
	IconShareAlt,
	IconTwitter,
	IconTelegram,
	IconLinkedInAlt,
	IconWhatsApp,
} from "@/components/Icons";
import { Dialog, Transition } from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";

type Props = {
	resourceName: string | null;
	resourceTags: Array<string>;
	resourceTwitterUrl: string | null;
	sentimentHot: number | null;
	sentimentLike: number | null;
	sentimentCrap: number | null;
	resourceType: "companies" | "vc_firms";
};

export const ElemSocialShare: FC<Props> = ({
	resourceName,
	resourceTags,
	resourceTwitterUrl,
	sentimentHot,
	sentimentLike,
	sentimentCrap,
	resourceType,
}) => {
	const router = useRouter();
	const pageUrl = `https://edgein.io${router.asPath}`;

	let [isOpen, setIsOpen] = useState(false);

	const onShareButton = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setIsOpen(true);
	};

	const onCopy = async (pageUrl: string) => {
		navigator.clipboard.writeText(pageUrl);
		toast.custom(
			(t) => (
				<div
					className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
						t.visible ? "animate-fade-in-up" : "opacity-0"
					}`}
				>
					Link copied to clipboard
				</div>
			),
			{
				duration: 3000,
				position: "top-center",
			}
		);
	};

	const getTwitterHandle = (url: string) => {
		return `@` + url.replace(/^.*\/\/[^\/]+/, "").replace("/", "");
	};

	let theTags: string[] = [];
	if (resourceTags) {
		resourceTags.map((tag: string, i: number) => [
			theTags.push("#" + tag.replace(/\s+/g, "")),
		]);
	}
	const hashtagsFromTags = theTags.join(" ");

	let sentiments: string | null = "";
	if (sentimentHot || sentimentLike || sentimentCrap) {
		const hotCount = sentimentHot ? sentimentHot : 0;
		const likeCount = sentimentLike ? sentimentLike : 0;
		const crapCount = sentimentCrap ? sentimentCrap : 0;

		sentiments = `Current reactions: 🔥${hotCount} 👍${likeCount} 💩${crapCount}`;
	}

	const twitterContent = `Check out ${
		resourceTwitterUrl ? getTwitterHandle(resourceTwitterUrl) : resourceName
	} on @edgeinio right now: ${pageUrl}`;

	//${sentiments} ${hashtagsFromTags}

	const content = `Check out ${resourceName} on @edgeinio right now`;
	// resourceType === "companies"
	// 	? `${resourceName}: Credibility, Activity, Team & Investors`
	// 	: `${resourceName}: Activity, Team & Investments`;

	const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
		twitterContent.trim()
	)}`;

	const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
		pageUrl
	)}&text=${encodeURIComponent(content.trim())}`;

	const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
		pageUrl
	)}`;

	const whatsAppShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
		content.trim()
	)}%0a${encodeURIComponent(pageUrl)}`;

	const shareLinks = [
		{
			icon: IconTwitter,
			iconClass: "bg-[#1DA1F2]",
			text: "Twitter",
			href: twitterShareUrl,
		},
		{
			icon: IconTelegram,
			iconClass: "bg-[#24A0DD]",
			text: "Telegram",
			href: telegramShareUrl,
		},
		{
			icon: IconLinkedInAlt,
			iconClass: "bg-[#0a66c2]",
			text: "LinkedIn",
			href: linkedInShareUrl,
		},
		{
			icon: IconWhatsApp,
			iconClass: "bg-[#25d366]",
			text: "WhatsApp",
			href: whatsAppShareUrl,
		},
	];

	return (
		<>
			<ElemButton
				onClick={onShareButton}
				btn="white"
				roundedFull={true}
				className="px-2.5"
			>
				<IconShareAlt className="w-5 h-5 mr-1" />
				Share
			</ElemButton>

			<Transition.Root show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					onClose={() => {
						setIsOpen(false);
					}}
					className="relative z-[60]"
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed z-10 inset-0 bg-black/20 transition-opacity backdrop-blur-sm" />
					</Transition.Child>

					<div className="fixed inset-0 z-[50] my-0 min-h-0 flex flex-col items-center justify-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
								<div className="flex items-center justify-between px-3 py-1">
									<h2 className="text-lg font-bold">Share</h2>

									<button
										onClick={() => {
											setIsOpen(false);
										}}
										type="button"
										className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-slate-100"
									>
										<span className="sr-only">Close</span>
										<IconX className="h-6 w-6" title="close" />
									</button>
								</div>

								<div className="relative flex justify-center space-x-4 px-5 py-3">
									{shareLinks?.map((item, index) => {
										return (
											<a
												key={index}
												className="flex flex-col justify-center items-center"
												href={item.href}
												target="_blank"
												rel="noreferrer"
											>
												<div
													className={`w-16 h-16 p-4 flex items-center justify-center rounded-full text-white hover:opacity-75 ${item.iconClass}`}
												>
													<item.icon
														className={`w-full ${
															item.icon === IconTelegram && "-ml-1"
														}`}
													/>
												</div>
												<div className="mt-2 text-xs">{item.text}</div>
											</a>
										);
									})}
								</div>
								<div className="relative p-3 ease-in-out duration-300 bg-gray-50 border-t border-slate-300">
									<div className="absolute right-3 top-4 z-10 pt-1 pr-1">
										<ElemButton
											onClick={() => onCopy(pageUrl)}
											btn="primary"
											size="sm"
											roundedFull={true}
											className="px-2.5"
										>
											Copy
										</ElemButton>
									</div>

									<input
										className={`w-full mt-1 px-3 py-2 text-dark-500 relative bg-white rounded-md border-none outline-none ring-1 ring-slate-300 hover:ring-slate-400 focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-slate-400`}
										type="text"
										name="share"
										value={pageUrl}
										readOnly
									/>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
					<Toaster />
				</Dialog>
			</Transition.Root>
		</>
	);
};
