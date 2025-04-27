import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';

export default function Claim() {
  return (
    <section className="relative overflow-hidden isolate bg-black min-h-[60vh] flex flex-col mt-4 sm:mt-10">
      <div className="px-4 sm:px-6 py-4 mx-auto max-w-7xl sm:py-10 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white">
            Claim Your Data
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-300">
            Take control of your digital presence in the AI + Web3 ecosystem.
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-6 sm:mt-10 px-4 sm:px-8">
        <Card className="bg-black-200 rounded-md w-full max-w-2xl border-neutral-600">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-white">
              Coming Soon
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-400">
              We&apos;re building something special for you. Stay tuned for
              updates.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="text-center py-4 sm:py-8">
              <p className="text-sm sm:text-base text-gray-300">
                Follow @Mentibus_xyz on Twitter to be the first to know when we
                launch.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
