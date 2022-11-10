import { useAuth } from '@/hooks/useAuth';
import { User } from '@/models/User';
import { useGetFollowsByUserQuery, GetFollowsByUserQuery } from "@/graphql/types"
import React from 'react';
import { useQueryClient } from 'react-query';
import { useIntercom } from 'react-use-intercom';
import { hotjar } from 'react-hotjar';
import { identify } from 'react-fullstory';
 import { startCase } from 'lodash';
import hashSum from 'hash-sum';

type UserValue = {
  user: User | null
  loading: boolean
  setCounter: (fn:(prev: number) => number) => void
  listAndFollows: GetFollowsByUserQuery['list_members'][0]['list'][]
}

const userContext = React.createContext<UserValue>({user: null, loading: true, listAndFollows: [], setCounter: () => {}});
const useUser = () => {
  const queryClient = useQueryClient()
  const contextValue = React.useContext(userContext)
  const refreshProfile = () => {
    contextValue.setCounter(prev => prev + 1)
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
  const [counter, setCounter] = React.useState(0);
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
          // user_hash: "INSERT_HMAC_VALUE_HERE" // HMAC using SHA-256
        })
      } catch(e) {
         // intercom not loaded
      }  
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  const newListAndFollows = listMemberships?.list_members.map(li => li.list) || []

  const listAndFollowsHashed = hashSum(newListAndFollows)
  const lastListAndFollows = React.useRef({
    obj: newListAndFollows,
    hash: listAndFollowsHashed
  });
  if (lastListAndFollows.current.hash !== listAndFollowsHashed) {
    lastListAndFollows.current = {
      obj: newListAndFollows,
      hash: listAndFollowsHashed
    }
  }

  return (<Provider value={{user, loading, listAndFollows: lastListAndFollows.current.obj, setCounter}}>{ props.children}</Provider>)
}
export { UserProvider, useUser };