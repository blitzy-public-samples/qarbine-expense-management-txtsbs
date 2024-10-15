/*
 * Output variable for the connection endpoint of the RDS instance.
 *
 * This output provides essential information such as the database endpoint
 * for other configurations or external integrations.
 *
 * Requirements addressed:
 * - Data Management (Feature ID: F-010)
 *   Location: Technical Specification/5.10 Feature ID: F-010
 *   Description: Ensures secure and efficient management of all data within
 *     the application, including storage, retention, export, and archiving,
 *     in compliance with legal and tax requirements.
 *
 * By exposing the database endpoint as an output, we facilitate secure
 * and efficient data management practices by allowing only necessary
 * modules to access the endpoint, adhering to the principles outlined
 * in the Data Management requirements.
 *
 * Internal Dependencies:
 * - aws_db_instance.db.endpoint (defined in infrastructure/modules/rds/main.tf)
 *   Purpose: Provides the connection endpoint for the RDS instance.
 *
 * The aws_db_instance resource must be properly configured in the main.tf
 * to ensure that the endpoint is available for output.
 */

output "db_instance_endpoint" {
  description = "The connection endpoint for the RDS instance."

  /*
   * The value references the 'endpoint' attribute of the 'aws_db_instance.db'
   * resource, which contains the address for connecting to the database.
   *
   * This supports other modules and services that require database access,
   * while maintaining encapsulation and adhering to infrastructure as code
   * best practices.
   */

  value = aws_db_instance.db.endpoint
}