import { ListsTabItem } from '@/types/common';
import { FC } from 'react';
import { ElemButton } from '../elem-button';
import { IconListPlus, IconSearch, IconSidebarList } from '../icons';

type Props = {
  selectedTab: ListsTabItem;
  onChangeTab: (tab: ListsTabItem) => void;
  onClickCreateList: () => void;
};

export const ListsNoResults: FC<Props> = ({
  selectedTab,
  onChangeTab,
  onClickCreateList,
}) => {
  const heading = {
    'my-lists': 'Create a list',
    discover: 'Discover',
    following: 'Follow a list',
  }[selectedTab.id];

  const caption = {
    'my-lists':
      'Lists help you track and follow companies, investors, and people of your interest. We will even keep you notified about all their updates.',
    discover:
      'There are no public lists yet. If you create a new list and make it public, it will appear here.',
    following: `You're not following any public lists yet. Start by browsing and follow anything you find interesting.`,
  }[selectedTab.id];

  return (
    <div className="flex items-center justify-center mx-auto min-h-[40vh]">
      <div className="w-full max-w-xl p-8 my-8 text-center bg-dark-100 border border-gray-200 rounded-2xl lg:text-left">
        <IconSidebarList className="w-12 h-12 mx-auto text-gray-300 lg:mx-0" />
        <h1 className="mt-5 text-3xl font-medium tracking-tight font-display">
          {heading}
        </h1>
        <div className="mt-2 text-gray-500">{caption}</div>
        {selectedTab.id === 'following' ? (
          <ElemButton
            btn="primary"
            size="sm"
            onClick={() =>
              onChangeTab({
                id: 'discover',
                name: 'Discover',
              })
            }
            className="mt-4">
            <IconSearch className="w-5 h-5 mr-1" />
            Discover New Lists
          </ElemButton>
        ) : (
          <ElemButton
            btn="primary"
            size="sm"
            onClick={onClickCreateList}
            className="mt-4">
            <IconListPlus className="w-5 h-5 mr-1" />
            Create New List
          </ElemButton>
        )}
      </div>
    </div>
  );
};
