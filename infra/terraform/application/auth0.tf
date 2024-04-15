resource "auth0_client" "edgein" {
  name                = local.project_name
  description         = "Pull request preview client"
  app_type            = "regular_web"
  allowed_origins     = [local.vercel_url]
  allowed_logout_urls = [local.vercel_url]
  callbacks           = [local.vercel_url]
  initiate_login_uri  = "${local.vercel_url}/sign-in"
  cross_origin_auth   = true
  logo_uri            = "https://edgein.io/edgein-io-icon.png"
  oidc_conformant     = true

  grant_types = [
    "authorization_code",
    "client_credentials",
    "implicit",
    "password",
    "refresh_token"
  ]

  jwt_configuration {
    alg                 = "RS256"
    lifetime_in_seconds = 36000
  }
}

resource "auth0_client_credentials" "edgein" {
  client_id = auth0_client.edgein.id

  authentication_method = "client_secret_post"
}