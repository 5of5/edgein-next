import { ElemButton } from "./ElemButton";
import { Magic } from "magic-sdk";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
	IconChevronDown,
	IconUserCircle,
	IconSignOut,
	// IconHome,
} from "./Icons";
import { IconDashboard } from "./Dashboard/IconDashboard";
import { IconOrganization } from "./IconOrganization";

const navigation = [
	{ name: "Dashboard", href: "/dashboard", icon: IconDashboard },
	{ name: "My Organization", href: "/organizations", icon: IconOrganization }
];

export const UserMenu = () => {
	const logout = async () => {
		localStorage.clear()
		const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || "");
		magic.user.logout();
		const authRequest = await fetch("/api/logout/", {
			method: "POST",
		}).then(res => res.json());
		if (authRequest.success) {

			// We successfully logged in, our API
			// set authorization cookies and now we
			// can redirect to the dashboard!
			location.href = authRequest.logoutLink;
		} else {
			/* handle errors */
		}
	};

	const handleNavigation = () => {

	}

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button as="div">
					<ElemButton btn="white" className="px-2 font-medium group">
						<IconUserCircle className="h-6 w-6" aria-hidden="true" />
						<IconChevronDown className="ml-1 h-5 w-5" aria-hidden="true" />
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
					<div>
						{navigation.map((item) => (
							<Menu.Item key={item.name}>
								{({ active }) => (
									<a
										href={item.href}
										className={`${
											active ? "bg-gray-50" : ""
										} hover:text-primary-500 flex w-full items-center font-medium px-2 py-2`}
									>
										<item.icon className="mr-2 h-6 w-6" aria-hidden="true" />
										{item.name}
									</a>
								)}
							</Menu.Item>
						))}
					</div>

					<div>
						<Menu.Item>
							{({ active }) => (
								<button
									onClick={logout}
									className={`${active ? "bg-gray-50" : ""
										} hover:text-primary-500 flex w-full items-center font-medium px-2 py-2`}
								>
									<IconSignOut className="mr-2 h-6 w-6" />
									Sign out
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
