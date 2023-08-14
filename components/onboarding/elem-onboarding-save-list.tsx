import { FC } from 'react';
import { ElemButton } from '../elem-button';
import { IconSearch, IconX } from '../icons';
import { InputText } from '../input-text';
import { ElemOnboardingResourceTable } from './elem-onboarding-resource-table';

type Props = {};

export const ElemOnboardingSaveList: FC<Props> = ({}) => {
  return (
    <>
      <h1 className="max-w-xl mt-4 text-2xl text-center font-medium lg:text-3xl">
        Did you know you can prospect your leads?
      </h1>

      <div className="max-w-sm">
        <p className="mt-5 text-xs text-center text-slate-500 font-normal">
          You can save companies, investors and people to lists and get updates
          on them. Start by adding a few profiles to your first, private list.
        </p>

        <div className="relative mt-8">
          <InputText
            className="w-full pl-10 !m-0"
            name="location"
            placeholder="Try “Coinbase”"
            value=""
            onChange={() => {}}
          />
          <IconSearch className="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      <div className="mt-4 max-w-3xl w-full">
        <ElemOnboardingResourceTable />
      </div>

      <ElemButton btn="primary" size="md" className="max-w-sm w-full mt-16">
        Save my list
      </ElemButton>

      <p className="text-gray-500 text-xs mt-4">
        You can always create more lists later.
      </p>
    </>
  );
};
