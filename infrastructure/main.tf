# Main Terraform configuration file for orchestrating the entire infrastructure setup, including VPC, EC2, RDS, and S3 modules.
# It integrates various modules and utilizes input variables to define and provision AWS resources.
# Addressing requirements for Scalability and Reliability, Data Management, and Secure Cloud Storage.

# Provider configuration
provider "aws" {
  # AWS provider configuration
  # Using AWS provider version >= 3.0
  # Provides AWS resources for infrastructure provisioning.
  # Dependency: external module 'hashicorp/aws' (version >= 3.0), as per dependencies in the assigned specification.
  # Purpose: Provision and manage AWS resources required for the application infrastructure.
  version = ">= 3.0"
  region  = var.aws_region   # AWS region specified in variables.tf
}

# Module: VPC
module "vpc" {
  # Sets up networking resources such as subnets, route tables, and internet gateways.
  # Utilizes the 'vpc' module defined in 'infrastructure/modules/vpc/main.tf'.
  # Parameters are passed through variables defined in 'infrastructure/variables.tf'.
  # Addresses requirement:
  # - Scalability and Reliability (Technical Specification/6.6 Scalability and Reliability)
  #   Ensures the infrastructure is scalable and reliable, supporting high availability and redundancy for application resources.

  source = "./modules/vpc"
  
  # Input variables for the VPC module
  vpc_cidr_block     = var.vpc_cidr_block      # CIDR block for the VPC
  availability_zones = var.availability_zones   # List of availability zones for high availability
}

# Module: EC2 Auto Scaling Group
module "ec2" {
  # Provisions EC2 instances within the specified VPC, using an Auto Scaling Group for scalability.
  # Utilizes the 'ec2' module defined in 'infrastructure/modules/ec2/main.tf'.
  # Parameters are passed through variables defined in 'infrastructure/variables.tf'.
  # Addresses requirement:
  # - Scalability and Reliability (Technical Specification/6.6 Scalability and Reliability)
  #   Ensures the infrastructure can handle varying loads without performance degradation.

  source = "./modules/ec2"
  
  # Input variables for the EC2 module
  ami                    = var.ami                   # AMI ID for the EC2 instances
  instance_type          = var.instance_type         # Instance type for EC2 instances
  subnet_ids             = module.vpc.public_subnets # List of subnet IDs for EC2 instances
  vpc_security_group_ids = [module.vpc.default_security_group_id] # Security group from VPC module
  min_size               = var.ec2_min_size          # Minimum number of instances in the ASG
  max_size               = var.ec2_max_size          # Maximum number of instances in the ASG
  desired_capacity       = var.ec2_desired_capacity  # Desired capacity of instances
}

# Module: RDS
module "rds" {
  # Provisions AWS RDS instances for database services with Multi-AZ deployment for high availability.
  # Utilizes the 'rds' module defined in 'infrastructure/modules/rds/main.tf'.
  # Parameters are passed through variables defined in 'infrastructure/variables.tf'.
  # Addresses requirements:
  # - Data Management (Technical Specification/5.10 Feature ID: F-010)
  #   Ensures secure and efficient management of all data within the application, including storage, retention, export, and archiving, in compliance with legal and tax requirements.
  # - Scalability and Reliability (Technical Specification/6.6 Scalability and Reliability)
  #   Ensures high availability and redundancy for database services.

  source = "./modules/rds"
  
  # Input variables for the RDS module
  db_instance_identifier  = var.db_instance_identifier # Identifier for the RDS instance
  db_engine               = var.db_engine              # Database engine (e.g., "postgres", "mysql")
  db_instance_class       = var.db_instance_class      # Instance class for RDS
  allocated_storage       = var.db_allocated_storage   # Allocated storage for RDS (in GB)
  multi_az                = var.db_multi_az            # Enable Multi-AZ deployment
  db_subnet_group         = module.vpc.db_subnet_group # Subnet group from VPC module
  vpc_security_group_ids  = [module.vpc.default_security_group_id] # Security group from VPC module
  backup_retention_period = var.db_backup_retention    # Backup retention period (in days)
}

# Module: S3
module "s3" {
  # Defines AWS S3 bucket resources for secure storage.
  # Utilizes the 's3' module defined in 'infrastructure/modules/s3/main.tf'.
  # Parameters are passed through variables defined in 'infrastructure/variables.tf'.
  # Addresses requirements:
  # - Secure Cloud Storage (Technical Specification/6.3.3 Data Storage)
  #   Utilizes AWS S3 for storing receipts, supporting documents, and other unstructured data securely with high durability.
  # - Data Management (Technical Specification/5.10 Feature ID: F-010)
  #   Ensures secure and efficient management of all data within the application.

  source = "./modules/s3"
  
  # Input variables for the S3 module
  bucket_name            = var.bucket_name         # Name of the S3 bucket
  versioning_enabled     = true                    # Enable versioning for data retention
  lifecycle_rules        = var.s3_lifecycle_rules  # Lifecycle rules for data retention and archiving
  server_side_encryption = var.s3_encryption       # Enable server-side encryption
  tags                   = var.common_tags         # Common tags for resources
}

# Outputs

# Output: VPC ID
output "vpc_id" {
  # The ID of the deployed VPC.
  # Accessible via 'module.vpc.vpc_id'.
  # Provides essential information for other configurations or external integrations.
  description = "The ID of the deployed VPC."
  value       = module.vpc.vpc_id
}

# Output: EC2 Auto Scaling Group Name
output "autoscaling_group_name" {
  # The name of the created EC2 Auto Scaling Group.
  # Accessible via 'module.ec2.autoscaling_group_name'.
  # Useful for monitoring and scaling configurations.
  description = "The name of the created EC2 Auto Scaling Group."
  value       = module.ec2.autoscaling_group_name
}

# Output: RDS Instance Endpoint
output "db_instance_endpoint" {
  # The connection endpoint for the RDS instance.
  # Accessible via 'module.rds.db_instance_endpoint'.
  # Required for the application to connect to the database.
  description = "The connection endpoint for the RDS instance."
  value       = module.rds.db_instance_endpoint
}

# Output: S3 Bucket ARN
output "bucket_arn" {
  # The ARN of the created S3 bucket.
  # Accessible via 'module.s3.bucket_arn'.
  # Used in application configuration for permissions and access settings.
  description = "The ARN of the created S3 bucket."
  value       = module.s3.bucket_arn
}