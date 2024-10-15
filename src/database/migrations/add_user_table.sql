-- Migration Script: Create 'users' table
-- Description:
--   This script creates the 'users' table to store user authentication details
--   and links users to employees for role-based access control.
-- Requirements Addressed:
--   - Secure User Authentication and Role-Based Authorization
--     - Location: Technical Specification/5.1 Feature ID: F-001
--     - Description: Supports secure login, role-based access, and integration
--       with identity providers for authentication and authorization.
-- Dependencies:
--   - Internal:
--     - 'employees' table in 'src/database/schemas/schema.sql'
--       - Purpose: Links user accounts to employee records for role-based access control.

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    -- 'user_id': Unique identifier for each user.
    --   Type: SERIAL (auto-incrementing integer).
    --   Constraints: PRIMARY KEY.
    --   Ensures each user has a unique identifier.

    username VARCHAR(255) UNIQUE NOT NULL,
    -- 'username': Stores the unique username of the user.
    --   Type: VARCHAR(255).
    --   Constraints: UNIQUE, NOT NULL.
    --   Ensures usernames are unique and mandatory for user authentication.
    --   Addresses Requirement:
    --     - Implement secure login using unique username.
    --       - Location: Technical Specification/5.1 Feature ID: F-001, Technical Requirement TR-F001.1.

    password_hash VARCHAR(255) NOT NULL,
    -- 'password_hash': Stores the hashed password of the user.
    --   Type: VARCHAR(255).
    --   Constraint: NOT NULL.
    --   Ensures passwords are securely stored and mandatory for authentication.
    --   Addresses Requirement:
    --     - Implement secure login using unique password.
    --       - Location: Technical Specification/5.1 Feature ID: F-001, Technical Requirement TR-F001.1.

    role VARCHAR(50) NOT NULL,
    -- 'role': Stores the role assigned to the user.
    --   Type: VARCHAR(50).
    --   Constraint: NOT NULL.
    --   Possible roles include 'Employee', 'Manager', 'Finance', 'Administrator'.
    --   Supports role-based access control mechanisms.
    --   Addresses Requirement:
    --     - Define role-based access levels for different user roles.
    --       - Location: Technical Specification/5.1 Feature ID: F-001, Technical Requirement TR-F001.4.

    employee_id INT,
    -- 'employee_id': Links the user account to an employee record.
    --   Type: INT.
    --   Establishes a relationship between users and employees for access control.
    --   Dependency:
    --     - References the 'employees' table.
    --       - Purpose: Ensures each user is associated with a valid employee record.

    CONSTRAINT fk_employee_id FOREIGN KEY (employee_id)
        REFERENCES employees(employee_id)
    -- Foreign Key Constraint:
    --   Links 'employee_id' in 'users' table to 'employee_id' in 'employees' table.
    --   Ensures referential integrity between users and employees.
    --   Addresses Dependency:
    --     - Internal: 'employees' table in 'src/database/schemas/schema.sql'.
    --   Addresses Requirement:
    --     - Links users to employees for role-based access control.
    --       - Location: Technical Specification/5.1 Feature ID: F-001.

);