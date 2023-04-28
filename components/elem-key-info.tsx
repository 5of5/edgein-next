import React, { useState } from "react";
import { values, isEmpty } from "lodash";
import {
	IconProps,
	IconGlobe,
	IconCash,
	IconDocumentDownload,
	IconUsers,
	IconFlag,
	IconLinkedIn,
	IconGithub,
	IconBriefcase,
	IconRole,
	IconEmail,
	IconLocation,
	IconTwitter,
	IconInstagram,
	IconTelegram,
	IconFacebook,
	IconDiscord,
	IconGlassdoor,
	IconEye,
	IconEyeSlash,
	IconHome,
	IconTicket,
	IconDocument,
} from "@/components/icons";
import {
	convertToInternationalCurrencySystem,
	numberWithCommas,
} from "@/utils";
import { getFullAddress } from "@/utils/helpers";
import { ElemUpgradeDialog } from "./elem-upgrade-dialog";
import { useAuth } from "@/hooks/use-auth";

type Attachments = Array<{
	label: string;
	url: string;
}>;

type Props = {
	className?: string;
	heading?: string;
	website?: string | null;
	eventLink?: any | null;
	totalFundingRaised?: string | null;
	whitePaper?: string | null;
	totalEmployees?: number;
	yearFounded?: string | null;
	location?: string | null;
	locationJson?: any;
	price?: number | null;
	attendees?: string | null;
	roles?: string | null;
	investmentsLength?: number;
	emails?: string[];
	linkedIn?: string | null;
	github?: string | null;
	twitter?: string | null;
	instagram?: string | null;
	facebook?: string | null;
	telegram?: string | null;
	discord?: string | null;
	glassdoor?: string | null;
	careerPage?: string | null;
	venue?: string | null;
	attachments?: Attachments;
};

export const ElemKeyInfo: React.FC<Props> = ({
	className,
	heading,
	website,
	eventLink,
	totalFundingRaised,
	whitePaper,
	totalEmployees,
	yearFounded,
	roles,
	investmentsLength = 0,
	emails = [],
	linkedIn,
	github,
	careerPage,
	location,
	locationJson,
	price,
	attendees,
	twitter,
	instagram,
	facebook,
	telegram,
	discord,
	glassdoor,
	venue,
	attachments,
}) => {
	const { user } = useAuth();

	const isEmptyLocationJson = values(locationJson).every(isEmpty);
	let locationText = "";
	if (!isEmptyLocationJson) {
		locationText = getFullAddress(locationJson);
	} else if (location) {
		locationText = location;
	}

	let infoItems: {
		icon?: React.FC<IconProps>;
		link?: string;
		text: string;
		target?: string;
		showHide?: boolean;
	}[] = [];

	if (website) {
		const cleanUrl = website
			.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
			.replace(/\/$/, "");

		infoItems.push({
			icon: IconGlobe,
			text: cleanUrl,
			link: website,
		});
	}

	if (eventLink) {
		let getLink = eventLink;

		if (getLink.includes("?q=")) {
			const getUrl = getLink.split("?q=");
			getLink = getUrl[1];
		}

		if (getLink.includes("&")) {
			const getUrl = getLink.split("&");
			getLink = getUrl[0];
		}

		const cleanUrl = getLink
			.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "") // removes https://www;
			.replace(/utm_[^&]+&?/g, "") // removes utm_xxx parameters;
			.replace(/\?.*/g, "$'") // removes anything after ? character
			.replace(/\/$/, ""); //removes last forward slash

		infoItems.push({
			icon: IconGlobe,
			text: cleanUrl,
			link: eventLink,
		});
	}

	if (yearFounded) {
		infoItems.push({
			icon: IconFlag,
			text: yearFounded + " Founded",
		});
	}
	if (totalFundingRaised) {
		infoItems.push({
			icon: IconCash,
			text:
				convertToInternationalCurrencySystem(Number(totalFundingRaised)) +
				" Total Funding Raised",
		});
	}

	if (price != null) {
		infoItems.push({
			icon: IconTicket,
			text: price === 0 ? "Free" : "Starts at $" + numberWithCommas(price),
		});
	}
	if (attendees) {
		infoItems.push({
			icon: IconUsers,
			text: attendees,
		});
	}
	if (venue) {
		infoItems.push({
			icon: IconHome,
			text: venue,
		});
	}
	if (locationText) {
		infoItems.push({
			icon: IconLocation,
			text: locationText,
		});
	}
	if (totalEmployees) {
		infoItems.push({
			icon: IconUsers,
			text: numberWithCommas(totalEmployees) + " Employees",
		});
	}
	if (whitePaper) {
		infoItems.push({
			icon: IconDocumentDownload,
			text: "White Paper",
			link: whitePaper,
		});
	}
	if (careerPage) {
		infoItems.push({
			icon: IconBriefcase,
			text: "Careers",
			link: careerPage,
		});
	}
	if (roles && roles.length > 0) {
		infoItems.push({
			icon: IconRole,
			text: roles,
		});
	}
	if (investmentsLength && investmentsLength > 0) {
		infoItems.push({
			icon: IconCash,
			text:
				investmentsLength === 1
					? investmentsLength + " Investment"
					: investmentsLength + " Investments",
			link: "#investments",
			target: "_self",
		});
	}
	if (linkedIn) {
		infoItems.push({
			icon: IconLinkedIn,
			text: "LinkedIn Profile",
			link: linkedIn,
			showHide: true,
		});
	}
	if (github) {
		infoItems.push({
			icon: IconGithub,
			text: "Github",
			link: github,
		});
	}
	if (facebook) {
		infoItems.push({
			icon: IconFacebook,
			text: "Facebook",
			link: facebook,
		});
	}
	if (twitter) {
		infoItems.push({
			icon: IconTwitter,
			text: "Twitter",
			link: twitter,
		});
	}
	if (instagram) {
		infoItems.push({
			icon: IconInstagram,
			text: "Instagram",
			link: instagram,
		});
	}
	if (telegram) {
		infoItems.push({
			icon: IconTelegram,
			text: "Telegram",
			link: telegram,
		});
	}
	if (discord) {
		infoItems.push({
			icon: IconDiscord,
			text: "Discord",
			link: discord,
		});
	}
	if (glassdoor) {
		infoItems.push({
			icon: IconGlassdoor,
			text: "Glassdoor",
			link: glassdoor,
		});
	}

	if (attachments && attachments.length > 0) {
		attachments.forEach((item) => {
			infoItems.push({
				icon: IconDocument,
				text: item.label,
				link: item.url,
			});
		});
	}

	const baseClasses = "flex space-x-2 py-1 px-2 rounded-md";

	const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);
	const [showInfo, setShowInfo] = useState<Record<string, boolean>>({});

	const onInfoClick = (info: string) => () => {
		if (user?.entitlements?.viewEmails) {
			setShowInfo({ ...showInfo, [info]: !showInfo[info] });
			// TODO add action
		} else {
			setIsOpenUpgradeDialog(true);
		}
	};
	const onCloseUpgradeDialog = () => {
		setIsOpenUpgradeDialog(false);
	};

	return (
		<section className={className}>
			{heading && <h2 className="text-xl font-bold mb-2">{heading}</h2>}

			<ul className="flex flex-col space-y-2">
				{infoItems.map((item, index: number) => {
					let itemInner = (
						<>
							{item.icon && (
								<item.icon
									title={item.text}
									className="h-6 w-6 shrink-0 text-dark-500"
								/>
							)}
							<span className="break-words min-w-0">{item.text}</span>
						</>
					);

					if (item.link?.length) {
						itemInner = (
							<a
								key={index}
								className={`${baseClasses} flex-1 transition-all text-primary-500 hover:bg-slate-200`}
								href={item.link}
								target={item.target ? item.target : "_blank"}
								rel="noopener noreferrer"
								title={item.text}
							>
								{itemInner}
							</a>
						);
					}

					itemInner = (
						<li key={index} className={!item.link ? baseClasses : ""}>
							{itemInner}
						</li>
					);

					if (item.showHide) {
						return (
							<li
								key={index}
								onClick={onInfoClick(item.text)}
								className={`${baseClasses} flex-1 items-center justify-between transition-all cursor-pointer hover:bg-slate-200`}
							>
								<div className="flex items-center">
									{item.icon && (
										<item.icon
											title={item.text}
											className="h-6 w-6 mr-2 shrink-0 text-dark-500"
										/>
									)}
									{showInfo[item.text] ? (
										<a
											className={`break-all transition-all text-primary-500 hover:bg-slate-200`}
											href={item.link}
											target={item.target ? item.target : "_blank"}
											rel="noopener noreferrer"
											title={item.text}
										>
											{item.text}
										</a>
									) : (
										<>&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</>
									)}
								</div>
								<div className="flex items-center text-primary-500">
									{showInfo[item.text] ? (
										<>
											<IconEyeSlash className="h-5 w-5 shrink-0 mr-1" /> hide
										</>
									) : (
										<>
											<IconEye className="h-5 w-5 shrink-0 mr-1" /> show
										</>
									)}
								</div>
							</li>
						);
					} else {
						return itemInner;
					}
				})}

				{emails.map((email, i: number) => [
					<li
						key={i}
						onClick={onInfoClick("email")}
						className={`${baseClasses} flex-1 items-center justify-between transition-all cursor-pointer hover:bg-slate-200`}
					>
						<div className="flex items-center">
							<IconEmail className="h-6 w-6 shrink-0 mr-2 text-dark-500" />
							<div className="break-all">
								{showInfo["email"] ? (
									email
								) : (
									<>
										&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;@&bull;&bull;&bull;&bull;&bull;&bull;
									</>
								)}
							</div>
						</div>
						<div className="flex items-center text-primary-500">
							{showInfo["email"] ? (
								<>
									<IconEyeSlash className="h-5 w-5 shrink-0 mr-1" /> hide
								</>
							) : (
								<>
									<IconEye className="h-5 w-5 shrink-0 mr-1" /> show
								</>
							)}
						</div>
					</li>,
				])}
			</ul>
			<ElemUpgradeDialog
				isOpen={isOpenUpgradeDialog}
				onClose={onCloseUpgradeDialog}
			/>
		</section>
	);
};
