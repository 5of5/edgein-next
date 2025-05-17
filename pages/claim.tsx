import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import { ArrowUpRight } from 'lucide-react';

export default function Claim() {
  return (
    <section className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="mb-16 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
            Claim Your Data
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Take control of your digital presence
          </p>
        </div>

        <Card className="bg-neutral-900 border-neutral-800 rounded-lg">
          <CardHeader className="px-8 pt-8 pb-4">
            <CardTitle className="text-2xl font-bold text-white">
              Coming Soon
            </CardTitle>
            <CardDescription className="text-base text-gray-400 mt-2">
              We&apos;re building something special for you
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <p className="text-base text-gray-400">
              Follow{' '}
              <a
                href="https://twitter.com/Mentibus_xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 inline-flex items-center hover:underline">
                @Mentibus_xyz
                <ArrowUpRight className="ml-1 w-4 h-4" />
              </a>{' '}
              to be the first to know when we launch.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
