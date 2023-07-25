resource "aws_iam_user" "ses_full_access" {
  name = "${terraform.workspace}_ses_full_access_user"
  path = "${local.path}/"
}

resource "aws_iam_access_key" "ses_user_key" {
  user = aws_iam_user.ses_full_access.name
}

resource "aws_iam_user_policy" "ses_full_access" {
  name = "${var.project}_${terraform.workspace}_ses_full_access_policy"
  user = aws_iam_user.ses_full_access.name

  policy = <<-EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "ses:*",
        "Effect": "Allow",
        "Resource": "*"
      }
    ]
  }
  EOF
}

