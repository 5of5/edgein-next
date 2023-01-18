import { Fragment, useState, FC, PropsWithChildren } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { ElemButton } from "@/components/ElemButton";
import { IconX, IconWindowSidebar } from "@/components/Icons";
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
						<Dialog as="div" className="relative z-40" onClose={setSidebarOpen}>
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
													roundedFull={false}
													onClick={() => setSidebarOpen(false)}
													className="rounded-lg !p-0 hover:border-primary-500 mr-1 lg:hidden"
												>
													<span className="sr-only">Close Sidebar</span>
													<IconX
														className="h-8 w-8"
														aria-hidden="true"
														title="close"
													/>
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
							btn="slate"
							roundedFull={false}
							onClick={() => setSidebarOpen(true)}
							className="-ml-4 mb-4 rounded-tr-lg rounded-br-lg pl-6 hover:border-primary-500 lg:hidden"
						>
							<span className="sr-only">Dashboard List</span>
							<IconWindowSidebar className="w-6 h-6 mr-2" />
							Sidebar
						</ElemButton>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};
