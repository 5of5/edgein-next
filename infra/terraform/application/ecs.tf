locals {
  hasura_port             = 8080
  hasura_path             = "/healthz?strict=false"
  hasura_api_viewer       = "api_viewer"
  hasura_viewer           = "viewer"
  hasura_endpoint         = "https://${local.domain_name}"
  hasura_graphql_endpoint = "${local.hasura_endpoint}/v1/graphql"
}

resource "random_password" "hasura_admin_secret" {
  length  = 32
  special = false
}

resource "random_password" "hasura_secret" {
  length  = 32
  special = false
}

resource "random_password" "hasura_jwt_secret" {
  length  = 32
  special = false
}

locals {
  ecr_environment = [
    { name : "ENVIRONMENT", value : terraform.workspace },
    { name : "HASURA_API_VIEWER", value : local.hasura_api_viewer },
    { name : "HASURA_VIEWER", value : local.hasura_viewer },
    { name : "HASURA_GRAPHQL_ENABLE_CONSOLE", value : "true" },
    { name : "HASURA_GRAPHQL_ENABLED_LOG_TYPES", value : var.hasura_log_types }
  ]
  ecr_secrets = [
    { name : "HASURA_GRAPHQL_METADATA_DATABASE_URL", valueFrom : aws_ssm_parameter.db_uri.arn },
    { name : "HASURA_GRAPHQL_DATABASE_URL", valueFrom : aws_ssm_parameter.db_uri.arn },
    { name : "PG_DATABASE_URL", valueFrom : aws_ssm_parameter.db_uri.arn },
    { name : "HASURA_GRAPHQL_ADMIN_SECRET", valueFrom : aws_ssm_parameter.hasura_admin_secret.arn },
    { name : "HASURA_GRAPHQL_JWT_SECRET", valueFrom : aws_ssm_parameter.hasura_jwt_secret.arn },
    { name : "HASURA_SECRET", valueFrom : aws_ssm_parameter.hasura_secret.arn }
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
          "awslogs-group" : data.terraform_remote_state.shared.outputs.aws_cloudwatch_log_group_ecs.name,
          "awslogs-region" : var.region,
          "awslogs-stream-prefix" : "${terraform.workspace}-hasura"
        }
      },
      essential : true
    }
  ]
}

resource "aws_ecs_task_definition" "hasura" {
  family                   = "${local.project_name}-hasura"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.server_cpu
  memory                   = var.server_memory

  runtime_platform {
    cpu_architecture        = "ARM64"
    operating_system_family = "LINUX"
  }

  execution_role_arn = data.terraform_remote_state.shared.outputs.aws_iam_role_edgein.arn
  task_role_arn      = data.terraform_remote_state.shared.outputs.aws_iam_role_edgein.arn

  container_definitions = jsonencode(local.hasura_container_definition)
}

resource "aws_ecs_service" "hasura" {
  name                              = "${local.project_name}-hasura"
  cluster                           = data.terraform_remote_state.shared.outputs.aws_ecs_cluster_edgein.id
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
    subnets          = data.terraform_remote_state.shared.outputs.aws_subnet_private.*.id
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.hasura.arn
    container_name   = "hasura"
    container_port   = local.hasura_port
  }
}