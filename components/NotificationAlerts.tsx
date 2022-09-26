import { ElemButton } from "./ElemButton";
import { IconAlert, IconAlertSolid } from "@/components/Icons";

export const NotificationAlerts = () => {
	const notifications = [];

	return (
		<ElemButton
			btn="slate"
			href="/notifications"
			className="h-9 w-9 px-0 py-0 group"
		>
			{notifications.length > 0 ? (
				<IconAlertSolid
					className="h-6 w-6 text-primary-500"
					aria-hidden="true"
				/>
			) : (
				<IconAlert className="h-6 w-6" aria-hidden="true" />
			)}
		</ElemButton>
	);
};
