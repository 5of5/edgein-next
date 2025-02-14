import { FC, useMemo, useState } from 'react';
// import { useIntercom } from 'react-use-intercom';
import { aiTags, ONBOARDING_DEFAULT_TAGS_LIMIT } from '@/utils/constants';
import { getSelectableWeb3Tags } from '@/utils/helpers';
import { ElemButton } from '../elem-button';
import { IconCheck } from '../icons';
import { LiveChatWidget, EventHandlerPayload } from "@livechat/widget-react";

type Props = {
  isSubmittingOnboarding: boolean;
  tags: string[];
  onChangeTags: (tags: string[]) => void;
  onNext: () => void;
};

export const ElemOnboardingTags: FC<Props> = ({
  isSubmittingOnboarding,
  tags,
  onChangeTags,
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

  const [limit, setLimit] = useState({
    web3: ONBOARDING_DEFAULT_TAGS_LIMIT,
    ai: ONBOARDING_DEFAULT_TAGS_LIMIT,
  });

  const tagChoicesWeb3 = useMemo(() => {
    return [...getSelectableWeb3Tags()];
  }, []);

  const tagChoicesAI = useMemo(() => {
    return [...aiTags];
  }, []);

  const tagClouds = [
    {
      library: 'AI',
      tagChoices: tagChoicesAI,
      displayedTags: tagChoicesAI.slice(0, limit.ai),
      tagsLimit: limit.ai,
    },
    {
      library: 'Web3',
      tagChoices: tagChoicesWeb3,
      displayedTags: tagChoicesWeb3.slice(0, limit.web3),
      tagsLimit: limit.web3,
    },
  ];

  const handleLoadMore = (library: string) => {
    setLimit(prev => ({
      ...prev,
      ai: library === 'AI' ? prev.ai + 10 : prev.ai,
      web3: library === 'Web3' ? prev.web3 + 10 : prev.web3,
    }));
  };

  const handleToggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      onChangeTags([...tags.filter(tagItem => tagItem !== tag)]);
    } else {
      onChangeTags([...tags, tag]);
    }
  };

  return (
    <>
      {show && <LiveChatWidget
        license={process.env.NEXT_PUBLIC_LIVECHAT_LISCENCE || ''}
        visibility="maximized"
        onNewEvent={handleLiveChatEvent}
      />}
      <div className="max-w-sm">
        <h1 className="mt-4 text-2xl font-medium text-center lg:text-3xl">
          What do you want to see?
        </h1>
        <p className="mt-5 text-xs font-normal text-center text-slate-500">
          Select at least 3 tags, and we&apos;ll find companies, investors,
          events and news of your interest.
        </p>
      </div>

      {tagClouds.map(tagCloud => (
        <div key={tagCloud.library} className="p-4 text-center md:px-6">
          <div className="text-lg font-bold text-center">
            {tagCloud.library} Market:
          </div>
          <ul className="flex flex-wrap items-center justify-center max-w-2xl gap-3 my-4">
            {tagCloud.displayedTags.map(tagItem => (
              <li
                key={tagItem.id}
                className={`flex items-center gap-1 bg-neutral-900 px-3 py-2 rounded-full text-xs font-medium cursor-pointer border ${
                  tags.includes(tagItem.id)
                    ? 'border-primary-500 hover:border-primary-500'
                    : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => {
                  handleToggleTag(tagItem.id);
                }}>
                {tags.includes(tagItem.id) && (
                  <IconCheck className="w-4 h-4 text-primary-500" />
                )}
                {tagItem.name}
              </li>
            ))}
          </ul>

          {tagCloud.tagsLimit < tagCloud.tagChoices.length && (
            <button
              className="text-xs text-gray-500 underline hover:text-gray-800"
              onClick={() => handleLoadMore(`${tagCloud.library}`)}>
              Load more {tagCloud.library} tags
            </button>
          )}
        </div>
      ))}

      <ElemButton
        btn="primary"
        size="md"
        className="w-full max-w-sm mt-8 md:mt-16"
        loading={isSubmittingOnboarding}
        disabled={tags.length < 3}
        onClick={onNext}>
        Finish
      </ElemButton>

      <div className="flex justify-center gap-1 mt-5">
        <p className="text-xs font-normal text-center text-slate-500">
          Can&apos;t see something you&apos;re interested in?
        </p>
        <button
          className="text-xs text-gray-500 underline hover:text-gray-800"
          onClick={() => showNewMessages(`Hi Mentibus, I'd like to see `)}>
          Let us know
        </button>
      </div>
    </>
  );
};
