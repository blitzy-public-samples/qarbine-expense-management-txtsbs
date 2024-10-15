# Terraform configuration block specifying required providers
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.0" # Using AWS provider version >= 3.0 as specified in external dependencies
      # External Dependency: Provides AWS resources for infrastructure provisioning.
      # Reference: dependencies.external in the JSON specification
    }
  }
}

# Variable definition for the Amazon Machine Image (AMI) ID
variable "ami" {
  type        = string
  description = "The AMI ID to use for the EC2 instance."
  # This variable allows customization of the EC2 instance's AMI.
  # Addressing Requirement: Ensures the infrastructure is scalable and reliable by allowing selection of specific AMIs optimized for scalability and performance.
  # Technical Specification Reference: 6.6 Scalability and Reliability
  # Location: Technical Specification/6.6 Scalability and Reliability
}

# Variable definition for the EC2 instance type
variable "instance_type" {
  type        = string
  description = "The type of instance to create (e.g., t2.micro)."
  # This variable enables specification of the EC2 instance type to match workload requirements.
  # Addressing Requirement: Supports scalability by allowing selection of instance types that can handle varying loads.
  # Technical Specification Reference: 6.6 Scalability and Reliability
  # Location: Technical Specification/6.6 Scalability and Reliability
}

# Variable definition for security group IDs
variable "security_groups" {
  type        = list(string)
  description = "A list of security group IDs to associate with the EC2 instance."
  # This variable specifies the security groups for the EC2 instance to control inbound and outbound traffic.
  # Addressing Requirement: Enhances reliability and security of the infrastructure by applying appropriate network controls.
  # Technical Specification Reference: 6.6 Scalability and Reliability
  # Location: Technical Specification/6.6 Scalability and Reliability
}

# Variable definition for the AWS region
variable "region" {
  type        = string
  default     = "us-west-2"
  description = "The AWS region where the EC2 instance will be launched."
  # This variable sets the AWS region for deploying resources, supporting geographical distribution.
  # Addressing Requirement: Ensures high availability and redundancy by allowing deployment across multiple regions.
  # Technical Specification Reference: 6.6 Scalability and Reliability
  # Location: Technical Specification/6.6 Scalability and Reliability
}