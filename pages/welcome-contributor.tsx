import { ElemButton } from '@/components/elem-button';
import { useRouter } from 'next/router';
import { ROUTES } from '@/routes';
import { NextSeo } from 'next-seo';
import { FigureBlurredCircle } from '@/components/figures';
import { ElemLogo } from '@/components/elem-logo';
import Image from 'next/image';
import { IconCheck } from '@/components/icons';

const WelcomeContributor = () => {
  const router = useRouter();

  return (
    <>
      <NextSeo
        title="Welcome to Mentibus Contributor"
        description="You've successfully subscribed to Mentibus Contributor plan. Start building, signaling, and earning in the network."
      />
      <div className="relative overflow-hidden min-h-screen bg-black">
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

        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary-500/10 animate-pulse border-2 border-primary-500/20">
                <IconCheck className="w-12 h-12 text-primary-500" />
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-12 bg-gradient-to-r from-primary-500 to-primary-400 bg-clip-text text-transparent animate-gradient">
              You&apos;re in.
            </h1>
            
            <div className="space-y-8 text-lg max-w-2xl mx-auto">
              <p className="text-gray-300 leading-relaxed">
                Your $4.99 just activated premium access, tripled your rewards, and marked your presence in the Mentibus network.
              </p>
              
              <div className="relative py-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-6 text-2xl font-bold text-primary-500 bg-black transform hover:scale-105 transition-transform duration-300">
                    This isn&apos;t a product. It&apos;s a weapon.
                  </span>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                We&apos;ll reach out when it&apos;s time to claim your tokens.
              </p>
              
              <div className="relative py-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-6 text-2xl font-bold text-primary-500 bg-black transform hover:scale-105 transition-transform duration-300">
                    Until then, build. Signal. Earn. Take back the data.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <ElemButton
                onClick={() => router.push(ROUTES.HOME)}
                btn="primary"
                size="lg"
                className="px-8 py-3 text-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary-500/20"
              >
                Go to Home
              </ElemButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeContributor;
