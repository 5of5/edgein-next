resource "aws_ssm_parameter" "db_name" {
  name        = "${local.path}/db/name"
  description = "Database name in RDS"
  type        = "SecureString"
  value       = var.db_name
}

resource "aws_ssm_parameter" "db_username" {
  name        = "${local.path}/db/username"
  description = "User name for root account in RDS"
  type        = "SecureString"
  value       = var.db_username
}

resource "aws_ssm_parameter" "db_password" {
  name        = "${local.path}/db/password"
  description = "User name for root account in RDS"
  type        = "SecureString"
  value       = var.db_password
}

resource "aws_ssm_parameter" "redis_uri" {
  name        = "${local.path}/redis/uri"
  description = "Redis connection URI"
  type        = "SecureString"
  value       = local.redis_uri
}