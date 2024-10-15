/**
 * src/web/src/pages/LoginPage.tsx
 *
 * This file defines the LoginPage component for the web application.
 * It provides the user interface and logic for user authentication,
 * allowing users to log in using their credentials.
 *
 * Requirements Addressed:
 * - Secure User Authentication
 *   - Technical Specification/5.1 Feature ID: F-001/Secure User Authentication and Role-Based Authorization
 *     - TR-F001.1: Implement secure login using unique username and password (High Priority)
 *     - TR-F001.3: Enable Single Sign-On (SSO) integration with company identity providers (High Priority)
 */

// External dependencies (React Hooks)
// React version: 17.0.2
import React, { useState, useEffect } from 'react'; // External - React v17.0.2

// Internal dependencies
import { useAuth } from '../hooks/useAuth'; // Manages user authentication state and provides login/logout functionality
import { validateEmail } from '../utils/validation'; // Validates the format of email addresses during login
import { login } from '../services/auth'; // Authenticates users and retrieves authentication tokens
import Header from '../components/Header'; // Displays the top navigation bar on the login page
import Footer from '../components/Footer'; // Displays the footer content on the login page

// Importing CSS styles for the LoginPage component
import '../styles/LoginPage.css';

/**
 * LoginPage Component
 *
 * Renders the login page component with input fields for email and password,
 * and handles user authentication.
 *
 * Requirements Addressed:
 * - Secure User Authentication
 *   - Technical Specification/5.1 Feature ID: F-001
 *     - TR-F001.1: Implement secure login using unique username and password
 *     - TR-F001.3: Enable Single Sign-On (SSO) integration with company identity providers
 */
const LoginPage: React.FC = () => {
  // Initialize state variables for email, password, and error messages using useState hook
  const [email, setEmail] = useState<string>(''); // Stores the user's email input
  const [password, setPassword] = useState<string>(''); // Stores the user's password input
  const [errorMessage, setErrorMessage] = useState<string>(''); // Stores error messages to display to the user

  // Use the useAuth hook to manage authentication state and redirect authenticated users
  const { isAuthenticated, authenticate, redirectToDashboard } = useAuth();

  // UseEffect to redirect authenticated users to the dashboard
  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to the dashboard if the user is already authenticated
      redirectToDashboard();
    }
  }, [isAuthenticated, redirectToDashboard]);

  /**
   * handleLogin function
   *
   * Validates the email format and calls the login service to authenticate the user.
   *
   * Steps:
   * 1. Prevent the default form submission behavior.
   * 2. Clear any existing error messages.
   * 3. Validate the email format using the validateEmail utility function.
   * 4. If the email is invalid, set an appropriate error message.
   * 5. Call the login service with the entered email and password.
   * 6. If authentication is successful, update the authentication state.
   * 7. If authentication fails, display an error message to the user.
   *
   * Requirements Addressed:
   * - Secure User Authentication
   *   - Technical Specification/5.1 Feature ID: F-001
   *     - TR-F001.1: Implement secure login using unique username and password
   */
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Step 1: Prevent default form submission

    setErrorMessage(''); // Step 2: Clear existing error messages

    // Step 3: Validate the email format
    if (!validateEmail(email)) {
      // Step 4: Set error message if email is invalid
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      // Step 5: Call the login service to authenticate the user
      const token = await login(email, password);

      // Step 6: Update authentication state upon successful login
      authenticate(token);

      // Redirect to the dashboard handled by useEffect
    } catch (error) {
      // Step 7: Display error message if authentication fails
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  // Return the constructed JSX element for the login page
  return (
    <div className="login-page">
      {/* Render the Header component at the top of the page */}
      <Header />

      <div className="login-container">
        <h2>Login</h2>

        {/* Display error messages if authentication fails or input validation errors occur */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Login form */}
        <form onSubmit={handleLogin}>
          {/* Email Input Field */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email" // Ensures the email keyboard on mobile devices
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required // HTML5 validation for required field
              autoFocus // Automatically focuses on this field when the component mounts
            />
          </div>

          {/* Password Input Field */}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password" // Masks the input for password security
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required // HTML5 validation for required field
            />
          </div>

          {/* Submit Button */}
          <button type="submit">Login</button>
        </form>
      </div>

      {/* Render the Footer component at the bottom of the page */}
      <Footer />
    </div>
  );
};

export default LoginPage;