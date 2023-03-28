variable "name" {
  
}

variable "pg_db_size" {
    default = "db-s-1vcpu-1gb"
}

variable "pg_db_nodes" {
    default = 1
}

variable "pg_secure" {
    default = true
}

variable "env" {

}

variable "digitalocean_kubernetes_cluster_id" {

}
