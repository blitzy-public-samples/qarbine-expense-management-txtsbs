import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Version 0.21.1 - Used for HTTP requests to the backend API.
/* External Dependency: Used for performing HTTP requests.
   Technical Specification Reference: Section 6.3 Component Descriptions - Backend Server */

import useAuth from '../hooks/useAuth'; // To manage authentication state and ensure that only authenticated managers can access the approval list.
/* Requirement Addressed: Secure User Authentication and Role-Based Authorization
   Technical Specification Reference: 5.1 Feature ID: F-001 */

import useNotifications from '../hooks/useNotifications'; // To manage notifications related to expense approvals.
/* Requirement Addressed: Notification and Alerting System
   Technical Specification Reference: 5.17 Feature ID: F-017 */

import { fetchExpenses } from '../services/api'; // To retrieve the list of expenses pending approval from the backend API.
/* Requirement Addressed: Fetch pending expense reports for approval
   Technical Specification Reference: 5.4 Feature ID: F-004 */

import { getNotifications } from '../services/notification'; // To fetch notifications related to expense approvals.
/* Requirement Addressed: Manage notifications related to approvals
   Technical Specification Reference: 5.17 Feature ID: F-017 */

interface ExpenseReport {
  reportId: number;
  employeeName: string;
  submissionDate: string;
  totalAmount: number;
  currency: string;
  status: string;
  // Additional fields as necessary
}

const ApprovalList: React.FC = () => {
  // Use the useAuth hook to ensure the user is authenticated and has manager privileges.
  const { isAuthenticated, userRole } = useAuth();
  /* Requirement Addressed: Ensure only authenticated managers can access the approval list.
     Technical Specification Reference: 5.1 Feature ID: F-001 Secure User Authentication and Role-Based Authorization */

  const [pendingExpenses, setPendingExpenses] = useState<ExpenseReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use useNotifications to handle notifications related to approvals.
  const { sendNotification } = useNotifications();
  /* Requirement Addressed: Send in-app notifications for actions taken.
     Technical Specification Reference: 5.17 Feature ID: F-017 Notification and Alerting System */

  useEffect(() => {
    if (isAuthenticated && userRole === 'Manager') {
      // Fetch pending expenses using fetchExpenses from services/api.ts.
      fetchExpenses()
        .then((expenses: ExpenseReport[]) => {
          setPendingExpenses(expenses);
          setIsLoading(false);
        })
        .catch((error: any) => {
          setError('Failed to fetch pending expenses.');
          setIsLoading(false);
        });
    } else {
      setError('You are not authorized to view this page.');
      setIsLoading(false);
    }
  }, [isAuthenticated, userRole]);

  // Handle approval of an expense report.
  const handleApprove = (reportId: number) => {
    axios.post(`/api/expenses/${reportId}/approve`)
      .then(() => {
        // Update the pending expenses list by removing the approved report.
        setPendingExpenses(prevExpenses =>
          prevExpenses.filter(report => report.reportId !== reportId)
        );
        // Send notification to the employee about approval.
        sendNotification({
          reportId,
          message: 'Your expense report has been approved.',
        });
        /* Requirement Addressed: Handle user interactions to update the status of expense reports and send notifications.
           Technical Specification Reference: 5.4 Feature ID: F-004 Approval Workflow */
      })
      .catch(() => {
        setError('Failed to approve expense report.');
      });
  };

  // Handle rejection of an expense report.
  const handleReject = (reportId: number) => {
    axios.post(`/api/expenses/${reportId}/reject`)
      .then(() => {
        // Update the pending expenses list by removing the rejected report.
        setPendingExpenses(prevExpenses =>
          prevExpenses.filter(report => report.reportId !== reportId)
        );
        // Send notification to the employee about rejection.
        sendNotification({
          reportId,
          message: 'Your expense report has been rejected.',
        });
        /* Requirement Addressed: Handle user interactions to update the status of expense reports and send notifications.
           Technical Specification Reference: 5.4 Feature ID: F-004 Approval Workflow */
      })
      .catch(() => {
        setError('Failed to reject expense report.');
      });
  };

  // Handle request for more information on an expense report.
  const handleRequestInfo = (reportId: number) => {
    axios.post(`/api/expenses/${reportId}/request-info`)
      .then(() => {
        // Send notification to the employee requesting additional information.
        sendNotification({
          reportId,
          message: 'Additional information is requested for your expense report.',
        });
        /* Requirement Addressed: Handle user interactions to update the status of expense reports and send notifications.
           Technical Specification Reference: 5.4 Feature ID: F-004 Approval Workflow */
      })
      .catch(() => {
        setError('Failed to request more information.');
      });
  };

  if (isLoading) {
    return <div>Loading pending expense reports...</div>;
    /* Requirement Addressed: Provide feedback while data is loading.
       Technical Specification Reference: 5.5 Feature ID: F-005 Reimbursement Processing */
  }

  if (error) {
    return <div>{error}</div>;
    /* Requirement Addressed: Display error messages to the user.
       Technical Specification Reference: 5.11 Feature ID: F-011 User Interface Requirements */
  }

  return (
    <div>
      <h2>Pending Expense Reports for Approval</h2>
      {/* Requirement Addressed: Render the list of pending expense reports with options to approve, reject, or request more information.
          Technical Specification Reference: 5.4 Feature ID: F-004 Approval Workflow */}
      {pendingExpenses.length === 0 ? (
        <p>No pending expense reports.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Employee Name</th>
              <th>Submission Date</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingExpenses.map((report) => (
              <tr key={report.reportId}>
                <td>{report.reportId}</td>
                <td>{report.employeeName}</td>
                <td>{report.submissionDate}</td>
                <td>
                  {report.totalAmount} {report.currency}
                </td>
                <td>
                  <button onClick={() => handleApprove(report.reportId)}>Approve</button>
                  <button onClick={() => handleReject(report.reportId)}>Reject</button>
                  <button onClick={() => handleRequestInfo(report.reportId)}>Request Info</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApprovalList;