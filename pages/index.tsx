import type { NextPage } from "next";
import React from "react";
import { FigureIntroSplash } from "@/components/FigureIntroSplash";
import { ElemButton } from "@/components/ElemButton";
import { useUser } from "@/context/userContext";
import { FigureBlurredBg, FigureCircleDashes } from "@/components/Figures";
import { Popups } from "@/components/TheNavbar";

type Props = {
	setShowPopup: React.Dispatch<React.SetStateAction<Popups>>;
};

const Home: NextPage<Props> = ({ setShowPopup }) => {
	const { user, loading } = useUser();

	return (
		<>
			<section className="relative overflow-hidden">
				<FigureBlurredBg className="-top-20 md:-top-64 lg:-top-80" />
				<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:pt-20 lg:pb-32">
					<div className="mx-auto max-w-3xl">
						<h1 className="font-bold text-center text-4xl sm:text-6xl">
							Web3-focused data intelligence for success.
						</h1>
					</div>
					<div className="relative z-30 mx-auto max-w-4xl">
						<h2 className="mt-5 text-xl text-center leading-relaxed text-slate-600">
							EdgeIn combines highly refined automated processes, the
							personalization of human intelligence, and the meaningful utility
							of blockchain technologies, to give you an unparalleled edge in
							Web3.
						</h2>
						<div className="flex justify-center mt-4">
							{!user && (
								<ElemButton
									arrow
									href="/companies/"
									btn="primary"
								>
									Start Exploring For Free
								</ElemButton>
							)}
						</div>
					</div>

					<div className="relative z-0 mx-auto max-w-2xl">
						<div className="mt-10 mx-0 sm:mx-20 flex flex-col justify-center lg:mt-0 lg:mx-0">
							<FigureIntroSplash className="mt-6 lg:mt-16" />
						</div>
					</div>
				</div>
			</section>

			<section className="block mt-0 -mb-24 lg:-mt-48">
				<div className="col-span-2 relative overflow-hidden p-16 bg-gradient-to-tr from-[#553BE5] to-[#8E7AFE] text-dark-500 lg:py-20">
					<div className="max-w-7xl mx-auto text-center text-white relative z-10">
						<h2 className="max-w-2xl mx-auto text-3xl font-bold sm:text-4xl">
							Actionable intelligence, strategic analysis and data sovereignty.
						</h2>

						{user ? (
							<ElemButton
								href="/companies"
								arrow
								className="mt-6 text-primary-500 bg-gradient-to-br from-white to-[#D7D0FF] hover:to-white"
							>
								Explore companies
							</ElemButton>
						) : (
							<ElemButton
								onClick={() => setShowPopup('signup')}
								arrow
								className="mt-6 text-primary-500 bg-gradient-to-br from-white to-[#D7D0FF] hover:to-white"
							>
								Sign Up
							</ElemButton>
						)}
					</div>
					<figure className="absolute -top-64 -left-36 w-96 h-96 bg-[#1BE6FF] rounded-full blur-3xl opacity-70"></figure>
					<figure className="absolute -bottom-72 right-36 w-96 h-96 bg-[#F8DA4B] rounded-full blur-3xl"></figure>
					<figure className="absolute -bottom-64 -right-36 w-96 h-96 bg-[#F72784] rounded-full blur-3xl opacity-50"></figure>
					<FigureCircleDashes className="absolute -top-96 -left-36" />
					<FigureCircleDashes className="absolute hidden -top-88 -left-16 md:block" />
					<FigureCircleDashes className="absolute hidden -bottom-96 -right-32 md:block" />
					<FigureCircleDashes className="absolute -bottom-112 -right-52 " />
				</div>
			</section>
		</>
	);
};

export default Home;
