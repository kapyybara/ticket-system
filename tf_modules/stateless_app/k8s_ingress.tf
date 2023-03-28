resource "kubernetes_ingress_v1" "ingress" {
  count = length(var.ingress_rules) > 0 ? 1 : 0

  metadata {
    name      = var.name
    namespace = var.namespace
    annotations = merge(
      {
        "kubernetes.io/ingress.class"           = "nginx",
        "nginx.ingress.kubernetes.io/use-regex" = "true"
        "nginx.org/mergeable-ingress-type"      = "minion"
      },
      var.ingress_advanced_config
    )
  }

  spec {
    dynamic "rule" {
      for_each = var.ingress_rules
      content {
        host = rule.key
        http {
          dynamic "path" {
            for_each = rule.value
            content {
              path = path.key
              backend {
                service {
                  name = kubernetes_service.service[0].metadata[0].name
                  port {
                    name = path.value
                  }
                }
              }
            }
          }
        }
      }
    }

  }


}
