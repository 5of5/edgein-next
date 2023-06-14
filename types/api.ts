export type InviteToEdgeInMailParams = {
  email: string;
  senderName: string;
  senderEmail: string;
  signUpUrl?: string;
};

export type InviteToEdgeInResponse = {
  status: number;
  message: string;
  email: string;
};
