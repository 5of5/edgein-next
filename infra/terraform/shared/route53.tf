data "aws_route53_zone" "edgein" {
  name = "${var.domain_name}."
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

resource "aws_acm_certificate" "alb" {
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

resource "aws_route53_record" "edgein_amazonses_dkim_record" {
  count   = 3
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = "${aws_ses_domain_dkim.edgein.dkim_tokens[count.index]}._domainkey"
  type    = "CNAME"
  ttl     = "600"
  records = ["${aws_ses_domain_dkim.edgein.dkim_tokens[count.index]}.dkim.amazonses.com"]
}

resource "aws_route53_record" "example_ses_domain_mail_from_mx" {
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = aws_ses_domain_mail_from.edgein.mail_from_domain
  type    = "MX"
  ttl     = "600"
  records = ["10 feedback-smtp.${var.region}.amazonses.com"]
}

# Example Route53 TXT record for SPF
resource "aws_route53_record" "edgein_ses_domain_mail_from_txt" {
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = aws_ses_domain_mail_from.edgein.mail_from_domain
  type    = "TXT"
  ttl     = "600"
  records = ["v=spf1 include:amazonses.com -all"]
}

resource "aws_route53_record" "edgein_amazonses_verification_record" {
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = "_amazonses.${aws_ses_domain_identity.edgein.id}"
  type    = "TXT"
  ttl     = "600"
  records = [aws_ses_domain_identity.edgein.verification_token]
}

resource "aws_route53_record" "cloudfront" {
  zone_id = data.aws_route53_zone.edgein.zone_id
  name    = local.cdn_hostname
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "redis" {
  zone_id = data.aws_route53_zone.edgein.zone_id
  name    = local.redis_hostname
  ttl = "600"
  type    = "A"
  records = [aws_instance.redis.public_ip]
}