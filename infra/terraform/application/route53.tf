
data "aws_route53_zone" "edgein" {
  name = "${data.terraform_remote_state.shared.outputs.domain_name}."
}


resource "aws_acm_certificate" "ssl_certificate" {

  domain_name       = local.domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "domain" {
  for_each = {
    for dvo in aws_acm_certificate.ssl_certificate[0].domain_validation_options : dvo.domain_name => {
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
  zone_id         = data.aws_route53_zone.edgein[0].zone_id
}

resource "aws_acm_certificate_validation" "edgein" {
  certificate_arn         = aws_acm_certificate.ssl_certificate[0].arn
  validation_record_fqdns = [for record in aws_route53_record.domain : record.fqdn]
}

resource "aws_route53_record" "alb" {

  zone_id = data.aws_route53_zone.edgein[0].zone_id
  name    = local.domain_name
  type    = "A"

  alias {
    name                   = aws_lb.edgein.dns_name
    zone_id                = aws_lb.edgein.zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "cloudfront" {
  zone_id = data.aws_route53_zone.edgein.zone_id
  name    = "cdn-${local.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.main.domain_name
    zone_id                = aws_cloudfront_distribution.main.hosted_zone_id
    evaluate_target_health = false
  }
}