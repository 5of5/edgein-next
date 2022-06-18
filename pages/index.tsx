import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";
import { FigureIntroSplash } from "../components/FigureIntroSplash";
import { FigureBlurredBg } from "../components/FigureBlurredBg";
import { ElemButton } from "../components/ElemButton";
// import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Web3-focused data intelligence for success - EdgeIn.io</title>
				<meta
					name="description"
					content="Web3 data intelligence for reliable analysis, powerful insights, and tailored strategies for success."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<section className="relative">
				<figure className="absolute -left-96 -top-44 z-0 bg-gray-100 rounded-full h-[30rem] w-[30rem] lg:h-[40rem] lg:w-[40rem]"></figure>
				<FigureBlurredBg className="-bottom-16 sm:-bottom-44" />
				<div className="relative z-10 max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-28">
					<div className="flex flex-col items-center lg:items-start lg:grid lg:grid-cols-5 gap-5 my-8">
						<div className="col-span-3 flex flex-col justify-center">
							<h1 className="font-bold text-5xl lg:text-6xl">
								Web3-focused data intelligence for success.
							</h1>
							<h2 className="max-w-lg mt-5 text-xl text-dark-400">
								EdgeIn combines highly refined automated processes, the
								personalization of human intelligence, and the meaningful
								utility of blockchain technologies, to give you an unparalleled
								edge in Web3.
							</h2>
							<div className="mt-8">
								<ElemButton
									className="inline-block"
									href="/login"
									btn="primary"
									arrow
								>
									Start now
								</ElemButton>
							</div>
						</div>
						<div className="relative col-span-2 flex flex-col justify-center">
							<FigureIntroSplash className="hidden lg:block relative" />
						</div>
					</div>
				</div>
			</section>

			<section className="bg-gray-50 rounded-t-8xl relative z-10">
				<div className="max-w-6xl mx-auto py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
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
							<p className="mb-4 text-md text-dark-400 lg:text-lg">
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
							<p className="mb-4 text-md text-dark-400 lg:text-lg">
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
