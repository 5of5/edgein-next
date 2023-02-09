import type { NextPage } from "next";
import React from "react";
import { ElemButton } from "@/components/elem-button";
import { FigureBlurredCircle } from "@/components/Figures";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const Custom404: NextPage<Props> = () => {
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

				<section className="py-16 px-4 sm:px-6 lg:px-8 lg:py-32">
					<div className="max-w-2xl mx-auto lg:max-w-3xl text-center lg:px-12">
						<h1 className="font-display text-6xl font-bold tracking-tight sm:px-12 sm:text-9xl">
							404
						</h1>
						<p className="mt-6 font-display text-xl leading-relaxed text-slate-600">
							We couldn&rsquo;t find the page you&rsquo;re looking for. Use the
							search bar to find what you&rsquo;re looking for or{" "}
							<Link href={"/contact"}>
								<a className="text-primary-500">Contact us</a>
							</Link>{" "}
							if you still need help.
						</p>
						<div className="flex justify-center py-8">
							<ElemButton btn="primary" href="/" arrowLeft>
								Back Home
							</ElemButton>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default Custom404;
