// Main Terraform configuration for provisioning AWS RDS instances.
// Addresses requirement: Data Management - Technical Specification/5.10 Feature ID: F-010
// Description: Ensure secure and efficient management of all data within the application, including storage, retention, export, and archiving, in compliance with legal and tax requirements.

// Required provider configurations.
// External dependency: AWS provider version >= 3.0 from hashicorp/aws
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.0" // Specified in dependencies
    }
  }
}

resource "aws_db_instance" "db" {
  // Specifies the unique identifier for the RDS instance.
  // Variable defined in variables.tf as var.db_instance_identifier
  identifier = var.db_instance_identifier

  // Specifies the database engine to be used (e.g., mysql, postgres).
  // Variable defined in variables.tf as var.db_engine
  engine = var.db_engine

  // Specifies the compute and memory capacity of the DB instance.
  // Variable defined in variables.tf as var.db_instance_class
  instance_class = var.db_instance_class

  // The allocated storage in gibibytes.
  // Variable defined in variables.tf as var.allocated_storage
  allocated_storage = var.allocated_storage

  // Name of the DB subnet group to use for the RDS instance.
  // Variable defined in variables.tf as var.db_subnet_group_name
  db_subnet_group_name = var.db_subnet_group_name

  // List of VPC security groups to associate with this RDS instance.
  // Variable defined in variables.tf as var.vpc_security_group_ids
  vpc_security_group_ids = var.vpc_security_group_ids

  // Master username for the DB instance.
  // Variable defined in variables.tf as var.db_username
  username = var.db_username

  // Password for the master DB user. Should be stored securely.
  // Variable defined in variables.tf as var.db_password
  password = var.db_password

  // Name of the DB parameter group to associate with this instance.
  // Variable defined in variables.tf as var.parameter_group_name
  parameter_group_name = var.parameter_group_name

  // Enable storage encryption to protect data at rest.
  // Addresses TR-F010.1: Provide secure cloud storage for receipts and supporting documents.
  storage_encrypted = true

  // Enable automatic minor version upgrades to keep the database engine up to date.
  auto_minor_version_upgrade = true

  // Configure backup settings to ensure data retention and recovery.
  // Addresses TR-F010.5: Ensure data backup and recovery processes are in place.
  backup_retention_period = var.backup_retention_period // Number of days to retain backups.
  backup_window           = var.backup_window           // Daily backup window.

  // Define maintenance window for applying patches and upgrades.
  maintenance_window = var.maintenance_window

  // Enable Multi-AZ deployment for high availability and data redundancy.
  // Addresses TR-F010.6: Maintain data integrity and consistency across all modules.
  multi_az = var.multi_az

  // Enable deletion protection to prevent accidental deletion of the DB instance.
  // Addresses TR-F010.2: Implement data retention policies compliant with legal and tax requirements.
  deletion_protection = var.deletion_protection

  // Set publicly accessible to false to restrict access within the VPC.
  // Enhances security as per TR-F018.1: Implement end-to-end encryption for all data transmissions.
  publicly_accessible = false

  // Apply tags for resource identification and management.
  // Facilitates TR-F010.3: Enable data export capabilities for auditing purposes.
  tags = merge(
    var.tags,
    {
      Name        = var.db_instance_identifier
      Environment = var.environment
      Application = var.application
    }
  )
}