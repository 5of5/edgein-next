import { ElemButton } from "./ElemButton";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, FC } from "react";
import { first } from "lodash";
import {
	IconChevronDownMini,
	IconUserCircle,
	IconSignOut,
	//IconDashboard,
	IconCustomList,
	IconGroup,
	IconSettings,
	//IconOrganization,
} from "./Icons";
import { useUser } from "@/context/userContext";
import Link from "next/link";

type Props = {
	className?: string;
};

export const UserMenu: FC<Props> = ({ className = "" }) => {
	const { listAndFollows, user, myGroups } = useUser();

	const firstCustomGroup = first(myGroups ? myGroups : null);

	let myGroupsUrl = "";
	if (firstCustomGroup) {
		myGroupsUrl = `/groups/${firstCustomGroup.id}/`;
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

	let navigation = [];

	if (myGroups.length > 0) {
		navigation.push({
			name: "My Groups",
			href: myGroupsUrl,
			icon: IconGroup,
		});
	}
	navigation.push({
		name: "Account Settings",
		href: "/account",
		icon: IconSettings,
	});

	//eslint-disable-next-line react/display-name
	const NextLink = React.forwardRef((props: any, ref: any) => {
		const { href, children, ...rest } = props;
		return (
			<Link href={href}>
				<a {...rest} ref={ref}>
					{children}
				</a>
			</Link>
		);
	});

	return (
		<Menu as="div" className={`relative inline-block text-left ${className}`}>
			<div>
				<Menu.Button as="div">
					<ElemButton btn="slate" className="h-9 w-auto px-1.5 py-0 group">
						<IconUserCircle className="h-6 w-6" aria-hidden="true" />
						<IconChevronDownMini className="h-5 w-5" aria-hidden="true" />
					</ElemButton>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items
					as="nav"
					className="absolute overflow-hidden right-0 mt-2 w-56 origin-top-right divide-y divide-slate-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					{navigation.map((link) => (
						<Menu.Item key={link.name}>
							{({ active }) => (
								<NextLink
									href={link.href}
									className={`${
										active ? "bg-gray-50 text-primary-500" : ""
									} flex w-full items-center px-2 py-2 hover:bg-gray-50 hover:text-primary-500`}
								>
									<link.icon className="mr-2 h-6 w-6" aria-hidden="true" />
									{link.name}
								</NextLink>
							)}
						</Menu.Item>
					))}
					<Menu.Item>
						{({ active }) => (
							<button
								onClick={logout}
								className={`${
									active ? "bg-gray-50" : ""
								} hover:text-primary-500 flex w-full items-center px-2 py-2`}
							>
								<IconSignOut className="mr-2 h-6 w-6" />
								Sign out
							</button>
						)}
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
