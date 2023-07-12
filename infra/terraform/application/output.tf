output "hasura_cluster_name" {
  value = aws_ecs_cluster.edgein.name
}

output "cdn_hostname" {
  value = aws_cloudfront_distribution.main.domain_name
}
