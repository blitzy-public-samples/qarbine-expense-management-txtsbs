terraform {
  required_version = ">= 0.13"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.0" # Provides AWS VPC resources for networking infrastructure.
    }
  }
}

provider "aws" {
  # AWS provider configuration can be inherited from the root module.
}

# Creates an AWS VPC with the specified CIDR block.
# Addresses the 'Scalability and Reliability' requirement from Technical Specification/6.6 Scalability and Reliability.
# Ensures the VPC is configured to support scalable and reliable networking infrastructure.

resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr_block # Defined in variables.tf: Defines the CIDR block for the VPC.

  # Enabling DNS support and hostnames enhances scalability and manageability of the VPC.
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "${var.project_name}-vpc"
  }
}

# Creates public subnets in specified availability zones.
# Addresses the 'Scalability and Reliability' requirement from Technical Specification/6.6 Scalability and Reliability.
# Distributes public subnets across availability zones to enhance redundancy and availability.

resource "aws_subnet" "public" {
  count             = length(var.public_subnet_cidrs) # var.public_subnet_cidrs defined in variables.tf: Specifies CIDR blocks for public subnets.
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.public_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index] # var.availability_zones defined in variables.tf: Specifies the availability zones for subnet deployment.

  map_public_ip_on_launch = true

  tags = {
    Name = "${var.project_name}-public-subnet-${count.index}"
  }
}

# Creates private subnets in specified availability zones.
# Addresses the 'Scalability and Reliability' requirement from Technical Specification/6.6 Scalability and Reliability.
# Distributes private subnets across availability zones to enhance redundancy and availability.

resource "aws_subnet" "private" {
  count             = length(var.private_subnet_cidrs) # var.private_subnet_cidrs defined in variables.tf: Specifies CIDR blocks for private subnets.
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]

  map_public_ip_on_launch = false

  tags = {
    Name = "${var.project_name}-private-subnet-${count.index}"
  }
}

# Creates a route table for the VPC.
# Addresses the 'Scalability and Reliability' requirement from Technical Specification/6.6 Scalability and Reliability.
# Supports network routing configurations necessary for the VPC.

resource "aws_route_table" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-route-table"
  }
}

# Attaches an internet gateway to the VPC for internet access.
# Addresses the 'Scalability and Reliability' requirement from Technical Specification/6.6 Scalability and Reliability.
# Enables internet connectivity for resources within the VPC.

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-igw"
  }
}