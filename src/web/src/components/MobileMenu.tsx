// MobileMenu.tsx

// External dependencies from React version 17.0.2
import React, { useState, useEffect } from 'react'; // version 17.0.2

// Internal dependencies

// useAuth hook manages user authentication state and provides login/logout functionality.
// Located at src/web/src/hooks/useAuth.ts
import { useAuth } from '../hooks/useAuth';

// useNotifications hook fetches and manages notification data for the user.
// Located at src/web/src/hooks/useNotifications.ts
import { useNotifications } from '../hooks/useNotifications';

// LocalizationSwitcher component allows users to switch between different languages supported by the application.
// Located at src/web/src/components/LocalizationSwitcher.tsx
import LocalizationSwitcher from './LocalizationSwitcher';

// NotificationBadge component displays the number of unread notifications for the user.
// Located at src/web/src/components/NotificationBadge.tsx
import NotificationBadge from './NotificationBadge';

// MobileMenu component
// Description:
// Renders the mobile menu component with navigation links, a notification badge, and a language switcher.

// Requirements Addressed:
// - Mobile Features
//   - Ensure cross-platform support for both iOS and Android devices, providing a user-friendly mobile interface for navigation.
//   - Location in Technical Specification: 5.8 Feature ID: F-008/Mobile Features
//     - Technical Requirement: TR-F008.1 Ensure cross-platform support for both iOS and Android devices [Priority: High]
//     - Technical Requirement: TR-F008.5 Optimize mobile UI for intuitive and user-friendly experience [Priority: Medium]

// - User Interface Requirements
//   - Provide login/logout functionality based on authentication state.
//   - Technical Specification: 5.1 Feature ID: F-001/Secure User Authentication and Role-Based Authorization
//     - Technical Requirement: TR-F001.4 Define role-based access levels for Employees, Managers, Finance Team, and Administrators [Priority: High]

// This component includes navigation links to Dashboard, Expense Submission, Reports, and Settings.
// It includes NotificationBadge to display unread notifications, and LocalizationSwitcher for language selection.
// Provides login/logout functionality based on authentication state.

import './MobileMenu.css'; // Styles specific to MobileMenu component

const MobileMenu: React.FC = () => {
  // Initialize state variables for user authentication and notifications using useAuth and useNotifications hooks.

  // useAuth manages user authentication state and provides login/logout functionality.
  // Addresses: TR-F001.1 Implement secure login using unique username and password [Priority: High]
  const { isAuthenticated, login, logout } = useAuth();

  // useNotifications fetches and manages notification data for the user.
  // Addresses: TR-F017.1 Send in-app notifications for pending expense approvals [Priority: High]
  const { notifications, fetchNotifications } = useNotifications();

  // Local state for unread notification count
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Use useEffect to fetch notifications on component mount and update the notification count.
  useEffect(() => {
    // Fetch notifications when component mounts
    fetchNotifications();

    // Update unread notifications count
    const unread = notifications.filter((n) => !n.read).length;
    setUnreadCount(unread);
  }, [notifications, fetchNotifications]);

  return (
    <nav className="mobile-menu">
      {/* Navigation Links */}
      {/* Render navigation links for Dashboard, Expense Submission, Reports, and Settings. */}
      {/* Addresses TR-F008.5 - Optimize mobile UI for intuitive and user-friendly experience */}
      <ul className="mobile-menu__nav">
        <li className="mobile-menu__item">
          <a href="/dashboard" className="mobile-menu__link">
            Dashboard
          </a>
        </li>
        <li className="mobile-menu__item">
          <a href="/expense-submission" className="mobile-menu__link">
            Expense Submission
          </a>
        </li>
        <li className="mobile-menu__item">
          <a href="/reports" className="mobile-menu__link">
            Reports
          </a>
        </li>
        <li className="mobile-menu__item">
          <a href="/settings" className="mobile-menu__link">
            Settings
          </a>
        </li>
      </ul>

      {/* Include the NotificationBadge component to display unread notifications. */}
      {/* Addresses TR-F008.2 - Implement push notifications for expense status updates and policy reminders [Priority: High] */}
      <div className="mobile-menu__notifications">
        <NotificationBadge count={unreadCount} />
      </div>

      {/* Include the LocalizationSwitcher component to allow language selection. */}
      {/* Addresses Localization and Internationalization requirements */}
      {/* Technical Specification: 5.20 Feature ID: F-020/Localization and Internationalization */}
      <div className="mobile-menu__localization">
        <LocalizationSwitcher />
      </div>

      {/* Provide login/logout functionality based on authentication state. */}
      {/* Addresses TR-F001.4 - Define role-based access levels and login/logout functionality */}
      <div className="mobile-menu__auth">
        {isAuthenticated ? (
          <button onClick={logout} className="mobile-menu__button">
            Logout
          </button>
        ) : (
          <button onClick={login} className="mobile-menu__button">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default MobileMenu;