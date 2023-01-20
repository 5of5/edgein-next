export type User = {
  id: number
  email: string
  display_name?: string | null
  role: "user" | "admin"
  is_auth0_verified: boolean
  isFirstLogin?: boolean
  intercomUserHash?: string
  auth0_linkedin_id?: string | null
  auth0_user_pass_id?: string | null
  billing_org_id?: string
  person?: {
    name: string
    picture: any
  } | null
  reference_id: string
  reference_user_id: number
  additional_emails : string[]
  profilePicture: any
  profileName?: string
  entitlements: {
    view_emails: boolean
  }
}