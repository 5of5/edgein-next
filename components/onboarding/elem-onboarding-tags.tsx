import { FC, useMemo, useState } from 'react';
import { useIntercom } from 'react-use-intercom';
import { aiTags, ONBOARDING_DEFAULT_TAGS_LIMIT } from '@/utils/constants';
import { getSelectableWeb3Tags } from '@/utils/helpers';
import { ElemButton } from '../elem-button';
import { IconCheck } from '../icons';

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
  const { showNewMessages } = useIntercom();

  const [limit, setLimit] = useState(ONBOARDING_DEFAULT_TAGS_LIMIT);

  const tagChoices = useMemo(() => {
    return [...getSelectableWeb3Tags()];
  }, []);

  const tagChoicesAI = useMemo(() => {
    return [...aiTags];
  }, []);

  const displayedTags = tagChoices.slice(0, limit);
  const displayedTagsAI = tagChoicesAI.slice(0, limit);

  const handleLoadMore = () => {
    setLimit(prev => prev + 10);
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
      <div className="max-w-sm">
        <h1 className="mt-4 text-2xl font-medium text-center lg:text-3xl">
          What do you want to see?
        </h1>
        <p className="mt-5 text-xs font-normal text-center text-slate-500">
          Select at least 3 tags, and we&apos;ll find companies, investors,
          events and news of your interest.
        </p>
      </div>

      <div className="flex flex-col gap-4 my-8">
        <div className="p-4 text-center md:px-6">
          <div className="text-lg font-bold text-center">AI</div>

          <ul className="flex flex-wrap items-center justify-center max-w-2xl gap-3 my-4">
            {displayedTagsAI.map(tagItem => (
              <li
                key={tagItem.id}
                className={`flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-full text-xs font-medium cursor-pointer border ${
                  tags.includes(tagItem.id)
                    ? 'border-primary-500 hover:border-primary-500'
                    : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => {
                  handleToggleTag(tagItem.id);
                }}
              >
                {tags.includes(tagItem.id) && (
                  <IconCheck className="w-4 h-4 text-primary-500" />
                )}
                {tagItem.name}
              </li>
            ))}
          </ul>
          {limit < tagChoicesAI.length && (
            <button
              className="text-xs text-gray-500 underline hover:text-gray-800"
              onClick={handleLoadMore}
            >
              Load more AI tags
            </button>
          )}
        </div>

        <div className="p-4 text-center md:px-6">
          <div className="text-lg font-bold ">Web3</div>

          <ul className="flex flex-wrap items-center justify-center max-w-2xl gap-3 my-4">
            {displayedTags.map(tagItem => (
              <li
                key={tagItem.id}
                className={`flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-full text-xs font-medium cursor-pointer border ${
                  tags.includes(tagItem.id)
                    ? 'border-primary-500 hover:border-primary-500'
                    : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => {
                  handleToggleTag(tagItem.id);
                }}
              >
                {tags.includes(tagItem.id) && (
                  <IconCheck className="w-4 h-4 text-primary-500" />
                )}
                {tagItem.name}
              </li>
            ))}
          </ul>
          {limit < tagChoices.length && (
            <button
              className="text-xs text-gray-500 underline hover:text-gray-800"
              onClick={handleLoadMore}
            >
              Load more Web3 tags
            </button>
          )}
        </div>
      </div>

      <ElemButton
        btn="primary"
        size="md"
        className="w-full max-w-sm mt-8 md:mt-16"
        loading={isSubmittingOnboarding}
        disabled={tags.length < 3}
        onClick={onNext}
      >
        Finish
      </ElemButton>

      <div className="flex justify-center gap-1 mt-5">
        <p className="text-xs font-normal text-center text-slate-500">
          Can&apos;t see something you&apos;re interested in?
        </p>
        <button
          className="text-xs text-gray-500 underline hover:text-gray-800"
          onClick={() => showNewMessages(`Hi EdgeIn, I'd like to see `)}
        >
          Let us know
        </button>
      </div>
    </>
  );
};
