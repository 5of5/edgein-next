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
import { useGetBillingOrgByIdQuery } from '@/graphql/types';

const Pricing = () => {
  const router = useRouter();
  const { user } = useUser();
  const { setShowPopup } = usePopup();

  const { data, error, isLoading } = useGetBillingOrgByIdQuery({
    id: Number(user?.billing_org_id),
  });

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
          'The Mentibus community plan gives you instant access to the largest decentralized dataset in Web3 and AI. Perfect for those ready to explore, contribute, and be seen.',
        features: [
          'Unlimited intelligent search across verified people, orgs, investors, events & media.',
          'Live organization updates and investor maps.',
          'Personalized email digests—tailored by tags and your interests.',
          'Data request & update concierge—fulfilled in under 20 minutes.',
          'Create and manage up to 5 personal lists.',
          'Create and manage 3 personal or public groups to build visibility around your interests.',
          'Access our Telegram community to hunt data and request features.',
          'Earn referral points and data contribution rewards.',
        ],
        cta: user
          ? data?.billing_org[0]?.status === 'active' ||
            haveSubscriptionFromCredits
            ? ''
            : 'Current Plan'
          : 'Access Now',
        mostPopular: false,
      },
      {
        title: 'Contributor',
        price: 4,
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
          'Built for Web3 builders, operators, and dealmakers. Unlock premium data and supercharge your network.',
        features: [
          'Full access to public, social, and verified email contact data.',
          'Unlimited lists and public groups',
          '3X rewards on referrals and contributions',
          'First $100 of data purchases = 100% back in Mentibus tokens ($MENTI)',
          '24/7, concierge human support for data requests, edits and prioritization.',
          'Exclusive badge recognition inside Mentibus for top contributors.',
        ],
        cta: user
          ? data?.billing_org[0]?.status === 'active'
            ? 'Current Plan'
            : 'Subscribe Now'
          : 'Subscribe Now',
        mostPopular: true,
      },
    ],
  };

  const faqs = [
    {
      question: 'How do I try Mentibus before purchasing a paid plan?',
      answer:
        'You can start with our Community plan for free, or test the full power of the Contributor plan with a free trial—no risk, no commitment.',
    },
    {
      question: 'Can I cancel anytime?',
      answer:
        'Yes. You&apos;re in control. Cancel your subscription anytime through Account Settings or by messaging our team via Intercom.',
    },
    {
      question: 'Will I be charged automatically each month?',
      answer: ' Yes. Subscriptions renew monthly unless cancelled.',
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
          className="px-4 py-12 sm:py-20 sm:px-6 lg:px-8"
          aria-labelledby="pricing-heading">
          <h2 id="pricing-heading" className="sr-only">
            Pricing
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Choose the best plan for your data needs.
              </h1>
              <p className="pt-4 text-lg sm:text-xl">
                Accessible, reliable data for the community, by the community.
              </p>
            </div>
            <div className="block mt-6 sm:mt-8 md:w-full md:grid md:grid-cols-2 md:gap-8">
              {pricing.tiers.map(tier => (
                <div
                  className={`relative flex flex-col bg-black shadow p-4 sm:p-8 ${
                    tier.mostPopular
                      ? 'mt-6 sm:mt-8 rounded-lg lg:mt-0 border-2 border-primary-500'
                      : 'rounded-bl-lg rounded-tl-lg'
                  }`}
                  key={tier.title}>
                  <div className="flex-1">
                    <h3
                      className={`inline text-2xl sm:text-3xl font-bold ${
                        tier.mostPopular ? 'text-primary-500' : ''
                      }`}>
                      {tier.title}
                    </h3>
                    {tier.mostPopular ? (
                      <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-primary-500 py-1 px-3 sm:py-1.5 sm:px-4 text-xs sm:text-sm font-semibold text-white">
                        Best Value
                      </p>
                    ) : null}
                    <p className="flex items-baseline mt-4">
                      <span className="text-4xl sm:text-5xl font-bold tracking-tight">
                        {tier.price === 0 ? (
                          'Free'
                        ) : (
                          <>
                            <span className="line-through text-red-500 mr-2">
                              $14.99
                            </span>
                            <span>
                              ${tier.price}.{tier.priceCents}
                            </span>
                          </>
                        )}
                      </span>
                      {tier.price > 0 && (
                        <span className="ml-1 text-lg sm:text-xl font-semibold">
                          {tier.frequency}
                        </span>
                      )}
                    </p>
                    <div className="text-base sm:text-lg text-slate-600">
                      {/* <p className="mt-6 font-bold text-dark-500">
												{tier.predescription}
											</p> */}
                      <p className="mt-4 sm:mt-6">{tier.description}</p>
                      <div className="my-4 sm:my-6">
                        {tier.cta !== '' && (
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
                              <IconContributor className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                            )}
                            {tier.cta}
                          </ElemButton>
                        )}
                      </div>
                      <ul
                        role="list"
                        className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
                        {tier.features.map(feature => (
                          <li key={feature} className="flex">
                            <IconCheck
                              className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                              aria-hidden="true"
                            />
                            <span className="ml-3 text-sm sm:text-base">
                              {feature}
                            </span>
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
          className="px-4 py-12 sm:py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl mx-auto lg:max-w-4xl">
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">
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
