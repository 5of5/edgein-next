import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { ElemButton } from '@/components/elem-button';
import { useUser } from '@/context/user-context';
import { useGetListQuery } from '@/graphql/types';
import { ElemAvatarList } from '@/components/elem-avatar-list';
import { Dialog } from '@mui/material';

interface ListMembersManagerProps {
  listId: number;
  open?: boolean;
  onClose?: () => void;
}

const GET_LIST = gql`
  query GetList($id: Int!, $searchTerm: String) {
    lists(
      where: {
        _and: [
          { id: { _eq: $id } },
          {
            _or: [
              { name: { _ilike: $searchTerm } },
              { description: { _ilike: $searchTerm } }
            ]
          }
        ]
      }
    ) {
      id
      name
      description
      total_no_of_resources
      public
      created_at
      updated_at
      created_by {
        id
        display_name
        email
        person {
          id
          name
          slug
          picture
        }
      }
      list_members {
        id
        member_type
        user_id
        user {
          id
          display_name
          email
          person {
            id
            name
            slug
            picture
          }
        }
      }
    }
  }
`;

const UPDATE_MEMBER_ROLE = gql`
  mutation UpdateListMemberRole($id: Int!, $member_type: String!) {
    update_list_members_by_pk(
      pk_columns: { id: $id }
      _set: { member_type: $member_type }
    ) {
      id
      member_type
      list_id
      user_id
      user {
        id
        display_name
        email
        person {
          id
          name
          slug
          picture
        }
      }
    }
  }
`;

export const ListMembersManager: React.FC<ListMembersManagerProps> = ({ listId, open, onClose }) => {
  const { user } = useUser();
  const { data, isLoading: loading, refetch } = useGetListQuery({ id: listId });
  const [internalOpen, setInternalOpen] = useState(false);
  const isDialogOpen = open !== undefined ? open : internalOpen;
  const handleOpen = () => (open === undefined ? setInternalOpen(true) : undefined);
  const handleClose = () => {
    if (onClose) onClose();
    else setInternalOpen(false);
  };

  const handleUpdateRole = async (memberId: number, newRole: string) => {
    try {
      const mutation = `
        mutation UpdateListMemberRole($id: Int!, $member_type: String!) {
          update_list_members_by_pk(
            pk_columns: { id: $id }
            _set: { member_type: $member_type }
          ) {
            id
            member_type
            list_id
            user_id
            user {
              id
              display_name
              email
              person {
                id
                name
                slug
                picture
              }
            }
          }
        }
      `;
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            id: memberId,
            member_type: newRole,
          },
        }),
      });
      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      refetch();
    } catch (error) {
      console.error('Error updating member role:', error);
    }
  };

  type ListMemberType = typeof data extends { lists: { list_members: any[] }[] } ?
    NonNullable<typeof data>['lists'][number]['list_members'][number] : any;

  if (loading) return <div>Loading...</div>;
  if (!data?.lists?.[0]) return <div>No list data found.</div>;

  const members = data.lists[0].list_members;

  return (
    <Dialog open={isDialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <div className="p-4 sm:p-6 bg-neutral-950 w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-100">List Members</h3>
          <ElemButton btn="gray" size="sm" onClick={handleClose}>
            Close
          </ElemButton>
        </div>
        <div className="space-y-2 max-h-[70vh] overflow-y-auto rounded-md scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {members.map((member: ListMemberType) => {
            if (!member) return null;
            const isCurrentUser = member.user_id === user?.id;
            const currentUserMember = members.find((m: ListMemberType) => m?.user_id === user?.id);
            const isOwner = currentUserMember?.member_type === 'owner';
            const isAdmin = currentUserMember?.member_type === 'admin';
            const canManage = isOwner || (isAdmin && member.member_type === 'follow');
            return (
              <div key={member.id} className="flex items-center justify-between p-2 bg-gray-800 border border-gray-700 rounded shadow-sm">
                <div className="flex items-center space-x-2">
                  <img
                    src={member.user?.person?.picture?.url || '/default-avatar.png'}
                    alt={member.user?.person?.name || member.user?.display_name || ''}
                    className="w-8 h-8 rounded-full border border-gray-700"
                  />
                  <div>
                    <div className="font-medium text-gray-100">
                      {member.user?.person?.name || member.user?.display_name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {member.member_type.charAt(0).toUpperCase() + member.member_type.slice(1)}
                    </div>
                  </div>
                </div>
                {canManage && !isCurrentUser && (
                  <div className="flex space-x-2">
                    {member.member_type === 'follow' ? (
                      <ElemButton
                        btn="primary"
                        size="sm"
                        onClick={() => handleUpdateRole(member.id, 'admin')}
                      >
                        Make Admin
                      </ElemButton>
                    ) : member.member_type === 'admin' ? (
                      <ElemButton
                        btn="gray"
                        size="sm"
                        onClick={() => handleUpdateRole(member.id, 'follow')}
                      >
                        Remove Admin
                      </ElemButton>
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Dialog>
  );
}; 