# Set up CloudWatch group and log stream and retain logs for 7 days
resource "aws_cloudwatch_log_group" "ecs" {
  name              = "${local.path}/ecs"
  retention_in_days = 7
}

resource "aws_cloudwatch_log_stream" "ecs" {
  name           = "hasura"
  log_group_name = aws_cloudwatch_log_group.ecs.name
}
