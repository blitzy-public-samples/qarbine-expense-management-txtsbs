terraform {
  required_version = ">= 0.12"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.0" # External dependency: hashicorp/aws module (version >= 3.0)
    }
  }
}

# Variable: db_instance_identifier
# Description: The identifier for the RDS instance.
# This variable uniquely identifies the RDS database instance.
# Requirement Addressed:
# - Ensures unique identification and management of data storage resources.
# Technical Specification/5.10 Feature ID: F-010
variable "db_instance_identifier" {
  description = "The identifier for the RDS instance."
  type        = string
}

# Variable: db_engine
# Description: The database engine to use (e.g., postgres, mysql).
# This variable specifies the type of database engine for the RDS instance, allowing compatibility with application requirements.
# Requirement Addressed:
# - Supports secure and efficient data management by selecting appropriate database engines.
# Technical Specification/5.10 Feature ID: F-010
variable "db_engine" {
  description = "The database engine to use (e.g., postgres, mysql)."
  type        = string
}

# Variable: db_instance_class
# Description: The instance class for the RDS instance (e.g., db.t2.micro).
# Determines the computational and memory capacity of the RDS instance.
# Requirement Addressed:
# - Ensures efficient data management by selecting appropriate resources for database performance.
# Technical Specification/5.10 Feature ID: F-010
variable "db_instance_class" {
  description = "The instance class for the RDS instance (e.g., db.t2.micro)."
  type        = string
}

# Variable: allocated_storage
# Description: The allocated storage size in gigabytes.
# Specifies the storage capacity allocated for the RDS instance.
# Requirement Addressed:
# - Manages data storage allocation in compliance with data management policies.
# - Supports TR-F010.5: Ensure data backup and recovery processes are in place.
# Technical Specification/5.10 Feature ID: F-010
variable "allocated_storage" {
  description = "The allocated storage size in gigabytes."
  type        = number
}

# Variable: db_subnet_group_name
# Description: The name of the DB subnet group to associate with the RDS instance.
# Determines the network subnet group for the RDS instance for secure network configuration.
# Requirement Addressed:
# - Ensures secure data management by placing the database in appropriate subnets.
# Technical Specification/5.10 Feature ID: F-010
variable "db_subnet_group_name" {
  description = "The name of the DB subnet group to associate with the RDS instance."
  type        = string
}

# Variable: vpc_security_group_ids
# Description: A list of VPC security group IDs to associate with the RDS instance.
# Controls network access to the RDS instance by associating security groups.
# Requirement Addressed:
# - Enhances data security as per data management policies.
# Technical Specification/5.10 Feature ID: F-010
variable "vpc_security_group_ids" {
  description = "A list of VPC security group IDs to associate with the RDS instance."
  type        = list(string)
}

# Variable: db_username
# Description: The master username for the RDS instance.
# Sets the database administrator username.
# Requirement Addressed:
# - Securely manages database access credentials.
# Technical Specification/5.10 Feature ID: F-010
variable "db_username" {
  description = "The master username for the RDS instance."
  type        = string
}

# Variable: db_password
# Description: The master password for the RDS instance.
# Sets the database administrator password.
# Requirement Addressed:
# - Securely manages database access credentials.
# Technical Specification/5.10 Feature ID: F-010
variable "db_password" {
  description = "The master password for the RDS instance."
  type        = string
  sensitive   = true
}

# Variable: parameter_group_name
# Description: The name of the DB parameter group to associate with the RDS instance.
# Sets the parameter group defining database configurations.
# Requirement Addressed:
# - Allows customization of database parameters for efficient data management.
# Technical Specification/5.10 Feature ID: F-010
variable "parameter_group_name" {
  description = "The name of the DB parameter group to associate with the RDS instance."
  type        = string
}

# Variable: backup_retention_period
# Description: The number of days to retain automated backups.
# Supports data backup and recovery processes.
# Requirement Addressed:
# - TR-F010.5: Ensure data backup and recovery processes are in place.
# Technical Specification/5.10 Feature ID: F-010
variable "backup_retention_period" {
  description = "The number of days to retain automated backups."
  type        = number
  default     = 7
}

# Variable: backup_window
# Description: The daily time range during which automated backups are performed.
# Allows scheduling of backups during off-peak hours.
# Requirement Addressed:
# - TR-F010.5: Ensure data backup and recovery processes are in place.
# Technical Specification/5.10 Feature ID: F-010
variable "backup_window" {
  description = "The daily time range during which automated backups are performed."
  type        = string
  default     = "02:00-03:00"
}

# Variable: storage_encrypted
# Description: Specifies whether to encrypt the storage of the RDS instance.
# Enhances data security by encrypting data at rest.
# Requirement Addressed:
# - Ensures secure data storage as per data management policies.
# Technical Specification/5.10 Feature ID: F-010
variable "storage_encrypted" {
  description = "Specifies whether to encrypt the storage of the RDS instance."
  type        = bool
  default     = true
}

# Variable: kms_key_id
# Description: The ARN of the KMS key to use for encryption.
# Allows usage of a custom KMS key for encryption at rest.
# Requirement Addressed:
# - Provides control over encryption keys for data security.
# Technical Specification/5.10 Feature ID: F-010
variable "kms_key_id" {
  description = "The ARN of the KMS key to use for encryption."
  type        = string
  default     = null
}

# Variable: multi_az
# Description: Specifies if the RDS instance is a multi-AZ deployment.
# Enhances availability and supports disaster recovery.
# Requirement Addressed:
# - TR-F010.5: Ensure data backup and recovery processes are in place.
# Technical Specification/5.10 Feature ID: F-010
variable "multi_az" {
  description = "Specifies if the RDS instance is a multi-AZ deployment."
  type        = bool
  default     = false
}

# Variable: deletion_protection
# Description: If the RDS instance should have deletion protection enabled.
# Prevents accidental deletion of the database instance.
# Requirement Addressed:
# - TR-F010.2: Implement data retention policies compliant with legal and tax requirements.
# Technical Specification/5.10 Feature ID: F-010
variable "deletion_protection" {
  description = "If the RDS instance should have deletion protection enabled."
  type        = bool
  default     = true
}

# Variable: copy_tags_to_snapshot
# Description: Copy all Instance tags to snapshots.
# Helps with data management and compliance by retaining tags on backups.
# Requirement Addressed:
# - TR-F010.5: Ensure data backup and recovery processes are in place.
# Technical Specification/5.10 Feature ID: F-010
variable "copy_tags_to_snapshot" {
  description = "Copy all Instance tags to snapshots."
  type        = bool
  default     = true
}