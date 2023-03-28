resource "cloudflare_record" "record" {
  zone_id = "d0497133bee9619d54aae2c48ca5d972"
  name    = var.domain
  value   = data.kubernetes_service.nginx_ingress.status[0].load_balancer[0].ingress[0].ip
  type    = "A"
  ttl     = 300
}
