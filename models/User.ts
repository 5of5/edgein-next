export type User = {
  id: number
  external_id: string | null
  email: string
  display_name?: string | null
  role: "user" | "admin"
  is_auth0_verified: boolean
  auth0_linkedin_id?: string | null
  auth0_user_pass_id?: string | null
  person: {
    name: string
    picture: any
  } | null
}