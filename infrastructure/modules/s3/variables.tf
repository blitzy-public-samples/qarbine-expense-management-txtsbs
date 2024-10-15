// variables.tf - Defines input variables for the S3 module.
// This configuration allows customization of the S3 bucket's settings,
// enabling secure storage of unstructured data as per the requirements in
// Technical Specification/6.3.3 Data Storage.

// Requirement Addressed: Secure Cloud Storage
// Location: Technical Specification/6.3.3 Data Storage
// Description: Utilizes AWS S3 for storing receipts, supporting documents, and other
// unstructured data securely with high durability.

// Internal Dependency:
// The aws_s3_bucket resource in main.tf uses these variables to configure the S3 bucket.

// Bucket Name Variable
// Specifies the name of the S3 bucket to be created.
// Allows for customizable bucket naming conventions, important for organizing resources
// and adhering to company naming policies.

variable "bucket_name" {
  description = "Specifies the name of the S3 bucket to be created."
  type        = string
  default     = "my-default-bucket"
}

// ACL Variable
// Defines the access control list (ACL) for the S3 bucket.
// Defaulting to 'private' ensures that the bucket is not publicly accessible,
// enhancing security as per data protection requirements in the technical specification.

variable "acl" {
  description = "Defines the access control list (ACL) for the S3 bucket."
  type        = string
  default     = "private"
}

// Tags Variable
// Assigns tags to the S3 bucket for identification and management.
// Tags aid in resource organization and cost management,
// aligning with best practices outlined in the technical specifications.

variable "tags" {
  description = "Assigns tags to the S3 bucket for identification and management."
  type        = map(string)
  default     = {}
}