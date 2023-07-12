
output "certificate_arn" {
  value       = aws_acm_certificate.root.arn
  description = "The ARN of the certificate."
}

output "domain_name" {
  value       = var.domain_name
  description = "Fully qualified domain name."
}

output "db_name" {
  value = aws_ssm_parameter.db_name.name
}

output "db_username" {
  value = aws_ssm_parameter.db_username.name
}