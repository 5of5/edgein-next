import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';

export default function Hiring() {
  return (
    <section className="relative overflow-hidden isolate bg-black min-h-[60vh] flex flex-col mt-10">
      <div className="px-6 py-4 mx-auto max-w-7xl sm:py-10 lg:px-8">
        {' '}
        {/* Reduced padding */}
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Be part of our vision
          </h1>
          <h2 className="flex mt-10">
            This isn’t just a data platform—it’s yours. Every insight you share,
            every connection you make, strengthens a network built by and for
            its contributors. Mentibus is where your knowledge creates impact,
            your data drives opportunity, and your voice shapes the future of
            Web3. Own the data. Lead the network. Build the future. Share with
            your team, win the market!
          </h2>
        </div>
      </div>
      <div className="flex mt-10 lg:px-8 justify-center gap-10">
        <Card className="bg-black-200 rounded-md w-80 border-neutral-600">
          <CardContent className="flex justify-center text-center">
            <CardDescription className="mt-3 text-white font-bold flex flex-col">
              <span>Backend Engineer</span>
              <span className="text-gray-400 mt-3">
                Lead our efforts to build the data platform for the people.
              </span>
              <span className="mt-3">Responsibilities:</span>
              <div className="mt-3 flex justify-start text-gray-200">
                <span className="text-left">
                  - Improve on our current backend design choices
                </span>
              </div>
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="bg-black-200 rounded-md w-80 border-neutral-600">
          <CardContent></CardContent>
        </Card>
      </div>
    </section>
  );
}
