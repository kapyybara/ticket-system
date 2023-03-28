
output "db_instance_status" {
  description = "The RDS instance status"
  value       = try(aws_db_instance.this[0].status, "")
}

output "db_instance_name" {
  description = "The database name"
  value       = try(aws_db_instance.this[0].db_name, "")
}

output "db_instance_username" {
  description = "The master username for the database"
  value       = try(aws_db_instance.this[0].username, "")
  sensitive   = true
}

output "db_instance_port" {
  description = "The database port"
  value       = try(aws_db_instance.this[0].port, "")
}
