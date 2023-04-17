import type { NextPage } from "next";
import React from "react";
import { ElemButton } from "@/components/ElemButton";
import { FigureBlurredCircle } from "@/components/Figures";
import { IconCheck, IconSparkles } from "@/components/Icons";
import Image from "next/image";
import { loadStripe } from "@/utils/stripe";
import { useUser } from "@/context/userContext";
import { Popups } from "@/components/TheNavbar";

type Props = {
	setShowPopup: React.Dispatch<React.SetStateAction<Popups>>;
};

const Pricing: NextPage<Props> = ({ setShowPopup }) => {
	const { user } = useUser();

	const pricing = {
		tiers: [
			{
				title: "Community",
				price: 5,
				priceCents: null,
				frequency: "/month",
				//predescription: "No Cost - No Risk",
				click: () => {
					if (!user) {
						setShowPopup("signup");
					}
				},
				description:
					"Signup today and get instant access to the largest community dataset in Web3, exclusively on the EdgeIn platform.",
				features: [
					"Unlimited Search",
					"Daily Carousel",
					"View Profile Pages",
					"React to Projects / Deals",
					"Request Data",
					"Create / Share up to 5 Lists",
					"Create / Manage Groups with up to 3 members",
				],
				cta: user ? (user.billing_org ? "" : "Current Plan") : "Sign up",
				mostPopular: false,
			},
			{
				title: "Contributor",
				price: 14,
				priceCents: 99,
				frequency: "/month",
				//predescription: "Serious Business Player",
				click: () => {
					if (!user) {
						setShowPopup("signup");
					} else {
						loadStripe();
					}
				},
				description:
					"As a Contributor, you get real-time updates on the companies, people, deals and events you’re most interested in, giving you an unprecedented edge in Web3.",
				features: [
					"Unlimited Search",
					"Daily Carousel",
					"View Profile Pages",
					"React to Projects / Deals",
					"Request / Correct Data *earn credits for data contributions made to EdgeIn",
					"Create / Share Unlimited Lists",
					"Create / Manage Groups with up to 5,000 members",
					"Real-Time Notifications on Saved Companies, Projects and Investors in Lists",
					"Referral Link Activation",
					"View Emails on User Profiles",
					"Personalized Daily Carousel **launching late 2023",
				],
				cta: user
					? user.billing_org
						? "Current Plan"
						: "Free Trial"
					: "Free Trial",
				mostPopular: true,
			},
		],
	};

	const faqs = [
		{
			question: "Can I try EdgeIn before I purchase a paid plan?",
			answer:
				"Yes, of course! We offer a FREE trial so you can decide which features work best for your workflow.",
		},
		{
			question: "Will my monthly subscription be renewed automatically?",
			answer:
				"Yes, your subscription will automatically renew each month. You can cancel anytime in your Account Settings or by contacting our team through Intercom on the site.",
		},
	];

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
					className="py-16 px-4 sm:px-6 lg:px-8"
					aria-labelledby="pricing-heading"
				>
					<h2 id="pricing-heading" className="sr-only">
						Pricing
					</h2>
					<div className="max-w-4xl mx-auto">
						<div className=" max-w-2xl mx-auto text-center">
							<h1 className="text-4xl font-bold sm:text-5xl">
								Choose the best plan for your data needs.
							</h1>
							<p className="pt-4 text-xl">
								Accessible, reliable data for the community, by the community.
							</p>
						</div>
						<div className="mt-16 block md:w-full md:grid md:grid-cols-2">
							{pricing.tiers.map((tier) => (
								<div
									className={`relative flex flex-col bg-white shadow p-7 ${
										tier.mostPopular
											? "mt-8 rounded-lg lg:mt-0 border-2 border-primary-500"
											: "rounded-bl-lg rounded-tl-lg my-14"
									}`}
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
												Best Value
											</p>
										) : null}
										<p className="mt-4 flex items-baseline">
											<span className="text-5xl font-bold tracking-tight">
												{tier.price === 0 ? "Free" : "$" + tier.price}
											</span>
											{tier.price > 0 && (
												<span className="ml-1 text-xl font-semibold">
													{tier.priceCents ? "." + tier.priceCents : ""}
													{tier.frequency}
												</span>
											)}
										</p>
										<div className="text-slate-600 text-lg">
											{/* <p className="mt-6 font-bold text-dark-500">
												{tier.predescription}
											</p> */}
											<p className="mt-6">{tier.description}</p>
											<div className="my-6">
												<ElemButton
													onClick={tier.click}
													className={`${
														tier.mostPopular
															? ""
															: "bg-primary-50 hover:bg-primary-100 text-primary-500"
													} w-full`}
													btn={`${tier.mostPopular ? "primary" : ""}`}
													size="lg"
												>
													{tier.mostPopular && (
														<IconSparkles className="w-5 h-5 mr-1" />
													)}
													{tier.cta}
												</ElemButton>
											</div>
											<ul role="list" className="mt-6 space-y-6">
												{tier.features.map((feature) => (
													<li key={feature} className="flex">
														<IconCheck
															className="h-6 w-6 flex-shrink-0 text-green-600"
															aria-hidden="true"
														/>
														<span className="ml-3">{feature}</span>
													</li>
												))}
											</ul>
										</div>
									</div>
									{/* <div className="pt-8">
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
											{tier.mostPopular && (
												<IconSparkles className="w-5 h-5 mr-1" />
											)}
											{tier.cta}
										</ElemButton>
									</div> */}
								</div>
							))}
						</div>
					</div>
				</section>

				<section
					aria-labelledby="faq-heading"
					className="py-16 px-4 sm:px-6 lg:px-8 lg:py-24"
				>
					<div className="mx-auto max-w-2xl lg:max-w-4xl">
						<h2 id="faq-heading" className="text-4xl font-bold">
							Frequently asked questions
						</h2>
						<div className="mt-8">
							<dl className="space-y-12">
								{faqs.map((faq, index) => (
									<div key={index}>
										<dt className="text-xl font-bold leading-6">
											{faq.question}
										</dt>
										<dd className="mt-2 text-lg">
											<p className="text-slate-600">{faq.answer}</p>
										</dd>
									</div>
								))}
							</dl>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default Pricing;
