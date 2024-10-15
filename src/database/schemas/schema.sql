-- ***********************************************************************
-- * Database Schema for Global Employee Travel Expense Tracking App
-- * This schema defines tables for employees, departments, expense reports,
-- * expense items, receipts, and policies.
-- *
-- * Requirements Addressed:
-- * - Expense Submission (Technical Specification/5.2 Feature ID: F-002)
-- *   Supports capturing and storing expense details, including categories, amounts, and receipts.
-- * - Approval Workflows (Technical Specification/5.4 Feature ID: F-004)
-- *   Facilitates the storage of approval statuses and history for expense reports.
-- * - Policy and Compliance Engine (Technical Specification/5.3 Feature ID: F-003)
-- *   Stores policy rules and compliance checks related to expense submissions.
-- * - Reimbursement Processing (Technical Specification/5.5 Feature ID: F-005)
-- *   Manages data related to reimbursement processing and tracking.
-- * - Secure User Authentication and Role-Based Authorization (Technical Specification/5.1 Feature ID: F-001)
-- *   Supports secure login, role-based access, and integration with identity providers for authentication and authorization.
-- ***********************************************************************

-- Drop tables if they exist to reset the schema
DROP TABLE IF EXISTS receipts;
DROP TABLE IF EXISTS expense_items;
DROP TABLE IF EXISTS expense_reports;
DROP TABLE IF EXISTS policies;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;

-- ========================================================
-- Table: departments
-- Contains department information.
-- Requirements Addressed:
-- - Secure User Authentication and Role-Based Authorization
--   (Technical Specification/5.1 Feature ID: F-001)
--   Supports organizational hierarchy and role assignments.
-- ========================================================
CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(255) NOT NULL
);

-- ========================================================
-- Table: employees
-- Stores employee information including personal details and roles.
-- Requirements Addressed:
-- - Secure User Authentication and Role-Based Authorization
--   (Technical Specification/5.1 Feature ID: F-001)
--   Supports secure login, role-based access, and integration with identity providers.
-- ========================================================
CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- ========================================================
-- Table: policies
-- Stores company policies related to expenses.
-- Requirements Addressed:
-- - Policy and Compliance Engine
--   (Technical Specification/5.3 Feature ID: F-003)
--   Stores policy rules and compliance checks related to expense submissions.
-- ========================================================
CREATE TABLE policies (
    policy_id INT PRIMARY KEY AUTO_INCREMENT,
    policy_name VARCHAR(255) NOT NULL,
    description TEXT,
    max_amount DECIMAL(10, 2) NOT NULL,
    applicable_regions VARCHAR(255)
);

-- ========================================================
-- Table: expense_reports
-- Holds data for submitted expense reports.
-- Requirements Addressed:
-- - Expense Submission
--   (Technical Specification/5.2 Feature ID: F-002)
--   Supports capturing and storing expense details.
-- - Approval Workflows
--   (Technical Specification/5.4 Feature ID: F-004)
--   Facilitates the storage of approval statuses and history for expense reports.
-- - Reimbursement Processing
--   (Technical Specification/5.5 Feature ID: F-005)
--   Manages data related to reimbursement processing and tracking.
-- ========================================================
CREATE TABLE expense_reports (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    submission_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

-- ========================================================
-- Table: expense_items
-- Stores individual expense items within a report.
-- Requirements Addressed:
-- - Expense Submission
--   (Technical Specification/5.2 Feature ID: F-002)
--   Supports detailed recording of expenses, including categories and amounts.
-- - Policy and Compliance Engine
--   (Technical Specification/5.3 Feature ID: F-003)
--   Enables validation of expenses against company policies.
-- ========================================================
CREATE TABLE expense_items (
    expense_id INT PRIMARY KEY AUTO_INCREMENT,
    report_id INT NOT NULL,
    category VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    expense_date DATE NOT NULL,
    description TEXT,
    FOREIGN KEY (report_id) REFERENCES expense_reports(report_id)
);

-- ========================================================
-- Table: receipts
-- Links receipts to expense items.
-- Requirements Addressed:
-- - Expense Submission
--   (Technical Specification/5.2 Feature ID: F-002)
--   Supports attachment of digital receipts.
-- ========================================================
CREATE TABLE receipts (
    receipt_id INT PRIMARY KEY AUTO_INCREMENT,
    expense_id INT NOT NULL,
    receipt_image_url VARCHAR(255) NOT NULL,
    uploaded_date DATE NOT NULL,
    FOREIGN KEY (expense_id) REFERENCES expense_items(expense_id)
);

-- ========================================================
-- Indexes and Constraints
-- Adding indexes and constraints to enhance performance and data integrity.
-- ========================================================

-- Index on employees email for quick lookup
CREATE UNIQUE INDEX idx_employees_email ON employees(email);

-- Index on expense_reports employee_id for faster queries
CREATE INDEX idx_expense_reports_employee_id ON expense_reports(employee_id);

-- Index on expense_items report_id for faster aggregation
CREATE INDEX idx_expense_items_report_id ON expense_items(report_id);

-- Foreign Key Constraints to enforce referential integrity
ALTER TABLE employees
    ADD CONSTRAINT fk_employees_department
    FOREIGN KEY (department_id)
    REFERENCES departments(department_id);

ALTER TABLE expense_reports
    ADD CONSTRAINT fk_expense_reports_employee
    FOREIGN KEY (employee_id)
    REFERENCES employees(employee_id);

ALTER TABLE expense_items
    ADD CONSTRAINT fk_expense_items_report
    FOREIGN KEY (report_id)
    REFERENCES expense_reports(report_id);

ALTER TABLE receipts
    ADD CONSTRAINT fk_receipts_expense_item
    FOREIGN KEY (expense_id)
    REFERENCES expense_items(expense_id);