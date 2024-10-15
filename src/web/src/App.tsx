// Import statements for external dependencies
// React version 17.0.2 is used for component creation and state management
import React from 'react';
// React Router DOM version 5.2.0 is used for routing within the application
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Import internal components
// (Technical Specification/5.11 Feature ID: F-011/User Interface Requirements)
// Header component displays the top navigation bar with user-specific actions
import Header from './components/Header';
// Sidebar component provides navigation links to various sections of the application
import Sidebar from './components/Sidebar';
// Footer component displays consistent footer content across the application
import Footer from './components/Footer';
// NotificationBadge component displays the number of unread notifications for the user
// (Technical Specification/5.17 Feature ID: F-017/Notification and Alerting System)
import NotificationBadge from './components/NotificationBadge';
// LocalizationSwitcher allows users to switch between different languages
// (Technical Specification/5.20 Feature ID: F-020/Localization and Internationalization)
import LocalizationSwitcher from './components/LocalizationSwitcher';

// Import internal hooks
// useAuth hook manages user authentication state and provides login/logout functionality
// (Technical Specification/5.1 Feature ID: F-001/Secure User Authentication)
import useAuth from './hooks/useAuth';
// useNotifications hook fetches and manages notification data for the user
// (Technical Specification/5.17 Feature ID: F-017/Notification and Alerting System)
import useNotifications from './hooks/useNotifications';

// Import pages for routing
import DashboardPage from './pages/DashboardPage';
import ExpenseSubmissionPage from './pages/ExpenseSubmissionPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * The main entry point for the React web application.
 * Renders the main application component with routing and global components,
 * integrating various components and hooks to deliver a cohesive and interactive user experience.
 * 
 * Addresses:
 * - Technical Specification/5.11 Feature ID: F-011/User Interface Requirements
 *   Develop a responsive web application for desktop use, ensuring intuitive navigation and consistent design language.
 *
 * - Technical Specification/5.1 Feature ID: F-001/Secure User Authentication
 *   Implement secure login and manage user authentication state.
 *
 * - Technical Specification/5.17 Feature ID: F-017/Notification and Alerting System
 *   Develop a robust system to keep users informed about important events and actions required.
 *
 * - Technical Specification/5.20 Feature ID: F-020/Localization and Internationalization
 *   Support multiple languages and regional settings to cater to a global user base.
 */
const App: React.FC = () => {
  // Use the useAuth hook to manage authentication state
  const { isAuthenticated } = useAuth();

  // Use the useNotifications hook to fetch unread notifications count
  const { unreadCount } = useNotifications();

  return (
    // Set up routing using BrowserRouter, Route, and Switch from react-router-dom
    <Router>
      {isAuthenticated ? (
        // If the user is authenticated, render the main application interface
        <>
          {/* Render the Header component to display the top navigation bar with user-specific actions */}
          {/* Includes NotificationBadge and LocalizationSwitcher */}
          <Header>
            {/* Render the NotificationBadge component to show unread notifications */}
            {/* Technical Specification/5.17 Feature ID: F-017/Notification and Alerting System */}
            <NotificationBadge count={unreadCount} />

            {/* Include the LocalizationSwitcher component to allow language selection */}
            {/* Technical Specification/5.20 Feature ID: F-020/Localization and Internationalization */}
            <LocalizationSwitcher />
          </Header>

          {/* Render the Sidebar component to provide navigation links to various sections */}
          {/* Technical Specification/5.11 Feature ID: F-011/User Interface Requirements */}
          <Sidebar />

          {/* Main content area */}
          <div className="main-content">
            {/* Define routes for different pages */}
            {/* Technical Specification/5.11 Feature ID: F-011/User Interface Requirements */}
            <Switch>
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/submit-expense" component={ExpenseSubmissionPage} />
              <Route path="/reports" component={ReportsPage} />
              <Route path="/settings" component={SettingsPage} />
              {/* If no route matches, render the NotFoundPage */}
              <Route component={NotFoundPage} />
            </Switch>
          </div>

          {/* Render the Footer component to display consistent footer content */}
          {/* Technical Specification/5.11 Feature ID: F-011/User Interface Requirements */}
          <Footer />
        </>
      ) : (
        // If the user is not authenticated, redirect to the login page
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Redirect to="/login" />
        </Switch>
      )}
    </Router>
  );
};

export default App;