import { FC, PropsWithChildren, Fragment, useState } from "react";
import { IconX, IconLinkedIn, IconTwitter } from "@/components/Icons";
import { Transition, Menu } from "@headlessui/react";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
	{ name: "Companies", path: "/companies" },
	{ name: "Investors", path: "/investors" },
	{ name: "Team", path: "/team" },
	{ name: "Contact", path: "/contact" },
];

const socialLinks = [
	{
		name: "LinkedIn",
		path: "https://www.linkedin.com/company/edgein/",
		icon: IconLinkedIn,
	},
	{ name: "Twitter", path: "https://twitter.com/EdgeInio", icon: IconTwitter },
];

type Props = {
	className?: string;
};

export const MobileNav: FC<PropsWithChildren<Props>> = ({ className = "" }) => {
	const { user, error, loading } = useAuth();

	const [isActive, setIsActive] = useState(false);

	// const toggleNav = () => {
	// 	setIsActive((isActive) => !isActive);
	// };

	return (
		<Menu as="div" className="relative z-[60] inline-block text-left">
			{({ open }) => (
				<>
					<div>
						<Menu.Button
							className={`hamburger relative w-8 h-[22px] px-[3px] py-4 ${className} `}
						>
							<span
								className={`${
									open
										? "hamburger-active rotate-45 before:top-0 before:opacity-0 after:bottom-0 after:rotate-90"
										: ""
								} hamburger-inner block -mt-px top-1/2 transition ease-in-out duration-150 before:block before:content-[''] after:block after:content-['']`}
							></span>
							<span className="sr-only">Toggle menu</span>
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
							className="fixed z-[40] overflow-hidden top-11 right-0 bottom-0 left-0 w-full origin-top-right bg-white focus:outline-none"
						>
							<div className="flex flex-col h-full py-6 px-10">
								<ul className="space-y-1">
									{menuItems.map((item, index) => (
										<Menu.Item as="li" key={index}>
											<a
												onClick={() => {
													setIsActive(false);
												}}
												href={item.path}
												className="block py-3 text-lg"
											>
												{item.name}
											</a>
										</Menu.Item>
									))}

									{/* {user ? (
										<>Logged In</>
									) : (
										<>
											<Menu.Item as="li">
												<button
													onClick={() => {}}
													className="w-full text-left py-3"
												>
													Log Out
												</button>
											</Menu.Item>
										</>
									)} */}
								</ul>
								<div className="mt-8">
									<div className="font-bold text-lg">Follow Us:</div>
									<div className="flex mt-4 space-x-6">
										{socialLinks.map((item, index) => (
											<Menu.Item as="div" key={index}>
												<a
													href={item.path}
													onClick={() => setIsActive(false)}
													target="_blank"
													rel="noreferrer"
												>
													{<item.icon className="h-8 w-8 text-slate-600" />}
												</a>
											</Menu.Item>
										))}
									</div>
								</div>
							</div>
						</Menu.Items>
					</Transition>
				</>
			)}
		</Menu>
	);
};
