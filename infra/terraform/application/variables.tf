variable "region" {
  type    = string
  default = "us-east-2"
}

variable "project" {
  type    = string
  default = "edgein"
}

# hasura server

variable "hasura_image" {
  type = string
  description = "Used hasura image"
  default = "hasura/graphql-engine:v2.29.1.ubuntu.arm64"
}

variable "hasura_log_types" {
  type = string
  description = "Allowed hasura logs"
  default = "startup, http-log, webhook-log, websocket-log, query-log"
}

variable "server_cpu" {
  type        = number
  description = "CPU setting for NextJS server task in Fargate"
  default     = 256
}

variable "server_memory" {
  type        = number
  description = "Memory setting for NextJS server task in Fargate"
  default     = 512
}

variable "server_max_capacity" {
  type        = number
  description = "Limit for horizontal scaling of NextJS server"
  default     = 5
}

# rds

variable "db_allocated_storage" {
  type    = number
  default = 20
}

variable "db_instance_class" {
  type    = string
  default = "db.t4g.micro"
}
