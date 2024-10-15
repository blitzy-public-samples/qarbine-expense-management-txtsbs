// Output variable "bucket_id"
    // Provides the ID of the created S3 bucket.
    // 
    // Requirement Addressed:
    // - Name: Secure Cloud Storage
    // - Location: Technical Specification/6.3.3 Data Storage
    // - Description: Utilizes AWS S3 for storing receipts, supporting documents, and other unstructured data securely with high durability.
    //
    // This output allows other modules and external integrations to reference the bucket by its unique ID.

    output "bucket_id" {
      description = "The ID of the created S3 bucket."
      value       = aws_s3_bucket.bucket.id
    }

    // Output variable "bucket_arn"
    // Provides the Amazon Resource Name (ARN) of the created S3 bucket.
    //
    // Requirement Addressed:
    // - Name: Secure Cloud Storage
    // - Location: Technical Specification/6.3.3 Data Storage
    // - Description: Utilizes AWS S3 for storing receipts, supporting documents, and other unstructured data securely with high durability.
    //
    // The ARN is essential for setting IAM policies and permissions when other AWS services need to access the bucket.

    output "bucket_arn" {
      description = "The ARN of the created S3 bucket."
      value       = aws_s3_bucket.bucket.arn
    }

    // Output variable "bucket_domain_name"
    // Provides the domain name of the created S3 bucket.
    //
    // Requirement Addressed:
    // - Name: Secure Cloud Storage
    // - Location: Technical Specification/6.3.3 Data Storage
    // - Description: Utilizes AWS S3 for storing receipts, supporting documents, and other unstructured data securely with high durability.
    //
    // This output is used for accessing the bucket over the internet or configuring services that require the bucket's domain name.

    output "bucket_domain_name" {
      description = "The domain name of the created S3 bucket."
      value       = aws_s3_bucket.bucket.bucket_domain_name
    }