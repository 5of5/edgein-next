export type Entitlements = {
  viewEmails: boolean;
  listsCount?: number;
  groupsCount?: number;
};

export type User = {
  id: number;
  email: string;
  display_name?: string | null;
  role: 'user' | 'admin' | 'cms' | 'cms-readonly';
  is_auth0_verified: boolean;
  isFirstLogin?: boolean;
  intercomUserHash?: string;
  auth0_linkedin_id?: string | null;
  auth0_user_pass_id?: string | null;
  billing_org_id?: string;
  billing_org?: {
    customer_id?: string;
  };
  person?: {
    name: string;
    picture: any;
    slug: string;
    id: number;
  } | null;
  reference_id: string;
  reference_user_id: number;
  additional_emails: string[];
  // To deprecate
  profilePicture: any;
  profileName?: string;
  entitlements: Entitlements;
  active: boolean;
  onboarding_information: Record<string, unknown> | null;
  showDraftData?: boolean;
};

export type UserToken = User & {
  isFirstLogin: boolean;
  intercomUserHash: string;
};
