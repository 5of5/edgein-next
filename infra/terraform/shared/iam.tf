
# ecr

data "aws_iam_policy_document" "assume_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "ssm_policy" {
  statement {
    actions = ["ssm:GetParameter", "ssm:GetParameters"]

    resources = ["*"]
  }
}

data "aws_iam_policy_document" "ses_policy" {
  statement {
    actions = ["SES:SendEmail", "SES:SendRawEmail"]

    resources = [aws_ses_domain_identity.edgein.arn]
  }
}

resource "aws_iam_policy" "ssm_policy" {
  name   = "ssm_fargate_policy_${terraform.workspace}"
  path   = "${local.path}/"
  policy = data.aws_iam_policy_document.ssm_policy.json
}

resource "aws_iam_policy" "ses_policy" {
  name   = "ses_fargate_policy_${terraform.workspace}"
  path   = "${local.path}/"
  policy = data.aws_iam_policy_document.ses_policy.json
}

resource "aws_iam_role" "edgein" {
  name               = "execution_role_${terraform.workspace}"
  path               = "${local.path}/"
  assume_role_policy = data.aws_iam_policy_document.assume_policy.json
}

resource "aws_iam_role_policy_attachment" "ssm_policy" {
  role       = aws_iam_role.edgein.name
  policy_arn = aws_iam_policy.ssm_policy.arn
}

resource "aws_iam_role_policy_attachment" "ses_policy" {
  role       = aws_iam_role.edgein.name
  policy_arn = aws_iam_policy.ses_policy.arn
}

# ECS task execution role policy attachment
resource "aws_iam_role_policy_attachment" "ecs_task_execution_role" {
  role       = aws_iam_role.edgein.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
