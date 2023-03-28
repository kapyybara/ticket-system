resource "kubernetes_ingress_v1" "ingress" {
  metadata {
    name      = "ingress-master-${var.master_name}"
    namespace = var.namespace
    annotations = {
      "kubernetes.io/ingress.class"      = "nginx"
      "nginx.org/mergeable-ingress-type" = "master"
      "cert-manager.io/cluster-issuer"   = "letsencrypt"
    }
  }

  spec {
    tls {
      secret_name = "${var.domain}-ssl-cert"
      #secret_name = "letsencrypt-prod"
      hosts = [var.domain]
    }
    rule {
      host = var.domain
    }
  }
}
