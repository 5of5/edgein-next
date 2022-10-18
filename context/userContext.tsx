import { useAuth } from '@/hooks/useAuth';
import { User } from '@/models/User';
import { useGetFollowsByUserQuery, GetFollowsByUserQuery } from "@/graphql/types"
import React from 'react';
import { useQueryClient } from 'react-query';
import { useIntercom } from 'react-use-intercom';
import { hotjar } from 'react-hotjar';
import { startCase } from 'lodash';

type UserValue = {
  user: User | null
  loading: boolean
  listAndFollows: GetFollowsByUserQuery['list_members'][0]['list'][]
}

const userContext = React.createContext<UserValue>({user: null, loading: true, listAndFollows: []});
const useUser = () => {
  const queryClient = useQueryClient()
  const refreshProfile = () => {
    queryClient.invalidateQueries(['GetFollowsByUser'])
  }
  return {...React.useContext(userContext), refreshProfile };
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
          hotjar.identify(user.id, { name: user.display_name, publicAddress: user.publicAddress, email: user.email, role: user.role });
        }
      } catch(e) {
           // hotjar not loaded
      }  
      try { 
        shutdown()
        boot({
          name: startCase(user.display_name), // Full name
          email: user.email, // Email address
          // created_at: user._createdAt // Signup date as a Unix timestamp    
          userId: user.id, // User ID
          // user_hash: "INSERT_HMAC_VALUE_HERE" // HMAC using SHA-256
        })
      } catch(e) {
         // intercom not loaded
      }  
    }
  }, [user])


  const listAndFollows = listMemberships?.list_members.map(li => li.list) || []

  return (<Provider value={{user, loading, listAndFollows}}>{ props.children}</Provider>)
}
export { UserProvider, useUser };