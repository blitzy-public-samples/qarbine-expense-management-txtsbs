// Import necessary modules and dependencies
import { useState, useEffect } from 'react';

// External dependency: axios version 0.21.1 used for HTTP requests to the backend API
import axios from 'axios'; // Version: 0.21.1

// Internal dependencies for authentication services and utilities
import {
  login as loginService,
  logout as logoutService,
  AUTH_TOKEN_KEY,
} from '../services/auth'; // Provides login, logout services, and authentication token key
import { API_BASE_URL } from '../utils/constants'; // Base URL for constructing API endpoints
import { validateEmail } from '../utils/validation'; // Function to validate email format during login

/**
 * Custom hook that provides authentication functionalities including login, logout,
 * and checking authentication status.
 *
 * Requirements Addressed:
 * - Secure User Authentication and Role-Based Authorization
 *   - TR-F001.1: Implement secure login using unique username and password
 *     Location: Technical Specification/5.1 Feature ID: F-001/TR-F001.1
 *   - TR-F001.3: Enable Single Sign-On (SSO) integration with company identity providers
 *     Location: Technical Specification/5.1 Feature ID: F-001/TR-F001.3
 *
 * This hook ensures that authentication state is consistently maintained across the application.
 */
export const useAuth = () => {
  // Initialize authentication state using React's useState hook
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Effect hook to check if the user is authenticated by verifying the presence of a valid authentication token
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    setIsAuthenticated(!!token);
  }, []);

  /**
   * Login function that uses the login service to authenticate the user
   * and update the authentication state.
   *
   * Steps:
   * 1. Validate the format of the email address using validateEmail function.
   * 2. Call the login service to authenticate the user and retrieve authentication tokens.
   * 3. Store the authentication token key in local storage.
   * 4. Update the authentication state to true.
   *
   * @param email - User's email address
   * @param password - User's password
   * @throws Error if email format is invalid or authentication fails.
   */
  const login = async (email: string, password: string) => {
    // Validate email format during login
    if (!validateEmail(email)) {
      throw new Error('Invalid email format');
    }

    try {
      // Use the login service to authenticate users and retrieve authentication tokens
      const response = await loginService(email, password);

      // Store authentication token key in local storage
      localStorage.setItem(AUTH_TOKEN_KEY, response.token);

      // Update authentication state
      setIsAuthenticated(true);
    } catch (error) {
      // Handle authentication errors
      throw new Error('Authentication failed');
    }
  };

  /**
   * Logout function that uses the logout service to clear the authentication token
   * and update the authentication state.
   *
   * Steps:
   * 1. Call the logout service to perform any necessary cleanup.
   * 2. Remove the authentication token from local storage.
   * 3. Update the authentication state to false.
   */
  const logout = () => {
    // Use the logout service to clear authentication tokens and update authentication state
    logoutService();

    // Remove the authentication token from local storage
    localStorage.removeItem(AUTH_TOKEN_KEY);

    // Update authentication state
    setIsAuthenticated(false);
  };

  // Return the authentication state and functions for use in components
  return {
    isAuthenticated,
    login,
    logout,
  };
};