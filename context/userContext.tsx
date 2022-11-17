import { useAuth } from '@/hooks/useAuth';
import { User } from '@/models/User';
import { useGetFollowsByUserQuery, GetFollowsByUserQuery } from "@/graphql/types"
import React from 'react';
import { useQueryClient } from 'react-query';
import { useIntercom } from 'react-use-intercom';
import { hotjar } from 'react-hotjar';
import { identify } from 'react-fullstory';
 import { startCase } from 'lodash';

type UserValue = {
  user: User | null
  loading: boolean
  listAndFollows: GetFollowsByUserQuery['list_members'][0]['list'][]
}

const userContext = React.createContext<UserValue>({user: null, loading: true, listAndFollows: []});
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
  const { user, error: userError, loading } = useAuth();
  const { boot, shutdown } = useIntercom();
  const Provider = userContext.Provider;

  const {
		data: listMemberships,
		error: listAndFollowsError,
		isLoading,
	} = useGetFollowsByUserQuery({ user_id: user?.id }, { enabled: Boolean(user) })

  React.useEffect(() => {
    if (user) {
      try { 
        if (hotjar.identify) {
          hotjar.identify(user.id, { name: startCase(user.display_name), email: user.email, role: user.role });
        }
      } catch(e) {
           // hotjar not loaded
      }  
      try { 
        identify(user.id, { 
          displayName: startCase(user.display_name), 
          email: user.email,
          role: user.role
        });        
      } catch(e) {
           // fullstory not loaded
      }  
      try { 
        shutdown()
        boot({
          name: startCase(user.display_name), // Full name
          email: user.email, // Email address
          // created_at: user._createdAt // Signup date as a Unix timestamp    
          userId: user.id, // User ID
          userHash: user.intercomUserHash // HMAC using SHA-256
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
    

  return (<Provider value={{user, loading, listAndFollows}}>{ props.children}</Provider>)
}
export { UserProvider, useUser };