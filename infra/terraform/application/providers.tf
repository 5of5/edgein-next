terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.7.0"
    }

    local = {
      source  = "hashicorp/local"
      version = "2.4.0"
    }

    null = {
      source  = "hashicorp/null"
      version = "3.2.1"
    }

    random = {
      source  = "hashicorp/random"
      version = "3.5.1"
    }

    vercel = {
      source  = "vercel/vercel"
      version = "0.14.0"
    }
  }

  backend "s3" {
    region         = "us-east-2"
    bucket         = "edgein-terraform-state"
    dynamodb_table = "edgein-terraform-state"
    kms_key_id     = "alias/edgein-terraform-state"
    encrypt        = true

    key = "edgein/application.tfstate"
  }
}

provider "aws" {
  region = var.region
  # https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html
  default_tags {
    tags = {
      "Project"   = var.project
      "Workspace" = terraform.workspace
    }
  }
}

data "aws_caller_identity" "current" {}

provider "vercel" {
  # Or omit this for the api_token to be read
  # from the VERCEL_API_TOKEN environment variable
  api_token = var.vercel_api_token

  # Optional default team for all resources
  team = "your_team_slug_or_id"
}
