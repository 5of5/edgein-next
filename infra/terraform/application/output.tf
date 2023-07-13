output "domain" {
  value = local.domain_name
}

output "hasura_endpoint" {
  value = local.hasura_endpoint
}

output "hasura_admin_secrete_ssm_path" {
  value = aws_ssm_parameter.hasura_admin_secret.name
}