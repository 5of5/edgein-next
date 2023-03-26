import React, { Fragment, useState } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { useAuth } from "@/hooks/useAuth";
import { ElemButton } from "@/components/ElemButton";
import Link from "next/link";
import {
	IconCheck,
	IconEllipsisHorizontal,
	IconExclamationTriangle,
	IconChevronDownMini,
} from "@/components/Icons";
import { formatDate } from "@/utils";
import { ElemPhoto } from "@/components/ElemPhoto";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import moment from "moment-timezone";
import { ElemUpgradeDialog } from "@/components/ElemUpgradeDialog";
import {
	GetNotificationsForUserQuery,
	useGetNotificationsForUserQuery,
} from "@/graphql/types";
import { useIntercom } from "react-use-intercom";
import { startCase } from "lodash";
import { getNotificationChangedData } from "@/utils/notifications";

const getLink = (
	notification: GetNotificationsForUserQuery["notifications"][0]
) =>
	notification.company
		? `/${notification.follow_resource_type}/${notification.company?.slug}`
		: `/investors/${notification.vc_firm?.slug}`;

const Notifications: NextPage = () => {
	const { user } = useAuth();

	const { data, refetch } = useGetNotificationsForUserQuery({
		user: user?.id || 0,
	});
	const notifications = data?.notifications;

	const displayedNotifications = notifications?.slice(
		0,
		user?.entitlements.listsCount
			? user?.entitlements.listsCount
			: notifications?.length
	);

	const [notificationsLimit, setNotificationsLimit] = useState(5);
	const showMoreNotifications = () => {
		setNotificationsLimit(notificationsLimit + 10);
	};

	const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

	const onOpenUpgradeDialog = () => {
		setIsOpenUpgradeDialog(true);
	};
	const onCloseUpgradeDialog = () => {
		setIsOpenUpgradeDialog(false);
	};

	const markAsRead = async (id?: number, all?: boolean) => {
		await fetch("/api/mark_notification_read/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id,
				all,
			}),
		});
		refetch();
	};

	const { showNewMessages } = useIntercom();

	return (
		<div className="max-w-3xl px-4 mx-auto mt-7 sm:px-6 lg:px-8">
			<div className="bg-white shadow rounded-lg p-5">
				<div className="flex items-center justify-between mb-2">
					<h2 className="text-xl font-bold">Notifications</h2>
					<button
						className="flex items-center text-sm hover:text-primary-500"
						onClick={() => markAsRead(undefined, true)}
					>
						<IconCheck className="h-4 mr-1" />
						Mark all as read
					</button>
				</div>
				<div className="-mx-5 border-y border-slate-100 divide-y divide-slate-100">
					{displayedNotifications
						?.slice(0, notificationsLimit)
						.map((notification, index) => {
							const organization = notification.company
								? notification.company
								: notification.vc_firm;

							// let zoneVal = moment(notification.created_at)
							// 	.tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
							// 	.format("MMM D, ha");

							let userTimezone = moment.tz.guess();

							// const notificationCreatedAt = moment(notification.created_at)
							// 	.tz(userTimezone)
							// 	.format("MMM D");

							const notificationFromNow = moment(
								notification.created_at
							).fromNow();

							const { message, extensions } =
								getNotificationChangedData(notification);

							const enableExpand =
								notification.event_type === "Change Data" &&
								notification.notification_actions.length > 1;

							const component = (
								<div
									onClick={() => markAsRead(notification.id)}
									className={`relative flex items-center justify-between px-2 sm:px-5 py-1 shrink-0 w-full hover:bg-slate-100`}
								>
									<div className="flex items-center space-x-2 pr-20">
										<ElemPhoto
											photo={organization?.logo}
											wrapClass="shrink-0 w-12 h-12 p-1 bg-white rounded border border-slate-200"
											imgClass="object-fit max-w-full max-h-full"
											imgAlt="Company Name"
											placeholderClass="text-slate-300"
										/>
										<div>
											<div className="inline text-sm leading-tight text-left lg:text-base">
												<span className="border-b border-primary-500 transition-all font-bold mr-1 hover:border-b-2 hover:text-primary-500">
													{organization?.name}
												</span>
												{message}
											</div>

											<p className="text-xs text-primary-500 font-bold text-left">
												{notificationFromNow}
											</p>
											{extensions.length > 0 && (
												<div className="flex items-center text-sm">
													<IconChevronDownMini className="h-5 aspect-square mr-1" />
													Details
												</div>
											)}
										</div>
									</div>

									<div className="flex items-center space-x-4">
										<div
											className={`w-2.5 h-2.5 shrink-0 rounded-full ${
												notification.read ? "bg-transparent" : "bg-primary-500"
											}`}
										></div>
									</div>
								</div>
							);

							if (enableExpand) {
								return (
									<Disclosure key={notification.id} as="div">
										<>
											<div className="relative flex items-center group">
												<Disclosure.Button className="w-full">
													{component}
												</Disclosure.Button>
												<Popover
													className="absolute right-10 transition-all hidden group-hover:block"
													style={{ zIndex: 9999 - index }}
												>
													<Popover.Button className="inline-flex items-center text-sm rounded-full aspect-square p-1 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-200 focus:outline-none focus:ring-1">
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
																		onClick={() => {
																			markAsRead(notification.id);
																			close();
																		}}
																		className="flex items-center space-x-1 w-full px-2 py-2 rounded-lg hover:bg-gray-50 hover:text-primary-500"
																	>
																		<IconCheck className="h-4 aspect-square group-hover:text-primary-500" />
																		<span className="text-sm">
																			Mark as read
																		</span>
																	</button>
																	<button
																		onClick={() => {
																			showNewMessages(
																				`Hi EdgeIn, I'd like to report an error on ${organization?.name} notifications`
																			);
																			close();
																		}}
																		className="flex items-center space-x-2 w-full px-2 py-2 hover:bg-gray-50 hover:text-primary-500"
																	>
																		<IconExclamationTriangle className="h-4 aspect-square group-hover:text-primary-500" />
																		<span className="text-sm">
																			Report an error
																		</span>
																	</button>
																</>
															)}
														</Popover.Panel>
													</Transition>
												</Popover>
											</div>
											{enableExpand && (
												<Disclosure.Panel className="px-6 py-4 bg-slate-100">
													<ul className="list-disc list-inside space-y-2">
														{extensions.map((item: any) => (
															<li
																key={item.field}
																className="text-slate-600 text-sm"
															>
																{`Changed ${startCase(item.field)}`}
																{/* {item.value} */}
															</li>
														))}
													</ul>
												</Disclosure.Panel>
											)}
										</>
									</Disclosure>
								);
							}

							return (
								<Link
									href={getLink(notification)}
									key={notification.id}
									passHref
								>
									<a className="relative flex items-center group">
										{component}
									</a>
								</Link>
							);

							return (
								<Disclosure key={notification.id} as="div">
									<>
										<div className="relative w-full flex items-center group">
											{extensions.length > 0
												? "multi-notification 2+"
												: "single-notification 1"}

											<Disclosure.Button className="w-full">
												<div
													onClick={() => markAsRead(notification.id)}
													// onClick={
													// 	extensions.length > 0
													// 		? () => {}
													// 		: () => {
													// 				markAsRead(notification.id);
													// 		  }
													// }
													className={`relative flex items-center justify-between px-2 sm:px-5 py-1 shrink-0 w-full hover:bg-slate-100`}
												>
													<div className="flex items-center space-x-2 pr-20">
														<ElemPhoto
															photo={organization?.logo}
															wrapClass="shrink-0 w-12 h-12 p-1 bg-white rounded border border-slate-200"
															imgClass="object-fit max-w-full max-h-full"
															imgAlt="Company Name"
															placeholderClass="text-slate-300"
														/>
														<div>
															<div className="inline text-sm leading-tight text-left lg:text-base">
																<a
																	href={getLink(notification)}
																	className="border-b border-primary-500 transition-all font-bold mr-1 hover:border-b-2 hover:text-primary-500"
																>
																	{organization?.name}
																</a>
																{message}
															</div>

															<p className="text-xs text-primary-500 font-bold text-left">
																{notificationFromNow}
															</p>
															{extensions.length > 0 && (
																<div className="flex items-center text-sm">
																	<IconChevronDownMini className="h-5 aspect-square mr-1" />
																	Details
																</div>
															)}
														</div>
													</div>

													<div className="flex items-center space-x-4">
														<div
															className={`w-2.5 h-2.5 shrink-0 rounded-full ${
																notification.read
																	? "bg-transparent"
																	: "bg-primary-500"
															}`}
														></div>
													</div>
												</div>
											</Disclosure.Button>

											<Popover
												className="absolute right-10 transition-all hidden group-hover:block"
												style={{ zIndex: 9999 - index }}
											>
												<Popover.Button className="inline-flex items-center text-sm rounded-full aspect-square p-1 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-200 focus:outline-none focus:ring-1">
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
																	onClick={() => {
																		markAsRead(notification.id);
																		close();
																	}}
																	className="flex items-center space-x-1 w-full px-2 py-2 rounded-lg hover:bg-gray-50 hover:text-primary-500"
																>
																	<IconCheck className="h-4 aspect-square group-hover:text-primary-500" />
																	<span className="text-sm">Mark as read</span>
																</button>
																<button
																	onClick={() => {
																		showNewMessages(
																			`Hi EdgeIn, I'd like to report an error on ${organization?.name} notifications`
																		);
																		close();
																	}}
																	className="flex items-center space-x-2 w-full px-2 py-2 hover:bg-gray-50 hover:text-primary-500"
																>
																	<IconExclamationTriangle className="h-4 aspect-square group-hover:text-primary-500" />
																	<span className="text-sm">
																		Report an error
																	</span>
																</button>
															</>
														)}
													</Popover.Panel>
												</Transition>
											</Popover>
										</div>

										{enableExpand && (
											<Disclosure.Panel className="px-6 py-4 bg-slate-100">
												<ul className="list-disc list-inside space-y-2">
													{extensions.map((item: any) => (
														<li
															key={item.field}
															className="text-slate-600 text-sm"
														>
															{`changed ${startCase(item.field)} to ${
																item.value
															}`}
														</li>
													))}
												</ul>
											</Disclosure.Panel>
										)}
									</>
								</Disclosure>
							);
						})}
				</div>

				{(notifications ? notifications.length : 0) >
				(displayedNotifications ? displayedNotifications.length : 0) ? (
					<ElemButton
						btn="ol-primary"
						onClick={onOpenUpgradeDialog}
						className="mt-5 w-full"
					>
						Show more notifications
					</ElemButton>
				) : (
					notificationsLimit < (notifications ? notifications.length : 0) && (
						<ElemButton
							btn="ol-primary"
							onClick={showMoreNotifications}
							className="mt-5 w-full"
						>
							Show more notifications
						</ElemButton>
					)
				)}
			</div>

			<ElemUpgradeDialog
				isOpen={isOpenUpgradeDialog}
				onClose={onCloseUpgradeDialog}
			/>
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
