data "vercel_project" "edgein" {
  name = "edgein"
}

resource "random_password" "encryption_secret" {
  length  = 32
  special = false
}

resource "vercel_deployment" "edgein" {
  project_id = data.vercel_project.edgein.id
  ref        = var.vercel_commit

  production        = false
  delete_on_destroy = true

  environment = {
    AWS_BUCKET                   = aws_s3_bucket.assets.id
    AWS_BUCKET_REGION            = var.region
    AWS_BUCKET_ACCESS_KEY_ID     = aws_iam_access_key.assets.id
    AWS_BUCKET_SECRET_ACCESS_KEY = aws_iam_access_key.assets.secret
    AWS_SES_ACCESS_KEY_ID        = aws_iam_access_key.ses_user_key.id
    AWS_SES_ACCESS_SECRET_KEY    = aws_iam_access_key.ses_user_key.secret
    AWS_SES_REGION               = var.region
    ENCRYPTION_SECRET            = random_password.encryption_secret.result
    GRAPHQL_ENDPOINT             = local.hasura_graphql_endpoint
    HASURA_ADMIN_SECRET          = aws_ssm_parameter.hasura_admin_secret.value
    HASURA_JWT_SECRET            = aws_ssm_parameter.hasura_jwt_secret.value
    HASURA_SECRET                = aws_ssm_parameter.hasura_secret.value
    HASURA_API_VIEWER            = local.hasura_api_viewer
    HASURA_VIEWER                = local.hasura_viewer
    PG_CONNECTION_STRING         = local.db_url
    REDIS_CONNECTION_STRING      = data.terraform_remote_state.shared.outputs.redis_connection_string
  }
}
