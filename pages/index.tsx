import type { NextPage } from "next";
import React, { useState } from "react";
import { FigureIntroSplash } from "@/components/FigureIntroSplash";
import { ElemButton } from "@/components/ElemButton";
import { useUser } from "@/context/userContext";
import { FigureBlurredBg, FigureCircleDashes } from "@/components/Figures";
import { useFormspark } from "@formspark/use-formspark";

type Props = {
	showSignUp: boolean;
	setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>;
};

const Home: NextPage<Props> = ({ showSignUp, setShowSignUp }) => {
	const [submit, submitting] = useFormspark({
		formId: "Kz4dKDvu",
	});
	const { user, loading } = useUser();

	const [formSent, setFormSent] = useState(false);
	const [email, setEmail] = useState("");

	const onSubmit = async (e: { preventDefault: () => void }) => {
		if (e) e.preventDefault();
		await submit({
			//name: name,
			email: email,
			_email: {
				from: name,
				subject: "Waitlist - EdgeIn",
				template: {
					title: false,
					footer: false,
				},
			},
		});

		setFormSent(true);
	};

	const forFounders = (
		<div className="bg-white rounded-3xl p-7 mb-12 h-full transition-all hover:scale-102 hover:shadow md:mb-0">
			<h3 className="text-3xl font-bold text-dark-500 mb-4 lg:text-4xl">
				For founders
			</h3>
			<p className="mb-4 text-slate-600 lg:text-lg">
				We give you unrestricted access to the most reliable market data at
				hyper-speeds to help you drive growth, make critical connections, and
				gain competitor insights to stay one step ahead at all times.
			</p>
		</div>
	);

	const forInvestors = (
		<div className="bg-white rounded-3xl p-7 mb-12 h-full transition-all hover:scale-102 hover:shadow md:mb-0">
			<h3 className="text-3xl font-bold text-dark-500 mb-4 lg:text-4xl">
				For investors
			</h3>
			<p className="mb-4 text-slate-600 lg:text-lg">
				One login for all of the portfolio performance metrics you need, web3
				investment opportunities and comprehensive due diligence.
			</p>
		</div>
	);

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
									onClick={() => setShowSignUp(true)}
									arrow
									btn="primary"
								>
									Get Started
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
								onClick={() => setShowSignUp(true)}
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
