import { Fragment, useState, FC, PropsWithChildren } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { ElemButton } from "@/components/ElemButton";
import { IconX } from "@/components/Icons";
import { useAuth } from "@/hooks/useAuth";
import { DashboardSidebar } from "./DashboardSidebar";

type Props = {};

export const DashboardLayout: FC<PropsWithChildren<Props>> = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const router = useRouter();
	const { user } = useAuth();

	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="max-w-screen-2xl mx-auto">
				<div className="mt-10 lg:grid lg:grid-cols-9 lg:gap-x-5">
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
											<div className="absolute top-0 right-0 pt-2">
												<ElemButton
													btn="white"
													roundedFull={false}
													onClick={() => setSidebarOpen(false)}
													className="rounded-lg hover:border-primary-500 lg:hidden"
												>
													<span className="sr-only">Close Sidebar</span>
													<IconX className="h-6 w-6" aria-hidden="true" />
												</ElemButton>
											</div>
										</Transition.Child>

										<div className="px-4 flex-1 h-0 overflow-y-auto">
											<DashboardSidebar />
										</div>
									</Dialog.Panel>
								</Transition.Child>
								<div className="flex-shrink-0 w-14">
									{/* Dummy element to force sidebar to shrink to fit close icon */}
								</div>
							</div>
						</Dialog>
					</Transition.Root>

					<DashboardSidebar className="py-6 hidden lg:block lg:col-span-2 lg:py-0" />

					<div className="lg:col-span-7">
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
		</div>
	);
};
