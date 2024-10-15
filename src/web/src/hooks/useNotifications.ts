// External Dependencies
import { useState, useEffect } from 'react';
import axios from 'axios'; // v0.21.1 - Used for performing HTTP requests to the backend API.

// Internal Dependencies
import { getNotifications } from '../services/notification'; // To fetch notifications from the backend API.
import { API_BASE_URL } from '../utils/constants'; // To construct API endpoints for fetching notifications.
import { useAuth } from './useAuth'; // To manage authentication state and ensure notifications are fetched for authenticated users.

/**
 * Custom React hook for managing user notifications within the web application.
 *
 * Description:
 * Provides functionalities to fetch and manage notifications for the user.
 * Interfaces with the notification service to fetch and handle notifications,
 * ensuring that components can access and display notification data effectively.
 *
 * Requirements Addressed:
 * - Name: Notification and Alerting System
 * - Location: Technical Specification/5.17 Feature ID: F-017/Notification and Alerting System
 *   - Description: Develop a robust system to keep users informed about important events, updates, and actions required within the application through various communication channels.
 *   - Technical Requirements:
 *     - TR-F017.1: Send email and in-app notifications for pending expense approvals (Priority: High)
 *     - TR-F017.3: Alert managers of newly submitted expenses awaiting approval (Priority: High)
 *
 * The hook ensures users receive in-app notifications, fulfilling the requirement to keep users informed about important events.
 *
 * @returns An object containing notification data and functions to refresh or clear notifications.
 */
function useNotifications() {
  // Initialize state variables for storing notification data and loading status.
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Use the useAuth hook to ensure the user is authenticated before fetching notifications.
  const { isAuthenticated, user } = useAuth();

  /**
   * Fetches notifications for the authenticated user.
   *
   * Steps:
   * 1. Check if the user is authenticated.
   * 2. Set the loading state to true before starting the fetch operation.
   * 3. Use getNotifications from the notification service to fetch notifications.
   * 4. Update the notifications state with the fetched data.
   * 5. Handle loading and error states during the fetch operation.
   * 6. Set the loading state to false after the operation completes.
   *
   * Addresses:
   * - TR-F017.1 and TR-F017.3 by fetching notifications relevant to the user.
   */
  const fetchNotifications = async () => {
    // Step 1: Ensure the user is authenticated.
    if (!isAuthenticated || !user) {
      return; // Do not fetch notifications if the user is not authenticated.
    }

    // Step 2: Set loading state to true.
    setLoading(true);
    setError(null);

    try {
      // Step 3: Fetch notifications using getNotifications from the notification service.
      const data = await getNotifications(user.id);

      // Step 4: Update the notifications state with the fetched data.
      setNotifications(data);
    } catch (err) {
      // Step 5: Handle any errors that occur during the fetch operation.
      setError('Failed to fetch notifications.');
      console.error('Error fetching notifications:', err);
    } finally {
      // Step 6: Set loading state to false.
      setLoading(false);
    }
  };

  /**
   * Refreshes the notifications by re-fetching them from the backend API.
   *
   * Addresses:
   * - Allows users to get the latest notifications, supporting real-time updates.
   */
  const refreshNotifications = () => {
    fetchNotifications();
  };

  /**
   * Clears the notifications from the state.
   *
   * Addresses:
   * - Provides functionality to manage notification state, enhancing user control.
   */
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Fetch notifications when the component mounts or when the authentication state changes.
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Return the notification data and functions to refresh or clear notifications for use in components.
  return {
    notifications, // The array of notification objects.
    loading,       // Loading status of the fetch operation.
    error,         // Error message if the fetch operation fails.
    refreshNotifications, // Function to refresh notifications manually.
    clearNotifications,   // Function to clear notifications from the state.
  };
}

export default useNotifications;