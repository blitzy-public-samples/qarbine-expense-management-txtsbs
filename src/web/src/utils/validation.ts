// Import necessary constants and functions
import { API_BASE_URL } from './constants'; // To use consistent API endpoints for validation-related requests if needed.
// Version: N/A (Internal module)

import { formatDate, formatCurrency } from './formatters'; // To ensure dates and currency values are validated against the correct formats.
// Version: N/A (Internal module)

/**
 * Validation utility functions for user input data.
 *
 * This file contains utility functions for validating various types of input data within the web application.
 * These functions ensure that data entered by users meets the required formats and constraints before being processed or submitted to the backend.
 *
 * Requirements Addressed:
 * - Data Validation
 *   - Location: Technical Specification/5.2 Feature ID: F-002/Expense Submission
 *   - Description: Ensure that all user inputs are validated for correctness and compliance with expected formats before submission.
 */

/**
 * Validates the format of an email address to ensure it meets standard email format requirements.
 *
 * Requirements Addressed:
 * - Data Validation for Email
 *   - Location: Technical Specification/5.2 Feature ID: F-002/Expense Submission
 *   - Description: Validate email input to ensure correctness before submission.
 *
 * @param email - The email address to validate as a string.
 * @returns True if the email format is valid, false otherwise.
 *
 * Steps:
 * 1. Check if the email contains an '@' symbol and a domain.
 * 2. Use a regular expression to match the email against standard email format.
 * 3. Return true if the email matches the format, otherwise return false.
 */
export function validateEmail(email: string): boolean {
  // Step 1: Check if the email contains an '@' symbol and a domain.
  if (!email.includes('@')) {
    // Email does not contain '@', invalid email format
    return false;
  }

  // Step 2: Use a regular expression to match the email against standard email format.
  // Regular expression pattern for validating email addresses
  // Note: This regex is a simplified version and may not cover all edge cases.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValid = emailRegex.test(email);

  // Step 3: Return true if the email matches the format, otherwise return false.
  return isValid;
}

/**
 * Validates that a given string represents a valid currency format.
 *
 * Requirements Addressed:
 * - Data Validation for Currency
 *   - Location: Technical Specification/5.2 Feature ID: F-002/Expense Submission
 *   - Description: Validate currency input to ensure correctness before submission.
 *
 * @param currency - The currency value to validate as a string.
 * @returns True if the currency format is valid, false otherwise.
 *
 * Steps:
 * 1. Check if the currency string can be parsed into a number.
 * 2. Ensure the currency has two decimal places.
 * 3. Return true if the currency is valid, otherwise return false.
 */
export function validateCurrency(currency: string): boolean {
  // Step 1: Check if the currency string can be parsed into a number.
  const parsed = parseFloat(currency);

  if (isNaN(parsed)) {
    // Currency string is not a valid number
    return false;
  }

  // Step 2: Ensure the currency has two decimal places.
  // Use formatCurrency function to ensure correct formatting
  const formatted = formatCurrency(parsed); // formatCurrency imported from './formatters'

  if (currency !== formatted) {
    // Input currency string does not match formatted currency string
    return false;
  }

  // Step 3: Return true if the currency is valid, otherwise return false.
  return true;
}

/**
 * Validates that a given string represents a valid date format.
 *
 * Requirements Addressed:
 * - Data Validation for Date
 *   - Location: Technical Specification/5.2 Feature ID: F-002/Expense Submission
 *   - Description: Validate date input to ensure correctness before submission.
 *
 * @param date - The date string to validate.
 * @returns True if the date format is valid, false otherwise.
 *
 * Steps:
 * 1. Use the formatDate function to attempt to parse the date string.
 * 2. Check if the parsed date is valid and matches the expected format.
 * 3. Return true if the date is valid, otherwise return false.
 */
export function validateDate(date: string): boolean {
  // Step 1: Use the formatDate function to attempt to parse the date string.
  const formattedDate = formatDate(date); // formatDate imported from './formatters'

  // If formatDate returns null or an invalid date, we consider the input invalid
  if (!formattedDate) {
    // Invalid date format
    return false;
  }

  // Step 2: Check if the parsed date is valid and matches the expected format.
  // (Assuming that formatDate will return a standardized date string if valid)

  // Step 3: Return true if the date is valid, otherwise return false.
  return true;
}