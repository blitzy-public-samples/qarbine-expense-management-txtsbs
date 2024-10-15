# Output definitions for AWS VPC Module
#
# This file defines the output values for the VPC module, providing access to key resource identifiers such as VPC ID, subnet IDs, and route table IDs.
#
# Requirements Addressed:
# - Scalability and Reliability (Technical Specification/6.6 Scalability and Reliability)
#   - Ensures that the outputs provide necessary identifiers for scalable and reliable networking infrastructure.
#
# The outputs facilitate the deployment and scaling of services across the VPC, enabling high availability and redundancy as per the system architecture design.

###############################################################################
# Output: vpc_id
# Description: The ID of the created VPC.
#
# This output exposes the VPC ID, which is essential for associating resources with the VPC.
# It supports Scalability and Reliability (Technical Specification/6.6 Scalability and Reliability) by enabling other modules and services to interact with the VPC infrastructure, ensuring seamless integration and expansion.
#
# Dependency:
# - aws_vpc.main.id (infrastructure/modules/vpc/main.tf): Provides the ID of the created VPC.

output "vpc_id" {
  description = "The ID of the created VPC."
  value       = aws_vpc.main.id
}

###############################################################################
# Output: public_subnet_ids
# Description: The IDs of the public subnets.
#
# This output provides the IDs of public subnets, allowing resources that require internet access to be deployed appropriately.
# By exposing these subnet IDs, we facilitate the placement of resources across multiple Availability Zones (Technical Specification/6.6 High Availability), enhancing system redundancy and fault tolerance.
#
# Dependency:
# - aws_subnet.public.id (infrastructure/modules/vpc/main.tf): Provides the IDs of the public subnets.

output "public_subnet_ids" {
  description = "The IDs of the public subnets."
  value       = aws_subnet.public[*].id
}

###############################################################################
# Output: private_subnet_ids
# Description: The IDs of the private subnets.
#
# This output provides the IDs of private subnets for deploying internal services without direct internet exposure, enhancing security and reliability.
# It supports the requirements in Scalability and Reliability (Technical Specification/6.6 Scalability and Reliability) by enabling secure deployment of backend resources.
#
# Dependency:
# - aws_subnet.private.id (infrastructure/modules/vpc/main.tf): Provides the IDs of the private subnets.

output "private_subnet_ids" {
  description = "The IDs of the private subnets."
  value       = aws_subnet.private[*].id
}

###############################################################################
# Output: route_table_ids
# Description: The IDs of the route tables.
#
# This output exposes the route table IDs, which are crucial for managing network traffic within the VPC.
# It contributes to Scalability and Reliability (Technical Specification/6.6 Scalability and Reliability) by allowing dynamic route configurations to support expanding network architectures.
#
# Dependency:
# - aws_route_table.main.id (infrastructure/modules/vpc/main.tf): Provides the IDs of the route tables.

output "route_table_ids" {
  description = "The IDs of the route tables."
  value       = aws_route_table.main[*].id
}