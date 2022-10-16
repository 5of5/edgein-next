import { useAuth } from '@/hooks/useAuth';
import { User } from '@/models/User';
import { useGetFollowsByUserQuery, GetFollowsByUserQuery } from "@/graphql/types"
import React from 'react';
import { useQueryClient } from 'react-query';

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
  const Provider = userContext.Provider;

  const {
		data: listMemberships,
		error: listAndFollowsError,
		isLoading,
	} = useGetFollowsByUserQuery({ user_id: user?.id }, { enabled: Boolean(user) })

  const listAndFollows = listMemberships?.list_members.map(li => li.list) || []

  return (<Provider value={{user, loading, listAndFollows}}>{ props.children}</Provider>)
}
export { UserProvider, useUser };