variable "region" {
  type    = string
  default = "us-east-2"
}

variable "project" {
  type    = string
  default = "edgein"
}

variable "domain_name" {
  type    = string
  default = "edgeindev.com"
}

# rds

variable "db_name" {
  type        = string
  description = "Database name in RDS. Only alphanumeric."
  default     = "edgedb"
}

variable "db_username" {
  type        = string
  description = "User name for root account in RDS"
  default     = "postgres"
}

variable "db_password" {
  type        = string
  description = "Password for root account in RDS"
}