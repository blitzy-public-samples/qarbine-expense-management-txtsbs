# Outputs for the EC2 module
#
# This file defines output variables for the EC2 module, providing access to information about the created EC2 instances,
# such as instance IDs. These outputs are essential for integrating with other infrastructure components and modules.
#
# Requirements Addressed:
# - Scalability and Reliability (Technical Specification/6.6 Scalability and Reliability)
#   - Ensures the infrastructure is scalable and reliable, supporting high availability and redundancy for application resources.
#   - By outputting the instance IDs, we enable other modules and infrastructure components to reference and interact with
#     the EC2 instances, facilitating the deployment of scalable and reliable architectures.
#
# Dependencies:
# - Internal:
#   - 'instance_id' is sourced from 'infrastructure/modules/ec2/main.tf'
#     - Uses the 'aws_instance.example' resource defined in the EC2 module.
# - External:
#   - 'hashicorp/aws' provider (version >= 3.0)
#     - Provides AWS resources for infrastructure provisioning.
#     - Version specified to ensure compatibility and consistent behavior across deployments.

output "instance_id" {
  description = "Outputs the ID of the created EC2 instance."
  value       = aws_instance.example.id
}