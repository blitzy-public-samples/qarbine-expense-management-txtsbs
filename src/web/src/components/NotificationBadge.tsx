// src/web/src/components/NotificationBadge.tsx

// Import necessary modules from React
import React from 'react';

// External dependencies
// Import Badge and makeStyles from Material-UI for UI components and styling
// @material-ui/core version 4.11.0
import { Badge, makeStyles } from '@material-ui/core';

// Import NotificationsIcon from Material-UI icons for the notification icon
// @material-ui/icons version 4.9.1
import NotificationsIcon from '@material-ui/icons/Notifications';

// Internal dependencies
// Import useNotifications custom hook to access notifications data
// Module: '../hooks/useNotifications'
// Purpose: Retrieve notifications to display in the badge
import useNotifications from '../hooks/useNotifications';

/**
 * NotificationBadge Component
 * 
 * Description:
 * This component displays a notification icon with a badge indicating the number of unread notifications.
 * It provides a visual cue to users about pending notifications, enhancing real-time communication within the application.
 * 
 * Requirements addressed:
 * - TR-F017.1: Send email and in-app notifications for pending expense approvals (High Priority).
 *   Location: Technical Specification / 5.17 Feature ID: F-017 / Technical Requirements / TR-F017.1
 * - TR-F017.3: Alert managers of newly submitted expenses awaiting approval (High Priority).
 *   Location: Technical Specification / 5.17 Feature ID: F-017 / Technical Requirements / TR-F017.3
 * - TR-F017.4: Inform users of successful reimbursements and payment completions (Medium Priority).
 *   Location: Technical Specification / 5.17 Feature ID: F-017 / Technical Requirements / TR-F017.4
 * 
 * This component should be integrated into the application's header or navigation bar to ensure visibility across all pages.
 * It enhances user engagement by providing immediate feedback and prompts for action.
 */

// Define custom styles using Material-UI's styling solution
const useStyles = makeStyles((theme) => ({
  badge: {
    cursor: 'pointer',
  },
}));

// NotificationBadge Functional Component
const NotificationBadge: React.FC = () => {
  const classes = useStyles();

  // Use the custom hook to retrieve notifications data
  // The hook provides an array of notification objects
  const { notifications } = useNotifications();

  /**
   * Calculate the number of unread notifications
   * Filter the notifications array to include only those that are unread
   */
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  /**
   * Render the Badge component with the unread count
   * Badge wraps the NotificationsIcon to display the count over the icon
   */
  return (
    <Badge
      badgeContent={unreadCount}
      color="secondary"
      className={classes.badge}
    >
      {/* NotificationsIcon represents the notification symbol */}
      <NotificationsIcon />
    </Badge>
  );
};

export default NotificationBadge;