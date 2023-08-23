import { FC } from 'react';
import { onboardingExploreChoices, segmentChoices } from '@/utils/constants';
import { ElemButton } from '../elem-button';
import { Segment } from '@/types/onboarding';
import { useIntercom } from 'react-use-intercom';

type Props = {
  selectedSegment?: Segment;
  exploreChoice?: string;
  onChangeSegment: (segment: Segment) => void;
  onChangeExploreChoice: (choice: string) => void;
  onNext: () => void;
};

export const ElemOnboardingSegmenting: FC<Props> = ({
  selectedSegment,
  exploreChoice,
  onChangeSegment,
  onChangeExploreChoice,
  onNext,
}) => {
  const { showNewMessages } = useIntercom();

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
            className={`px-6 py-4 rounded-lg border ${
              item.title === selectedSegment
                ? 'border-primary-500'
                : 'border-slate-300'
            } shadow-sm cursor-pointer hover:bg-slate-50`}
            onClick={() => onChangeSegment(item.title)}
          >
            <p className="text-slate-900 text-sm font-medium">{item.title}</p>
            <p className="text-slate-500 text-xs">{item.description}</p>
          </li>
        ))}
      </ul>

      {selectedSegment && (
        <div className="max-w-sm">
          <div className="flex pt-12 pb-8 items-center">
            <div className="flex-grow border-t border-black/10"></div>
          </div>
          <h1 className="text-2xl text-center font-medium lg:text-3xl">
            What would you like to explore on EdgeIn?
          </h1>
          <p className="mt-5 text-xs text-center text-slate-500 font-normal">
            Select any of the following choices.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {onboardingExploreChoices.map(item => (
              <li
                key={item}
                className={`px-6 py-4 rounded-lg border ${
                  item === exploreChoice
                    ? 'border-primary-500'
                    : 'border-slate-300'
                } shadow-sm cursor-pointer hover:bg-slate-50`}
                onClick={() => {
                  if (item === 'Something else') {
                    showNewMessages(`Hi EdgeIn, I'd like to explore `);
                  }
                  onChangeExploreChoice(item);
                }}
              >
                <p className="text-slate-900 text-sm">{item}</p>
              </li>
            ))}
          </ul>
          <ElemButton
            btn="primary"
            size="md"
            className="max-w-sm w-full mt-16"
            disabled={!exploreChoice}
            onClick={onNext}
          >
            Next
          </ElemButton>
        </div>
      )}
    </>
  );
};
