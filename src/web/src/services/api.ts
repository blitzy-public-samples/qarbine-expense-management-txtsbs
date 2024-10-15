// Importing axios for HTTP requests (version 0.21.1)
import axios from 'axios'; // axios version 0.21.1

// Importing the base URL for API endpoints
import { API_BASE_URL } from '../utils/constants';

// Importing the function to get authentication token
import { getAuthToken } from '../hooks/useAuth';

// Importing validation function for email
import { validateEmail } from '../utils/validation';

/**
 * This module provides core API service functions for the web application,
 * handling HTTP requests to the backend API.
 * It serves as a centralized module for making API calls related to various features
 * such as expense management, user authentication, notifications, and reporting.
 *
 * Requirements Addressed:
 * - System Integrations (Technical Specification/5.9 Feature ID: F-009/System Integrations)
 *   - Facilitates seamless integration with existing accounting, HR, and payroll systems,
 *     as well as external tax databases and currency exchange rate providers to ensure
 *     data consistency and operational efficiency.
 */

// Create an axios instance with the base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include authentication tokens
apiClient.interceptors.request.use(
  (config) => {
    // Get the authentication token using getAuthToken from useAuth
    const authToken = getAuthToken();

    if (authToken) {
      // Include the auth token in the headers
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Fetches a list of expenses for the authenticated user from the backend API.
 * 
 * Requirements Addressed:
 * - System Integrations (Technical Specification/5.9 Feature ID: F-009/System Integrations)
 *   - Integrates with backend systems to fetch user expenses, ensuring data consistency.
 * 
 * @param userId - The ID of the user whose expenses are to be fetched.
 * @returns A promise that resolves to the list of expenses.
 */
export const fetchExpenses = async (userId: string): Promise<any[]> => {
  // Construct the API endpoint URL using the API_BASE_URL and userId
  const url = `/expenses/${userId}`;

  try {
    // Use axios to send a GET request to the constructed URL
    const response = await apiClient.get(url);

    // Return the response data containing the list of expenses
    return response.data.expenses;
  } catch (error) {
    // Handle error appropriately
    throw error;
  }
};

/**
 * Submits a new expense report to the backend API.
 * 
 * Requirements Addressed:
 * - System Integrations (Technical Specification/5.9 Feature ID: F-009/System Integrations)
 *   - Submits expense data to backend systems, ensuring operational efficiency.
 * 
 * @param expenseData - An object containing expense details to be submitted.
 * @returns A promise that resolves to the submitted expense report data.
 */
export const submitExpense = async (expenseData: object): Promise<any> => {
  // Validate the expense data using relevant validation functions
  // Note: Implement validation as per application requirements
  // e.g., check required fields, data types, etc.

  // Construct the API endpoint URL using the API_BASE_URL
  const url = `/expenses`;

  try {
    // Use axios to send a POST request with the expense data to the constructed URL
    const response = await apiClient.post(url, expenseData);

    // Return the response data containing the submitted expense report
    return response.data;
  } catch (error) {
    // Handle error appropriately
    throw error;
  }
};

/**
 * Fetches notifications for the authenticated user from the backend API.
 * 
 * Requirements Addressed:
 * - System Integrations (Technical Specification/5.9 Feature ID: F-009/System Integrations)
 *   - Retrieves user notifications from backend systems, ensuring data consistency.
 * 
 * @param userId - The ID of the user whose notifications are to be fetched.
 * @returns A promise that resolves to the list of notifications.
 */
export const fetchNotifications = async (userId: string): Promise<any[]> => {
  // Construct the API endpoint URL using the API_BASE_URL and userId
  const url = `/notifications/${userId}`;

  try {
    // Use axios to send a GET request to the constructed URL
    const response = await apiClient.get(url);

    // Return the response data containing the list of notifications
    return response.data.notifications;
  } catch (error) {
    // Handle error appropriately
    throw error;
  }
};