import { FC } from 'react';
import { segmentChoices } from '@/utils/constants';
import { ElemButton } from '../elem-button';

type Props = {};

export const ElemOnboardingSegmenting: FC<Props> = ({}) => {
  return (
    <>
      <div className="max-w-sm">
        <h1 className="mt-4 text-2xl text-center font-medium lg:text-3xl">
          What best describes what you do?
        </h1>
        <p className="mt-5 text-xs text-center text-slate-500 font-normal">
          Learning about you and your job will help us pick the most relevant
          content for you every time you open EdgeIn.
        </p>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3">
        {segmentChoices.map(item => (
          <li
            key={item.title}
            className="px-6 py-4 rounded-lg border border-slate-300 shadow-sm cursor-pointer hover:bg-slate-50"
          >
            <p className="text-slate-900 text-sm font-medium">{item.title}</p>
            <p className="text-slate-500 text-xs">{item.description}</p>
          </li>
        ))}
      </ul>

      <ElemButton btn="primary" size="md" className="max-w-sm w-full mt-16">
        Next
      </ElemButton>
    </>
  );
};
