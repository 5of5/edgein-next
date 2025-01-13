import React from 'react';
import { ElemButton } from '@/components/elem-button';
import { FigureBlurredCircle } from '@/components/figures';
import { IconCheck, IconContributor } from '@/components/icons';
import Image from 'next/image';
import { loadStripe } from '@/utils/stripe';
import { useUser } from '@/context/user-context';
import { usePopup } from '@/context/popup-context';
import { useRouter } from 'next/router';
import { ROUTES } from '@/routes';
import { NextSeo } from 'next-seo';

const Pricing = () => {
  const router = useRouter();
  const { user } = useUser();
  const { setShowPopup } = usePopup();

  const haveSubscriptionFromCredits =
    user?.use_credits_system &&
    new Date(user?.last_transaction_expiration || 0) > new Date();

  const pricing = {
    tiers: [
      {
        title: 'Community',
        price: 0,
        priceCents: null,
        //frequency: "/month",
        //predescription: "No Cost - No Risk",
        click: () => {
          if (!user) {
            router.push(ROUTES.SIGN_IN);
          }
        },
        description:
          'Instant access to browse the largest community dataset in AI and Web3, exclusively on the Mentibus platform.',
        features: [
          'Unlimited search',
          'Access to view organization profiles and updates on investors, events, and news.',
          'Email updates of relevant news in your area based on personalization and tags.',
          'Make data requests and updates on Mentibus, fulfilled in <20 minutes.',
          'Create and manage up to 5 personal lists.',
          'Create and manage 3 personal or public groups to hunt and discuss your interests.',
          'Access the Mentibus community telegram to request datasets and features.',
          'See referral points for contributing data and inviting members to the community. Upgrade to access your points and help us make Mentibus work for everyone!',
        ],
        cta: user
          ? user.billing_org?.status === 'active' || haveSubscriptionFromCredits
            ? ''
            : 'Current Plan'
          : 'Access Now',
        mostPopular: false,
      },
      {
        title: 'Contributor',
        price: 14,
        priceCents: 99,
        frequency: '/month',
        //predescription: "Serious Business Player",
        click: () => {
          if (!user) {
            router.push(ROUTES.SIGN_IN);
          } else {
            loadStripe();
          }
        },
        description:
          'Contributors are serious Web3 builders who need connections to our community today. They help us build and pay for the fresh network/data.',
        features: [
          'Access to public, social and email information for quick connection to other Web3 executives.',
          'Unlimited lists.',
          'Unlimited groups.',
          '2X earning on referrals and data contribution.',
          '24/7, concierge human support for data requests, edits and prioritization.',
        ],
        cta: user
          ? user.billing_org?.status === 'active'
            ? 'Current Plan'
            : 'Free Trial'
          : 'Free Trial',
        mostPopular: true,
      },
    ],
  };

  const faqs = [
    {
      question: 'Can I try Mentibus before I purchase a paid plan?',
      answer:
        'Yes, of course! We offer a FREE trial so you can decide which features work best for your workflow.',
    },
    {
      question: 'Will my monthly subscription be renewed automatically?',
      answer:
        'Yes, your subscription will automatically renew each month. You can cancel anytime in your Account Settings or by contacting our team through Intercom on the site.',
    },
  ];

  return (
    <>
      <NextSeo
        title="Pricing"
        description="Instant access to browse the largest community dataset in AI and Web3, exclusively on the Mentibus platform. Accessible, reliable data for the community, by the community. Choose the best plan for your data needs."
      />
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
          className="px-4 py-16 sm:px-6 lg:px-8"
          aria-labelledby="pricing-heading">
          <h2 id="pricing-heading" className="sr-only">
            Pricing
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="max-w-2xl mx-auto text-center ">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Choose the best plan for your data needs.
              </h1>
              <p className="pt-4 text-xl">
                Accessible, reliable data for the community, by the community.
              </p>
            </div>
            <div className="block mt-16 md:w-full md:grid md:grid-cols-2">
              {pricing.tiers.map(tier => (
                <div
                  className={`relative flex flex-col bg-black shadow p-7 ${
                    tier.mostPopular
                      ? 'mt-8 rounded-lg lg:mt-0 border-2 border-primary-500'
                      : 'rounded-bl-lg rounded-tl-lg mt-14'
                  }`}
                  key={tier.title}>
                  <div className="flex-1">
                    <h3
                      className={`inline text-3xl font-bold ${
                        tier.mostPopular ? 'text-primary-500' : ''
                      }`}>
                      {tier.title}
                    </h3>
                    {tier.mostPopular ? (
                      <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-primary-500 py-1.5 px-4 text-sm font-semibold text-white">
                        Best Value
                      </p>
                    ) : null}
                    <p className="flex items-baseline mt-4">
                      <span className="text-5xl font-bold tracking-tight">
                        {tier.price === 0 ? 'Free' : '$' + tier.price}
                      </span>
                      {tier.price > 0 && (
                        <span className="ml-1 text-xl font-semibold">
                          {tier.priceCents ? '.' + tier.priceCents : ''}
                          {tier.frequency}
                        </span>
                      )}
                    </p>
                    <div className="text-lg text-slate-600">
                      {/* <p className="mt-6 font-bold text-dark-500">
												{tier.predescription}
											</p> */}
                      <p className="mt-6">{tier.description}</p>
                      <div className="my-6">
                        <ElemButton
                          onClick={tier.click}
                          className={`${
                            tier.mostPopular
                              ? ''
                              : 'bg-primary-50 hover:bg-primary-100 text-primary-500'
                          } w-full`}
                          btn={`${tier.mostPopular ? 'primary' : ''}`}
                          size="lg">
                          {tier.mostPopular && (
                            <IconContributor className="w-5 h-5 mr-1" />
                          )}
                          {tier.cta}
                        </ElemButton>
                      </div>
                      <ul role="list" className="mt-6 space-y-6">
                        {tier.features.map(feature => (
                          <li key={feature} className="flex">
                            <IconCheck
                              className="flex-shrink-0 w-6 h-6 text-green-600"
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
												<IconContributor className="w-5 h-5 mr-1" />
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
          className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl mx-auto lg:max-w-4xl">
            <h2 id="faq-heading" className="text-4xl font-bold">
              Pricing FAQs
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
