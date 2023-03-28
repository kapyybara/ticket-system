data "kubernetes_service" "nginx_ingress" {
  metadata {
    name = "nginx-ingress-nginx-ingress"
    namespace = "ingress-controllers"
  }
}