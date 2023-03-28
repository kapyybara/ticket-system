
resource "helm_release" "keycloak" {

  name       = var.name
  namespace  = var.namespace
  repository = "https://codecentric.github.io/helm-charts"
  chart      = "keycloak"
  values = [
    "${file("../../tf_modules/keycloak/values.yaml")}"
  ]
  set {
    name  = "service.httpPort"
    value = var.port
  }
  set {
    name  = "postgresql.enabled"
    value = true
  }






  atomic = true
}
