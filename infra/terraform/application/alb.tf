
resource "aws_lb" "edgein" {
  depends_on = [aws_internet_gateway.igw]

  name               = local.project_name
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb.id]
  subnets            = aws_subnet.public.*.id

  enable_deletion_protection = false
}

resource "aws_lb_target_group" "hasura" {
  name        = local.project_name
  target_type = "ip"
  port        = 8080
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id

  health_check {
    path     = local.hasura_path
    port     = local.hasura_port
    protocol = "HTTP"
    interval = 30
  }
}

resource "aws_lb_listener" "hasura" {
  load_balancer_arn = aws_lb.edgein.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"

  certificate_arn = aws_acm_certificate.ssl_certificate[0].arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.hasura.arn
  }
}
