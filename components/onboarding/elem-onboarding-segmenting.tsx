import { FC, useRef, useEffect, useState } from 'react';
import { onboardingExploreChoices, segmentChoices } from '@/utils/constants';
import { ElemButton } from '../elem-button';
import { Segment } from '@/types/onboarding';
// import { useIntercom } from 'react-use-intercom';
import { LiveChatWidget, EventHandlerPayload } from "@livechat/widget-react";

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
  // const { showNewMessages } = useIntercom();
  function handleLiveChatEvent(event: EventHandlerPayload<"onNewEvent">) {
    console.log("LiveChatWidget.onNewEvent", event);
  }

  const [show, setShow] = useState<boolean>(false);
  const showNewMessages = (message: String) => {
    console.log(message)
    setShow(true);
  }

  const exploreChoicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedSegment) {
      exploreChoicesRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedSegment]);

  return (
    <>
      {show && <LiveChatWidget
        license={process.env.NEXT_PUBLIC_LIVECHAT_LISCENCE || ''}
        visibility="maximized"
        onNewEvent={handleLiveChatEvent}
      />}
      <div className="max-w-sm">
        <h1 className="mt-4 text-2xl text-center font-medium lg:text-3xl">
          What best describes what you do?
        </h1>
        <p className="mt-5 text-xs text-center text-slate-500 font-normal">
          Learning about you and your job will help us pick the most relevant
          content for you every time you open Mentibus.
        </p>
      </div>

      <ul className="max-w-3xl mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
        {segmentChoices.map(item => (
          <li
            key={item.title}
            className={`px-4 py-4 rounded-lg border ${
              item.title === selectedSegment
                ? 'border-white-300'
                : 'border-neutral-700'
            } shadow-sm cursor-pointer md:px-6`}
            onClick={() => onChangeSegment(item.title)}>
            <p className="text-white text-sm font-medium">{item.title}</p>
            <p className="text-gray text-xs">{item.description}</p>
          </li>
        ))}
      </ul>

      {selectedSegment && (
        <div ref={exploreChoicesRef} className="max-w-sm">
          <div className="flex pt-12 pb-8 items-center">
            <div className="flex-grow border-t border-black/10"></div>
          </div>
          <h1 className="text-2xl text-center font-medium lg:text-3xl">
            What would you like to explore on Mentibus?
          </h1>
          <p className="mt-5 text-xs text-center text-slate-500 font-normal">
            Select any of the following choices.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {onboardingExploreChoices.map(item => (
              <li
                key={item}
                className={`px-6 py-4 rounded-lg border ${
                  exploreChoices.includes(item)
                    ? 'border-white-300'
                    : 'border-neutral-700'
                } shadow-sm cursor-pointer`}
                onClick={() => {
                  if (item === 'Something else') {
                    showNewMessages(`Hi Mentibus, I'd like to explore `);
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
                <p className="text-sm">{item}</p>
              </li>
            ))}
          </ul>
          <ElemButton
            btn="primary"
            size="md"
            className="max-w-sm w-full mt-8 md:mt-16"
            disabled={exploreChoices.length === 0}
            onClick={onNext}>
            Next
          </ElemButton>
        </div>
      )}
    </>
  );
};
