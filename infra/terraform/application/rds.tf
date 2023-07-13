locals {
  db_url = "postgres://${data.aws_ssm_parameter.db_username.value}:${data.aws_ssm_parameter.db_password.value}@${aws_db_instance.main.endpoint}"
}

resource "aws_db_subnet_group" "main" {
  description = "Database Subnet Group"
  subnet_ids  = data.terraform_remote_state.shared.outputs.aws_subnet_database.*.id
}

data "aws_db_snapshot" "latest" {
  most_recent            = true
  db_instance_identifier = var.prod_db_identifier
}

resource "aws_db_instance" "main" {
  identifier          = local.project_name
  snapshot_identifier = data.aws_db_snapshot.latest.id

  allocated_storage   = var.db_allocated_storage
  engine              = "postgres"
  instance_class      = var.db_instance_class
  username            = data.aws_ssm_parameter.db_username.value
  password            = data.aws_ssm_parameter.db_password.value
  skip_final_snapshot = true
  publicly_accessible = true
  apply_immediately   = true

  vpc_security_group_ids = [aws_security_group.ecs_tasks.id, data.terraform_remote_state.shared.outputs.aws_security_group_lb.id]
  db_subnet_group_name   = aws_db_subnet_group.main.id
}
