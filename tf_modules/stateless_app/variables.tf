variable "name" {
  type = string
}

variable "namespace" {
  type = string
}

variable "docker_image" {
  type = string
}

variable "replicas" {
  type    = number
  default = 1
}

variable "ports" {
  type    = map(number)
  default = {}
}

variable "runtime_env" {
  type    = map(any)
  default = {}
}

variable "secrets" {
  type    = map(any)
  default = {}
  # Example:
  # {
  #   "DB_PASSWORD": "fidt-sales.secret.key"
  # }
}



variable "img_pull_secret" {
  default = "gitlab-docker-secret"
}


variable "ingress_rules" {
  type    = map(any)
  default = {}
  # Example
  # {
  #   "dev.fidt.vn" = {
  #     "/" = "http"
  #     "/ws" = "ws"
  #   }
  # }
}

variable "ingress_advanced_config" {
  type    = map(string)
  default = {}
  # Ref: https://docs.nginx.com/nginx-ingress-controller/configuration/ingress-resources/advanced-configuration-with-annotations/
  # Example
  # {
  #   "nginx.org/proxy-connect-timeout" = "30s"
  #   "nginx.org/proxy-read-timeout" = "20s"
  # }
}
variable "commands" {
  type    = list(string)
  default = []
}
variable "args" {
  type    = list(string)
  default = []
}

