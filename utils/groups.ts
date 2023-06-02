import { mutate, query } from '@/graphql/hasuraAdmin';
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
  InsertLikesMutation,
  InsertLikesDocument,
  DeleteLikesMutation,
  DeleteLikesDocument,
  InsertCommentsMutation,
  InsertCommentsDocument,
  DeleteCommentOneMutation,
  DeleteCommentOneDocument,
  DeleteLikesByNoteIdMutation,
  DeleteLikesByNoteIdDocument,
  DeleteCommentsByNoteIdMutation,
  DeleteCommentsByNoteIdDocument,
  FindNoteLikesOneQuery,
  FindNoteLikesOneDocument,
  FindCommentByIdQuery,
  FindCommentByIdDocument,
} from '@/graphql/types';

const onInsertGroup = async (payload: User_Groups_Insert_Input) => {
  const {
    data: { insert_user_groups_one },
  } = await mutate<InsertUserGroupMutation>({
    mutation: InsertUserGroupDocument,
    variables: {
      object: payload,
    },
  });
  return insert_user_groups_one;
};

const onUpdateGroup = async (id: number, changes: User_Groups_Insert_Input) => {
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
};

const onDeleteGroup = async (id: number) => {
  const {
    data: { delete_user_groups },
  } = await mutate<DeleteUserGroupMutation>({
    mutation: DeleteUserGroupDocument,
    variables: {
      id,
    },
  });
  return delete_user_groups?.returning[0];
};

const onDeleteGroupInvites = async (groupId: number) => {
  const {
    data: { delete_user_group_invites },
  } = await mutate<DeleteUserGroupInvitesByGroupIdMutation>({
    mutation: DeleteUserGroupInvitesByGroupIdDocument,
    variables: {
      groupId,
    },
  });
  return delete_user_group_invites?.returning[0];
};

const onDeleteGroupMembers = async (groupId: number) => {
  const {
    data: { delete_user_group_members },
  } = await mutate<DeleteUserGroupMembersByGroupIdMutation>({
    mutation: DeleteUserGroupMembersByGroupIdDocument,
    variables: {
      groupId,
    },
  });
  return delete_user_group_members?.returning[0];
};

const onDeleteNotesByGroupId = async (groupId: number) => {
  const {
    data: { delete_notes },
  } = await mutate<DeleteNotesByGroupIdMutation>({
    mutation: DeleteNotesByGroupIdDocument,
    variables: {
      groupId,
    },
  });
  return delete_notes?.returning[0];
};

const onFindGroupById = async (groupId: number) => {
  const data = await query<GetGroupQuery>({
    query: GetGroupDocument,
    variables: { id: groupId },
  });
  return data.data.user_groups[0];
};

const onFindUserGroupMembers = async (groupId: number) => {
  const data = await query<GetUserGroupMemberByGroupIdQuery>({
    query: GetUserGroupMemberByGroupIdDocument,
    variables: { user_group_id: groupId },
  });
  return data.data.user_group_members;
};

const onFindUserGroupInviteById = async (id: number) => {
  const data = await query<GetUserGroupInviteByIdQuery>({
    query: GetUserGroupInviteByIdDocument,
    variables: { id },
  });
  return data.data.user_group_invites[0];
};

const onFindUserGroupMemberById = async (id: number) => {
  const data = await query<GetUserGroupMemberByIdQuery>({
    query: GetUserGroupMemberByIdDocument,
    variables: { id },
  });
  return data.data.user_group_members[0];
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
  const data = await query<GetNoteByIdQuery>({
    query: GetNoteByIdDocument,
    variables: { id },
  });
  return data.data.notes[0];
};

const isUserMemberOfGroup = async (groupId: number, userId: number) => {
  const members: GetUserGroupMemberByGroupIdQuery['user_group_members'] =
    await GroupService.onFindUserGroupMembers(groupId);
  return members.some(mem => mem.user_id === userId);
};

const isUserCreatorOfGroup = async (groupId: number, userId: number) => {
  const group: GetGroupQuery['user_groups'][0] =
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
  const { data } = await query({
    query: lookupResourceQuery,
    variables: { resourceId },
  });
  return data[resourceType][0];
};

const onFindUserGroupInvitesByEmail = async (email: string) => {
  const { data } = await query<GetUserGroupInvitesByEmailQuery>({
    query: GetUserGroupInvitesByEmailDocument,
    variables: { email },
  });
  return data.user_group_invites;
};

const onCheckGroupInviteExists = async (
  email: string,
  user_group_id: number,
) => {
  const data = await query<GetUserGroupInvitesByEmailAndGroupIdQuery>({
    query: GetUserGroupInvitesByEmailAndGroupIdDocument,
    variables: { email, user_group_id },
  });
  return data.data.user_group_invites[0];
};

const onCheckGroupMemberExists = async (
  user_id: number,
  user_group_id: number,
) => {
  const data = await query<GetUserGroupMembersByUserIdAndGroupIdQuery>({
    query: GetUserGroupMembersByUserIdAndGroupIdDocument,
    variables: { user_id, user_group_id },
  });
  return data.data.user_group_members[0];
};

const onCheckLikeExists = async (note_id: number, user_id: number) => {
  const data = await query<FindNoteLikesOneQuery>({
    query: FindNoteLikesOneDocument,
    variables: { note_id, user_id },
  });
  return data.data.likes[0];
};

const onInsertLike = async (note_id: number, user_id: number) => {
  const {
    data: { insert_likes_one },
  } = await mutate<InsertLikesMutation>({
    mutation: InsertLikesDocument,
    variables: {
      object: {
        note_id,
        created_by_user_id: user_id,
      },
    },
  });
  return insert_likes_one;
};

const onDeleteLike = async (id: number) => {
  const {
    data: { delete_likes },
  } = await mutate<DeleteLikesMutation>({
    mutation: DeleteLikesDocument,
    variables: {
      id,
    },
  });
  return delete_likes?.returning[0];
};

const onInsertComment = async (
  note_id: number,
  content: string,
  user_id: number,
) => {
  const {
    data: { insert_comments_one },
  } = await mutate<InsertCommentsMutation>({
    mutation: InsertCommentsDocument,
    variables: {
      object: {
        note_id,
        content,
        created_by_user_id: user_id,
      },
    },
  });
  return insert_comments_one;
};

const onDeleteComment = async (id: number) => {
  const {
    data: { delete_comments },
  } = await mutate<DeleteCommentOneMutation>({
    mutation: DeleteCommentOneDocument,
    variables: {
      id,
    },
  });
  return delete_comments?.returning[0];
};

const onFindCommentById = async (id: number) => {
  const data = await query<FindCommentByIdQuery>({
    query: FindCommentByIdDocument,
    variables: { id },
  });
  return data.data.comments[0];
};

const onDeleteLikesByNoteId = async (note_id: number) => {
  const {
    data: { delete_likes },
  } = await mutate<DeleteLikesByNoteIdMutation>({
    mutation: DeleteLikesByNoteIdDocument,
    variables: {
      note_id,
    },
  });
  return delete_likes?.returning[0];
};

const onDeleteCommentsByNoteId = async (note_id: number) => {
  const {
    data: { delete_comments },
  } = await mutate<DeleteCommentsByNoteIdMutation>({
    mutation: DeleteCommentsByNoteIdDocument,
    variables: {
      note_id,
    },
  });
  return delete_comments?.returning[0];
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
