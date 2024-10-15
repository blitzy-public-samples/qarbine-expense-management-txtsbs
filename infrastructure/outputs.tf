# Outputs for the entire Terraform infrastructure setup.
# This file aggregates and defines output values for essential resources such as VPC IDs, EC2 instance IDs, RDS endpoints, and S3 bucket IDs.

# Dependencies:
# - Internal Modules:
#   - module.vpc (infrastructure/modules/vpc/outputs.tf): Provides the ID of the created VPC.
#   - module.ec2 (infrastructure/modules/ec2/outputs.tf): Outputs the ID of the created EC2 instance.
#   - module.rds (infrastructure/modules/rds/outputs.tf): Provides the connection endpoint for the RDS instance.
#   - module.s3 (infrastructure/modules/s3/outputs.tf): The ID of the created S3 bucket.
# - External Dependencies:
#   - hashicorp/aws (version >= 3.0) # Provides AWS resources for infrastructure provisioning.

# Requirements Addressed:
# - Scalability and Reliability (Technical Specification/6.6 Scalability and Reliability)
#   Ensures the infrastructure is scalable and reliable, supporting high availability and redundancy for application resources.
# - Data Management (Technical Specification/5.10 Feature ID: F-010)
#   Ensures secure and efficient management of all data within the application, including storage, retention, export, and archiving, in compliance with legal and tax requirements.
# - Secure Cloud Storage (Technical Specification/6.3.3 Data Storage)
#   Utilizes AWS S3 for storing receipts, supporting documents, and other unstructured data securely with high durability.

# Output the ID of the deployed VPC.
output "vpc_id" {
  description = "The ID of the deployed VPC."
  value       = module.vpc.vpc_id

  # Requirement Addressed:
  # - Scalability and Reliability (Technical Specification/6.6 Scalability and Reliability)
  #   Provides the VPC ID, facilitating management of network resources to ensure high availability and redundancy.
}

# Output the ID of the created EC2 instance.
output "instance_id" {
  description = "Outputs the ID of the created EC2 instance."
  value       = module.ec2.instance_id

  # Requirement Addressed:
  # - Scalability and Reliability (Technical Specification/6.6 Scalability and Reliability)
  #   Provides the EC2 instance ID for scaling and management purposes.
}

# Output the connection endpoint for the RDS instance.
output "db_instance_endpoint" {
  description = "The connection endpoint for the RDS instance."
  value       = module.rds.db_instance_endpoint

  # Requirement Addressed:
  # - Data Management (Technical Specification/5.10 Feature ID: F-010)
  #   Facilitates secure and efficient management of data by providing the RDS endpoint for database connections.
}

# Output the ID of the created S3 bucket.
output "bucket_id" {
  description = "The ID of the created S3 bucket."
  value       = module.s3.bucket_id

  # Requirement Addressed:
  # - Secure Cloud Storage (Technical Specification/6.3.3 Data Storage)
  #   Provides the S3 bucket ID used for securely storing receipts and unstructured data with high durability.
}