export type InviteGroupMemberPayloadEmailResource = {
  isExistedUser: boolean;
  email: string;
  recipientName: string;
};

export type InviteGroupMemberMailParams = {
  email: string;
  senderName: string;
  recipientName?: string;
  groupName: string;
  groupUrl?: string;
  signUpUrl?: string;
  isExistedUser?: boolean;
};

export type ConfirmAdditionalMailParams = {
  email: string;
  username: string;
  verifyUrl: string;
};
