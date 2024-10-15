// Importing internal dependencies
import { API_BASE_URL } from '../utils/constants';
import api from './api'; // Internal API module wrapping axios

// Interface for Notification
interface Notification {
    id: string;
    title: string;
    message: string;
    date: string;
    read: boolean;
    // Additional fields as necessary
}

/**
 * Fetches notifications for the authenticated user from the backend API.
 * 
 * This function addresses the following requirements:
 * - TR-F017.3: Alert managers of newly submitted expenses awaiting approval
 * - TR-F017.1: Send email and in-app notifications for pending expense approvals
 *   (Technical Specification/5.17 Feature ID: F-017/Notification and Alerting System)
 * 
 * Steps:
 * 1. Construct the API endpoint URL using the API_BASE_URL and userId.
 * 2. Use the internal API module to send a GET request to the constructed URL.
 * 3. Return the response data containing the list of notifications.
 * 
 * @param userId - The ID of the authenticated user.
 * @returns A promise that resolves to the list of notifications.
 */
export const getNotifications = async (userId: string): Promise<Notification[]> => {
    // Step 1: Construct the API endpoint URL using the API_BASE_URL and userId.
    const url = `${API_BASE_URL}/users/${userId}/notifications`;

    try {
        // Step 2: Use the internal API module to send a GET request to the constructed URL.
        const response = await api.get<Notification[]>(url);

        // Step 3: Return the response data containing the list of notifications.
        return response.data;
    } catch (error) {
        // Handle errors appropriately.
        throw error;
    }
};

/**
 * Marks a notification as read by updating its status in the backend API.
 * 
 * This function addresses the following requirements:
 * - TR-F017.1: Send email and in-app notifications for pending expense approvals
 * - TR-F017.6: Allow users to configure their notification preferences
 *   (Technical Specification/5.17 Feature ID: F-017/Notification and Alerting System)
 * 
 * Steps:
 * 1. Construct the API endpoint URL using the API_BASE_URL and notificationId.
 * 2. Use the internal API module to send a PATCH request to the constructed URL to update the notification status.
 * 3. Return the response indicating the success of the operation.
 * 
 * @param notificationId - The ID of the notification to mark as read.
 * @returns A promise that resolves when the notification status is updated.
 */
export const markAsRead = async (notificationId: string): Promise<void> => {
    // Step 1: Construct the API endpoint URL using the API_BASE_URL and notificationId.
    const url = `${API_BASE_URL}/notifications/${notificationId}/read`;

    try {
        // Step 2: Use the internal API module to send a PATCH request to update the notification status.
        await api.patch(url);

        // Step 3: Operation successful, resolve the promise.
        return;
    } catch (error) {
        // Handle errors appropriately.
        throw error;
    }
};