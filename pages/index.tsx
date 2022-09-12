import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import { FigureIntroSplash } from "@/components/FigureIntroSplash";
import { FigureIntroSplashNew } from "@/components/FigureIntroSplashNew";

import { FigureBlurredBg } from "@/components/FigureBlurredBg";
import { ElemButton } from "@/components/ElemButton";
import { useAuth } from "@/hooks/useAuth";

import { FigureCircleDashes } from "@/components/Figures";
import { useFormspark } from "@formspark/use-formspark";

const Home: NextPage = () => {
	const [submit, submitting] = useFormspark({
		formId: "Kz4dKDvu",
	});
	const { user, error, loading } = useAuth();
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

	return (
		<>
			<section className="relative overflow-hidden">
				<FigureBlurredBg className="-top-20 md:-top-64 lg:-top-80" />
				<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-32">
					<div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:content-center">
						<div className="mx-auto max-w-2xl lg:col-span-7 lg:max-w-none">
							<h1 className="font-bold text-center text-4xl sm:text-left sm:text-6xl">
								Web3-focused data intelligence for success.
								{/* Web3 Project Company research delivered daily to save you time */}
							</h1>
							<h2 className="max-w-lg mt-5 text-xl text-center leading-relaxed text-slate-600 sm:text-left">
								EdgeIn combines highly refined automated processes, the
								personalization of human intelligence, and the meaningful
								utility of blockchain technologies, to give you an unparalleled
								edge in Web3.
							</h2>
							{/* <div className="mt-8">
								{user ? (
									<ElemButton href="/companies" btn="primary" arrow>
										Start Exploring
									</ElemButton>
								) : (
									<ElemButton href="/login" btn="primary" arrow>
										Log In
									</ElemButton>
								)}
							</div> */}
						</div>

						<div className="mt-28 mx-0 sm:mx-20 flex flex-col justify-center lg:col-span-5 lg:row-span-2 lg:mt-0 lg:mx-0">
							<FigureIntroSplashNew />
							{/* <FigureIntroSplash className="hidden lg:block relative" /> */}
						</div>
					</div>
					{/* <div className="bg-white rounded-2xl border border-dark-500/10 p-6 w-[30rem]">
					
					<p className="mt-2 text-xl text-dark-400">
						{formSent &&
							 `your email ${email} has been added to our list.  we'll be in touch soon!`
						}
					</p>

					{!formSent && (
						<>
							<form
								className="relative grid grid-cols-1 gap-y-4 mt-6 sm:grid-cols-5 sm:gap-x-4"
								onSubmit= {() => {}} //{onSubmit}
							>
								<div className="group mb-6 sm:col-span-3">
									<InputText
										//label="Email"
										type="email"
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="example@email.com"
										required
									/>
								</div>
								<div className="sm:col-span-2 mt-2">
									<ElemButton roundedFull={true} btn="primary" loading={submitting}>
										Join the waitlist
									</ElemButton>
								</div>
							</form>
						</>
					)}
				</div> */}
				</div>
			</section>

			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* <div className="pb-12 lg:pb-20">
						<h2 className="relative max-w-3xl text-3xl font-bold text-dark-500 border-l-4 border-primary-500 pl-6 lg:text-4xl">
							Actionable intelligence, strategic analysis and data sovereignty.
						</h2>
					</div> */}

				<div className="block md:w-full md:grid md:grid-cols-2 gap-8">
					<div className="bg-white rounded-3xl p-7 mb-12 lg:mb-0">
						<h3 className="text-3xl font-bold text-dark-500 mb-4 lg:text-4xl">
							For founders
						</h3>
						<p className="mb-4 text-md text-slate-600 lg:text-lg">
							We give you unrestricted access to the most reliable market data
							at hyper-speeds to help you drive growth, make critical
							connections, and gain competitor insights to stay one step ahead
							at all times.
						</p>
						{/* <ElemButton className="pl-0 pr-0" href="/" arrow>
							Learn more
						</ElemButton> */}
					</div>
					<div className="bg-white rounded-3xl p-7 mb-12 lg:mb-0">
						<h3 className="text-3xl font-bold  mb-4 lg:text-4xl">
							For investors
						</h3>
						<p className="mb-4 text-md text-slate-600 lg:text-lg">
							One login for all of the portfolio performance metrics you need,
							web3 investment opportunities and comprehensive due diligence.
						</p>
						{/* <ElemButton className="pl-0 pr-0" href="/" arrow>
							Learn more
						</ElemButton> */}
					</div>

					<div className="col-span-2 relative overflow-hidden p-16 py-12 bg-gradient-to-tr from-[#553BE5] to-[#8E7AFE] text-dark-500 rounded-3xl lg:py-16">
						<div className="text-center text-white">
							<h2 className="max-w-2xl mx-auto mb-6 text-3xl font-bold sm:text-5xl">
								Ready to start exploring?
							</h2>
							<p className="max-w-sm mx-auto mb-6 text-xl opacity-80">
								Actionable intelligence, strategic analysis and data
								sovereignty.
							</p>
							<ElemButton
								href="/waitlist"
								arrow
								className="text-primary-500 bg-gradient-to-br from-white to-[#D7D0FF] hover:to-white"
							>
								Request Access
							</ElemButton>
						</div>
						<figure className="absolute -top-64 -left-36 w-96 h-96 bg-[#1BE6FF] rounded-full blur-3xl opacity-70"></figure>
						<figure className="absolute -bottom-72 right-36 w-96 h-96 bg-[#F8DA4B] rounded-full blur-3xl"></figure>
						<figure className="absolute -bottom-64 -right-36 w-96 h-96 bg-[#F72784] rounded-full blur-3xl opacity-50"></figure>
						<FigureCircleDashes className="absolute -top-96 -left-36" />
						<FigureCircleDashes className="absolute hidden -top-88 -left-16 md:block" />
						<FigureCircleDashes className="absolute hidden -bottom-96 -right-32 md:block" />
						<FigureCircleDashes className="absolute -bottom-112 -right-52 " />
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
