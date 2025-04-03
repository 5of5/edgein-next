import React, { useState } from 'react';
import { FigureBlurredCircle } from '@/components/figures';
import Image from 'next/image';
// import { useIntercom } from 'react-use-intercom';
import { usePopup } from '@/context/popup-context';
import { ElemLink } from '@/components/elem-link';
import { ROUTES } from '@/routes';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { LiveChatWidget, EventHandlerPayload } from '@livechat/widget-react';

type Props = {};

const Custom404: NextPage<Props> = () => {
  // const { show } = useIntercom();

  const { setShowPopup } = usePopup();

  function handleLiveChatEvent(event: EventHandlerPayload<'onNewEvent'>) {
    console.log('LiveChatWidget.onNewEvent', event);
  }

  const [show, setShow] = useState<boolean>(false);
  const showNewMessages = () => {
    setShow(true);
  };

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
        title="404 Page not found"
        description="Sorry, but the page you were looking for could not be found. You can use the search bar, return to our front page, or drop us a line to find what you’re looking for."
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
              Page not found!
            </h1>
            <p className="mt-6 text-xl leading-relaxed font-display text-slate-600">
              Sorry, but the page you were looking for could not be found.
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
              , return to our{' '}
              <ElemLink
                href={ROUTES.ROOT}
                className="font-bold text-primary-500">
                front page
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

export default Custom404;
