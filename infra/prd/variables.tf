variable "project_name" {
  description = "Project name"
  type        = string
  default     = "graduation-movie"
}

variable "environment" {
  description = "Environment"
  type        = string
  default     = "prd"
}

locals {
  bucket_name = "${var.project_name}-${var.environment}-hosting"

  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}
