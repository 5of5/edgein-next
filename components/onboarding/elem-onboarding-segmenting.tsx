import { FC, useRef, useEffect } from 'react';
import { onboardingExploreChoices, segmentChoices } from '@/utils/constants';
import { ElemButton } from '../elem-button';
import { Segment } from '@/types/onboarding';
import { useIntercom } from 'react-use-intercom';

type Props = {
  selectedSegment?: Segment;
  exploreChoices: string[];
  onChangeSegment: (segment: Segment) => void;
  onChangeExploreChoices: (choices: string[]) => void;
  onNext: () => void;
};

export const ElemOnboardingSegmenting: FC<Props> = ({
  selectedSegment,
  exploreChoices,
  onChangeSegment,
  onChangeExploreChoices,
  onNext,
}) => {
  const { showNewMessage } = useIntercom();

  const exploreChoicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedSegment) {
      exploreChoicesRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedSegment]);

  return (
    <>
      <div className="max-w-sm">
        <h1 className="mt-4 text-2xl font-medium text-center lg:text-3xl">
          What best describes what you do?
        </h1>
        <p className="mt-5 text-xs font-normal text-center text-slate-500">
          Learning about you and your job will help us pick the most relevant
          content for you every time you open EdgeIn.
        </p>
      </div>

      <ul className="grid max-w-3xl grid-cols-1 gap-3 mt-8 md:grid-cols-2">
        {segmentChoices.map(item => (
          <li
            key={item.title}
            className={`px-4 py-4 rounded-lg border ${
              item.title === selectedSegment
                ? 'border-primary-500 bg-gray-50'
                : 'border-slate-300'
            } shadow-sm cursor-pointer hover:bg-gray-50 md:px-6`}
            onClick={() => onChangeSegment(item.title)}>
            <p className="text-sm font-medium text-slate-900">{item.title}</p>
            <p className="text-xs text-slate-500">{item.description}</p>
          </li>
        ))}
      </ul>

      {selectedSegment && (
        <div ref={exploreChoicesRef} className="max-w-sm">
          <div className="flex items-center pt-12 pb-8">
            <div className="flex-grow border-t border-black/10"></div>
          </div>
          <h1 className="text-2xl font-medium text-center lg:text-3xl">
            What would you like to explore on EdgeIn?
          </h1>
          <p className="mt-5 text-xs font-normal text-center text-slate-500">
            Select any of the following choices.
          </p>

          <ul className="flex flex-col gap-3 mt-8">
            {onboardingExploreChoices.map(item => (
              <li
                key={item}
                className={`px-6 py-4 rounded-lg border ${
                  exploreChoices.includes(item)
                    ? 'border-primary-500 bg-gray-50'
                    : 'border-slate-300'
                } shadow-sm cursor-pointer hover:bg-gray-50`}
                onClick={() => {
                  if (item === 'Something else') {
                    showNewMessage(`Hi EdgeIn, I'd like to explore `);
                  }
                  onChangeExploreChoices(
                    exploreChoices.includes(item)
                      ? [
                          ...exploreChoices.filter(
                            exploreItem => exploreItem !== item,
                          ),
                        ]
                      : [...exploreChoices, item],
                  );
                }}>
                <p className="text-sm text-slate-900">{item}</p>
              </li>
            ))}
          </ul>
          <ElemButton
            btn="primary"
            size="md"
            className="w-full max-w-sm mt-8 md:mt-16"
            disabled={exploreChoices.length === 0}
            onClick={onNext}>
            Next
          </ElemButton>
        </div>
      )}
    </>
  );
};
