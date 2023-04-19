import type { NextPage } from "next";
import React from "react";
import { FigureBlurredCircle } from "@/components/Figures";
import Image from "next/image";
import Link from "next/link";
import { useIntercom } from "react-use-intercom";
import { Popups } from "@/components/TheNavbar";

type Props = {
	setShowPopup: React.Dispatch<React.SetStateAction<Popups>>;
};

const Custom404: NextPage<Props> = ({ setShowPopup }) => {
	const { show } = useIntercom();

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

				<section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-52">
					<div className="max-w-2xl mx-auto lg:max-w-3xl lg:px-12">
						<h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
							Page not found!
						</h1>
						<p className="mt-6 font-display text-xl leading-relaxed text-slate-600">
							Sorry, but the page you were looking for could not be found.
						</p>
						<p className="mt-6 font-display text-lg leading-relaxed text-slate-600">
							You can use the{" "}
							<button
								className="font-bold text-primary-500 focus:outline-0"
								onClick={() => {
									setShowPopup("search");
								}}
							>
								search bar
							</button>
							, return to our{" "}
							<Link href={"/"}>
								<a className="font-bold text-primary-500">front page</a>
							</Link>
							, or{" "}
							<button
								className="font-bold text-primary-500 focus:outline-0"
								onClick={show}
							>
								drop us a line
							</button>{" "}
							to find what you&rsquo;re looking for.
							{/* if you can&rsquo;t find what you&rsquo;re
							looking for. Use the search bar to find what you&rsquo;re looking
							for or{" "}
							<Link href={"/contact"}>
								<a className="text-primary-500">Contact us</a>
							</Link>{" "}
							if you still need help. */}
						</p>
						{/* <div className="flex justify-center py-8">
							<ElemButton btn="primary" href="/" arrowLeft>
								Back Home
							</ElemButton>
						</div> */}
					</div>
				</section>
			</div>
		</>
	);
};

export default Custom404;
