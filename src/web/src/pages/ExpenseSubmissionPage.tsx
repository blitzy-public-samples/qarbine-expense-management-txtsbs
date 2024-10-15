// External dependencies (React v17.0.2)
import React, { useState, useEffect } from 'react';

// Internal dependencies
import ExpenseForm from '../components/ExpenseForm';
import ReceiptUpload from '../components/ReceiptUpload';
import useExpenseData from '../hooks/useExpenseData';
import useAuth from '../hooks/useAuth';
import { submitExpense } from '../services/api';
import { validateCurrency } from '../utils/validation';
import { formatDate } from '../utils/formatters';

// ExpenseSubmissionPage Component
// Description:
// Page component for rendering the expense submission interface, handling input validation, and submitting data to the backend.
// Requirements Addressed:
// - Expense Submission
//   - Location: Technical Specification/5.2 Feature ID: F-002/Expense Submission
//   - Description: Provide a mobile interface for capturing expense details on-the-go, integrating OCR technology for automatic receipt scanning and data extraction.

const ExpenseSubmissionPage: React.FC = () => {
    // Use useAuth hook to manage user authentication state.
    // Ensures secure access to the expense submission page.
    const { isAuthenticated, user } = useAuth();

    // Initialize state variables for managing form inputs.
    // Step 1: Initialize state variables for managing form inputs such as date, category, amount, and description using useState.
    const [date, setDate] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [currency, setCurrency] = useState<string>('USD');
    const [description, setDescription] = useState<string>('');
    const [receipt, setReceipt] = useState<File | null>(null);

    // State variable for form validation errors.
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // useEffect to fetch any necessary initial data on component mount.
    // Step 2: Use useEffect to fetch any necessary initial data, such as existing expenses or categories, on component mount.
    useEffect(() => {
        // Fetch expense categories or other initial data if necessary.
        // Placeholder for fetching categories or other setup actions.
        // This could utilize the useExpenseData hook or make an API call.
    }, []);

    // Function to handle form submission.
    // Step 5: Define a function to handle form submission, validating all inputs and sending the data to the backend API using the submitExpense function.
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Input validation.
        const validationErrors: { [key: string]: string } = {};

        if (!date) {
            validationErrors.date = 'Date is required.';
        }
        if (!category) {
            validationErrors.category = 'Category is required.';
        }
        if (!amount || amount <= 0) {
            validationErrors.amount = 'Amount must be greater than zero.';
        } else if (!validateCurrency(amount.toString())) {
            // Utilizes validateCurrency function from utils.
            // Ensures the currency input is valid.
            // Addresses requirement: Data validation before submission.
            // Location: Technical Specification/5.2 Feature ID: F-002/Expense Submission
            validationErrors.amount = 'Invalid currency amount.';
        }
        if (!description) {
            validationErrors.description = 'Description is required.';
        }
        if (!receipt) {
            validationErrors.receipt = 'Receipt upload is required.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Prepare data for submission.
        const expenseData = {
            date: formatDate(date), // Formats date input for display and API submission.
            category,
            amount,
            currency,
            description,
            receipt,
            userId: user.id,
        };

        try {
            // Submit the expense data to the backend API.
            // Addresses requirement: Submitting data to the backend API for processing.
            // Location: Technical Specification/5.2 Feature ID: F-002/Expense Submission
            await submitExpense(expenseData);
            // Reset form upon successful submission.
            setDate('');
            setCategory('');
            setAmount(0);
            setCurrency('USD');
            setDescription('');
            setReceipt(null);
            setErrors({});
            // Optionally, display success message or redirect user.
        } catch (error) {
            // Handle submission errors.
            // Could set form errors or display a notification to the user.
            // Integration with useNotifications hook can be considered here.
        }
    };

    // Render the page interface.
    // Step 6: Render the ExpenseForm and ReceiptUpload components with appropriate validation feedback.
    return (
        <div className="expense-submission-page">
            {/* Page Header */}
            <h1>Submit a New Expense</h1>

            {/* Expense Submission Form */}
            <form onSubmit={handleSubmit}>
                {/* ExpenseForm component allows users to enter expense details */}
                <ExpenseForm
                    date={date}
                    onDateChange={setDate}
                    category={category}
                    onCategoryChange={setCategory}
                    amount={amount}
                    onAmountChange={setAmount}
                    currency={currency}
                    onCurrencyChange={setCurrency}
                    description={description}
                    onDescriptionChange={setDescription}
                    errors={errors}
                />

                {/* ReceiptUpload component allows users to attach receipt images */}
                <ReceiptUpload
                    receipt={receipt}
                    onReceiptChange={setReceipt}
                    error={errors.receipt}
                />

                {/* Submit Button */}
                <button type="submit">Submit Expense</button>
            </form>
        </div>
    );
};

export default ExpenseSubmissionPage;