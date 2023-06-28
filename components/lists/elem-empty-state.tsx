import { ListsTabItem } from '@/types/common';
import { FC } from 'react';
import { ElemButton } from '../elem-button';
import { IconList, IconListPlus } from '../icons';

type Props = {
  selectedTab: ListsTabItem;
  onChangeTab: (tab: ListsTabItem) => void;
  onClickCreateList: () => void;
};

const ElemEmptyState: FC<Props> = ({
  selectedTab,
  onChangeTab,
  onClickCreateList,
}) => {
  const heading = {
    'my-lists': 'Create a list',
    discover: 'Discover',
    followed: 'Follow a list',
  }[selectedTab.id];

  const caption = {
    'my-lists':
      'Lists help you track and follow companies, investors, and people of your interest. We will even keep you notified about all their updates.',
    discover:
      'There are no public lists yet. If you create a new list and make it public, it will appear here.',
    followed: `You're not following any public lists yet. Start by browsing them and follow anything you find interesting.`,
  }[selectedTab.id];

  return (
    <div className="flex items-center justify-center mx-auto min-h-[40vh]">
      <div className="w-full max-w-2xl my-8 p-8 text-center bg-white border rounded-2xl border-dark-500/10">
        <IconList className="w-12 h-12 mx-auto text-slate-300" />
        <h1 className="mt-5 text-3xl font-bold">{heading}</h1>
        <div className="mt-1 text-lg text-slate-600">{caption}</div>
        {selectedTab.id === 'followed' ? (
          <ElemButton
            onClick={() =>
              onChangeTab({
                id: 'discover',
                name: 'Discover',
              })
            }
            btn="primary"
            className="mt-3"
          >
            <IconListPlus className="w-6 h-6 mr-1" />
            Discover New Lists
          </ElemButton>
        ) : (
          <ElemButton
            onClick={onClickCreateList}
            btn="primary"
            className="mt-3"
          >
            <IconListPlus className="w-6 h-6 mr-1" />
            Create New List
          </ElemButton>
        )}
      </div>
    </div>
  );
};

export default ElemEmptyState;
