-- Migration Script: Update 'policies' table to support dynamic policy enforcement
-- Description: Modifies the 'policies' table to update existing policies and add new policy rules
-- Requirements Addressed:
--   - Policy and Compliance Engine
--     - Location: Technical Specification/5.3 Feature ID: F-003
--       - TR-F003.1: Allow configuration of expense policies based on employee level, department, and travel destination
--       - TR-F003.5: Flag expenses that exceed policy limits or require additional approval

BEGIN;

-- Alter 'policies' table to add columns for dynamic policy enforcement
ALTER TABLE policies
    -- Add 'employee_level' column to specify applicable employee levels for the policy
    ADD COLUMN employee_level VARCHAR(50) NULL COMMENT 'Applicable employee level for the policy',
    -- Add 'department_id' column to specify applicable departments for the policy
    ADD COLUMN department_id INT NULL COMMENT 'Applicable department ID for the policy',
    -- Add 'travel_destination' column to specify applicable travel destinations for the policy
    ADD COLUMN travel_destination VARCHAR(255) NULL COMMENT 'Applicable travel destination for the policy';

-- Optional: Add foreign key constraint to 'department_id' if 'departments' table exists
-- This ensures referential integrity between 'policies' and 'departments' tables
-- ALTER TABLE policies
--     ADD CONSTRAINT fk_policies_department
--     FOREIGN KEY (department_id)
--     REFERENCES departments(department_id);

-- Update existing policy records to set default values where applicable
-- Ensures existing policies remain valid with the new schema changes
UPDATE policies
SET
    employee_level = 'All Levels',
    department_id = NULL,
    travel_destination = 'All Locations'
WHERE employee_level IS NULL;

-- Commit the transaction to apply changes
COMMIT;

-- End of migration script