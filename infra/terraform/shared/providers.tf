
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.7.0"
    }

    random = {
      source  = "hashicorp/random"
      version = "3.5.1"
    }
  }

  backend "s3" {
    region         = "us-east-2"
    bucket         = "edgein-terraform-state"
    dynamodb_table = "edgein-terraform-state"
    kms_key_id     = "alias/edgein-terraform-state"
    encrypt        = true

    key = "edgein/shared.tfstate"
  }
}

provider "aws" {
  region = var.region
  # https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html
  default_tags {
    tags = {
      "Project"   = var.project
      "Workspace" = "shared"
    }
  }
}

data "aws_caller_identity" "current" {}
