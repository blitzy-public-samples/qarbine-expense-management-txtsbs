# Terraform configuration for provisioning EC2 instances within a specified VPC,
# utilizing defined variables for customization of instance parameters such as AMI,
# instance type, and security groups.

# Provider configuration
# External dependency: hashicorp/aws (version >= 3.0)
# Purpose: Provides AWS resources for infrastructure provisioning.
# Version specified to ensure compatibility with required features.
provider "aws" {
  version = ">= 3.0"  # hashicorp/aws provider version >= 3.0
  region  = var.region  # The AWS region where the EC2 instance will be launched.
}

# Resource: aws_instance
# Description: Provisions an EC2 instance using the specified AMI and instance type.
# Addresses requirement: 'Scalability and Reliability' as per Technical Specification/6.6
# Ensures the infrastructure is scalable and reliable, supporting high availability and redundancy for application resources.
resource "aws_instance" "ec2_instance" {
  ami               = var.ami            # The AMI ID to use for the EC2 instance.
  instance_type     = var.instance_type  # The type of instance to create (e.g., t2.micro).
  security_groups   = var.security_groups  # A list of security group IDs to associate with the EC2 instance.

  # Enable detailed monitoring to enhance reliability.
  monitoring = true  # Enables CloudWatch detailed monitoring.

  # Tags for identifying and organizing resources.
  tags = {
    Name = "EC2Instance"
  }
}