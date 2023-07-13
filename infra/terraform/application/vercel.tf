data "vercel_project" "edgein" {
  name = "edgein"
}

data "vercel_project_directory" "edgein" {
  path = "../../"
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
    #AWS_BUCKET = "bar"
    #AWS_BUCKET_ACCESS_KEY_ID = ""
    #AWS_BUCKET_SECRET_ACCESS_KEY = ""
    AWS_SES_ACCESS_KEY_ID     = aws_iam_access_key.ses_user_key.id
    AWS_SES_ACCESS_SECRET_KEY = aws_iam_access_key.ses_user_key.secret
    ENCRYPTION_SECRET         = random_password.encryption_secret.result
    GRAPHQL_ENDPOINT          = "htts://${local.domain_name}/v1/graphql"
    HASURA_ADMIN_SECRET       = aws_ssm_parameter.hasura_admin_secret.value
    HASURA_JWT_SECRET         = aws_ssm_parameter.hasura_jwt_secret.value
    HASURA_SECRET             = aws_ssm_parameter.hasura_secret.value
    HASURA_API_VIEWER         = local.hasura_api_viewer
    HASURA_VIEWER             = local.hasura_viewer
    PG_DATABASE               = ""
    PG_HOST                   = aws_db_instance.main.address
    PG_PASSWORD               = data.aws_ssm_parameter.db_password.value
    PG_USER                   = data.aws_ssm_parameter.db_username.value
    REDIS_USER                = ""
  }
}
