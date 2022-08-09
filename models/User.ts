export type User = {
  id: number
  external_id: string | null
  email: string
  display_name?: string | null
  role: "user" | "admin"
}