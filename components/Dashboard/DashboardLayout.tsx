import { Fragment, useState, FC, PropsWithChildren } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { ElemLogo } from "@/components/ElemLogo";
import { ElemButton } from "@/components/ElemButton";
import {
	IconProps,
	IconHome,
	IconX,
	IconCompanies,
	IconCash,
} from "@/components/Icons";
import { IconCompanyList } from "../reactions/IconCompanyList";
import { useAuth } from "@/hooks/useAuth";
import { ElemDashboardSidebar } from "./ElemDashboardSidebar";

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
		{ name: "My Lists", href: "/my-list", icon: IconCompanyList },
	],
	children,
}) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const router = useRouter();
	const { user } = useAuth();

	return (
		<>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mt-10 lg:grid lg:grid-cols-12 lg:gap-x-5">
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
										{/* <div className="flex-shrink-0 px-4 flex items-center">
										<ElemLogo
											className="h-8 w-auto scale-90 transition duration-200 ease-in-out hover:scale-95"
											mode="logo"
										/>
									</div> */}
										<div className="px-4 flex-1 h-0 overflow-y-auto">
											<ElemDashboardSidebar />
										</div>
									</Dialog.Panel>
								</Transition.Child>
								<div className="flex-shrink-0 w-14">
									{/* Dummy element to force sidebar to shrink to fit close icon */}
								</div>
							</div>
						</Dialog>
					</Transition.Root>

					<aside className="py-6 hidden lg:block lg:col-span-3 lg:py-0">
						<ElemDashboardSidebar />
					</aside>
					<div className="lg:col-span-9">
						<ElemButton
							btn="white"
							roundedFull={false}
							onClick={() => setSidebarOpen(true)}
							className="mb-2 rounded-lg hover:border-primary-500 md:hidden"
						>
							<span className="sr-only">Open Dashboard Menu</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						</ElemButton>
						{children}
					</div>
				</div>
			</div>
		</>
	);
};
