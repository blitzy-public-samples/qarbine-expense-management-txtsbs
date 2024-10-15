-- Seed Data SQL Script for Global Employee Travel Expense Tracking App
-- This script seeds initial data into the database.
-- Tables seeded: departments, employees, policies, expense_reports, expense_items, receipts, approvals, reimbursements.

-- This script addresses the following requirements:

-- 1. Secure User Authentication and Role-Based Authorization (Feature ID: F-001)
--    - Seeds user data to test authentication and role-based access control.
--    - Technical Specification Location: Technical Specification/5.1 Feature ID: F-001

-- 2. Expense Submission (Feature ID: F-002)
--    - Provides initial data for testing expense submission functionalities.
--    - Technical Specification Location: Technical Specification/5.2 Feature ID: F-002

-- 3. Policy and Compliance Engine (Feature ID: F-003)
--    - Populates the policies table with initial rules for compliance checks.
--    - Technical Specification Location: Technical Specification/5.3 Feature ID: F-003

-- 4. Approval Workflows (Feature ID: F-004)
--    - Seeds data to facilitate the testing of approval workflows.
--    - Technical Specification Location: Technical Specification/5.4 Feature ID: F-004

-- 5. Reimbursement Processing (Feature ID: F-005)
--    - Includes data for testing reimbursement processes.
--    - Technical Specification Location: Technical Specification/5.5 Feature ID: F-005

-- Note: Ensure that the database tables are empty before seeding.

-- Begin transaction to ensure atomicity
BEGIN;

-- Seed the departments table
-- Addresses Secure User Authentication and Role-Based Authorization (Feature ID: F-001)
-- Location: Technical Specification/5.1 Feature ID: F-001

INSERT INTO departments (department_id, department_name)
VALUES
    (1, 'Finance'),
    (2, 'HR'),
    (3, 'IT'),
    (4, 'Sales'),
    (5, 'Operations');

-- Seed the employees table
-- Addresses Secure User Authentication and Role-Based Authorization (Feature ID: F-001)
-- Seeds user data to test authentication and role-based access control.
-- Location: Technical Specification/5.1 Feature ID: F-001

INSERT INTO employees (employee_id, first_name, last_name, email, role, department_id)
VALUES
    (1, 'John', 'Doe', 'john.doe@example.com', 'Employee', 4),
    (2, 'Jane', 'Smith', 'jane.smith@example.com', 'Manager', 1),
    (3, 'Alice', 'Johnson', 'alice.johnson@example.com', 'Employee', 2),
    (4, 'Bob', 'Williams', 'bob.williams@example.com', 'Manager', 3),
    (5, 'Eve', 'Davis', 'eve.davis@example.com', 'Finance', 1),
    (6, 'Charlie', 'Brown', 'charlie.brown@example.com', 'Administrator', 5);

-- Seed the policies table
-- Addresses Policy and Compliance Engine (Feature ID: F-003)
-- Populates the policies table with initial rules for compliance checks.
-- Location: Technical Specification/5.3 Feature ID: F-003

INSERT INTO policies (policy_id, policy_name, description, max_amount, applicable_regions)
VALUES
    (1, 'Travel Expense Policy', 'Policy for travel-related expenses.', 1000.0, 'Global'),
    (2, 'Meal Expense Policy', 'Policy for meal expenses during travel.', 50.0, 'Global'),
    (3, 'Lodging Expense Policy', 'Policy for lodging expenses.', 200.0, 'Global');

-- Seed the expense_reports table
-- Addresses Expense Submission (Feature ID: F-002) and Approval Workflows (Feature ID: F-004)
-- Provides initial data for testing expense submission and approval functionalities.
-- Locations:
-- - Technical Specification/5.2 Feature ID: F-002
-- - Technical Specification/5.4 Feature ID: F-004

INSERT INTO expense_reports (report_id, employee_id, submission_date, status, total_amount)
VALUES
    (1, 1, '2023-10-01', 'Pending', 300.0),
    (2, 3, '2023-10-03', 'Approved', 150.0),
    (3, 1, '2023-10-05', 'Rejected', 500.0);

-- Seed the expense_items table
-- Addresses Expense Submission (Feature ID: F-002)
-- Provides initial data for testing expense submission functionalities.
-- Location: Technical Specification/5.2 Feature ID: F-002

INSERT INTO expense_items (expense_id, report_id, category, amount, currency, expense_date, description)
VALUES
    (1, 1, 'Transportation', 100.0, 'USD', '2023-09-30', 'Taxi from airport to hotel'),
    (2, 1, 'Meals', 50.0, 'USD', '2023-10-01', 'Dinner at local restaurant'),
    (3, 1, 'Lodging', 150.0, 'USD', '2023-10-01', 'Hotel stay for one night'),
    (4, 2, 'Transportation', 75.0, 'USD', '2023-10-02', 'Rental car for business trip'),
    (5, 2, 'Meals', 75.0, 'USD', '2023-10-02', 'Client meeting lunch');

-- Seed the receipts table
-- Addresses Expense Submission (Feature ID: F-002)
-- Provides initial data for testing expense submission functionalities.
-- Location: Technical Specification/5.2 Feature ID: F-002

INSERT INTO receipts (receipt_id, expense_id, receipt_image_url, uploaded_date)
VALUES
    (1, 1, 'https://s3.amazonaws.com/receipts/receipt1.jpg', '2023-10-01'),
    (2, 2, 'https://s3.amazonaws.com/receipts/receipt2.jpg', '2023-10-01'),
    (3, 3, 'https://s3.amazonaws.com/receipts/receipt3.jpg', '2023-10-01'),
    (4, 4, 'https://s3.amazonaws.com/receipts/receipt4.jpg', '2023-10-03'),
    (5, 5, 'https://s3.amazonaws.com/receipts/receipt5.jpg', '2023-10-03');

-- Seed the approvals table
-- Addresses Approval Workflows (Feature ID: F-004)
-- Seeds data to facilitate the testing of approval workflows.
-- Location: Technical Specification/5.4 Feature ID: F-004

-- Assuming the approvals table exists with fields:
-- approval_id, report_id, manager_id, approval_status, approval_date, comments

INSERT INTO approvals (approval_id, report_id, manager_id, approval_status, approval_date, comments)
VALUES
    (1, 1, 2, 'Pending', NULL, NULL),
    (2, 2, 2, 'Approved', '2023-10-04', 'Approved for reimbursement'),
    (3, 3, 2, 'Rejected', '2023-10-06', 'Expenses exceed policy limits');

-- Seed the reimbursements table
-- Addresses Reimbursement Processing (Feature ID: F-005)
-- Includes data for testing reimbursement processes.
-- Location: Technical Specification/5.5 Feature ID: F-005

-- Assuming the reimbursements table exists with fields:
-- reimbursement_id, report_id, employee_id, reimbursement_amount, reimbursement_date, status

INSERT INTO reimbursements (reimbursement_id, report_id, employee_id, reimbursement_amount, reimbursement_date, status)
VALUES
    (1, 2, 3, 150.0, '2023-10-07', 'Processed');

-- Commit the transaction to save changes
COMMIT;