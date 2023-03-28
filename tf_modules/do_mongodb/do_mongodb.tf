resource "digitalocean_database_cluster" "mongodb" {
  name       = "${var.name}-${var.env}"
  engine     = "mongodb"
  version    = "4"
  size       = var.db_size
  region     = "sgp1"
  node_count = var.db_nodes
}


resource "digitalocean_database_firewall" "mongodb_fw" {
  count = var.secure ? 1 : 0
  depends_on = [
    digitalocean_database_cluster.mongodb
  ]
  cluster_id = digitalocean_database_cluster.mongodb.id
  rule {
    type  = "k8s"
    value = var.digitalocean_kubernetes_cluster_id
  }
}


