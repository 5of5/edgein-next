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
      created_by_user_id
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
            created_by_user_id
            created_by {
              id
              display_name
              email
            }
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
      created_by_user_id
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
      created_by_user_id
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
          display_name
          email
          person {
            id
            slug
            picture
          }
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
      resource_type
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
  return group.created_by_user_id === userId;
};

const onLookupResource = async (resourceType: string, resourceId: number) => {
  const lookupResourceQuery = `
  query lookupResource($resourceId: Int!) {
    ${resourceType}(where: {id: {_eq: $resourceId}}, limit: 1) {
      id
      name
      slug
      logo
    }
  }
  `;
  try {
    const { data } = await query({
      query: lookupResourceQuery,
      variables: { resourceId },
    });
    return data[resourceType][0];
  } catch (ex) {
    throw ex;
  }
};


const onFindUserGroupInvitesByEmail = async (email: string) => {
  const findUserGroupInvitesQuery = `
  query findUserGroupInvitesByEmail($email: String!) {
    user_group_invites(where: {email: {_eq: $email}}) {
      id
      user_group_id
    }
  }
  `;
  try {
    const { data } = await query({
      query: findUserGroupInvitesQuery,
      variables: { email },
    });
    return data.user_group_invites;
  } catch (ex) {
    throw ex;
  }
};

const onCheckGroupInviteExists = async (email: string, user_group_id: number) => {
  const findGroupInviteQuery = `
  query findGroupInvites($email: String!, $user_group_id: Int!) {
    user_group_invites(where: {
      _and: [
        {email: {_eq: $email}},
        {user_group_id: {_eq: $user_group_id}}
      ]
    }, limit: 1) {
      id
      email
      user_group_id
      created_by_user_id
    }
  }
  `;
  try {
    const data = await query({
      query: findGroupInviteQuery,
      variables: { email, user_group_id },
    });
    return data.data.user_group_invites[0];
  } catch (ex) {
    throw ex;
  }
};

const onCheckGroupMemberExists = async (user_id: number, user_group_id: number) => {
  const findGroupMemberQuery = `
  query findGroupMembers($user_id: Int!, $user_group_id: Int!) {
    user_group_members(where: {
      _and: [
        {user_id: {_eq: $user_id}},
        {user_group_id: {_eq: $user_group_id}}
      ]
    }, limit: 1) {
      id
      user_id
      user_group_id
    }
  }
  `;
  try {
    const data = await query({
      query: findGroupMemberQuery,
      variables: { user_id, user_group_id },
    });
    return data.data.user_group_members[0];
  } catch (ex) {
    throw ex;
  }
};

const onCheckLikeExists = async (note_id: number, user_id: number) => {
  try {
    const data = await query({
      query: `
      query FindNoteLikesOne($note_id: Int!, $user_id: Int!) {
        likes(where: {
          _and: [
            {note_id: {_eq: $note_id}},
            {user_id: {_eq: $user_id}}
          ]
        }, limit: 1) {
          id
        }
      }
      `,
      variables: { note_id, user_id },
    });
    return data.data.likes[0];
  } catch (ex) {
    throw ex;
  }
};

const onInsertLike = async (note_id: number, user_id: number) => {
  try {
    const {
      data: { insert_likes_one },
    } = await mutate({
      mutation: `
      mutation InsertLikes($object: likes_insert_input!) {
        insert_likes_one(
          object: $object
        ) {
          id
        }
      }`,
      variables: {
        object: {
          note_id,
          user_id,
        },
      },
    });
    return insert_likes_one;
  } catch (ex) {
    throw ex;
  }
};


const onDeleteLike = async (id: number) => {
  try {
    const {
      data: { delete_likes },
    } = await mutate({
      mutation: `
      mutation DeleteLikes($id: Int!) {
        delete_likes(where: {id: {_eq: $id}}) {
          affected_rows
          returning {
            id
          }
        }
      }
      `,
      variables: {
        id,
      },
    });
    return delete_likes.returning[0];
  } catch (ex) {
    throw ex;
  }
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
  onLookupResource,
  onFindUserGroupInvitesByEmail,
  onCheckGroupInviteExists,
  onCheckGroupMemberExists,
  onCheckLikeExists,
  onInsertLike,
  onDeleteLike,
};
export default GroupService;
