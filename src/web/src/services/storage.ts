/**
 * @file storage.ts
 * @description Provides utility functions for managing local storage operations within the web application.
 * Ensures consistent and secure handling of data stored in the browser's local storage,
 * facilitating the storage and retrieval of user-specific data such as authentication tokens and user preferences.
 *
 * Requirements Addressed:
 * - Data Management (Technical Specification/5.10 Feature ID: F-010/Data Management)
 *   - Ensure secure and efficient management of all data within the application, including storage,
 *     retention, export, and archiving, in compliance with legal and tax requirements.
 */

// Import internal dependencies
import { AUTH_TOKEN_KEY } from './auth'; // To manage the storage and retrieval of the authentication token.
import { API_BASE_URL } from '../utils/constants'; // To ensure consistent API endpoint usage for any storage-related operations.

// Global storage prefix to namespace storage keys and prevent key collisions
const STORAGE_PREFIX = 'expense_tracker_';

/**
 * Stores a key-value pair in local storage with a predefined prefix.
 *
 * @param key - The key under which the value will be stored.
 * @param value - The value to store. Can be a string or an object.
 *
 * Steps:
 * 1. Prepend the STORAGE_PREFIX to the key.
 * 2. Convert the value to a JSON string if it is an object.
 * 3. Store the key-value pair in local storage.
 *
 * Requirements Addressed:
 * - Data Management (Technical Specification/5.10 Feature ID: F-010/Data Management)
 *   - Securely handle data storage to maintain data integrity and compliance.
 */
export function setItem(key: string, value: any): void {
  const prefixedKey = `${STORAGE_PREFIX}${key}`;
  try {
    // Convert the value to a JSON string if it is an object
    const valueToStore =
      typeof value === 'object' ? JSON.stringify(value) : value;
    // Store the key-value pair in local storage
    localStorage.setItem(prefixedKey, valueToStore);
  } catch (error) {
    console.error(`Error setting item in localStorage with key "${prefixedKey}":`, error);
    // Error handling as per application policy
  }
}

/**
 * Retrieves a value from local storage by its key, using a predefined prefix.
 *
 * @param key - The key under which the value is stored.
 * @returns The retrieved value from local storage, or null if not found.
 *
 * Steps:
 * 1. Prepend the STORAGE_PREFIX to the key.
 * 2. Retrieve the value from local storage.
 * 3. Parse the value as JSON if it is a JSON string.
 * 4. Return the parsed value or the raw string.
 *
 * Requirements Addressed:
 * - Data Management (Technical Specification/5.10 Feature ID: F-010/Data Management)
 *   - Efficiently retrieve stored data while ensuring data integrity.
 */
export function getItem(key: string): any {
  const prefixedKey = `${STORAGE_PREFIX}${key}`;
  try {
    // Retrieve the value from local storage
    const storedValue = localStorage.getItem(prefixedKey);
    if (storedValue === null) {
      return null;
    }
    // Parse the value as JSON if it is a JSON string
    try {
      return JSON.parse(storedValue);
    } catch {
      // Return the raw string if parsing fails
      return storedValue;
    }
  } catch (error) {
    console.error(`Error getting item from localStorage with key "${prefixedKey}":`, error);
    // Error handling as per application policy
    return null;
  }
}

/**
 * Removes a key-value pair from local storage by its key, using a predefined prefix.
 *
 * @param key - The key under which the value is stored.
 *
 * Steps:
 * 1. Prepend the STORAGE_PREFIX to the key.
 * 2. Remove the key-value pair from local storage.
 *
 * Requirements Addressed:
 * - Data Management (Technical Specification/5.10 Feature ID: F-010/Data Management)
 *   - Properly manage data deletion to maintain data integrity and privacy.
 */
export function removeItem(key: string): void {
  const prefixedKey = `${STORAGE_PREFIX}${key}`;
  try {
    // Remove the key-value pair from local storage
    localStorage.removeItem(prefixedKey);
  } catch (error) {
    console.error(`Error removing item from localStorage with key "${prefixedKey}":`, error);
    // Error handling as per application policy
  }
}