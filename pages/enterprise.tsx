import type { NextPage } from "next";
import React from "react";
import { ElemButton } from "@/components/ElemButton";
import { FigureBlurredCircle } from "@/components/Figures";
import { FigureDash } from "@/components/Figures";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { useUser } from "@/context/userContext";
import { Popups } from "@/components/TheNavbar";
import Builders from "@/public/images/builders.svg";
import People from "@/public/images/people.svg";
import { IconCheck } from "@/components/Icons";

type Props = {
	setShowPopup: React.Dispatch<React.SetStateAction<Popups>>;
};

const Enterprise: NextPage<Props> = ({ setShowPopup }) => {
	const { user } = useUser();

	return (
		<>
			<div className="relative -mb-24 overflow-hidden">
				<figure className="absolute opacity-50 -z-10 -top-10 left-0 translate-y-[-10%] translate-x-[-55%] sm:left-1/2 sm:translate-y-[-6%] sm:translate-x-[-140%] lg:translate-x-[-130%] xl:translate-x-[-142%]">
					<Image
						src="/images/bg-blur-shapes.png"
						alt="Blur"
						width={620}
						height={1000}
						priority
					/>
				</figure>
				<FigureBlurredCircle className="absolute -z-10 top-16 right-0 translate-x-[80%] sm:translate-x-[50%] lg:translate-x-[20%]" />

				<section className="pt-16 -mb-20 px-4 sm:px-6 lg:px-8">
					<div className="max-w-5xl mx-auto">
						<h1 className="text-4xl font-bold text-center sm:text-5xl lg:px-12">
							The exclusive Web3 platform for market intelligence.
						</h1>
						<div className="max-w-2xl mx-auto relative mt-8 -z-10">
							<Transition
								appear={true}
								show={true}
								enter="transition ease-in-out duration-1000 delay-700"
								enterFrom="opacity-0 translate-y-10"
								enterTo="opacity-100 translate-y-0"
							>
								<div className="aspect-video w-full min-h-[1px] rounded-2xl bg-gradient-to-tr from-gray-50/80 to-gray-50/20 border border-slate-200 opacity-100 backdrop-blur-3xl">
									<FigureDash className="mx-3 my-1 aspect-video max-w-full" />
								</div>
							</Transition>
						</div>
					</div>
				</section>

				<section className="bg-white border-y border-slate-200">
					<div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
						<div className="block md:w-full md:grid md:grid-cols-2 md:gap-10">
							<div className="flex flex-col items-start lg:flex-row lg:space-x-4">
								<img
									src={Builders}
									alt="Builders"
									className="flex-shrink-0 w-12"
								/>
								<div>
									<h3 className="text-2xl font-bold mt-2 lg:mt-0">
										Reach 1,000s of builders in Web3 every day.
									</h3>

									<ul className="mt-4 text-slate-600 text-lg">
										<li className="flex">
											<IconCheck
												className="h-6 w-6 flex-shrink-0 text-primary-500"
												aria-hidden="true"
											/>
											<div className="ml-2">
												Largest database of web3 companies, from alpha to large
												brands.
											</div>
										</li>
										<li className="flex">
											<IconCheck
												className="h-6 w-6 flex-shrink-0 text-primary-500"
												aria-hidden="true"
											/>
											<div className="ml-2">
												Connect with founders, investors and team members.
											</div>
										</li>
										<li className="flex">
											<IconCheck
												className="h-6 w-6 flex-shrink-0 text-primary-500"
												aria-hidden="true"
											/>
											<div className="ml-2">
												Filter by location, projects, and industry tags.
											</div>
										</li>
									</ul>
								</div>
							</div>
							<div className="flex flex-col items-start mt-12 sm:mt-0 lg:flex-row lg:space-x-4">
								<img src={People} alt="Builders" className="shrink-0 w-12" />
								<div>
									<h3 className="text-2xl font-bold mt-2 lg:mt-0">
										Get curated leads to connect with the right people faster
										and easier.
									</h3>
									<ul className="mt-4 text-slate-600 text-lg">
										<li className="flex">
											<IconCheck
												className="h-6 w-6 flex-shrink-0 text-primary-500"
												aria-hidden="true"
											/>
											<div className="ml-2">
												Emails of team members from 43,000+ companies.
											</div>
										</li>
										<li className="flex">
											<IconCheck
												className="h-6 w-6 flex-shrink-0 text-primary-500"
												aria-hidden="true"
											/>
											<div className="ml-2">Social data for 30,000 people.</div>
										</li>
										<li className="flex">
											<IconCheck
												className="h-6 w-6 flex-shrink-0 text-primary-500"
												aria-hidden="true"
											/>
											<div className="ml-2">
												Highly engaged Web3 community members.
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="mt-16 p-8 rounded-lg bg-gradient-to-tr from-[#553BE5] to-[#8E7AFE] sm:p-16">
							<div className="max-w-2xl mx-auto">
								<h3 className=" text-3xl font-bold text-white">
									Ecosystem plans discounts available for first 15 early
									partners, until April 1st:
								</h3>
								<p className="text-xl text-gray-100">
									$4,995, Now $995 for 1 year.
								</p>
								<p className="mt-6 text-xl text-gray-100">
									*1,000 leads based on initial request.
								</p>
								<p className="text-xl text-gray-100">
									*100 $15 Contributor accounts 6 months.
								</p>
								<p className="text-xl text-gray-100">
									*100 $5 Collaborator accounts 12 months.
								</p>
								<p className="mt-6 text-xl text-gray-100">
									Prices will increase month on month starting April 1st.
									Starting at $995/year with a limit of 15 per level.
								</p>
								<ElemButton
									href="https://buy.stripe.com/00gdTG7pWfjM0jSfZ2"
									target="_blank"
									arrow
									size="lg"
									className="mt-6 text-primary-500 bg-gradient-to-br from-white to-[#D7D0FF] hover:to-white"
								>
									Get started now
								</ElemButton>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default Enterprise;
