
resource "aws_lb_target_group" "hasura" {
  name        = local.project_name
  target_type = "ip"
  port        = 8080
  protocol    = "HTTP"
  vpc_id      = data.terraform_remote_state.shared.outputs.aws_vpc_main.id

  health_check {
    path     = local.hasura_path
    port     = local.hasura_port
    protocol = "HTTP"
    interval = 30
  }
}

resource "aws_lb_listener_rule" "hasura" {
  listener_arn = data.terraform_remote_state.shared.outputs.aws_lb_listener_edgein.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.hasura.arn
  }

  condition {
    host_header {
      values = [local.domain_name]
    }
  }
}
