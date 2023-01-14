import type { NextPage } from "next";
import React from "react";
import { ElemButton } from "@/components/ElemButton";
import { FigureBlurredCircle } from "@/components/Figures";
import { IconCheck } from "@/components/Icons";
import Image from "next/image";

type Props = {};

const Pricing: NextPage<Props> = () => {
	const pricing = {
		tiers: [
			{
				title: "Free Account",
				price: 0,
				frequency: "/month",
				predescription: "No Cost - No Risk",
				description:
					"Engage and enjoy the the best damn dataset in the world! We are giving an Edge back to builders!",
				features: [
					"Unlimited Search",
					"Daily Carousel",
					"View Profile Pages ",
					"React to Projects",
					"Request Data",
					"Create Unlimited Lists",
					"View Profiles",
					"Create/Manage Groups to 3 members",
					"Share Projects from EdgeIn",
				],
				cta: "Sign up",
				mostPopular: false,
			},
			{
				title: "Contributor",
				price: 15,
				frequency: "/month",
				predescription: "Serious Business Player",
				description:
					"We deliver updates to you - so you never miss a thing on the companies you track!  Oh and this supports the free community use! Keep our Data Free!",
				features: [
					"Unlimited Search",
					"Daily Carousel",
					"View Profile Pages",
					"React to Projects",
					"Request Data *earn credits for requests or data provided to EdgeIn",
					"Create Unlimited Lists",
					"Create/Manage Groups to 5-1,000 members",
					"Real-Time Notifications on list projects/investors",
					"Community Badge",
					"Referral Link Activation",
					"*Daily Carousel V2 + late 2023",
				],
				cta: "Buy now",
				mostPopular: true,
			},
		],
	};

	const faqs = [
		{
			id: 1,
			question: "Can I try EdgeIn before I purchase a plan?",
			answer:
				"Yes. We offer a free version to help you learn the ropes before you decide if you want to purchase a plan.",
		},
		{
			id: 2,
			question: "Will my monthly/annual subscription be renewed automatically?",
			answer:
				"Yes, your subscription will automatically be renewed until you let us know that you'd like to change your plan or cancel your account.",
		},
		{
			id: 3,
			question: "Do you offer a money-back guarantee?",
			answer:
				"Yes, for annual subscription plans purchased on EdgeIn.io we offer a refund within 30 days of purchase. For monthly subscription plans, you can cancel your account at any time and you will not be charged for the next month.*",
		},
		{
			id: 4,
			question: "Lorem ipsum dolor sit amet?",
			answer:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna  commodo consequat.",
		},
	];

	//*The 30-day refund option may only be used once per customer. When you sign up for a DocuSign subscription plan, you must agree to the Terms and Conditions and Privacy Policy for Use of DocuSign Service Plans. This agreement contains important information regarding fees and payment terms, return of balances, and account terms and terminations. We only process cancellations and refunds according to the terms specified in the Term and Conditions.

	return (
		<>
			<div className="relative overflow-hidden">
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

				<section
					//bg-gradient-to-b from-white/50 to-transparent
					className="py-16 px-4 sm:px-6 lg:px-8"
					aria-labelledby="pricing-heading"
				>
					<h2 id="pricing-heading" className="sr-only">
						Pricing
					</h2>
					<div className="max-w-6xl mx-auto">
						<h1 className="text-4xl font-bold text-center sm:text-5xl">
							Accessible competitive data, for Builders.
						</h1>
						<div className="mt-16 block md:w-full md:grid md:grid-cols-2 gap-8">
							{pricing.tiers.map((tier) => (
								<div
									className="relative flex flex-col mt-8 bg-white shadow rounded-lg p-7 lg:mt-0"
									key={tier.title}
								>
									<div className="flex-1">
										<h3
											className={`inline text-3xl font-bold ${
												tier.mostPopular
													? "text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-primary-500 to-primary-400"
													: ""
											}`}
										>
											{tier.title}
										</h3>
										{tier.mostPopular ? (
											<p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-primary-500 py-1.5 px-4 text-sm font-semibold text-white">
												Popular
											</p>
										) : null}
										<p className="mt-4 flex items-baseline">
											<span className="text-5xl font-bold tracking-tight">
												${tier.price}
											</span>
											<span className="ml-1 text-xl font-semibold">
												{tier.frequency}
											</span>
										</p>
										<div className="text-slate-600 text-lg">
											<p className="mt-6 font-bold text-dark-500">
												{tier.predescription}
											</p>
											<p>{tier.description}</p>
											<ul role="list" className="mt-6 space-y-6">
												{tier.features.map((feature) => (
													<li key={feature} className="flex">
														<IconCheck
															className="h-6 w-6 flex-shrink-0 text-primary-500"
															aria-hidden="true"
														/>
														<span className="ml-3">{feature}</span>
													</li>
												))}
											</ul>
										</div>
									</div>
									<div className="py-8">
										<ElemButton
											href={"#"}
											className={`${
												tier.mostPopular
													? ""
													: "bg-primary-50 hover:bg-primary-100 text-primary-500"
											} w-full`}
											btn={`${tier.mostPopular ? "primary" : ""}`}
											size="lg"
										>
											{tier.cta}
										</ElemButton>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				<section
					aria-labelledby="faq-heading"
					className="mx-auto max-w-2xl divide-y divide-black/10 py-24 px-6 lg:max-w-7xl lg:py-32 lg:px-8"
				>
					<h2 id="faq-heading" className="text-3xl font-bold">
						Frequently asked questions
					</h2>
					<div className="mt-8">
						<dl className="divide-y divide-black/10">
							{faqs.map((faq) => (
								<div
									key={faq.id}
									className="pt-6 pb-8 md:grid md:grid-cols-12 md:gap-8"
								>
									<dt className="text-base font-bold md:col-span-5">
										{faq.question}
									</dt>
									<dd className="mt-2 md:col-span-7 md:mt-0">
										<p className="text-base text-slate-600">{faq.answer}</p>
									</dd>
								</div>
							))}
						</dl>
					</div>
				</section>
			</div>
		</>
	);
};

export default Pricing;
