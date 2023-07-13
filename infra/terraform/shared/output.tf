
output "aws_acm_certificate_root_arn" {
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

output "db_password" {
  value = aws_ssm_parameter.db_password.name
}

output "ses_domain_identity_arn" {
  value = aws_ses_domain_identity.edgein.arn
}

output "aws_subnet_public" {
  value = aws_subnet.public
}

output "aws_subnet_private" {
  value = aws_subnet.private
}

output "aws_subnet_database" {
  value = aws_subnet.database
}

output "aws_internet_gateway" {
  value = aws_internet_gateway.igw
}

output "aws_vpc_main" {
  value = aws_vpc.main
}

output "aws_cloudwatch_log_group_ecs" {
  value = aws_cloudwatch_log_group.ecs
}

output "aws_iam_role_edgein" {
  value = aws_iam_role.edgein
}

output "aws_ecs_cluster_edgein" {
  value = aws_ecs_cluster.edgein
}

output "aws_security_group_lb" {
  value = aws_security_group.lb
}

output "aws_lb_edgein" {
  value = aws_lb.edgein
}

output "aws_lb_listener_edgein" {
  value = aws_lb_listener.edgein
}