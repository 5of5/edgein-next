import React, { useEffect, useState } from 'react';
import { FigureBlurredCircle } from '@/components/figures';
import Image from 'next/image';
import { useIntercom } from 'react-use-intercom';
import { usePopup } from '@/context/popup-context';
import { ElemLink } from '@/components/elem-link';
import { ROUTES } from '@/routes';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useUser } from '@/context/user-context';
import { useRouter } from 'next/router';
import { LiveChatWidget, EventHandlerPayload } from '@livechat/widget-react';

type Props = {};

const VerifyFail: NextPage<Props> = () => {
  const router = useRouter();
  // const { show } = useIntercom();
  const { user } = useUser();
  const [show, setShow] = useState<boolean>(false);

  function handleLiveChatEvent(event: EventHandlerPayload<'onNewEvent'>) {
    console.log('LiveChatWidget.onNewEvent', event);
  }
  const showNewMessages = () => {
    setShow(true);
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const verifyUser = async () => {
      if (!user?.id) {
        console.error('User ID is not available.');
        return;
      }

      try {
        await delay(2000);
        router.push(ROUTES.REFERRALS_AND_POINTS);
      } catch (err) {
        console.error('Error during mutation:', err);
      }
    };
    verifyUser();
  }, [router, user]);

  const { setShowPopup } = usePopup();

  return (
    <>
      {show && (
        <LiveChatWidget
          license={process.env.NEXT_PUBLIC_LIVECHAT_LISCENCE || ''}
          visibility="maximized"
          onNewEvent={handleLiveChatEvent}
        />
      )}
      <NextSeo
        title="Verification Successful"
        description="Your profile has been successfully verified and is now ready to be
              claimed!"
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

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-52">
          <div className="max-w-2xl mx-auto lg:max-w-3xl lg:px-12">
            <h1 className="text-4xl font-bold tracking-tight font-display sm:text-5xl">
              Verification Successful! 🎉 Welcome back!
            </h1>
            <p className="mt-6 text-xl leading-relaxed font-display text-slate-600">
              Your profile has been successfully verified and is now ready to be
              claimed!
            </p>
            <p className="mt-6 text-lg leading-relaxed font-display text-slate-600">
              You can use the{' '}
              <button
                className="font-bold text-primary-500 focus:outline-0"
                onClick={() => {
                  setShowPopup('search');
                }}>
                search bar
              </button>
              , return to{' '}
              <ElemLink
                href={ROUTES.REFERRALS_AND_POINTS}
                className="font-bold text-primary-500">
                claiming your profile
              </ElemLink>
              , or{' '}
              <button
                className="font-bold text-primary-500 focus:outline-0"
                onClick={showNewMessages}>
                drop us a line
              </button>{' '}
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

export default VerifyFail;
