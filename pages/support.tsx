import type { NextPage, GetStaticProps } from 'next';
import { ElemButton } from '@/components/elem-button';
import { IconEmail, IconChatBubble } from '@/components/icons';
import { useIntercom } from 'react-use-intercom';
import { ROUTES } from '@/routes';
import { NextSeo } from 'next-seo';
import { LiveChatWidget, EventHandlerPayload } from '@livechat/widget-react';

const Support: NextPage = () => {
  const { show } = useIntercom();

  function handleLiveChatEvent(event: EventHandlerPayload<'onNewEvent'>) {
    console.log('LiveChatWidget.onNewEvent', event);
  }

  return (
    <>
      <NextSeo
        title="AI and Web3 data customer support"
        description="Have a question or need help? Request a company profile, tell us about you, ask us anything, or share any feedback. Our team would love to hear from you!"
      />

      <div className="relative">
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-3xl py-20 sm:py-48">
            <div className="flex items-center justify-center">
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                  Customer Support
                </h1>
                <p className="mt-6 text-xl text-slate-600 sm:text-center">
                  Have a question or need help? Ask us anything or share your
                  feedback.
                </p>
                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <ElemButton
                    btn="primary"
                    href={ROUTES.CONTACT}
                    className="space-x-1">
                    <IconEmail className="h-6 w-6" />
                    <span>Contact us</span>
                  </ElemButton>
                  <LiveChatWidget
                    license={process.env.NEXT_PUBLIC_LIVECHAT_LISCENCE || ''}
                    visibility="maximized"
                    onNewEvent={handleLiveChatEvent}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

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

        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <svg
            className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
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
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Support;
