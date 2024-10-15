// src/web/src/components/ExpenseItem.tsx

// Import necessary modules and components
import React, { useState, useEffect } from 'react'; // react v17.0.2
import { formatDate, formatCurrency } from '../utils/formatters';
import { validateDate, validateCurrency } from '../utils/validation';
import ReceiptUpload from './ReceiptUpload';
import useExpenseData from '../hooks/useExpenseData';

// Interface for the Expense object
/**
 * Defines the structure for an Expense object.
 * 
 * Requirements Addressed:
 * - Supports the capture and submission of expense details including date, category,
 *   amount, currency, description, and optional receipt URL.
 *   (Technical Specification/5.2 Feature ID: F-002/Expense Submission)
 */
interface Expense {
  id: number;
  date: string; // ISO date string
  category: string;
  amount: number;
  currency: string;
  description: string;
  receiptUrl?: string;
}

// ExpenseItem Component
/**
 * Renders an individual expense item, displaying its details and providing options
 * for editing or deleting the expense. Ensures that displayed data is formatted
 * consistently and validated before updates.
 * 
 * Requirements Addressed:
 * - Enables categorization of expenses and attachment of digital receipts or
 *   photos of physical receipts.
 *   (Technical Specification/5.2 Feature ID: F-002/Expense Submission)
 * - Ensures consistent formatting and validation of displayed data.
 *   (Technical Specification/5.2)
 * 
 * @param {Expense} expense - The expense object containing all details of the expense.
 * @returns {JSX.Element} A React component rendering the expense item interface.
 */
const ExpenseItem: React.FC<{ expense: Expense }> = ({ expense }) => {
  // Initialize state variables for managing the expense details using useState.
  const [isEditing, setIsEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState<Expense>(expense);
  const [error, setError] = useState<string | null>(null);

  // Hook to manage and update expense data.
  const { updateExpense, deleteExpense } = useExpenseData();

  // Use useEffect to fetch any necessary data on component mount, such as related receipts.
  useEffect(() => {
    // Placeholder for fetching additional data if necessary.
    // Currently assumes all required data is passed via props.
  }, []);

  // Format the date and amount of the expense using utility functions.
  const formattedDate = formatDate(editedExpense.date);
  const formattedAmount = formatCurrency(editedExpense.amount, editedExpense.currency);

  // Validate the expense details before saving updates.
  /**
   * Validates the edited expense details using validation utilities.
   * 
   * Requirements Addressed:
   * - Validates expense inputs to prevent submission of invalid data.
   *   (Technical Specification/5.2 Feature ID: F-002/Expense Submission)
   * 
   * @returns {boolean} True if validation passes, false otherwise.
   */
  const validateExpenseDetails = (): boolean => {
    if (!validateDate(editedExpense.date)) {
      setError('Invalid date format.');
      return false;
    }
    if (!validateCurrency(editedExpense.amount)) {
      setError('Invalid amount.');
      return false;
    }
    setError(null);
    return true;
  };

  // Handler for saving the edited expense after validation.
  /**
   * Handles saving the edited expense details.
   * 
   * Requirements Addressed:
   * - Allows users to update expense details and re-validate inputs.
   *   (Technical Specification/5.2 Feature ID: F-002/Expense Submission)
   */
  const handleSave = () => {
    if (validateExpenseDetails()) {
      updateExpense(editedExpense);
      setIsEditing(false);
    }
  };

  // Handler for canceling the edit operation and reverting changes.
  /**
   * Cancels the editing mode and resets the edited expense to original values.
   */
  const handleCancel = () => {
    setEditedExpense(expense);
    setIsEditing(false);
    setError(null);
  };

  // Handler for deleting the expense.
  /**
   * Deletes the expense item.
   * 
   * Requirements Addressed:
   * - Provides an option for deleting the expense.
   *   (Technical Specification/5.2 Feature ID: F-002/Expense Submission)
   */
  const handleDelete = () => {
    deleteExpense(expense.id);
  };

  // Render the editing interface if the user is in editing mode.
  if (isEditing) {
    return (
      <div className="expense-item editing">
        {error && <div className="error">{error}</div>}

        <div className="expense-field">
          <label>Date:</label>
          <input
            type="date"
            value={editedExpense.date}
            onChange={(e) => setEditedExpense({ ...editedExpense, date: e.target.value })}
          />
        </div>

        <div className="expense-field">
          <label>Category:</label>
          <select
            value={editedExpense.category}
            onChange={(e) => setEditedExpense({ ...editedExpense, category: e.target.value })}
          >
            <option value="Meals">Meals</option>
            <option value="Transportation">Transportation</option>
            <option value="Lodging">Lodging</option>
            <option value="Miscellaneous">Miscellaneous</option>
            {/* Additional categories as per company policy */}
          </select>
        </div>

        <div className="expense-field">
          <label>Amount:</label>
          <input
            type="number"
            value={editedExpense.amount}
            onChange={(e) =>
              setEditedExpense({ ...editedExpense, amount: parseFloat(e.target.value) })
            }
          />
        </div>

        <div className="expense-field">
          <label>Currency:</label>
          <select
            value={editedExpense.currency}
            onChange={(e) => setEditedExpense({ ...editedExpense, currency: e.target.value })}
          >
            <option value="USD">USD</option>
            {/* Include other currencies as needed */}
          </select>
        </div>

        <div className="expense-field">
          <label>Description:</label>
          <input
            type="text"
            value={editedExpense.description}
            onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })}
          />
        </div>

        {/* Integrate the ReceiptUpload component to allow users to attach or update receipt images for the expense. */}
        <div className="expense-field">
          <label>Receipt:</label>
          <ReceiptUpload
            receiptUrl={editedExpense.receiptUrl}
            onUpload={(url) => setEditedExpense({ ...editedExpense, receiptUrl: url })}
          />
        </div>

        <div className="expense-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    );
  }

  // Render the expense item interface in display mode.
  return (
    <div className="expense-item">
      <div className="expense-info">
        <div>
          <strong>Date:</strong> {formattedDate}
        </div>
        <div>
          <strong>Category:</strong> {editedExpense.category}
        </div>
        <div>
          <strong>Amount:</strong> {formattedAmount}
        </div>
        <div>
          <strong>Description:</strong> {editedExpense.description}
        </div>
        {editedExpense.receiptUrl && (
          <div>
            <strong>Receipt:</strong>{' '}
            <a href={editedExpense.receiptUrl} target="_blank" rel="noopener noreferrer">
              View Receipt
            </a>
          </div>
        )}
      </div>
      <div className="expense-actions">
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ExpenseItem;