import React, { useState, useEffect } from 'react'; // External dependencies from 'react' version 17.0.2
import { formatDate, formatCurrency } from '../utils/formatters';
import {
  validateEmail,
  validateCurrency,
  validateDate,
} from '../utils/validation';
import useExpenseData from '../hooks/useExpenseData';
import ReceiptUpload from './ReceiptUpload';
import LocalizationSwitcher from './LocalizationSwitcher';

/**
 * ExpenseForm Component
 * ------------------------------------------------------------------------
 * This component renders the expense submission form, handles input validation,
 * and submits data to the backend.
 *
 * Requirements Addressed:
 * - Expense Submission (Technical Specification/5.2 Feature ID: F-002)
 *   - TR-F002.1: Provide a mobile interface for capturing expense details on-the-go.
 *   - TR-F002.2: Integrate OCR technology for automatic receipt scanning and data extraction.
 *   - TR-F002.4: Allow attachment of digital receipts or photos of physical receipts.
 *   - TR-F002.5: Enable categorization of expenses (e.g., meals, transportation, lodging).
 *   - TR-F002.8: Provide offline mode for expense entry when internet connection is unavailable.
 *
 * Dependencies:
 * - Internal:
 *   - formatDate (src/web/src/utils/formatters.ts): Formats the date input for display and API submission.
 *   - formatCurrency (src/web/src/utils/formatters.ts): Formats the currency input for display and API submission.
 *   - validateEmail (src/web/src/utils/validation.ts): Validates email input if required in the form.
 *   - validateCurrency (src/web/src/utils/validation.ts): Validates the currency input before submission.
 *   - validateDate (src/web/src/utils/validation.ts): Validates the date input before submission.
 *   - useExpenseData (src/web/src/hooks/useExpenseData.ts): Manages and retrieves expense data for the form.
 *   - ReceiptUpload (src/web/src/components/ReceiptUpload.tsx): Handles the uploading of receipt images within the form.
 *   - LocalizationSwitcher (src/web/src/components/LocalizationSwitcher.tsx): Allows users to switch language localizations within the form.
 * - External:
 *   - useState (react): Manages local state within the component. // Version 17.0.2
 *   - useEffect (react): Performs side effects such as fetching initial data on component mount. // Version 17.0.2
 */

const ExpenseForm: React.FC = () => {
  // Step 1: Initialize state variables for managing form inputs.
  const [date, setDate] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [amount, setAmount] = useState<number | ''>('');
  const [currency, setCurrency] = useState<string>('USD');
  const [description, setDescription] = useState<string>('');
  const [receipts, setReceipts] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // useExpenseData hook manages and retrieves expense data.
  const { submitExpense } = useExpenseData();

  // Step 2: Use useEffect to fetch any necessary initial data on component mount.
  useEffect(() => {
    // TODO: Implement data fetching logic if required.
    // This could include fetching categories or currency rates.
  }, []);

  // Step 3: Define functions to handle input changes and validate each field.

  // Handles date input changes and validation.
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDate(value);
    if (!validateDate(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: 'Invalid date format',
      }));
    } else {
      setErrors((prevErrors) => {
        const { date, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  // Handles category selection changes.
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  // Handles amount input changes and validation.
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = parseFloat(value);
    setAmount(isNaN(numericValue) ? '' : numericValue);
    if (!validateCurrency(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: 'Invalid amount',
      }));
    } else {
      setErrors((prevErrors) => {
        const { amount, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  // Handles description input changes.
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  // Step 4: Integrate the ReceiptUpload component.
  // Handles receipt uploads.
  const handleReceiptsUpload = (files: File[]) => {
    setReceipts(files);
  };

  // Step 5: LocalizationSwitcher component is integrated in the render method below.

  // Step 6: Define a function to handle form submission.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs before submission.
    let validationErrors: { [key: string]: string } = {};

    if (!validateDate(date)) {
      validationErrors.date = 'Invalid date format';
    }
    if (!category) {
      validationErrors.category = 'Category is required';
    }
    if (!validateCurrency(amount?.toString() || '')) {
      validationErrors.amount = 'Invalid amount';
    }
    if (!description) {
      validationErrors.description = 'Description is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Prepare data for submission.
    const expenseData = {
      date: formatDate(date),
      category,
      amount: formatCurrency(amount as number),
      currency,
      description,
      receipts,
    };

    try {
      // Submit the expense data to the backend API.
      await submitExpense(expenseData);
      // Reset form after successful submission.
      setDate('');
      setCategory('');
      setAmount('');
      setCurrency('USD');
      setDescription('');
      setReceipts([]);
      setErrors({});
      // TODO: Show success message or redirect as needed.
    } catch (error) {
      // TODO: Handle submission error.
      console.error('Error submitting expense:', error);
    }
  };

  // Step 7: Render the form interface with appropriate validation feedback.
  return (
    <div className="expense-form">
      {/* LocalizationSwitcher allows users to switch language localizations within the form. */}
      <LocalizationSwitcher />

      <form onSubmit={handleSubmit}>
        {/* Date Input Field */}
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        {/* Category Selection Field */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            <option value="meals">Meals</option>
            <option value="transportation">Transportation</option>
            <option value="lodging">Lodging</option>
            <option value="miscellaneous">Miscellaneous</option>
            {/* Additional categories can be added here. */}
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        {/* Amount Input Field */}
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            step="0.01"
            min="0"
          />
          {errors.amount && <span className="error">{errors.amount}</span>}
        </div>

        {/* Currency Selection Field */}
        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            {/* Additional currencies can be added here. */}
          </select>
        </div>

        {/* Description Input Field */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>

        {/* ReceiptUpload Component for uploading receipts */}
        <div className="form-group">
          <ReceiptUpload onUpload={handleReceiptsUpload} />
        </div>

        {/* Submission Button */}
        <button type="submit">Submit Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;