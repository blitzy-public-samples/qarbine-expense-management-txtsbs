// Import React hooks for managing local state and side effects
// Version: react@17.0.2
import React, { useState, useEffect } from 'react'; // Version: 17.0.2

// Import axios for performing HTTP requests to the backend API
// Version: axios@0.21.1
import axios from 'axios'; // Version: 0.21.1

// Import internal components for consistent layout across the application
import Header from '../components/Header'; // To display the top navigation bar with user-specific actions
import Footer from '../components/Footer'; // To display consistent footer content across the reports page
import Sidebar from '../components/Sidebar'; // To provide navigation links within the reports page

// Import the AnalyticsDashboard component to display interactive charts and data visualizations
import AnalyticsDashboard from '../components/AnalyticsDashboard'; // For expense analysis visualizations

// Import services and hooks for data fetching and authentication
import { generateReport } from '../services/reporting'; // To fetch and process data for generating reports
import { useAuth } from '../hooks/useAuth'; // To manage user authentication state and provide secure access to reports
import { useExpenseData } from '../hooks/useExpenseData'; // To retrieve and manage expense data for reporting

// Import utility constants and formatter functions
import { API_BASE_URL } from '../utils/constants'; // To construct API endpoints for reporting requests
import { formatDate, formatCurrency } from '../utils/formatters'; // To format dates and currency values in reports

/**
 * ReportsPage Component
 *
 * Description:
 * Renders the reports page with access to various reports and analytics related to travel expenses.
 *
 * Requirements Addressed:
 * - Reporting and Analytics
 *   - Location: Technical Specification/5.6 Feature ID: F-006/Reporting and Analytics
 *   - Description: Provide comprehensive reporting tools and customizable dashboards to offer real-time visibility into travel expenses, supporting budgeting, forecasting, and financial analysis for various user roles.
 */

const ReportsPage: React.FC = () => {
  /**
   * Ensures the user is authenticated before accessing the reports page.
   * Addresses security requirements by preventing unauthorized access to sensitive data.
   * Requirement Location: Technical Specification/5.1 Feature ID: F-001/Secure User Authentication and Role-Based Authorization
   */
  const { isAuthenticated } = useAuth();

  // State variables for managing report data and loading/error states
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * useEffect hook to perform side effects such as fetching report data on component mount.
   * Requirements Addressed:
   * - Real-Time Sync: Ensures data entered through the application is synchronized promptly.
   *   - Location: Technical Specification/5.23 Feature ID: F-023/Real-Time Sync
   */
  useEffect(() => {
    /**
     * Checks if the user is authenticated.
     * If not, redirects to the login page to enforce secure access.
     * Requirement Location: Technical Specification/5.1 Feature ID: F-001/Secure User Authentication and Role-Based Authorization
     */
    if (!isAuthenticated) {
      // Redirect to the login page (assumes routing is set up in the app)
      window.location.href = '/login';
      return;
    }

    /**
     * Async function to fetch and process report data.
     * Steps:
     * 1. Retrieve expense data using useExpenseData hook.
     * 2. Generate report data using generateReport service.
     * 3. Format data for display.
     * 4. Update state variables accordingly.
     */
    const fetchReportData = async () => {
      try {
        // Set loading state to true before fetching data
        setLoading(true);

        // Retrieve expense data necessary for generating reports
        const expenseData = await useExpenseData();

        // Generate report data by processing the expense data
        const report = generateReport(expenseData);

        // Format the fetched data using utility functions for display purposes
        const formattedData = report.map((item: any) => ({
          ...item,
          date: formatDate(item.date),
          amount: formatCurrency(item.amount),
        }));

        // Update the reportData state with the formatted report data
        setReportData(formattedData);
      } catch (err) {
        // Handle any errors that occur during data fetching or processing
        setError('Failed to load report data.');
      } finally {
        // Set loading state to false after fetching is complete
        setLoading(false);
      }
    };

    // Invoke the function to fetch report data
    fetchReportData();
  }, [isAuthenticated]);

  /**
   * Conditional rendering based on the loading and error states.
   * Provides feedback to the user during data fetching and error handling.
   */
  if (loading) {
    return (
      <div className="loading">
        {/* Displays a loading indicator while data is being fetched */}
        <p>Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        {/* Displays an error message if data fetching fails */}
        <p>{error}</p>
      </div>
    );
  }

  /**
   * Renders the ReportsPage component.
   * Includes Header, Sidebar, AnalyticsDashboard, and Footer components for consistent layout.
   * Displays interactive charts and data visualizations for expense analysis.
   */
  return (
    <div className="reports-page">
      {/* Header component displays the top navigation bar with user-specific actions */}
      <Header />

      {/* Sidebar component provides navigation links within the reports page */}
      <Sidebar />

      {/* Main content area for displaying the analytics dashboard */}
      <main className="main-content">
        {/* AnalyticsDashboard component displays interactive charts and data visualizations */}
        <AnalyticsDashboard data={reportData} />
      </main>

      {/* Footer component displays consistent footer content across the reports page */}
      <Footer />
    </div>
  );
};

export default ReportsPage;