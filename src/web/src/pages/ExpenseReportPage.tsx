// Importing React to create and manage the component lifecycle and state (External Dependency)
// Version: 17.0.2
import React, { useState, useEffect } from 'react';

// Importing axios to perform HTTP requests to the backend API (External Dependency)
// Version: 0.21.1
import axios from 'axios';

// Importing utilities for formatting dates and currency values in the expense report
import { formatDate, formatCurrency } from '../utils/formatters';

// Importing validation utility to ensure date inputs for reports are valid
import { validateDate } from '../utils/validation';

// Importing custom hooks to manage authentication state and retrieve expense data
import { useAuth } from '../hooks/useAuth';
import { useExpenseData } from '../hooks/useExpenseData';
import { useNotifications } from '../hooks/useNotifications';

// Importing services to fetch expenses and generate reports
import { fetchExpenses } from '../services/api';
import { generateReport } from '../services/reporting';

// Importing components for consistent application layout and functionality
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import ExpenseList from '../components/ExpenseList';
import NotificationBadge from '../components/NotificationBadge';

/**
 * ExpenseReportPage Component
 *
 * Description:
 * Renders the ExpenseReportPage component, displaying detailed information about a user's expense reports.
 * Integrates various services and components to manage and display expense data.
 *
 * Requirements Addressed:
 * - Expense Submission (Feature ID: F-002)
 *   Location: Technical Specification/5.2 Feature ID: F-002/Expense Submission
 *   Description: Enable employees to capture and submit travel expenses efficiently through the mobile application.
 *
 * - Reporting and Analytics (Feature ID: F-006)
 *   Location: Technical Specification/5.6 Feature ID: F-006/Reporting and Analytics
 *   Description: Provide comprehensive reporting tools and customizable dashboards to offer real-time visibility into travel expenses.
 */
const ExpenseReportPage: React.FC = () => {
    // Initialize state variables for managing expense data, filters, and loading status using useState
    const [expenses, setExpenses] = useState([]);
    const [filters, setFilters] = useState({
        dateFrom: '',
        dateTo: '',
        category: '',
        status: ''
    });
    const [loading, setLoading] = useState(true);

    // Retrieve authentication state to ensure secure API requests
    const { authToken } = useAuth();

    // Retrieve notifications related to expense reports
    const { notifications, fetchNotifications } = useNotifications();

    // Use useEffect to fetch initial expense data and notifications on component mount
    useEffect(() => {
        // Fetch expenses and notifications when the component mounts
        fetchInitialData();
        fetchNotifications();
    }, []);

    /**
     * fetchInitialData
     *
     * Fetches the initial list of expenses for the authenticated user.
     * Addresses requirement:
     * - Expense Submission (Feature ID: F-002)
     *   Location: Technical Specification/5.2 Feature ID: F-002/Expense Submission
     */
    const fetchInitialData = async () => {
        setLoading(true);
        try {
            // Fetch expenses using the fetchExpenses service
            const expenseData = await fetchExpenses(authToken);
            setExpenses(expenseData);
        } catch (error) {
            // Handle errors in fetching expenses
            console.error('Error fetching expenses:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handleFilterChange
     *
     * Handles changes in the filter input fields.
     * Allows users to filter expenses by date, category, or status.
     * Addresses requirement:
     * - Reporting and Analytics (Feature ID: F-006)
     *   Location: Technical Specification/5.6 Feature ID: F-006/Reporting and Analytics
     */
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    /**
     * applyFilters
     *
     * Applies the selected filters to the expense data.
     * Validates date inputs and fetches filtered expenses.
     * Utilizes validateDate utility to ensure date inputs are valid.
     * Addresses requirements:
     * - Reporting and Analytics (Feature ID: F-006)
     *   Location: Technical Specification/5.6 Feature ID: F-006/Reporting and Analytics
     */
    const applyFilters = () => {
        // Validate date inputs using validateDate utility
        if (filters.dateFrom && !validateDate(filters.dateFrom)) {
            alert('Invalid "From" date format.');
            return;
        }
        if (filters.dateTo && !validateDate(filters.dateTo)) {
            alert('Invalid "To" date format.');
            return;
        }
        // Fetch expenses with applied filters
        fetchFilteredExpenses();
    };

    /**
     * fetchFilteredExpenses
     *
     * Fetches expenses from the server based on the applied filters.
     */
    const fetchFilteredExpenses = async () => {
        setLoading(true);
        try {
            // Fetch filtered expenses using the fetchExpenses service
            const filteredExpenses = await fetchExpenses(authToken, filters);
            setExpenses(filteredExpenses);
        } catch (error) {
            console.error('Error fetching filtered expenses:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handleGenerateReport
     *
     * Generates a report based on the current list of expenses.
     * Uses the generateReport service to create comprehensive reports.
     * Addresses requirement:
     * - Reporting and Analytics (Feature ID: F-006)
     *   Location: Technical Specification/5.6 Feature ID: F-006/Reporting and Analytics
     */
    const handleGenerateReport = () => {
        // Generate report using the generateReport service
        generateReport(expenses);
    };

    return (
        <>
            {/* Integrate the Header component for consistent navigation */}
            <Header />
            {/* Integrate the Sidebar component for navigation links */}
            <Sidebar />
            <div className="main-content">
                {/* Use the NotificationBadge component to display unread notifications */}
                <NotificationBadge count={notifications.unreadCount} />

                <h1>Expense Reports</h1>

                {/* Provide filtering options for users to filter expenses */}
                <div className="filters">
                    <label>
                        From Date:
                        <input
                            type="date"
                            name="dateFrom"
                            value={filters.dateFrom}
                            onChange={handleFilterChange}
                        />
                    </label>
                    <label>
                        To Date:
                        <input
                            type="date"
                            name="dateTo"
                            value={filters.dateTo}
                            onChange={handleFilterChange}
                        />
                    </label>
                    <label>
                        Category:
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                        >
                            <option value="">All</option>
                            <option value="Meals">Meals</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Lodging">Lodging</option>
                            {/* Additional categories can be added here */}
                        </select>
                    </label>
                    <label>
                        Status:
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                        >
                            <option value="">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </label>
                    {/* Button to apply filters to the expense list */}
                    <button onClick={applyFilters}>Apply Filters</button>
                    {/* Button to generate a report based on current expenses */}
                    <button onClick={handleGenerateReport}>Generate Report</button>
                </div>

                {/* Display the list of expenses using the ExpenseList component */}
                {loading ? (
                    // Show loading indicator while expenses are being fetched
                    <p>Loading expenses...</p>
                ) : (
                    <ExpenseList
                        expenses={expenses}
                        formatDate={formatDate}
                        formatCurrency={formatCurrency}
                    />
                )}
            </div>
            {/* Integrate the Footer component for consistent footer content */}
            <Footer />
        </>
    );
};

export default ExpenseReportPage;