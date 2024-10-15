// Importing necessary modules and components

// Internal dependencies
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../utils/constants'; // To construct API endpoints for policy compliance checks
import { formatDate, formatCurrency } from '../utils/formatters'; // To format dates and currency values
import { validateDate, validateCurrency } from '../utils/validation'; // To ensure date and currency inputs for compliance checks are valid
import { useAuth } from '../hooks/useAuth'; // To manage authentication state and ensure secure API requests
import { useExpenseData } from '../hooks/useExpenseData'; // To retrieve and manage expense data for compliance checks
import { getNotifications } from '../services/notification'; // To notify users of compliance issues

// External dependencies
import axios from 'axios'; // version: 0.21.1 // To perform HTTP requests to the backend API for compliance checks

/**
 * PolicyComplianceChecker Component
 * 
 * This component is responsible for checking and ensuring that submitted expenses comply with company policies and international tax regulations.
 * It interacts with the policy engine to validate expenses in real-time, flagging any non-compliant entries for review.
 * 
 * Requirements Addressed:
 * - Policy and Compliance Engine
 *   Location: Technical Specification/5.3 Feature ID: F-003/Policy and Compliance Engine
 *   Description: Implement a dynamic engine that enforces company-specific expense policies and international tax regulations,
 *                automatically applying relevant rules and flagging non-compliant expenses for further review.
 */

const PolicyComplianceChecker: React.FC = () => {
    // State to hold compliance status and any issues found
    const [complianceResult, setComplianceResult] = useState<{ isCompliant: boolean; issues: string[] }>({
        isCompliant: true,
        issues: []
    });

    // Retrieve the current user's authentication state using the useAuth hook
    // Step 1: Retrieve the current user's authentication state
    const { authToken } = useAuth();

    // Fetch the relevant expense data using the useExpenseData hook
    // Step 2: Fetch the relevant expense data
    const { expenseData } = useExpenseData();

    /**
     * Validates an expense entry against company policies and tax regulations.
     * 
     * Parameters:
     * - expenseData: The expense data to validate
     * 
     * Returns:
     * - An object containing compliance status and any issues found.
     * 
     * Steps:
     * 1. Retrieve the current user's authentication state using the useAuth hook.
     * 2. Fetch the relevant expense data using the useExpenseData hook.
     * 3. Validate the date and currency fields using validateDate and validateCurrency utilities.
     * 4. Format the data using formatDate and formatCurrency utilities.
     * 5. Send a request to the policy engine API using axios to check compliance.
     * 6. Receive and process the response to determine compliance status.
     * 7. If non-compliant, use getNotifications to alert the user.
     * 8. Return the compliance status and any issues found.
     * 
     * Requirements Addressed:
     * - Policy and Compliance Engine
     *   Location: Technical Specification/5.3 Feature ID: F-003/Policy and Compliance Engine
     */
    const checkCompliance = async () => {
        try {
            // Step 3: Validate the date and currency fields using validation utilities
            const isDateValid = validateDate(expenseData.date);
            const isCurrencyValid = validateCurrency(expenseData.amount, expenseData.currency);

            if (!isDateValid || !isCurrencyValid) {
                const issues = [];
                if (!isDateValid) issues.push("Invalid date format.");
                if (!isCurrencyValid) issues.push("Invalid currency format or amount.");
                setComplianceResult({ isCompliant: false, issues });
                // Step 7: If non-compliant, use getNotifications to alert the user
                getNotifications().notifyUser("Expense data is invalid. Please correct the highlighted fields.");
                return;
            }

            // Step 4: Format the data using formatter utilities
            const formattedDate = formatDate(expenseData.date);
            const formattedAmount = formatCurrency(expenseData.amount, expenseData.currency);

            // Construct the payload for the API request
            const payload = {
                ...expenseData,
                date: formattedDate,
                amount: formattedAmount
            };

            // Step 5: Send a request to the policy engine API using axios to check compliance
            const response = await axios.post(
                `${API_BASE_URL}/policy/compliance-check`,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${authToken}`, // Ensure secure API requests
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Step 6: Receive and process the response to determine compliance status
            const { isCompliant, issues } = response.data;
            setComplianceResult({ isCompliant, issues });

            if (!isCompliant) {
                // Step 7: If non-compliant, use getNotifications to alert the user
                getNotifications().notifyUser("Expense is non-compliant. Please review the compliance issues.");
            }
        } catch (error) {
            console.error("Error checking compliance:", error);
            getNotifications().notifyUser("An error occurred during compliance check. Please try again later.");
        }
    };

    // Use useEffect to check compliance whenever expenseData changes
    useEffect(() => {
        if (expenseData) {
            checkCompliance();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expenseData]);

    return (
        <div>
            {/* Render compliance status and any issues found */}
            {/* Provides real-time feedback to the user on expense compliance */}
            {complianceResult.isCompliant ? (
                <div className="compliance-status success">
                    <p>All expenses are compliant with company policies and tax regulations.</p>
                </div>
            ) : (
                <div className="compliance-status error">
                    <p>The following issues were found:</p>
                    <ul>
                        {complianceResult.issues.map((issue, index) => (
                            <li key={index}>{issue}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PolicyComplianceChecker;