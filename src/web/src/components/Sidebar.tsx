// Import necessary libraries
import React from 'react';

// Import axios for HTTP requests (version 0.21.1)
// Purpose: To perform HTTP requests if needed for dynamic content in the sidebar.
import axios from 'axios'; // Version 0.21.1

// Import internal utilities and hooks

// Import API_BASE_URL to ensure consistent API endpoint usage across components.
import { API_BASE_URL } from '../utils/constants';

// Import formatDate to format dates for display in the sidebar if needed.
import { formatDate } from '../utils/formatters';

// Import validateEmail to validate email formats for any user-related actions in the sidebar.
import { validateEmail } from '../utils/validation';

// Import useAuth to manage authentication state and display user-specific navigation options.
import { useAuth } from '../hooks/useAuth';

// Import useExpenseData to fetch and display summary of expenses in the sidebar.
import { useExpenseData } from '../hooks/useExpenseData';

// Import useNotifications to display notification alerts in the sidebar.
import { useNotifications } from '../hooks/useNotifications';

/**
 * Sidebar Component
 *
 * Description:
 * Renders the Sidebar component with navigation links and user-specific information.
 *
 * Requirements Addressed:
 * - Develop a responsive web application for desktop use, ensuring intuitive navigation and consistent design language.
 *   Location: Technical Specification/5.11 Feature ID: F-011/User Interface Requirements
 *
 * Steps:
 * 1. Use the useAuth hook to determine the user's authentication status and role.
 * 2. Fetch necessary data using useExpenseData and useNotifications hooks.
 * 3. Render navigation links conditionally based on user role and authentication status.
 * 4. Display notifications or alerts if any are present.
 * 5. Return the JSX structure of the Sidebar component.
 */

const Sidebar: React.FC = () => {
  // Step 1: Use the useAuth hook to determine the user's authentication status and role.
  const { isAuthenticated, user, userRole } = useAuth();
  // Requirement Addressed:
  // - Secure User Authentication and Role-Based Authorization
  //   Location: Technical Specification/5.1 Feature ID: F-001

  // Step 2: Fetch necessary data using useExpenseData and useNotifications hooks.
  const { expenseSummary } = useExpenseData();
  // Requirement Addressed:
  // - Expense Submission and Summary
  //   Location: Technical Specification/5.2 Feature ID: F-002

  const { notifications } = useNotifications();
  // Requirement Addressed:
  // - Notification and Alerting System
  //   Location: Technical Specification/5.17 Feature ID: F-017

  // Step 3: Define navigation links conditionally based on user role.
  interface NavLink {
    name: string;
    path: string;
    roles: string[];
  }

  const navigationLinks: NavLink[] = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      roles: ['Employee', 'Manager', 'Finance', 'Administrator'],
    },
    {
      name: 'Expense Submission',
      path: '/expense-submission',
      roles: ['Employee'],
    },
    {
      name: 'Reports',
      path: '/reports',
      roles: ['Manager', 'Finance', 'Administrator'],
    },
    {
      name: 'Settings',
      path: '/settings',
      roles: ['Employee', 'Manager', 'Finance', 'Administrator'],
    },
    {
      name: 'Admin Panel',
      path: '/admin',
      roles: ['Administrator'],
    },
  ];
  // Requirement Addressed:
  // - Intuitive navigation based on user roles
  //   Location: Technical Specification/5.11 Feature ID: F-011

  // Step 4: Return the JSX structure of the Sidebar component.
  return (
    <div className="sidebar">
      {/* Display user information if authenticated */}
      {isAuthenticated && user && (
        <div className="user-info">
          <p>
            Welcome, {validateEmail(user.email) ? user.name : 'User'}
            {/* validateEmail used to ensure correct email format */}
          </p>
          <p>Last login: {formatDate(user.lastLogin)}</p>
          {/* formatDate used to display last login date */}
        </div>
      )}

      {/* Display navigation links based on user role */}
      <nav>
        <ul>
          {navigationLinks
            .filter((link) => userRole && link.roles.includes(userRole))
            .map((link) => (
              <li key={link.name}>
                <a href={link.path}>{link.name}</a>
              </li>
            ))}
        </ul>
      </nav>

      {/* Display expense summary if available */}
      {expenseSummary && (
        <div className="expense-summary">
          <h3>Expense Summary</h3>
          <p>Total Expenses: {expenseSummary.total}</p>
          <p>Pending Approvals: {expenseSummary.pending}</p>
        </div>
      )}

      {/* Display notifications or alerts if any are present */}
      {notifications && notifications.length > 0 && (
        <div className="notifications">
          <h3>Notifications</h3>
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>{notification.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
  // Requirement Addressed:
  // - Display of user-specific information and alerts
  //   Location: Technical Specification/5.17 Feature ID: F-017
};

export default Sidebar;