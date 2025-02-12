import React from 'react';
import type { NextPage } from 'next';
import { ElemButton } from '@/components/elem-button';
import { ROUTES } from '@/routes';
import { NextSeo } from 'next-seo';
import { IconChatBubble, IconEmail } from '@/components/icons';
import { useIntercom } from 'react-use-intercom';
import { LiveChatWidget, EventHandlerPayload } from "@livechat/widget-react";

type Props = {};

const Faq: NextPage<Props> = ({}) => {
  const { show } = useIntercom();

  function handleLiveChatEvent(event: EventHandlerPayload<"onNewEvent">) {
    console.log("LiveChatWidget.onNewEvent", event);
  }

  const faqs = [
    {
      question: `What is Mentibus's mission?`,
      answer:
        'Our mission is create a fair and open platform that allows you to participate as a community member and owner of your own data. Mentibus is free from centralized interference and controls, giving you the keys to your data and your network.',
    },
    {
      question: 'How much does membership cost?',
      answer: 'Nothing! Join Mentibus for free as long as you’d like.',
    },
    {
      question: 'Why is my data listed on Mentibus?',
      answer:
        'Mentibus is a historic record of early market data. We enable individuals and companies to access these data sets and earn rewards off of their contributions. Our team works hard to notify both individuals and companies on the platform and provide them with an opportunity to view, correct, and enrich their data through our claimed profile process.',
    },
    {
      question: 'Where does my data come from?',
      answer:
        'Data on Mentibus comes directly from nearly 50 open, public databases, as well as a collection of partners that have sold data to Mentibus Inc.',
    },
    {
      question: `How do I edit my company's profile on Mentibus?`,
      answer:
        'Currently, you cannot directly edit your company profile. However, you can suggest edits and submit new data to our team of Edgeineers who work 24/7 to validate, enrich, and correct data on Mentibus for the community via Intercom. We will be releasing user edit functionality in the near future, so stay tuned for updates.',
    },
    {
      question: 'How do I edit my personal profile?',
      answer:
        'As with company profiles, we do not currently support direct editing of personal profiles. However, you can suggest edits and submit new data to our team of Edgeineers who work 24/7 to validate, enrich, and correct all personal data on Mentibus for the community via Intercom. In our upcoming interactions, we will allow you to suggest and edit your personal profile.',
    },
    {
      question: 'What are points?',
      answer:
        'Points are our way of validating the network. You earn points for claiming a profile and/or referring friends to Mentibus. Points are being tracked by the system and will allow for retroactive conversion into the Mentibus Foundation token functionality. ',
    },
    {
      question: 'What is the referral network?',
      answer:
        'The referral network is our way of rewarding YOU for inviting your network to Mentibus. We plan on instituting a perpetual referral link, so that we can fulfill this simple promise - each time you earn points, the friends and colleagues you invited to the network, are rewarded as well.',
    },
    {
      question: 'How accurate is the data on Mentibus?',
      answer: `Our data is mostly correct, but not perfect. We work with YOU, the community, to build out and enrich the data sets. Mentibus's data model is unique in that we don't spend time and investor money like other platforms to ensure WE own the data; instead, our model allows for data contributors to participate in revenue and rewards as the platform grows.`,
    },
    {
      question: 'What is the claim your profile button for?',
      answer:
        'When you claim your profile, an Mentibuseer is immediately assigned to work with you to correct bad data and enrich your profile. This is not only useful for you as an individual, but also for partners who are contributing data to the platform.',
    },
    {
      question: 'How do filters work?',
      answer:
        'We use filters to allow you to taxonomize and build a bank of similar companies of interest. Mentibus is working on building a personalized experience for the community based on interest. The filters are all about allowing you to connect and build a better product for the community.',
    },
    {
      question: 'How much data can I export on the Contributor plan?',
      answer:
        'As much as you want. Mentibus is intentionally priced for accessibility because we emphatically feel that the data belongs to the community - NOT just builders and hedge funds that can afford to pay $60,000+ per year for private analysts or subscriptions to Pitchbook, Nansen, and others.',
    },
    {
      question: 'How can Mentibus help my Web3 startup?',
      answer: `By claiming your personal and/or company profile and working with our Mentibuseers to validate and enrich your date, you get promoted in the trending list of companies. Mentibus has 10,000 MAU's that consist mostly of investors or other builders, which is incredible visibility for your company and brand. The platform also lists and promotes your profile directly to community members based on Tags. The more correct the Tags, the easier it is for interested investors, partners, and customers to find, validate, and contact your company.`,
    },
    {
      question:
        'What is your goal with the product overall? What do you want it to be?',
      answer: `Our goal is to serve as an open platform for accessibility to community data sets and to reward your contributions to the network itself. Mentibus aims to be a LinkedIn, meets Facebook, meets Pitchbook, but without shareholders. The only decision makers on our platform are data and token holders. Let's build a better future together!`,
    },
    {
      question:
        'Does the contributor plan allow users to extract company URLs?',
      answer:
        'The short answer is, yes, we do. However, this feature is limited for now and will continue to be built out in the upcoming months as Mentibus plans to become the go-to source of data and information for the community in the future.',
    },
    {
      question: 'How can I have my company listed?',
      answer: 'Sign up and ask an Mentibuseer below.',
    },
    {
      question: 'Can I try Mentibus Contributor plan before I purchase?',
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
        title="Frequently Asked Questions"
        description="Have questions about our business data ecosystem? Find lots of answers about getting started and making progress on this page."
      />
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 w-full -z-10 h-96 bg-gradient-to-b from-x-100 to-white" />

        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse">
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <section aria-labelledby="faq-heading" className="py-24 lg:py-36">
          <div className="px-4 mx-auto sm:px-6max-w-2xl lg:max-w-4xl lg:px-12">
            <h2 id="faq-heading" className="text-4xl font-semibold">
              Frequently asked questions
            </h2>
            <div className="mt-16">
              <dl className="space-y-12">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <dt className="text-xl font-bold leading-6">
                      {index != 0 && (
                        <div className="h-px my-10 bg-gradient-to-r from-primary-100/0 via-primary-100 to-primary-100/0"></div>
                      )}
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-lg leading-8">
                      <p className="text-gray-500">{faq.answer}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
        <section className="px-4 py-16 bg-primary-100 sm:px-6 lg:px-8 sm:py-24">
          <div className="px-4 mx-auto sm:px-6max-w-2xl lg:max-w-4xl lg:px-12">
            <h2 className="text-4xl font-medium text-primary-800">
              Have another question or need help?
            </h2>
            <p className="mt-2 text-xl text-primary-800/70">
              Ask us anything or share your feedback.
            </p>
            <div className="flex mt-8 gap-x-4">
              <ElemButton
                btn="primary"
                href={ROUTES.CONTACT}
                className="space-x-1">
                <IconEmail className="w-6 h-6" />
                <span>Contact us</span>
              </ElemButton>
              <LiveChatWidget
                license={process.env.NEXT_PUBLIC_LIVECHAT_LISCENCE || ''}
                visibility="maximized"
                onNewEvent={handleLiveChatEvent}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Faq;
