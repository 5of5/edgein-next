import { useAuth } from "@/hooks/useAuth";
import { IconBell } from "@/components/Icons";
import Link from "next/link";

import { useGetNotificationsForUserQuery } from "@/graphql/types";

export const NotificationAlerts = () => {
	const { user } = useAuth();

	const { data } = useGetNotificationsForUserQuery({
		user: user?.id || 0,
	});
	const notifications = data?.notifications.filter((item) => !item?.read);

	const notificationsCount = notifications ? notifications.length : 0;

	return (
		<Link href="/notifications" passHref>
			<a className="relative flex items-center group-hover:opacity-50 hover:!opacity-100">
				{notificationsCount > 0 && (
					<div className="absolute -top-[6px] -right-[6px] w-4 h-4 rounded-full from-blue-800 via-primary-500 to-primary-400 bg-gradient-to-r border-2 border-white">
						{/* {notificationsCount} */}
					</div>
				)}
				<IconBell className="h-5 w-5" strokeWidth={2} />
			</a>
		</Link>
	);
};
