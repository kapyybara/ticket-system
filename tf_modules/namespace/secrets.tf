resource "kubernetes_secret" "gitlab-docker-secret" {
  metadata {
    name      = "gitlab-docker-secret"
    namespace = kubernetes_namespace.namespace.metadata[0].name
  }

  data = {
    ".dockerconfigjson" = jsonencode({
      auths = {
        "gitlab.inter-k.com:5050" = {
          auth = "${base64encode("${var.gitlab_registry_username}:${var.gitlab_registry_password}")}"
        }
      }
    })
  }
  type = "kubernetes.io/dockerconfigjson"

}
