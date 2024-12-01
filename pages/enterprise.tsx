import type { NextPage } from 'next';
import React from 'react';
import Image from 'next/image';
import { ElemButton } from '@/components/elem-button';
import {
  FigureBlurredCircle,
  FigureBlurredRectangle,
  FigureDash,
} from '@/components/figures';
import { Transition } from '@headlessui/react';
import { useUser } from '@/context/user-context';
import Builders from '@/public/images/builders.svg';
import People from '@/public/images/people.svg';
import { IconCheck } from '@/components/icons';
import { ROUTES } from '@/routes';
import { ElemLink } from '@/components/elem-link';

const Enterprise = () => {
  const { user } = useUser();

  const partners = [
    {
      title: 'Akkadian',
      image: '/images/akkadian.svg',
      link: `${ROUTES.INVESTORS}/akkadian-ventures/`,
    },
    {
      title: 'Shima',
      image: '/images/shima-capital.png',
      link: `${ROUTES.INVESTORS}/shima-capital/`,
    },
    {
      title: 'Fireblocks',
      image: '/images/fireblocks.svg',
      link: `${ROUTES.COMPANIES}/fireblocks/`,
    },
    {
      title: 'Tokentag',
      image: '/images/tokentag.svg',
      link: `${ROUTES.COMPANIES}/tokentag/`,
    },
    {
      title: '4k',
      image: '/images/4k.svg',
      link: `${ROUTES.COMPANIES}/4k/`,
    },
  ];

  return (
    <>
      <div className="relative overflow-hidden">
        <section className="relative px-4 pt-16 -mb-20 sm:px-6 lg:px-8">
          <FigureBlurredCircle className="absolute -z-10 top-20 -left-72 sm:top-20 sm:-left-64" />
          <FigureBlurredRectangle className="absolute top-0 rotate-45 -z-10 -right-96 sm:top-2/3 sm:right-0" />
          <FigureBlurredRectangle className="absolute hidden rotate-45 -z-10 top-1/3 -right-96 sm:block" />

          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-center sm:text-5xl lg:px-12">
              The exclusive Web3 platform for market intelligence.
            </h1>
            <div className="relative max-w-2xl mx-auto mt-8 -z-10">
              <Transition
                appear={true}
                show={true}
                enter="transition ease-in-out duration-1000 delay-700"
                enterFrom="opacity-0 translate-y-10"
                enterTo="opacity-100 translate-y-0">
                <div className="aspect-video w-full min-h-[1px] rounded-2xl bg-gradient-to-tr from-gray-50/80 to-gray-50/20 border border-slate-200 opacity-100 backdrop-blur-3xl">
                  <FigureDash className="max-w-full mx-3 my-1 aspect-video" />
                </div>
              </Transition>
            </div>
          </div>
        </section>

        <section className="bg-dark-100 border-y border-slate-200">
          <div className="max-w-5xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <div className="block md:w-full md:grid md:grid-cols-2 md:gap-10">
              <div className="flex flex-col items-start lg:flex-row lg:space-x-4">
                <img
                  src={Builders}
                  alt="Builders"
                  className="flex-shrink-0 w-12"
                />
                <div>
                  <h3 className="mt-2 text-2xl font-bold lg:mt-0">
                    Reach 1,000s of builders in Web3 every day.
                  </h3>

                  <ul className="mt-4 text-lg text-slate-600">
                    <li className="flex">
                      <IconCheck
                        className="flex-shrink-0 w-6 h-6 text-primary-500"
                        aria-hidden="true"
                      />
                      <div className="ml-2">
                        Largest database of web3 companies, from alpha to large
                        brands.
                      </div>
                    </li>
                    <li className="flex">
                      <IconCheck
                        className="flex-shrink-0 w-6 h-6 text-primary-500"
                        aria-hidden="true"
                      />
                      <div className="ml-2">
                        Connect with founders, investors and team members.
                      </div>
                    </li>
                    <li className="flex">
                      <IconCheck
                        className="flex-shrink-0 w-6 h-6 text-primary-500"
                        aria-hidden="true"
                      />
                      <div className="ml-2">
                        Filter by location, projects, and industry tags.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col items-start mt-12 sm:mt-0 lg:flex-row lg:space-x-4">
                <img src={People} alt="Builders" className="w-12 shrink-0" />
                <div>
                  <h3 className="mt-2 text-2xl font-bold lg:mt-0">
                    Get curated leads to connect with the right people faster
                    and easier.
                  </h3>
                  <ul className="mt-4 text-lg text-slate-600">
                    <li className="flex">
                      <IconCheck
                        className="flex-shrink-0 w-6 h-6 text-primary-500"
                        aria-hidden="true"
                      />
                      <div className="ml-2">
                        Emails of team members from 43,000+ companies.
                      </div>
                    </li>
                    <li className="flex">
                      <IconCheck
                        className="flex-shrink-0 w-6 h-6 text-primary-500"
                        aria-hidden="true"
                      />
                      <div className="ml-2">Social data for 30,000 people.</div>
                    </li>
                    <li className="flex">
                      <IconCheck
                        className="flex-shrink-0 w-6 h-6 text-primary-500"
                        aria-hidden="true"
                      />
                      <div className="ml-2">
                        Highly engaged Web3 community members.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 relative overflow-hidden rounded-5xl bg-gradient-to-tr from-[#553BE5] to-[#8E7AFE] sm:p-16">
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-3xl font-bold text-white ">
                  Ecosystem plan discounts available for first 15 early
                  partners, until April 1st:
                </h3>
                <p className="text-xl text-gray-100">
                  $4,995, Now $995 for 1 year.
                </p>
                <p className="mt-6 text-xl text-gray-100">
                  *1,000 leads based on initial request.
                </p>
                <p className="text-xl text-gray-100">
                  *100 $15 Contributor accounts 6 months.
                </p>
                <p className="text-xl text-gray-100">
                  *100 $5 Collaborator accounts 12 months.
                </p>
                <p className="mt-6 text-xl text-gray-100">
                  Prices will increase month on month starting April 1st.
                  Starting at $995/year with a limit of 15 per level.
                </p>
                <ElemButton
                  href="https://buy.stripe.com/00gdTG7pWfjM0jSfZ2"
                  target="_blank"
                  arrow
                  size="lg"
                  className="mt-6 text-primary-500 bg-gradient-to-br from-white to-[#D7D0FF] hover:to-white">
                  Get started now
                </ElemButton>
              </div>
              <figure className="absolute -bottom-72 -left-24 w-96 h-96 bg-[#F72784] rounded-full blur-3xl z-0 opacity-70"></figure>
            </div>
          </div>
        </section>

        <section className="">
          <div className="max-w-5xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <h3 className="mt-2 text-2xl font-bold text-center lg:mt-0">
              Current ecosystem partners
            </h3>
            <div className="grid grid-cols-2 gap-10 mt-6 md:w-full sm:grid-cols-5">
              {partners.map((item: any) => (
                <div
                  key={item.title}
                  className="flex items-center justify-center">
                  <ElemLink href={item.link} className="block">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto"
                      />
                    )}
                  </ElemLink>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Enterprise;
