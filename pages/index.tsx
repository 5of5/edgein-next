import Script from 'next/script';
import React, { useState } from 'react';
import { ElemButton } from '@/components/elem-button';
import {
  IconCheck,
  IconChevronDownMini,
  IconArrowRight,
} from '@/components/icons';
import { useUser } from '@/context/user-context';
import { FigureConnect } from '@/components/figures';
import { Tab, Transition } from '@headlessui/react';
import { useIntercom } from 'react-use-intercom';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import { ROUTES } from '@/routes';
import { ElemLink } from '@/components/elem-link';
import SubNavbar from './sub_navbar';

const Home = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  const { show } = useIntercom();

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
      body: 'Mentibus provides swift access to valuable real-time company data, allowing me to save time and stay nimble amongst evolving market conditions.',
      author: {
        name: 'Wyatt Khosrowshahi',
        function: 'Investor at Castle Ventures',
        imageUrl: '/images/people/wyatt-khosrowshahi.jpg',
      },
    },
    {
      body: 'As the Web3 and AI industries grow faster and faster, data and market knowledge need to be rebuilt in a way that fits the needs of market participants. Mentibus provides an important platform that gives every market participant (including investors, companies, event organizers, etc) a fair opportunity and provides easily accessible tools to get and share market knowledge.',
      author: {
        name: 'Dinghan Luo',
        function: 'Managing Director at Capital 6 Eagle',
        imageUrl: '/images/people/dinghan-luo.jpg',
      },
    },
    {
      body: 'Mentibus is a game-changer for me, providing unparalleled access to curated data for smarter investments.',
      author: {
        name: 'Dylan Hunzeker',
        function: 'Investor at Palm Drive Capital',
        imageUrl: '/images/people/dylan-hunzeker.jpg',
      },
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden isolate bg-black min-h-[60vh] flex items-center">
        <div className="px-6 py-10 mx-auto max-w-7xl sm:py-16 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
          <h1 className="mt-10 text-4xl font-bold tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent [-webkit-background-clip:text] sm:text-6xl">
              Web3 business data and knowledge.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              Connect to builders from 100k Web3 organizations; Companies,
              Investors, Events, and Media to people, updated daily.
            </p>
            <div className="flex items-center justify-center mt-6 gap-x-6">
              <ElemButton
                onClick={() => router.push(ROUTES.COMPANIES)}
                btn="white"
                size="md">
                Get access now
              </ElemButton>
            </div>
            <p className="mt-4 text-gray-400">
             
            </p>
          </div>
          <div className="flex max-w-2xl mx-auto mt-16 sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="flex-none max-w-3xl sm:max-w-5xl lg:max-w-none">
              <div className="relative -m-2 rounded-xl">
                <div
                  className="absolute inset-x-0 bottom-0 overflow-hidden -z-10 transform-gpu blur-3xl opacity-10"
                  aria-hidden="true">
                  <div className="relative h-[500px] w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="bg-black">
        <section className="pt-16 pb-8 mx-auto max-w-7xl lg:px-6">
          <div className="px-6 text-left lg:text-center lg:px-0">
            <h2 className="pb-8 text-3xl font-bold text-white sm:text-4xl">
              Trusted by leading companies around the world.
            </h2>
          </div>

          <div className="grid items-center grid-cols-4 mt-10 gap-x-8 gap-y-10 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-7 text-gray-500">
            {logos.map((organization: any, index: number) => {
              const { src, alt, className } = organization;
              return (
                <img
                  key={index}
                  src={src}
                  alt={alt}
                  className={`col-span-2 max-h-12 w-full object-contain sm:col-span-1 brightness-0 invert ${
                    className ? className : ''
                  }`}
                />
              );
            })}
          </div>
          <h3 className="max-w-lg mx-auto mt-8 text-lg text-center lg:px-4 text-gray-500">
            As seen on:
          </h3>

          <div className="grid items-center max-w-lg grid-cols-3 mx-auto mt-3 sm:grid-cols-3 gap-x-8 gap-y-10 sm:max-w-xl sm:gap-x-10 text-gray-500">
            {publishersLogos.map((publisher: any, index: number) => {
              const { src, alt, link, className } = publisher;
              return (
                <a key={index} href={link} target="_blank" rel="noreferrer">
                  <img
                    src={src}
                    alt={alt}
                    className={`col-span-1 max-h-12 w-full object-contain sm:col-span-1 brightness-0 invert ${
                      className ? className : ''
                    }`}
                  />
                </a>
              );
            })}
          </div>
        </section>
      </div> */}

      <div>
        <SubNavbar />
      </div>

      <section className="pt-4 pb-8 mx-auto max-w-7xl lg:px-8 lg:pb-16 bg-black">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {testimonials.map(testimonial => (
              <div key={testimonial.author.function} className="sm:w-full">
                <figure className="p-8 leading-6 bg-neutral-900 rounded-2xl">
                  <figcaption className="flex items-center mb-6 gap-x-4">
                    <img
                      className="w-10 h-10 rounded-full bg-gray-50"
                      src={testimonial.author.imageUrl}
                      alt=""
                    />
                    <div className="text-sm">
                      <div className="font-medium text-white">
                        {testimonial.author.name}
                      </div>
                      <div className="text-gray-400">{`${testimonial.author.function}`}</div>
                    </div>
                  </figcaption>
                  <blockquote className="text-base text-white">
                    <p>{`"${testimonial.body}"`}</p>
                  </blockquote>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-8 mx-auto max-w-7xl lg:px-8 lg:pb-16">
        <div className="relative overflow-hidden rounded-3xl p-8 sm:px-16 sm:py-32 bg-gradient-to-b from-[#A05FFE] via-primary-500 to-primary-500 sm:rounded-[4.6rem]">
          <div className="relative z-10">
            <h2>
              <ElemLink
                href={ROUTES.COMPANIES}
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                See all you can accomplish with Mentibus.
              </ElemLink>
            </h2>

            <div className="flex items-center mt-16 space-x-2 sm:space-x-6 sm:mt-20">
              <ElemButton
                onClick={() => router.push(ROUTES.COMPANIES)}
                btn="default"
                size="lg"
                arrow
                className="mx-auto whitespace-nowrap w-fit sm:mx-0">
                Access now
              </ElemButton>
              <ElemButton
                onClick={show}
                btn="ol-white"
                size="lg"
                className="mx-auto whitespace-nowrap w-fit sm:mx-0">
                Talk to us
              </ElemButton>
            </div>
          </div>
          <figure className="absolute rounded-full opacity-100 bottom-16 -left-36 w-72 h-72 bg-primary-400 blur-3xl"></figure>
          <figure className="absolute rounded-full -bottom-28 -left-36 w-72 h-72 bg-amber-300 blur-3xl opacity-60"></figure>
          <figure className="absolute -translate-x-1/2 rounded-full left-1/2 -bottom-64 w-96 h-96 bg-primary-400 blur-3xl opacity-80"></figure>
          <figure className="absolute rounded-full opacity-100 -bottom-64 -right-36 w-96 h-96 bg-primary-400 blur-3xl"></figure>
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
