output "s3_bucket_name" {
  description = "S3 bucket name"
  value       = aws_s3_bucket.hosting.bucket
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.main.id
}

output "cloudfront_domain_name" {
  description = "CloudFront domain name"
  value       = aws_cloudfront_distribution.main.domain_name
}

output "website_url" {
  description = "Website URL"
  value       = "https://act.nna1016.jp"
}
