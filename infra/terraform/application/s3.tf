resource "aws_s3_bucket" "resources" {
  bucket        = local.project_name
  force_destroy = true

  tags = {
    Name = "Static Asset Bucket"
  }
}

resource "aws_s3_bucket_public_access_block" "resources" {
  bucket                  = aws_s3_bucket.resources.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_ownership_controls" "default" {
  bucket = aws_s3_bucket.resources.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "resources" {
  depends_on = [aws_s3_bucket_ownership_controls.default, aws_s3_bucket_public_access_block.resources]

  bucket = aws_s3_bucket.resources.id
  acl    = "private"
}
