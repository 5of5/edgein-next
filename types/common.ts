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
