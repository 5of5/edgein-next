import { useAuth } from '@/hooks/use-auth';
import { User } from '@/models/user';
import {
  useGetFollowsByUserQuery,
  GetFollowsByUserQuery,
  useGetGroupsOfUserQuery,
  GetGroupsOfUserQuery,
  useGetUnreadNotificationsQuery,
  GetUnreadNotificationsQuery,
  Notifications,
} from '@/graphql/types';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useIntercom } from 'react-use-intercom';
import { startCase, isEmpty } from 'lodash';
import { filterExcludeNotifications } from '@/utils/notifications';
import {
  CREATE_GROUP_CREDITS_MIN_MEMBERS,
  CREATE_LIST_CREDITS_MIN_ITEMS,
  NOTIFICATION_EXCLUDE_PROPERTIES,
} from '@/utils/constants';
import { redirect_url } from '@/utils/auth';
import useLibrary from '@/hooks/use-library';
import { libraryChoices } from '@/utils/constants';
import { Library, LibraryTag } from '@/types/common';

// Disable fullstory temporarily
// import FullStory, { identify } from 'react-fullstory';
// const FULLSTORY_ORG_ID = 'o-1EYK7Q-na1';

// Disable hotjar temporarily
// import { hotjar } from 'react-hotjar';

// Disable Microsoft clarity temporarily
// import { clarity } from 'react-microsoft-clarity';
// const CLARITY_ID = 'epusnauses';

type UserValue = {
  user: User | null;
  loading: boolean;
  listAndFollows: GetFollowsByUserQuery['list_members'][0]['list'][];
  listsQualifyForCredits: boolean;
  myGroups: GetGroupsOfUserQuery['user_group_members'][0]['user_group'][];
  groupsQualifyForCredits: boolean;
  unreadNotificationsCount: number;
  selectedLibrary?: Library;
  onChangeLibrary: (value: LibraryTag) => void;
  refetchMyLists: any;
  refetchMyGroups: any;
  refetchUnreadNotifications: () => void;
  refreshUser: () => void;
};

const userContext = React.createContext<UserValue>({
  user: null,
  loading: true,
  listAndFollows: [],
  listsQualifyForCredits: false,
  myGroups: [],
  groupsQualifyForCredits: false,
  unreadNotificationsCount: 0,
  onChangeLibrary: () => {},
  refetchMyLists: () => {},
  refetchMyGroups: () => {},
  refetchUnreadNotifications: () => {},
  refreshUser: () => {},
});
const useUser = () => {
  const queryClient = useQueryClient();
  const contextValue = React.useContext(userContext);
  const refreshProfile = () => {
    queryClient.invalidateQueries(['GetFollowsByUser']);
  };
  return { ...contextValue, refreshProfile };
};

type Props = {
  children: JSX.Element;
};

const UserProvider: React.FC<Props> = props => {
  const { user, error: userError, loading, refreshUser } = useAuth();
  const { boot, shutdown } = useIntercom();
  const Provider = userContext.Provider;

  const {
    data: listMemberships,
    error: listAndFollowsError,
    refetch: refetchMyLists,
    isLoading,
  } = useGetFollowsByUserQuery(
    { user_id: user?.id || 0 },
    { enabled: Boolean(user) },
  );

  const {
    data: groups,
    error: groupsError,
    refetch: refetchMyGroups,
  } = useGetGroupsOfUserQuery(
    { user_id: user?.id || 0 },
    { enabled: Boolean(user) },
  );

  const listsForCredits = useMemo(
    () =>
      listMemberships?.list_members.filter(
        item =>
          item.list.created_by_id === (user?.id || 0) &&
          item.list.total_no_of_resources &&
          item.list.total_no_of_resources >= CREATE_LIST_CREDITS_MIN_ITEMS,
      ) || [],
    [listMemberships, user],
  );

  const groupsForCredits = useMemo(
    () =>
      groups?.user_group_members.filter(
        item =>
          item.user_group.created_by?.id === (user?.id || 0) &&
          item.user_group.user_group_members.length >=
            CREATE_GROUP_CREDITS_MIN_MEMBERS,
      ) || [],
    [groups, user],
  );

  const { data: notifications, refetch: refetchUnreadNotifications } =
    useGetUnreadNotificationsQuery(
      { user_id: user?.id || 0 },
      { enabled: Boolean(user) },
    );

  // React.useEffect(() => {
  //   clarity.init(CLARITY_ID);
  // }, []);

  React.useEffect(() => {
    if (user) {
      // try {
      //   if (hotjar.identify) {
      //     hotjar.identify(String(user.id), {
      //       name: startCase(user.display_name || ''),
      //       email: user.email,
      //       role: user.role,
      //     });
      //   }
      // } catch (e) {
      //   // hotjar not loaded
      // }
      // try {
      //   identify(String(user.id), {
      //     displayName: startCase(user.display_name || ''),
      //     email: user.email,
      //     role: user.role,
      //   });
      // } catch (e) {
      //   // fullstory not loaded
      // }
      try {
        shutdown();
        boot({
          name: startCase(user.display_name || ''), // Full name
          email: user.email, // Email address
          // created_at: user._createdAt // Signup date as a Unix timestamp
          userId: String(user.id), // User ID
          userHash: user.intercomUserHash, // HMAC using SHA-256
          customAttributes: {
            isClaimedProfile: !!user.person, // If a profile is claimed or not
            profileUrl: user.person
              ? `${redirect_url()}/people/${user.person.slug}`
              : null, // User profile url
          },
        });
      } catch (e) {
        // intercom not loaded
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const [listAndFollows, setListAndFollows] = useState(
    listMemberships?.list_members.map(li => li.list) || [],
  );
  useEffect(() => {
    setListAndFollows(listMemberships?.list_members.map(li => li.list) || []);
  }, [listMemberships]);

  const [listsQualifyForCredits, setListsQualifyForCredits] = useState<boolean>(
    !isEmpty(listsForCredits),
  );

  useEffect(() => {
    setListsQualifyForCredits(!isEmpty(listsForCredits) ? true : false);
  }, [listsForCredits]);

  const [myGroups, setMyGroups] = useState(
    groups?.user_group_members?.map(group => group.user_group) || [],
  );
  useEffect(() => {
    setMyGroups(
      groups?.user_group_members?.map(group => group.user_group) || [],
    );
  }, [groups]);

  const [groupsQualifyForCredits, setGroupsQualifyForCredits] =
    useState<boolean>(false);

  useEffect(() => {
    setGroupsQualifyForCredits(!isEmpty(groupsForCredits) ? true : false);
  }, [groupsForCredits]);

  const unreadNotificationsCount =
    notifications?.notifications_aggregate?.aggregate?.count || 0;

  const { selectedLibrary, onChangeLibrary } = useLibrary();
  const [library, setLibrary] = useState<LibraryTag | undefined>();

  useEffect(() => {
    if (selectedLibrary && selectedLibrary !== library?.id) {
      setLibrary(libraryChoices.find(item => item.id === selectedLibrary));
    }
  }, [selectedLibrary, library]);

  const handleSelectLibrary = useCallback(
    (value: LibraryTag) => {
      setLibrary(value);
      onChangeLibrary(value.id);
    },
    [setLibrary, onChangeLibrary],
  );

  const cachedUser = useMemo(
    () => ({
      user: user || null,
      loading,
      listAndFollows,
      listsQualifyForCredits,
      myGroups,
      groupsQualifyForCredits,
      unreadNotificationsCount,
      selectedLibrary: library?.id,
      onChangeLibrary: handleSelectLibrary,
      refetchMyLists,
      refetchMyGroups,
      refetchUnreadNotifications,
      refreshUser,
    }),
    [
      user,
      loading,
      listAndFollows,
      listsQualifyForCredits,
      myGroups,
      groupsQualifyForCredits,
      unreadNotificationsCount,
      library,
      handleSelectLibrary,
      refetchMyLists,
      refetchMyGroups,
      refetchUnreadNotifications,
      refreshUser,
    ],
  );
  return (
    <Provider value={cachedUser}>
      {/* {user && !user.email.endsWith('@edgein.io') ? (
        <FullStory org={FULLSTORY_ORG_ID} />
      ) : null} */}
      {props.children}
    </Provider>
  );
};
export { UserProvider, useUser };
