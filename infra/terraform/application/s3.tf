resource "aws_s3_bucket" "assets" {
  bucket = "${local.project_name}-assets"

  force_destroy = true
}


resource "aws_s3_bucket_ownership_controls" "assets" {
  bucket = aws_s3_bucket.assets.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "assets" {
  bucket = aws_s3_bucket.assets.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "assets" {
  depends_on = [aws_s3_bucket_ownership_controls.assets, aws_s3_bucket_public_access_block.assets]

  bucket = aws_s3_bucket.assets.id
  acl    = "public-read"
}

resource "aws_iam_user" "assets" {
  name = "assets_access_user"
  path = "${local.path}/"
}

resource "aws_iam_access_key" "assets" {
  user = aws_iam_user.assets.name
}

resource "aws_iam_user_policy" "assets" {
  name = "${var.project}_${terraform.workspace}_assets_access_policy"
  user = aws_iam_user.assets.name

  policy = <<-EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "s3:*",
        "Effect": "Allow",
        "Resource": "${aws_s3_bucket.assets.arn}*"
      }
    ]
  }
  EOF
}