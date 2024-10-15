// src/web/src/components/Header.tsx

// Description:
// This file contains the Header component for the web application, which serves as the top navigation bar.
// It includes elements such as the company logo, navigation links, and user-specific actions like notifications and language selection.

// Requirements Addressed:
// - Feature ID: F-011 - User Interface Requirements
//   Location: Technical Specification/5.11 Feature ID: F-011/User Interface Requirements
//   Description: Develop a responsive web application for desktop use, ensuring consistent branding and design language across all platforms.
//
// - Feature ID: F-001 - Secure User Authentication and Role-Based Authorization
//   Location: Technical Specification/5.1 Feature ID: F-001/Technical Requirements/TR-F001.4
//   Description: Define role-based access levels for Employees, Managers, Finance Team, and Administrators.
//
// - Feature ID: F-017 - Notification and Alerting System
//   Location: Technical Specification/5.17 Feature ID: F-017/Technical Requirements
//   Description: Develop a robust system to keep users informed about important events, updates, and actions required within the application.
//
// - Feature ID: F-020 - Localization and Internationalization
//   Location: Technical Specification/5.20 Feature ID: F-020/Technical Requirements
//   Description: Support multiple languages and regional settings to cater to a global user base.

// External Dependencies:
// - React (version 17.0.2)
//     - useState: To manage local state within the component.
//     - useEffect: To perform side effects such as fetching notifications on component mount.

import React, { useState, useEffect } from 'react'; // version 17.0.2

// Internal Dependencies:
// - LocalizationSwitcher (src/web/src/components/LocalizationSwitcher.tsx)
//     - Purpose: Allow users to switch between different languages supported by the application.
// - NotificationBadge (src/web/src/components/NotificationBadge.tsx)
//     - Purpose: Display the number of unread notifications for the user.
// - useAuth (src/web/src/hooks/useAuth.ts)
//     - Purpose: Manage user authentication state and provide login/logout functionality.
// - useNotifications (src/web/src/hooks/useNotifications.ts)
//     - Purpose: Fetch and manage notification data for the user.

import LocalizationSwitcher from './LocalizationSwitcher';
import NotificationBadge from './NotificationBadge';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';

// The Header component renders the top navigation bar with navigation links,
// a notification badge, and a language switcher. It provides login/logout functionality
// based on the user's authentication state.

// Steps:
// 1. Initialize state variables for user authentication and notifications using useAuth and useNotifications hooks.
// 2. Use useEffect to fetch notifications on component mount and update the notification count.
// 3. Render the company logo and navigation links with consistent branding.
// 4. Include the NotificationBadge component to display unread notifications.
// 5. Include the LocalizationSwitcher component to allow language selection.
// 6. Provide login/logout functionality based on authentication state.

const Header: React.FC = () => {
    // Step 1: Initialize state variables for authentication and notifications
    // Utilize the useAuth hook to manage authentication state
    // Addresses Feature ID: F-001 - Secure User Authentication and Role-Based Authorization
    const { isAuthenticated, user, login, logout } = useAuth();

    // Use the useNotifications hook to manage notifications
    // Addresses Feature ID: F-017 - Notification and Alerting System
    const { notifications, fetchNotifications } = useNotifications();

    // Local state to keep track of unread notifications count
    const [unreadCount, setUnreadCount] = useState<number>(0);

    // Step 2: Fetch notifications on component mount
    useEffect(() => {
        // Fetch notifications when the component mounts
        // This ensures users are alerted to any new notifications promptly
        fetchNotifications();
    }, [fetchNotifications]);

    // Update unread notification count whenever notifications change
    useEffect(() => {
        // Calculate the number of unread notifications
        const count = notifications.filter(notification => !notification.read).length;
        // Update the unreadCount state
        setUnreadCount(count);
    }, [notifications]);

    // Step 3: Render the component
    return (
        // The header element serves as the top navigation bar
        <header className="header">
            {/* Step 3: Company logo */}
            <div className="logo">
                {/* The company logo helps maintain consistent branding across the application */}
                {/* Addresses Feature ID: F-011 - User Interface Requirements */}
                <img src="/assets/logo.png" alt="Company Logo" />
            </div>

            {/* Step 3: Navigation links */}
            <nav className="navigation">
                <ul>
                    {/* The navigation links provide access to different sections of the application */}
                    {/* Ensuring ease of navigation is part of user interface requirements */}
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/expenses">Expenses</a></li>
                    <li><a href="/reports">Reports</a></li>
                    <li><a href="/settings">Settings</a></li>
                </ul>
            </nav>

            {/* Step 4 and 5: User-specific actions */}
            <div className="actions">
                {/* Step 4: Notification Badge */}
                {/* Displays the number of unread notifications to the user */}
                {/* Addresses Feature ID: F-017 - Notification and Alerting System */}
                <NotificationBadge unreadCount={unreadCount} />

                {/* Step 5: Localization Switcher */}
                {/* Allows users to switch between different languages */}
                {/* Addresses Feature ID: F-020 - Localization and Internationalization */}
                <LocalizationSwitcher />

                {/* Step 6: Login/Logout functionality based on authentication state */}
                {/* Provides login/logout actions based on whether the user is authenticated */}
                {/* Addresses Feature ID: F-001 - Secure User Authentication and Role-Based Authorization */}
                {isAuthenticated ? (
                    <button onClick={logout}>
                        {/* User's name is displayed to personalize the experience */}
                        {user ? `Logout (${user.name})` : 'Logout'}
                    </button>
                ) : (
                    <button onClick={login}>Login</button>
                )}
            </div>
        </header>
    );
};

export default Header;