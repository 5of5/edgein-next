data "aws_route53_zone" "edgein" {
  name = "${data.terraform_remote_state.shared.outputs.domain_name}."
}

resource "aws_route53_record" "alb" {

  zone_id = data.aws_route53_zone.edgein.zone_id
  name    = local.domain_name
  type    = "A"

  alias {
    name                   = data.terraform_remote_state.shared.outputs.aws_lb_edgein.dns_name
    zone_id                = data.terraform_remote_state.shared.outputs.aws_lb_edgein.zone_id
    evaluate_target_health = false
  }
}