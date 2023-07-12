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