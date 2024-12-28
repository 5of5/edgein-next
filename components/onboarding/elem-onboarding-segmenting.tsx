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
  const { showNewMessages } = useIntercom();

  const exploreChoicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedSegment) {
      exploreChoicesRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedSegment]);

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

      <ul className="max-w-3xl mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
        {segmentChoices.map(item => (
          <li
            key={item.title}
            className={`px-4 py-4 rounded-lg border bg-white transition-transform duration-300 ${
              item.title === selectedSegment
                ? 'border-primary-500 shadow-lg'
                : 'border-slate-300 shadow-sm'
            } cursor-pointer hover:shadow-lg hover:scale-105 hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-500 hover:text-white md:px-6`}
            onClick={() => onChangeSegment(item.title)}>
            <p
              className={`text-sm font-medium ${
                item.title === selectedSegment ? 'text-slate-900' : 'text-black'
              }`}
            >
              {item.title}
            </p>
            <p className="text-xs text-black">
              {item.description}
            </p>
          </li>
        ))}
      </ul>

      {selectedSegment && (
        <div ref={exploreChoicesRef} className="max-w-sm">
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
                className={`px-6 py-4 rounded-lg border bg-white transition-transform duration-300 ${
                  exploreChoices.includes(item)
                    ? 'border-primary-500 shadow-lg'
                    : 'border-slate-300 shadow-sm'
                } cursor-pointer hover:shadow-lg hover:scale-105 hover:bg-gradient-to-r hover:from-green-400 hover:to-cyan-500 hover:text-white`}
                onClick={() => {
                  if (item === 'Something else') {
                    showNewMessages(`Hi EdgeIn, I'd like to explore `);
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
                <p className="text-sm text-black">{item}</p>
              </li>
            ))}
          </ul>

          <ElemButton
            btn="primary"
            size="md"
            className="max-w-sm w-full mt-8 md:mt-16 transition-transform duration-300 bg-gradient-to-r from-pink-400 to-red-500 hover:scale-105 hover:shadow-lg text-white font-semibold py-3 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-red-400 hover:to-pink-600"
            disabled={exploreChoices.length === 0}
            onClick={onNext}>
            Next
          </ElemButton>
        </div>
      )}
    </>
  );
};
