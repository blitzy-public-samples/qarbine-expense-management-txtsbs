# Database Documentation

This document provides an overview of the database setup for the **Global Employee Travel Expense Tracking App**, including schema definitions, migration scripts, and seed data.

## Introduction

The database is a critical component of the application, storing all structured data required for its operation. Proper setup and initialization are essential to ensure the application functions correctly.

**Requirement Addressed:** *Database Setup and Initialization*

**Location in Documentation:** [Technical Specification - 6.3 Component Descriptions - 6.3.3 Data Storage](#technical-specification)

As per the technical specification (Section 6.3.3), this document provides instructions for initializing the database schema, applying migrations, and seeding initial data.

## Schema Definition

The core database schema is defined in [`schemas/schema.sql`](schemas/schema.sql). This script includes definitions for the following tables:

- `employees`: Stores employee information including personal details and roles.
- `departments`: Contains department data within the organization.
- `expense_reports`: Records submitted expense reports by employees.
- `expense_items`: Details individual expenses within a report.
- `receipts`: References to uploaded receipt images for expenses.
- `policies`: Defines company expense policies and compliance rules.

These tables establish the foundational data structures necessary to support key application functionalities such as:

- Employee management and authentication (**Feature ID: F-001** - *Secure User Authentication and Role-Based Authorization*, see Technical Specification Section **5.1**).
- Expense submission and tracking (**Feature ID: F-002** - *Expense Submission*, see Technical Specification Section **5.2**).
- Policy enforcement (**Feature ID: F-003** - *Policy and Compliance Engine*, see Technical Specification Section **5.3**).

**Internal Dependency:** [`schema.sql`](schemas/schema.sql)

- **Purpose:** Defines the core database schema including tables for employees, departments, expense reports, expense items, receipts, and policies.

## Migrations

Migrations are used to evolve the database schema over time without losing existing data.

**Migration Scripts:**

1. **Initial Migration:** [`migrations/initial_migration.sql`](migrations/initial_migration.sql)

   - **Purpose:** Sets up the initial database schema with core tables.
   - **Tables Created:**
     - `employees`
     - `departments`
     - `expense_reports`
     - `expense_items`
     - `receipts`
     - `policies`

2. **Add Expense Table Migration:** [`migrations/add_expense_table.sql`](migrations/add_expense_table.sql)

   - **Purpose:** Adds the `expense` table for detailed expense tracking.
   - **Related Requirement:** Supports enhanced expense tracking capabilities as per **Feature ID: F-002**, detailed in Technical Specification Section **5.2**.

3. **Add User Table Migration:** [`migrations/add_user_table.sql`](migrations/add_user_table.sql)

   - **Purpose:** Adds the `user` table for authentication and role-based access control.
   - **Related Requirement:** Facilitates secure user authentication as per **Feature ID: F-001**, detailed in Technical Specification Section **5.1**.

4. **Update Policies Migration:** [`migrations/update_policies.sql`](migrations/update_policies.sql)

   - **Purpose:** Updates the `policies` table to support dynamic policy enforcement.
   - **Related Requirement:** Enables dynamic policy management in line with **Feature ID: F-003**, detailed in Technical Specification Section **5.3**.

**Internal Dependencies:**

- Each migration script builds upon the previous, so they must be executed in order.

## Seeding Data

The [`seeds/seed_data.sql`](seeds/seed_data.sql) script populates the database with initial data, including:

- Sample employees and departments
- Default expense policies

This is essential for testing and development purposes, allowing developers to work with realistic data.

**Internal Dependency:** [`seed_data.sql`](seeds/seed_data.sql)

- **Purpose:** Seeds the database with initial data for testing and development.

**Related Requirement:** Facilitates development and testing environments as per **Feature ID: F-024** - *User Training and Support*, see Technical Specification Section **5.24**.

## Usage Instructions

To set up the database, follow these steps:

1. **Configure Database Connection Settings**

   Ensure your environment variables or configuration files have the correct database connection parameters. Refer to the application setup guide for details.

2. **Run Migration Scripts**

   Execute the migration scripts in the specified order:

   ```bash
   psql -U <username> -d <database> -f migrations/initial_migration.sql
   psql -U <username> -d <database> -f migrations/add_expense_table.sql
   psql -U <username> -d <database> -f migrations/add_user_table.sql
   psql -U <username> -d <database> -f migrations/update_policies.sql
   ```

   **Note:** Running migrations aligns the database schema with application requirements, fulfilling the **Database Setup and Initialization** requirement as detailed in the technical documentation (Section 6.3.3).

3. **Run Seed Script**

   Populate the database with initial data:

   ```bash
   psql -U <username> -d <database> -f seeds/seed_data.sql
   ```

   This step is important for setting up a development environment with sample data, supporting effective testing and user training.

4. **Verify the Setup**

   Confirm that all tables have been created and data has been populated:

   ```bash
   psql -U <username> -d <database>
   ```

   Then execute SQL queries to check the presence of tables and initial data.

---

## Technical Specification Reference

### 6.3 Component Descriptions

#### 6.3.3 Data Storage

As per the [Technical Specification](../technical_specification.md):

The database utilizes **PostgreSQL** on **AWS RDS**, managing structured data including user records, expense reports, policies, and transaction histories.

**Features:**

- **Automated Backups:** Ensures data recovery in case of failures.
- **Replication:** Provides data redundancy and improves read performance.
- **Scalability:** Supports horizontal and vertical scaling to handle increased data loads.
- **High Availability Configurations:** Minimizes downtime and maintains service continuity.

These features align with the application's needs for security, reliability, and performance, fulfilling non-functional requirements such as **Data Management** (**Feature ID: F-010**, Technical Specification Section **5.10**) and **Data Backup and Recovery** (**Feature ID: F-021**, Technical Specification Section **5.21**).

---

**Important:** Always adhere to the company's security policies when handling database credentials and sensitive data. Ensure compliance with data protection regulations as specified under **Data Privacy and Security** (**Feature ID: F-018**, Technical Specification Section **5.18**).