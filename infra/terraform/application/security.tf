# Traffic to the ECS cluster should only come from the ALB
resource "aws_security_group" "ecs_tasks" {
  name        = "${local.project_name}-ecs-tasks-security-group"
  description = "Allow inbound access from the ALB only"
  vpc_id      = data.terraform_remote_state.shared.outputs.aws_vpc_main.id

  ingress {
    protocol        = "tcp"
    from_port       = 0
    to_port         = 65535
    security_groups = [data.terraform_remote_state.shared.outputs.aws_security_group_lb.id]
  }

  egress {
    protocol         = "-1"
    from_port        = 0
    to_port          = 0
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}
