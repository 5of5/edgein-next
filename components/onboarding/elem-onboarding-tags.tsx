import { FC, useMemo, useState } from 'react';
import { useIntercom } from 'react-use-intercom';
import { aiTags, ONBOARDING_DEFAULT_TAGS_LIMIT } from '@/utils/constants';
import { getSelectableWeb3Tags } from '@/utils/helpers';
import { ElemButton } from '../elem-button';

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
    return [...getSelectableWeb3Tags(), ...aiTags];
  }, []);

  const displayedTags = tagChoices.slice(0, limit);

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
        <h1 className="mt-4 text-2xl text-center font-medium lg:text-3xl">
          What do you want to see?
        </h1>
        <p className="mt-5 text-xs text-center text-slate-500 font-normal">
          Select at least 3 tags, and we&apos;ll find companies, investors,
          events and news of your interest.
        </p>
      </div>

      <ul className="flex items-center justify-center flex-wrap gap-3 max-w-2xl my-8">
        {displayedTags.map(tagItem => (
          <li
            key={tagItem.id}
            className={`bg-gray-100 px-3 py-2 rounded-full text-xs font-medium cursor-pointer border ${
              tags.includes(tagItem.id)
                ? 'border-primary-500 hover:border-primary-500'
                : 'border-transparent hover:border-gray-300'
            }`}
            onClick={() => {
              handleToggleTag(tagItem.id);
            }}>
            {tagItem.name}
          </li>
        ))}
      </ul>

      {limit < tagChoices.length && (
        <button
          className="text-gray-500 text-xs underline hover:text-gray-800"
          onClick={handleLoadMore}>
          Load more
        </button>
      )}

      <ElemButton
        btn="primary"
        size="md"
        className="max-w-sm w-full mt-8 md:mt-16"
        loading={isSubmittingOnboarding}
        disabled={tags.length < 3}
        onClick={onNext}>
        Finish
      </ElemButton>

      <div className="flex justify-center gap-1 mt-5">
        <p className="text-xs text-center text-slate-500 font-normal">
          Can&apos;t see something you&apos;re interested in?
        </p>
        <button
          className="text-gray-500 text-xs underline hover:text-gray-800"
          onClick={() => showNewMessages(`Hi EdgeIn, I'd like to see `)}>
          Let us know
        </button>
      </div>
    </>
  );
};
