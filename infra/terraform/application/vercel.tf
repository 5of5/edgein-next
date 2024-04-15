locals {
  vercel_alias = "${terraform.workspace}-edgein.vercel.app"
  vercel_url   = "https://${local.vercel_alias}"
}

data "vercel_project" "edgein" {
  name = "edgein"
}

data "auth0_client" "edgein" {
  client_id = local.project_name
}

resource "vercel_deployment" "edgein" {
  depends_on = [aws_ecs_service.hasura, data.auth0_client.edgein]

  project_id = data.vercel_project.edgein.id
  ref        = var.vercel_commit

  production        = false
  delete_on_destroy = true

  environment = {
    AWS_BUCKET                        = aws_s3_bucket.assets.id
    AWS_BUCKET_REGION                 = var.region
    AWS_BUCKET_ACCESS_KEY_ID          = aws_iam_access_key.assets.id
    AWS_BUCKET_SECRET_ACCESS_KEY      = aws_iam_access_key.assets.secret
    AWS_SES_ACCESS_KEY_ID             = aws_iam_access_key.ses_user_key.id
    AWS_SES_ACCESS_SECRET_KEY         = aws_iam_access_key.ses_user_key.secret
    AWS_SES_REGION                    = var.region
    SES_SOURCE                        = "EdgeIn Support <support@edgein.dev>"
    ENCRYPTION_SECRET                 = random_password.hasura_jwt_secret.result
    GRAPHQL_ENDPOINT                  = local.hasura_graphql_endpoint
    HASURA_ADMIN_SECRET               = aws_ssm_parameter.hasura_admin_secret.value
    HASURA_JWT_SECRET                 = aws_ssm_parameter.hasura_jwt_secret.value
    HASURA_SECRET                     = aws_ssm_parameter.hasura_secret.value
    HASURA_API_VIEWER                 = local.hasura_api_viewer
    HASURA_VIEWER                     = local.hasura_viewer
    PG_CONNECTION_STRING              = local.db_url
    REDIS_CONNECTION_STRING           = data.terraform_remote_state.shared.outputs.redis_connection_string
    AUTH0_MANAGEMENT_CLIENT_ID        = var.auth0_client_id
    AUTH0_MANAGEMENT_CLIENT_SECRET    = var.auth0_client_secret
    AUTH0_MANAGEMENT_DOMAIN           = var.auth0_domain
    AUTH0_CLIENT_SECRET               = data.auth0_client.edgein.client_secret
    NEXT_PUBLIC_AUTH0_CLIENT_ID       = auth0_client.edgein.client_id
    NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL = "https://${var.auth0_domain}"
    NEXT_PUBLIC_AUTH0_REDIRECT_URL    = local.vercel_url
  }
}

resource "vercel_alias" "edgein" {
  alias         = local.vercel_alias
  deployment_id = vercel_deployment.edgein.id
}