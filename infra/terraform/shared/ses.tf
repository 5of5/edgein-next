resource "aws_ses_configuration_set" "edgein" {
  name = "${var.project}-configuration-set-test"
}

resource "aws_ses_domain_identity" "edgein" {
  domain = var.domain_name
}

resource "aws_ses_domain_mail_from" "edgein" {
  domain           = aws_ses_domain_identity.edgein.domain
  mail_from_domain = "mail.${aws_ses_domain_identity.edgein.domain}"
}

resource "aws_ses_domain_dkim" "edgein" {
  domain = aws_ses_domain_identity.edgein.domain
}

resource "aws_ses_domain_identity_verification" "edgein_verification" {
  domain = aws_ses_domain_identity.edgein.id

  depends_on = [aws_route53_record.edgein_amazonses_verification_record]
}

resource "aws_ses_event_destination" "cloudwatch" {
  name                   = "${var.project}-event-destination-cloudwatch"
  configuration_set_name = aws_ses_configuration_set.edgein.name
  enabled                = true
  matching_types         = ["bounce", "send"]

  cloudwatch_destination {
    default_value  = "default"
    dimension_name = "dimension"
    value_source   = "emailHeader"
  }
}

data "aws_iam_policy_document" "mail" {
  statement {
    actions   = ["SES:SendEmail", "SES:SendRawEmail"]
    resources = [aws_ses_domain_identity.edgein.arn]

    principals {
      identifiers = ["*"]
      type        = "AWS"
    }
  }
}

resource "aws_ses_identity_policy" "mail" {
  identity = aws_ses_domain_identity.edgein.arn
  name     = "${var.project}-ses"
  policy   = data.aws_iam_policy_document.mail.json
}