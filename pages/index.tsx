import type { NextPage } from 'next';
import Script from 'next/script';
import React from 'react';
import { ElemButton } from '@/components/elem-button';
import { IconChevronDown, IconCheck } from '@/components/icons';
import { useUser } from '@/context/user-context';
import { FigureCircleDashes } from '@/components/figures';
import Image from 'next/image';
import { Popups } from '@/components/the-navbar';

type Props = {
  setShowPopup: React.Dispatch<React.SetStateAction<Popups>>;
};

const Home: NextPage<Props> = ({ setShowPopup }) => {
  const { user, loading } = useUser();

  return (
    <>
      <section className="relative px-6 lg:px-8 border-b border-slate-300 bg-gradient-to-b from-transparent to-white">
        <div
          className="absolute inset-x-0 top-80 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div className="relative h-[500px] w-full bg-gradient-to-br from-[#F8DA4B] to-[#FE33D0] opacity-20"></div>
        </div>
        <div className="mx-auto max-w-4xl pt-32 pb-20 sm:pt-36 sm:pb-24">
          <div className="mb-6 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm font-bold uppercase leading-6 text-zinc-500">
              Web3 and AI data intelligence.
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Unlock personalized alpha market knowledge.
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-500 sm:text-xl sm:px-8">
              By leveraging powerful AI and personalized human intelligence,
              EdgeIn gathers, refines and tailors the investor, company, event,
              and media data you need to get an edge.
            </p>
            <div className="mt-6">
              {!user && (
                <ElemButton
                  arrow
                  onClick={() => setShowPopup('signup')}
                  btn="primary"
                  size="lg"
                >
                  Start for free
                </ElemButton>
              )}
              <p className="mt-2 italic text-xs text-zinc-500">
                *no credit card required
              </p>
            </div>
          </div>
        </div>
        <div className="relative -mb-12 z-0 mx-auto max-w-4xl">
          <div className="mt-10 mx-0 sm:mx-20 flex flex-col justify-center lg:mt-0 lg:mx-0">
            <div className="bg-white h-[500px] w-full rounded-xl shadow-xl"></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-24 pb-20 lg:px-8">
        <h2 className="mx-auto max-w-lg text-center text-lg text-zinc-500 leading-8 lg:px-4">
          The most innovative companies are already using EdgeIn to find
          superior data and context.
        </h2>
        <div className="mt-10 grid grid-cols-3 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-7">
          <Image
            src="/images/logos/akkadian.svg"
            alt="Akkadian"
            width={158}
            height={48}
            loading="lazy"
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <Image
            src="/images/logos/capital6-eagle.svg"
            alt="Capital6 Eagle"
            width={158}
            height={48}
            loading="lazy"
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <Image
            src="/images/logos/ankr.svg"
            alt="Ankr"
            width={158}
            height={48}
            loading="lazy"
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <Image
            src="/images/logos/toa-festival.svg"
            alt="TOA Festival"
            width={158}
            height={48}
            loading="lazy"
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <Image
            src="/images/logos/defy-trends.svg"
            alt="DeFy Trends"
            width={158}
            height={48}
            loading="lazy"
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <Image
            src="/images/logos/4k.svg"
            alt="4K"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <Image
            src="/images/logos/wearable-technologies.svg"
            alt="Wearable Technologies"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div>How EdgeIn works</div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div>Empowering the community with better data.</div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden p-8 sm:p-16 bg-gradient-to-b from-[#A05FFE] via-primary-500 to-primary-500  rounded-xl text-center">
          <div className="max-w-xl mx-auto relative z-10">
            <h2 className="text-3xl font-bold text-white sm:text-5xl">
              Explore the biggest Web3 and AI database
            </h2>
            <ul className="mt-8 mx-auto w-fit text-left text-lg text-white grid grid-cols-2 gap-2">
              <li className="flex items-start sm:items-center col-span-2 lg:col-span-1">
                <IconCheck className="w-6 h-6 mr-2" /> Real-time Web3 and AI
                data
              </li>
              <li className="flex items-start sm:items-center col-span-2 lg:col-span-1">
                <IconCheck className="w-6 h-6 mr-2" /> Unlimited search
              </li>
              <li className="flex items-start sm:items-center col-span-2 lg:col-span-1">
                <IconCheck className="w-6 h-6 mr-2" /> Personalized insights
              </li>
              <li className="flex items-start sm:items-center col-span-2 lg:col-span-1">
                <IconCheck className="w-6 h-6 mr-2" /> Community pricing
              </li>
              <li className="flex items-start sm:items-center col-span-2 lg:col-span-1">
                <IconCheck className="w-6 h-6 mr-2" /> Custom lists, notes and
                groups
              </li>
            </ul>

            <div className="mt-8 flex justify-center space-x-6">
              <ElemButton
                onClick={() => setShowPopup('signup')}
                btn="secondary"
                arrow
                className="whitespace-nowrap"
              >
                Start for free
              </ElemButton>
              <ElemButton
                onClick={() => setShowPopup('signup')}
                btn="ol-white"
                className="whitespace-nowrap"
              >
                Talk to us
              </ElemButton>
            </div>
          </div>
          <figure className="absolute bottom-16 -left-36 w-72 h-72 bg-primary-400 rounded-full blur-3xl opacity-100"></figure>
          <figure className="absolute -bottom-28 -left-36 w-72 h-72 bg-amber-300 rounded-full blur-3xl opacity-60"></figure>
          <figure className="absolute left-1/2 -translate-x-1/2 -bottom-64 w-96 h-96 bg-primary-400 rounded-full blur-3xl opacity-80"></figure>
          <figure className="absolute -bottom-64 -right-36 w-96 h-96 bg-primary-400 rounded-full blur-3xl opacity-100"></figure>
        </div>
      </section>

      <Script
        strategy="lazyOnload"
        src="https://s.opensend.com/os.min.js"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore:next-line
        osid="X6L7L49B"
        ostyp="6311ae17"
        async
      />
    </>
  );
};

export default Home;
