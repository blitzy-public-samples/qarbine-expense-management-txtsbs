// src/web/src/pages/DashboardPage.tsx

/**
 * DashboardPage Component
 * 
 * This file defines the DashboardPage component for the web application.
 * It serves as the main dashboard interface for users, providing access to key features such as:
 * - Expense Tracking
 * - Notifications
 * - Analytics
 * 
 * The DashboardPage integrates various components and hooks to deliver a cohesive and interactive user experience.
 * 
 * Requirements Addressed:
 * - Develop a responsive web application for desktop use, ensuring intuitive navigation and consistent design language.
 *   - Location: Technical Specification/5.11 Feature ID: F-011/User Interface Requirements
 *   - Requirement IDs: TR-F011.1, TR-F011.3, TR-F011.5
 */

// External dependencies
// Importing React and hooks from 'react' version 17.0.2
import React, { useState, useEffect } from 'react'; // React version 17.0.2

// Internal components and hooks
// Importing internal components to build the dashboard interface

// Importing 'Header' component to display the top navigation bar with user-specific actions
import Header from '../components/Header';

// Importing 'Footer' component to display consistent footer content across the dashboard
import Footer from '../components/Footer';

// Importing 'Sidebar' component to provide navigation links to various sections of the application
import Sidebar from '../components/Sidebar';

// Importing 'NotificationBadge' component to display the number of unread notifications for the user
import NotificationBadge from '../components/NotificationBadge';

// Importing 'ExpenseList' component to display a list of expense items for the user
import ExpenseList from '../components/ExpenseList';

// Importing 'AnalyticsDashboard' component to provide analytics and reports related to travel expenses
import AnalyticsDashboard from '../components/AnalyticsDashboard';

// Importing custom hooks for authentication and data management

// Importing 'useAuth' hook to manage user authentication state and provide login/logout functionality
import useAuth from '../hooks/useAuth';

// Importing 'useExpenseData' hook to fetch and manage expense data for the dashboard
import useExpenseData from '../hooks/useExpenseData';

// Importing 'useNotifications' hook to fetch and manage notification data for the user
import useNotifications from '../hooks/useNotifications';

/**
 * DashboardPage Functional Component
 * 
 * Renders the main dashboard page with navigation, notifications, expense list, and analytics.
 * 
 * Requirements Addressed:
 * - Ensure the interface is intuitive and requires minimal training.
 *   - Location: Technical Specification/5.11 Feature ID: F-011/User Interface Requirements
 *   - Requirement ID: TR-F011.5
 * - Maintain consistent branding and design language across all platforms.
 *   - Requirement ID: TR-F011.3
 * - Optimize navigation and workflows for user efficiency.
 *   - Requirement ID: TR-F011.7
 */

const DashboardPage: React.FC = () => {
    // Manage user authentication state
    const { user } = useAuth();

    // Use custom hooks to fetch and manage expense and notification data
    const { expenses, fetchExpenses } = useExpenseData(); // Fetch and manage expense data
    const { notifications, fetchNotifications } = useNotifications(); // Fetch and manage notification data

    // Local state to manage loading state using 'useState' from React
    // Requirements Addressed:
    // - Optimize navigation and workflows for user efficiency
    //   - Requirement ID: TR-F011.7
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * useEffect Hook
     * 
     * Performs side effects such as fetching data on component mount.
     * Fetches initial data for expenses and notifications when the component mounts.
     * 
     * Requirements Addressed:
     * - Ensure the interface is intuitive and requires minimal training.
     *   - Requirement ID: TR-F011.5
     */

    useEffect(() => {
        const fetchData = async () => {
            // Fetch expenses and notifications concurrently
            await Promise.all([
                fetchExpenses(),
                fetchNotifications()
            ]);
            // Set loading to false after data is fetched
            setLoading(false);
        };
        fetchData();
    }, [fetchExpenses, fetchNotifications]);

    if (loading) {
        // Render a loading indicator while data is being fetched
        // Requirements Addressed:
        // - Ensure the interface is intuitive and requires minimal training.
        //   - Requirement ID: TR-F011.5
        return (
            <div className="loading-indicator">
                Loading...
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            {/* 
                Header component displaying the top navigation bar with user-specific actions.
                Ensures consistent branding and supports intuitive navigation.
                Requirements Addressed:
                - Maintain consistent branding and design language across all platforms.
                  - Requirement ID: TR-F011.3
            */}
            <Header />

            {/* Main layout containing Sidebar and main content area */}
            <div className="dashboard-content">
                {/* 
                    Sidebar providing navigation links to various sections of the application.
                    Optimizes navigation for user efficiency.
                    Requirements Addressed:
                    - Optimize navigation and workflows for user efficiency.
                      - Requirement ID: TR-F011.7
                */}
                <Sidebar />

                {/* Main content area */}
                <main className="main-content">
                    {/* 
                        NotificationBadge displaying the number of unread notifications.
                        Provides immediate feedback to users, enhancing intuitiveness.
                        Requirements Addressed:
                        - Ensure the interface is intuitive and requires minimal training.
                          - Requirement ID: TR-F011.5
                    */}
                    <NotificationBadge count={notifications.unreadCount} />

                    {/* 
                        ExpenseList displaying the user's expenses.
                        Allows users to easily view and manage their expenses.
                        Requirements Addressed:
                        - Ensure the interface is intuitive and requires minimal training.
                          - Requirement ID: TR-F011.5
                    */}
                    <ExpenseList expenses={expenses} />

                    {/* 
                        AnalyticsDashboard providing insights and analytics.
                        Offers users actionable data presented in an intuitive format.
                        Requirements Addressed:
                        - Ensure the interface is intuitive and requires minimal training.
                          - Requirement ID: TR-F011.5
                    */}
                    <AnalyticsDashboard expenses={expenses} />
                </main>
            </div>

            {/* 
                Footer component displaying consistent footer content across the dashboard.
                Maintains consistent branding and provides additional navigation options.
                Requirements Addressed:
                - Maintain consistent branding and design language across all platforms.
                  - Requirement ID: TR-F011.3
            */}
            <Footer />
        </div>
    );
};

export default DashboardPage;