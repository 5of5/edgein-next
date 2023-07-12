locals {
  hasura_port = 8080
  hasura_path = "/healthz?strict=false"
}

resource "aws_ecs_cluster" "edgein" {
  name = local.project_name

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  configuration {
    execute_command_configuration {
      logging = "OVERRIDE"

      log_configuration {
        cloud_watch_log_group_name = aws_cloudwatch_log_group.hasura.name
      }
    }
  }
}

resource "aws_ecs_cluster_capacity_providers" "hasura" {
  cluster_name = aws_ecs_cluster.edgein.name

  capacity_providers = ["FARGATE", "FARGATE_SPOT"]

  default_capacity_provider_strategy {
    base              = 1
    weight            = 10
    capacity_provider = "FARGATE"
  }
}

resource "random_password" "hasura_admin_secret" {
  length  = 32
  special = false
}

resource "random_password" "hasura_jwt_secret" {
  length  = 32
  special = false
}

locals {
  ecr_environment = [
    { name : "AWS_S3_RESOURCES_BUCKET", value : aws_s3_bucket.resources.bucket },
    { name : "ENVIRONMENT", value : terraform.workspace },
    { name : "HASURA_GRAPHQL_ENABLE_CONSOLE", value : "true" },
    { name : "HASURA_GRAPHQL_ENABLED_LOG_TYPES", value : var.hasura_log_types }
  ]
  ecr_secrets = [
    { name : "HASURA_GRAPHQL_METADATA_DATABASE_URL", valueFrom : aws_ssm_parameter.db_url.arn },
    { name : "PG_DATABASE_URL", valueFrom : aws_ssm_parameter.db_url.arn },
    { name : "HASURA_GRAPHQL_ADMIN_SECRET", valueFrom : aws_ssm_parameter.hasura_admin_secret.arn },
    { name : "HASURA_GRAPHQL_JWT_SECRET", valueFrom : aws_ssm_parameter.hasura_jwt_secret.arn }
  ]
  hasura_container_definition = [
    {
      name : "hasura",
      image : var.hasura_image,
      cpu : var.server_cpu,
      memory : var.server_memory,
      portMappings : [
        {
          containerPort : local.hasura_port,
          protocol : "tcp"
        }
      ],
      healthCheck : {
        command : [
          "CMD-SHELL",
          "curl -f http://127.0.0.1:${local.hasura_port}${local.hasura_path} || exit 1"
        ],
        interval : 30,
        timeout : 5,
        retries : 3,
        startPeriod : 60
      },
      environment : local.ecr_environment,
      secrets : local.ecr_secrets,
      logConfiguration : {
        logDriver : "awslogs",
        options : {
          "awslogs-group" : aws_cloudwatch_log_group.hasura.name,
          "awslogs-region" : var.region,
          "awslogs-stream-prefix" : "hasura"
        }
      },
      essential : true
    }
  ]
}

resource "aws_ecs_task_definition" "hasura" {
  family                   = "hasura"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.server_cpu
  memory                   = var.server_memory

  execution_role_arn = aws_iam_role.edgein.arn
  task_role_arn      = aws_iam_role.edgein.arn

  container_definitions = jsonencode(local.hasura_container_definition)
}

resource "aws_ecs_service" "hasura" {
  name                              = "hasura"
  cluster                           = aws_ecs_cluster.edgein.id
  task_definition                   = aws_ecs_task_definition.hasura.arn
  desired_count                     = 1
  health_check_grace_period_seconds = 30
  wait_for_steady_state             = true

  capacity_provider_strategy {
    capacity_provider = "FARGATE"
    base              = 1
    weight            = 10
  }

  deployment_circuit_breaker {
    enable   = false
    rollback = false
  }

  deployment_controller {
    type = "ECS"
  }

  network_configuration {
    subnets          =  aws_subnet.private.*.id
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.hasura.arn
    container_name   = "hasura"
    container_port   = local.hasura_port
  }

  depends_on = [aws_lb_listener.hasura, aws_iam_role_policy_attachment.ecs_task_execution_role]
}
