/*
 * This Terraform variables file defines global input variables for the infrastructure configuration.
 * These variables allow customization and parameterization of resources across various modules
 * such as VPC, EC2, RDS, and S3.
 *
 * Requirements Addressed:
 * - Scalability and Reliability (Technical Specification/6.6 Scalability and Reliability):
 *   Provides configurable parameters that enable the infrastructure to be tailored for scalable and reliable deployment.
 * - Data Management (Technical Specification/5.10 Feature ID: F-010):
 *   Ensures secure and efficient management of all data within the application, including storage, retention, export, and archiving.
 * - Secure Cloud Storage (Technical Specification/6.3.3 Data Storage):
 *   Utilizes AWS S3 for secure storage of receipts, supporting documents, and other unstructured data with high durability.
 */

# Variable: vpc_cidr_block
#
# Defines the CIDR block for the VPC.
# This allows customization of the VPC's IP address range, providing flexibility in network configuration.
#
# Requirement Addressed:
# - Scalability and Reliability (Technical Specification/6.6 Scalability and Reliability):
#   By allowing customizable CIDR blocks, the infrastructure can scale to accommodate different network sizes and ensure reliable network operations.

variable "vpc_cidr_block" {
  description = "The CIDR block for the VPC."
  type        = string
  default     = "10.0.0.0/16"
}

# Variable: availability_zones
#
# A list of availability zones where subnets will be created.
# Deploying resources across multiple availability zones enhances fault tolerance and high availability.
#
# Requirement Addressed:
# - Scalability and Reliability (Technical Specification/6.6 Scalability and Reliability):
#   Enables high availability by distributing resources across multiple zones.

variable "availability_zones" {
  description = "A list of availability zones where subnets will be created."
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}

# Variable: ami
#
# The Amazon Machine Image (AMI) ID to use for the EC2 instance.
# Allows selection of the operating system and configuration for EC2 instances.
#
# Requirement Addressed:
# - Scalability and Reliability (Technical Specification/6.6 Scalability and Reliability):
#   Enables deployment of instances with desired configurations to support reliable operations.

variable "ami" {
  description = "The AMI ID to use for the EC2 instance."
  type        = string
  default     = "ami-12345678"
}

# Variable: instance_type
#
# The type of EC2 instance to create (e.g., t2.micro).
# Provides flexibility to choose instance types according to performance and cost requirements.
#
# Requirement Addressed:
# - Scalability and Reliability (Technical Specification/6.6 Scalability and Reliability):
#   Allows scaling of compute resources by selecting appropriate instance types.

variable "instance_type" {
  description = "The type of instance to create (e.g., t2.micro)."
  type        = string
  default     = "t2.micro"
}

# Variable: db_instance_identifier
#
# The identifier for the RDS instance.
# Specifies the database instance used by the application.
#
# Requirement Addressed:
# - Data Management (Technical Specification/5.10 Feature ID: F-010):
#   Ensures efficient management of application data by configuring database resources appropriately.

variable "db_instance_identifier" {
  description = "The identifier for the RDS instance."
  type        = string
  default     = "mydbinstance"
}

# Variable: bucket_name
#
# Specifies the name of the S3 bucket to be created.
# Used for storing receipts, supporting documents, and other unstructured data securely.
#
# Requirements Addressed:
# - Secure Cloud Storage (Technical Specification/6.3.3 Data Storage):
#   Utilizes AWS S3 for secure, durable storage of unstructured data.
# - Data Management (Technical Specification/5.10 Feature ID: F-010):
#   Supports efficient data storage and retrieval in compliance with legal and tax requirements.

variable "bucket_name" {
  description = "Specifies the name of the S3 bucket to be created."
  type        = string
  default     = "my-default-bucket"
}