resource "aws_ssm_parameter" "db_uri" {
  name  = "${local.path}/db/uri"
  type  = "SecureString"
  value = local.db_url
}

resource "aws_ssm_parameter" "hasura_admin_secret" {
  name        = "${local.path}/hasura/secrets/admin"
  description = "The hasura admin secret"
  type        = "SecureString"
  value       = random_password.hasura_admin_secret.result
}

resource "aws_ssm_parameter" "hasura_jwt_secret" {
  name        = "${local.path}/hasura/secrets/jwt"
  description = "The hasura jwt secret"
  type        = "SecureString"
  value = jsonencode({
    type = "HS256",
    key  = random_password.hasura_jwt_secret.result
  })
}

data "aws_ssm_parameter" "db_name" {
  name = data.terraform_remote_state.shared.outputs.db_name
}

data "aws_ssm_parameter" "db_username" {
  name = data.terraform_remote_state.shared.outputs.db_username
}

data "aws_ssm_parameter" "db_password" {
  name = data.terraform_remote_state.shared.outputs.db_password
}
