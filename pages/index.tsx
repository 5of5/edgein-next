import Script from 'next/script';
import React, { useState } from 'react';
import { ElemButton } from '@/components/elem-button';
import { IconCheck, IconChevronDownMini } from '@/components/icons';
import { useUser } from '@/context/user-context';
import { FigureConnect } from '@/components/figures';
import { Tab, Transition } from '@headlessui/react';
import { useIntercom } from 'react-use-intercom';
import parse from 'html-react-parser';
import { usePopup } from '@/context/popup-context';

const Home = () => {
  const { user, loading } = useUser();

  const { setShowPopup } = usePopup();

  const { show } = useIntercom();

  const [tabIndex, setTabIndex] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [selectedFeature2, setSelectedFeature2] = useState(0);

  const highlights = [
    {
      text: 'Custom notes',
      className: 'hidden lg:block -top-4 left-20',
    },
    {
      text: 'Custom groups',
      className: 'hidden lg:block top-28 -left-32',
    },
    {
      text: 'Custom lists',
      className: 'hidden lg:block top-1/2 -left-28',
    },
    {
      text: 'Advanced filters',
      className: '-top-4 left-[20px] lg:-top-6 lg:left-auto lg:right-56',
    },
    {
      text: 'Unlimited search',
      className: 'hidden lg:block top-4 -right-8',
    },
    {
      text: 'Personalized insights',
      className:
        'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:translate-x-0 lg:translate-y-0 lg:top-56 lg:-right-24',
    },
    {
      text: 'Real-time data',
      className: '-bottom-4 right-[20px] lg:bottom-16 lg:-right-20',
    },
  ];

  const logos = [
    {
      src: '/images/logos/akkadian.svg',
      alt: 'Akkadian',
    },
    {
      src: '/images/logos/capital6-eagle.svg',
      alt: 'Capital6 Eagle',
    },
    {
      src: '/images/logos/ankr.svg',
      alt: 'Ankr',
    },
    {
      src: '/images/logos/toa-festival.svg',
      alt: 'TOA Festival',
    },
    {
      src: '/images/logos/defy-trends.svg',
      alt: 'DeFy Trends',
    },
    {
      src: '/images/logos/4k.svg',
      alt: '4K',
    },
    {
      src: '/images/logos/wearable-technologies.svg',
      alt: 'Wearable Technologies',
      className: 'hidden sm:block',
    },
  ];

  const features = [
    {
      title: 'Lists',
      content:
        'Create your own lists for competitive research, due diligence, portfolio management and more.',
      src: '/images/features/lists.png',
    },
    {
      title: 'Filters',
      content:
        'Filter by location, projects, team size, investment total, and industry tags.',
      src: '/images/features/filters.png',
    },
    {
      title: 'Groups',
      content:
        'Create Groups with your team, friends or anyone you want to compare notes with, share insights, track leads and more.',
      src: '/images/features/groups.png',
    },
    {
      title: 'Notes',
      content:
        'Make notes on companies and investors you’re following. Choose to keep them private or share them in your groups.',
      src: '/images/features/notes.png',
    },
    {
      title: 'Search',
      content:
        'Advanced search utilizes our intelligent tagging system to interpret user intent and compare it against the tagged attributes of the items in our database.',
      src: '/images/features/search.png',
    },
  ];

  const features2 = [
    {
      title: 'Companies',
      content:
        'Browse recently discovered projects and trending companies or use advanced filtering to search based on your interests and investment thesis.',
      src: '/images/features/companies.png',
    },
    {
      title: 'Investors',
      content:
        'Search for relevant investors based on tags, find out who is currently deploying capital and react to recent deals or funds.',
      src: '/images/features/investors.png',
    },
    {
      title: 'Events',
      content: `Discover and RSVP for the hottest events in Web3 and AI <div className="inline-block shrink-0 bg-slate-200 text-xs font-bold leading-sm uppercase px-3 py-1 rounded-full">Coming soon</div>`,
      src: '/images/features/events.png',
    },
    {
      title: 'News',
      content: 'Get personalized news from our exclusive media partners.',
      src: '/images/features/news.png',
    },
    {
      title: 'Notifications',
      content:
        'Get real-time notifications on companies, funds, investments, events and news.',
      src: '/images/features/notifications.png',
    },
  ];

  const ctaBenefits = [
    {
      text: 'Real-time Web3 and AI data',
    },
    {
      text: 'Personalized, actionable insights',
    },
    {
      text: 'Custom lists, notes and groups',
    },
    {
      text: 'Unlimited, advanced search',
    },
    // {
    //   text: 'Community data model',
    // },
  ];

  return (
    <>
      <section className="relative px-2 lg:px-6 border-b border-slate-300 bg-gradient-to-b from-transparent to-white">
        <div
          className="absolute inset-x-0 bottom-16 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div className="relative h-[500px] w-full bg-gradient-to-br from-[#F8DA4B] to-[#FE33D0] opacity-50"></div>
        </div>
        <div className="mx-auto max-w-4xl pt-20 pb-8 sm:py-36">
          {/* <div className="mb-6 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm font-bold uppercase leading-6 text-zinc-500">
              Web3 and AI data intelligence.
            </div>
          </div> */}
          <div className="text-center px-2">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Web3 and AI data intelligence.
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-500 sm:text-xl sm:px-8">
              EdgeIn leverages the power of AI and personalized human
              intelligence to gather, refine, and deliver the investor, company,
              event and news data you need to get an edge.
            </p>

            <div className="mt-6">
              <ElemButton
                arrow
                onClick={() => setShowPopup('signup')}
                btn="primary"
                size="lg"
              >
                Start for free
              </ElemButton>

              <p className="mt-2 italic text-xs text-zinc-500">
                *no credit card required
              </p>
            </div>
          </div>
        </div>
        <div className="relative -mb-12 z-0 mx-auto max-w-4xl">
          <div className="relative mt-10 mx-0 sm:mx-20 flex flex-col justify-center lg:mt-0 lg:mx-0">
            {highlights.map((highlight: any, index: number) => {
              const { text, className } = highlight;
              return (
                <div
                  key={index}
                  className={`absolute w-fit px-4 py-1.5 rounded-full whitespace-nowrap bg-gradient-to-b from-white to-primary-100 font-bold shadow-xl lg:block ${
                    className ? className : ''
                  }`}
                >
                  {text}
                </div>
              );
            })}

            <div className="bg-white w-full rounded-md lg:rounded-xl shadow-xl shadow-primary-800/10 overflow-hidden">
              <img
                src="/images/features/hero.png"
                alt="Web3 and AI data intelligence"
                className={`w-full object-contain`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-2 pt-24 pb-20 lg:px-6">
        <h2 className="mx-auto max-w-lg text-center text-lg text-zinc-500 lg:px-4">
          Leading companies around the world are using EdgeIn to find superior
          data and context.
        </h2>
        <div className="mt-10 grid grid-cols-4 items-center gap-x-8 gap-y-10 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-7">
          {logos.map((organization: any, index: number) => {
            const { src, alt, className } = organization;
            return (
              <img
                key={index}
                src={src}
                alt={alt}
                className={`col-span-2 max-h-12 w-full object-contain sm:col-span-1 ${
                  className ? className : ''
                }`}
              />
            );
          })}
        </div>
      </section>

      <section className="relative">
        <h2 className="text-3xl text-center text-white font-bold tracking-tight py-8 sm:py-16 sm:text-5xl">
          How EdgeIn works
        </h2>
        <div className="absolute top-0 left-0 right-0 h-[28rem] bg-gradient-to-b from-primary-400 via-primary-500 to-primary-500 -z-10"></div>

        <div className="mx-auto max-w-7xl px-2 lg:px-6">
          <div className="bg-gray-50 rounded-xl px-4 py-6 lg:p-14">
            {/* Features Section 1 */}
            <div className="md:grid md:grid-cols-12 md:gap-16">
              <div className="flex flex-col sm:space-y-4 md:col-span-5">
                {features.map((feature: any, index: number) => {
                  const { title, content } = feature;
                  return (
                    <div
                      key={index}
                      className={`px-4 py-3 border-l-[3px] rounded-r-xl ${
                        selectedFeature === index
                          ? 'transform border-l-primary-500 bg-white'
                          : 'border-transparent bg-transparent'
                      }`}
                    >
                      <button
                        onClick={() => setSelectedFeature(index)}
                        className={`whitespace-nowrap flex items-center w-full font-bold text-lg transition-all ${
                          selectedFeature === index
                            ? 'text-primary-500'
                            : 'hover:text-primary-500'
                        }`}
                      >
                        {title}
                        <IconChevronDownMini
                          className={`h-5 w-5 transition-all ease-in-out duration-100 ${
                            selectedFeature === index
                              ? 'transform text-primary-500 rotate-180'
                              : ''
                          }`}
                        />
                      </button>
                      <Transition
                        show={selectedFeature === index}
                        className="overflow-hidden"
                        enter="transition-all ease-in-out duration-100"
                        enterFrom="transform max-h-0"
                        enterTo="transform max-h-fit"
                        leave="transition-all ease-in-out duration-100"
                        leaveFrom="transform max-h-fit"
                        leaveTo="transform max-h-0"
                      >
                        <div className="pt-1">{parse(content)}</div>
                      </Transition>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 md:mt-0 md:col-span-7">
                <div className="relative flex items-center rounded-xl overflow-hidden">
                  <div className="bg-primary-500/10">
                    {(selectedFeature === 1 || selectedFeature === 3) && (
                      <div className="absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-r from-transparent to-[#E5E3F7]"></div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-[#E5E3F7]"></div>

                    <img
                      src={features[selectedFeature].src}
                      alt={features[selectedFeature].title}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section 2 */}
            <div className="mt-20 md:grid md:grid-cols-12 md:gap-16">
              <div className="flex flex-col sm:space-y-4 md:col-span-5 md:order-last">
                {features2.map((feature: any, index: number) => {
                  const { title, content } = feature;
                  return (
                    <div
                      key={index}
                      className={`px-4 py-3 border-l-[3px] rounded-r-xl ${
                        selectedFeature2 === index
                          ? 'transform border-l-primary-500 bg-white'
                          : 'border-transparent bg-transparent'
                      }`}
                    >
                      <button
                        onClick={() => setSelectedFeature2(index)}
                        className={`whitespace-nowrap flex items-center w-full font-bold text-lg transition-all ${
                          selectedFeature2 === index
                            ? 'text-primary-500'
                            : 'hover:text-primary-500'
                        }`}
                      >
                        {title}
                        <IconChevronDownMini
                          className={`h-5 w-5 transition-all ease-in-out duration-100 ${
                            selectedFeature2 === index
                              ? 'transform text-primary-500 rotate-180'
                              : ''
                          }`}
                        />
                      </button>
                      <Transition
                        show={selectedFeature2 === index}
                        className="overflow-hidden"
                        enter="transition-all ease-in-out duration-100"
                        enterFrom="transform max-h-0"
                        enterTo="transform max-h-fit"
                        leave="transition-all ease-in-out duration-100"
                        leaveFrom="transform max-h-fit"
                        leaveTo="transform max-h-0"
                      >
                        <div className="pt-1">{parse(content)}</div>
                      </Transition>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 md:mt-0 md:col-span-7">
                <div className="relative flex items-center rounded-xl overflow-hidden">
                  <div className="bg-primary-500/10">
                    <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-[#E5E3F7]"></div>

                    <img
                      src={features2[selectedFeature2].src}
                      alt={features2[selectedFeature2].title}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="mx-auto max-w-2xl text-left lg:text-center pt-24 pb-16 px-6 lg:px-0">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Empowering the community with better data.
          </h2>
          <p className="mt-6 text-zinc-500 sm:text-lg sm:px-6">
            EdgeIn is the largest, community-driven data platform built
            exclusively for teams, investors, event organizers, and media in
            Web3 and AI.
          </p>
        </div>

        <div className="mx-auto max-w-7xl lg:px-6">
          <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
            <Tab.List className="scrollbar-hide overflow-x-scroll pb-px flex shrink-0 gap-x-6 px-6 font-bold text-lg border-b border-black/10 transition-all sm:justify-center">
              <Tab
                className={({ selected }) =>
                  `${
                    selected
                      ? 'text-primary-500 border-primary-500'
                      : ' border-transparent hover:text-primary-500'
                  }  whitespace-nowrap flex -mb-px border-box py-2 outline-none border-b transition-all`
                }
              >
                For Investors
              </Tab>
              <Tab
                className={({ selected }) =>
                  `${
                    selected
                      ? 'text-primary-500 border-primary-500'
                      : ' border-transparent hover:text-primary-500'
                  }  whitespace-nowrap flex -mb-px py-2 outline-none border-b transition-all`
                }
              >
                For Teams
              </Tab>
              <Tab
                className={({ selected }) =>
                  `${
                    selected
                      ? 'text-primary-500 border-primary-500'
                      : ' border-transparent hover:text-primary-500'
                  }  whitespace-nowrap flex -mb-px py-2 outline-none border-b transition-all`
                }
              >
                For Event Organizers and Media
              </Tab>
            </Tab.List>

            <div className="px-6 py-8 lg:flex lg:items-center lg:px-8 lg:py-16 lg:space-x-24">
              <Tab.Panels className="w-full max-w-md mx-auto lg:mx-0">
                <Tab.Panel className="w-full">
                  <h3 className="font-bold text-xl sm:text-2xl">
                    For Investors
                  </h3>
                  <ul className="mt-4 flex flex-col space-y-4">
                    <li className="flex items-start">
                      <IconCheck className="w-6 h-6 shrink-0 mr-2 text-primary-500 " />{' '}
                      Track your competitors&apos; latest investments and news
                      coverage at a fraction of the cost of Pitchbook and
                      Crunchbase.
                    </li>
                    <li className="flex items-start">
                      <IconCheck className="w-6 h-6 shrink-0 mr-2 text-primary-500" />{' '}
                      Connect with the right Founders looking to raise through
                      our proprietary tagging system.
                    </li>
                    <li className="flex items-start">
                      <IconCheck className="w-6 h-6 shrink-0 mr-2 text-primary-500" />{' '}
                      Explore the industry&apos;s hottest events in Web3 and AI
                      and make connections before the event to make better use
                      of your time at the show.
                    </li>
                  </ul>
                </Tab.Panel>
                <Tab.Panel className="w-full">
                  <h3 className="font-bold text-xl sm:text-2xl">For Teams</h3>
                  <ul className="mt-4 flex flex-col space-y-4">
                    <li className="flex items-start">
                      <IconCheck className="w-6 h-6 shrink-0 mr-2 text-primary-500 " />{' '}
                      Increase your visibility and join the growing EdgeIn
                      community of more than 100K builders in Web3 and AI.
                    </li>
                    <li className="flex items-start">
                      <IconCheck className="w-6 h-6 shrink-0 mr-2 text-primary-500" />{' '}
                      Get key insights into your competitors&apos; latest
                      investment rounds, team comps and recent news coverage.
                    </li>
                    <li className="flex items-start">
                      <IconCheck className="w-6 h-6 shrink-0 mr-2 text-primary-500" />{' '}
                      Source quality leads and increase your deal flow instantly
                      with emails and social data for your specified targets.
                    </li>
                    <li className="flex items-start">
                      <IconCheck className="w-6 h-6 shrink-0 mr-2 text-primary-500" />{' '}
                      Identify the right industry targets at the world’s largest
                      brands in just seconds.
                    </li>
                  </ul>
                </Tab.Panel>
                <Tab.Panel className="w-full">
                  <h3 className="font-bold text-xl sm:text-2xl">
                    For Event Organizers and Media
                  </h3>
                  <ul className="mt-4 flex flex-col space-y-4">
                    <li className="flex items-start">
                      <IconCheck className="w-6 h-6 shrink-0 mr-2 text-primary-500 " />{' '}
                      Partner with EdgeIn to promote your event, sponsors, and
                      speakers to our community - all tagged by role, company,
                      and industry.
                    </li>
                    <li className="flex items-start">
                      <IconCheck className="w-6 h-6 shrink-0 mr-2 text-primary-500" />{' '}
                      Forge strategic relationships with Founders and key SMEs
                      before your event.
                    </li>
                    <li className="flex items-start">
                      <IconCheck className="w-6 h-6 shrink-0 mr-2 text-primary-500" />{' '}
                      Identify thought leaders, content contributors, and
                      sources directly on our platform.
                    </li>
                  </ul>
                </Tab.Panel>
              </Tab.Panels>

              <FigureConnect className="h-auto w-full mx-auto max-w-md mt-8 lg:mt-0 lg:max-w-none" />
            </div>
          </Tab.Group>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 mt-8 lg:mt-20 lg:px-8">
        <div className="relative overflow-hidden p-8 sm:p-16 bg-gradient-to-b from-[#A05FFE] via-primary-500 to-primary-500  rounded-xl text-center">
          <div className=" relative z-10">
            <h2 className="max-w-2xl mx-auto text-3xl font-bold text-white sm:text-5xl">
              Work smarter, not harder
            </h2>
            <ul className="mt-8 mx-auto w-fit text-left text-lg text-white grid grid-cols-2 gap-4">
              {ctaBenefits.map((benefit: any, index: number) => {
                return (
                  <li
                    key={index}
                    className="flex items-start sm:items-center col-span-2 lg:col-span-1"
                  >
                    <IconCheck className="w-6 h-6 mr-2" /> {benefit.text}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col justify-center space-y-6 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
              <ElemButton
                onClick={() => setShowPopup('signup')}
                btn="secondary"
                arrow
                className="whitespace-nowrap w-fit mx-auto sm:mx-0"
              >
                Start for free
              </ElemButton>
              <ElemButton
                onClick={show}
                btn="ol-white"
                className="whitespace-nowrap w-fit mx-auto sm:mx-0"
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
