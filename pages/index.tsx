import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
// import Image from "next/image";
import { FigureIntroSplash } from "../components/FigureIntroSplash";
import { FigureBlurredBg } from "../components/FigureBlurredBg";
import { ElemButton } from "../components/ElemButton";
// import styles from "../styles/Home.module.css";
import { useAuth } from "../hooks/useAuth";
import { InputText } from "../components/InputText";
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
			<section className="relative">
				<FigureBlurredBg className="-top-20 md:-top-64 lg:-top-80" />
				<div className="relative z-10 max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-28">
					<div className="flex flex-col items-center lg:items-start lg:grid lg:grid-cols-5 gap-5 my-8">
						<div className="col-span-3 flex flex-col justify-center">
							<h1 className="font-bold text-5xl lg:text-6xl">
								Web3-focused data intelligence for success.
							</h1>
							<h2 className="max-w-lg mt-5 text-xl leading-relaxed text-slate-600">
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
						<div className="relative col-span-2 flex flex-col justify-center">
							<FigureIntroSplash className="hidden lg:block relative" />
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

			<section className="bg-gray-50 rounded-t-8xl relative z-10">
				<div className="max-w-7xl mx-auto py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
					<div className="pb-12 lg:pb-20">
						<h2 className="relative max-w-3xl text-3xl font-bold text-dark-500 border-l-4 border-primary-500 pl-6 lg:text-4xl">
							Actionable intelligence, strategic analysis and data sovereignty.
						</h2>
					</div>

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
							{/* <ElemButton
									className="pl-0 pr-0"
									href="/"
									btn="transparent"
									arrow
								>
									Learn more
								</ElemButton> */}
						</div>
						<div className="bg-white text-dark-500 rounded-3xl p-7 mb-12 lg:mb-0">
							<h3 className="text-3xl font-bold  mb-4 lg:text-4xl">
								For investors
							</h3>
							<p className="mb-4 text-md text-slate-600 lg:text-lg">
								One login for all of the portfolio performance metrics you need,
								web3 investment opportunities and comprehensive due diligence.
							</p>
							{/* <ElemButton
									className="pl-0 pr-0"
									href="/"
									btn="transparent"
									arrow
								>
									Learn more
								</ElemButton> */}
						</div>

						{/* <div className="col-span-2 p-16 py-12 bg-white text-dark-500 rounded-3xl lg:py-16">
								<div className="max-w-lg mx-auto text-center">
									<h2 className="mb-4 text-3xl font-lb font-bold sm:text-4xl">
										Access the EdgeIn WhitePaper, Join in the Fun!
									</h2>
									<p className="mb-4 text-md text-dark-400 sm:text-sm lg:text-lg">
										Explore the daily-updated web3 database of company, VC firm,
										team, and investment information.
									</p>
									<ElemButton href="/login" btn="primary" arrow>
										Request Access
									</ElemButton>
								</div>
							</div> */}
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
