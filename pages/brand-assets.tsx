import type { NextPage } from 'next';
import React from 'react';
import { ElemButton } from '@/components/elem-button';
import { ElemLogo } from '@/components/elem-logo';
import { FigureBlurredCircle } from '@/components/figures';
import { IconCheck } from '@/components/icons';
import Image from 'next/image';

type Props = {};

const LogoMonotone: React.FC<any> = ({ className, mode = 'logo' }) => {
  const customView = mode === 'logo' ? '0 0 143 31' : '0 0 43 28';
  return (
    <svg
      viewBox={customView}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <path d="M63.6121 24.7389V20.7459H53.0705V15.8904H63.3885V11.8973H53.0705V7.42515H63.6121V3.43213H48.5344V24.7389H63.6121Z" />
      <path d="M81.1177 24.7389V3.43213H77.0289V11.2904C75.815 9.69319 74.09 8.92653 72.2692 8.92653C68.3401 8.92653 65.4331 11.9932 65.4331 17.0084C65.4331 22.1834 68.404 25.1222 72.2692 25.1222C74.1539 25.1222 75.815 24.2917 77.0289 22.7584V24.7389H81.1177ZM73.547 21.5125C71.215 21.5125 69.6178 19.6917 69.6178 17.0084C69.6178 14.357 71.215 12.5362 73.547 12.5362C74.8886 12.5362 76.358 13.2709 77.0289 14.2931V19.7556C76.358 20.7778 74.8886 21.5125 73.547 21.5125Z" />
      <path d="M90.8268 31C94.6281 31 99.1642 29.5625 99.1642 23.7167V9.30986H95.1073V11.2904C93.8615 9.69319 92.1684 8.92653 90.3157 8.92653C86.4185 8.92653 83.5115 11.7376 83.5115 16.7848C83.5115 21.9278 86.4824 24.6111 90.3157 24.6111C92.2323 24.6111 93.8934 23.7486 95.1073 22.2153V23.7167C95.1073 26.8472 92.7754 27.6778 90.8268 27.6778C88.9101 27.6778 87.249 27.1347 86.0032 25.7931L84.1824 28.7C86.131 30.393 88.2073 31 90.8268 31ZM91.6254 21.0334C89.2934 21.0334 87.6962 19.4362 87.6962 16.7848C87.6962 14.1334 89.2934 12.5362 91.6254 12.5362C92.9351 12.5362 94.4045 13.2709 95.1073 14.2612V19.2764C94.4045 20.2667 92.9351 21.0334 91.6254 21.0334Z" />
      <path d="M109.8 25.1222C112.196 25.1222 114.624 24.3875 116.157 22.982L114.336 20.2987C113.346 21.257 111.557 21.8 110.248 21.8C107.628 21.8 106.095 20.2348 105.807 18.3501H117.275V17.3917C117.275 12.3765 114.177 8.92653 109.545 8.92653C104.881 8.92653 101.559 12.5362 101.559 17.0084C101.559 21.9598 105.105 25.1222 109.8 25.1222ZM113.378 15.539H105.775C105.935 14.0057 107.021 12.2487 109.545 12.2487C112.228 12.2487 113.25 14.0695 113.378 15.539Z" />
      <path d="M124.199 24.7389V3.43213H119.663V24.7389H124.199Z" />
      <path d="M142.196 24.7389V13.8459C142.196 10.8432 140.567 8.92653 137.149 8.92653C134.658 8.92653 132.741 10.1404 131.751 11.2904V9.30986H127.694V24.7389H131.751V14.3251C132.454 13.4307 133.667 12.5362 135.265 12.5362C136.99 12.5362 138.108 13.2709 138.108 15.4112V24.7389H142.196Z" />
      <path d="M6.25798 0H43.5344L40.0299 7.25356H2.75351L6.25798 0Z" />
      <path d="M40.03 21.5733H2.75354L6.258 28.8269H43.5344L40.03 21.5733Z" />
      <path d="M1.75223 10.7655H39.0287L37.2764 14.3923L39.0287 18.0191H1.75223L0 14.3923L1.75223 10.7655Z" />
    </svg>
  );
};

const BrandAssets: NextPage<Props> = () => {
  const downloadBrandAssets = '/brand/EdgeIn-brand-assets.zip';
  const downloadPrimaryLogo = '/brand/EdgeIn-primary-logo.zip';
  const downloadMonotone = '/brand/EdgeIn-monotone.zip';
  const downloadLogomark = '/brand/EdgeIn-logomark.zip';

  return (
    <>
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

        <section className="py-16 px-4 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl mx-auto lg:max-w-3xl text-center lg:px-12">
            <h1 className="font-display text-4xl font-bold tracking-tight sm:px-12 sm:text-6xl">
              EdgeIn brand assets &amp; guidelines
            </h1>
            <p className="mt-6 font-display text-xl leading-relaxed text-slate-600">
              Thanks for your interest in EdgeIn! We have a few guidelines for
              using our brand resources. Please take a moment to familiarize
              yourself with them.
            </p>
            <div className="flex justify-center py-8">
              <ElemButton href={downloadBrandAssets} btn="primary">
                Download all brand assets
              </ElemButton>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white/50 to-transparent py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-prose mx-auto">
            <div>
              <p className="inline text-transparent text-5xl font-bold bg-clip-text bg-gradient-to-r from-blue-800 via-primary-500 to-primary-400">
                01
              </p>
              <h2 className="text-3xl font-bold text-dark-500 mb-4 lg:text-4xl">
                Brand Name
              </h2>
              <p className="font-display text-xl leading-relaxed text-slate-600">
                “EdgeIn” is one word, spelled with a big E and big I.
              </p>
            </div>
          </div>
        </section>
        <section className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-prose mx-auto">
            <p className="inline text-transparent text-5xl font-bold bg-clip-text bg-gradient-to-r from-blue-800 via-primary-500 to-primary-400">
              02
            </p>
            <h2 className="text-3xl font-bold text-dark-500 mb-4 lg:text-4xl">
              Logos &amp; Usage
            </h2>

            <h3 className="mt-8 text-xl font-bold text-dark-500 mb-4 lg:text-2xl">
              Primary Logo
            </h3>
            <p className="font-display text-xl leading-relaxed text-slate-600">
              Our primary logo combines our brandmark, the icon + wordmark.
              Wherever possible, we aim to use the primary logo in full-color.
              The primary logo is the preferred usage for partnerships,
              co-branding, and in media articles.
            </p>
          </div>
          <div className="mt-8 block md:w-full md:grid md:grid-cols-2 gap-8">
            <div className="mt-8 bg-white shadow rounded-lg p-7 lg:mt-0">
              <div className="rounded-lg flex items-center justify-center py-16 bg-gray-50">
                <ElemLogo mode="logo" className="h-10 w-auto" />
              </div>
              <p className="mt-4 font-bold">Primary Logo</p>
              <p className="mt-1 text-slate-600">
                This is the main EdgeIn logo. It should be used in this form
                whenever possible.
              </p>
            </div>
            <div className="mt-8 bg-white shadow rounded-lg p-7 lg:mt-0">
              <div className="rounded-lg flex items-center justify-center py-16 bg-primary-900">
                <ElemLogo mode="logo-inverted" className="h-10 w-auto" />
              </div>
              <p className="mt-4 font-bold">Inverted Primary Logo</p>
              <p className="mt-1 text-slate-600">
                This version features a white wordmark for greater legibility on
                dark or busy backgrounds.
              </p>
            </div>
          </div>
          <div className="flex justify-center py-8">
            <ElemButton href={downloadPrimaryLogo} btn="primary">
              Download Primary Logos
            </ElemButton>
          </div>
          <div className="max-w-prose mx-auto">
            <h3 className="mt-8 text-xl font-bold text-dark-500 mb-4 lg:text-2xl">
              Monotone Logos
            </h3>
            <p className="font-display text-xl leading-relaxed text-slate-600">
              When our primary or full-color logos aren’t an option, use the
              monotone logo that provides the most contrast.
            </p>
            <dl className="mt-4 space-y-6">
              <div className="relative">
                <dt>
                  <IconCheck className="absolute h-6 w-6 text-primary-500" />
                  <p className="ml-9 text-slate-600">
                    When budgets require single color printing.
                  </p>
                </dt>
              </div>
              <div className="relative">
                <dt>
                  <IconCheck className="absolute h-6 w-6 text-primary-500" />
                  <p className="ml-9 text-slate-600">
                    When accurate color representations aren&rsquo;t attainable.
                  </p>
                </dt>
              </div>
              <div className="relative">
                <dt>
                  <IconCheck className="absolute h-6 w-6 text-primary-500" />
                  <p className="ml-9 text-slate-600">
                    On busy or patterned backgrounds.
                  </p>
                </dt>
              </div>
              <div className="relative">
                <dt>
                  <IconCheck className="absolute h-6 w-6 text-primary-500" />
                  <p className="ml-9 text-slate-600">
                    On backgrounds without enough contrast.
                  </p>
                </dt>
              </div>
            </dl>
          </div>
          <div className="mt-8 block md:w-full md:grid md:grid-cols-2 gap-8">
            <div className="mt-8 bg-white shadow rounded-lg p-7 lg:mt-0">
              <div className="rounded-lg flex items-center justify-center py-16 bg-gray-50">
                <LogoMonotone className="h-10 w-auto text-dark-500" />
              </div>
              <p className="mt-4 font-bold">Monotone Dark</p>
            </div>
            <div className="mt-8 bg-white shadow rounded-lg p-7 lg:mt-0">
              <div className="rounded-lg flex items-center justify-center py-16 bg-primary-900">
                <LogoMonotone className="h-10 w-auto text-white" />
              </div>
              <p className="mt-4 font-bold">Monotone Light</p>
            </div>
          </div>
          <div className="flex justify-center py-8">
            <ElemButton href={downloadMonotone} btn="primary">
              Download Monotone Logos
            </ElemButton>
          </div>
          <div className="max-w-prose mx-auto">
            <h3 className="mt-8 text-xl font-bold text-dark-500 mb-4 lg:text-2xl">
              The Logomark
            </h3>
            <p className="font-display text-xl leading-relaxed text-slate-600">
              There are a few circumstances where the Logomark can represent the
              brand on its own without the wordmark.
            </p>

            <dl className="mt-4 space-y-6">
              <div className="relative">
                <dt>
                  <IconCheck className="absolute h-6 w-6 text-primary-500" />
                  <p className="ml-9 text-slate-600">
                    <span className="font-bold">
                      When logo legibility is compromised.
                    </span>{' '}
                    If the size of the logo would make the wordmark illegible.
                  </p>
                </dt>
              </div>
              <div className="relative">
                <dt>
                  <IconCheck className="absolute h-6 w-6 text-primary-500" />
                  <p className="ml-9 text-slate-600">
                    <span className="font-bold">
                      When a full-color logo is nearby.
                    </span>{' '}
                    For example, in a multi-panel ad featuring a large
                    full-color logo, the Logomark can be used alone as a
                    secondary brand signifier.
                  </p>
                </dt>
              </div>
              <div className="relative">
                <dt>
                  <IconCheck className="absolute h-6 w-6 text-primary-500" />
                  <p className="ml-9 text-slate-600">
                    <span className="font-bold">
                      In a situation where the brand is already established.
                    </span>{' '}
                    Within our product or at an EdgeIn event. Anywhere the
                    Logomark will be instantly recognized as part of our brand.
                  </p>
                </dt>
              </div>
              <div className="relative">
                <dt>
                  <IconCheck className="absolute h-6 w-6 text-primary-500" />
                  <p className="ml-9 text-slate-600">
                    <span className="font-bold">
                      When space is extremely limited.
                    </span>{' '}
                    For example, when the logo must live within a square or
                    circle shape.
                  </p>
                </dt>
              </div>
            </dl>
          </div>

          <div className="mt-8 block md:w-full md:grid md:grid-cols-3 gap-8">
            <div className="mt-8 bg-white shadow rounded-lg p-7 lg:mt-0">
              <div className="rounded-lg flex items-center justify-center py-16 bg-gray-50">
                <ElemLogo mode="icon" className="h-10 w-auto" />
              </div>
              <p className="mt-4 font-bold">Primary Logomark</p>
            </div>
            <div className="mt-8 bg-white shadow rounded-lg p-7 lg:mt-0">
              <div className="rounded-lg flex items-center justify-center py-16 bg-gray-50">
                <LogoMonotone
                  mode="icon"
                  className="h-10 w-auto text-dark-500"
                />
              </div>
              <p className="mt-4 font-bold">Monotone Dark</p>
            </div>
            <div className="mt-8 bg-white shadow rounded-lg p-7 lg:mt-0">
              <div className="rounded-lg flex items-center justify-center py-16 bg-primary-900">
                <LogoMonotone mode="icon" className="h-10 w-auto text-white" />
              </div>
              <p className="mt-4 font-bold">Monotone Light</p>
            </div>
          </div>
          <div className="flex justify-center py-8">
            <ElemButton href={downloadLogomark} btn="primary">
              Download Logomark
            </ElemButton>
          </div>
        </section>

        <section className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-prose mx-auto">
            <p className="inline text-transparent text-5xl font-bold bg-clip-text bg-gradient-to-r from-blue-800 via-primary-500 to-primary-400">
              03
            </p>
            <h2 className="text-3xl font-bold text-dark-500 mb-4 lg:text-4xl">
              Brand Palette
            </h2>
            <p className="font-display text-xl text-slate-600">
              While we use a lot of delightful colors, Indigo (#5E41FE) is
              EdgeIn&rsquo;s hero color. The hex codes of our official brand
              palette that we use as solids and gradients:
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-8 md:w-full lg:grid-cols-4">
            <div className="col-span-3 flex items-end bg-primary-500 rounded-lg shadow overflow-hidden text-center h-44 lg:col-span-4">
              <div className="w-full p-1 font-bold bg-white">#5E41FE</div>
            </div>
            <div className="col-span-1 flex items-end bg-primary-400 rounded-lg shadow overflow-hidden text-center h-44">
              <div className="w-full p-1 font-bold bg-white">#A05FFE</div>
            </div>
            <div className="flex items-end bg-blue-800 rounded-lg shadow overflow-hidden text-center h-44">
              <div className="w-full p-1 font-bold bg-white">#1B01FE</div>
            </div>
            <div className="flex items-end bg-dark-500 rounded-lg shadow overflow-hidden text-center h-44">
              <div className="w-full p-1 font-bold bg-white">#0E0067</div>
            </div>
            <div className="flex items-end bg-primary-900 rounded-lg shadow overflow-hidden text-center h-44">
              <div className="w-full p-1 font-bold bg-white">#20123A</div>
            </div>
            <div className="flex items-end bg-[#FE33D0] rounded-lg shadow overflow-hidden text-center h-44">
              <div className="w-full p-1 font-bold bg-white">#FE33D0</div>
            </div>
            <div className="flex items-end bg-[#F8DA4B] rounded-lg shadow overflow-hidden text-center h-44">
              <div className="w-full p-1 font-bold bg-white">#F8DA4B</div>
            </div>
            <div className="flex items-end bg-[#1BE6FF] rounded-lg shadow overflow-hidden text-center h-44">
              <div className="w-full p-1 font-bold bg-white">#1BE6FF</div>
            </div>
            <div className="flex items-end bg-[#475569] rounded-lg shadow overflow-hidden text-center h-44">
              <div className="w-full p-1 font-bold bg-white">#475569</div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8 md:w-full ">
            <div className="flex items-end rounded-lg overflow-hidden shadow text-center h-44 bg-gradient-to-r from-blue-800 via-primary-500 to-primary-400">
              <div className="w-full p-1 font-bold bg-white">Gradient 1</div>
            </div>
            <div className="flex items-end rounded-lg overflow-hidden shadow text-center h-44 bg-gradient-to-bl from-[#F8DA4B] via-[#FE33D0] to-[#1B01FE]">
              <div className="w-full p-1 font-bold bg-white">Gradient 2</div>
            </div>
            <div className="flex items-end rounded-lg overflow-hidden shadow text-center h-44 bg-gradient-to-tr from-[#553BE5] via-[#8E7AFE] to-[#1BE6FF]">
              <div className="w-full p-1 font-bold bg-white">Gradient 3</div>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-prose mx-auto">
            <p className="inline text-transparent text-5xl font-bold bg-clip-text bg-gradient-to-r from-blue-800 via-primary-500 to-primary-400">
              04
            </p>
            <h2 className="text-3xl font-bold text-dark-500 mb-4 lg:text-4xl">
              Typography
            </h2>
            <p className="font-display text-xl text-slate-600">
              Metropolis is the font used on EdgeIn marketing and product web
              experiences. It’s available for most world alphabets. You can find
              it{' '}
              <a
                href="https://fontsarena.com/metropolis-by-chris-simpson/"
                target="_blank"
                rel="noreferrer"
                className="text-primary-500"
              >
                here
              </a>
              .
            </p>
            <p className="mt-4 font-display text-xl text-slate-600">
              Please refer to the{' '}
              <a
                href="https://choosealicense.com/licenses/ofl-1.1/"
                target="_blank"
                rel="noreferrer"
                className="text-primary-500"
              >
                SIL Open Font License 1.1
              </a>{' '}
              for exact details on what the conditions and restrictions are.
            </p>
          </div>
          <div className="mt-8 block md:w-full md:grid md:grid-cols-2 gap-8">
            <div className="mt-8 bg-white shadow rounded-lg p-7 lg:mt-0">
              <div className="font-bold text-4xl text-center py-16 rounded-lg bg-gray-50">
                <div className="py-2 px-4 sm:px-0">Metropolis Bold</div>
              </div>
              <p className="mt-4 text-slate-600">
                Metropolis Bold is the font used for titles & subtitles.
              </p>
            </div>
            <div className="mt-8 bg-white shadow rounded-lg p-7 lg:mt-0">
              <div className="text-4xl text-center py-16 rounded-lg bg-gray-50">
                <div className="py-2 px-4 sm:px-0">Metropolis Regular</div>
              </div>
              <p className="mt-4 text-slate-600">
                Metropolis Regular is the font used in paragraph text and small
                UI elements.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BrandAssets;
