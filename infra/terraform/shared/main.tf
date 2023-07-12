locals {
  path = "/${var.project}/shared"
}

data "aws_route53_zone" "domain" {
  name = "${var.domain_name}."
}

// certificate must be stored in us-east-1
provider "aws" {
  region = "us-east-1"
  alias  = "domain"
  # https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html
  default_tags {
    tags = {
      "Project"   = var.project
      "Workspace" = terraform.workspace
    }
  }
}

resource "aws_acm_certificate" "root" {
  provider = aws.domain

  domain_name       = var.domain_name
  validation_method = "DNS"

  subject_alternative_names = [
    "*.${var.domain_name}",
  ]
}

resource "aws_route53_record" "domain" {
  for_each = {
    for dvo in aws_acm_certificate.root.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.domain.zone_id
}

resource "aws_acm_certificate_validation" "domain" {
  provider = aws.domain

  certificate_arn         = aws_acm_certificate.root.arn
  validation_record_fqdns = [for record in aws_route53_record.domain : record.fqdn]
}
