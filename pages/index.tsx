import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
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
					<figure
						className="
          absolute
          z-0
          -bottom-44
          -left-6
          w-5/12
          h-96
          bg-[#F72784]
          rounded-full
          opacity-20
          mix-blend-multiply
          filter
          blur-2xl
          transform-gpu
          animate-blob
        "
					></figure>
					<figure
						className="
          absolute
          z-0
          -bottom-36
          left-1/4
          w-5/12
          h-96
          bg-[#7209B8]
          rounded-full
          opacity-20
          mix-blend-multiply
          filter
          blur-3xl
          transform-gpu
          animate-blob
          animation-delay-5000
        "
					></figure>
					<figure
						className="
          absolute
          z-0
          -bottom-20
          left-1/2
          w-5/12
          h-96
          bg-[#0815EC]
          rounded-full
          opacity-10
          mix-blend-multiply
          filter
          blur-xl
          transform-gpu
          animate-blob
          animation-delay-2000
        "
					></figure>
					<figure
						className="
          absolute
          z-0
          -bottom-40
          -right-20
          w-5/12
          h-96
          rounded-full
          bg-[#1BE6FF]
          opacity-20
          mix-blend-multiply
          filter
          blur-xl
          transform-gpu
          animate-blob
          animation-delay-4000
        "
					></figure>
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
									{/* <ElemLearnMore
                btn-text="Start now"
                btn="primary"
                className="inline-block"
              /> */}
								</div>
							</div>
							<div className="col-span-2 flex flex-col justify-center">
								<figure
									className="
                grid grid-cols-2
                gap-3
                w-96
                p-4
                z-10
                rounded-[40px]
                bg-white/50
                box-border
                border border-white/50
                -skew-x-6
                shadow-right-bottom
              "
									style={{ backdropFilter: "blur(12px)" }}
								>
									<div className="col-span-1 h-44 bg-gray-200 rounded-[26px]"></div>
									<div className="col-span-1 h-44 bg-white rounded-[26px]"></div>
									<div className="col-span-2 h-44 bg-white rounded-[26px]"></div>
									<div className="absolute -left-16 top-1/2 -translate-y-3/4 w-9/12 rounded-xl bg-[#f6f9fc] border border-white/50 shadow-right-bottom p-1.5">
										<div className="flex h-full w-full bg-white rounded-lg p-1.5">
											<div
												data-placeholder
												className="
                      mr-2
                      h-20
                      w-20
                      rounded-full
                      overflow-hidden
                      relative
                      bg-gray-200
                    "
											></div>
											<div className="flex flex-col justify-between">
												<div
													data-placeholder
													className="
                        mb-2
                        h-2
                        w-40
                        overflow-hidden
                        relative
                        bg-gray-200
                        rounded-xl
                      "
												></div>
												<div
													data-placeholder
													className="
                        mb-2
                        h-2
                        w-40
                        overflow-hidden
                        relative
                        bg-gray-200
                        rounded-xl
                      "
												></div>
												<div
													data-placeholder
													className="
                        mb-2
                        h-2
                        w-40
                        overflow-hidden
                        relative
                        bg-gray-200
                        rounded-xl
                      "
												></div>
												<div
													data-placeholder
													className="
                        h-8
                        w-40
                        overflow-hidden
                        relative
                        bg-gray-200
                        rounded-lg
                      "
												></div>
											</div>
										</div>
									</div>
								</figure>
							</div>
						</div>
					</div>
				</section>
				<section className="bg-gray-50 rounded-t-8xl relative z-10">
					<div className="max-w-6xl mx-auto py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
						<div className="w-full mx-auto">
							<div className="pb-12 lg:pb-20">
								<h2
									className="
                relative
                max-w-3xl
                text-3xl
                font-bold
                text-dark-500
                border-l-4 border-primary-500
                pl-6
                lg:text-4xl
              "
								>
									Actionable intelligence, strategic analysis, personalized
									market mapping and concierge benefits.
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
									{/* <ElemLearnMore btn-className="pl-0" /> */}
								</div>
								<div className="bg-white rounded-lg p-7 mb-12 lg:mb-0">
									<h3 className="text-3xl font-bold text-dark-500 mb-4 lg:text-4xl">
										For investors
									</h3>
									<p className="mb-4 text-md text-dark-400 lg:text-lg">
										One login for all of the portfolio performance metrics you
										need, web3 investment opportunities, comprehensive due
										diligence, plus an exclusive concierge team for executive
										email and calendaring support.
									</p>
									{/* <ElemLearnMore btn-className="pl-0" /> */}
								</div>
							</div>
						</div>

						{/* <ElemCta
          title="Access the EdgeIn WhitePaper, Join in the Fun!"
          content="Create an account instantly and start exploring."
          className="mt-8"
        >
        </ElemCta> */}

						{/* <VoronoiTreemap /> */}
					</div>
				</section>
			</div>
		</div>
	);
};

export default Home;
