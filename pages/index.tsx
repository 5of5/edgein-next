import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ElemFigureIntro } from "../components/ElemFigureIntro";
import { ElemButton } from "../components/ElemButton";
import { ElemTooltip } from "../components/ElemTooltip";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Web3-focused data intelligence for success - EdgeIn.io</title>
				<meta
					name="description"
					content="Web3 data intelligence for reliable analysis, powerful insights, and tailored strategies for success."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div>
				<section className="relative">
					<figure className="absolute z-0 -bottom-44 -left-6 w-5/12 h-96 bg-[#F72784] rounded-full opacity-20 mix-blend-multiply filter blur-2xl transform-gpu animate-blob "></figure>
					<figure className="absolute z-0 -bottom-36 left-1/4 w-5/12 h-96 bg-[#7209B8] rounded-full opacity-20 mix-blend-multiply filter blur-3xl transform-gpu animate-blob animation-delay-5000 "></figure>
					<figure className="absolute z-0 -bottom-20 left-1/2 w-5/12 h-96 bg-[#0815EC] rounded-full opacity-10 mix-blend-multiply filter blur-xl transform-gpu animate-blob animation-delay-2000 "></figure>
					<figure className="absolute z-0 -bottom-40 -right-20 w-5/12 h-96 rounded-full bg-[#1BE6FF] opacity-20 mix-blend-multiply filter blur-xl transform-gpu animate-blob animation-delay-4000 "></figure>
					<div className="z-10 max-w-6xl mx-auto py-32 px-4 sm:px-6 lg:py-44 lg:px-8">
						<div className="flex flex-col md:grid md:grid-cols-5 gap-5 my-8">
							<div className="col-span-3 flex flex-col justify-center">
								<h1 className="font-bold text-5xl lg:text-6xl">
									Web3-focused data intelligence for success.
								</h1>
								<p className="max-w-lg mt-5 text-xl text-dark-400">
									EdgeIn combines highly refined automated processes, the
									personalization of human intelligence, and the meaningful
									utility of blockchain technologies, to give you an
									unparalleled edge in Web3.
								</p>
								<div className="mt-8">
									<ElemButton
										className="inline-block"
										href="/login"
										btn="primary"
									>
										Start now
									</ElemButton>
								</div>
							</div>
							<div className="col-span-2 flex flex-col justify-center">
								<ElemFigureIntro />
							</div>
						</div>
					</div>
				</section>
				<section className="bg-gray-50 rounded-t-8xl relative z-10">
					<div className="max-w-6xl mx-auto py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
						<div className="pb-12 lg:pb-20">
							<h2 className="relative max-w-3xl text-3xl font-bold text-dark-500 border-l-4 border-primary-500 pl-6 lg:text-4xl">
								Actionable intelligence, strategic analysis and data
								sovereignty.
							</h2>
						</div>

						<div className="block md:w-full md:grid md:grid-cols-2 gap-8">
							<div className="bg-white rounded-lg p-7 mb-12 lg:mb-0">
								<h3 className="text-3xl font-bold text-dark-500 mb-4 lg:text-4xl">
									For founders
								</h3>
								<p className="mb-4 text-md text-dark-400 lg:text-lg">
									We give you unrestricted access to the most reliable market
									data at hyper-speeds to help you drive growth, make critical
									connections, and gain competitor insights to stay one step
									ahead at all times.
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
							<div className="bg-white text-dark-500 rounded-lg p-7 mb-12 lg:mb-0">
								<h3 className="text-3xl font-bold  mb-4 lg:text-4xl">
									For investors
								</h3>
								<p className="mb-4 text-md text-dark-400 lg:text-lg">
									One login for all of the portfolio performance metrics you
									need, web3 investment opportunities and comprehensive due
									diligence.
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

							{/* <div className="col-span-2 p-16 py-12 bg-white text-dark-500 rounded-xl lg:py-16">
								<div className="max-w-lg mx-auto text-center">
									<h2 className="mb-4 text-3xl font-lb font-bold sm:text-4xl">
										Access the EdgeIn WhitePaper, Join in the Fun!
									</h2>
									<p className="mb-4 text-md text-dark-400 sm:text-sm lg:text-lg">
										Create an account instantly and start exploring.
									</p>
									<ElemButton href="/" btn="primary" arrow>
										Access
									</ElemButton>
								</div>
							</div> */}
						</div>
					</div>
				</section>
				{/* <section className="max-w-6xl mx-auto py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-5 gap-6">
						<ElemTooltip
							className="bg-red-500"
							content="The Top Tooltip"
							direction="top"
						>
							<div>Top</div>
						</ElemTooltip>
						<ElemTooltip
							className="bg-red-500"
							content="Lorem Ipsum is simply dummy text."
							direction="top"
						>
							<div>
								Top
								<br />
								With
								<br />
								Lots
								<br />
								of
								<br />
								content
								<br />
								blah
								<br />
								blah
								<br />
							</div>
						</ElemTooltip>
						<ElemTooltip
							className="bg-yellow-500"
							content="The Right Tooltip"
							direction="right"
						>
							<div>Right</div>
						</ElemTooltip>
						<ElemTooltip
							className="bg-green-500"
							content="The Bottom Tooltip"
							direction="bottom"
						>
							<div>Bottom</div>
						</ElemTooltip>
						<ElemTooltip
							className="bg-blue-500"
							content="The Left Tooltip"
							direction="left"
						>
							<div>Left</div>
						</ElemTooltip>
					</div>
				</section> */}
			</div>
		</div>
	);
};

export default Home;
