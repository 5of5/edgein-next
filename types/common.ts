import { IconProps } from '@/components/icons';
import { FC, ReactNode } from 'react';

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type GroupsTabType = 'my-groups' | 'discover' | 'joined';

export type GroupsTabItem = {
  id: GroupsTabType;
  name: string;
  disabled?: boolean;
};

export type ListsTabType = 'my-lists' | 'discover' | 'following';

export type ListsTabItem = {
  id: ListsTabType;
  name: string;
  disabled?: boolean;
};

export type Breadcrumb = {
  name: string;
  to?: string;
  component: string | ReactNode | JSX.Element;
};

export type Library = 'Web3' | 'AI';

export type LibraryTag = {
  id: Library;
  name: Library;
};

export type Tag = {
  id: string;
  name: string;
};

export type ExploreMenuItem = {
  href: string;
  icon: FC<IconProps>;
  title: string;
};

export type Order_By_Option = 'ascending' | 'descending' | 'newest' | 'oldest';

export type DashboardCategory = {
  title: string;
  value: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
  date?: string;
};
