// src/web/src/components/ExpenseList.tsx

// External imports
import React, { useState, useEffect } from 'react'; // React version 17.0.2
// React library is used to create and manage the component lifecycle and state.
// useState is used to manage local state within the component for expense data.
// useEffect is used to perform side effects such as fetching data on component mount.

// Internal imports
import useExpenseData from '../hooks/useExpenseData';
// useExpenseData hook (src/web/src/hooks/useExpenseData.ts)
// Purpose: To manage and retrieve expense data for the component.

import ExpenseItem from './ExpenseItem';
// ExpenseItem component (src/web/src/components/ExpenseItem.tsx)
// Purpose: To render individual expense items within the list.

import { formatDate, formatCurrency } from '../utils/formatters';
// Utilities for formatting dates and currency values (src/web/src/utils/formatters.ts)
// Purpose: To format dates and currency values for display in the expense list.

/**
 * ExpenseList Component
 * ---------------------
 * Description:
 * Renders a list of expense items, allowing users to view their submitted expenses.
 * Integrates with hooks to fetch and manage expense data.
 *
 * Requirements Addressed:
 * - Expense Submission
 *   - Location: Technical Specification/5.2 Feature ID: F-002/Expense Submission
 *   - Description: Enable employees to capture and submit travel expenses efficiently through the mobile application, incorporating OCR receipt scanning, multi-currency support, and offline capabilities.
 *
 * This component displays submitted expenses, supporting multi-currency display and efficient interaction as per the requirements, addressing TR-F002.3 (Multi-currency support) and TR-F002.5 (Categorization of expenses).
 */

const ExpenseList: React.FC = () => {
    // Step 1: Initialize state variables for storing expense data using useState.
    const [expenses, setExpenses] = useState([]); // Local state for expense data

    // Step 2: Use useEffect to fetch expenses using the useExpenseData hook on component mount.
    useEffect(() => {
        // Function to fetch expenses
        const fetchExpenseData = async () => {
            // Fetch expenses using the useExpenseData hook
            const data = await useExpenseData();
            // Update the local state with the fetched expenses
            setExpenses(data);
        };
        // Fetch expenses when the component mounts
        fetchExpenseData();
    }, []);

    // Step 3: Return the list of rendered ExpenseItem components.
    return (
        <div className="expense-list">
            {/* Map over the fetched expense data to render an ExpenseItem component for each expense */}
            {expenses.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    // Step 4: Format each expense's date and amount using formatDate and formatCurrency utilities.
                    // This addresses TR-F002.3 for multi-currency support and proper date formatting
                    date={formatDate(expense.date)}
                    amount={formatCurrency(expense.amount, expense.currency)}
                    category={expense.category}
                    description={expense.description}
                />
            ))}
        </div>
    );
};

export default ExpenseList;