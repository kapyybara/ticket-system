variable "name" {

}

variable "db_size" {
  default = "db-s-1vcpu-1gb"
}

variable "db_nodes" {
  default = 1
}

variable "secure" {
  default = true
}

variable "env" {

}

variable "digitalocean_kubernetes_cluster_id" {

}
