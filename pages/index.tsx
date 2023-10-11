import Script from 'next/script';
import React, { useState } from 'react';
import { ElemButton } from '@/components/elem-button';
import { IconCheck, IconChevronDownMini } from '@/components/icons';
import { useUser } from '@/context/user-context';
import { FigureConnect } from '@/components/figures';
import { Tab, Transition } from '@headlessui/react';
import { useIntercom } from 'react-use-intercom';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import { ROUTES } from '@/utils/routes';

const Home = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  const { show } = useIntercom();

  const [tabIndex, setTabIndex] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState(0);

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

  const publishersLogos = [
    {
      src: '/images/logos/techcrunch.svg',
      alt: 'TechCrunch',
      link: 'https://techcrunch.com/2023/08/04/edgein-hopes-to-be-a-faster-community-driven-crunchbase-for-web3/',
    },
    {
      src: '/images/logos/killer-startups.svg',
      alt: 'Killer Startups',
      link: 'https://www.killerstartups.com/news/edgein-the-crunchbase-for-web3',
    },
    {
      src: '/images/logos/ubergizmo.png',
      alt: 'Ubergizmo',
      link: 'https://www.ubergizmo.com/2023/01/edgein-affordable-web3-data-platform-with-shared-c-revenue-model/ ',
    },
  ];

  const whyEdgein = [
    {
      title: 'Investor',
      benefits: [
        `Discover and connect with the right Founders easily with EdgeIn’s personalization features.`,
        'Get notified of team, investment and traction data with dynamic list updates.',
        'Get a personalized view of the entire marketplace from companies to competing investors to events and news, keeping you one step ahead.',
      ],
    },
    {
      title: 'Founder',
      benefits: [
        'Discover and connect with the right local and international VCs based on tags and latest investment data.',
        'Find early alpha customers directly or track competitors with public or self created lists that are updated dynamically.',
        'Stay up-to-date with a personalized view of the entire marketplace from companies to investors to industry news and events based on tags and location of interest.',
      ],
    },
    {
      title: 'Sales, Ecosystem, and Business Development',
      benefits: [
        'Find hundreds of direct leads in minutes with social and email data using tags, filters, roles, and target lists.',
        'Communicate directly with the right targets at each company in your target lists with access to their public data.',
        'Coming soon: Import and export lists for the latest data on the companies and people you’re tracking.',
      ],
    },
    {
      title: 'Event/Media Operator',
      benefits: [
        'Find and track competing events and valuable sub-events around your event including organizers, sponsors, and speakers.',
        'Track and discover partners, sponsors and competing event organizers by tags and locations of interest.',
        'Market directly to your sweet spot attendee on or in partnership with EdgeIn.',
      ],
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
      content: `Discover and RSVP for the hottest events in Web3 and AI`,
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

  const testimonials = [
    {
      body: 'EdgeIn provides swift access to valuable real-time company data, allowing me to save time and stay nimble amongst evolving market conditions.',
      author: {
        name: 'Wyatt Khosrowshahi',
        function: 'Investor at Castle Ventures',
        imageUrl: '/images/people/wyatt-khosrowshahi.jpg',
      },
    },
    {
      body: 'As the Web3 and AI industries grow faster and faster, data and market knowledge need to be rebuilt in a way that fits the needs of market participants. EdgeIn provides an important platform that gives every market participant (including investors, companies, event organizers, etc) a fair opportunity and provides easily accessible tools to get and share market knowledge.',
      author: {
        name: 'Dinghan Luo',
        function: 'Managing Director at Capital 6 Eagle',
        imageUrl: '/images/people/dinghan-luo.jpg',
      },
    },
    {
      body: 'EdgeIn is a game-changer for me, providing unparalleled access to curated data for smarter investments.',
      author: {
        name: 'Dylan Hunzeker',
        function: 'Investor at Palm Drive Capital',
        imageUrl: '/images/people/dylan-hunzeker.jpg',
      },
    },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1422 800"
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-100 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        >
          <path fill="url(#pattern1)" d="M-711-400h2844v1600H-711z" />
          <path fill="url(#pattern2)" d="M-711-400h2844v1600H-711z" />
          <path fill="url(#pattern3)" d="M-711-400h2844v1600H-711z" />
          <defs>
            <pattern
              id="pattern1"
              width="260"
              height="260"
              fill="none"
              patternTransform="rotate(30)"
              patternUnits="userSpaceOnUse"
              strokeWidth="4"
            >
              <path d="M32.5 0v260m65-260v260m65-260v260m65-260v260" />
            </pattern>
            <pattern
              id="pattern2"
              width="260"
              height="260"
              fill="none"
              patternTransform="rotate(30)"
              patternUnits="userSpaceOnUse"
              strokeWidth="2.2"
            >
              <path d="M65 0v260M195 0v260" />
            </pattern>
            <pattern
              id="pattern3"
              width="260"
              height="260"
              fill="none"
              patternTransform="rotate(115)"
              patternUnits="userSpaceOnUse"
              strokeWidth="1.2"
            >
              <path d="M32.5 0v260m65-260v260m65-260v260m65-260v260" />
            </pattern>
          </defs>
        </svg>

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:items-center lg:px-8 lg:py-16">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
            <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">
              Web3 business data and knowledge.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-500">
              Connect to builders from 100k Web3 organizations; Companies,
              Investors, Events, and Media to people, updated daily.
            </p>
            <div className="mt-6 flex items-start gap-x-6">
              <ElemButton
                onClick={() => router.push(ROUTES.COMPANIES())}
                btn="primary"
                arrow
                size="md"
              >
                Access now
              </ElemButton>
            </div>
            <p className="mt-4 text-gray-500">
              <strong>EdgeIn is free to try</strong> for as long as you’d like
            </p>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="relative -m-2 rounded-xl">
                <div
                  className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl opacity-10"
                  aria-hidden="true"
                >
                  <div className="relative h-[500px] w-full bg-gradient-to-tr from-primary-500 via-[#FE33D0] to-[#F8DA4B]"></div>
                </div>
                <img
                  src="/images/features/hero2.png"
                  alt="Web3 and AI data intelligence"
                  className="w-[60rem] rounded-lg shadow-xl shadow-primary-800/10 ring-1 ring-gray-200"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-100">
        <section className="mx-auto max-w-7xl lg:px-6 pt-16 pb-8">
          <div className="text-left lg:text-center px-6 lg:px-0">
            <h2 className="text-3xl font-bold sm:text-4xl pb-8">
              Why use EdgeIn
            </h2>
          </div>

          <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
            <Tab.List className="scrollbar-hide overflow-x-scroll flex shrink-0 gap-4 px-6 transition-all lg:justify-center">
              {whyEdgein.map((item: any, index: number) => {
                const { title } = item;
                return (
                  <Tab
                    className={({ selected }) =>
                      `${
                        selected
                          ? 'text-white bg-primary-500 border-primary-500'
                          : ' border-gray-300 hover:border-gray-900'
                      }  whitespace-nowrap flex border-box rounded-4xl border px-4 py-2.5 font-medium text-sm outline-none transition-all`
                    }
                    key={index}
                  >
                    {title}
                  </Tab>
                );
              })}
            </Tab.List>

            <div className="mt-6 mx-4 p-6 border border-gray-300 rounded-xl lg:mx-0 lg:flex lg:items-center lg:gap-x-24">
              <Tab.Panels className="w-full max-w-md mx-auto lg:mx-0">
                {whyEdgein.map((item: any, index: number) => {
                  const { title, benefits } = item;
                  return (
                    <Tab.Panel className="w-full" key={index}>
                      <h3 className="font-medium text-xl sm:text-2xl">
                        {title}
                      </h3>
                      <ul className="mt-4 flex flex-col space-y-4">
                        {benefits.map((benefit: any, ii: number) => {
                          return (
                            <li className="flex items-start" key={ii}>
                              <IconCheck className="w-6 h-6 shrink-0 mr-2 text-primary-500 " />{' '}
                              {benefit}
                            </li>
                          );
                        })}
                      </ul>
                      <div className="mt-6 flex items-start gap-x-6">
                        <ElemButton
                          onClick={() => router.push(ROUTES.COMPANIES())}
                          btn="primary"
                          arrow
                          size="md"
                        >
                          Access now
                        </ElemButton>
                      </div>
                    </Tab.Panel>
                  );
                })}
              </Tab.Panels>

              <FigureConnect className="h-auto w-full mx-auto max-w-md mt-8 lg:mt-0 lg:max-w-none" />
            </div>
          </Tab.Group>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-8 pb-16 lg:px-6">
          <h2 className="mx-auto max-w-lg text-center text-lg">
            Trusted by leading companies around the world.
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
          <h3 className="mt-8 mx-auto max-w-lg text-center text-lg lg:px-4">
            As seen on:
          </h3>

          <div className="mx-auto mt-3 grid max-w-lg grid-cols-3 sm:grid-cols-3 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:gap-x-10">
            {publishersLogos.map((publisher: any, index: number) => {
              const { src, alt, link, className } = publisher;
              return (
                <a key={index} href={link} target="_blank" rel="noreferrer">
                  <img
                    src={src}
                    alt={alt}
                    className={`col-span-1 max-h-12 w-full object-contain sm:col-span-1 ${
                      className ? className : ''
                    }`}
                  />
                </a>
              );
            })}
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:py-16 lg:px-6">
        <div className="md:grid md:grid-cols-12 md:gap-10">
          <div className="flex flex-col sm:space-y-4 md:col-span-5">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl pb-4">
              Move faster with EdgeIn tools
            </h2>
            {features.map((feature: any, index: number) => {
              const { title, content } = feature;
              return (
                <div
                  key={index}
                  className={`px-4 py-3 border-l-[3px] rounded-r-xl ${
                    selectedFeature === index
                      ? 'transform border-l-primary-500 bg-white'
                      : 'border-gray-200 bg-transparent'
                  }`}
                >
                  <button
                    onClick={() => setSelectedFeature(index)}
                    className={`whitespace-nowrap flex items-center w-full font-medium text-lg transition-all ${
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
            <div className="mt-6 flex items-center">
              <ElemButton
                onClick={() => router.push(ROUTES.COMPANIES())}
                btn="primary"
                arrow
                size="md"
              >
                Access now
              </ElemButton>
            </div>
          </div>

          <div className="mt-4 md:mt-0 md:col-span-7">
            <div className="relative flex items-center rounded-xl bg-white border border-gray-200 overflow-hidden">
              <div className="">
                {(selectedFeature === 1 || selectedFeature === 3) && (
                  <div className="absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-r from-transparent to-white"></div>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-white"></div>

                <img
                  src={features[selectedFeature].src}
                  alt={features[selectedFeature].title}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:pb-16">
        <div className="">
          <div className="mx-auto flow-root max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="-mt-8 sm:-mx-4 sm:text-[0] lg:columns-3">
              {testimonials.map(testimonial => (
                <div
                  key={testimonial.author.function}
                  className="pt-8 sm:inline-block sm:w-full sm:px-4 lg:pt-0"
                >
                  <figure className="rounded-2xl bg-gray-100 p-8 leading-6">
                    <figcaption className="mb-6 flex items-center gap-x-4">
                      <img
                        className="h-10 w-10 rounded-full bg-gray-50"
                        src={testimonial.author.imageUrl}
                        alt=""
                      />
                      <div className="text-sm">
                        <div className="font-medium">
                          {testimonial.author.name}
                        </div>
                        <div className="text-gray-600">{`${testimonial.author.function}`}</div>
                      </div>
                    </figcaption>
                    <blockquote className="text-base text-gray-900">
                      <p>{`“${testimonial.body}”`}</p>
                    </blockquote>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="relative overflow-hidden p-8 sm:px-16 sm:py-24 bg-gradient-to-b from-[#A05FFE] via-primary-500 to-primary-500 text-center">
          <div className=" relative z-10">
            <h2 className="mx-auto text-3xl font-bold tracking-tight text-white sm:text-5xl">
              See all you can accomplish with EdgeIn
            </h2>

            <div className="mt-8 flex flex-col justify-center space-y-6 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
              <ElemButton
                onClick={() => router.push(ROUTES.COMPANIES())}
                btn="default"
                size="md"
                arrow
                className="whitespace-nowrap w-fit mx-auto sm:mx-0"
              >
                Access now
              </ElemButton>
              <ElemButton
                onClick={show}
                btn="ol-white"
                size="md"
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
