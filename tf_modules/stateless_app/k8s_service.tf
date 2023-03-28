resource "kubernetes_service" "service" {
  count = length(var.ports) > 0 ? 1 : 0

  metadata {
    name      = var.name
    namespace = var.namespace
  }
  spec {
    selector = {
      service = var.name
    }
    type = "ClusterIP"

    dynamic "port" {
      for_each = var.ports
      content {
        name        = port.key
        port        = port.value
        target_port = port.value
      }
    }
  }
}
