import { mutate, query } from "@/graphql/hasuraAdmin";
import {
  InsertUserGroupDocument,
  UpdateUserGroupDocument,
  DeleteUserGroupDocument,
  DeleteUserGroupInvitesByGroupIdDocument,
  DeleteUserGroupMembersByGroupIdDocument,
  DeleteNotesByGroupIdDocument,
  GetGroupDocument,
  GetUserGroupMemberByGroupIdDocument,
  GetUserGroupInviteByIdDocument,
  GetUserGroupMemberByIdDocument,
  InsertUserGroupMembersDocument,
  GetNoteByIdDocument,
  GetUserGroupInvitesByEmailDocument,
  GetUserGroupInvitesByEmailAndGroupIdDocument,
  GetUserGroupMembersByUserIdAndGroupIdDocument,
  GetGroupQuery,
  GetUserGroupMemberByGroupIdQuery,
  User_Groups_Insert_Input,
  InsertUserGroupMutation,
  UpdateUserGroupMutation,
  DeleteUserGroupMutation,
  DeleteUserGroupInvitesByGroupIdMutation,
  DeleteUserGroupMembersByGroupIdMutation,
  DeleteNotesByGroupIdMutation,
  GetUserGroupInviteByIdQuery,
  GetUserGroupMemberByIdQuery,
  InsertUserGroupMembersMutation,
  GetNoteByIdQuery,
  GetUserGroupInvitesByEmailQuery,
  GetUserGroupInvitesByEmailAndGroupIdQuery,
  GetUserGroupMembersByUserIdAndGroupIdQuery,
} from "@/graphql/types";

const onInsertGroup = async (payload: User_Groups_Insert_Input) => {
  try {
    const {
      data: { insert_user_groups_one },
    } = await mutate<InsertUserGroupMutation>({
      mutation: InsertUserGroupDocument,
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
  try {
    const {
      data: { update_user_groups },
    } = await mutate<UpdateUserGroupMutation>({
      mutation: UpdateUserGroupDocument,
      variables: {
        id,
        changes,
      },
    });
    return update_user_groups?.returning[0];
  } catch (ex) {
    throw ex;
  }
};

const onDeleteGroup = async (id: number) => {
  try {
    const {
      data: { delete_user_groups },
    } = await mutate<DeleteUserGroupMutation>({
      mutation: DeleteUserGroupDocument,
      variables: {
        id,
      },
    });
    return delete_user_groups?.returning[0];
  } catch (ex) {
    throw ex;
  }
};

const onDeleteGroupInvites = async (groupId: number) => {
  try {
    const {
      data: { delete_user_group_invites },
    } = await mutate<DeleteUserGroupInvitesByGroupIdMutation>({
      mutation: DeleteUserGroupInvitesByGroupIdDocument,
      variables: {
        groupId,
      },
    });
    return delete_user_group_invites?.returning[0];
  } catch (ex) {
    throw ex;
  }
};

const onDeleteGroupMembers = async (groupId: number) => {
  try {
    const {
      data: { delete_user_group_members },
    } = await mutate<DeleteUserGroupMembersByGroupIdMutation>({
      mutation: DeleteUserGroupMembersByGroupIdDocument,
      variables: {
        groupId,
      },
    });
    return delete_user_group_members?.returning[0];
  } catch (ex) {
    throw ex;
  }
};

const onDeleteNotesByGroupId = async (groupId: number) => {
  try {
    const {
      data: { delete_notes },
    } = await mutate<DeleteNotesByGroupIdMutation>({
      mutation: DeleteNotesByGroupIdDocument,
      variables: {
        groupId,
      },
    });
    return delete_notes?.returning[0];
  } catch (ex) {
    throw ex;
  }
};

const onFindGroupById = async (groupId: number) => {
  try {
    const data = await query<GetGroupQuery>({
      query: GetGroupDocument,
      variables: { id: groupId },
    });
    return data.data.user_groups[0];
  } catch (ex) {
    throw ex;
  }
};

const onFindUserGroupMembers = async (groupId: number) => {
  try {
    const data = await query<GetUserGroupMemberByGroupIdQuery>({
      query: GetUserGroupMemberByGroupIdDocument,
      variables: { user_group_id: groupId },
    });
    return data.data.user_group_members;
  } catch (ex) {
    throw ex;
  }
};

const onFindUserGroupInviteById = async (id: number) => {
  try {
    const data = await query<GetUserGroupInviteByIdQuery>({
      query: GetUserGroupInviteByIdDocument,
      variables: { id },
    });
    return data.data.user_group_invites[0];
  } catch (ex) {
    throw ex;
  }
};

const onFindUserGroupMemberById = async (id: number) => {
  try {
    const data = await query<GetUserGroupMemberByIdQuery>({
      query: GetUserGroupMemberByIdDocument,
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
  } = await mutate<InsertUserGroupMembersMutation>({
    mutation: InsertUserGroupMembersDocument,
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
  try {
    const data = await query<GetNoteByIdQuery>({
      query: GetNoteByIdDocument,
      variables: { id },
    });
    return data.data.notes[0];
  } catch (ex) {
    throw ex;
  }
};

const isUserMemberOfGroup = async (groupId: number, userId: number) => {
  const members: GetUserGroupMemberByGroupIdQuery["user_group_members"] =
    await GroupService.onFindUserGroupMembers(groupId);
  return members.some((mem) => mem.user_id === userId);
};

const isUserCreatorOfGroup = async (groupId: number, userId: number) => {
  const group: GetGroupQuery["user_groups"][0] =
    await GroupService.onFindGroupById(groupId);
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
  try {
    const { data } = await query<GetUserGroupInvitesByEmailQuery>({
      query: GetUserGroupInvitesByEmailDocument,
      variables: { email },
    });
    return data.user_group_invites;
  } catch (ex) {
    throw ex;
  }
};

const onCheckGroupInviteExists = async (
  email: string,
  user_group_id: number
) => {
  try {
    const data = await query<GetUserGroupInvitesByEmailAndGroupIdQuery>({
      query: GetUserGroupInvitesByEmailAndGroupIdDocument,
      variables: { email, user_group_id },
    });
    return data.data.user_group_invites[0];
  } catch (ex) {
    throw ex;
  }
};

const onCheckGroupMemberExists = async (
  user_id: number,
  user_group_id: number
) => {
  try {
    const data = await query<GetUserGroupMembersByUserIdAndGroupIdQuery>({
      query: GetUserGroupMembersByUserIdAndGroupIdDocument,
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
            {created_by_user_id: {_eq: $user_id}}
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
          created_by_user_id: user_id,
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

const onInsertComment = async (note_id: number, content: string, user_id: number) => {
  try {
    const {
      data: { insert_comments_one },
    } = await mutate({
      mutation: `
      mutation InsertComments($object: comments_insert_input!) {
        insert_comments_one(
          object: $object
        ) {
          id
        }
      }`,
      variables: {
        object: {
          note_id,
          content,
          created_by_user_id: user_id,
        },
      },
    });
    return insert_comments_one;
  } catch (ex) {
    throw ex;
  }
};

const onDeleteComment = async (id: number) => {
  try {
    const {
      data: { delete_comments },
    } = await mutate({
      mutation: `
      mutation DeleteCommentOne($id: Int!) {
        delete_comments(where: {id: {_eq: $id}}) {
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
    return delete_comments.returning[0];
  } catch (ex) {
    throw ex;
  }
};

const onFindCommentById = async (id: number) => {
  try {
    const data = await query({
      query: `
      query FindCommentById($id: Int!) {
        comments(where: {id: {_eq: $id}}, limit: 1) {
          id
          created_by_user_id
        }
      }
      `,
      variables: { id },
    });
    return data.data.comments[0];
  } catch (ex) {
    throw ex;
  }
};

const onDeleteLikesByNoteId = async (note_id: number) => {
  try {
    const {
      data: { delete_likes },
    } = await mutate({
      mutation: `
      mutation DeleteLikesByNoteId($note_id: Int!) {
        delete_likes(where: {note_id: {_eq: $note_id}}) {
          affected_rows
          returning {
            id
          }
        }
      }
      `,
      variables: {
        note_id,
      },
    });
    return delete_likes.returning[0];
  } catch (ex) {
    throw ex;
  }
};

const onDeleteCommentsByNoteId = async (note_id: number) => {
  try {
    const {
      data: { delete_comments },
    } = await mutate({
      mutation: `
      mutation DeleteCommentsByNoteId($note_id: Int!) {
        delete_comments(where: {note_id: {_eq: $note_id}}) {
          affected_rows
          returning {
            id
          }
        }
      }
      `,
      variables: {
        note_id,
      },
    });
    return delete_comments.returning[0];
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
  onInsertComment,
  onDeleteComment,
  onFindCommentById,
  onDeleteLikesByNoteId,
  onDeleteCommentsByNoteId,
};
export default GroupService;
