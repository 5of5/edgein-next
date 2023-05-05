import { useAuth } from '@/hooks/use-auth';
import { User } from '@/models/user';
import {
  useGetFollowsByUserQuery,
  GetFollowsByUserQuery,
  useGetGroupsOfUserQuery,
  GetGroupsOfUserQuery,
} from "@/graphql/types";
import React from 'react';
import { useQueryClient } from 'react-query';
import { useIntercom } from 'react-use-intercom';
import { hotjar } from 'react-hotjar';
import { clarity } from 'react-microsoft-clarity';
import FullStory, { identify } from 'react-fullstory';
import { startCase } from 'lodash';
const FULLSTORY_ORG_ID = "o-1EYK7Q-na1";
const CLARITY_ID = "epusnauses";

type UserValue = {
  user: User | null
  loading: boolean
  listAndFollows: GetFollowsByUserQuery['list_members'][0]['list'][]
  myGroups: GetGroupsOfUserQuery['user_group_members'][0]['user_group'][]
  refetchMyGroups: any
  refreshUser: () => void;
}

const userContext = React.createContext<UserValue>({
  user: null,
  loading: true,
  listAndFollows: [],
  myGroups: [],
  refetchMyGroups: () => {},
  refreshUser: () => {},
});
const useUser = () => {
  const queryClient = useQueryClient()
  const contextValue = React.useContext(userContext)
  const refreshProfile = () => {
    queryClient.invalidateQueries(['GetFollowsByUser'])
  }
  return {...contextValue, refreshProfile };
}

type Props = {
  children: JSX.Element,
};

const UserProvider: React.FC<Props> = (props) => {
  const { user, error: userError, loading, refreshUser } = useAuth();
  const { boot, shutdown } = useIntercom();
  const Provider = userContext.Provider;

  const {
		data: listMemberships,
		error: listAndFollowsError,
		isLoading,
	} = useGetFollowsByUserQuery({ user_id: user?.id || 0 }, { enabled: Boolean(user) })

  const {
		data: groups,
		error: groupsError,
    refetch: refetchMyGroups,
	} = useGetGroupsOfUserQuery({ user_id: user?.id || 0 }, { enabled: Boolean(user) })

  React.useEffect(() => {
		clarity.init(CLARITY_ID);
	}, []);

  React.useEffect(() => {
    if (user) {
      try { 
        if (hotjar.identify) {
          hotjar.identify(String(user.id), { name: startCase(user.display_name || ""), email: user.email, role: user.role });
        }
      } catch(e) {
           // hotjar not loaded
      }  
      try { 
        identify(String(user.id), { 
          displayName: startCase(user.display_name || ""), 
          email: user.email,
          role: user.role
        });        
      } catch(e) {
           // fullstory not loaded
      }  
      try { 
        shutdown()
        boot({
          name: startCase(user.display_name || ""), // Full name
          email: user.email, // Email address
          // created_at: user._createdAt // Signup date as a Unix timestamp    
          userId: String(user.id), // User ID
          userHash: user.intercomUserHash, // HMAC using SHA-256
          customAttributes: {
            isClaimedProfile: !!user.person, // If a profile is claimed or not
          },
        })
      } catch(e) {
         // intercom not loaded
      }  
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  const [listAndFollows, setListAndFollows] = React.useState(
    listMemberships?.list_members.map(li => li.list) || [],
  );
  React.useEffect(() => {
    setListAndFollows(listMemberships?.list_members.map(li => li.list) || [])
  }, [listMemberships])

  const [myGroups, setMyGroups] = React.useState(
    groups?.user_group_members?.map(group => group.user_group) || []
  );
  React.useEffect(() => {
    setMyGroups(groups?.user_group_members?.map(group => group.user_group) || []);
  }, [groups]);
    

  return (
    <Provider
      value={{
        user: user || null,
        loading,
        listAndFollows,
        myGroups,
        refetchMyGroups,
        refreshUser,
      }}
    >
      {user && !user.email.endsWith("@edgein.io") ? (
        <FullStory org={FULLSTORY_ORG_ID} />
      ) : null}
      {props.children}
    </Provider>
  );
}
export { UserProvider, useUser };