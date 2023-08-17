# Application

![Diagram](./infrastructure.drawio.png)

# Shared

Manage shared Terraform resources between workspaces.

# How to use

All shared resources should be created in the `staging` workspace.

## Initialize S3-backend

```shell
cd s3-backend
terraform init
terraform workspace new staging
terraform apply
```

## Create shared workspace

```shell
cd shared
terraform init
terraform workspace new staging
terraform apply
```

## How to use setup new workspace

```shell
cd application
terraform init
terraform workspace new staging
```

Now, you can run the deployment workflow in GitHub.
