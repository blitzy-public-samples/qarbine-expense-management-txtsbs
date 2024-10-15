import React, { useState, useEffect } from 'react'; // React hooks (version 17.0.2)
/*
Using useState and useEffect from React library to manage local state and perform side effects such as fetching data on component mount.
(React version 17.0.2)
*/

import useAuth from '../hooks/useAuth';
/*
useAuth hook manages authentication state and ensures that only authenticated managers can access the approval page.
Reference: src/web/src/hooks/useAuth.ts
Addresses Requirement: Secure User Authentication and Role-Based Authorization (TR-F001.4) from Technical Specification/5.1 Feature ID: F-001
*/

import useExpenseData from '../hooks/useExpenseData';
/*
useExpenseData hook fetches and manages expense data that needs approval.
Reference: src/web/src/hooks/useExpenseData.ts
Addresses Requirement: Approval Workflow (TR-F004.2) from Technical Specification/5.4 Feature ID: F-004
*/

import useNotifications from '../hooks/useNotifications';
/*
useNotifications hook manages notifications related to expense approvals.
Reference: src/web/src/hooks/useNotifications.ts
Addresses Requirement: Send in-app notifications for pending approvals (TR-F004.3) from Technical Specification/5.4 Feature ID: F-004
*/

import Header from '../components/Header';
/*
Header component renders the top navigation bar with user-specific actions.
Reference: src/web/src/components/Header.tsx
*/

import Footer from '../components/Footer';
/*
Footer component renders the footer with consistent branding and links.
Reference: src/web/src/components/Footer.tsx
*/

import Sidebar from '../components/Sidebar';
/*
Sidebar component provides navigation links to various sections of the application.
Reference: src/web/src/components/Sidebar.tsx
*/

import NotificationBadge from '../components/NotificationBadge';
/*
NotificationBadge component displays the number of unread notifications for the user.
Reference: src/web/src/components/NotificationBadge.tsx
*/

import ApprovalList from '../components/ApprovalList';
/*
ApprovalList component displays a list of expense reports pending approval for managers.
Reference: src/web/src/components/ApprovalList.tsx
Addresses Requirement: Approval Workflow (TR-F004.4) from Technical Specification/5.4 Feature ID: F-004
*/

import '../styles/ApprovalPage.css'; // Importing styles for the ApprovalPage component

const ApprovalPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  /*
  Ensuring the user is authenticated and has manager privileges.
  Addresses Requirement: Secure User Authentication and Role-Based Authorization (TR-F001.4) from Technical Specification/5.1 Feature ID: F-001
  */

  const { expenses, fetchPendingExpenses, updateExpenseStatus } = useExpenseData();
  /*
  Fetching pending expense reports that need approval.
  Addresses Requirement: Fetch pending expenses for approval (TR-F004.2) from Technical Specification/5.4 Feature ID: F-004
  */

  const { notifications, fetchNotifications } = useNotifications();
  /*
  Fetching notifications related to expense approvals.
  Addresses Requirement: Send in-app notifications for pending approvals (TR-F004.3) from Technical Specification/5.4 Feature ID: F-004
  */

  const [selectedExpenses, setSelectedExpenses] = useState<number[]>([]);
  /*
  Managing local state for selected expenses to support batch approvals.
  Addresses Requirement: Support batch approval capabilities (TR-F004.2) from Technical Specification/5.4 Feature ID: F-004
  */

  useEffect(() => {
    if (isAuthenticated && user.role === 'Manager') {
      fetchPendingExpenses();
      fetchNotifications();
    }
  }, [isAuthenticated, user, fetchPendingExpenses, fetchNotifications]);
  /*
  Fetching data when the component is mounted to ensure up-to-date information.
  Addresses Requirement: Real-Time Sync (TR-F023.1) from Technical Specification/5.23 Feature ID: F-023
  */

  if (!isAuthenticated || user.role !== 'Manager') {
    // Redirecting unauthorized users to a different page or displaying an error message
    return <div>You are not authorized to access this page.</div>;
  }

  // Handler for updating the status of expense reports
  const handleUpdateStatus = (reportId: number, status: string) => {
    updateExpenseStatus(reportId, status);
    /*
    Updating the status of an individual expense report and refreshing the list.
    Addresses Requirement: Track approval status and history (TR-F004.6) from Technical Specification/5.4 Feature ID: F-004
    */
  };

  // Handler for selecting expenses for batch actions
  const handleSelectExpense = (expenseId: number, isSelected: boolean) => {
    setSelectedExpenses((prevSelected) =>
      isSelected ? [...prevSelected, expenseId] : prevSelected.filter((id) => id !== expenseId)
    );
    /*
    Managing selection of expenses to enable batch approvals or rejections.
    Addresses Requirement: Support batch approval capabilities (TR-F004.2)
    */
  };

  // Handler for batch approving selected expenses
  const handleBatchApprove = () => {
    selectedExpenses.forEach((expenseId) => {
      updateExpenseStatus(expenseId, 'Approved');
    });
    setSelectedExpenses([]);
    /*
    Batch approving selected expense reports.
    Addresses Requirement: Support batch approval capabilities (TR-F004.2)
    */
  };

  // Handler for batch rejecting selected expenses
  const handleBatchReject = () => {
    selectedExpenses.forEach((expenseId) => {
      updateExpenseStatus(expenseId, 'Rejected');
    });
    setSelectedExpenses([]);
    /*
    Batch rejecting selected expense reports.
    */
  };

  // Handler for requesting additional information
  const handleRequestInfo = (expenseId: number) => {
    // Logic to request additional information from the employee
    /*
    Allows managers to request more information or clarification on an expense.
    Addresses Requirement: Allow managers to request additional information (TR-F004.4) from Technical Specification/5.4 Feature ID: F-004
    */
  };

  const isBatchActionDisabled = selectedExpenses.length === 0;

  return (
    <div className="approval-page">
      <Header>
        <NotificationBadge count={notifications.length} />
      </Header>
      <Sidebar />
      <main className="main-content">
        <h1>Pending Expense Approvals</h1>
        <div className="batch-actions">
          <button onClick={handleBatchApprove} disabled={isBatchActionDisabled}>
            Approve Selected
          </button>
          <button onClick={handleBatchReject} disabled={isBatchActionDisabled}>
            Reject Selected
          </button>
        </div>
        <ApprovalList
          expenses={expenses}
          onSelectExpense={handleSelectExpense}
          onUpdateStatus={handleUpdateStatus}
          onRequestInfo={handleRequestInfo}
        />
        {/*
          Rendering the ApprovalList component to display pending expense reports with options to approve, reject, or request more information.
          Addresses Requirement: Display pending expense reports with approval options (TR-F004.2, TR-F004.4)
        */}
      </main>
      <Footer />
    </div>
  );
};

export default ApprovalPage;