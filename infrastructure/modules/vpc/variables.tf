###############################################################################
# Variables Definition File for AWS VPC Module
# Defines input variables for the AWS VPC module, allowing customization of
# networking configurations such as CIDR blocks and availability zones.
#
# Requirements Addressed:
# - Scalability and Reliability
#   Location: Technical Specification/6.6 Scalability and Reliability
#   Description: Provides configurable variables to ensure the VPC can be
#   tailored for scalable and reliable networking infrastructure.
###############################################################################

# Variable: vpc_cidr_block
# Description:
#   - Defines the CIDR block for the VPC.
#   - Allows customization of the IP address space for the VPC.
#   - By configuring the CIDR block, we can control the size of the network and
#     allocate IP addresses efficiently.
# Requirements Addressed:
# - Scalability and Reliability (Technical Specification/6.6)
#   - Supports network scalability by allowing adjustments to the IP address space.

variable "vpc_cidr_block" {
  description = "The CIDR block for the VPC."
  type        = string
}

# Variable: availability_zones
# Description:
#   - Specifies the list of availability zones where subnets will be deployed.
#   - Distributing resources across multiple availability zones enhances fault
#     tolerance and high availability.
# Requirements Addressed:
# - Scalability and Reliability (Technical Specification/6.6)
#   - Ensures high availability by deploying resources across multiple availability zones.

variable "availability_zones" {
  description = "A list of availability zones in which to deploy subnets."
  type        = list(string)
}

# Variable: public_subnet_cidrs
# Description:
#   - Specifies CIDR blocks for the public subnets within the VPC.
#   - Public subnets are used for resources that need to be accessible from the internet.
# Requirements Addressed:
# - Scalability and Reliability (Technical Specification/6.6)
#   - Allows flexible configuration of public subnet IP ranges to accommodate scalable resources.

variable "public_subnet_cidrs" {
  description = "A list of CIDR blocks for the public subnets."
  type        = list(string)
}

# Variable: private_subnet_cidrs
# Description:
#   - Specifies CIDR blocks for the private subnets within the VPC.
#   - Private subnets are used for resources that do not require direct internet access,
#     such as databases and backend services.
# Requirements Addressed:
# - Scalability and Reliability (Technical Specification/6.6)
#   - Enables scalable and secure networking by defining private subnets for internal resources.

variable "private_subnet_cidrs" {
  description = "A list of CIDR blocks for the private subnets."
  type        = list(string)
}