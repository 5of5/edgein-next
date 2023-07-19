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
import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useIntercom } from 'react-use-intercom';
import { hotjar } from 'react-hotjar';
import { clarity } from 'react-microsoft-clarity';
import FullStory, { identify } from 'react-fullstory';
import { startCase } from 'lodash';
import { filterExcludeNotifications } from '@/utils/notifications';
import { NOTIFICATION_EXCLUDE_PROPERTIES } from '@/utils/constants';
const FULLSTORY_ORG_ID = 'o-1EYK7Q-na1';
const CLARITY_ID = 'epusnauses';

type UserValue = {
  user: User | null;
  loading: boolean;
  listAndFollows: GetFollowsByUserQuery['list_members'][0]['list'][];
  myGroups: GetGroupsOfUserQuery['user_group_members'][0]['user_group'][];
  unreadNotifications: GetUnreadNotificationsQuery['notifications'];
  refetchMyGroups: any;
  refetchUnreadNotifications: () => void;
  refreshUser: () => void;
};

const userContext = React.createContext<UserValue>({
  user: null,
  loading: true,
  listAndFollows: [],
  myGroups: [],
  unreadNotifications: [],
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

  const { data: notifications, refetch: refetchUnreadNotifications } =
    useGetUnreadNotificationsQuery(
      { user_id: user?.id || 0 },
      { enabled: Boolean(user), refetchOnWindowFocus: false },
    );

  React.useEffect(() => {
    clarity.init(CLARITY_ID);
  }, []);

  React.useEffect(() => {
    if (user) {
      try {
        if (hotjar.identify) {
          hotjar.identify(String(user.id), {
            name: startCase(user.display_name || ''),
            email: user.email,
            role: user.role,
          });
        }
      } catch (e) {
        // hotjar not loaded
      }
      try {
        identify(String(user.id), {
          displayName: startCase(user.display_name || ''),
          email: user.email,
          role: user.role,
        });
      } catch (e) {
        // fullstory not loaded
      }
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
              ? `${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL}/people/${user.person.slug}`
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

  const [myGroups, setMyGroups] = useState(
    groups?.user_group_members?.map(group => group.user_group) || [],
  );
  useEffect(() => {
    setMyGroups(
      groups?.user_group_members?.map(group => group.user_group) || [],
    );
  }, [groups]);

  let unreadNotifications = notifications?.notifications || [];

  unreadNotifications = filterExcludeNotifications(
    unreadNotifications as Notifications[],
    NOTIFICATION_EXCLUDE_PROPERTIES,
  );

  return (
    <Provider
      value={{
        user: user || null,
        loading,
        listAndFollows,
        myGroups,
        unreadNotifications,
        refetchMyGroups,
        refetchUnreadNotifications,
        refreshUser,
      }}
    >
      {user && !user.email.endsWith('@edgein.io') ? (
        <FullStory org={FULLSTORY_ORG_ID} />
      ) : null}
      {props.children}
    </Provider>
  );
};
export { UserProvider, useUser };
