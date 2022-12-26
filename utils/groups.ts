import { mutate, query } from "@/graphql/hasuraAdmin";
import {
  User_Groups,
  User_Groups_Insert_Input,
  User_Group_Members,
} from "@/graphql/types";

const onInsertGroup = async (payload: User_Groups_Insert_Input) => {
  const insertGroupQuery = `
  mutation InsertUserGroup($object: user_groups_insert_input!) {
    insert_user_groups_one(
      object: $object
    ) {
      id
      name
      description
      twitter
      telegram
      discord
      created_at
      updated_at
      created_by
    }
  }
  `;

  try {
    const {
      data: { insert_user_groups_one },
    } = await mutate({
      mutation: insertGroupQuery,
      variables: {
        object: payload,
      },
    });
    return insert_user_groups_one;
  } catch (ex) {
    throw ex;
  }
};

const onUpdateGroup = async (id: number, changes: User_Groups_Insert_Input) => {
  const updateGroupQuery = `
      mutation UpdateUserGroup($id: Int!, $changes: user_groups_set_input!) {
        update_user_groups(
          where: {id: {_eq: $id}},
          _set: $changes
        ) {
          affected_rows 
          returning {
            id
            name
            description
            twitter
            telegram
            discord
            notes {
              id
              notes
            }
            created_at
            updated_at
            created_by
          }
        }
      }
      `;

  try {
    const {
      data: { update_user_groups },
    } = await mutate({
      mutation: updateGroupQuery,
      variables: {
        id,
        changes,
      },
    });
    return update_user_groups.returning[0];
  } catch (ex) {
    throw ex;
  }
};

const onDeleteGroup = async (id: number) => {
  const deleteGroupQuery = `
  mutation DeleteUserGroups($id: Int!) {
    delete_user_groups(where: {id: {_eq: $id}}) {
      affected_rows
      returning {
        id
      }
    }
  }
  `;

  try {
    const {
      data: { delete_user_groups },
    } = await mutate({
      mutation: deleteGroupQuery,
      variables: {
        id,
      },
    });
    return delete_user_groups.returning[0];
  } catch (ex) {
    throw ex;
  }
};

const onDeleteGroupInvites = async (groupId: number) => {
  const deleteGroupInvitesQuery = `
  mutation DeleteUserGroupInvites($groupId: Int!) {
    delete_user_group_invites(where: {user_group_id: {_eq: $groupId}}) {
      affected_rows
      returning {
        id
      }
    }
  }
  `;

  try {
    const {
      data: { delete_user_group_invites },
    } = await mutate({
      mutation: deleteGroupInvitesQuery,
      variables: {
        groupId,
      },
    });
    return delete_user_group_invites.returning[0];
  } catch (ex) {
    throw ex;
  }
};

const onDeleteGroupMembers = async (groupId: number) => {
  const deleteGroupMembersQuery = `
  mutation DeleteUserGroupMembers($groupId: Int!) {
    delete_user_group_members(where: {user_group_id: {_eq: $groupId}}) {
      affected_rows
      returning {
        id
      }
    }
  }
  `;

  try {
    const {
      data: { delete_user_group_members },
    } = await mutate({
      mutation: deleteGroupMembersQuery,
      variables: {
        groupId,
      },
    });
    return delete_user_group_members.returning[0];
  } catch (ex) {
    throw ex;
  }
};

const onDeleteNotesByGroupId = async (groupId: number) => {
  const deleteGroupNotesQuery = `
  mutation DeleteNotes($groupId: Int!) {
    delete_notes(where: {user_group_id: {_eq: $groupId}}) {
      affected_rows
      returning {
        id
      }
    }
  }
  `;

  try {
    const {
      data: { delete_notes },
    } = await mutate({
      mutation: deleteGroupNotesQuery,
      variables: {
        groupId,
      },
    });
    return delete_notes.returning[0];
  } catch (ex) {
    throw ex;
  }
};

const onFindGroupById = async (groupId: number) => {
  const findGroupQuery = `
  query findGroupOne($id: Int!) {
    user_groups(where: {id: {_eq: $id}}, limit: 1) {
      id
      name
      created_by
      created_at
    }
  }
  `;
  try {
    const data = await query({
      query: findGroupQuery,
      variables: { id: groupId },
    });
    return data.data.user_groups[0];
  } catch (ex) {
    throw ex;
  }
};

const onFindUserGroupMembers = async (groupId: number) => {
  const findGroupMembersQuery = `
  query findGroupMembers($user_group_id: Int!) {
    user_group_members(where: {user_group_id: {_eq: $user_group_id}}) {
      id
      user_group_id
      user_group {
        id
        name
        description
      }
      user_id
      user {
        id
        display_name
        email
      }
    }
  }
  `;
  try {
    const data = await query({
      query: findGroupMembersQuery,
      variables: { user_group_id: groupId },
    });
    return data.data.user_group_members;
  } catch (ex) {
    throw ex;
  }
};

const onFindUserGroupInviteById = async (id: number) => {
  const findGroupInviteQuery = `
  query findGroupMembers($id: Int!) {
    user_group_invites(where: {id: {_eq: $id}}, limit: 1) {
      id
      email
      user_group_id
    }
  }
  `;
  try {
    const data = await query({
      query: findGroupInviteQuery,
      variables: { id },
    });
    return data.data.user_group_invites[0];
  } catch (ex) {
    throw ex;
  }
};

const onFindUserGroupMemberById = async (id: number) => {
  const findGroupMemberQuery = `
  query findGroupMembers($id: Int!) {
    user_group_members(where: {id: {_eq: $id}}, limit: 1) {
      id
      user_id
      user_group_id
    }
  }
  `;
  try {
    const data = await query({
      query: findGroupMemberQuery,
      variables: { id },
    });
    return data.data.user_group_members[0];
  } catch (ex) {
    throw ex;
  }
};

const onAddGroupMember = async (user_id: number, user_group_id: number) => {
  const {
    data: { insert_user_group_members_one },
  } = await mutate({
    mutation: `
    mutation InsertUserGroupMembers($object: user_group_members_insert_input!) {
      insert_user_group_members_one(
        object: $object
      ) {
        id
        user_id
        user {
          id
          email
          display_name
          role
        }
        user_group_id
        user_group {
          id
          name
        }
      }
    }
  `,
    variables: {
      object: {
        user_id,
        user_group_id,
      },
    },
  });

  return insert_user_group_members_one;
};

const onFindNoteById = async (id: number) => {
  const findNoteQuery = `
  query findNoteOne($id: Int!) {
    notes(where: {id: {_eq: $id}}, limit: 1) {
      id
      notes
      created_by
      created_at
      resource
      resource_id
      user_group_id
      user_group {
        id
        name
      }
    }
  }
  `;
  try {
    const data = await query({
      query: findNoteQuery,
      variables: { id },
    });
    return data.data.notes[0];
  } catch (ex) {
    throw ex;
  }
};

const isUserMemberOfGroup = async (groupId: number, userId: number) => {
  const members = await GroupService.onFindUserGroupMembers(groupId);
  return members.some((mem: User_Group_Members) => mem.user_id === userId);
};

const isUserCreatorOfGroup = async (groupId: number, userId: number) => {
  const group: User_Groups = await GroupService.onFindGroupById(groupId);
  return group.created_by === userId;
};

const GroupService = {
  isUserMemberOfGroup,
  isUserCreatorOfGroup,
  onInsertGroup,
  onUpdateGroup,
  onDeleteGroup,
  onDeleteGroupInvites,
  onDeleteGroupMembers,
  onDeleteNotesByGroupId,
  onFindGroupById,
  onFindUserGroupMembers,
  onFindUserGroupInviteById,
  onFindUserGroupMemberById,
  onAddGroupMember,
  onFindNoteById,
};
export default GroupService;
