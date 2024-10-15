"""
Main application file for the reporting module.

This module initializes the Flask application for the reporting module, sets up configurations,
and defines the entry point for the reporting service.

Requirements addressed:
- Reporting and Analytics (Technical Specification/5.6 Feature ID: F-006):
  - Provide comprehensive reporting tools and customizable dashboards to offer real-time visibility
    into travel expenses, supporting budgeting, forecasting, and financial analysis for various user roles.
"""

# External imports.
from flask import Flask  # Version 2.0.1
# Flask is used to create and manage API routes for the reporting module.
# Addresses requirement:
# - System Integrations (Technical Specification/5.9 Feature ID: F-009):
#   Ensures seamless connectivity with existing systems using standard frameworks.

# Internal imports.
from config import setup_logging  # To configure logging for the reporting module.
# setup_logging configures logging, addressing:
# - Audit and Compliance (Technical Specification/5.16 Feature ID: F-016):
#   Maintains comprehensive audit trails.

from src.models import ExpenseReportModel  # Defines the data structure for expense reports.
# ExpenseReportModel is used in data processing and API responses.
# Addresses requirement:
# - Data Management (Technical Specification/5.10 Feature ID: F-010):
#   Ensures secure and efficient management of data.

from src.utils import process_expense_data, generate_summary_statistics
# process_expense_data processes raw expense data for reporting.
# generate_summary_statistics generates summary statistics for analytics.
# Addresses requirement:
# - Reporting and Analytics (Technical Specification/5.6 Feature ID: F-006).

from src.routes import (
    get_expense_report,
    post_expense_report,
    get_summary_statistics
)
# get_expense_report handles API requests for retrieving specific expense reports.
# post_expense_report handles API requests for creating new expense reports.
# get_summary_statistics handles API requests for retrieving summary statistics.
# Addresses requirement:
# - Expense Submission and Retrieval (Technical Specification/5.2 Feature ID: F-002).
# - Reporting and Analytics (Technical Specification/5.6 Feature ID: F-006).


def initialize_app():
    """
    Initializes the Flask application for the reporting module, sets up configurations,
    and registers API routes.

    Returns:
        Flask: The initialized Flask application instance.

    Steps:
    1. Create a Flask application instance.
    2. Configure the application using setup_logging and other configuration settings.
    3. Register API routes for handling expense report and analytics requests.
    4. Return the initialized Flask application instance.

    Requirements addressed:
    - Reporting and Analytics (Technical Specification/5.6 Feature ID: F-006):
      Provides comprehensive reporting tools and real-time visibility into travel expenses.
    - Audit and Compliance (Technical Specification/5.16 Feature ID: F-016):
      Ensures all actions are logged for auditing purposes.
    """
    # Step 1: Create a Flask application instance.
    app = Flask(__name__)
    # The Flask app serves as the core of the reporting module, handling incoming HTTP requests.

    # Step 2: Configure the application using setup_logging and other configuration settings.
    setup_logging(app)
    # setup_logging configures logging for the application, ensuring that all events are properly logged.
    # This addresses the 'Audit and Compliance' requirement by maintaining audit trails (Feature ID: F-016).

    # Step 3: Register API routes for handling expense report and analytics requests.

    # Register route for retrieving a specific expense report.
    app.add_url_rule(
        '/expense_reports/<int:report_id>',
        'get_expense_report',
        get_expense_report,
        methods=['GET']
    )
    # This route allows clients to retrieve specific expense reports.
    # Addresses 'Reporting and Analytics' requirement (Feature ID: F-006) by providing access to detailed reports.

    # Register route for submitting a new expense report.
    app.add_url_rule(
        '/expense_reports',
        'post_expense_report',
        post_expense_report,
        methods=['POST']
    )
    # This route allows clients to submit new expense reports.
    # Supports 'Expense Submission' (Technical Specification/5.2 Feature ID: F-002), enabling employees to submit expenses.

    # Register route for retrieving summary statistics.
    app.add_url_rule(
        '/summary_statistics',
        'get_summary_statistics',
        get_summary_statistics,
        methods=['GET']
    )
    # This route provides summary statistics for analytics.
    # Addresses 'Reporting and Analytics' requirement (Feature ID: F-006) by offering real-time visibility.

    # Step 4: Return the initialized Flask application instance.
    return app


if __name__ == '__main__':
    # When the module is executed as the main program, initialize and run the Flask application.
    app = initialize_app()

    # Run the Flask application with the specified host and port.
    app.run(host='0.0.0.0', port=5000)
    # The application runs on all network interfaces, making it accessible to external clients.
    # Addresses requirement:
    # - System Integrations (Technical Specification/5.9 Feature ID: F-009):
    #   Ensures the service is accessible for integration with external systems.