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
	IconDiscord,
	IconGlassdoor,
	IconEye,
} from "@/components/Icons";
import {
	convertToInternationalCurrencySystem,
	numberWithCommas,
} from "@/utils";
import { getFullAddress } from "@/utils/helpers";
import { ElemUpgradeDialog } from "./ElemUpgradeDialog";
import { useAuth } from "@/hooks/useAuth";

type Props = {
	className?: string;
	heading?: string;
	website?: string | null;
	totalFundingRaised?: string | null;
	whitePaper?: string | null;
	totalEmployees?: number;
	yearFounded?: string | null;
	location?: string | null;
	locationJson?: any;
	roles?: string | null;
	investmentsLength?: number;
	emails?: string[];
	linkedIn?: string | null;
	github?: string | null;
	twitter?: string | null;
	discord?: string | null;
	glassdoor?: string | null;
	careerPage?: string | null;
};

export const ElemKeyInfo: React.FC<Props> = ({
	className,
	heading,
	website,
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
	twitter,
	discord,
	glassdoor,
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
			text: "LinkedIn",
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
	if (twitter) {
		infoItems.push({
			icon: IconTwitter,
			text: "Twitter",
			link: twitter,
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
							<>
								<li
									key={index}
									onClick={onInfoClick(item.text)}
									className={`${baseClasses} flex-1 items-center justify-between transition-all cursor-pointer hover:bg-slate-200`}
								>
									<div className="flex items-center">
										{item.icon && (
											<item.icon
												title={item.text}
												className="h-6 w-6  mr-2 shrink-0 text-dark-500"
											/>
										)}
										{showInfo[item.text] ? (
											<a
												className={`transition-all text-primary-500 hover:bg-slate-200`}
												href={item.link}
												target={item.target ? item.target : "_blank"}
												rel="noopener noreferrer"
												title={item.text}
											>
												{item.text}
											</a>
										) : (
											<>
												&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
											</>
										)}
									</div>
									<div className="flex items-center text-primary-500">
										<IconEye className="h-5 w-5 shrink-0 mr-1" />
										show
									</div>
								</li>
							</>
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
							{showInfo["email"] ? (
								email
							) : (
								<>
									&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;@&bull;&bull;&bull;&bull;&bull;&bull;
								</>
							)}
						</div>
						<div className="flex items-center text-primary-500">
							<IconEye className="h-5 w-5 shrink-0 mr-1" />
							show
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
