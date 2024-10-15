// Import constants for date format and default currency
import { DATE_FORMAT, DEFAULT_CURRENCY } from './constants';

/**
 * Formats a date string to the standard date format used in the application.
 *
 * This function ensures that dates are formatted consistently across the application,
 * addressing the requirement "Consistent Data Formatting".
 *
 * Requirement Reference:
 * - Technical Specification/5.11 Feature ID: F-011/User Interface Requirements
 *   - Description: "Maintain consistent branding and design language across all platforms by centralizing formatting utilities."
 *
 * @param {string} date - The input date string to format.
 * @returns {string} The formatted date string.
 */
export function formatDate(date: string): string {
  // Parse the input date string to a Date object
  const dateObject = new Date(date);

  // Check if the date is valid
  if (isNaN(dateObject.getTime())) {
    throw new Error('Invalid date string provided to formatDate.');
  }

  // Format the Date object to the standard DATE_FORMAT from constants
  // Here we assume DATE_FORMAT is a string like 'YYYY-MM-DD' or 'DD/MM/YYYY'
  // Since we cannot use external libraries, we'll implement a simple formatter

  const year = dateObject.getFullYear();
  const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
  const day = ('0' + dateObject.getDate()).slice(-2);

  let formattedDate = DATE_FORMAT
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day);

  // Return the formatted date string
  return formattedDate;
}

/**
 * Formats a number to a currency string using the default currency format.
 *
 * This function ensures that currency values are formatted consistently across the application,
 * addressing the requirement "Consistent Data Formatting".
 *
 * Requirement Reference:
 * - Technical Specification/5.11 Feature ID: F-011/User Interface Requirements
 *   - Description: "Maintain consistent branding and design language across all platforms by centralizing formatting utilities."
 *
 * @param {number} amount - The amount to format.
 * @returns {string} The formatted currency string.
 */
export function formatCurrency(amount: number): string {
  // Convert the number to a string with two decimal places
  const formattedAmount = amount.toFixed(2);

  // Prepend the DEFAULT_CURRENCY symbol from constants to the formatted string
  const currencySymbol = DEFAULT_CURRENCY;

  // Return the formatted currency string
  return `${currencySymbol}${formattedAmount}`;
}