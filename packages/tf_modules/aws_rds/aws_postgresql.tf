
resource "aws_db_instance" "postgres" {
  allocated_storage    = 10
  db_name              = var.name
  engine               = "postgresql"
  engine_version       = "13.7"
  instance_class       = "db.t3.micro"
  username             = var.username
  password             = var.password
  parameter_group_name = "default.postgresql13.7"
  skip_final_snapshot  = true
}
