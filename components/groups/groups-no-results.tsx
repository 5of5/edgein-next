import { GroupsTabItem } from '@/types/common';
import { FC } from 'react';
import { ElemButton } from '../elem-button';
import { IconGroupPlus, IconSearch, IconSidebarGroups } from '../icons';

type Props = {
  selectedTab: GroupsTabItem;
  onChangeTab: (tab: GroupsTabItem) => void;
  onClickCreateGroup: () => void;
};

export const GroupsNoResults: FC<Props> = ({
  selectedTab,
  onChangeTab,
  onClickCreateGroup,
}) => {
  const heading = {
    'my-groups': 'Create a group',
    discover: 'Discover',
    joined: 'Join a group',
  }[selectedTab.id];

  const caption = {
    'my-groups':
      'Groups allow you to collaborate on notes, share insights, and track leads with your team or other people.',
    discover:
      'There are no public groups yet. If you create a new group and make it public, it will appear here.',
    joined: `You have not joined any public groups yet. Start by browsing and follow anything you find interesting.`,
  }[selectedTab.id];

  return (
    <div className="flex items-center justify-center mx-auto min-h-[40vh]">
      <div className="w-full max-w-xl p-8 my-8 text-center bg-black border  border-neutral-700 rounded-2xl lg:text-left">
        <IconSidebarGroups className="w-12 h-12 mx-auto text-gray-300 lg:mx-0" />
        <h1 className="mt-5 text-3xl font-medium tracking-tight font-display">
          {heading}
        </h1>
        <div className="mt-2 text-gray-500">{caption}</div>
        {selectedTab.id === 'joined' ? (
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
            Discover New Groups
          </ElemButton>
        ) : (
          <ElemButton
            btn="primary"
            size="sm"
            onClick={onClickCreateGroup}
            className="mt-4">
            <IconGroupPlus className="w-5 h-5 mr-1" />
            Create New Group
          </ElemButton>
        )}
      </div>
    </div>
  );
};
