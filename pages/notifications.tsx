import React from "react";
import type { NextPage, GetServerSideProps } from "next";
import { useAuth } from "@/hooks/useAuth";
import { ElemButton } from "@/components/ElemButton";
import { IconCheck } from "@/components/Icons";
import { formatDate } from "@/utils";
import { ElemPhoto } from "@/components/ElemPhoto";

const Notifications: NextPage = () => {
	const { user } = useAuth();

	const fakeNotifications = [
		{
			read: false,
			update: "added new team information.",
			timestamp: 1666119688264,
			organizationType: "companies",
			organization: {
				id: 12,
				name: "1inchExchange",
				slug: "1inch-exchange",
				logo: {
					id: "attABj0ZiGdjem7C5",
					url: "https://dl.airtable.com/.attachments/34e368fd317131769710df6ea41d06be/b5f411e8/1inch-logo.svg",
					size: 12795,
					type: "image/svg+xml",
					width: 0,
					height: 0,
					filename: "1inch-exchange.svg",
					thumbnails: {
						full: {
							url: "https://dl.airtable.com/.attachmentThumbnails/d4dca7563d9aef74b5ecf9c9ade35f51/14abe945.png",
							width: 3000,
							height: 3000,
						},
						large: {
							url: "https://dl.airtable.com/.attachmentThumbnails/90365f1bc6bd8ae4625e5976c6bc3995/0c3e7e71.png",
							width: 150,
							height: 56,
						},
						small: {
							url: "https://dl.airtable.com/.attachmentThumbnails/5c8d492c73af38c695a69a4d9fb4ad4f/664e1fc2.png",
							width: 96,
							height: 36,
						},
					},
				},
			},
		},
		{
			read: true,
			update: "added new investments data",
			timestamp: 1666119688264,
			organizationType: "investors",
			organization: {
				id: 203,
				name: "Coinbase Ventures",
				slug: "coinbase-ventures",
				logo: {
					id: "attnzNdhSYCynTnc5",
					url: "https://dl.airtable.com/.attachments/9f4c08fdd20b5131060e53c823b5562f/93cbd05f/CoinbaseVentures.webp",
					size: 2716,
					type: "image/webp",
					width: 170,
					height: 170,
					filename: "Coinbase Ventures.webp",
					thumbnails: { full: [Object], large: [Object], small: [Object] },
				},
			},
		},
	];

	return (
		<div className="max-w-4xl px-4 mx-auto mt-7 sm:px-6 lg:px-8">
			<div className="bg-white shadow rounded-lg p-5">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-bold">Notifications</h2>
					<button className="flex items-center text-sm hover:text-primary-500">
						<IconCheck className="h-4 mr-1" />
						Mark all as read
					</button>
				</div>
				<ul className="-mx-5 my-2 border-y border-slate-100 divide-y divide-slate-100">
					{fakeNotifications?.map((notification) => {
						return (
							<a
								href={`/${notification.organizationType}/${notification.organization.slug}`}
								key={notification.organization.id}
								className="flex items-center justify-between px-5 py-1 shrink-0 w-full hover:bg-slate-100"
							>
								<div className="flex items-center">
									<div
										className={`w-2 h-2 shrink-0 rounded-full ${
											notification.read ? "bg-transparent" : "bg-primary-500"
										}`}
									></div>
									<ElemPhoto
										photo={notification.organization.logo}
										wrapClass="flex items-center justify-center shrink-0 w-12 h-12 ml-2 p-1 bg-white rounded border border-slate-200"
										imgClass="object-fit max-w-full max-h-full"
										imgAlt="Company Name"
									/>
									<div className="ml-2">
										<strong className="pr-1">
											{notification.organization.name}
										</strong>
										{notification.update}
									</div>
								</div>

								<div className="shrink-0 text-xs font-bold text-primary-500 sm:justify-end">
									{formatDate(notification.timestamp, {
										month: "short",
										day: "2-digit",
										// year: "numeric",
										// hour: "2-digit",
										// minute: "2-digit",
									})}
								</div>
							</a>
						);
					})}
				</ul>
				<ElemButton btn="ol-primary" className="mt-2 w-full">
					Show more notifications
				</ElemButton>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {
			metaTitle: "Notifications - EdgeIn.io",
		},
	};
};

export default Notifications;
