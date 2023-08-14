import { FC } from 'react';
import { ElemButton } from '../elem-button';
import { IconSearch, IconX } from '../icons';
import { InputText } from '../input-text';

type Props = {};

export const ElemOnboardingLocation: FC<Props> = ({}) => {
  return (
    <>
      <div className="max-w-sm">
        <h1 className="mt-4 text-2xl text-center font-medium lg:text-3xl">
          Where are you based?
        </h1>
        <p className="mt-5 text-xs text-center text-slate-500 font-normal">
          We&apos;ll show you interesting companies, investors, events and news
          directly from your area. You can even add multiple locations.
        </p>

        <div className="relative mt-8">
          <InputText
            className="w-full pl-10 !m-0"
            name="location"
            placeholder="Try “San Francisco”"
            value=""
            onChange={() => {}}
          />
          <IconSearch className="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      <ul className="flex items-center flex-wrap gap-3 mt-5 max-w-3xl">
        <li className="flex items-center gap-2 p-2 pl-3 rounded-md bg-gray-100">
          <span className="text-sm font-medium">London, United Kingdom</span>
          <IconX className="w-3 h-3 text-gray-600 cursor-pointer" />
        </li>
        <li className="flex items-center gap-2 p-2 pl-3 rounded-md bg-gray-100">
          <span className="text-sm font-medium">
            New York City, New York, United States of America
          </span>
          <IconX className="w-3 h-3 text-gray-600 cursor-pointer" />
        </li>
      </ul>

      <div className="px-5 py-4 mt-16 w-full max-w-sm rounded-lg border border-gray-100">
        <p className="text-gray-900 font-medium">
          New companies in your locations
        </p>
        <p className="text-gray-500 text-xs mt-1 mb-3">In the last 7 days</p>
        <p>
          <span className="text-primary-500 text-2xl font-semibold mr-1">
            145
          </span>
          <span className="text-gray-500 text-sm">from 7,946 total</span>
        </p>
      </div>

      <ElemButton btn="primary" size="md" className="max-w-sm w-full mt-16">
        Next
      </ElemButton>
    </>
  );
};
