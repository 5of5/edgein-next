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
  default = "edgein.dev"
}

# rds

variable "db_name" {
  type        = string
  description = "Database name in RDS. Only alphanumeric."
  default     = "edgein"
}

variable "db_username" {
  type        = string
  description = "User name for root account in RDS"
  default     = "root"
}