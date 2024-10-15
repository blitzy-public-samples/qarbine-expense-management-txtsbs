// MobileLoginPage.tsx

// External imports
// React version 17.0.2
import React, { useState, useEffect } from 'react';

// Internal imports
import { useAuth } from '../../../hooks/useAuth';
import { login } from '../../../services/auth';
import { validateEmail } from '../../../utils/validation';
import { API_BASE_URL } from '../../../utils/constants';

// Description:
// This component renders the mobile login page, handling user input for email and password,
// performing validation, and initiating the login process.

// Requirements Addressed:
// - Secure User Authentication (Technical Specification/5.1 Feature ID: F-001)
//   - TR-F001.1: Implement secure login using unique username and password.
//     (Location: Technical Specification/5.1 Feature ID: F-001/TR-F001.1)
//   - TR-F001.3: Enable Single Sign-On (SSO) integration with company identity providers.
//     (Location: Technical Specification/5.1 Feature ID: F-001/TR-F001.3)

// MobileLoginPage Component
const MobileLoginPage: React.FC = () => {
  // Initialize state variables for email, password, and error messages using useState.
  // These state variables manage user inputs and error handling for the login form.
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Use the useAuth hook to access authentication state and methods.
  // useAuth provides methods to manage user authentication status throughout the app.
  const { isAuthenticated, authLogin } = useAuth();

  // Handle side effects such as redirecting authenticated users using useEffect.
  // If the user is already authenticated, redirect them to the home page.
  useEffect(() => {
    if (isAuthenticated) {
      // TODO: Redirect authenticated users to the home page.
      // Navigation logic should be implemented here.
      // Since navigation methods are not specified in dependencies, assume it will be handled appropriately.
      // This addresses the step: "Handle side effects such as redirecting authenticated users using useEffect."
    }
  }, [isAuthenticated]);

  // Define a handleLogin function that validates input and calls the login service.
  const handleLogin = async () => {
    // Clear any previous error messages.
    setErrorMessage('');

    // Validate email format using validateEmail utility function.
    // This ensures the user enters a valid email address.
    // Using validateEmail from src/web/src/utils/validation.ts
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Ensure password is not empty.
    if (password.trim() === '') {
      setErrorMessage('Please enter your password.');
      return;
    }

    try {
      // Call the login service to authenticate the user.
      // This addresses TR-F001.1: Implement secure login using unique username and password.
      // login is imported from src/web/src/services/auth.ts
      const authToken = await login(email, password);

      // Update authentication state using useAuth hook.
      // authLogin method saves the authentication token and updates auth state.
      authLogin(authToken);

      // On successful login, the user will be redirected by the useEffect above.
    } catch (error) {
      // Display error message if login is unsuccessful.
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  // Define a function to handle Single Sign-On (SSO) login.
  const handleSSOLogin = () => {
    // Implement SSO login logic here.
    // This addresses TR-F001.3: Enable Single Sign-On (SSO) integration with company identity providers.
    // Note: The actual SSO implementation would depend on the identity provider's SDK or API.
  };

  // Render the login form.
  return (
    <div className="login-page">
      {/* Login form UI elements */}
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          {/* Input field for email */}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          {/* Input field for password */}
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        {/* Display error messages if any */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {/* Login button */}
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      {/* Single Sign-On (SSO) login option */}
      <div className="sso-login">
        <p>Or login with your company account:</p>
        {/* SSO login button */}
        <button type="button" onClick={handleSSOLogin}>
          Single Sign-On (SSO)
        </button>
      </div>
    </div>
  );
};

export default MobileLoginPage;