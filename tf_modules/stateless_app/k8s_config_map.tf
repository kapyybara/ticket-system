
resource "kubernetes_config_map" "config_map" {
  count = length(var.runtime_env) > 0 ? 1 : 0
  metadata {
    name      = "${var.name}-env"
    namespace = var.namespace

  }

  data = var.runtime_env
}

