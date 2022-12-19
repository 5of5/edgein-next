import { mutate } from "@/graphql/hasuraAdmin";

const onInsertGroup = async (name: string) => {
  const insertGroupQuery = `
  mutation InsertUserGroup($object: user_groups_insert_input!) {
    insert_user_groups_one(
      object: $object
    ) {
      id,
      name
    }
  }
      `;

  try {
    const {
      data: { insert_user_groups_one },
    } = await mutate({
      mutation: insertGroupQuery,
      variables: {
        object: {
          name,
        },
      },
    });
    return insert_user_groups_one;
  } catch (ex) {
    throw ex;
  }
};

const onUpdateGroup = async (id: string, name: string) => {
  const updateGroupQuery = `
      mutation UpdateUserGroup($id: Int!, $name: String!) {
        update_user_groups(
          where: {id: {_eq: $id}},
          _set: { name: $name }
        ) {
          affected_rows 
          returning {
            id
            name
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
        name,
      },
    });
    return update_user_groups.returning[0];
  } catch (ex) {
    throw ex;
  }
};

const onDeleteGroup = async (id: string) => {
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

const onDeleteGroupInvites = async (groupId: string) => {
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

const onDeleteGroupMembers = async (groupId: string) => {
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

const onDeleteNotesByGroupId = async (groupId: string) => {
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

const GroupService = {
  onInsertGroup,
  onUpdateGroup,
  onDeleteGroup,
  onDeleteGroupInvites,
  onDeleteGroupMembers,
  onDeleteNotesByGroupId,
};
export default GroupService;
