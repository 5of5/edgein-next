import { IconBell } from "@/components/Icons";
import Link from "next/link";

export const NotificationAlerts = () => {
	const notifications = [];

	return (
		<Link href="/notifications" passHref>
			<a className="relative flex items-center group-hover:opacity-50 hover:!opacity-100">
				{notifications.length > 0 && (
					<div className="absolute -top-[6px] -right-[6px] w-4 h-4 rounded-full from-blue-800 via-primary-500 to-primary-400 bg-gradient-to-r border-2 border-white"></div>
				)}
				<IconBell className="h-5 w-5" strokeWidth={2} />
			</a>
		</Link>
	);
};
