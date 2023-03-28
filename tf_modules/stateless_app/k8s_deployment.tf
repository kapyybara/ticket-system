
resource "kubernetes_deployment" "deployemnt" {

  metadata {
    name      = var.name
    namespace = var.namespace
    labels = {
      service = var.name
    }
  }

  spec {

    replicas = var.replicas

    selector {
      match_labels = {
        service = var.name
      }
    }
    strategy {
      rolling_update {
        max_surge       = 2
        max_unavailable = 1
      }

    }

    template {
      metadata {
        labels = {
          service = var.name
        }
      }

      spec {
        container {
          image = var.docker_image
          name  = var.name

          dynamic "env_from" {
            for_each = length(var.runtime_env) > 0 ? [1] : []
            content {
              config_map_ref {
                name = kubernetes_config_map.config_map[0].metadata[0].name
              }
            }
          }

          dynamic "env" {
            for_each = var.secrets
            content {
              name = env.key
              value_from {
                secret_key_ref {
                  name = join(".", slice(split(".", env.value), 0, length(split(".", env.value)) - 1))
                  key  = element(split(".", env.value), length(split(".", env.value)) - 1)
                }
              }
            }
          }
          image_pull_policy = "Always"
          command           = var.commands
          args              = var.args



        }

        image_pull_secrets {
          name = var.img_pull_secret
        }


      }
    }
  }
}
