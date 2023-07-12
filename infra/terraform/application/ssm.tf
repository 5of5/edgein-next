
resource "aws_ssm_parameter" "db_password" {
  name        = "${local.path}/db/password/master"
  description = "The DB password"
  type        = "SecureString"
  value       = random_password.db_password.result
}

resource "aws_ssm_parameter" "db_url" {
  name  = "${local.path}/db/url"
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
  value       = random_password.hasura_jwt_secret.result
}

data "aws_ssm_parameter" "db_name" {
  name = data.terraform_remote_state.shared.outputs.db_name
}

data "aws_ssm_parameter" "db_username" {
  name = data.terraform_remote_state.shared.outputs.db_username
}
