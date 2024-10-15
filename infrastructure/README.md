# Infrastructure Setup and Management Guide

## Introduction

This guide provides detailed instructions and documentation for setting up and managing the infrastructure for the **Global Employee Travel Expense Tracking App** using **Terraform**. The infrastructure is set up on **AWS** and includes the configuration of resources such as **VPC**, **EC2 instances**, **RDS databases**, and **S3 buckets**. It also covers how to customize the infrastructure using variables, how to deploy it, and how to manage outputs and ongoing maintenance.

**Requirements Addressed:**

- **Scalability and Reliability**  
  - *Location:* Technical Specification / 6.6 Scalability and Reliability  
  - *Description:* Ensures the infrastructure is scalable and reliable, supporting high availability and redundancy for application resources.

- **Data Management**  
  - *Location:* Technical Specification / 5.10 Feature ID: F-010  
  - *Description:* Ensures secure and efficient management of all data within the application, including storage, retention, export, and archiving, in compliance with legal and tax requirements.

- **Secure Cloud Storage**  
  - *Location:* Technical Specification / 6.3.3 Data Storage  
  - *Description:* Utilizes AWS S3 for storing receipts, supporting documents, and other unstructured data securely with high durability.

## Prerequisites

Before setting up the infrastructure, ensure you have the following prerequisites:

- **Terraform Installed:**  
  Install Terraform (version >= 0.12). Follow the instructions at [Terraform Installation Guide](https://learn.hashicorp.com/terraform/getting-started/install.html).

- **AWS CLI Installed:**  
  Install the AWS Command Line Interface for managing AWS services. Refer to the [AWS CLI Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html).

- **AWS Credentials Configured:**  
  Configure your AWS credentials using `aws configure` or by setting environment variables. Ensure the credentials have sufficient permissions.

- **Appropriate AWS IAM Permissions:**  
  The user or role must have permissions to create and manage VPCs, EC2 instances, RDS instances, and S3 buckets.

**Note:**  
These prerequisites ensure that you have the necessary tools and permissions to deploy the infrastructure, aligning with the **Scalability and Reliability** requirement in *Technical Specification / 6.6 Scalability and Reliability*.

## Configuration

The infrastructure configuration is defined using Terraform configuration files located in the `infrastructure` directory. Key files include:

- **`main.tf`:**  
  Orchestrates the entire infrastructure setup, integrating various modules and utilizing input variables to define and provision AWS resources.

- **`variables.tf`:**  
  Defines global input variables for the Terraform infrastructure configuration. Customize these variables to suit your environment.

- **`outputs.tf`:**  
  Aggregates outputs from various modules to provide essential information for other configurations or external integrations.

### Customizing Variables

Variables can be customized by modifying the `variables.tf` file or by creating a `terraform.tfvars` file. Key variables to consider:

- **AWS Region:**  
  `variable "aws_region" {}`  
  Set the AWS region where resources will be deployed.

- **VPC Configuration:**  
  `variable "vpc_cidr" {}`  
  Define the CIDR block for the VPC.

- **Subnet Configuration:**  
  `variable "public_subnets" {}`  
  `variable "private_subnets" {}`  
  Specify CIDR blocks for public and private subnets.

- **EC2 Instance Type:**  
  `variable "instance_type" {}`  
  Choose the instance type for EC2 instances.

- **RDS Instance Configuration:**  
  `variable "db_instance_class" {}`  
  `variable "db_engine" {}`  
  Define the database instance class and engine.

- **S3 Bucket Name:**  
  `variable "s3_bucket_name" {}`  
  Set the name for the S3 bucket used for storage.

**Example `terraform.tfvars` File:**

```hcl
aws_region        = "us-west-2"
vpc_cidr          = "10.0.0.0/16"
public_subnets    = ["10.0.1.0/24", "10.0.2.0/24"]
private_subnets   = ["10.0.3.0/24", "10.0.4.0/24"]
instance_type     = "t3.medium"
db_instance_class = "db.t3.medium"
db_engine         = "postgres"
s3_bucket_name    = "expense-tracker-storage"
```

**Note:**  
Customizing these variables enables you to tailor the infrastructure to meet specific needs, supporting the **Data Management** requirement in *Technical Specification / 5.10 Feature ID: F-010*.

## Modules

The infrastructure is modularized using Terraform modules for better organization and reusability. The primary modules are:

### VPC Module (`modules/vpc`)

- **Purpose:**  
  Sets up networking resources such as VPC, subnets, route tables, and internet gateways.

- **Files:**  
  - `main.tf`: Defines the VPC and networking components.
  - `variables.tf`: Contains variables for the VPC module.
  - `outputs.tf`: Outputs VPC-related information.

- **Highlights:**  
  - Creates a scalable and secure VPC.
  - Supports multi-AZ deployments for high availability.
  - Aligns with **Scalability and Reliability** in *Technical Specification / 6.6 Scalability and Reliability*.

### EC2 Module (`modules/ec2`)

- **Purpose:**  
  Provisions EC2 instances within a specified VPC.

- **Files:**  
  - `main.tf`: Defines EC2 instances and associated security groups.
  - `variables.tf`: Contains variables for EC2 configuration.
  - `outputs.tf`: Outputs details about EC2 instances.

- **Highlights:**  
  - Creates EC2 instances based on specified instance types.
  - Configures security groups to control inbound and outbound traffic.
  - Supports scaling policies to handle variable workloads.

### RDS Module (`modules/rds`)

- **Purpose:**  
  Provisions AWS RDS instances for database services.

- **Files:**  
  - `main.tf`: Defines the RDS instance and settings.
  - `variables.tf`: Contains variables for RDS configuration.
  - `outputs.tf`: Outputs RDS connection details.

- **Highlights:**  
  - Deploys a managed database with automatic backups and updates.
  - Enhances data reliability and availability.
  - Supports **Data Management** as per *Technical Specification / 5.10 Feature ID: F-010*.

### S3 Module (`modules/s3`)

- **Purpose:**  
  Defines AWS S3 bucket resources for secure storage.

- **Files:**  
  - `main.tf`: Creates the S3 bucket with necessary policies.
  - `variables.tf`: Contains variables for the S3 bucket.
  - `outputs.tf`: Outputs S3 bucket information.

- **Highlights:**  
  - Enables secure and durable storage for unstructured data.
  - Configures bucket policies and encryption.
  - Addresses **Secure Cloud Storage** in *Technical Specification / 6.3.3 Data Storage*.

## Deployment

To deploy the infrastructure, follow these steps:

### 1. Initialize Terraform

Run the following command in the `infrastructure` directory to initialize Terraform and download necessary providers:

```bash
terraform init
```

### 2. Validate the Configuration

Ensure the configuration files are syntactically correct:

```bash
terraform validate
```

### 3. Plan the Deployment

Create an execution plan to preview the changes Terraform will make:

```bash
terraform plan -out tfplan
```

Review the `tfplan` file to ensure the proposed changes meet your expectations.

### 4. Apply the Configuration

Deploy the infrastructure by applying the execution plan:

```bash
terraform apply tfplan
```

Confirm the application when prompted.

**Note:**  
Deployment steps are designed to provision infrastructure that meets scalability and reliability standards outlined in *Technical Specification / 6.6 Scalability and Reliability*.

## Outputs

After deployment, Terraform provides outputs containing essential information:

- **VPC ID:** Identifier for the created VPC.
- **Subnet IDs:** Identifiers for public and private subnets.
- **EC2 Instance Details:** Information about the deployed EC2 instances.
- **RDS Endpoint:** Connection endpoint for the RDS database.
- **S3 Bucket Name:** Name of the S3 bucket for storage.

To view outputs:

```bash
terraform output
```

**Usage:**

- Use the VPC and subnet IDs for configuring additional resources.
- Connect to EC2 instances and the RDS database using provided details.
- Integrate the S3 bucket with application services for storing receipts and documents, fulfilling the **Data Management** requirement in *Technical Specification / 5.10 Feature ID: F-010*.

## Maintenance

Regular maintenance ensures the infrastructure remains secure, efficient, and aligned with changing requirements.

### Updating Configurations

- Modify variables in `variables.tf` or `terraform.tfvars` as needed.
- Re-run `terraform plan` and `terraform apply` to apply changes.

### Scaling Resources

- Adjust instance counts, types, or scaling policies.
- Ensure compliance with **Scalability and Reliability** from *Technical Specification / 6.6 Scalability and Reliability*.

### Managing State Files

- **State File Location:** By default, Terraform state files are stored locally. For collaborative environments, configure a remote backend (e.g., AWS S3 with DynamoDB for locking).
- **State File Security:** Protect the state file as it contains sensitive information.

### Resource Monitoring

- Utilize AWS CloudWatch to monitor resource performance and health.
- Set up alerts for critical metrics (e.g., CPU utilization, memory usage).

## Troubleshooting

### Common Issues and Solutions

#### Terraform Initialization Errors

- **Cause:** Missing providers or incorrect configurations.
- **Solution:** Ensure `provider` blocks in `main.tf` are correctly configured and that you have internet connectivity.

#### Insufficient Permissions

- **Cause:** AWS credentials lack necessary IAM permissions.
- **Solution:** Verify IAM policies attached to your AWS user or role include required permissions for resource creation.

#### Resource Creation Failures

- **Cause:** Exceeding AWS service quotas or misconfigured resources.
- **Solution:** Check AWS service limits and request quota increases if necessary. Review resource configurations for correctness.

#### Network Connectivity Issues

- **Cause:** Incorrect VPC or subnet configurations.
- **Solution:** Ensure VPC settings and subnet CIDR blocks are properly defined and do not overlap.

#### State File Conflicts

- **Cause:** Concurrent Terraform operations causing state corruption.
- **Solution:** Use a remote backend with state locking to prevent simultaneous updates.

### Debugging Tips

- **Enable Detailed Logging:** Set the `TF_LOG` environment variable (e.g., `export TF_LOG=DEBUG`) to get verbose output.
- **Review AWS Console:** Cross-reference deployed resources in the AWS Management Console to verify the state matches expectations.
- **Consult Documentation:** Refer to the [Terraform Documentation](https://www.terraform.io/docs/index.html) and [AWS Documentation](https://docs.aws.amazon.com/) for guidance.

**Note:**  
Effective troubleshooting ensures the infrastructure remains reliable and aligns with the standards set in *Technical Specification / 6.6 Scalability and Reliability*.

---