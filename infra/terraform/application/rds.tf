locals {
  db_url = "postgres://${data.aws_ssm_parameter.db_username.value}:${random_password.db_password.result}@${aws_db_instance.main.endpoint}/${data.aws_ssm_parameter.db_name.value}"
}

resource "random_password" "db_password" {
  length  = 32
  special = false
}

resource "aws_db_subnet_group" "main" {
  description = "Database Subnet Group"
  subnet_ids  = aws_subnet.database.*.id
}

resource "aws_db_instance" "main" {
  allocated_storage   = var.db_allocated_storage
  db_name             = data.aws_ssm_parameter.db_name.value
  engine              = "postgres"
  instance_class      = var.db_instance_class
  username            = data.aws_ssm_parameter.db_username.value
  password            = random_password.db_password.result
  skip_final_snapshot = true
  publicly_accessible = true

  vpc_security_group_ids = [aws_security_group.ecs_tasks.id, aws_security_group.lb.id]
  db_subnet_group_name   = aws_db_subnet_group.main.id
}
