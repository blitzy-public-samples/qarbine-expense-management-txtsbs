# Module: AWS S3 Bucket Resource Definition
# This Terraform configuration defines an AWS S3 bucket resource using the specified variables for name, ACL, and tags.

# Requirement Addressed:
# Name: Secure Cloud Storage
# Location: Technical Specification Section 6.3.3 Data Storage
# Description: Utilizes AWS S3 for storing receipts, supporting documents, and other unstructured data securely with high durability.

# External Dependency:
# Provider 'hashicorp/aws' version '3.0.0' is required to use the 'aws_s3_bucket' resource.
# Purpose: To create and manage AWS S3 bucket resources.

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.0.0" # Version 3.0.0 specified as per external dependency.
    }
  }
}

resource "aws_s3_bucket" "this" {
  # Specifies the name of the S3 bucket using the 'bucket_name' variable.
  # Internal Dependency: 'bucket_name' variable from 'infrastructure/modules/s3/variables.tf'.
  # Purpose: To specify the name of the S3 bucket to be created.
  bucket = var.bucket_name

  # Sets the access control list (ACL) for the S3 bucket using the 'acl' variable.
  # Internal Dependency: 'acl' variable from 'infrastructure/modules/s3/variables.tf'.
  # Purpose: To define the access control list (ACL) for the S3 bucket.
  acl    = var.acl

  # Assigns tags to the S3 bucket for identification and management using the 'tags' variable.
  # Internal Dependency: 'tags' variable from 'infrastructure/modules/s3/variables.tf'.
  # Purpose: To assign tags to the S3 bucket for identification and management.
  tags   = var.tags

  # Additional configurations can be added here as required.
}

# Note: The outputs related to this resource are defined in 'outputs.tf' within the same module.
# Internal Dependencies:
# - Output 'bucket_id' provided in 'infrastructure/modules/s3/outputs.tf'.
#   Purpose: To provide the ID of the created S3 bucket.
# - Output 'bucket_arn' provided in 'infrastructure/modules/s3/outputs.tf'.
#   Purpose: To provide the ARN of the created S3 bucket.
# - Output 'bucket_domain_name' provided in 'infrastructure/modules/s3/outputs.tf'.
#   Purpose: To provide the domain name of the created S3 bucket.