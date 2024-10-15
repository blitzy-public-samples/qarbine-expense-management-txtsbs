// Importing the API_BASE_URL constant to construct API endpoint URLs.
// From 'src/web/src/utils/constants.ts'.
import { API_BASE_URL } from '../utils/constants';

// Importing the validateEmail function to validate the format of email addresses during login.
// From 'src/web/src/utils/validation.ts'.
import { validateEmail } from '../utils/validation';

// Importing axios to perform HTTP requests to the backend API.
// From 'src/web/src/services/api.ts'.
import axios from './api'; // axios version 0.21.1

// Importing AUTH_TOKEN_KEY to manage the storage and retrieval of the authentication token.
// From 'src/web/src/hooks/useAuth.ts'.
import { AUTH_TOKEN_KEY } from '../hooks/useAuth';

/**
 * Authenticates a user by sending their credentials to the backend API and storing the received authentication token.
 *
 * Addresses requirement:
 * - Secure User Authentication
 *   - Location: Technical Specification/5.1 Feature ID: F-001/Secure User Authentication and Role-Based Authorization
 *     - TR-F001.1 Implement secure login using unique username and password (High Priority)
 *
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns A promise that resolves to the authentication token if login is successful.
 */
export async function login(email: string, password: string): Promise<string> {
    // Validate the email format using the validateEmail function.
    if (!validateEmail(email)) {
        throw new Error('Invalid email format');
    }

    // Construct the login API endpoint URL using the API_BASE_URL.
    const loginUrl = `${API_BASE_URL}/auth/login`;

    try {
        // Use axios to send a POST request with the email and password to the login endpoint.
        const response = await axios.post(loginUrl, {
            email,
            password,
        });

        // Extract the authentication token from the response data.
        const { token } = response.data;

        // Store the received authentication token in local storage using the AUTH_TOKEN_KEY.
        localStorage.setItem(AUTH_TOKEN_KEY, token);

        // Return the authentication token.
        return token;
    } catch (error) {
        // Handle errors (e.g., invalid credentials, network errors).
        throw error;
    }
}

/**
 * Logs out the user by clearing the authentication token from local storage.
 *
 * Addresses requirement:
 * - Secure User Authentication
 *   - Location: Technical Specification/5.1 Feature ID: F-001/Secure User Authentication and Role-Based Authorization
 *     - Ensures secure session management by invalidating user sessions upon logout.
 *
 * @returns void
 */
export function logout(): void {
    // Remove the authentication token from local storage using the AUTH_TOKEN_KEY.
    localStorage.removeItem(AUTH_TOKEN_KEY);
}