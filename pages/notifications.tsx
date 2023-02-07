import React, { useState } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { useAuth } from "@/hooks/useAuth";
import { ElemButton } from "@/components/elem-button";
import { IconCheck } from "@/components/icons";
import { formatDate } from "@/utils";
import { ElemPhoto } from "@/components/elem-photo";
import { ElemUpgradeDialog } from "@/components/elem-upgrade-dialog";
import {
	GetNotificationsForUserQuery,
	useGetNotificationsForUserQuery,
} from "@/graphql/types";

const getLink = (
	notification: GetNotificationsForUserQuery["notifications"][0]
) =>
	notification.company
		? `/${notification.follow_resource_type}/${notification.company?.slug}`
		: `/investors/${notification.vc_firm?.slug}`;

const Notifications: NextPage = () => {
	const { user } = useAuth();

	const { data } = useGetNotificationsForUserQuery({ user: user?.id || 0 });
	const notifications = data?.notifications;

	const displayedNotifications = notifications?.slice(
		0,
		user?.entitlements.listsCount
			? user?.entitlements.listsCount
			: notifications?.length
	);

	const [notificationsLimit, setNotificationsLimit] = useState(4);
	const showMoreNotifications = () => {
		setNotificationsLimit(notificationsLimit + 5);
	};

	const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

	const onOpenUpgradeDialog = () => {
		setIsOpenUpgradeDialog(true);
	};
	const onCloseUpgradeDialog = () => {
		setIsOpenUpgradeDialog(false);
	};

	return (
		<div className="max-w-4xl px-4 mx-auto mt-7 sm:px-6 lg:px-8">
			<div className="bg-white shadow rounded-lg p-5">
				<div className="flex items-center justify-between mb-2">
					<h2 className="text-xl font-bold">Notifications</h2>
					<button className="flex items-center text-sm hover:text-primary-500">
						<IconCheck className="h-4 mr-1" />
						Mark all as read
					</button>
				</div>
				<ul className="-mx-5 border-y border-slate-100 divide-y divide-slate-100">
					{displayedNotifications
						?.slice(0, notificationsLimit)
						.map((notification, index) => {
							const organization = notification.company
								? notification.company
								: notification.vc_firm;
							return (
								<a
									href={getLink(notification)}
									key={index}
									//key={notification.company?.id || notification?.vc_firm?.id}
									className="flex items-center justify-between px-5 py-1 shrink-0 w-full hover:bg-slate-100"
								>
									<div className="flex items-center space-x-2">
										<ElemPhoto
											photo={organization?.logo}
											wrapClass="flex items-center justify-center shrink-0 w-12 h-12 p-1 bg-white rounded border border-slate-200"
											imgClass="object-fit max-w-full max-h-full"
											imgAlt="Company Name"
										/>
										<div>
											<span className="border-b border-primary-500 transition-all font-bold mr-1 hover:border-b-2 hover:text-primary-500">
												{organization?.name}
											</span>
											{notification.message}
											<p className="text-xs text-primary-500 font-bold">
												{formatDate(notification.created_at, {
													month: "short",
													day: "2-digit",
													// year: "numeric",
													// hour: "2-digit",
													// minute: "2-digit",
												})}
											</p>
										</div>
									</div>

									<div
										className={`w-2 h-2 shrink-0 rounded-full ${
											notification.read ? "bg-transparent" : "bg-primary-500"
										}`}
									></div>
								</a>
							);
						})}
				</ul>

				{(notifications ? notifications.length : 0) >
				(displayedNotifications ? displayedNotifications.length : 0) ? (
					<ElemButton
						btn="ol-primary"
						onClick={onOpenUpgradeDialog}
						className="mt-2 w-full"
					>
						Show more notifications
					</ElemButton>
				) : (
					notificationsLimit < (notifications ? notifications.length : 0) && (
						<ElemButton
							btn="ol-primary"
							onClick={showMoreNotifications}
							className="mt-2 w-full"
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
