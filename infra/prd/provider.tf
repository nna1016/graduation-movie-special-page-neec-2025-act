terraform {
  required_version = ">= 1.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket  = "graduation-movie-tfstate"
    key     = "prd/terraform.tfstate"
    region  = "ap-northeast-1"
    encrypt = true
  }
}

provider "aws" {
  region                   = "ap-northeast-1"
  shared_credentials_files = ["${path.module}/aws_credentials"]
  profile                  = "default"
}

provider "aws" {
  alias                    = "virginia"
  region                   = "us-east-1"
  shared_credentials_files = ["${path.module}/aws_credentials"]
  profile                  = "default"
}
