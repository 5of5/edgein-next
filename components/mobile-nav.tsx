import { FC, PropsWithChildren, Fragment, useState, useEffect } from "react";
import { find, kebabCase, first } from "lodash";
import Link from "next/link";
import { getNameFromListName } from "@/utils/reaction";
import { ElemButton } from "./elem-button";
import {
	IconX,
	IconLinkedIn,
	IconTwitter,
	IconCash,
	IconCompanies,
	IconUsers,
	IconEmail,
	IconSettings,
	IconCustomList,
	IconGroup,
	IconSignOut,
	IconCalendarDays,
	IconBell,
	IconUserCircle,
} from "@/components/icons";
import { Transition, Dialog } from "@headlessui/react";
import { ElemPhoto } from "@/components/elem-photo";
import { useUser } from "@/context/user-context";
import { clearLocalStorage } from "@/utils/helpers";

type Props = {
	className?: string;
	myListsUrl?: string;
	myGroupsUrl?: string;
};

export const MobileNav: FC<PropsWithChildren<Props>> = ({
	className = "",
	myListsUrl,
	myGroupsUrl,
}) => {
	const { user } = useUser();

	const [navOpen, setNavOpen] = useState(false);

	const onOpen = () => {
		setNavOpen(true);
	};

	const onClose = () => {
		setNavOpen(false);
	};

	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	const handleScroll = () => {
		const currentScrollPos = window.scrollY;

		if (currentScrollPos > prevScrollPos) {
			setVisible(false);
		} else {
			setVisible(true);
		}

		setPrevScrollPos(currentScrollPos);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	});

	const logout = async () => {
		clearLocalStorage();
		const authRequest = await fetch("/api/logout/", {
			method: "POST",
		}).then((res) => res.json());
		if (authRequest.success) {
			// We successfully logged in, our API
			// set authorization cookies and now we
			// can redirect to the dashboard!
			location.href = authRequest.logoutLink;
		} else {
			/* handle errors */
		}
	};

	const navigation = [
		{
			heading: "Explore",
			links: [
				{
					icon: IconCompanies,
					name: "Companies",
					href: "/companies",
					onClick: null,
				},
				{
					icon: IconCash,
					name: "Investors",
					href: "/investors",
					onClick: null,
				},
				{
					icon: IconCalendarDays,
					name: "Events",
					href: "/events",
					onClick: null,
				},
				...(user
					? [
							{
								icon: IconCustomList,
								name: "My Lists",
								href: myListsUrl,
								onClick: null,
							},
					  ]
					: []),
				...(myGroupsUrl
					? [
							{
								icon: IconGroup,
								name: "My Groups",
								href: myGroupsUrl,
								onClick: null,
							},
					  ]
					: []),
				...(user
					? [
							{
								icon: IconSettings,
								name: "Account Settings",
								href: "/account",
								onClick: null,
							},
							{
								icon: IconSignOut,
								name: "Sign out",
								onClick: () => {
									logout(), setNavOpen(false);
								},
							},
					  ]
					: []),
				,
			],
		},
		{
			//heading: "Follow Us",
			links: [
				{ icon: IconUsers, name: "Team", href: "/team", onClick: null },
				{ icon: IconEmail, name: "Contact", href: "/contact", onClick: null },
				{
					icon: IconLinkedIn,
					name: "LinkedIn",
					href: "https://www.linkedin.com/company/edgein/",
					onClick: null,
				},
				{
					icon: IconTwitter,
					name: "Twitter",
					href: "https://twitter.com/EdgeInio",
					onClick: null,
				},
			],
		},
	];

	const nav = [
		{
			icon: IconCompanies,
			name: "Companies",
			href: "/companies",
			onClick: null,
		},
		{
			icon: IconCash,
			name: "Investors",
			href: "/investors",
			onClick: null,
		},
		{
			icon: IconCalendarDays,
			name: "Events",
			href: "/events",
			onClick: null,
		},
		{
			icon: IconCalendarDays,
			name: "News",
			href: "/news",
			onClick: null,
		},
		{
			icon: IconBell,
			name: "Notifications",
			href: "/notifications",
			onClick: null,
		},
		// ...(user
		// 	? [
		// 			{
		// 				icon: IconCustomList,
		// 				name: "My Lists",
		// 				href: myListsUrl,
		// 				onClick: null,
		// 			},
		// 	  ]
		// 	: []),
		// ...(myGroupsUrl
		// 	? [
		// 			{
		// 				icon: IconGroup,
		// 				name: "My Groups",
		// 				href: myGroupsUrl,
		// 				onClick: null,
		// 			},
		// 	  ]
		// 	: []),
		// ...(user
		// 	? [
		// 			{
		// 				icon: IconSettings,
		// 				name: "Account Settings",
		// 				href: "/account",
		// 				onClick: null,
		// 			},
		// 			{
		// 				icon: IconSignOut,
		// 				name: "Sign out",
		// 				onClick: () => {
		// 					logout(), setNavOpen(false);
		// 				},
		// 			},
		// 	  ]
		// 	: []),
		// ,
	];

	return (
		<>
			<div
				className={`fixed grid grid-cols-6 w-full items-center bg-white/80 backdrop-blur transition-all lg:hidden ${
					visible ? "bottom-0" : "-bottom-12"
				} ${className} `}
			>
				{nav.map((item, index) => (
					<div key={index}>
						<Link href={item?.href ? item.href : ""}>
							<a
								onClick={item?.onClick ? item?.onClick : onClose}
								className="text-sm"
							>
								{item?.icon && (
									<item.icon title={item.name} className="h-6 w-6 shrink-0" />
								)}
								{item?.name}
							</a>
						</Link>
					</div>
				))}

				<div onClick={onOpen} className="cursor-pointer text-sm">
					{user?.person?.picture ? (
						<ElemPhoto
							photo={user?.person?.picture}
							wrapClass="flex items-center justify-center shrink-0 w-7 h-7 bg-white rounded-full shadow border border-black/10"
							imgClass="object-cover max-w-full max-h-full rounded-full"
							imgAlt={"profile"}
							placeholder="user"
							placeholderClass="text-slate-400 hover:text-slate-400"
						/>
					) : (
						<ElemButton btn="slate" className="h-9 w-auto px-1 py-1.5 group">
							<IconUserCircle
								className="h-6 w-6"
								title={user?.display_name ? user.display_name : ""}
							/>
							{/* <IconChevronDownMini className="h-5 w-5" aria-hidden="true" /> */}
						</ElemButton>
					)}
					Menu
				</div>

				{/* <button
						onClick={onOpen}
						className="hamburger relative w-8 h-[36px] px-[3px] py-4"
					>
						<span
							className={`${
								navOpen
									? "hamburger-active rotate-45 before:top-0 before:opacity-0 after:bottom-0 after:rotate-90"
									: ""
							} hamburger-inner block -mt-px top-1/2 transition ease-in-out duration-150 before:block before:content-[''] after:block after:content-['']`}
						></span>
						<span className="sr-only">Toggle menu</span>
					</button> */}

				<Transition.Root show={navOpen} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-40 lg:hidden"
						onClose={onClose}
					>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
						</Transition.Child>

						<div className="fixed inset-0 z-40 flex justify-end">
							<div className="flex-shrink-0 w-14">
								{/* Dummy element to force sidebar to shrink to fit close icon */}
							</div>
							<Transition.Child
								as={Fragment}
								enter="transition ease-in-out duration-300 transform"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="max-w-md w-full bg-white flex-1 flex flex-col">
									<Dialog.Title className="flex items-center justify-end px-1 py-2">
										<button type="button" onClick={onClose}>
											<IconX className="h-8 w-8" title="close" />
										</button>
									</Dialog.Title>

									<div className="flex flex-col h-full overflow-y-auto divide-y divide-black/10 px-8">
										{navigation.map((section, index) => (
											<div key={index} className="pt-6 pb-3 first:pt-0">
												<h3 className="text-xl font-bold">{section.heading}</h3>

												<ul>
													{section.links.map((item, index) => (
														<li key={index}>
															<Link href={item?.href ? item.href : ""}>
																<a
																	onClick={
																		item?.onClick ? item?.onClick : onClose
																	}
																	className="flex items-center py-3 text-lg hover:text-primary-500"
																>
																	{item?.icon && (
																		<item.icon
																			title={item.name}
																			className="h-6 w-6 mr-4 shrink-0"
																		/>
																	)}
																	{item?.name}
																</a>
															</Link>
														</li>
													))}
												</ul>
											</div>
										))}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition.Root>
			</div>
		</>
	);
};
