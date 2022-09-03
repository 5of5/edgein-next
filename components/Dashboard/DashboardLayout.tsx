import { Fragment, useState, FC, PropsWithChildren } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { ElemLogo } from "@/components/ElemLogo";
// import { ElemButton } from "@/components/ElemButton";
import {
	IconProps,
	IconHome,
	IconX,
	IconCompanies,
	IconCash,
} from "@/components/Icons";
import { IconCompanyList } from "../reactions/IconCompanyList";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

type Props = {
	navigation?: Array<{
		name: string;
		href: string;
		icon: FC<IconProps>;
		current: boolean;
	}>;
};

export const DashboardLayout: FC<PropsWithChildren<Props>> = ({
	navigation = [
		{ name: "Dashboard", href: "/dashboard", icon: IconHome },
		{
			name: "Companies",
			href: "/companies",
			icon: IconCompanies,
		},
		{ name: "Investors", href: "/investors", icon: IconCash },
		{ name: "My list", href: "/my-list", icon: IconCompanyList }
	],
	children,
}) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const router = useRouter();

	return (
		<>
			<div className="relative">
				<Transition.Root show={sidebarOpen} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-40 md:hidden"
						onClose={setSidebarOpen}
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
								<Dialog.Panel className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
									<Transition.Child
										as={Fragment}
										enter="ease-in-out duration-300"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="ease-in-out duration-300"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div className="absolute top-0 right-0 -mr-12 pt-2">
											<button
												type="button"
												className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
												onClick={() => setSidebarOpen(false)}
											>
												<span className="sr-only">Close sidebar</span>
												<IconX
													className="h-6 w-6 text-white"
													aria-hidden="true"
												/>
											</button>
										</div>
									</Transition.Child>
									<div className="flex-shrink-0 px-4 flex items-center">
										<ElemLogo
											className="h-8 w-auto scale-90 transition duration-200 ease-in-out hover:scale-95"
											mode="logo"
										/>
									</div>
									<div className="mt-5 flex-1 h-0 overflow-y-auto">
										<nav className="px-2 space-y-1">
											{navigation.map((item) => (
												<a
													key={item.name}
													href={item.href}
													className={classNames(
														router.pathname == item.href
															? "bg-gray-100 text-gray-900"
															: "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
														"group rounded-md py-2 px-2 flex items-center text-base font-medium"
													)}
												>
													<item.icon
														className={classNames(
															router.pathname == item.href
																? "text-gray-500"
																: "text-gray-400 group-hover:text-gray-500",
															"mr-4 flex-shrink-0 h-6 w-6"
														)}
														aria-hidden="true"
													/>
													{item.name}
												</a>
											))}
										</nav>
									</div>
								</Dialog.Panel>
							</Transition.Child>
							<div className="flex-shrink-0 w-14">
								{/* Dummy element to force sidebar to shrink to fit close icon */}
							</div>
						</div>
					</Dialog>
				</Transition.Root>

				<div className="hidden md:w-20 md:flex lg:w-52 md:flex-col md:absolute md:inset-y-0">
					<div className="pt-7 flex flex-col flex-grow overflow-y-auto">
						<div className="flex-grow flex flex-col">
							<nav className="space-y-2 border-l border-slate-200">
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className={classNames(
											router.pathname == item.href
												? "border-primary-500"
												: "border-transparent",
											"flex flex-col items-center border-l pl-4 -ml-px hover:border-slate-400  lg:flex-row"
										)}
									>
										<item.icon
											className={classNames(
												router.pathname == item.href
													? "text-primary-500"
													: "group-hover:text-gray-500",
												"flex-shrink-0 h-6 w-6 lg:mr-2"
											)}
											aria-hidden="true"
										/>
										<div className="text-xs lg:text-base">{item.name}</div>
									</a>
								))}
							</nav>
						</div>
					</div>
				</div>

				<div className="md:pl-24 lg:pl-52">
					<div className="max-w-4xl mx-auto flex flex-col xl:px-0">
						<main className="flex-1">
							<div className="py-6">
								{/* <ElemButton
									btn="white"
									onClick={() => setSidebarOpen(true)}
									className="mb-2 hover:border-primary-500 md:hidden"
								>
									<span className="sr-only">Open Dashboard Menu</span>
									Menu
								</ElemButton> */}
								{children}
							</div>
						</main>
					</div>
				</div>
			</div>
		</>
	);
};
