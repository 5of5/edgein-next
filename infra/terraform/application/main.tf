locals {
  project_name = "${var.project}-${terraform.workspace}"
  path         = "/${var.project}/${terraform.workspace}"
  domain_name  = "${terraform.workspace}.${data.terraform_remote_state.shared.outputs.domain_name}"
  base_url     = "https://${local.domain_name}"
}

# Reference `shared` terraform state between environments
data "terraform_remote_state" "shared" {
  backend = "s3"
  config = {
    region = "us-east-2"
    bucket = "edgein-terraform-state"
    key    = "env:/production/edgein/shared.tfstate"
  }
}

