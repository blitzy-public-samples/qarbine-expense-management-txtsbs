-- File: add_expense_table.sql
-- Description: Migration script to create the 'expenses' table for storing detailed expense information.
-- Requirements Addressed:
--   - Expense Submission (Technical Specification/5.2 Feature ID: F-002)
--     - TR-F002.1: Provide a mobile interface for capturing expense details on-the-go.
--     - TR-F002.3: Support multiple currencies with real-time conversion rates.
--     - TR-F002.4: Allow attachment of digital receipts or photos of physical receipts.
--     - TR-F002.5: Enable categorization of expenses (e.g., meals, transportation, lodging).
--     - Supports capturing and storing detailed expense information, including categories, amounts, and associated receipts.

-- Begin transaction to ensure atomicity of the migration
BEGIN;

-- Create 'expenses' table to store individual expense entries
CREATE TABLE expenses (
    -- 'expense_id' is the primary key that uniquely identifies each expense
    expense_id SERIAL PRIMARY KEY,           -- Supports detailed tracking per TR-F002.1

    -- 'report_id' links the expense to an expense report
    report_id INT NOT NULL,                  -- Associates expenses with reports (TR-F002.4)

    -- 'employee_id' links the expense to the submitting employee
    employee_id INT NOT NULL,                -- Associates expenses with employees (TR-F002.1)

    -- 'category' specifies the type of expense
    category VARCHAR(100) NOT NULL,          -- Enables categorization (TR-F002.5)

    -- 'amount' records the monetary value of the expense
    amount DECIMAL(10, 2) NOT NULL,          -- Captures expense amounts (TR-F002.1)

    -- 'currency' specifies the currency code (e.g., USD, EUR)
    currency VARCHAR(10) NOT NULL,           -- Supports multi-currency expenses (TR-F002.3)

    -- 'expense_date' records the date the expense was incurred
    expense_date DATE NOT NULL,              -- Tracks expense dates (TR-F002.1)

    -- 'description' allows for additional details about the expense
    description TEXT,                        -- Provides extra information

    -- Define foreign key constraints to maintain referential integrity
    CONSTRAINT fk_expenses_report
        FOREIGN KEY (report_id)
            REFERENCES expense_reports (report_id),   -- Links to 'expense_reports' table

    CONSTRAINT fk_expenses_employee
        FOREIGN KEY (employee_id)
            REFERENCES employees (employee_id)        -- Links to 'employees' table
);

-- Comments on constraints and foreign keys:
-- - The foreign key 'report_id' ensures each expense is linked to an existing report, essential for aggregation under reports (TR-F002.4).
-- - The foreign key 'employee_id' associates the expense with the submitting employee, crucial for attribution and processing (TR-F002.1).
-- - These constraints enforce data integrity across related tables as defined in 'src/database/schemas/schema.sql'.

-- Commit transaction to apply changes
COMMIT;