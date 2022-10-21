import { FC, PropsWithChildren, Fragment, useState } from "react";
import { find, kebabCase, first } from "lodash";
import Link from "next/link";
import { getNameFromListName } from "@/utils/reaction";
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
	IconSignOut,
} from "@/components/Icons";
import { ElemButton } from "@/components/ElemButton";
import { Transition, Dialog } from "@headlessui/react";
import { useUser } from "@/context/userContext";

type Props = {
	className?: string;
};

export const MobileNav: FC<PropsWithChildren<Props>> = ({ className = "" }) => {
	const { listAndFollows, user, loading } = useUser();

	const [navOpen, setNavOpen] = useState(false);

	const firstCustomList = first(
		listAndFollows?.filter(
			(list) => !["hot", "crap", "like"].includes(getNameFromListName(list))
		)
	);
	let myListsUrl = "";
	if (firstCustomList) {
		myListsUrl = `/lists/${firstCustomList.id}/${kebabCase(
			getNameFromListName(firstCustomList)
		)}`;
	} else {
		const hotId =
			find(listAndFollows, (list) => "hot" === getNameFromListName(list))?.id ||
			0;
		myListsUrl = `/lists/${hotId}/hot`;
	}

	const logout = async () => {
		localStorage.clear();
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

	const menuItems = [
		{ icon: IconCompanies, name: "Companies", href: "/companies" },
		{ icon: IconCash, name: "Investors", href: "/investors" },
		{ icon: IconUsers, name: "Team", href: "/team" },
		{ icon: IconEmail, name: "Contact", href: "/contact" },
	];

	const userLinks = [
		{ icon: IconCustomList, name: "My Lists", href: myListsUrl },
		{
			icon: IconSettings,
			name: "Account Settings",
			href: "/account",
		},
		{
			icon: IconSignOut,
			onClick: () => {
				logout(), setNavOpen(false);
			},
			name: "Sign out",
		},
	];

	const socialLinks = [
		{
			name: "LinkedIn",
			href: "https://www.linkedin.com/company/edgein/",
			icon: IconLinkedIn,
		},
		{
			name: "Twitter",
			href: "https://twitter.com/EdgeInio",
			icon: IconTwitter,
		},
	];

	return (
		<>
			<div className={className}>
				<button
					onClick={() => setNavOpen(true)}
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
				</button>
				<Transition.Root show={navOpen} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-40 lg:hidden"
						onClose={setNavOpen}
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

						<div className="fixed inset-0 z-40 flex">
							<Transition.Child
								as={Fragment}
								enter="transition ease-in-out duration-300 transform"
								enterFrom="-translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="-translate-x-full"
							>
								<Dialog.Panel className="relative max-w-md w-full bg-white flex-1 flex flex-col">
									<Transition.Child
										as={Fragment}
										enter="ease-in-out duration-300"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="ease-in-out duration-300"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div className="absolute top-0 right-0 pt-2">
											<ElemButton
												roundedFull={false}
												onClick={() => setNavOpen(false)}
												className="rounded-lg !p-0 hover:border-primary-500 mr-4 lg:hidden"
											>
												<span className="sr-only">Close Sidebar</span>
												<IconX className="h-8 w-8" aria-hidden="true" />
											</ElemButton>
										</div>
									</Transition.Child>

									<div className="flex flex-col h-full overflow-y-scroll py-6 px-8">
										<h3 className="text-xl font-bold">Explore</h3>
										<ul className="space-y-1">
											{menuItems.map((item, index) => (
												<li key={index}>
													<a
														onClick={() => {
															setNavOpen(false);
														}}
														href={item.href}
														className="flex py-3 text-lg hover:text-primary-500"
													>
														{item.icon && (
															<item.icon
																title={item.name}
																className="h-6 w-6 mr-4 shrink-0"
															/>
														)}

														{item.name}
													</a>
												</li>
											))}
										</ul>

										{user && (
											<>
												<div className="mt-3 bg-slate-200 h-px" />
												<h3 className="mt-6 text-xl font-bold">My EdgeIn</h3>
												<ul className="space-y-1">
													{userLinks.map((item, index) => {
														return (
															<li key={index}>
																{item.href ? (
																	<Link href={item.href}>
																		<a
																			onClick={() => {
																				setNavOpen(false);
																			}}
																			className="flex py-3 text-lg hover:text-primary-500"
																		>
																			{item.icon && (
																				<item.icon
																					title={item.name}
																					className="h-6 w-6 mr-4 shrink-0"
																				/>
																			)}
																			{item.name}
																		</a>
																	</Link>
																) : (
																	<a
																		onClick={item.onClick}
																		className="flex py-3 text-lg cursor-pointer hover:text-primary-500"
																	>
																		{item.icon && (
																			<item.icon
																				title={item.name}
																				className="h-6 w-6 mr-4 shrink-0"
																			/>
																		)}
																		{item.name}
																	</a>
																)}
															</li>
														);
													})}
												</ul>
											</>
										)}

										<div className="mt-3 bg-slate-200 h-px" />
										<div className="mt-6 font-bold text-lg">Follow Us</div>
										<div className="flex mt-4 space-x-6">
											{socialLinks.map((item, index) => (
												<div key={index}>
													<a
														href={item.href}
														onClick={() => setNavOpen(false)}
														target="_blank"
														rel="noreferrer"
														className="text-slate-600 hover:text-primary-500"
													>
														{<item.icon className="h-8 w-8 " />}
													</a>
												</div>
											))}
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
							<div className="flex-shrink-0 w-14">
								{/* Dummy element to force sidebar to shrink to fit close icon */}
							</div>
						</div>
					</Dialog>
				</Transition.Root>
			</div>
		</>
	);
};
