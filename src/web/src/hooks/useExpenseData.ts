// Description:
// This custom React hook provides functionality to manage and retrieve expense data within the web application.
// It interfaces with the API service to fetch, update, and manage expense records, ensuring that components have access to up-to-date expense information.

// Requirements Addressed:
// - Expense Data Management
//   Location: Technical Specification/5.2 Feature ID: F-002/Expense Submission
//   Description: Enable efficient management and retrieval of expense data to support submission, review, and reporting functionalities.

// Dependencies:
// - Internal:
//   - fetchExpenses (from '../services/api'): To fetch a list of expenses from the backend API.
//   - updateExpense (from '../services/api'): To update existing expense data in the backend API.
//   - formatDate (from '../utils/formatters'): To format dates for display and API interactions.
//   - formatCurrency (from '../utils/formatters'): To format currency values for display.
// - External:
//   - React (version 17.0.2): For React hooks such as useState and useEffect.

import { useState, useEffect } from 'react'; // React hooks for state management and side effects
// React version 17.0.2

import { fetchExpenses, updateExpense } from '../services/api'; // API service functions to fetch and update expenses
import { formatDate, formatCurrency } from '../utils/formatters'; // Utility functions to format dates and currency values

// Custom hook to manage and retrieve expense data for components.
function useExpenseData(userId: string) {
    // Initialize state variables for storing expense data and loading status.
    const [expenses, setExpenses] = useState([]); // Array of expense records
    const [loading, setLoading] = useState<boolean>(true); // Loading status indicator
    const [error, setError] = useState<Error | null>(null); // Error state to capture any errors during API calls

    // Fetch expenses from the backend API for the given user.
    const fetchUserExpenses = async () => {
        setLoading(true);
        setError(null);
        try {
            // Define a function to fetch expenses using fetchExpenses from the API service.

            // Call the fetchExpenses function from the API service (src/web/src/services/api.ts)
            const data = await fetchExpenses(userId);

            // Format fetched expense data using formatDate and formatCurrency utilities.
            const formattedExpenses = data.map((expense: any) => ({
                ...expense,
                date: formatDate(expense.date), // Format dates for display
                amountFormatted: formatCurrency(expense.amount, expense.currency), // Format currency values for display
            }));

            // Update the state with formatted expenses
            setExpenses(formattedExpenses);

        } catch (err) {
            // Handle errors by setting the error state
            setError(err);
        } finally {
            // Set loading to false after fetching is complete
            setLoading(false);
        }
    };

    // Update an existing expense in the backend API.
    const updateUserExpense = async (expenseId: string, updatedExpenseData: any) => {
        setLoading(true);
        setError(null);
        try {
            // Define a function to update expenses using updateExpense from the API service.

            // Call the updateExpense function from the API service (src/web/src/services/api.ts)
            await updateExpense(expenseId, updatedExpenseData);

            // Refresh the expense list after the update
            await fetchUserExpenses();

        } catch (err) {
            // Handle errors by setting the error state
            setError(err);
        } finally {
            // Set loading to false after update is complete
            setLoading(false);
        }
    };

    // useEffect hook to fetch expenses when the userId changes or on initial render.
    useEffect(() => {
        // Fetch expenses using the fetchUserExpenses function
        fetchUserExpenses();
    }, [userId]); // Dependency array includes userId to refetch when it changes

    // Return the expense data and manipulation functions for use in components.
    return {
        expenses,           // The array of user's expenses
        loading,            // Loading status indicator
        error,              // Error state
        refreshExpenses: fetchUserExpenses, // Function to refresh expenses manually
        updateExpense: updateUserExpense,   // Function to update an expense
    };
}

export default useExpenseData;