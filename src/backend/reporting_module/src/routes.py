"""
Routes for the reporting module, handling HTTP requests related to expense reports and analytics.

Requirements Addressed:
- Reporting and Analytics (Technical Specification/5.6 Feature ID: F-006)
"""

# External dependencies
from flask import Blueprint, request, jsonify  # Flask version 2.0.1

# Internal dependencies
from src.backend.reporting_module.config import setup_logging  # To configure logging for the reporting module.
from src.backend.reporting_module.src.models import ExpenseReportModel  # To define the data structure for expense reports used in API responses.
from src.backend.reporting_module.src.utils import process_expense_data, generate_summary_statistics  # To process raw expense data for reporting and generate summary statistics.

import logging

# Configure logging for the reporting module
setup_logging()
logger = logging.getLogger(__name__)

# Create a Blueprint for the reporting routes
reporting_bp = Blueprint('reporting', __name__)

@reporting_bp.route('/reports/<int:report_id>', methods=['GET'])
def get_expense_report(report_id):
    """
    Handles GET requests to retrieve a specific expense report by its ID.

    Requirements Addressed:
    - Reporting and Analytics (Technical Specification/5.6 Feature ID: F-006)

    Parameters:
    - report_id (int): The ID of the expense report to retrieve.

    Returns:
    - dict: A dictionary containing the details of the requested expense report.
    """
    # Extract the report_id from the request URL.
    logger.info(f"Retrieving expense report with ID: {report_id}")

    try:
        # Query the database for the expense report with the given report_id.
        expense_report = ExpenseReportModel.get_by_id(report_id)
        if expense_report is None:
            # Expense report not found.
            logger.warning(f"Expense report with ID {report_id} not found.")
            return jsonify({'error': 'Expense report not found.'}), 404

        # Convert the report data to a dictionary using ExpenseReportModel.to_dict().
        report_data = expense_report.to_dict()

        # Return the report data as a JSON response.
        logger.info(f"Expense report with ID {report_id} retrieved successfully.")
        return jsonify(report_data), 200

    except Exception as e:
        # Log the exception and return an error response.
        logger.error(f"Error retrieving expense report with ID {report_id}: {str(e)}")
        return jsonify({'error': 'An internal error occurred.'}), 500

@reporting_bp.route('/reports', methods=['POST'])
def post_expense_report():
    """
    Handles POST requests to create a new expense report.

    Requirements Addressed:
    - Reporting and Analytics (Technical Specification/5.6 Feature ID: F-006)

    Returns:
    - dict: A dictionary containing the ID of the newly created expense report.
    """
    # Parse the incoming JSON request to extract report_data.
    logger.info("Received request to create a new expense report.")
    report_data = request.get_json()
    if not report_data:
        # No report data provided.
        logger.warning("No report data provided in the request.")
        return jsonify({'error': 'No report data provided.'}), 400

    try:
        # Validate and process the report_data using process_expense_data.
        processed_data = process_expense_data(report_data)

        # Insert the new report into the database and retrieve the new report ID.
        new_report = ExpenseReportModel.create(processed_data)
        new_report_id = new_report.id

        # Return the new report ID as a JSON response.
        logger.info(f"New expense report created with ID: {new_report_id}")
        return jsonify({'report_id': new_report_id}), 201

    except ValueError as ve:
        # Validation error occurred.
        logger.error(f"Validation error while creating expense report: {str(ve)}")
        return jsonify({'error': str(ve)}), 400

    except Exception as e:
        # An internal error occurred.
        logger.error(f"Error creating new expense report: {str(e)}")
        return jsonify({'error': 'An internal error occurred.'}), 500

@reporting_bp.route('/reports/summary', methods=['GET'])
def get_summary_statistics():
    """
    Handles GET requests to retrieve summary statistics for expense reports.

    Requirements Addressed:
    - Reporting and Analytics (Technical Specification/5.6 Feature ID: F-006)

    Returns:
    - dict: A dictionary containing summary statistics such as totals and averages.
    """
    logger.info("Request received to retrieve summary statistics.")

    try:
        # Query the database for all processed expense data.
        expense_reports = ExpenseReportModel.get_all()

        # Generate summary statistics using generate_summary_statistics.
        summary_stats = generate_summary_statistics(expense_reports)

        # Return the summary statistics as a JSON response.
        logger.info("Summary statistics generated successfully.")
        return jsonify(summary_stats), 200

    except Exception as e:
        # An internal error occurred.
        logger.error(f"Error generating summary statistics: {str(e)}")
        return jsonify({'error': 'An internal error occurred.'}), 500