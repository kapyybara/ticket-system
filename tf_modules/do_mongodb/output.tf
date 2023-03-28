output "urn" {
  value       = digitalocean_database_cluster.mongodb.urn
  description = "urn mongodb"
}
output "cluster_id" {
  value       = digitalocean_database_cluster.mongodb.id
  description = "cluser id"
}

output "db_username" {
  value       = digitalocean_database_cluster.mongodb.user
  description = "database username"
}
output "db_password" {
  value       = digitalocean_database_cluster.mongodb.password
  description = "database password"
  sensitive   = true
}

output "db_name" {
  value       = digitalocean_database_cluster.mongodb.database
  description = "database name"

}
