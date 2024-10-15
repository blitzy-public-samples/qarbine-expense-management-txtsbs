// Importing axios to perform HTTP requests to the backend API
// axios version: 0.21.1
import axios from 'axios';

// Importing API_BASE_URL to construct API endpoints for reporting requests
import { API_BASE_URL } from '../utils/constants';

// Importing utilities to format dates and currency values in reports
import { formatDate, formatCurrency } from '../utils/formatters';

// Importing validation utility to ensure date inputs for reports are valid
import { validateDate } from '../utils/validation';

// Importing useAuth to manage authentication state and ensure secure API requests
import { useAuth } from '../hooks/useAuth';

// Importing useExpenseData to retrieve and manage expense data for reporting
import { useExpenseData } from '../hooks/useExpenseData';

/**
 * Generates a comprehensive report based on specified criteria.
 * 
 * Addresses:
 * - Feature: Reporting and Analytics
 * - Location: Technical Specification/5.6 Feature ID: F-006/Reporting and Analytics
 * - Requirement ID: TR-F006.2 - Generate detailed expense reports by employee, department, project, or cost center
 * 
 * @param {string} startDate - The start date for the reporting period in 'YYYY-MM-DD' format.
 * @param {string} endDate - The end date for the reporting period in 'YYYY-MM-DD' format.
 * @param {string} userId - The ID of the user for whom to generate the report.
 * @returns {Promise<object>} An object containing the report data and metadata.
 */
export async function generateReport(startDate: string, endDate: string, userId: string): Promise<object> {
  // Step 1: Validate the startDate and endDate using validateDate utility.
  if (!validateDate(startDate) || !validateDate(endDate)) {
    throw new Error('Invalid date format. Please provide dates in YYYY-MM-DD format.');
  }

  // Step 2: Ensure the user is authenticated using useAuth hook.
  // Note: useAuth is typically used within React components; here we assume it provides necessary methods.
  const auth = useAuth();
  if (!auth.isAuthenticated()) {
    throw new Error('User is not authenticated.');
  }
  const token = auth.getToken();

  // Step 3: Fetch expense data for the specified user and date range using useExpenseData hook.
  // Note: useExpenseData is assumed to provide a method to fetch data; adapted for use outside React components.
  const expenseData = await fetchExpenseData(userId, startDate, endDate, token);

  // Step 4: Format the fetched data using formatDate and formatCurrency utilities.
  const formattedExpenses = expenseData.map((expense: any) => ({
    ...expense,
    date: formatDate(expense.date),
    amount: formatCurrency(expense.amount, expense.currency),
  }));

  // Step 5: Compile the formatted data into a report structure.
  const totalAmount = expenseData.reduce((sum: number, expense: any) => sum + expense.amount, 0);
  const report = {
    userId,
    period: {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    },
    totalAmount: formatCurrency(totalAmount, 'USD'),
    expenses: formattedExpenses,
    generatedAt: new Date().toISOString(),
  };

  // Step 6: Return the compiled report data.
  return report;
}

/**
 * Fetches expense data from the backend API.
 * 
 * Addresses:
 * - Step in generateReport: Fetch expense data for the specified user and date range.
 * 
 * @param {string} userId - The ID of the user for whom to fetch expenses.
 * @param {string} startDate - The start date for filtering expenses.
 * @param {string} endDate - The end date for filtering expenses.
 * @param {string} token - The authentication token for secure API requests.
 * @returns {Promise<Array<any>>} An array of expense data.
 */
async function fetchExpenseData(userId: string, startDate: string, endDate: string, token: string): Promise<Array<any>> {
  try {
    const response = await axios.get(`${API_BASE_URL}/expenses`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        userId,
        startDate,
        endDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching expense data:', error);
    throw new Error('Failed to retrieve expense data.');
  }
}