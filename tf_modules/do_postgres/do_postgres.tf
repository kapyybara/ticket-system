resource "digitalocean_database_cluster" "postgres" {
  name       = "${var.name}-${var.env}"
  engine     = "pg"
  version    = "11"
  size       = var.pg_db_size
  region     = "sgp1"
  node_count = var.pg_db_nodes
}

resource "digitalocean_database_firewall" "postgres_fw" {
  count = var.pg_secure ? 1 : 0
  depends_on = [
    digitalocean_database_cluster.postgres
  ]
  cluster_id = digitalocean_database_cluster.postgres.id
  rule {
    type  = "k8s"
    value = var.digitalocean_kubernetes_cluster_id
  }
}


