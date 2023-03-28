variable "name" {
  type = string
}

variable "namespace" {
  type = string
}

variable "replicas" {
  type    = number
  default = 1
}

variable "port" {
  type = number
}

variable "runtime_env" {
  type    = map(any)
  default = {}
}

variable "secrets" {
  type    = map(any)
  default = {}
}




variable "ingress_rules" {
  type    = map(any)
  default = {}
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

